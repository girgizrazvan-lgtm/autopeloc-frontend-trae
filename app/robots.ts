import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://autopeloc.ro"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/login", "/login", "/api/", "/management-rent-provider"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/login", "/login", "/api/", "/management-rent-provider"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/login", "/login", "/api/", "/management-rent-provider"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-services.xml`,
    ],
    host: baseUrl,
  }
}
