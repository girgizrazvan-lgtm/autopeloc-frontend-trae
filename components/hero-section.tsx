"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { getSessionId } from "@/lib/booking-tracker"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="11" cy="11" r="8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export function HeroSection() {
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const [city, setCity] = useState("")
  const [atFaultConfirmed, setAtFaultConfirmed] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    // Fallback pentru Chrome: asigură vizibilitatea imaginii la primul load
    setHeroLoaded(true)
    setMounted(true)
    setSessionId(getSessionId())
    setSupabase(createClient())
  }, [])

  const cities = [
    "București",
    "Craiova",
    "Sibiu",
    "Brașov",
    "Timișoara",
    "Oradea",
    "Cluj-Napoca",
    "Iași",
    "Suceava",
    "Bacău",
  ]

  const isFormValid = city && atFaultConfirmed

  const trackStep1 = async () => {
    if (!supabase) {
      console.log("[v0] Supabase client not initialized yet")
      return
    }

    try {
      console.log("[v0] Tracking step 1 with sessionId:", sessionId)

      // Upsert session
      const { error: sessionError } = await supabase
        .from("booking_sessions")
        .upsert({ session_id: sessionId }, { onConflict: "session_id" })

      if (sessionError) {
        console.error("[v0] Error creating session:", sessionError)
        return
      }

      // Insert step data
      const { error: stepError } = await supabase.from("booking_funnel_steps").insert({
        session_id: sessionId,
        step_number: 1,
        step_name: "hero_form_submitted",
        step_data: { city, atFaultConfirmed },
      })

      if (stepError) {
        console.error("[v0] Error tracking step 1:", stepError)
      } else {
        console.log("[v0] Step 1 tracked successfully")
      }
    } catch (error) {
      console.error("[v0] Error tracking step 1:", error)
    }
  }

  const handleSearch = async () => {
    if (!isFormValid) {
      if (!atFaultConfirmed) {
        // Could show error message here
        return
      }
      return
    }

    // Track the action
    await trackStep1()

    // Redirect directly to fleet page with parameters
    const params = new URLSearchParams({
      city: city,
      filter: "available",
      atFault: "nu",
    })

    router.push(`/flota-noastra?${params.toString()}`)
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  
  // Alege varianta imaginii în funcție de temă, cu fallback
  const heroImage = theme === "dark" ? "/accident-hero-dark.svg" : "/accident-hero.svg"

  return (
    <section className="relative min-h-screen" aria-label="Hero section">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-teal-50/40 to-cyan-100/50 dark:via-teal-950/30 dark:to-cyan-950/40" />

          <div className="absolute inset-0 opacity-40 dark:opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(20 184 166)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(6 182 212)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z"
                fill="url(#wave-gradient-1)"
                style={{ willChange: "transform" }}
              />
            </svg>
          </div>

          <div
            className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-teal-400/30 via-cyan-400/25 to-transparent dark:from-teal-500/40 dark:via-cyan-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            style={{ willChange: "transform" }}
          />
          <div
            className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-gradient-to-tl from-teal-400/30 via-cyan-400/25 to-transparent dark:from-teal-500/40 dark:via-cyan-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            style={{ willChange: "transform" }}
          />

          <div
            className="absolute top-1/4 left-1/5 w-3 h-3 bg-teal-400/40 dark:bg-teal-400/50 rounded-full blur-sm"
            style={{ willChange: "transform" }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-teal-400/30 dark:bg-teal-400/40 rounded-full blur-md"
            style={{ willChange: "transform" }}
          />
          <div
            className="absolute top-1/2 right-1/5 w-3 h-3 bg-cyan-400/30 dark:bg-cyan-400/40 rounded-full blur-md"
            style={{ willChange: "transform" }}
          />
        </div>

      <div className="relative container mx-auto px-4 py-12 pt-24 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-screen">
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center lg:text-left mb-4 text-balance text-foreground">
            Ai avut <span className="text-teal dark:text-teal-400">accident</span>?
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-center lg:text-left mb-2 text-balance text-foreground">
            Primești <span className="text-teal dark:text-teal-400 font-semibold">mașină de înlocuire</span> complet{" "}
            <span className="text-teal dark:text-teal-400 font-semibold">gratuită</span> pe RCA.
          </p>

          <p className="text-muted-foreground dark:text-gray-400 text-center lg:text-left mb-8">
            Completează formularul și vezi exact ce mașină ti se potriveste. Soluții{" "}
            <span className="peloc-hash font-bold">#pe</span>
            <span className="peloc-text font-bold">loc</span>.
          </p>

          <div className="flex lg:hidden items-center justify-center w-full max-w-md mb-8">
            <div className="relative w-full aspect-square">
              <img
                src={heroImage || "/placeholder.svg"}
                alt="Ilustrație accident auto"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{ opacity: heroLoaded ? 1 : 0 }}
                onLoad={() => setHeroLoaded(true)}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  if (target.src.endsWith("accident-hero-dark.svg")) {
                    target.src = "/accident-hero.svg"
                  }
                }}
              />
            </div>
          </div>

          <div
          id="contact-form"
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl border-2 border-teal-400/50 shadow-xl p-4 sm:p-6 relative z-[60]"
          role="search"
          aria-label="Formular verificare eligibilitate"
        >

            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="city" className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                  Oraș
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-700 pointer-events-none z-10">
                    <MapPinIcon />
                  </div>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="w-full pl-11 h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium transition-colors">
                      <SelectValue placeholder="Selectează orașul" />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {cities.map((cityName) => (
                        <SelectItem key={cityName} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                <input
                  type="checkbox"
                  id="atFaultConfirmed"
                  checked={atFaultConfirmed}
                  onChange={(e) => setAtFaultConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 text-teal-600 bg-white border-2 border-white/50 rounded focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
                />
                <label htmlFor="atFaultConfirmed" className="text-sm text-white cursor-pointer flex-1">
                  Confirm că <span className="font-semibold">nu sunt vinovat</span> în accident
                </label>
              </div>

              {!atFaultConfirmed && city && (
                <p className="text-xs text-white/90 text-center">Trebuie să confirmi că nu ești vinovat pentru a continua</p>
              )}

              <Button
                onClick={handleSearch}
                disabled={!isFormValid}
                className="w-full bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-850 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 py-3 text-sm font-semibold rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-teal-600 disabled:hover:border-gray-200"
                aria-label={isFormValid ? "Vezi Flota Disponibilă" : "Completează toate câmpurile pentru a continua"}
              >
                <SearchIcon />
                <span className="ml-2">Vezi Flota Disponibilă</span>
              </Button>
              {!isFormValid && (
                <p className="text-xs text-white/80 text-center">Completează toate câmpurile pentru a continua</p>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center w-full max-w-xl lg:max-w-2xl">
          <div className="relative w-full aspect-square max-w-md sm:max-w-lg lg:max-w-xl">
            {!heroLoaded && <Skeleton className="absolute inset-0 rounded-xl" />}
            <img
              src={heroImage || "/placeholder.svg"}
              alt="Ilustrație accident auto"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ opacity: heroLoaded ? 1 : 0 }}
              onLoad={() => setHeroLoaded(true)}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                if (target.src.endsWith("accident-hero-dark.svg")) {
                  target.src = "/accident-hero.svg"
                }
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-teal dark:hover:text-teal-400 cursor-pointer group z-10"
        aria-label="Derulează în jos pentru a descoperi mai mult"
      >

        <span className="hidden xl:inline text-sm">Descoperă mai mult</span>
        <div className="animate-bounce">
          <ChevronDownIcon />
        </div>
      </button>
    </section>
  )
}
