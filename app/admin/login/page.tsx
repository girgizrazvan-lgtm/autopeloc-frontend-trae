"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Loader2, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetError, setResetError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push("/admin")
      } else {
        const data = await res.json().catch(() => ({ error: "Eroare necunoscută" }))
        const errorMessage = data.error || "Credențiale invalide"
        const errorDetails = data.details ? ` (${data.details})` : ""
        setError(`${errorMessage}${errorDetails}`)
        console.error("[Login] Login failed:", {
          status: res.status,
          error: errorMessage,
          details: data.details,
        })
      }
    } catch (error: any) {
      console.error("[Login] Network error:", error)
      setError("Eroare la autentificare. Verifică conexiunea și încearcă din nou.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError("")
    setResetSuccess(false)
    setResetLoading(true)

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      })

      const data = await res.json()

      if (res.ok) {
        setResetSuccess(true)
        setResetEmail("")
      } else {
        setResetError(data.error || "Eroare la trimiterea email-ului")
      }
    } catch (error) {
      setResetError("Eroare la trimiterea email-ului")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-[#000000] p-4">
      <Card className="w-full max-w-md relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] animate-in fade-in duration-500">
        <CardHeader className="space-y-6 text-center pb-8 px-12 pt-12 md:px-12 md:pt-12">
          {/* Branding with teal for "pe" and ".ro" */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
              auto<span className="text-[#14b8a6]">pe</span>loc<span className="text-[#14b8a6]">.ro</span>
            </h1>
            <CardDescription className="text-[#86868b] text-sm">
              Panou de administrare
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-12 pb-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="razvan@autopeloc.ro"
                required
                disabled={loading}
                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                Parolă
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setResetDialogOpen(true)}
                className="text-sm text-[#86868b] hover:text-[#14b8a6] font-medium transition-colors duration-200"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
              >
                Ai uitat parola?
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-[8px] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Se conectează...
                </>
              ) : (
                "Conectează-te"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#e5e5e7] dark:border-[#2d2d2f]">
            <p className="text-xs text-center text-[#86868b]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
              Acces restricționat. Doar personalul autorizat poate accesa această zonă.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reset Password Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-md border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-in fade-in duration-200">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
              Resetare Parolă
            </DialogTitle>
            <DialogDescription className="text-[#86868b] text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
              Introdu email-ul asociat contului de admin pentru a primi link-ul de resetare parolă.
            </DialogDescription>
          </DialogHeader>

          {resetSuccess ? (
            <div className="space-y-4">
              <div className="p-4 rounded-[8px] bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
                <p className="text-sm text-green-700 dark:text-green-300 font-medium" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
                  Email trimis cu succes! 📧
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}>
                  Verifică inbox-ul tău (și folderul spam) pentru link-ul de resetare parolă.
                </p>
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => setResetDialogOpen(false)} 
                  className="w-full h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                >
                  Închide
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="razvan@autopeloc.ro"
                  required
                  disabled={resetLoading}
                  className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] bg-white dark:bg-[#1d1d1f] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] rounded-[8px] transition-all duration-200 focus:border-[#14b8a6] focus:ring-0 focus:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#14b8a6] focus-visible:shadow-[0_0_0_4px_rgba(20,184,166,0.1)]"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                />
              </div>

              {resetError && (
                <div className="p-4 rounded-[8px] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                  <p className="text-sm text-red-600 dark:text-red-400">{resetError}</p>
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResetDialogOpen(false)}
                  disabled={resetLoading}
                  className="h-[44px] border border-[#e5e5e7] dark:border-[#2d2d2f] text-[#1d1d1f] dark:text-[#f5f5f7] bg-transparent rounded-[8px] font-medium transition-all duration-200 hover:bg-[#f5f5f7] dark:hover:bg-[#2d2d2f]"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                >
                  Anulează
                </Button>
                <Button 
                  type="submit" 
                  disabled={resetLoading}
                  className="h-[44px] bg-[#000000] dark:bg-[#ffffff] text-white dark:text-[#000000] rounded-[8px] font-medium transition-all duration-200 hover:brightness-110 disabled:opacity-50"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif' }}
                >
                  {resetLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    "Trimite Link"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

