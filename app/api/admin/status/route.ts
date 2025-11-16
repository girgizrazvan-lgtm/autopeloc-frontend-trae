import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  try {
    // Check admin authentication
    await requireAdmin()
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    return NextResponse.json({ error: "Eroare de autentificare" }, { status: 401 })
  }

  try {
    // Check database connection
    const dbConnected = await checkDatabaseConnection()

    // Get counts for each table
    const counts = await Promise.allSettled([
      prisma.blogPost.count().catch(() => null),
      prisma.fAQ.count().catch(() => null),
      prisma.vehicle.count().catch(() => null),
      prisma.aboutPage.count().catch(() => null),
    ])

    const [blogCount, faqCount, vehicleCount, aboutCount] = counts.map((result) =>
      result.status === "fulfilled" ? result.value : null,
    )

    return NextResponse.json({
      dbConnected,
      tables: {
        blog_posts: {
          count: blogCount,
          status: blogCount !== null ? "ok" : "error",
        },
        faqs: {
          count: faqCount,
          status: faqCount !== null ? "ok" : "error",
        },
        vehicles: {
          count: vehicleCount,
          status: vehicleCount !== null ? "ok" : "error",
        },
        about_pages: {
          count: aboutCount,
          status: aboutCount !== null ? "ok" : "error",
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error checking system status:", error)
    return NextResponse.json(
      {
        dbConnected: false,
        error: error.message || "Eroare la verificarea statusului sistemului",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error("Database connection check failed:", error)
    return false
  }
}

