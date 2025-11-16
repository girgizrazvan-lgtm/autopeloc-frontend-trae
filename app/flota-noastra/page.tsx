import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RomaniaCoverageMap } from "@/components/romania-coverage-map"
import { HeroSection } from "./_components/hero-section"
import { QuickFilters } from "./_components/quick-filters"
import { AllModels } from "./_components/all-models"
import { Benefits } from "./_components/benefits"
import { FAQ } from "./_components/faq"
import { FinalCTA } from "./_components/final-cta"

export const metadata: Metadata = {
  title: "Flota noastră – Mașini la schimb, RCA & CASCO | peLoc",
  description:
    "Peste 40+ vehicule organizate pe clase, de la mașini economice pentru oraș până la SUV-uri luxury și utilitare. Descoperă gama completă autopeloc.ro.",
  openGraph: {
    title: "Flota noastră – Mașini la schimb, RCA & CASCO | peLoc",
    description:
      "Peste 40+ vehicule organizate pe clase, de la mașini economice pentru oraș până la SUV-uri luxury și utilitare.",
    url: "https://autopeloc.ro/flota-noastra",
  },
}

export default function FlotaNoastraPage() {
  return (
    <>
      <link rel="canonical" href="https://autopeloc.ro/flota-noastra" />
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs
          items={[
            { name: "Acasă", url: "/" },
            { name: "Flota noastră", url: "/flota-noastra" },
          ]}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Acasă",
                item: "https://autopeloc.ro",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Flota noastră",
                item: "https://autopeloc.ro/flota-noastra",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Vehicle",
              name: "Dacia Sandero",
              category: "Compact",
              fuelType: "Benzină",
              vehicleSeatingCapacity: 5,
              vehicleTransmission: "Manual",
              numberOfDoors: 5,
              itemCondition: "https://schema.org/NewCondition",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "0",
                priceCurrency: "RON",
                valueAddedTaxIncluded: true,
              },
              availability: "https://schema.org/InStock",
              availabilityStarts: new Date().toISOString(),
            },
            {
              "@context": "https://schema.org",
              "@type": "Vehicle",
              name: "VW Golf",
              category: "Compact",
              fuelType: "Benzină",
              vehicleSeatingCapacity: 5,
              vehicleTransmission: "Manual",
              numberOfDoors: 5,
              itemCondition: "https://schema.org/NewCondition",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "0",
                priceCurrency: "RON",
                valueAddedTaxIncluded: true,
              },
              availability: "https://schema.org/InStock",
              availabilityStarts: new Date().toISOString(),
            },
            {
              "@context": "https://schema.org",
              "@type": "Vehicle",
              name: "Mercedes GLC",
              category: "Medium SUV Luxury",
              fuelType: "Benzină",
              vehicleSeatingCapacity: 5,
              vehicleTransmission: "Automatic",
              numberOfDoors: 5,
              itemCondition: "https://schema.org/NewCondition",
              priceSpecification: {
                "@type": "PriceSpecification",
                price: "0",
                priceCurrency: "RON",
                valueAddedTaxIncluded: true,
              },
              availability: "https://schema.org/InStock",
              availabilityStarts: new Date().toISOString(),
            },
          ]),
        }}
      />
      <main className="min-h-screen transition-colors duration-300">
        <HeroSection />
        <QuickFilters />
        <AllModels />
        <Benefits />
        <FAQ />
        <FinalCTA />
        <RomaniaCoverageMap />
      </main>
      <Footer />
    </>
  )
}
