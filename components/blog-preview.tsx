"use client"

import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const fallbackBlogPosts = [
  {
    slug: "masina-la-schimb-2025-drepturi-pagubit",
    title: "Mașina la schimb în 2025 – Drepturile păgubitului, explicate pas cu pas",
    excerpt:
      "Legislația în vigoare garantează dreptul la o mașină la schimb pentru orice șofer păgubit. Află cum poți beneficia de acest drept și ce pași trebuie să urmezi.",
    date: "8 septembrie 2025",
    category: "Legislație",
    readTime: "5 min",
    color: "from-teal-500 to-cyan-500",
  },
  {
    slug: "provocari-masina-la-schimb-2025",
    title: "Provocări reale la obținerea mașinii la schimb: Ce trebuie să știi în 2025",
    excerpt:
      "Flote insuficiente, întârzieri birocratice și costuri ascunse - descoperă provocările practice în obținerea mașinii la schimb și cum să le depășești.",
    date: "12 septembrie 2025",
    category: "Ghid Practic",
    readTime: "6 min",
    color: "from-blue-500 to-teal-500",
  },
  {
    slug: "tendinte-masina-la-schimb-2025",
    title: "Noile tendințe în sistemul de mașină la schimb pentru accidente în 2025",
    excerpt:
      "Digitalizarea și platformele online transformă radical modul în care șoferii păgubiți obțin mașini la schimb. Descoperă ce s-a schimbat în 2025 și ce ne așteaptă.",
    date: "16 septembrie 2025",
    category: "Tendințe",
    readTime: "5 min",
    color: "from-cyan-500 to-blue-500",
  },
  {
    slug: "flux-reparatii-service-masina-schimb-2025",
    title: "Fluxul reparațiilor în service pentru mașina la schimb: pașii critici pentru 2025",
    excerpt:
      "Înțelege procesul complet de reparații și cum să obții mașina la schimb. Ghid detaliat despre deschiderea dosarului de daună, predarea mașinii în service și calcularea perioadei de înlocuire.",
    date: "20 septembrie 2025",
    category: "Ghid Service",
    readTime: "7 min",
    color: "from-teal-600 to-cyan-600",
  },
  {
    slug: "reparatie-neconforma-dupa-accident",
    title: "Ce se întâmplă dacă reparația mașinii după accident nu este conformă?",
    excerpt:
      "Ghid complet despre drepturile tale când reparația mașinii după accident nu este conformă. Află cum identifici problemele, ce pași să urmezi și cum să îți protejezi drepturile.",
    date: "24 septembrie 2025",
    category: "Drepturi Consumator",
    readTime: "6 min",
    color: "from-orange-500 to-red-500",
  },
  {
    slug: "practici-neetice-reparatii-rca-2025",
    title: "Practici neetice în reparațiile auto pe RCA: ce trebuie să știe păgubitții în 2025",
    excerpt:
      "Devize umflate, piese de calitate inferioară și întârzieri nejustificate - descoperă practicile neetice în reparațiile auto și cum să te protejezi eficient.",
    date: "28 septembrie 2025",
    category: "Protecție Consumator",
    readTime: "8 min",
    color: "from-red-500 to-orange-500",
  },
  {
    slug: "imbogatire-service-uri-masina-schimb",
    title: "Cum s-au îmbogățit service-urile nejust de pe urma legilor cu mașina la schimb",
    excerpt:
      "Investigație despre abuzurile sistemice în piața mașinilor la schimb: cazuri concrete de devize umflate, mecanisme de îmbogățire și impactul asupra prețurilor RCA.",
    date: "2 octombrie 2025",
    category: "Investigație",
    readTime: "10 min",
    color: "from-red-500 to-orange-500",
  },
  {
    slug: "masuri-asf-reducere-fraude-2025",
    title: "Măsuri propuse de ASF pentru reducerea fraudelor în 2025",
    excerpt:
      "Descoperă cele 12 măsuri concrete implementate de ASF, ANAF și ANPC pentru combaterea fraudelor în sistemul RCA și reducerea prețurilor nejustificate.",
    date: "6 octombrie 2025",
    category: "Legislație",
    readTime: "10 min",
    color: "from-teal-500 to-cyan-500",
  },
]

// Helper function to get gradient color based on category
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Legislație: "from-teal-500 to-cyan-500",
    "Ghid Practic": "from-blue-500 to-teal-500",
    Tendințe: "from-cyan-500 to-blue-500",
    "Ghid Service": "from-teal-600 to-cyan-600",
    "Drepturi Consumator": "from-orange-500 to-red-500",
    "Protecție Consumator": "from-red-500 to-orange-500",
    Investigație: "from-red-500 to-orange-500",
  }
  return colors[category] || "from-teal-500 to-cyan-500"
}

export function BlogPreview() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [blogPosts, setBlogPosts] = useState(fallbackBlogPosts)

  // Load blog posts from API
  useEffect(() => {
    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) {
          console.warn(`[BlogPreview] API returned ${res.status}, using fallback data`)
          return []
        }
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Take latest 8 published posts
          const latestPosts = data
            .filter((post: any) => post.isPublished)
            .slice(0, 8)
            .map((post: any) => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt || post.description,
              date: new Date(post.publishedAt).toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              category: post.category,
              readTime: post.readTime || "5 min",
              color: getCategoryColor(post.category),
            }))

          if (latestPosts.length > 0) {
            console.log(`[BlogPreview] Successfully loaded ${latestPosts.length} blog posts from database`)
            setBlogPosts(latestPosts)
          } else {
            console.warn("[BlogPreview] No published posts found in database, using fallback data")
          }
        } else {
          console.warn("[BlogPreview] No blog posts found in database, using fallback data")
        }
      })
      .catch((error) => {
        console.error("[BlogPreview] Error loading blog posts from API:", {
          message: error?.message || "Unknown error",
          name: error?.name,
        })
        console.warn("[BlogPreview] Falling back to static blog posts")
      })
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ultimele articole din blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Informații utile despre drepturile tale ca șofer și legislația în vigoare
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors border-2 border-teal-500"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-teal-600" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-teal-50 dark:hover:bg-teal-900 transition-colors border-2 border-teal-500"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-teal-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide px-12"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className="flex gap-6 animate-blog-scroll-mobile sm:animate-blog-scroll-tablet md:animate-blog-scroll-desktop"
              style={{
                width: "fit-content",
              }}
            >
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] scale-95 hover:scale-100 transition-all duration-300 ease-out"
                >
                  <Card className="h-full overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-out group border-2 hover:border-teal-500 cursor-pointer">
                    <div className={`h-2 bg-gradient-to-r ${post.color}`} />
                    <div className="p-6 flex flex-col h-full">
                      <Badge
                        variant="secondary"
                        className="w-fit mb-4 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 transition-colors duration-300 text-balance leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow text-pretty line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-teal-600" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-teal-600" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all duration-300">
                        Citește articolul complet
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              size="lg"
              className="group border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
            >
              Vezi toate articolele
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blog-scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-272px * 4));
          }
        }

        @keyframes blog-scroll-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-312px * 4));
          }
        }

        @keyframes blog-scroll-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-352px * 4));
          }
        }

        .animate-blog-scroll-mobile {
          animation: blog-scroll-mobile 60s linear infinite alternate;
        }

        .animate-blog-scroll-tablet {
          animation: blog-scroll-tablet 60s linear infinite alternate;
        }

        .animate-blog-scroll-desktop {
          animation: blog-scroll-desktop 60s linear infinite alternate;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
