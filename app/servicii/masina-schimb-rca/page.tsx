import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SimpleStepsSection } from "@/components/simple-steps-section"
import { FAQSection } from "@/components/faq-section"
import { BlogPreview } from "@/components/blog-preview"
import { RomaniaCoverageMap } from "@/components/romania-coverage-map"
import { Footer } from "@/components/footer"
import { WhyAutoPeLocSection } from "@/components/why-autopeloc-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Breadcrumbs } from "@/components/breadcrumbs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mașină la schimb RCA – fără costuri pentru păgubit | autopeloc.ro",
  description:
    "Primești mașină gratuită pe durata reparației dacă nu ești vinovat. Cost 0 pentru păgubit, livrare în aceeași zi, fără garanții sau avans. Servicii disponibile în toată România, asistență 24/7.",
  keywords: "mașină la schimb RCA, mașină gratuită accident, cost 0 păgubit, livrare mașină aceeași zi, fără garanții",
  openGraph: {
    title: "Mașină la schimb RCA – fără costuri pentru păgubit",
    description:
      "Primești mașină gratuită pe durata reparației dacă nu ești vinovat. Cost 0 pentru păgubit, livrare în aceeași zi, fără garanții sau avans.",
    type: "website",
    url: "https://autopeloc.ro/servicii/masina-schimb-rca",
    siteName: "autopeloc.ro",
    locale: "ro_RO",
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Mașină la schimb RCA – fără costuri pentru păgubit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mașină la schimb RCA – fără costuri pentru păgubit",
    description:
      "Primești mașină gratuită pe durata reparației dacă nu ești vinovat. Cost 0 pentru păgubit, livrare în aceeași zi.",
    images: ["/images/dashboard.jpg"],
  },
  alternates: {
    canonical: "https://autopeloc.ro/servicii/masina-schimb-rca",
  },
}

export default function MasinaSchimbRCA() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mașină la schimb RCA",
    provider: {
      "@type": "Organization",
      name: "autopeloc.ro",
      url: "https://autopeloc.ro",
    },
    areaServed: {
      "@type": "Country",
      name: "România",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RON",
      description: "Fără costuri pentru păgubit",
    },
    description:
      "Primești mașină gratuită pe durata reparației dacă nu ești vinovat. Cost 0 pentru păgubit, livrare în aceeași zi, fără garanții sau avans.",
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
            { name: "Mașină la schimb RCA", url: "/servicii/masina-schimb-rca" },
          ]}
        />
      </div>
      <HeroSection />
      <SimpleStepsSection />
      <WhyAutoPeLocSection />
      <TestimonialsSection />
      <FAQSection />
      <BlogPreview />
      <RomaniaCoverageMap />
      <Footer />
    </main>
  )
}
