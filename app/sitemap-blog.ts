import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

export default async function sitemapBlog(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://autopeloc.ro"
  const currentDate = new Date()
  
  // Try to get blog posts from database
  let blogPosts: Array<{
    url: string
    lastModified: Date
    changeFrequency: "monthly" | "weekly" | "daily" | "yearly"
    priority: number
  }> = []

  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: "desc" },
    })

    if (posts.length === 0) {
      console.warn("[Sitemap Blog] No published posts found in database, using fallback data")
    } else {
      console.log(`[Sitemap Blog] Successfully loaded ${posts.length} blog posts from database`)
    }

    blogPosts = posts.map((post: any) => {
      const publishedDate = new Date(post.publishedAt)
      const daysSincePublished = Math.floor(
        (currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      // Recent posts (less than 90 days) get higher priority
      const priority = daysSincePublished < 90 ? 0.8 : 0.6
      
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt,
        changeFrequency: "monthly" as const,
        priority,
      }
    })
  } catch (error: any) {
    // Fallback to static blog posts if DB is not available
    console.error("[Sitemap Blog] Error fetching blog posts from database:", {
      message: error?.message || "Unknown error",
      code: error?.code,
      name: error?.name,
    })
    console.warn("[Sitemap Blog] Falling back to static blog posts")
    blogPosts = [
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
        priority: 0.8,
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
        priority: 0.6,
      },
      {
        url: `${baseUrl}/blog/flux-reparatii-service-masina-schimb-2025`,
        lastModified: new Date("2025-04-25"),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/blog/imbogatire-service-uri-masina-schimb`,
        lastModified: new Date("2025-03-12"),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/blog/reparatie-neconforma-dupa-accident`,
        lastModified: new Date("2025-02-08"),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ]
  }

  return blogPosts
}

