import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SimpleStepsSection } from "@/components/simple-steps-section"
import { FAQSection } from "@/components/faq-section"
import { BlogPreview } from "@/components/blog-preview"
import { RomaniaCoverageMap } from "@/components/romania-coverage-map"
import { Footer } from "@/components/footer"
import { WhyAutoPeLocSection } from "@/components/why-autopeloc-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mașină la schimb RCA – fără costuri pentru păgubit | autopeloc.ro",
  description:
    "Primești mașină gratuită pe durata reparației dacă nu ești vinovat. Cost 0 pentru păgubit, livrare în aceeași zi, fără garanții sau avans.",
  keywords: "mașină la schimb RCA, mașină gratuită accident, cost 0 păgubit, livrare mașină aceeași zi, fără garanții",
  alternates: {
    canonical: "https://autopeloc.ro/servicii/masina-schimb-rca",
  },
}

export default function MasinaSchimbRCA() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />
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
