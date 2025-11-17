"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Edit, Plus, LogOut, Eye, Users, Activity, FileText, HelpCircle, Car, Info, Shield, Menu, X, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import { LiveMap } from "@/components/admin/live-map"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import Image from "next/image"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Blog state
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [blogDialogOpen, setBlogDialogOpen] = useState(false)
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null)
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    content: "",
    excerpt: "",
    category: "",
    readTime: "",
    keywords: "",
    isPublished: true,
    ogImage: "",
  })
  const [blogPreview, setBlogPreview] = useState(false)

  // FAQ state
  const [faqs, setFaqs] = useState<any[]>([])
  const [faqDialogOpen, setFaqDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    order: 0,
    isActive: true,
  })

  // Vehicle state
  const [vehicles, setVehicles] = useState<any[]>([])
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<any>(null)
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    image: "",
    sippCode: "",
    category: "",
    acrissCode: "",
    engine: "",
    transmission: "",
    seats: "",
    fuel: "",
    order: 0,
    isActive: true,
  })

  // About state
  const [aboutSections, setAboutSections] = useState<any[]>([])
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false)
  const [editingAbout, setEditingAbout] = useState<any>(null)
  const [aboutForm, setAboutForm] = useState({
    section: "",
    title: "",
    content: "",
    order: 0,
  })

  // Visitors state
  const [visitors, setVisitors] = useState<any[]>([])
  const [visitorsLoading, setVisitorsLoading] = useState(false)
  const [includeBots, setIncludeBots] = useState(false)

  // System status state
  const [systemStatus, setSystemStatus] = useState<{
    dbConnected: boolean
    tables: {
      blog_posts: { count: number | null; status: string }
      faqs: { count: number | null; status: string }
      vehicles: { count: number | null; status: string }
      about_pages: { count: number | null; status: string }
    }
    timestamp: string
    error?: string
  } | null>(null)
  const [statusLoading, setStatusLoading] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState("blog")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const [reservations, setReservations] = useState<any[]>([])
  const [reservationsLoading, setReservationsLoading] = useState(false)
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>("")

  const [websiteRequests, setWebsiteRequests] = useState<any[]>([])
  const [websiteRequestsLoading, setWebsiteRequestsLoading] = useState(false)

  const [blobs, setBlobs] = useState<any[]>([])
  const [blobsLoading, setBlobsLoading] = useState(false)

  const [emailForm, setEmailForm] = useState({ to: "", subject: "", body: "" })
  const [emailSending, setEmailSending] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [emailSuccess, setEmailSuccess] = useState(false)

  useEffect(() => {
    // Only check auth once on mount
    let mounted = true
    checkAuth().then(() => {
      mounted = false
    })
    return () => {
      mounted = false
    }
  }, [])

  // Load visitors when authenticated and set up polling
  useEffect(() => {
    if (!isAuthenticated) return

    // Load visitors immediately (only if API exists)
    try {
      loadVisitors()
    } catch (error) {
      // Ignore visitor loading errors
      console.log("Visitors API not available, skipping")
    }

    // Set up polling every 5 seconds
    const interval = setInterval(() => {
      try {
        loadVisitors()
      } catch (error) {
        // Ignore visitor loading errors
      }
    }, 5000)

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      if (url && key) {
        const sb = createSupabaseClient(url, key)
        sb.channel("live_visitors_changes").on("postgres_changes", { event: "*", schema: "public", table: "live_visitors" }, () => {
          loadVisitors()
        }).subscribe()
      }
    } catch {}

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/login", { method: "GET" })
      if (!response.ok) {
        setLoading(false)
        // Use replace instead of push to avoid loop
        router.replace("/admin/login")
        return
      }
      const data = await response.json()
      if (data.authenticated) {
        setIsAuthenticated(true)
        await loadData()
      } else {
        setLoading(false)
        router.replace("/admin/login")
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setLoading(false)
      router.replace("/admin/login")
    } finally {
      // Always set loading to false after check
      setLoading(false)
    }
  }

  const loadData = async () => {
    // Only load data if authenticated
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping data load")
      return
    }
    await Promise.all([loadBlogPosts(), loadFaqs(), loadVehicles(), loadAboutSections()])
  }

  const loadSystemStatus = async () => {
    setStatusLoading(true)
    try {
      const res = await fetch("/api/admin/status")
      if (!res.ok) {
        console.error("Error loading system status:", res.status)
        setSystemStatus(null)
        return
      }
      const data = await res.json()
      setSystemStatus(data)
    } catch (error) {
      console.error("Error loading system status:", error)
      setSystemStatus(null)
    } finally {
      setStatusLoading(false)
    }
  }

  const loadVisitors = async () => {
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping visitors load")
      return
    }
    setVisitorsLoading(true)
    try {
      const res = await fetch(`/api/admin/visitors${includeBots ? "?include_bots=true" : ""}`)
      if (!res.ok) {
        if (res.status === 401) {
          console.warn("[Admin] Unauthorized, redirecting to login")
          router.replace("/admin/login")
          return
        }
        console.error("[Admin] Error loading visitors:", res.status)
        setVisitors([])
        return
      }
      const data = await res.json()
      console.log(`[Admin] Loaded ${data.visitors?.length || 0} visitors`)
      setVisitors(Array.isArray(data.visitors) ? data.visitors : [])
    } catch (error: any) {
      console.error("[Admin] Error loading visitors:", {
        message: error?.message || "Unknown error",
        name: error?.name,
      })
      setVisitors([])
    } finally {
      setVisitorsLoading(false)
    }
  }

  const loadReservations = async () => {
    if (!isAuthenticated) return
    setReservationsLoading(true)
    try {
      const qs = reservationStatusFilter ? `?status=${reservationStatusFilter}` : ""
      const res = await fetch(`/api/admin/reservations${qs}`)
      if (!res.ok) {
        setReservations([])
        return
      }
      const data = await res.json()
      setReservations(Array.isArray(data.reservations) ? data.reservations : [])
    } catch {
      setReservations([])
    } finally {
      setReservationsLoading(false)
    }
  }

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/reservations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        loadReservations()
      }
    } catch {}
  }

  const loadWebsiteRequests = async () => {
    if (!isAuthenticated) return
    setWebsiteRequestsLoading(true)
    try {
      const res = await fetch(`/api/admin/website-requests`)
      const data = await res.json()
      if (res.ok && data.success) {
        setWebsiteRequests(Array.isArray(data.requests) ? data.requests : [])
      } else {
        setWebsiteRequests([])
      }
    } catch {
      setWebsiteRequests([])
    } finally {
      setWebsiteRequestsLoading(false)
    }
  }

  const updateWebsiteRequestStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/website-requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        loadWebsiteRequests()
      }
    } catch {}
  }

  const deleteWebsiteRequest = async (id: string) => {
    if (!confirm("Ești sigur că vrei să ștergi această cerere?")) return
    try {
      const res = await fetch(`/api/admin/website-requests`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        loadWebsiteRequests()
      }
    } catch {}
  }

  const loadBlobs = async () => {
    if (!isAuthenticated) return
    setBlobsLoading(true)
    try {
      const res = await fetch(`/api/admin/blob-list`)
      const data = await res.json()
      if (res.ok && data.blobs) {
        setBlobs(Array.isArray(data.blobs) ? data.blobs : [])
      } else {
        setBlobs([])
      }
    } catch {
      setBlobs([])
    } finally {
      setBlobsLoading(false)
    }
  }

  const deleteBlob = async (url: string) => {
    if (!confirm("Ești sigur că vrei să ștergi fișierul?")) return
    try {
      const res = await fetch(`/api/admin/blob-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      if (res.ok) {
        loadBlobs()
      }
    } catch {}
  }

  const loadBlogPosts = async () => {
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping blog posts load")
      return
    }
    try {
      const res = await fetch("/api/admin/blog")
      if (!res.ok) {
        if (res.status === 401) {
          console.warn("[Admin] Unauthorized, redirecting to login")
          router.replace("/admin/login")
          return
        }
        const errorData = await res.json().catch(() => ({}))
        console.error("[Admin] Error loading blog posts:", res.status, errorData)
        setBlogPosts([])
        return
      }
      const data = await res.json()
      console.log(`[Admin] Loaded ${data.length} blog posts`)
      setBlogPosts(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error("[Admin] Error loading blog posts:", {
        message: error?.message || "Unknown error",
        name: error?.name,
      })
      setBlogPosts([])
    }
  }

  const loadFaqs = async () => {
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping FAQs load")
      return
    }
    try {
      const res = await fetch("/api/admin/faqs")
      if (!res.ok) {
        if (res.status === 401) {
          console.warn("[Admin] Unauthorized, redirecting to login")
          router.replace("/admin/login")
          return
        }
        const errorData = await res.json().catch(() => ({}))
        console.error("[Admin] Error loading FAQs:", res.status, errorData)
        setFaqs([])
        return
      }
      const data = await res.json()
      console.log(`[Admin] Loaded ${data.length} FAQs`)
      setFaqs(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error("[Admin] Error loading FAQs:", {
        message: error?.message || "Unknown error",
        name: error?.name,
      })
      setFaqs([])
    }
  }

  const loadVehicles = async () => {
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping vehicles load")
      return
    }
    try {
      const res = await fetch("/api/admin/vehicles")
      if (!res.ok) {
        if (res.status === 401) {
          console.warn("[Admin] Unauthorized, redirecting to login")
          router.replace("/admin/login")
          return
        }
        const errorData = await res.json().catch(() => ({}))
        console.error("[Admin] Error loading vehicles:", res.status, errorData)
        setVehicles([])
        return
      }
      const data = await res.json()
      console.log(`[Admin] Loaded ${data.length} vehicles`)
      setVehicles(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error("[Admin] Error loading vehicles:", {
        message: error?.message || "Unknown error",
        name: error?.name,
      })
      setVehicles([])
    }
  }

  const loadAboutSections = async () => {
    if (!isAuthenticated) {
      console.warn("[Admin] Not authenticated, skipping about sections load")
      return
    }
    try {
      const res = await fetch("/api/admin/about")
      if (!res.ok) {
        if (res.status === 401) {
          console.warn("[Admin] Unauthorized, redirecting to login")
          router.replace("/admin/login")
          return
        }
        const errorData = await res.json().catch(() => ({}))
        console.error("[Admin] Error loading about sections:", res.status, errorData)
        setAboutSections([])
        return
      }
      const data = await res.json()
      console.log(`[Admin] Loaded ${data.length} about sections`)
      setAboutSections(Array.isArray(data) ? data : [])
    } catch (error: any) {
      console.error("[Admin] Error loading about sections:", {
        message: error?.message || "Unknown error",
        name: error?.name,
      })
      setAboutSections([])
    }
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (blogPreview) {
        // If in preview mode, just save
        setBlogPreview(false)
        return
      }

      const method = editingBlogPost ? "PUT" : "POST"
      const body = editingBlogPost ? { ...blogForm, id: editingBlogPost.id } : blogForm

      const res = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setBlogDialogOpen(false)
        setEditingBlogPost(null)
        setBlogPreview(false)
        setBlogForm({
          title: "",
          description: "",
          content: "",
          excerpt: "",
          category: "",
          readTime: "",
          keywords: "",
          isPublished: true,
          ogImage: "",
        })
        loadBlogPosts()
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
    }
  }

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingFaq ? "PUT" : "POST"
      const body = editingFaq ? { ...faqForm, id: editingFaq.id } : faqForm

      const res = await fetch("/api/admin/faqs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setFaqDialogOpen(false)
        setEditingFaq(null)
        setFaqForm({
          question: "",
          answer: "",
          order: 0,
          isActive: true,
        })
        loadFaqs()
      }
    } catch (error) {
      console.error("Error saving FAQ:", error)
    }
  }

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingVehicle ? "PUT" : "POST"
      const body = editingVehicle ? { ...vehicleForm, id: editingVehicle.id } : vehicleForm

      const res = await fetch("/api/admin/vehicles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setVehicleDialogOpen(false)
        setEditingVehicle(null)
        setVehicleForm({
          name: "",
          brand: "",
          model: "",
          year: "",
          image: "",
          sippCode: "",
          category: "",
          acrissCode: "",
          engine: "",
          transmission: "",
          seats: "",
          fuel: "",
          order: 0,
          isActive: true,
        })
        loadVehicles()
      }
    } catch (error) {
      console.error("Error saving vehicle:", error)
    }
  }

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingAbout ? "PUT" : "POST"
      const body = editingAbout ? { ...aboutForm, id: editingAbout.id } : aboutForm

      const res = await fetch("/api/admin/about", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        setAboutDialogOpen(false)
        setEditingAbout(null)
        setAboutForm({
          section: "",
          title: "",
          content: "",
          order: 0,
        })
        loadAboutSections()
      }
    } catch (error) {
      console.error("Error saving about section:", error)
    }
  }

  const handleDelete = async (type: "blog" | "faq" | "vehicle" | "about", id: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest element?")) return

    try {
      const endpoint = `/api/admin/${type === "blog" ? "blog" : type === "faq" ? "faqs" : type === "vehicle" ? "vehicles" : "about"}?id=${id}`
      const res = await fetch(endpoint, { method: "DELETE" })

      if (res.ok) {
        loadData()
      }
    } catch (error) {
      console.error("Error deleting:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg mb-2">Se încarcă...</div>
          <div className="text-sm text-muted-foreground">Verificăm autentificarea...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !loading) {
    // Don't render anything while redirecting
    return null
  }

  const navItems = [
    { id: "blog", label: "Articole", icon: FileText },
    { id: "faq", label: "Întrebări Frecvente", icon: HelpCircle },
    { id: "vehicles", label: "Vehicule", icon: Car },
    { id: "about", label: "Despre Noi", icon: Info },
    { id: "status", label: "Status Sistem", icon: Activity },
    { id: "visitors", label: "Vizitatori Live", icon: Users },
    { id: "reservations", label: "Rezervări", icon: Shield },
    { id: "websiteRequests", label: "Cereri Website", icon: AlertCircle },
    { id: "media", label: "Media", icon: Eye },
    { id: "email", label: "Email", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] relative" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#1d1d1f] border-r border-[#e5e5e7] dark:border-[#2d2d2f] z-40 transition-transform duration-300 animate-in slide-in-from-left ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${mobileSidebarOpen ? "translate-x-0" : ""} md:translate-x-0`}
      >
        {/* Logo/Branding */}
        <div className="p-5 border-b border-[#e5e5e7] dark:border-[#2d2d2f]">
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
            auto<span className="text-[#14b8a6]">pe</span>loc<span className="text-[#14b8a6]">.ro</span>
          </h2>
          <p className="text-xs text-[#86868b] mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileSidebarOpen(false)
                  // Load status when status tab is activated
                  if (item.id === "status") {
                    loadSystemStatus()
                  }
                  if (item.id === "reservations") {
                    loadReservations()
                  }
                  if (item.id === "websiteRequests") {
                    loadWebsiteRequests()
                  }
                  if (item.id === "media") {
                    loadBlobs()
                  }
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-[8px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#f5f5f7] dark:bg-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] border-l-[3px] border-[#14b8a6]"
                    : "text-[#86868b] hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? "text-[#1d1d1f] dark:text-[#f5f5f7]" : "text-[#86868b]"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User menu in sidebar bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#f5f5f7] dark:bg-[#2d2d2f] rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-[#86868b]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">razvan@autopeloc.ro</p>
              <p className="text-xs text-[#86868b]">Admin</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] font-medium transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Ieșire
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "md:ml-64" : ""}`}>
        {/* Content */}
        <main className="p-8 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Mobile header */}
              <div className="md:hidden flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="h-10 w-10 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px]"
                >
                  {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                <div>
                  <h1 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {navItems.find((item) => item.id === activeTab)?.label || "Panou Admin"}
                  </h1>
                </div>
              </div>

          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Articole
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Gestionează articolele care apar pe site</CardDescription>
                  </div>
                  <Dialog
                    open={blogDialogOpen}
                    onOpenChange={(open) => {
                      setBlogDialogOpen(open)
                      if (!open) {
                        setEditingBlogPost(null)
                        setBlogPreview(false)
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Articol Nou
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-in fade-in duration-200">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {editingBlogPost ? "Editează Articol" : "Articol Nou"}
                        </DialogTitle>
                        <DialogDescription className="text-[#86868b] text-sm">
                          Articolul va apărea automat în lista de articole când este publicat
                        </DialogDescription>
                      </DialogHeader>
                      
                      {!blogPreview ? (
                      <form onSubmit={handleBlogSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Titlu Articol *</Label>
                          <Input
                            id="title"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            placeholder="ex: Mașina la schimb în 2025 – Drepturile păgubitului"
                            required
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            URL-ul se generează automat din titlu
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="category" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Categorie *</Label>
                          <Input
                            id="category"
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            placeholder="ex: Legislație, Ghid Practic, etc."
                            required
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Descriere Scurtă *</Label>
                          <Textarea
                            id="description"
                            value={blogForm.description}
                            onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                            placeholder="Descrierea apare în rezultatele căutării și în lista de articole"
                            rows={3}
                            required
                            className="border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Recomandat: 150-160 caractere pentru optimizare SEO
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="excerpt" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Rezumat (Opțional)</Label>
                          <Textarea
                            id="excerpt"
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                            placeholder="Un rezumat mai scurt al articolului"
                            rows={2}
                            className="border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="content" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Conținut Articol *</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setBlogPreview(!blogPreview)}
                            >
                              {blogPreview ? "Editează" : "Preview"}
                            </Button>
                          </div>
                          {blogPreview ? (
                            <div className="border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] p-6 bg-white dark:bg-[#1d1d1f] min-h-[400px] prose prose-sm max-w-none">
                              <h1 className="text-3xl font-bold mb-4 text-[#1d1d1f] dark:text-[#f5f5f7]">{blogForm.title}</h1>
                              <div className="text-[#1d1d1f] dark:text-[#f5f5f7]" dangerouslySetInnerHTML={{ __html: blogForm.content }} />
                            </div>
                          ) : (
                            <Textarea
                              id="content"
                              value={blogForm.content}
                              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                              placeholder="Scrie conținutul articolului aici. Poți folosi HTML pentru formatare."
                              rows={15}
                              required
                              className="font-mono text-sm border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            Poți folosi HTML pentru formatare (ex: &lt;p&gt;, &lt;strong&gt;, &lt;h2&gt;, etc.)
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="readTime" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Timp de Citire (Opțional)</Label>
                            <Input
                              id="readTime"
                              value={blogForm.readTime}
                              onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                              placeholder="ex: 5 min"
                              className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                          </div>
                          <div>
                            <Label htmlFor="keywords" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Cuvinte Cheie (Opțional)</Label>
                            <Input
                              id="keywords"
                              value={blogForm.keywords}
                              onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                              placeholder="separate prin virgulă"
                              className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <ImageUpload
                            value={blogForm.ogImage}
                            onChange={(url) => setBlogForm({ ...blogForm, ogImage: url })}
                            label="Imagine pentru Social Media (Opțional)"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Această imagine apare când articolul este partajat pe Facebook/LinkedIn
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                          <input
                            type="checkbox"
                            id="isPublished"
                            checked={blogForm.isPublished}
                            onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="isPublished" className="font-medium cursor-pointer">
                            Publică articolul imediat (va apărea pe site)
                          </Label>
                        </div>
                        
                        <DialogFooter className="gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setBlogDialogOpen(false)}
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] font-medium transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                          >
                            Anulează
                          </Button>
                          <Button
                            type="submit"
                            className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                          >
                            Salvează Articol
                          </Button>
                        </DialogFooter>
                      </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] p-6 bg-white dark:bg-[#1d1d1f] min-h-[500px]">
                            <div className="prose prose-lg max-w-none">
                              <h1 className="text-4xl font-bold mb-4 text-[#1d1d1f] dark:text-[#f5f5f7]">{blogForm.title}</h1>
                              {blogForm.category && (
                                <div className="mb-4">
                                  <span className="px-3 py-1 bg-[#f5f5f7] dark:bg-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-full text-sm font-medium">
                                    {blogForm.category}
                                  </span>
                                </div>
                              )}
                              {blogForm.description && (
                                <p className="text-xl text-[#86868b] mb-6">{blogForm.description}</p>
                              )}
                              <div className="text-[#1d1d1f] dark:text-[#f5f5f7]" dangerouslySetInnerHTML={{ __html: blogForm.content }} />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setBlogPreview(false)} 
                              className="flex-1 h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] font-medium transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                            >
                              Înapoi la Editare
                            </Button>
                            <Button 
                              onClick={handleBlogSubmit} 
                              className="flex-1 h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                            >
                              Salvează Articol
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {blogPosts.length === 0 ? (
                    <div className="text-center py-12 text-[#86868b]">
                      <p className="text-base mb-2 font-medium">Nu există articole încă</p>
                      <p className="text-sm">
                        Tabelele nu există încă în baza de date. Rulează migrarea Prisma:{" "}
                        <code className="bg-[#f5f5f7] dark:bg-[#2d2d2f] px-2 py-1 rounded-[4px] text-xs font-mono">npx prisma migrate dev</code>
                      </p>
                    </div>
                  ) : (
                    blogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f] transition-all duration-200">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-base text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">{post.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-[#86868b]">
                              <span className="px-2 py-0.5 bg-[#f5f5f7] dark:bg-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-[4px] text-xs font-medium">
                                {post.category}
                              </span>
                              <span>{new Date(post.publishedAt).toLocaleDateString("ro-RO")}</span>
                              {post.isPublished ? (
                                <span className="text-green-600 dark:text-green-400">✓ Publicat</span>
                              ) : (
                                <span className="text-orange-600 dark:text-orange-400">Draft</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingBlogPost(post)
                            setBlogForm({
                              title: post.title,
                              description: post.description,
                              content: post.content,
                              excerpt: post.excerpt || "",
                              category: post.category,
                              readTime: post.readTime || "",
                              keywords: post.keywords || "",
                              isPublished: post.isPublished,
                              ogImage: post.ogImage || "",
                            })
                            setBlogPreview(false)
                            setBlogDialogOpen(true)
                          }}
                          className="h-9 border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <ConfirmDialog
                          title="Șterge articol de blog?"
                          description={`Ești sigur că vrei să ștergi articolul "${post.title}"? Această acțiune nu poate fi anulată.`}
                          onConfirm={() => handleDelete("blog", post.id)}
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-[8px] transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Întrebări Frecvente
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Gestionează întrebările care apar pe toate paginile</CardDescription>
                  </div>
                  <Dialog
                    open={faqDialogOpen}
                    onOpenChange={(open) => {
                      setFaqDialogOpen(open)
                      if (!open) setEditingFaq(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Întrebare Nouă
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-in fade-in duration-200">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {editingFaq ? "Editează Întrebare" : "Întrebare Nouă"}
                        </DialogTitle>
                        <DialogDescription className="text-[#86868b] text-sm">
                          Ordinea întrebărilor poate fi schimbată prin drag & drop
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleFaqSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="faq-question" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Întrebare *</Label>
                          <Input
                            id="faq-question"
                            value={faqForm.question}
                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                            placeholder="ex: Ce documente sunt necesare?"
                            required
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="faq-answer" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Răspuns *</Label>
                          <Textarea
                            id="faq-answer"
                            value={faqForm.answer}
                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                            rows={6}
                            placeholder="Răspunsul complet la întrebare..."
                            required
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Poți folosi HTML pentru formatare (ex: &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;)
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                          <input
                            type="checkbox"
                            id="faq-isActive"
                            checked={faqForm.isActive}
                            onChange={(e) => setFaqForm({ ...faqForm, isActive: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="faq-isActive" className="font-medium cursor-pointer">
                            Afișează întrebarea pe site
                          </Label>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button type="button" variant="outline" onClick={() => setFaqDialogOpen(false)}>
                            Anulează
                          </Button>
                          <Button
                            type="submit"
                            className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                          >
                            Salvează
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {faqs.length === 0 ? (
                    <div className="text-center py-12 text-[#86868b]">
                      <p className="text-base mb-2 font-medium">Nu există întrebări încă</p>
                      <p className="text-sm">
                        Tabelele nu există încă în baza de date. Rulează migrarea Prisma:{" "}
                        <code className="bg-[#f5f5f7] dark:bg-[#2d2d2f] px-2 py-1 rounded-[4px] text-xs font-mono">npx prisma migrate dev</code>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {faqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", faq.id)
                          e.currentTarget.style.opacity = "0.5"
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.style.opacity = "1"
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          e.currentTarget.style.borderTop = "2px solid #14b8a6"
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.style.borderTop = ""
                        }}
                        onDrop={async (e) => {
                          e.preventDefault()
                          e.currentTarget.style.borderTop = ""
                          const draggedId = e.dataTransfer.getData("text/plain")
                          if (draggedId === faq.id) return

                          // Update order
                          const draggedIndex = faqs.findIndex(f => f.id === draggedId)
                          const newFaqs = [...faqs]
                          const [removed] = newFaqs.splice(draggedIndex, 1)
                          newFaqs.splice(index, 0, removed)

                          // Update order values
                          newFaqs.forEach((f, i) => {
                            if (f.order !== i) {
                              fetch("/api/admin/faqs", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ ...f, order: i }),
                              })
                            }
                          })
                          
                          loadFaqs()
                        }}
                        className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f] transition-all duration-200 cursor-move"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-[#86868b] mt-1">⋮⋮</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-base text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">{faq.question}</h3>
                            <p className="text-sm text-[#86868b] line-clamp-2">{faq.answer}</p>
                            {!faq.isActive && (
                              <span className="text-xs text-orange-600 dark:text-orange-400 mt-1 inline-block">
                                (Ascuns)
                              </span>
                            )}
                          </div>
                        </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingFaq(faq)
                            setFaqForm({
                              question: faq.question,
                              answer: faq.answer,
                              order: faq.order,
                              isActive: faq.isActive,
                            })
                            setFaqDialogOpen(true)
                          }}
                          className="h-9 border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <ConfirmDialog
                          title="Șterge întrebare frecventă?"
                          description={`Ești sigur că vrei să ștergi întrebarea "${faq.question}"? Această acțiune nu poate fi anulată.`}
                          onConfirm={() => handleDelete("faq", faq.id)}
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-[8px] transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                      </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Vehicule
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Gestionează mașinile care apar în flota noastră</CardDescription>
                  </div>
                  <Dialog
                    open={vehicleDialogOpen}
                    onOpenChange={(open) => {
                      setVehicleDialogOpen(open)
                      if (!open) setEditingVehicle(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Vehicul Nou
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-in fade-in duration-200">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {editingVehicle ? "Editează Vehicul" : "Vehicul Nou"}
                        </DialogTitle>
                        <DialogDescription className="text-[#86868b] text-sm">
                          Vehiculul va apărea automat în pagina "Flota noastră" când este activat
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleVehicleSubmit} className="space-y-4">
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                          <h3 className="font-semibold">Informații de bază</h3>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="vehicle-brand" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Brand *</Label>
                              <Input
                                id="vehicle-brand"
                                value={vehicleForm.brand}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                                placeholder="ex: Dacia"
                                required
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vehicle-model" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Model *</Label>
                              <Input
                                id="vehicle-model"
                                value={vehicleForm.model}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                                placeholder="ex: Sandero"
                                required
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vehicle-year" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">An (Opțional)</Label>
                              <Input
                                id="vehicle-year"
                                type="number"
                                value={vehicleForm.year}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, year: e.target.value })}
                                placeholder="ex: 2024"
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="vehicle-name" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Nume Complet *</Label>
                            <Input
                              id="vehicle-name"
                              value={vehicleForm.name}
                              onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                              placeholder="ex: Dacia Sandero"
                              required
                              className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Numele complet afișat pe site
                            </p>
                          </div>
                          
                          <div>
                            <ImageUpload
                              value={vehicleForm.image}
                              onChange={(url) => setVehicleForm({ ...vehicleForm, image: url })}
                              label="Imagine Vehicul *"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="vehicle-category" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Categorie *</Label>
                            <Input
                              id="vehicle-category"
                              value={vehicleForm.category}
                              onChange={(e) => setVehicleForm({ ...vehicleForm, category: e.target.value })}
                              placeholder="ex: Economy, Compact, SUV"
                              required
                              className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Categoria vehiculului (Economy, Compact, SUV, etc.)
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                          <h3 className="font-semibold">Specificații tehnice</h3>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="vehicle-engine" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Motor (Opțional)</Label>
                              <Input
                                id="vehicle-engine"
                                value={vehicleForm.engine}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, engine: e.target.value })}
                                placeholder="ex: 1.2 Turbo 100 CP"
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vehicle-transmission" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Transmisie (Opțional)</Label>
                              <Input
                                id="vehicle-transmission"
                                value={vehicleForm.transmission}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, transmission: e.target.value })}
                                placeholder="ex: Manual, Automat"
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vehicle-seats" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Număr Locuri (Opțional)</Label>
                              <Input
                                id="vehicle-seats"
                                type="number"
                                value={vehicleForm.seats}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, seats: e.target.value })}
                                placeholder="ex: 5"
                                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="vehicle-fuel" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Combustibil (Opțional)</Label>
                            <Input
                              id="vehicle-fuel"
                              value={vehicleForm.fuel}
                              onChange={(e) => setVehicleForm({ ...vehicleForm, fuel: e.target.value })}
                              placeholder="ex: Benzină, Diesel, Hybrid"
                              className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Setări tehnice (pentru sistem)</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="vehicle-sippCode" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Cod SIPP *</Label>
                              <Input
                                id="vehicle-sippCode"
                                value={vehicleForm.sippCode}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, sippCode: e.target.value })}
                                placeholder="ex: MCMR"
                                required
                                className="font-mono text-sm border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Cod standard pentru categorisire vehicule
                              </p>
                            </div>
                            <div>
                              <Label htmlFor="vehicle-acrissCode" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Cod ACRISS (Opțional)</Label>
                              <Input
                                id="vehicle-acrissCode"
                                value={vehicleForm.acrissCode}
                                onChange={(e) => setVehicleForm({ ...vehicleForm, acrissCode: e.target.value })}
                                placeholder="ex: Economy"
                                className="font-mono text-sm border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                          <input
                            type="checkbox"
                            id="vehicle-isActive"
                            checked={vehicleForm.isActive}
                            onChange={(e) => setVehicleForm({ ...vehicleForm, isActive: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="vehicle-isActive" className="font-medium cursor-pointer">
                            Afișează vehiculul în flota noastră
                          </Label>
                        </div>
                        
                        <DialogFooter className="gap-2">
                          <Button type="button" variant="outline" onClick={() => setVehicleDialogOpen(false)}>
                            Anulează
                          </Button>
                          <Button
                            type="submit"
                            className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                          >
                            Salvează Vehicul
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {vehicles.length === 0 ? (
                    <div className="text-center py-12 text-[#86868b]">
                      <p className="text-base mb-2 font-medium">Nu există vehicule încă</p>
                      <p className="text-sm">
                        Tabelele nu există încă în baza de date. Rulează migrarea Prisma:{" "}
                        <code className="bg-[#f5f5f7] dark:bg-[#2d2d2f] px-2 py-1 rounded-[4px] text-xs font-mono">npx prisma migrate dev</code>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {vehicles.map((vehicle, index) => (
                      <div 
                        key={vehicle.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", vehicle.id)
                          e.currentTarget.style.opacity = "0.5"
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.style.opacity = "1"
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          e.currentTarget.style.borderTop = "2px solid #14b8a6"
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.style.borderTop = ""
                        }}
                        onDrop={async (e) => {
                          e.preventDefault()
                          e.currentTarget.style.borderTop = ""
                          const draggedId = e.dataTransfer.getData("text/plain")
                          if (draggedId === vehicle.id) return
                          
                          const draggedIndex = vehicles.findIndex(v => v.id === draggedId)
                          const newVehicles = [...vehicles]
                          const [removed] = newVehicles.splice(draggedIndex, 1)
                          newVehicles.splice(index, 0, removed)
                          
                          newVehicles.forEach((v, i) => {
                            if (v.order !== i) {
                              fetch("/api/admin/vehicles", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ ...v, order: i }),
                              })
                            }
                          })
                          
                          loadVehicles()
                        }}
                        className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f] transition-all duration-200 cursor-move"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-[#86868b] mt-1">⋮⋮</div>
                          {vehicle.image && (
                            <div className="relative w-20 h-20 rounded-[8px] overflow-hidden bg-[#f5f5f7] dark:bg-[#2d2d2f] flex-shrink-0">
                              <Image
                                src={vehicle.image}
                                alt={vehicle.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-base text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">{vehicle.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-[#86868b]">
                              <span className="px-2 py-0.5 bg-[#f5f5f7] dark:bg-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-[4px] text-xs font-medium">
                                {vehicle.category}
                              </span>
                              {vehicle.brand && vehicle.model && (
                                <span>{vehicle.brand} {vehicle.model}</span>
                              )}
                              {vehicle.year && <span>{vehicle.year}</span>}
                              {!vehicle.isActive && (
                                <span className="text-orange-600 dark:text-orange-400">(Ascuns)</span>
                              )}
                            </div>
                            {vehicle.engine && (
                              <p className="text-xs text-[#86868b] mt-1">
                                {vehicle.engine} • {vehicle.transmission || "N/A"} • {vehicle.seats || "N/A"} locuri
                              </p>
                            )}
                          </div>
                        </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingVehicle(vehicle)
                            setVehicleForm({
                              name: vehicle.name,
                              brand: vehicle.brand,
                              model: vehicle.model,
                              year: vehicle.year?.toString() || "",
                              image: vehicle.image || "",
                              sippCode: vehicle.sippCode,
                              category: vehicle.category,
                              acrissCode: vehicle.acrissCode || "",
                              engine: vehicle.engine || "",
                              transmission: vehicle.transmission || "",
                              seats: vehicle.seats?.toString() || "",
                              fuel: vehicle.fuel || "",
                              order: vehicle.order,
                              isActive: vehicle.isActive,
                            })
                            setVehicleDialogOpen(true)
                          }}
                          className="h-9 border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <ConfirmDialog
                          title="Șterge vehicul?"
                          description={`Ești sigur că vrei să ștergi vehiculul "${vehicle.brand} ${vehicle.model}"? Această acțiune nu poate fi anulată.`}
                          onConfirm={() => handleDelete("vehicle", vehicle.id)}
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-[8px] transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </div>
                    ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Despre Noi
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Gestionează conținutul paginii Despre Noi</CardDescription>
                  </div>
                  <Dialog
                    open={aboutDialogOpen}
                    onOpenChange={(open) => {
                      setAboutDialogOpen(open)
                      if (!open) setEditingAbout(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adaugă Secțiune
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-in fade-in duration-200">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {editingAbout ? "Editează Secțiune" : "Secțiune Nouă"}
                        </DialogTitle>
                        <DialogDescription className="text-[#86868b] text-sm">
                          Editează conținutul text al secțiunilor din pagina Despre Noi
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAboutSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="about-section" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Nume Secțiune *</Label>
                          <Input
                            id="about-section"
                            value={aboutForm.section}
                            onChange={(e) => setAboutForm({ ...aboutForm, section: e.target.value })}
                            placeholder="ex: hero, journey, vision, expertise, commitment, cta"
                            required
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Numele secțiunii din pagina Despre Noi (trebuie să fie unic)
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="about-title" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Titlu (Opțional)</Label>
                          <Input
                            id="about-title"
                            value={aboutForm.title}
                            onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                            placeholder="Titlul secțiunii"
                            className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="about-content" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1 block">Conținut Text *</Label>
                          <Textarea
                            id="about-content"
                            value={aboutForm.content}
                            onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                            rows={12}
                            placeholder="Scrie conținutul secțiunii aici. Poți folosi HTML pentru formatare."
                            required
                            className="font-mono text-sm border-teal-200 dark:border-teal-800 focus:border-teal-500 focus:ring-teal-500"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Poți folosi HTML pentru formatare (ex: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;)
                          </p>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button type="button" variant="outline" onClick={() => setAboutDialogOpen(false)}>
                            Anulează
                          </Button>
                          <Button
                            type="submit"
                            className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                          >
                            Salvează Secțiune
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {aboutSections.length === 0 ? (
                    <div className="text-center py-12 text-[#86868b]">
                      <p className="text-base mb-2 font-medium">Nu există secțiuni încă</p>
                      <p className="text-sm">
                        Tabelele nu există încă în baza de date. Rulează migrarea Prisma:{" "}
                        <code className="bg-[#f5f5f7] dark:bg-[#2d2d2f] px-2 py-1 rounded-[4px] text-xs font-mono">npx prisma migrate dev</code>
                      </p>
                    </div>
                  ) : (
                    aboutSections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px] hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f] transition-all duration-200">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-base text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">{section.section}</h3>
                            {section.title && (
                              <p className="text-sm font-medium text-[#86868b] mb-2">{section.title}</p>
                            )}
                            <p className="text-sm text-[#86868b] line-clamp-2">{section.content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingAbout(section)
                            setAboutForm({
                              section: section.section,
                              title: section.title || "",
                              content: section.content,
                              order: section.order,
                            })
                            setAboutDialogOpen(true)
                          }}
                          className="h-9 border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <ConfirmDialog
                          title="Șterge secțiune despre noi?"
                          description={`Ești sigur că vrei să ștergi secțiunea "${section.title || section.section}"? Această acțiune nu poate fi anulată.`}
                          onConfirm={() => handleDelete("about", section.id)}
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-9 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-[8px] transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Status Sistem
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">
                      Monitorizează statusul conexiunii la baza de date și numărul de înregistrări
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    onClick={loadSystemStatus}
                    disabled={statusLoading}
                    className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {statusLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Se încarcă...
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4 mr-2" />
                        Reîmprospătează
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {statusLoading && !systemStatus ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
                    <p className="text-base font-medium">Se încarcă statusul sistemului...</p>
                  </div>
                ) : systemStatus?.error ? (
                  <div className="text-center py-12">
                    <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <p className="text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Eroare la încărcarea statusului</p>
                    <p className="text-sm text-[#86868b]">{systemStatus.error}</p>
                  </div>
                ) : systemStatus ? (
                  <div className="space-y-6">
                    {/* Database Connection Status */}
                    <div className="bg-[#f5f5f7] dark:bg-[#2d2d2f] rounded-[12px] p-6 border border-[#e5e5e7] dark:border-[#2d2d2f]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">Conexiune Baza de Date</h3>
                        <div className="flex items-center gap-2">
                          {systemStatus.dbConnected ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">Conectat</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-500" />
                              <span className="text-sm font-medium text-red-600 dark:text-red-400">Deconectat</span>
                            </>
                          )}
                        </div>
                      </div>
                      {!systemStatus.dbConnected && (
                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-[8px]">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            ⚠️ Baza de date nu este disponibilă. Site-ul va folosi date fallback. Verifică conexiunea la Supabase.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tables Status */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">Status Tabele</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(systemStatus.tables).map(([tableName, tableInfo]) => (
                          <div
                            key={tableName}
                            className={`p-4 rounded-[12px] border transition-all duration-200 ${
                              tableInfo.status === "ok"
                                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50"
                                : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] capitalize">
                                {tableName.replace(/_/g, " ")}
                              </span>
                              {tableInfo.status === "ok" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            {tableInfo.count !== null ? (
                              <p className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
                                {tableInfo.count} <span className="text-sm font-normal text-[#86868b]">înregistrări</span>
                              </p>
                            ) : (
                              <p className="text-sm text-red-600 dark:text-red-400">Tabel indisponibil</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="text-center pt-4 border-t border-[#e5e5e7] dark:border-[#2d2d2f]">
                      <p className="text-xs text-[#86868b]">
                        Ultima verificare: {systemStatus.timestamp ? new Date(systemStatus.timestamp).toLocaleString("ro-RO") : "N/A"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#86868b]">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-base mb-2 font-medium">Apasă pe "Reîmprospătează" pentru a verifica statusul sistemului</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visitors Live Tab */}
          <TabsContent value="visitors">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                      Vizitatori Live
                    </CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">
                      Monitorizează vizitatorii activi pe site în timp real
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {visitorsLoading && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                    <span className="text-sm text-[#86868b]">
                      {visitors.filter((v) => v.status === "active").length} activi
                    </span>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" checked={includeBots} onChange={(e) => { setIncludeBots(e.target.checked); loadVisitors() }} />
                      Include bot
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <LiveMap
                    points={visitors
                      .filter((v) => v.status === "active")
                      .map((v) => ({ lat: v.latitude, lng: v.longitude, label: v.city || v.country }))}
                  />
                </div>
                {visitors.length === 0 ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-base mb-2 font-medium">Nu există vizitatori activi momentan</p>
                    <p className="text-sm">
                      Vizitatorii care navighează pe site vor apărea aici în timp real
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {visitors.map((visitor) => (
                      <div
                        key={visitor.id}
                        className={`flex items-center justify-between p-4 border rounded-[8px] transition-all duration-200 ${
                          visitor.status === "active"
                            ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50"
                            : "bg-[#f5f5f7] dark:bg-[#2d2d2f] border-[#e5e5e7] dark:border-[#2d2d2f]"
                        }`}
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              visitor.status === "active"
                                ? "bg-green-500 animate-pulse"
                                : "bg-gray-400"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">
                                {visitor.page_title || visitor.current_page}
                              </h3>
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  visitor.status === "active"
                                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {visitor.status === "active" ? "Activ" : "Inactiv"}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>
                                <span className="font-medium">Pagina:</span> {visitor.current_page}
                              </p>
                              {visitor.referrer && (
                                <p>
                                  <span className="font-medium">Referrer:</span>{" "}
                                  <span className="truncate max-w-md inline-block">
                                    {visitor.referrer}
                                  </span>
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-xs">
                                <span>
                                  <span className="font-medium">Ultima activitate:</span>{" "}
                                  {visitor.secondsSinceActivity < 60
                                    ? `acum ${visitor.secondsSinceActivity}s`
                                    : `acum ${Math.floor(visitor.secondsSinceActivity / 60)}m`}
                                </span>
                                <span>
                                  <span className="font-medium">Prima vizită:</span>{" "}
                                  {new Date(visitor.first_seen).toLocaleTimeString("ro-RO", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              {visitor.user_agent && (
                                <p className="text-xs truncate max-w-2xl">
                                  <span className="font-medium">Browser:</span>{" "}
                                  {visitor.user_agent.length > 80
                                    ? `${visitor.user_agent.substring(0, 80)}...`
                                    : visitor.user_agent}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-[#86868b]">
                          <div className="font-mono text-xs opacity-70">
                            {visitor.session_id.substring(0, 12)}...
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">Rezervări</CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Gestionează rezervările primite</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={reservationStatusFilter === "" ? "default" : "outline"}
                      onClick={() => {
                        setReservationStatusFilter("")
                        loadReservations()
                      }}
                      className="h-[36px]"
                    >
                      Toate
                    </Button>
                    <Button
                      type="button"
                      variant={reservationStatusFilter === "pending" ? "default" : "outline"}
                      onClick={() => {
                        setReservationStatusFilter("pending")
                        loadReservations()
                      }}
                      className="h-[36px]"
                    >
                      Pending
                    </Button>
                    <Button
                      type="button"
                      variant={reservationStatusFilter === "approved" ? "default" : "outline"}
                      onClick={() => {
                        setReservationStatusFilter("approved")
                        loadReservations()
                      }}
                      className="h-[36px]"
                    >
                      Aprobat
                    </Button>
                    <Button
                      type="button"
                      variant={reservationStatusFilter === "rejected" ? "default" : "outline"}
                      onClick={() => {
                        setReservationStatusFilter("rejected")
                        loadReservations()
                      }}
                      className="h-[36px]"
                    >
                      Respins
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {reservationsLoading ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
                    <p className="text-base font-medium">Se încarcă rezervările...</p>
                  </div>
                ) : reservations.length === 0 ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <p className="text-base mb-2 font-medium">Nu există rezervări</p>
                    <p className="text-sm">Vor apărea aici când clienții trimit cereri.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((r) => {
                      const name = r.contact_name || r.customer_name || "Client"
                      const city = r.city || r.pickup_city || "N/A"
                      const status = r.status || "pending"
                      const createdAt = r.created_at || r.createdAt
                      return (
                        <div key={r.id} className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px]">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">{name}</span>
                              <span className="px-2 py-0.5 bg-[#f5f5f7] dark:bg-[#2d2d2f] rounded-[4px] text-xs">{city}</span>
                              <span className={`px-2 py-0.5 rounded-[4px] text-xs ${status === "approved" ? "bg-green-100 text-green-700" : status === "rejected" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{status}</span>
                            </div>
                            <div className="text-xs text-[#86868b] mt-1">{createdAt ? new Date(createdAt).toLocaleString("ro-RO") : ""}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => updateReservationStatus(r.id, "approved")}>Aprobă</Button>
                            <Button variant="outline" size="sm" onClick={() => updateReservationStatus(r.id, "rejected")}>Respinge</Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Requests Tab */}
          <TabsContent value="websiteRequests">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">Cereri Website</CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Solicitări stocate în Vercel Blob</CardDescription>
                  </div>
                  <Button type="button" onClick={loadWebsiteRequests} className="h-[36px]">Reîmprospătează</Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {websiteRequestsLoading ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
                    <p className="text-base font-medium">Se încarcă cererile...</p>
                  </div>
                ) : websiteRequests.length === 0 ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <p className="text-base mb-2 font-medium">Nu există cereri</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {websiteRequests.map((req) => (
                      <div key={req.id} className="p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{req.type}</span>
                            <span className={`px-2 py-0.5 rounded-[4px] text-xs ${req.status === "completed" ? "bg-green-100 text-green-700" : req.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>{req.status}</span>
                          </div>
                          <div className="text-xs text-[#86868b]">{new Date(req.submittedAt).toLocaleString("ro-RO")}</div>
                        </div>
                        <div className="text-xs text-[#1d1d1f] dark:text-[#f5f5f7] break-words">
                          {JSON.stringify(req.data)}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" onClick={() => updateWebsiteRequestStatus(req.id, "completed")}>Marchează completat</Button>
                          <ConfirmDialog
                            title="Șterge cerere?"
                            description={`Ești sigur că vrei să ștergi cererea de tip "${req.type}"? Această acțiune nu poate fi anulată.`}
                            onConfirm={() => deleteWebsiteRequest(req.id)}
                          >
                            <Button size="sm" variant="destructive">Șterge</Button>
                          </ConfirmDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">Media</CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Fișiere încărcate</CardDescription>
                  </div>
                  <Button type="button" onClick={loadBlobs} className="h-[36px]">Reîmprospătează</Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {blobsLoading ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
                    <p className="text-base font-medium">Se încarcă fișierele...</p>
                  </div>
                ) : blobs.length === 0 ? (
                  <div className="text-center py-12 text-[#86868b]">
                    <p className="text-base mb-2 font-medium">Nu există fișiere</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blobs.map((b) => (
                      <div key={b.url} className="flex items-center justify-between p-4 border border-[#e5e5e7] dark:border-[#2d2d2f] rounded-[8px]">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium truncate max-w-[40vw]">{b.pathname}</span>
                          <a href={b.url} target="_blank" rel="noreferrer" className="text-xs text-[#14b8a6]">Deschide</a>
                        </div>
                        <ConfirmDialog
                          title="Șterge fișier?"
                          description={`Ești sigur că vrei să ștergi fișierul "${b.pathname}"? Această acțiune nu poate fi anulată.`}
                          onConfirm={() => deleteBlob(b.url)}
                        >
                          <Button size="sm" variant="destructive">Șterge</Button>
                        </ConfirmDialog>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email">
            <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px]">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">Trimite Email</CardTitle>
                    <CardDescription className="text-[#86868b] text-sm">Utilitar intern pentru notificări</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setEmailError("")
                    setEmailSuccess(false)
                    setEmailSending(true)
                    try {
                      const res = await fetch("/api/admin/send-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ to: emailForm.to, subject: emailForm.subject, body: emailForm.body }),
                      })
                      const data = await res.json()
                      if (res.ok && data.success) {
                        setEmailSuccess(true)
                        setEmailForm({ to: "", subject: "", body: "" })
                      } else {
                        setEmailError(data.error || "Eroare la trimiterea email-ului")
                      }
                    } catch (err) {
                      setEmailError("Eroare la trimiterea email-ului")
                    } finally {
                      setEmailSending(false)
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="email-to" className="text-sm font-medium">Către *</Label>
                    <Input id="email-to" value={emailForm.to} onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })} required className="h-[44px]" />
                  </div>
                  <div>
                    <Label htmlFor="email-subject" className="text-sm font-medium">Subiect *</Label>
                    <Input id="email-subject" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} required className="h-[44px]" />
                  </div>
                  <div>
                    <Label htmlFor="email-body" className="text-sm font-medium">Mesaj *</Label>
                    <Textarea id="email-body" value={emailForm.body} onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })} required rows={8} />
                  </div>
                  {emailError && (
                    <div className="p-3 rounded-[8px] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                      <p className="text-sm text-red-600 dark:text-red-400">{emailError}</p>
                    </div>
                  )}
                  {emailSuccess && (
                    <div className="p-3 rounded-[8px] bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
                      <p className="text-sm text-green-700 dark:text-green-300">Email trimis cu succes</p>
                    </div>
                  )}
                  <Button type="submit" className="h-[44px]" disabled={emailSending}>{emailSending ? "Se trimite..." : "Trimite"}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
