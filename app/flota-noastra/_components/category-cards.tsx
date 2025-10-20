"use client"

import { ArrowRight, Car } from "lucide-react"
import { useState } from "react"
import { carClasses } from "@/lib/fleet-data"

export function CategoryCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleCardClick = (categoryId: string) => {
    const params = new URLSearchParams()
    params.set("cat", categoryId)
    window.location.href = `?${params.toString()}#toate-modelele`
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Categorii de vehicule</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Alege categoria potrivită nevoilor tale</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {carClasses.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCardClick(category.slug)}
                onMouseEnter={() => setHoveredCard(category.slug)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 text-left transition-all duration-300 hover:border-teal hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                aria-label={`Vezi ${category.title}`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light dark:bg-teal-900/30 text-teal dark:text-teal text-xs font-bold mb-4">
                    {category.carCount} MODELE
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>

                  {/* Arrow */}
                  <div className="flex items-center justify-end">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-teal flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Preview image on hover (placeholder) */}
                {hoveredCard === category.slug && (
                  <div className="absolute bottom-0 right-0 w-32 h-24 opacity-20 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-tl from-teal to-transparent rounded-tl-3xl" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
