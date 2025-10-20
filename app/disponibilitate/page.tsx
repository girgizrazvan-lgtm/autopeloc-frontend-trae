"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReservationDialog } from "@/components/reservation-dialog"
import Image from "next/image"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { carClasses } from "@/lib/fleet-data"
import { getCategoriesForSIPPCodes } from "@/lib/sipp-matcher"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { validateAndMatchSIPP } from "@/lib/acriss-sipp-validator"

function CarCard({ car, onReserve }: { car: any; onReserve: (name: string) => void }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-teal bg-card group h-full">
      <div className="p-4 space-y-3">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-teal/10 to-cyan/5 rounded-xl overflow-hidden border border-border">
          {!loaded && <Skeleton className="absolute inset-0 rounded-xl" />}
          <Image
            src={car.image || "/placeholder.svg"}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain scale-[1.4] group-hover:scale-[1.47] transition-transform duration-500 p-4"
            unoptimized
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-sm">{car.name}</h3>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>{car.specs.engine}</p>
              <p>
                {car.specs.transmission} • {car.specs.seats} locuri
              </p>
              <p className="text-[10px]">SIPP: {car.sippCode}</p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => onReserve(car.name)}
            className="w-full bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-medium shadow-md hover:shadow-lg transition-all text-xs"
          >
            Rezervă acum
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default function DisponibilitatePage() {
  const searchParams = useSearchParams()
  const [reservationDialogOpen, setReservationDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [loadedSuggestions, setLoadedSuggestions] = useState<Record<string, boolean>>({})

  const sippCodes = searchParams.get("sipp")?.split(",").filter(Boolean) || []
  const userCategory = searchParams.get("category") || ""
  const confidence = searchParams.get("confidence") || ""
  const userMake = searchParams.get("make") || ""
  const userModel = searchParams.get("model") || ""
  const userTransmission = searchParams.get("transmission") || ""
  const isUnknownCar = searchParams.get("unknown") === "true"
  const sessionId = searchParams.get("sessionId") || ""
  const userYear = searchParams.get("year") || ""
  const atFaultParam = (searchParams.get("atFault") || "").toLowerCase()
  const isEligibleByFault = atFaultParam === "nu"

  const prefilledData = useMemo(() => {
    const city = searchParams.get("city")
    const atFault = searchParams.get("atFault")
    const serviceStartDate = searchParams.get("serviceStartDate")
    const serviceStartTime = searchParams.get("serviceStartTime")
    const serviceEndDate = searchParams.get("serviceEndDate")
    const serviceEndTime = searchParams.get("serviceEndTime")

    if (city) {
      return {
        city,
        atFault: atFault || "",
        serviceStartDate: serviceStartDate || "",
        serviceStartTime: serviceStartTime || "",
        serviceEndDate: serviceEndDate || "",
        serviceEndTime: serviceEndTime || "",
      }
    }
    return null
  }, [searchParams])

  const filteredCarClasses = useMemo(() => {
    if (sippCodes.length === 0) {
      return carClasses
    }

    const matchingCategories = getCategoriesForSIPPCodes(sippCodes)

    return carClasses.filter((carClass) => {
      const hasMatchingSIPP = carClass.sippCodes.some((code) => sippCodes.includes(code))
      const hasMatchingCategory = matchingCategories.includes(carClass.slug)

      return hasMatchingSIPP || hasMatchingCategory
    })
  }, [sippCodes])

  const filteredCarsInClasses = useMemo(() => {
    return filteredCarClasses
      .map((carClass) => {
        if (!userTransmission) return carClass

        const filteredCars = carClass.cars.filter((car) => {
          const carTrans = car.specs.transmission.toLowerCase()
          const userTrans = userTransmission.toLowerCase()

          return carTrans === userTrans || carTrans.includes("/") || carTrans.includes("automat")
        })

        return {
          ...carClass,
          cars: filteredCars,
          carCount: filteredCars.length,
        }
      })
      .filter((carClass) => carClass.cars.length > 0)
  }, [filteredCarClasses, userTransmission])

  const totalCars = filteredCarsInClasses.reduce((sum, carClass) => sum + carClass.carCount, 0)

  const handleReserveClick = (vehicleName: string) => {
    setSelectedVehicle(vehicleName)
    setReservationDialogOpen(true)
  }

  const matchResult = useMemo(() => {
    if (!userMake || !userModel || !userTransmission) return null
    const trans = userTransmission === "automat" ? "automat" : "manual"
    try {
      return validateAndMatchSIPP(userMake, userModel, trans as "manual" | "automat", carClasses, userYear)
    } catch (e) {
      return null
    }
  }, [userMake, userModel, userTransmission, userYear])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">


        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {isUnknownCar
                  ? "Avem nevoie de mai multe informații"
                  : sippCodes.length > 0
                    ? "Mașini potrivite pentru tine"
                    : "Vehicule disponibile"}
              </h1>
              {isUnknownCar ? (
                <div className="space-y-4 max-w-xl mx-auto">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Ai introdus: {" "}
                    <span className="font-semibold text-foreground">
                      {userMake} {userModel}
                    </span>
                  </p>
                  <div className="bg-muted/50 border-2 border-teal/20 rounded-xl p-6 space-y-3">
                    <p className="text-base font-medium text-foreground">
                      Nu avem modelul tău în baza de date încă, dar te putem ajuta!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sună-ne acum pentru a discuta despre mașina ta și a găsi cea mai bună soluție de înlocuire.
                    </p>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                      onClick={() => window.open("tel:0790743974")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Sună acum: 0790 743 974
                    </Button>
                  </div>
                </div>
              ) : sippCodes.length > 0 && userMake && userModel ? (
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Bazat pe mașina ta: {" "}
                    <span className="font-semibold text-foreground">
                      {userMake} {userModel}
                    </span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      Transmisie: {userTransmission === "manual" ? "manuală" : "automată"}
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-teal/10 to-cyan/10 border border-teal/30 rounded-full">
                      <span className="text-muted-foreground">Categorie:</span>
                      <span className="font-semibold text-teal">{userCategory}</span>
                      {sippCodes.length > 0 && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="font-mono text-xs text-cyan">{sippCodes[0]}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm md:text-base text-muted-foreground">
                  Explorează toate modelele disponibile din flota noastră
                </p>
              )}
            </div>
          </div>
        </section>

        {!isEligibleByFault && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <Card className="p-6 md:p-8 border-2 border-teal/30 bg-teal/5">
                <h2 className="text-xl font-bold mb-2">Serviciu alternativ</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Dacă ești vinovat sau nu știi încă, îți oferim consultanță și expertiză pentru dosarul de daună. Mașina la schimb se oferă doar păgubiților (NU vinovat).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => (window.location.href = "/servicii/consultanta-dosar-dauna")}
                    className="bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white"
                  >
                    Consultanță dosar daună
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/servicii/expertize-daune-accidente")}
                  >
                    Expertize daune
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = "/contact")}> 
                    Contact
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        )}

        {isEligibleByFault && !isUnknownCar && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              {filteredCarsInClasses.length > 0 ? (
                <div className="space-y-12">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {totalCars} {totalCars === 1 ? "vehicul găsit" : "vehicule găsite"} în {" "}
                      {filteredCarsInClasses.length} {filteredCarsInClasses.length === 1 ? "categorie" : "categorii"}
                    </p>
                  </div>

                  {filteredCarsInClasses.map((carClass) => (
                    <div key={carClass.slug} className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{carClass.title}</h2>
                        <p className="text-sm text-muted-foreground">{carClass.description}</p>
                        <p className="text-xs text-muted-foreground">Coduri SIPP: {carClass.sippCodes.join(", ")}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {carClass.cars.map((car, index) => (
                          <CarCard key={`${car.name}-${index}`} car={car} onReserve={handleReserveClick} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-10">
                  <div className="text-center py-12">
                    <p className="text-sm md:text-base text-muted-foreground">
                      Vehiculul respectiv nu este disponibil momentan. Rezervă o clasă inferioară între timp.
                    </p>
                    {matchResult && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Sugestii ACRISS pentru {userMake} {userModel} — cod: {matchResult.canonicalSipp}
                      </p>
                    )}
                  </div>

                  {matchResult && matchResult.upgradeMatches.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Opțiuni upgrade (necesită rezervare pentru confirmare)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {matchResult.upgradeMatches.slice(0, 8).map((m) => (
                          <Card key={m.vehicleId} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-teal bg-card group h-full">
                            <div className="p-4 space-y-3">
                              <div className="relative aspect-[4/3] bg-gradient-to-br from-teal/10 to-cyan/5 rounded-xl overflow-hidden border border-border">
                                {!loadedSuggestions[m.vehicleId] && <Skeleton className="absolute inset-0 rounded-xl" />}
                                <Image
                                  src={m.image || "/placeholder.svg"}
                                  alt={m.vehicleName}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  className="object-contain scale-[1.4] transition-transform duration-500 p-4"
                                  unoptimized
                                  onLoadingComplete={() => setLoadedSuggestions((prev) => ({ ...prev, [m.vehicleId]: true }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <h4 className="font-bold text-foreground text-sm">{m.vehicleName}</h4>
                                  <div className="text-xs text-muted-foreground space-y-0.5">
                                    <p>{m.specs.engine}</p>
                                    <p>{m.specs.transmission} • {m.specs.seats} locuri</p>
                                    <p className="text-[10px]">SIPP: {m.sippCode}</p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleReserveClick(m.vehicleName)}
                                  className="w-full bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-medium shadow-md hover:shadow-lg transition-all text-xs"
                                >
                                  Rezervă
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchResult && matchResult.downgradeMatches.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Opțiuni downgrade (gratuit)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {matchResult.downgradeMatches.slice(0, 8).map((m) => (
                          <Card key={m.vehicleId} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-teal bg-card group h-full">
                            <div className="p-4 space-y-3">
                              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/40 rounded-xl overflow-hidden border border-border">
                                {!loadedSuggestions[m.vehicleId] && <Skeleton className="absolute inset-0 rounded-xl" />}
                                <Image
                                  src={m.image || "/placeholder.svg"}
                                  alt={m.vehicleName}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  className="object-contain scale-[1.4] transition-transform duration-500 p-4"
                                  unoptimized
                                  onLoadingComplete={() => setLoadedSuggestions((prev) => ({ ...prev, [m.vehicleId]: true }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <h4 className="font-bold text-foreground text-sm">{m.vehicleName}</h4>
                                  <div className="text-xs text-muted-foreground space-y-0.5">
                                    <p>{m.specs.engine}</p>
                                    <p>{m.specs.transmission} • {m.specs.seats} locuri</p>
                                    <p className="text-[10px]">SIPP: {m.sippCode}</p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleReserveClick(m.vehicleName)}
                                  className="w-full bg-gradient-to-r from-teal to-cyan hover:from-teal/90 hover:to-cyan/90 text-white font-medium shadow-md hover:shadow-lg transition-all text-xs"
                                >
                                  Rezervă
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <Button onClick={() => (window.location.href = "/flota-noastra")} className="mt-2" variant="outline">
                      Vezi toată flota
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {isEligibleByFault && (
        <ReservationDialog
          open={reservationDialogOpen}
          onOpenChange={setReservationDialogOpen}
          vehicleName={selectedVehicle}
          sessionId={sessionId}
          userMake={userMake}
          userModel={userModel}
          userYear={userYear}
          userTransmission={userTransmission}
          prefilledData={prefilledData}
        />
      )}
    </div>
  )
}
