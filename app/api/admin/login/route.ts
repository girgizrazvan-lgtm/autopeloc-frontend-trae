import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/lib/validations"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "razvan@autopeloc.ro"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""

export async function GET() {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    if (adminSession === "1") {
      return NextResponse.json({ authenticated: true })
    }
    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    console.error("Admin auth check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const validationResult = loginSchema.safeParse(body)
    if (!validationResult.success) {
      console.error("[Login] Validation error:", validationResult.error.issues)
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // Check if credentials are configured
    // In development, allow empty password with a warning
    if (!ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
      console.error("[Login] ADMIN_PASSWORD environment variable is not set in production")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // In development without ADMIN_PASSWORD set, allow default password
    const expectedPassword = ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "admin123" : "")
    
    if (!expectedPassword) {
      console.error("[Login] No password configured. Set ADMIN_PASSWORD in .env.local")
      return NextResponse.json({ 
        error: "Server configuration error: ADMIN_PASSWORD not set. Please set it in .env.local file." 
      }, { status: 500 })
    }

    if (email === ADMIN_EMAIL && password === expectedPassword) {
      // Set admin session cookie (12 hours)
      try {
        const cookieStore = await cookies()
        cookieStore.set("admin_session", "1", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 12,
          path: "/",
        })

        console.log("[Login] Successful login for:", email)
        return NextResponse.json({ ok: true })
      } catch (cookieError: any) {
        console.error("[Login] Error setting cookie:", {
          message: cookieError?.message || "Unknown error",
          name: cookieError?.name,
          code: cookieError?.code,
        })
        return NextResponse.json({ 
          error: "Error setting session. Please try again.",
          details: process.env.NODE_ENV === "development" ? cookieError?.message : undefined
        }, { status: 500 })
      }
    }

    console.warn("[Login] Invalid credentials attempted for:", email)
    return NextResponse.json({ error: "Credențiale invalide" }, { status: 401 })
  } catch (error: any) {
    console.error("[Login] Error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined
    })
    return NextResponse.json({ 
      error: "Eroare internă",
      details: process.env.NODE_ENV === "development" ? error?.message : undefined
    }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Admin logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
