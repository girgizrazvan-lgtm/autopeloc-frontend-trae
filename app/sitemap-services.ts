import type { MetadataRoute } from "next"

export default function sitemapServices(): MetadataRoute.Sitemap {
  const baseUrl = "https://autopeloc.ro"
  const currentDate = new Date()

  // Service pages
  const servicePages = [
    {
      url: `${baseUrl}/servicii/masina-schimb-rca`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicii/consultanta-dosar-dauna`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicii/expertize-daune-accidente`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicii/asigurari-rca-casco`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicii/inchirieri-avantajoase`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servicii/flote-parteneriate`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  return servicePages
}

