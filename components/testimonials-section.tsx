"use client"

import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Andrei N.",
      city: "Cluj-Napoca",
      text: "Foarte surprins, eu depind de mașina ca de aer, si cei de la service mi-au recomandat serviciile autopeloc.ro. Fără recenzii pompoase, a fost excelent",
      date: "Acum 2 săptămâni",
    },
    {
      name: "Madalin Onita",
      city: "Oradea",
      text: "Am ajuns la service, si cei de acolo mi-au oferit o Toyota Corolla din 2015, eu am lăsat la reparat VW Touareg, fetele de la autopeloc mi-au oferit Mercedes GLC din 2024. Si foarte prompți. Recomand",
      date: "Acum 1 lună",
    },
    {
      name: "Vlad G.",
      city: "București",
      text: "După ce am deschis dosarul RCA, cei de la autopeloc au preluat complet situația. Răzvan chiar m-a ajutat si cu programarea în service, mașina mea fiind nedeplasabila. Un serviciu corect.",
      date: "Acum 3 săptămâni",
    },
    {
      name: "Radu",
      city: "Timișoara",
      text: "Un serviciu demn de lauda, în prima faza am crezut ca e oferit de Porsche Timisoara, după am aflat ca sunt intermediari independenți. Am rămas total suprins.",
      date: "Acum 1 lună",
    },
    {
      name: "Elena",
      city: "Iași",
      text: "Nu a fost tocmai #peloc, dar mi-au rezolvat toate problemele, foarte drăguți, atât Răzvan cât si fetele de la call-center. Recomand!",
      date: "Acum 2 luni",
    },
    {
      name: "Alex M.",
      city: "Bacau",
      text: "Îl stiu pe Răzvan din liceu, ce a reușit sa facă cu autopeloc e chiar foarte sus ca si standarde. Keep up the good work, chiar mi-a plăcut Yaris Cross-ul.",
      date: "Acum 3 săptămâni",
    },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-16 md:py-20">
      <div className="relative z-10 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce spun clienții noștri</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experiențe reale, rezultate rapide
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-base sm:text-lg font-semibold text-foreground">Rating mediu:</span>
            <span className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">4.9</span>
            <span className="text-xl sm:text-2xl font-bold text-yellow-400">★</span>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center pb-12 md:pb-16">
        <div className="mb-12 md:mb-16">
          {/* Carousel container - responsive widths */}
          <div className="relative">
            <div className="max-w-[340px] sm:max-w-[420px] md:max-w-[600px] lg:max-w-[780px] mx-auto overflow-hidden">
              <div
                className="flex gap-3 md:gap-4 animate-testimonial-scroll-mobile sm:animate-testimonial-scroll-tablet md:animate-testimonial-scroll-desktop"
                style={{
                  width: "fit-content",
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[180px] h-[280px] sm:w-[220px] sm:h-[320px] md:w-[260px] md:h-[360px] p-4 sm:p-5 md:p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    {/* Header with avatar and name */}
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar circle with initial */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-base">{testimonial.name.charAt(0)}</span>
                      </div>

                      {/* Name and date */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {testimonial.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{testimonial.date}</p>
                      </div>
                    </div>

                    {/* 5 stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 overflow-hidden">
                      {testimonial.text}
                    </p>

                    {/* Location at bottom */}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">📍 {testimonial.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats and CTA */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-r from-teal-500/5 via-cyan-500/5 to-teal-500/5 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-teal-500/20 mb-6 md:mb-8">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              <span className="inline-flex items-center gap-0.5 font-semibold text-foreground">
                <span className="font-light">auto</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">pe</span>
                <span className="font-light">loc</span>
                <span className="font-light text-teal-600 dark:text-teal-400">.ro</span>
              </span>{" "}
              a ajutat deja peste <span className="font-bold text-teal-600 dark:text-teal-400">500 de șoferi</span> să
              rămână în mișcare în timp ce mașina lor era în service.
            </p>

            <p className="text-xs sm:text-sm text-muted-foreground italic">
              Nu suntem perfecți, dar lucrăm să ajungem acolo.
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 rounded-lg p-3 sm:p-4 shadow-md">
            <p className="text-xs sm:text-sm font-semibold text-white mb-2">Vrei și tu o experiență de top?</p>

            <a
              href="#contact-form"
              className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm bg-white hover:bg-gray-50 text-teal-600 dark:text-teal-700 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              Solicită o mașină la schimb acum
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes testimonial-scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-172px * 3));
          }
        }

        @keyframes testimonial-scroll-tablet {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-212px * 3));
          }
        }

        @keyframes testimonial-scroll-desktop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-256px * 3));
          }
        }

        .animate-testimonial-scroll-mobile {
          animation: testimonial-scroll-mobile 40s linear infinite alternate;
        }

        .animate-testimonial-scroll-tablet {
          animation: testimonial-scroll-tablet 40s linear infinite alternate;
        }

        .animate-testimonial-scroll-desktop {
          animation: testimonial-scroll-desktop 40s linear infinite alternate;
        }
      `}</style>
    </section>
  )
}
