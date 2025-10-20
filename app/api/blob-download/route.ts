import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const blobUrl = searchParams.get("url")

    if (!blobUrl) {
      return NextResponse.json({ error: "Missing blob URL" }, { status: 400 })
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
