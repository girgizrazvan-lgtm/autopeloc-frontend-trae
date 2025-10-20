import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://autopeloc.ro"
  const currentDate = new Date()

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/despre-noi`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/flota-noastra`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/disponibilitate`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

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

  // Blog posts
  const blogPosts = [
    {
      url: `${baseUrl}/blog/masina-la-schimb-2025-drepturi-pagubit`,
      lastModified: new Date("2025-09-08"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/tendinte-masina-la-schimb-2025`,
      lastModified: new Date("2025-08-15"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/provocari-masina-la-schimb-2025`,
      lastModified: new Date("2025-07-22"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/masuri-asf-reducere-fraude-2025`,
      lastModified: new Date("2025-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/practici-neetice-reparatii-rca-2025`,
      lastModified: new Date("2025-05-18"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/flux-reparatii-service-masina-schimb-2025`,
      lastModified: new Date("2025-04-25"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/imbogatire-service-uri-masina-schimb`,
      lastModified: new Date("2025-03-12"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/reparatie-neconforma-dupa-accident`,
      lastModified: new Date("2025-02-08"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/politica-confidentialitate`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-cookies`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termeni-conditii`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  return [...mainPages, ...servicePages, ...blogPosts, ...legalPages]
}
