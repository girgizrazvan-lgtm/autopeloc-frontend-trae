import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { CheckCircle2, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Soluții flexibile pentru flote și parteneriate | autopeloc.ro",
  description:
    "Servicii dedicate pentru service-uri, companii și brokeri. Gestionare completă a cazurilor, raportare lunară, contracte flexibile și comisioane transparente.",
  keywords: "flote auto, parteneriate B2B, gestionare cazuri, raportare lunară, service-uri auto",
  alternates: {
    canonical: "https://autopeloc.ro/servicii/flote-parteneriate",
  },
}

export default function FloteParteneriate() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden border-t border-teal/20 dark:border-teal/30">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-6">
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-full">
              <span className="text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Soluții B2B
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Soluții flexibile pentru{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                flote și parteneriate
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Oferim servicii dedicate pentru service-uri, companii și brokeri – gestionare completă a cazurilor,
              raportare lunară și SLA clar definit.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-8 md:py-12 overflow-hidden border-t border-teal/20 dark:border-teal/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-teal/5 to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-6xl z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance">
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Beneficii
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div className="neon-card-glow group relative rounded-2xl shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden bg-background dark:bg-gray-900 border-t-2 border-teal-500/40 dark:border-teal-500/50">
              <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/98 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                      Contracte flexibile, comisioane transparente
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Fără costuri ascunse. Știi exact ce plătești și ce primești.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="neon-card-glow group relative rounded-2xl shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden bg-background dark:bg-gray-900 border-t-2 border-teal-500/40 dark:border-teal-500/50">
              <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/98 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                      Asistență dedicată pentru parteneri B2B
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Echipă dedicată care înțelege nevoile business-ului tău.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="neon-card-glow group relative rounded-2xl shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden bg-background dark:bg-gray-900 border-t-2 border-teal-500/40 dark:border-teal-500/50">
              <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/98 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                      Raportare lunară automată a cazurilor
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Primești rapoarte detaliate pentru a monitoriza performanța.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="neon-card-glow group relative rounded-2xl shadow-lg shadow-teal/10 hover:shadow-xl hover:shadow-teal/20 transition-all duration-500 overflow-hidden bg-background dark:bg-gray-900 border-t-2 border-teal-500/40 dark:border-teal-500/50">
              <div className="backdrop-blur-md bg-white/95 dark:bg-gray-900/98 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Acces la flote multiple</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Printr-un singur contact. Simplificăm procesul pentru tine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-12 overflow-hidden border-t border-teal/20 dark:border-teal/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-teal/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-4xl text-center z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-balance">
            Vrei să devii{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              partener AutoPeLoc
            </span>
            ?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 text-pretty max-w-3xl mx-auto">
            Contactează-ne pentru a discuta despre oportunitățile de colaborare și beneficiile pentru business-ul tău.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-teal/40 hover:shadow-xl hover:shadow-teal/50 transition-all duration-300 hover:scale-105 text-sm"
            >
              Devino partener AutoPeLoc
            </a>
            <a
              href="tel:0790743974"
              className="secondary-cta-button inline-flex items-center gap-2 px-6 py-3 font-bold rounded-full text-sm"
            >
              <Phone className="w-4 h-4" />
              Sună acum
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
