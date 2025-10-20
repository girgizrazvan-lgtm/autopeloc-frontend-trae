"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { carClasses } from "@/lib/fleet-data"

export function FleetSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-teal/10 text-teal border-teal/30 hover:bg-teal/15">Flota noastră</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
            Peste <span className="text-teal">1000+</span> Vehicule
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descoperă gama noastră completă de vehicule organizate pe clase, de la mașini compacte pentru oraș până la
            SUV-uri premium și utilitare spațioase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {carClasses.map((carClass, index) => (
            <Link key={index} href={`/flota-noastra?cat=${encodeURIComponent(carClass.title)}`}>
              <Card className="group relative overflow-hidden p-5 cursor-pointer transition-all duration-300 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-teal dark:hover:border-teal hover:shadow-xl hover:shadow-teal/10 hover:-translate-y-1 h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  {/* Badge with number */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-md">
                      <span className="text-white text-lg font-bold">{carClass.carCount}</span>
                      <span className="text-white/90 text-xs font-medium uppercase tracking-wide">modele</span>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-teal/10 dark:group-hover:bg-teal/20 transition-colors">
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-teal group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-teal dark:group-hover:text-teal transition-colors leading-tight">
                      {carClass.title}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed line-clamp-2">
                      {carClass.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold">Gata să alegi vehiculul perfect?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Contactează-ne pentru mai multe detalii despre disponibilitate și prețuri.
          </p>
          <button className="px-8 py-4 bg-teal/10 text-teal border-2 border-teal/30 rounded-lg font-semibold hover:bg-teal/20 hover:border-teal/50 transition-all duration-300 hover:scale-105">
            Solicită oferta
          </button>
        </div>
      </div>
    </section>
  )
}
