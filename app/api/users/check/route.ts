import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const supabase = await createSupabaseServerClient()

    // Check if user exists and is approved
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, role, name, org_id")
      .eq("email", email)
      .neq("role", "pending")

    if (error) {
      console.error("[v0] Check user error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

    return NextResponse.json({
      approved: users && users.length > 0,
      user: users && users.length > 0 ? users[0] : null,
    })
  } catch (error) {
    console.error("[v0] Check user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
