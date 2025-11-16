import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"]
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin()
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("Auth error in upload:", error)
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Fișier lipsă" }, { status: 400 })
    }

    // Validate file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: `Tip de fișier nepermis. Extensii permise: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 }
      )
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tip de fișier nepermis. Doar imagini sunt permise." },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Fișier prea mare. Dimensiunea maximă este ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob with a unique filename
    const timestamp = Date.now()
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `admin-uploads/${timestamp}-${sanitizedFilename}`

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Eroare la încărcarea fișierului" }, { status: 500 })
  }
}
