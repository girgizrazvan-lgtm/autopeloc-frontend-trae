import { NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { requireAdmin } from "@/lib/admin-auth"

export async function GET() {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
    }
    const { blobs } = await list()
    return NextResponse.json({ blobs })
  } catch (error) {
    console.error("[v0] Error listing blobs:", error)
    return NextResponse.json({ error: "Failed to list blobs" }, { status: 500 })
  }
}
