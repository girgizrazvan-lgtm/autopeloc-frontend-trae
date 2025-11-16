import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"
import { vehicleSchema } from "@/lib/validations"

export async function GET() {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error?.message === "Unauthorized" || error?.message?.includes("Unauthorized") || error?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("[Vehicles API] Auth error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
    })
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { order: "asc" },
    })
    console.log(`[Vehicles API] Successfully loaded ${vehicles.length} vehicles`)
    return NextResponse.json(vehicles)
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error?.code === "P2021" || error?.message?.includes("does not exist") || error?.message?.includes("Unknown model")) {
      console.warn("[Vehicles API] Table does not exist yet. Run migration first.")
      return NextResponse.json([])
    }
    
    // Handle Prisma connection errors
    if (error?.code === "P1001" || error?.message?.includes("Can't reach database")) {
      console.error("[Vehicles API] Database connection error:", error)
      return NextResponse.json({ error: "Eroare de conexiune la baza de date" }, { status: 503 })
    }
    
    console.error("[Vehicles API] Error fetching vehicles:", {
      message: error?.message || "Unknown error",
      code: error?.code,
      name: error?.name,
    })
    return NextResponse.json({ error: "Eroare internă" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Validate input - vehicleSchema handles string-to-number transformation for year and seats
    const validationResult = vehicleSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const {
      name,
      brand,
      model,
      year,
      image,
      sippCode,
      category,
      acrissCode,
      engine,
      transmission,
      seats,
      fuel,
      order,
      isActive,
    } = validationResult.data

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        brand,
        model,
        year,
        image: image || null,
        sippCode,
        category,
        acrissCode: acrissCode || null,
        engine: engine || null,
        transmission: transmission || null,
        seats,
        fuel: fuel || null,
        order: order ?? 0,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error: any) {
    console.error("Error creating vehicle:", error)
    return NextResponse.json({ error: "Eroare la crearea vehiculului" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Validate ID
    if (!body.id) {
      return NextResponse.json({ error: "ID-ul este obligatoriu" }, { status: 400 })
    }

    // Validate input (excluding id) - vehicleSchema handles string-to-number transformation
    const { id, ...rest } = body
    const validationResult = vehicleSchema.safeParse(rest)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const {
      name,
      brand,
      model,
      year,
      image,
      sippCode,
      category,
      acrissCode,
      engine,
      transmission,
      seats,
      fuel,
      order,
      isActive,
    } = validationResult.data

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name,
        brand,
        model,
        year,
        image: image || null,
        sippCode,
        category,
        acrissCode: acrissCode || null,
        engine: engine || null,
        transmission: transmission || null,
        seats,
        fuel: fuel || null,
        order,
        isActive,
      },
    })

    return NextResponse.json(vehicle)
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Vehiculul nu a fost găsit" }, { status: 404 })
    }

    console.error("Error updating vehicle:", error)
    return NextResponse.json({ error: "Eroare la actualizarea vehiculului" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID-ul este obligatoriu" }, { status: 400 })
    }

    await prisma.vehicle.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Vehiculul nu a fost găsit" }, { status: 404 })
    }

    console.error("Error deleting vehicle:", error)
    return NextResponse.json({ error: "Eroare la ștergerea vehiculului" }, { status: 500 })
  }
}

