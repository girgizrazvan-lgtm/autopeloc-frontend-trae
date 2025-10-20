import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const supabase = await createSupabaseServerClient()

    // Update user status by removing 'pending-' prefix
    const newAuthId = userId.replace("pending-", "approved-")

    const { error } = await supabase
      .from("users")
      .update({
        auth0_id: newAuthId,
        updated_at: new Date().toISOString(),
      })
      .eq("auth0_id", userId)

    if (error) {
      console.error("[v0] Approve user error:", error)
      return NextResponse.json({ error: "Failed to approve user" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Approve user error:", error)
    return NextResponse.json({ error: "Failed to approve user" }, { status: 500 })
  }
}
