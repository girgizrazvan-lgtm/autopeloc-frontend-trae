import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { z } from "zod"
import { hashPassword } from "@/lib/auth-utils"

export const dynamic = "force-dynamic"

// Validation schema for user registration
const registrationSchema = z.object({
  email: z.string().email("Email invalid").toLowerCase().trim(),
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere").max(100, "Numele este prea lung").trim(),
  company: z.string().min(2, "Compania trebuie să aibă minim 2 caractere").max(200, "Numele companiei este prea lung").trim(),
  password: z.string()
    .min(8, "Parola trebuie să aibă minim 8 caractere")
    .max(100, "Parola este prea lungă")
    .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
    .regex(/[a-z]/, "Parola trebuie să conțină cel puțin o literă mică")
    .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = registrationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Date invalide",
        details: validationResult.error.issues
      }, { status: 400 })
    }

    const { email, name, company, password } = validationResult.data

    // Hash password before storing (if needed for future use)
    const passwordHash = await hashPassword(password)

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
