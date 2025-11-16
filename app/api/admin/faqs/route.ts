import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"
import { faqSchema } from "@/lib/validations"
import { sanitizeHtml } from "@/lib/sanitize-html"

export async function GET() {
  try {
    await requireAdmin()
  } catch (error: any) {
    if (error?.message === "Unauthorized" || error?.message?.includes("Unauthorized") || error?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("[FAQs API] Auth error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
    })
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    // Check if table exists by trying to query
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: "asc" },
    })
    console.log(`[FAQs API] Successfully loaded ${faqs.length} FAQs`)
    return NextResponse.json(faqs)
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error?.code === "P2021" || error?.message?.includes("does not exist") || error?.message?.includes("Unknown model")) {
      console.warn("[FAQs API] Table does not exist yet. Run migration first.")
      return NextResponse.json([])
    }
    
    // Handle Prisma connection errors
    if (error?.code === "P1001" || error?.message?.includes("Can't reach database")) {
      console.error("[FAQs API] Database connection error:", error)
      return NextResponse.json({ error: "Eroare de conexiune la baza de date" }, { status: 503 })
    }
    
    console.error("[FAQs API] Error fetching FAQs:", {
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
    const validationResult = faqSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { question, answer, order, isActive } = validationResult.data

    // Sanitize HTML answer
    const sanitizedAnswer = sanitizeHtml(answer)

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer: sanitizedAnswer,
        order: order ?? 0,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(faq)
  } catch (error: any) {
    console.error("Error creating FAQ:", error)
    return NextResponse.json({ error: "Eroare la crearea întrebării" }, { status: 500 })
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
    const validationResult = faqSchema.safeParse(rest)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { question, answer, order, isActive } = validationResult.data

    // Sanitize HTML answer
    const sanitizedAnswer = sanitizeHtml(answer)

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer: sanitizedAnswer,
        order,
        isActive,
      },
    })

    return NextResponse.json(faq)
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Întrebarea nu a fost găsită" }, { status: 404 })
    }

    console.error("Error updating FAQ:", error)
    return NextResponse.json({ error: "Eroare la actualizarea întrebării" }, { status: 500 })
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

    await prisma.fAQ.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Întrebarea nu a fost găsită" }, { status: 404 })
    }

    console.error("Error deleting FAQ:", error)
    return NextResponse.json({ error: "Eroare la ștergerea întrebării" }, { status: 500 })
  }
}

