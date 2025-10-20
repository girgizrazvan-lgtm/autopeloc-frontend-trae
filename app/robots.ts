import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://autopeloc.ro"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/management-rent-provider"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api/", "/management-rent-provider"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api/", "/management-rent-provider"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
