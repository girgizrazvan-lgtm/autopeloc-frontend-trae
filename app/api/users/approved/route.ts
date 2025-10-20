import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get users with approved status (auth0_id does NOT start with 'pending-')
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .not("auth0_id", "like", "pending-%")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Get approved users error:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json(
      users.map((user) => ({
        id: user.auth0_id,
        email: user.email,
        name: user.email.split("@")[0],
        company: user.org_id || "",
        role: user.role,
        status: "approved",
        createdAt: user.created_at,
      })),
    )
  } catch (error) {
    console.error("[v0] Get approved users error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
