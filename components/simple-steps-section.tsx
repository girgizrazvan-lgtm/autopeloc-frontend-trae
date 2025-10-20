'use client'
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function SimpleStepsSection() {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const steps = [
    {
      number: "1",
      title: "Ne contactezi!",
      description: "Completezi cererea și atașezi nota de constatare (foto sau PDF).",
      image: "/images/pasul1.svg",
    },
    {
      number: "2",
      title: "Obținem acordul de la asigurător",
      description: "Verificăm dosarul și cerem acordul inițial pentru mașina la schimb.",
      image: "/images/pasul3.svg",
    },
    {
      number: "3",
      title: "Îți livrăm mașina",
      description: "Livrare la service sau la domiciliu — semnezi și pleci, fără garanții sau costuri ascunse.",
      image: "/images/pasul2.svg",
    },
  ]

  return (
    <section id="pasi-simpli" className="relative py-16 md:py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mașina de înlocuire în 3 pași simpli</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Proces simplu, rapid și eficient. Eviți cozile și birocrația care duc la același rezultat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="neon-card-glow group relative rounded-2xl shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden bg-background dark:bg-gray-900"
            >
              <div className="relative w-full h-[320px] md:h-[340px] flex-shrink-0">
                {!loaded[index] && <Skeleton className="absolute inset-0 rounded-2xl" />}
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={`Pasul ${step.number}`}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm md:text-base font-bold">Pasul {step.number}</span>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/98 border-t-2 border-teal-500/40 dark:border-teal-500/50 p-4">
                <h3 className="text-sm md:text-base font-bold mb-2 text-balance text-gray-900 dark:text-white text-center">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200 text-pretty leading-snug text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-teal/40 hover:shadow-xl hover:shadow-teal/50 transition-all duration-300 hover:scale-105"
            >
              Vreau mașină la schimb
            </a>
            <a
              href="/flota-noastra"
              className="secondary-cta-button inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full"
            >
              Vezi flota
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
