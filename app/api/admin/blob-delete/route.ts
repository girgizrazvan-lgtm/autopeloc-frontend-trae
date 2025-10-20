import { NextResponse } from "next/server"
import { del } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    await del(url)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting blob:", error)
    return NextResponse.json({ error: "Failed to delete blob" }, { status: 500 })
  }
}
