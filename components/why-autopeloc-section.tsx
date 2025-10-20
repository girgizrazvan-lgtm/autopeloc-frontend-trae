"use client"

import Image from "next/image"

export function WhyAutoPeLocSection() {
  const benefits = [
    {
      number: "1",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/calculator-vrbLKOnfnLVN7d2KjR3tLKPQ0bp46b.gif",
      title: "Cost 0 pentru păgubit",
      description: "Totul e acoperit de asigurarea vinovatului. Nicio taxă ascunsă, nicio garanție blocată.",
    },
    {
      number: "2",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/track-order-rilPlKK3yIJB1wmeoIO4nIpOF8pIBM.gif",
      title: "Mașină livrată rapid",
      description:
        "Completezi cererea → noi ne ocupăm de rest. În multe cazuri, primești mașina în mai puțin de o oră.",
    },
    {
      number: "3",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/document-YsSEYRvUVWxQ47MCMzsXsOiySqRAZF.gif",
      title: "Fără birocrație",
      description:
        "Nu te plimbi între asigurator, service și flotă. Noi centralizăm tot și obținem acordul în locul tău.",
    },
    {
      number: "4",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new-car-5bxbK4HTU9GVXg2ftAZ8F9a38U5tp7.gif",
      title: "Mașini moderne, curate, gata de drum",
      description:
        "Flote partenere verificate, echipate complet — de la hatchback la SUV. Primești ce ți se potrivește, nu ce a rămas.",
    },
    {
      number: "5",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/customer-support-eLWZYpBUBwabXbUK90tXL9wGEvkFQV.gif",
      title: "Asistență completă până la predare",
      description: "De la prima cerere până la returnarea mașinii, ai un consilier dedicat.",
    },
    {
      number: "6",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/community-NUU6IhcmgOxQAO0osykt2ih5UNdoPH.gif",
      title: "Acces la comunitatea #peloc",
      description:
        "Devii parte dintr-o rețea de mobilitate: oferte exclusive la închirieri, upgrade-uri gratuite și discounturi pentru vacanțe sau deplasări personale.",
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-16 md:py-24">
      <div className="relative z-10 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">De ce autopeloc.ro?</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              <span className="font-bold text-foreground">Misiunea noastră:</span> autopeloc.ro nu e doar un serviciu de
              înlocuire, e modul simplu prin care rămâi în mișcare atunci când mașina ta stă în service.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center pb-12 md:pb-16">
        <div className="mb-12 md:mb-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 md:mb-3 text-foreground px-4">
            Beneficiile care chiar contează
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-center text-muted-foreground mb-6 md:mb-8 font-medium px-4">
            Fără stres, fără telefoane în lanț, fără „reveniți mâine".
          </p>

          <div className="relative">
            <div className="max-w-[340px] sm:max-w-[420px] md:max-w-[600px] lg:max-w-[780px] mx-auto overflow-hidden">
              <div
                className="flex gap-3 md:gap-4 animate-smooth-scroll-mobile sm:animate-smooth-scroll-tablet md:animate-smooth-scroll-desktop"
                style={{
                  width: "fit-content",
                }}
              >
                {benefits.map((benefit) => (
                  <div
                    key={benefit.number}
                    className="flex-shrink-0 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] p-3 sm:p-4 md:p-5 rounded-xl bg-card border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.15)] dark:shadow-[0_0_20px_rgba(20,184,166,0.25)] hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] transition-all duration-500 flex flex-col justify-center items-center text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 md:mb-3 flex items-center justify-center">
                      <Image
                        src={benefit.icon || "/placeholder.svg"}
                        alt={benefit.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1 md:mb-2 line-clamp-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-teal-500/5 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-teal-500/20">
            <p className="text-base sm:text-lg md:text-xl text-foreground mb-6 md:mb-8 font-medium leading-relaxed">
              <span className="inline-flex items-center gap-0.5">
                <span className="font-light">auto</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">pe</span>
                <span className="font-light">loc</span>
                <span className="font-light text-teal-600 dark:text-teal-400">.ro</span>
              </span>{" "}
              înseamnă mobilitate <span className="text-teal-600 dark:text-teal-400 font-semibold">#peloc</span>, cu 0
              costuri pentru tine.
            </p>

            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-teal/40 hover:shadow-xl hover:shadow-teal/50 transition-all duration-300 hover:scale-105"
            >
              Solicită o mașină la schimb
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes smooth-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-256px * 3));
          }
        }

        @keyframes smooth-scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-172px * 3));
          }
        }

        @keyframes smooth-scroll-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-212px * 3));
          }
        }

        @keyframes smooth-scroll-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-256px * 3));
          }
        }

        .animate-smooth-scroll {
          animation: smooth-scroll 40s linear infinite alternate;
        }

        .animate-smooth-scroll-mobile {
          animation: smooth-scroll-mobile 40s linear infinite alternate;
        }

        .animate-smooth-scroll-tablet {
          animation: smooth-scroll-tablet 40s linear infinite alternate;
        }

        .animate-smooth-scroll-desktop {
          animation: smooth-scroll-desktop 40s linear infinite alternate;
        }
      `}</style>
    </section>
  )
}
