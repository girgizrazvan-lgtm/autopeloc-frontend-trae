import { NextResponse } from "next/server"
import { put, list, del } from "@vercel/blob"

// GET - List all website requests
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "website-requests/",
    })

    // Fetch and parse each request
    const requests = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url)
        const data = await response.json()
        return {
          id: blob.pathname.replace("website-requests/", "").replace(".json", ""),
          url: blob.url,
          ...data,
        }
      }),
    )

    // Sort by date (newest first)
    requests.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

    return NextResponse.json({ success: true, requests })
  } catch (error: any) {
    console.error("[v0] Error fetching website requests:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - Create new website request
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `request-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const requestData = {
      id,
      type: body.type || "general",
      data: body.data || {},
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // Store in Blob
    const blob = await put(`website-requests/${id}.json`, JSON.stringify(requestData, null, 2), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({ success: true, id, url: blob.url })
  } catch (error: any) {
    console.error("[v0] Error creating website request:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE - Delete a website request
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const pathname = `website-requests/${id}.json`

    // Find the blob URL
    const { blobs } = await list({
      prefix: pathname,
    })

    if (blobs.length === 0) {
      return NextResponse.json({ success: false, error: "Request not found" }, { status: 404 })
    }

    await del(blobs[0].url)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error deleting website request:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH - Update request status
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json()
    const pathname = `website-requests/${id}.json`

    // Find and fetch the existing request
    const { blobs } = await list({
      prefix: pathname,
    })

    if (blobs.length === 0) {
      return NextResponse.json({ success: false, error: "Request not found" }, { status: 404 })
    }

    const response = await fetch(blobs[0].url)
    const existingData = await response.json()

    // Update status
    const updatedData = {
      ...existingData,
      status,
      updatedAt: new Date().toISOString(),
    }

    // Delete old and create new
    await del(blobs[0].url)
    await put(pathname, JSON.stringify(updatedData, null, 2), {
      access: "public",
      contentType: "application/json",
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error updating website request:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
