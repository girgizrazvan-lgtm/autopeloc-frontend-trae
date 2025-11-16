import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(vehicles)
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error.code === "P2021" || error.message?.includes("does not exist")) {
      console.warn("Vehicles table does not exist yet. Run migration first.")
      return NextResponse.json([])
    }
    console.error("Error fetching vehicles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

