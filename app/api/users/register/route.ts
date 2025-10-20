import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email, name, company, password } = await request.json()

    const supabase = await createSupabaseServerClient()

    // Create user with pending status
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        auth0_id: `pending-${Date.now()}`,
        email,
        role: "client",
        org_id: company,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] User registration error:", error)
      return NextResponse.json({ error: "Registration failed" }, { status: 500 })
    }

    return NextResponse.json({
      id: user.auth0_id,
      email: user.email,
      name: name,
      company: user.org_id,
      role: user.role,
      status: "pending",
      createdAt: user.created_at,
    })
  } catch (error) {
    console.error("[v0] User registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
