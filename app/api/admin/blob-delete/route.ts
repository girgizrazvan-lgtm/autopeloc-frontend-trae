import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { requireAdmin } from "@/lib/admin-auth"
import { z } from "zod"

// Allowed blob storage domains
const ALLOWED_BLOB_DOMAINS = [
  "hebbkx1anhila5yf.public.blob.vercel-storage.com",
  "blob.vercel-storage.com",
]

// Validation schema
const deleteSchema = z.object({
  url: z.string().url("URL invalid"),
})

export async function POST(request: Request) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }

    const body = await request.json()

    // Validate input
    const validationResult = deleteSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Date invalide",
        details: validationResult.error.issues
      }, { status: 400 })
    }

    const { url } = validationResult.data

    // Validate URL is from allowed blob storage domains (prevent deletion of arbitrary URLs)
    const parsedUrl = new URL(url)
    const isAllowedDomain = ALLOWED_BLOB_DOMAINS.some(domain =>
      parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
    )

    if (!isAllowedDomain) {
      console.warn("[Blob Delete] Attempted to delete blob from unauthorized domain:", parsedUrl.hostname)
      return NextResponse.json({
        error: "Domeniu neautorizat. Doar fișierele din storage-ul propriu pot fi șterse."
      }, { status: 403 })
    }

    await del(url)
    console.log("[Blob Delete] Successfully deleted blob:", url)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting blob:", error)
    return NextResponse.json({ error: "Failed to delete blob" }, { status: 500 })
  }
}
