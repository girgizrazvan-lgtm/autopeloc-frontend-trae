import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const sections = await prisma.aboutPage.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(sections)
  } catch (error: any) {
    // Check if table doesn't exist (P2021) or database is unavailable
    if (error.code === "P2021" || error.message?.includes("does not exist")) {
      console.warn("[About] Table 'about_pages' does not exist yet")
      return NextResponse.json([], { status: 200 })
    }

    console.error("[About] Error fetching about sections:", {
      message: error?.message || "Unknown error",
      code: error?.code,
    })

    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

