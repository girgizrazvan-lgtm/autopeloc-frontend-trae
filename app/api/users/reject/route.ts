import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const supabase = await createSupabaseServerClient()

    // Delete rejected user
    const { error } = await supabase.from("users").delete().eq("auth0_id", userId)

    if (error) {
      console.error("[v0] Reject user error:", error)
      return NextResponse.json({ error: "Failed to reject user" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Reject user error:", error)
    return NextResponse.json({ error: "Failed to reject user" }, { status: 500 })
  }
}
