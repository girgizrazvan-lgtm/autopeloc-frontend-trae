import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-teal to-cyan-500 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 dark:bg-black/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Găsește mașina ideală pentru perioada ta de service sau călătorie
          </h2>
          <p className="text-xl text-white/90 dark:text-white/80 mb-8">
            Rezervă acum și beneficiază de mobilitate garantată în cel mai scurt timp
          </p>
          <a
            href="/rezervare"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-teal dark:text-teal rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
          >
            Rezervă acum
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
