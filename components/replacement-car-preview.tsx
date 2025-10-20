"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const Car = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0h-.01M15 17a2 2 0 104 0m-4 0h-.01"
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

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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

export function ReplacementCarPreview() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const steps = [
    {
      id: 1,
      title: "Solicită mașina",
      description:
        "Contactează-ne telefonic la 0790 743 974 sau completează formularul online disponibil pe site. Procesul este simplu și rapid - ai nevoie doar de câteva minute pentru a transmite datele necesare.",
      icon: Phone,
      details: ["Disponibil 24/7", "Răspuns imediat", "Fără documente inițiale"],
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Validăm cererea",
      description:
        "Echipa noastră procesează și validează solicitarea ta în timp real. Pentru cazurile simple, validarea se face în câteva minute. Verificăm eligibilitatea și pregătim mașina de înlocuire.",
      icon: FileText,
      details: ["Procesare rapidă", "Validare automată", "Confirmare instant"],
      gradient: "from-blue-500 to-teal-500",
    },
    {
      id: 3,
      title: "Ridici mașina gratuit",
      description:
        "După validare, te prezinți la sediul nostru cu documentele necesare (CI/permis) și ridici mașina de înlocuire. Beneficiezi de aceasta pe toată durata reparațiilor, complet gratuit.",
      icon: Car,
      details: ["Fără costuri", "Mașini moderne", "Asigurare inclusă"],
      gradient: "from-cyan-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
            <Car className="h-4 w-4 text-teal" />
            <span className="text-sm font-medium text-teal">Proces Simplu și Rapid</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Mașina de înlocuire <span className="text-teal">în 3 pași simpli</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Obții rapid o mașină de înlocuire pe toată durata reparațiilor, fără costuri suplimentare. Procesul este
            transparent, rapid și complet digitalizat.
          </p>
        </div>

        <div className="relative group/carousel">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-background/95 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:border-teal disabled:opacity-0"
            aria-label="Articol anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-background/95 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:border-teal disabled:opacity-0"
            aria-label="Articol următor"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                >
                  <div className="group/card bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal hover:shadow-2xl shadow-md h-full flex flex-col">
                    {/* Gradient header */}
                    <div className={`h-2 bg-gradient-to-r ${step.gradient}`} />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Icon and number */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-cyan-600 flex items-center justify-center group-hover/card:scale-110 transition-transform shadow-lg">
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shadow-md">
                            {step.id}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-balance group-hover/card:text-teal transition-colors">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{step.description}</p>

                      {/* Separator */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

                      {/* Details list */}
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-teal flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 border border-border shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-teal" />
            <p className="text-lg font-semibold">Procesul durează în medie 15-30 minute</p>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            De la primul contact până la ridicarea mașinii, totul se întâmplă rapid și fără bătăi de cap. Echipa noastră
            te ghidează pas cu pas.
          </p>
          <Button
            size="lg"
            className="bg-teal text-teal-foreground hover:bg-teal/90 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-xl"
            asChild
          >
            <Link href="/masina-inlocuire">
              <span className="md:hidden">Vezi detalii complete</span>
              <span className="hidden md:inline">Vezi procesul complet și documentele necesare</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
