import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"
import { aboutSectionSchema } from "@/lib/validations"
import { sanitizeHtml } from "@/lib/sanitize-html"

export async function GET() {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error?.message === "Unauthorized" || error?.message?.includes("Unauthorized") || error?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("[About API] Auth error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
    })
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const sections = await prisma.aboutPage.findMany({
      orderBy: { order: "asc" },
    })
    console.log(`[About API] Successfully loaded ${sections.length} sections`)
    return NextResponse.json(sections)
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error?.code === "P2021" || error?.message?.includes("does not exist") || error?.message?.includes("Unknown model")) {
      console.warn("[About API] Table does not exist yet. Run migration first.")
      return NextResponse.json([])
    }
    
    // Handle Prisma connection errors
    if (error?.code === "P1001" || error?.message?.includes("Can't reach database")) {
      console.error("[About API] Database connection error:", error)
      return NextResponse.json({ error: "Eroare de conexiune la baza de date" }, { status: 503 })
    }
    
    console.error("[About API] Error fetching about sections:", {
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

    // Validate input
    const validationResult = aboutSectionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { section, title, content, order } = validationResult.data

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content)

    const aboutSection = await prisma.aboutPage.create({
      data: {
        section,
        title: title || null,
        content: sanitizedContent,
        order: order ?? 0,
      },
    })

    return NextResponse.json(aboutSection)
  } catch (error: any) {
    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json({ error: "O secțiune cu acest nume există deja" }, { status: 409 })
    }

    console.error("Error creating about section:", error)
    return NextResponse.json({ error: "Eroare la crearea secțiunii" }, { status: 500 })
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

    // Validate input (excluding id)
    const { id, ...rest } = body
    const validationResult = aboutSectionSchema.safeParse(rest)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { section, title, content, order } = validationResult.data

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content)

    const aboutSection = await prisma.aboutPage.update({
      where: { id },
      data: {
        section,
        title: title || null,
        content: sanitizedContent,
        order,
      },
    })

    return NextResponse.json(aboutSection)
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Secțiunea nu a fost găsită" }, { status: 404 })
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "O secțiune cu acest nume există deja" }, { status: 409 })
    }

    console.error("Error updating about section:", error)
    return NextResponse.json({ error: "Eroare la actualizarea secțiunii" }, { status: 500 })
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

    await prisma.aboutPage.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Secțiunea nu a fost găsită" }, { status: 404 })
    }

    console.error("Error deleting about section:", error)
    return NextResponse.json({ error: "Eroare la ștergerea secțiunii" }, { status: 500 })
  }
}

