import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"
import { CheckCircle2, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Închirieri auto avantajoase – exclusiv pentru membri #peloc | autopeloc.ro",
  description:
    "Clienții AutoPeLoc beneficiază de tarife preferențiale la închirieri auto în toată țara. Fără depozit, discounturi pentru weekend și vacanțe. Livrare direct la adresă disponibilă.",
  keywords: "închirieri auto avantajoase, tarife preferențiale, fără depozit, discounturi închirieri, membri peloc",
  openGraph: {
    title: "Închirieri auto avantajoase – exclusiv pentru membri #peloc",
    description:
      "Clienții AutoPeLoc beneficiază de tarife preferențiale la închirieri auto în toată țara. Fără depozit, discounturi pentru weekend și vacanțe.",
    type: "website",
    url: "https://autopeloc.ro/servicii/inchirieri-avantajoase",
    siteName: "autopeloc.ro",
    locale: "ro_RO",
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Închirieri auto avantajoase – exclusiv pentru membri #peloc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Închirieri auto avantajoase – exclusiv pentru membri #peloc",
    description:
      "Clienții AutoPeLoc beneficiază de tarife preferențiale la închirieri auto în toată țara. Fără depozit, discounturi pentru weekend și vacanțe.",
    images: ["/images/dashboard.jpg"],
  },
  alternates: {
    canonical: "https://autopeloc.ro/servicii/inchirieri-avantajoase",
  },
}

export default function InchirieriAvantajoase() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Închirieri auto avantajoase",
    provider: {
      "@type": "Organization",
      name: "autopeloc.ro",
      url: "https://autopeloc.ro",
    },
    areaServed: {
      "@type": "Country",
      name: "România",
    },
    description:
      "Clienții AutoPeLoc beneficiază de tarife preferențiale la închirieri auto în toată țara. Fără depozit, discounturi pentru weekend și vacanțe.",
  }

  return (
    <main className="min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs
          items={[
            { name: "Acasă", url: "/" },
            { name: "Servicii", url: "/servicii" },
            { name: "Închirieri avantajoase", url: "/servicii/inchirieri-avantajoase" },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden border-t border-teal/20 dark:border-teal/30">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-background to-background" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan/10 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 max-w-5xl">
          <div className="text-center mb-6">
            <div className="inline-block mb-3 px-3 py-1 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-full">
              <span className="text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Beneficii Exclusive
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Închirieri auto avantajoase –{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                exclusiv pentru membri #peloc
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Clienții AutoPeLoc beneficiază de tarife preferențiale la închirieri, valabile în toată țara și pe orice
              perioadă.
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
                      Prețuri preferențiale pentru membri #peloc
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Economisești la fiecare închiriere ca membru al comunității autopeloc.ro.
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
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">Fără depozit sau garanție</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      La partenerii selectați. Închiriezi fără griji și fără costuri ascunse.
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
                      Discounturi pentru weekend, vacanțe sau business
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Indiferent de motiv, beneficiezi de prețuri avantajoase.
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
                      Posibilitate de livrare direct la adresă
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      Primești mașina unde ai nevoie, fără să te deplasezi.
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
            Vrei să beneficiezi de{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              avantajele #peloc
            </span>
            ?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 text-pretty max-w-3xl mx-auto">
            Activează avantajele tale și începe să economisești la fiecare închiriere auto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg shadow-teal/40 hover:shadow-xl hover:shadow-teal/50 transition-all duration-300 hover:scale-105 text-sm"
            >
              Activează avantajele #peloc
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
