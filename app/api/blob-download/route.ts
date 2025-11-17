import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Allowed blob storage domains (prevent SSRF attacks)
const ALLOWED_BLOB_DOMAINS = [
  "hebbkx1anhila5yf.public.blob.vercel-storage.com",
  "blob.vercel-storage.com",
]

// Blocked patterns to prevent SSRF
const BLOCKED_PATTERNS = [
  /^(localhost|127\.|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[0-1]\.|192\.168\.)/i,
  /^0\./,
  /^169\.254\./,  // Link-local addresses
  /^::|^fe80:/i,  // IPv6 localhost and link-local
]

function validateBlobUrl(url: string): { valid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url)

    // Must be HTTPS
    if (parsedUrl.protocol !== "https:") {
      return { valid: false, error: "Doar HTTPS este permis" }
    }

    // Check if domain is allowed
    const isAllowedDomain = ALLOWED_BLOB_DOMAINS.some(domain =>
      parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
    )

    if (!isAllowedDomain) {
      return { valid: false, error: "Domeniu neautorizat" }
    }

    // Check for blocked patterns (localhost, private IPs, etc.)
    const hostname = parsedUrl.hostname
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(hostname)) {
        return { valid: false, error: "Adresă blocată" }
      }
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, error: "URL invalid" }
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const blobUrl = searchParams.get("url")

    if (!blobUrl) {
      return NextResponse.json({ error: "Missing blob URL" }, { status: 400 })
    }

    // Validate URL to prevent SSRF attacks
    const validation = validateBlobUrl(blobUrl)
    if (!validation.valid) {
      console.warn("[Blob Download] Blocked attempt to fetch:", blobUrl, validation.error)
      return NextResponse.json({ error: validation.error }, { status: 403 })
    }

    // Fetch the file from Blob storage
    const response = await fetch(blobUrl)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 })
    }

    // Get the file content
    const blob = await response.blob()

    // Extract filename from URL or use default
    const urlParts = blobUrl.split("/")
    const filename = urlParts[urlParts.length - 1] || "nota-constatare.pdf"

    // Return the file with download headers
    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Blob download error:", error)
    return NextResponse.json({ error: "Download failed" }, { status: 500 })
  }
}
