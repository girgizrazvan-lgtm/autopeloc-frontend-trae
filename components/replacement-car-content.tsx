"use client"

import { Button } from "@/components/ui/button"
import { Phone, FileText, CheckCircle2, Car, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

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

const colorClasses = {
  teal: {
    bg: "bg-teal-light dark:bg-teal/20",
    border: "border-teal dark:border-teal",
    text: "text-teal dark:text-teal",
    icon: "text-teal dark:text-teal",
    cardBg: "bg-teal",
    cardText: "text-teal-foreground",
  },
  black: {
    bg: "bg-white dark:bg-white",
    border: "border-border dark:border-border",
    text: "text-black dark:text-black",
    icon: "text-black dark:text-black",
    cardBg: "bg-black dark:bg-black",
    cardText: "text-white dark:text-white",
  },
}

export function ReplacementCarContent() {
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

  return (
    <div className="relative">
      {/* Hero Header */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Mașina de înlocuire
            <br />
            <span className="text-teal">în 3 pași simpli</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Obține rapid o mașină de înlocuire pe toată durata reparațiilor, fără costuri și fără bătăi de cap. Procesul
            nostru este simplu, transparent și rapid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href="tel:0790743974">
                <Phone className="mr-2 h-5 w-5" />
                Sună 0790 743 974
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-xl bg-transparent"
              asChild
            >
              <a href="/#contact">Completează formularul</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative group/carousel">
            {/* Navigation buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-background/95 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:border-teal disabled:opacity-0"
              aria-label="Pasul anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-background/95 backdrop-blur-sm border-2 border-border rounded-full p-3 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110 hover:border-teal disabled:opacity-0"
              aria-label="Pasul următor"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Carousel container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pt-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                  >
                    <div className="group/card bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal hover:shadow-2xl shadow-md hover:z-10 h-full flex flex-col">
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
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 px-4 bg-teal text-teal-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Beneficiezi de mașină de înlocuire pe toată durata reparațiilor
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-teal-foreground/10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg">Gratuit</div>
              <div className="text-sm opacity-90 mt-2">Fără costuri ascunse</div>
            </div>
            <div className="p-6 bg-teal-foreground/10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg">Disponibili</div>
              <div className="text-sm opacity-90 mt-2">Oricând ai nevoie</div>
            </div>
            <div className="p-6 bg-teal-foreground/10 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold mb-2">30 min</div>
              <div className="text-lg">Livrare rapidă</div>
              <div className="text-sm opacity-90 mt-2">De la validare</div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Documente necesare pentru ridicare</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Permis de conducere valabil",
              "Carte de identitate",
              "Constatare amiabilă sau proces verbal",
              "Poliță RCA (a celui vinovat)",
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            Consultantul nostru te va informa despre orice documente suplimentare necesare în cazul tău specific.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Începe acum procesul</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Suntem gata să te ajutăm să obții mașina de înlocuire rapid și fără complicații
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href="tel:0790743974">
                <Phone className="mr-2 h-5 w-5" />
                Sună 0790 743 974
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-teal text-teal-foreground hover:bg-teal/90 px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href="/">Înapoi la pagina principală</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
