"use client"

import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function HeroSection() {
  const scrollToModels = () => {
    const element = document.getElementById("toate-modelele")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const [fiestaSrc, setFiestaSrc] = useState("/ford-fiesta.svg")
  const [glcSrc, setGlcSrc] = useState("/mercedes-glc.svg")
  const [tiguanSrc, setTiguanSrc] = useState("/vw-tiguan.svg")

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal/20 via-transparent to-cyan-500/20 animate-gradient-shift" />
        </div>

        {/* Animated gradient blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-teal/20 to-cyan-500/20 dark:from-teal/30 dark:to-cyan-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal/15 to-cyan-500/15 dark:from-teal/25 dark:to-cyan-500/25 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-gradient-to-bl from-teal/10 to-cyan-500/10 dark:from-teal/20 dark:to-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal/40 dark:bg-teal/60 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-500/30 dark:bg-cyan-500/50 rounded-full animate-float animation-delay-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-teal/40 dark:bg-teal/60 rounded-full animate-float animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-500/30 dark:bg-cyan-500/50 rounded-full animate-float animation-delay-3000" />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-gray-950/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light dark:bg-teal-900/30 border border-teal/20 mb-6">
                <span className="text-sm font-semibold text-teal dark:text-teal-400 uppercase tracking-wide">
                  Flota noastră
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Peste 1000+ Vehicule
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
                Descoperă gama noastră completă de vehicule organizate pe clase, de la mașini compacte pentru oraș până
                la SUV-uri premium și utilitare spațioase.
              </p>

              <button
                onClick={scrollToModels}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal hover:bg-teal/90 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Vezi toate modelele"
              >
                Vezi toate modelele
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-[300px] md:h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                {/* Economy car - Ford Fiesta */}
                <div className="w-24 h-16 md:w-32 md:h-20 bg-gradient-to-br from-teal to-cyan-500 rounded-2xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform shadow-lg hover:shadow-xl">
                  <Image
                    src={fiestaSrc}
                    alt="Ford Fiesta"
                    width={128}
                    height={80}
                    className="w-full h-full object-contain scale-150"
                    priority
                    unoptimized
                    onError={() => setFiestaSrc("/placeholder.svg")}
                  />
                </div>

                {/* SUV Compact - Mercedes GLC */}
                <div className="w-28 h-20 md:w-36 md:h-24 bg-gradient-to-br from-teal to-cyan-500 rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform scale-110 shadow-lg hover:shadow-xl">
                  <Image
                    src={glcSrc}
                    alt="Mercedes GLC"
                    width={144}
                    height={96}
                    className="w-full h-full object-contain scale-150"
                    priority
                    unoptimized
                    onError={() => setGlcSrc("/placeholder.svg")}
                  />
                </div>

                {/* SUV Large - VW Tiguan */}
                <div className="w-24 h-16 md:w-32 md:h-20 bg-gradient-to-br from-teal to-cyan-500 rounded-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform shadow-lg hover:shadow-xl">
                  <Image
                    src={tiguanSrc}
                    alt="VW Tiguan"
                    width={128}
                    height={80}
                    className="w-full h-full object-contain scale-150"
                    priority
                    unoptimized
                    onError={() => setTiguanSrc("/placeholder.svg")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
