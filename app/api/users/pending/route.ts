import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get users with pending status (auth0_id starts with 'pending-')
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .like("auth0_id", "pending-%")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Get pending users error:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json(
      users.map((user) => ({
        id: user.auth0_id,
        email: user.email,
        name: user.email.split("@")[0],
        company: user.org_id || "",
        role: user.role,
        status: "pending",
        createdAt: user.created_at,
      })),
    )
  } catch (error) {
    console.error("[v0] Get pending users error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
