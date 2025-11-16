import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        excerpt: true,
        category: true,
        readTime: true,
        publishedAt: true,
        isPublished: true,
      },
    })

    return NextResponse.json(posts)
  } catch (error: any) {
    // Check if table doesn't exist (P2021) or database is unavailable
    if (error.code === "P2021" || error.message?.includes("does not exist")) {
      console.warn("[Blog API] Table 'blog_posts' does not exist yet")
      return NextResponse.json([], { status: 200 })
    }

    console.error("[Blog API] Error fetching blog posts:", {
      message: error?.message || "Unknown error",
      code: error?.code,
    })

    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

