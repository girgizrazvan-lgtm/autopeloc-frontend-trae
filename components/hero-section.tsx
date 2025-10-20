"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { matchFleetToTarget, getAllCarsFromCSV } from "@/lib/commercial-fleet-matcher"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getVehicleSIPP } from "@/lib/vehicle-classification"
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

function CustomCalendarDropdown({
  isOpen,
  onClose,
  selected,
  onSelect,
  disabled,
}: {
  isOpen: boolean
  onClose: () => void
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div className="absolute top-full left-0 mt-2 z-[9999] w-auto p-0 bg-white dark:bg-gray-950 border-2 border-teal-500 shadow-lg rounded-lg">
        <div className="w-[320px] p-4">{/* Placeholder for Calendar component */}</div>
      </div>
    </>
  )
}

export function HeroSection() {
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
  const [city, setCity] = useState("")
  const [atFault, setAtFault] = useState("")
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    // Fallback pentru Chrome: asigură vizibilitatea imaginii la primul load
    setHeroLoaded(true)
  }, [])

  const [showMatchingForm, setShowMatchingForm] = useState(false)
  const [carModels, setCarModels] = useState<any[]>([])
  const [selectedMakeName, setSelectedMakeName] = useState("")
  const [selectedModelName, setSelectedModelName] = useState("")
  const [carSearchQuery, setCarSearchQuery] = useState("")
  const [showCarDropdown, setShowCarDropdown] = useState(false)
  const [isOtherCar, setIsOtherCar] = useState(false)
  const [customMake, setCustomMake] = useState("")
  const [customModel, setCustomModel] = useState("")
  const [transmission, setTransmission] = useState("")
  const [year, setYear] = useState("")
  const [isMatching, setIsMatching] = useState(false)
  const [allCars, setAllCars] = useState<Array<{ brand: string; model: string }>>([])
  const [carsLoaded, setCarsLoaded] = useState(false)
  const [selectedCarCategory, setSelectedCarCategory] = useState<string | null>(null)
  const [loadingCategory, setLoadingCategory] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSessionId(getSessionId())
    setSupabase(createClient())
  }, [])

  useEffect(() => {
    getAllCarsFromCSV()
      .then((cars) => {
        setAllCars(cars)
        setCarsLoaded(true)
        console.log("[v0] Loaded", cars.length, "cars from CSV")
      })
      .catch((error) => {
        console.error("[v0] Error loading cars:", error)
        setCarsLoaded(true) // Still mark as loaded to show error state
      })
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

  const isFormValid = city && atFault
  const isMatchingFormValid = isOtherCar
    ? customMake && customModel && transmission && year
    : selectedMakeName && selectedModelName && transmission && year

  const filteredCars =
    carSearchQuery.length >= 2
      ? allCars
          .filter((car) => {
            const searchLower = carSearchQuery.toLowerCase()
            return (
              car.brand.toLowerCase().includes(searchLower) ||
              car.model.toLowerCase().includes(searchLower) ||
              `${car.brand} ${car.model}`.toLowerCase().includes(searchLower)
            )
          })
          .slice(0, 50)
      : []

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
        step_name: "initial_form_submitted",
        step_data: { city, atFault },
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
    if (!isFormValid) return

    await trackStep1()

    if (atFault === "da") {
      router.push("/contact")
    } else if (atFault === "nu") {
      setShowMatchingForm(true)
    } else if (atFault === "nu-stiu") {
      router.push("/servicii/expertize-daune-accidente")
    }
  }

  const handleCarSelect = async (car: { brand: string; model: string }) => {
    setSelectedMakeName(car.brand)
    setSelectedModelName(car.model)
    setCarSearchQuery(`${car.brand} ${car.model}`)
    setShowCarDropdown(false)

    if (year && transmission) {
      setLoadingCategory(true)
      const category = await getVehicleSIPP(car.brand, car.model, transmission as "Manual" | "Automat")
      setSelectedCarCategory(category?.sippCode || null)
      setLoadingCategory(false)
    }
  }

  useEffect(() => {
    if (selectedMakeName && selectedModelName && year && transmission) {
      setLoadingCategory(true)
      const result = getVehicleSIPP(selectedMakeName, selectedModelName, transmission as "Manual" | "Automat")
      setSelectedCarCategory(result?.sippCode || null)
      setLoadingCategory(false)
    } else {
      setSelectedCarCategory(null)
    }
  }, [selectedMakeName, selectedModelName, year, transmission])

  const trackStep2 = async (carData: any) => {
    if (!supabase) {
      console.log("[v0] Supabase client not initialized yet")
      return
    }

    try {
      console.log("[v0] Tracking step 2 with sessionId:", sessionId)

      // Insert step data
      const { error } = await supabase.from("booking_funnel_steps").insert({
        session_id: sessionId,
        step_number: 2,
        step_name: "car_details_submitted",
        step_data: carData,
      })

      if (error) {
        console.error("[v0] Error tracking step 2:", error)
      } else {
        console.log("[v0] Step 2 tracked successfully")
      }
    } catch (error) {
      console.error("[v0] Error tracking step 2:", error)
    }
  }

  const handleMatchFleet = async () => {
    if (!isMatchingFormValid) return

    setIsMatching(true)

    try {
      const carMake = isOtherCar ? customMake : selectedMakeName
      const carModel = isOtherCar ? customModel : selectedModelName

      console.log("[v0] Matching with:", { carMake, carModel, year, transmission })

      await trackStep2({
        brand: carMake,
        model: carModel,
        year: Number.parseInt(year),
        transmission: transmission,
        city: city,
      })

      const result = await matchFleetToTarget({
        brand: carMake,
        model: carModel,
        year: Number.parseInt(year),
        transmission: transmission,
        city: city,
      })

      console.log("[v0] Match result:", result)

      const params = new URLSearchParams({
        sessionId: sessionId,
        city: city,
        atFault: atFault,
        make: carMake,
        model: carModel,
        year: year,
        transmission: transmission,
        category: result.target.categorie_comerciala,
        sipp: result.target.cod_sipp_comercial,
      })

      router.push(`/disponibilitate?${params.toString()}`)
    } catch (error) {
      console.error("[v0] Match error:", error)
      const carMake = isOtherCar ? customMake : selectedMakeName
      const carModel = isOtherCar ? customModel : selectedModelName

      router.push(
        `/contact?reason=car-not-found&make=${encodeURIComponent(carMake)}&model=${encodeURIComponent(carModel)}&year=${year}`,
      )
    } finally {
      setIsMatching(false)
    }
  }

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  
  // Alege varianta imaginii în funcție de temă, cu fallback
  const heroImage = theme === "dark" ? "/accident-hero-dark.svg" : "/accident-hero.svg"

  if (showMatchingForm) {
    return (
      <section className="relative min-h-screen" aria-label="Formular detalii mașină">
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

        <div className="relative container mx-auto px-4 py-12 pt-24 flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl">
            <Button variant="ghost" onClick={() => setShowMatchingForm(false)} className="mb-6">
              ← Înapoi
            </Button>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl border-2 border-teal-400/50 shadow-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Detalii despre mașina ta</h2>
              <p className="text-white/90 text-sm mb-6">Găsim cea mai potrivită mașină de înlocuire</p>

              <div className="space-y-4">
                {!isOtherCar ? (
                  <div>
                    <Label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                      Marca și modelul mașinii
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder={carsLoaded ? "Caută marca și modelul (ex: Dacia Sandero)..." : "Se încarcă..."}
                        value={carSearchQuery}
                        onChange={(e) => {
                          setCarSearchQuery(e.target.value)
                          setShowCarDropdown(e.target.value.length >= 2)
                        }}
                        disabled={!carsLoaded}
                        className="w-full h-12 bg-white dark:bg-gray-900 pr-10"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <SearchIcon />
                      </div>
                      {showCarDropdown && filteredCars.length > 0 && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowCarDropdown(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border-2 border-teal-400 rounded-lg shadow-xl max-h-[300px] overflow-y-auto z-50">
                            {filteredCars.map((car, index) => (
                              <button
                                key={`${car.brand}-${car.model}-${index}`}
                                onClick={() => handleCarSelect(car)}
                                className="w-full px-4 py-3 text-left hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors"
                              >
                                <div className="font-medium">
                                  {car.brand} {car.model}
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                      {showCarDropdown && carSearchQuery && filteredCars.length === 0 && carsLoaded && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowCarDropdown(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border-2 border-teal-400 rounded-lg shadow-xl p-4 z-50">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Nu am găsit rezultate. Încearcă alt termen de căutare sau{" "}
                              <Link href="/contact" className="text-teal-600 dark:text-teal-400 underline">
                                contactează-ne
                              </Link>
                              .
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {selectedCarCategory && !loadingCategory && (
                      <div className="mt-2 px-3 py-2 bg-white/20 rounded-lg">
                        <p className="text-xs text-white/80 mb-1">Cod SIPP:</p>
                        <p className="text-sm font-semibold text-white">{selectedCarCategory}</p>
                      </div>
                    )}
                    {loadingCategory && (
                      <div className="mt-2 px-3 py-2 bg-white/20 rounded-lg">
                        <p className="text-xs text-white/80">Se încarcă codul SIPP...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                        Marca mașinii
                      </Label>
                      <Input
                        type="text"
                        placeholder="Ex: Toyota, BMW, etc."
                        value={customMake}
                        onChange={(e) => setCustomMake(e.target.value)}
                        className="w-full h-12 bg-white dark:bg-gray-900"
                      />
                    </div>

                    <div>
                      <Label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                        Modelul mașinii
                      </Label>
                      <Input
                        type="text"
                        placeholder="Ex: Corolla, X5, etc."
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                        className="w-full h-12 bg-white dark:bg-gray-900"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                      An fabricație
                    </Label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="w-full h-12 bg-white dark:bg-gray-900">
                        <SelectValue placeholder="Anul" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {Array.from({ length: 21 }, (_, i) => 2025 - i).map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                      Cutia de viteze
                    </Label>
                    <Select value={transmission} onValueChange={setTransmission}>
                      <SelectTrigger className="w-full h-12 bg-white dark:bg-gray-900">
                        <SelectValue placeholder="Cutie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manuala">Manuală</SelectItem>
                        <SelectItem value="Automata">Automată</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-center p-3 bg-white/10 rounded-lg">
                  <Link href="/contact" className="text-sm text-white hover:text-white/80 underline transition-colors">
                    Nu găsesc mașina mea în listă? Contactează-ne
                  </Link>
                </div>

                <Button
                  onClick={handleMatchFleet}
                  disabled={!isMatchingFormValid || isMatching || !carsLoaded}
                  className="w-full bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-850 text-teal-600 dark:text-teal-400 py-3 text-sm font-semibold rounded-lg shadow-lg transition-colors"
                >
                  {isMatching ? "Se caută..." : carsLoaded ? "Vezi disponibilitate" : "Se încarcă..."}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

              <div className="relative">
                <label className="block text-xs font-semibold text-white mb-2 uppercase tracking-wider">
                  Ești vinovat de accident?
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-700 dark:text-teal-400 pointer-events-none z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <Select value={atFault} onValueChange={setAtFault}>
                    <SelectTrigger className="w-full pl-11 h-12 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 font-medium transition-colors">
                      <SelectValue placeholder="Selectează" />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      <SelectItem value="nu">Nu</SelectItem>
                      <SelectItem value="da">Da</SelectItem>
                      <SelectItem value="nu-stiu">Nu știu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={!isFormValid}
              className="w-full bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-850 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-500 py-3 text-sm font-semibold rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-teal-600 disabled:hover:border-gray-200"
              aria-label={isFormValid ? "Vezi disponibilitate" : "Completează toate câmpurile pentru a continua"}
            >
              <SearchIcon />
              <span className="ml-2">Vezi disponibilitate</span>
            </Button>
            {!isFormValid && (
              <p className="text-xs text-white/80 text-center mt-2">Completează toate câmpurile pentru a continua</p>
            )}
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
