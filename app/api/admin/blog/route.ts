import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"
import { blogPostSchema } from "@/lib/validations"
import { generateUniqueSlug } from "@/lib/slug-uniqueness"
import { sanitizeHtml } from "@/lib/sanitize-html"

export async function GET() {
  try {
    // Check authentication first
    await requireAdmin()
  } catch (error: any) {
    if (error?.message === "Unauthorized" || error?.message?.includes("Unauthorized")) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("Auth error in blog GET:", error)
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    // Check if table exists by trying to query
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    })
    return NextResponse.json(posts)
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error?.code === "P2021" || error?.message?.includes("does not exist") || error?.message?.includes("Unknown model")) {
      console.warn("Blog posts table does not exist yet. Run migration first.")
      return NextResponse.json([])
    }
    
    // Handle Prisma connection errors
    if (error?.code === "P1001" || error?.message?.includes("Can't reach database")) {
      console.error("Database connection error:", error)
      return NextResponse.json({ error: "Eroare de conexiune la baza de date" }, { status: 503 })
    }

    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Eroare internă", details: error?.message }, { status: 500 })
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
    const validationResult = blogPostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { title, description, content, excerpt, category, readTime, keywords, isPublished, ogImage } =
      validationResult.data

    // Generate unique slug automatically from title
    const slug = await generateUniqueSlug(title)

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content)
    const sanitizedExcerpt = excerpt ? sanitizeHtml(excerpt) : null

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        description,
        content: sanitizedContent,
        excerpt: sanitizedExcerpt,
        category,
        readTime: readTime || null,
        keywords: keywords || null,
        isPublished: isPublished ?? true,
        ogImage: ogImage || null,
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Un articol cu acest titlu există deja" }, { status: 409 })
    }

    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Eroare la crearea articolului" }, { status: 500 })
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
    const validationResult = blogPostSchema.safeParse(rest)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    // Get existing post
    const existingPost = await prisma.blogPost.findUnique({ where: { id } })
    if (!existingPost) {
      return NextResponse.json({ error: "Articolul nu a fost găsit" }, { status: 404 })
    }

    const { title, description, content, excerpt, category, readTime, keywords, isPublished, ogImage } =
      validationResult.data

    // Generate unique slug only if title changed
    const slug =
      title && title !== existingPost.title ? await generateUniqueSlug(title, id) : existingPost.slug

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content)
    const sanitizedExcerpt = excerpt ? sanitizeHtml(excerpt) : null

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        content: sanitizedContent,
        excerpt: sanitizedExcerpt,
        category,
        readTime: readTime || null,
        keywords: keywords || null,
        isPublished,
        ogImage: ogImage || null,
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Articolul nu a fost găsit" }, { status: 404 })
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Un articol cu acest slug există deja" }, { status: 409 })
    }

    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Eroare la actualizarea articolului" }, { status: 500 })
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

    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Handle Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Articolul nu a fost găsit" }, { status: 404 })
    }

    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Eroare la ștergerea articolului" }, { status: 500 })
  }
}

