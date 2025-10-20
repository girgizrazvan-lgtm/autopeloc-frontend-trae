import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disponibilitate Vehicule | Flotă Diversificată pentru Înlocuire",
  description:
    "Explorează flota noastră completă de vehicule disponibile pentru înlocuire RCA. De la mașini compacte la SUV-uri și van-uri, găsești vehiculul potrivit pentru nevoile tale.",
  keywords: [
    "disponibilitate vehicule",
    "flotă auto",
    "mașini disponibile",
    "închirieri auto",
    "vehicule înlocuire",
    "SUV disponibil",
    "mașini compacte",
    "van disponibil",
  ],
  openGraph: {
    title: "Disponibilitate Vehicule | Flotă Diversificată",
    description:
      "Explorează flota noastră completă de vehicule disponibile pentru înlocuire RCA. Găsește vehiculul potrivit pentru tine.",
    url: "https://autopeloc.ro/disponibilitate",
    type: "website",
  },
  alternates: {
    canonical: "https://autopeloc.ro/disponibilitate",
  },
}

export default function DisponibilitateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
