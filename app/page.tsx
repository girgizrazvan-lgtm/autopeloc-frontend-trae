import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SimpleStepsSection } from "@/components/simple-steps-section"
import { FAQSection } from "@/components/faq-section"
import { BlogPreview } from "@/components/blog-preview"
import { RomaniaCoverageMap } from "@/components/romania-coverage-map"
import { Footer } from "@/components/footer"
import { WhyAutoPeLocSection } from "@/components/why-autopeloc-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SectionDivider } from "@/components/section-divider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mașină la schimb RCA | Fără costuri pentru păgubit",
  description:
    "Obține mașină de înlocuire gratuită în 24h după accident RCA. Flotă diversificată, disponibilitate în toată România, asistență 24/7. Soluția ta de mobilitate #peloc.",
  keywords: [
    "mașină la schimb RCA",
    "mașină de înlocuire",
    "accident auto",
    "daune RCA",
    "flotă auto România",
    "mobilitate peloc",
    "asistență rutieră",
    "mașină substituție",
  ],
  openGraph: {
    title: "Mașină la schimb RCA | Fără costuri pentru păgubit",
    description:
      "Obține mașină de înlocuire gratuită în 24h după accident RCA. Flotă diversificată, disponibilitate în toată România.",
    url: "https://autopeloc.ro",
    type: "website",
    images: [
      {
        url: "/images/dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Mașină la schimb RCA | Fără costuri pentru păgubit",
      },
    ],
  },
  alternates: {
    canonical: "https://autopeloc.ro",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <Header />
      <HeroSection />
      <SectionDivider />
      <SimpleStepsSection />
      <SectionDivider />
      <WhyAutoPeLocSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <FAQSection />
      <SectionDivider />
      <BlogPreview />
      <SectionDivider />
      <RomaniaCoverageMap />
      <Footer />
    </main>
  )
}
