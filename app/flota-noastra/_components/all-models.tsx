"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Car, Users, Cog, Fuel, Gauge } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { getAllCars, carClasses, type Car as CarType } from "@/lib/fleet-data"
import { Skeleton } from "@/components/ui/skeleton"
import { ReservationDialog } from "@/components/reservation-dialog"
import { QuickReserveDialog } from "./quick-reserve-dialog"

export function AllModels() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const allModels = useMemo(() => getAllCars(), [])
  const [filteredModels, setFilteredModels] = useState(allModels)
  const [displayCount, setDisplayCount] = useState(12)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const [quickOpen, setQuickOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [prefilledData, setPrefilledData] = useState<{
    city: string
    atFault: string
    serviceStartDate: string
    serviceStartTime: string
    serviceEndDate: string
    serviceEndTime: string
  } | null>(null)

  useEffect(() => {
    const cat = searchParams.get("cat")
    const trans = searchParams.get("trans")
    setSelectedCategory(cat)
    setSelectedTransmission(trans)
  }, [searchParams])

  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      const category = event.detail === "Toate" ? null : event.detail
      setSelectedCategory(category)
    }

    const handleTransmissionChange = (event: CustomEvent) => {
      const transmission = event.detail === "Toate" ? null : event.detail
      setSelectedTransmission(transmission)
    }

    window.addEventListener("categoryChange", handleCategoryChange as EventListener)
    window.addEventListener("transmissionChange", handleTransmissionChange as EventListener)
    return () => {
      window.removeEventListener("categoryChange", handleCategoryChange as EventListener)
      window.removeEventListener("transmissionChange", handleTransmissionChange as EventListener)
    }
  }, [])

  useEffect(() => {
    let filtered = allModels

    if (selectedCategory) {
      const category = carClasses.find((c) => c.title === selectedCategory)
      if (category) {
        filtered = category.cars
      }
    }

    if (selectedTransmission) {
      filtered = filtered.filter((model) => {
        return model.specs.transmission.includes(selectedTransmission)
      })
    }

    if (searchQuery) {
      filtered = filtered.filter((model) => model.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredModels(filtered)
  }, [searchQuery, selectedCategory, selectedTransmission, allModels])

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12)
  }

  const getCategoryForCar = (car: CarType) => {
    const category = carClasses.find((c) => c.cars.some((c) => c.name === car.name))
    return category?.title || "Unknown"
  }

  return (
    <section id="toate-modelele" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Toate modelele</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explorează întreaga noastră gamă de {allModels.length} vehicule disponibile
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Caută model sau marcă..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none transition-colors"
                aria-label="Caută vehicule"
              />
            </div>
          </div>

          {/* Models grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredModels.slice(0, displayCount).map((model, index) => (
              <div
                key={`${model.name}-${index}`}
                className="bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-teal hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 bg-muted overflow-hidden flex items-center justify-center">
                  {!loaded[index] && <Skeleton className="absolute inset-0 rounded-xl" />}
                  <Image
                    src={(failed[index] ? "/placeholder.svg" : model.image) || "/placeholder.svg"}
                    alt={model.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-contain transition-transform duration-300"
                    unoptimized={model.image?.endsWith(".svg")}
                    onLoadingComplete={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
                    onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-foreground">{model.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-400 font-medium">
                      Disponibil
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{getCategoryForCar(model)}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5" />
                      <span className="truncate">{model.specs.engine}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cog className="w-3.5 h-3.5" />
                      <span className="truncate">{model.specs.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>{model.specs.seats} locuri</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5" />
                      <span className="truncate">{model.specs.fuel}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="w-full px-4 py-2.5 bg-teal text-white rounded-lg font-medium hover:bg-teal/90 transition-colors text-sm"
                    onClick={() => { setSelectedVehicle(model.name); setQuickOpen(true); }}
                  >
                    Rezervă acum
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          {displayCount < filteredModels.length && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-card border-2 border-border text-foreground rounded-xl font-semibold hover:border-teal hover:text-teal transition-colors"
              >
                Încarcă mai multe ({filteredModels.length - displayCount} rămase)
              </button>
            </div>
          )}

          {filteredModels.length === 0 && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Nu am găsit vehicule pentru căutarea ta</p>
            </div>
          )}

          {/* Quick Reserve + Reservation Dialogs */}
          {selectedVehicle && (
            <>
              <QuickReserveDialog
                open={quickOpen}
                onOpenChange={setQuickOpen}
                vehicleName={selectedVehicle}
                onContinue={(prefilled) => { setPrefilledData(prefilled); setQuickOpen(false); setReservationOpen(true); }}
              />
              <ReservationDialog
                open={reservationOpen}
                onOpenChange={setReservationOpen}
                vehicleName={selectedVehicle}
                prefilledData={prefilledData}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
