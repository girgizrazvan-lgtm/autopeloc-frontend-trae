import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "razvan@autopeloc.ro"
// Support both hashed and plain-text passwords for migration period
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ""
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
    if (!ADMIN_PASSWORD_HASH && !ADMIN_PASSWORD) {
      if (process.env.NODE_ENV === "production") {
        console.error("[Login] ADMIN_PASSWORD_HASH environment variable is not set in production")
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
      }
      // In development, allow default password "admin123"
      console.warn("[Login] No password configured. Using default password 'admin123' for development")
    }

    // Verify email matches
    if (email !== ADMIN_EMAIL) {
      console.warn("[Login] Invalid email attempted:", email)
      return NextResponse.json({ error: "Credențiale invalide" }, { status: 401 })
    }

    // Verify password (prefer hashed password)
    let isPasswordValid = false

    if (ADMIN_PASSWORD_HASH) {
      // Use bcrypt to verify hashed password (SECURE)
      isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    } else if (ADMIN_PASSWORD) {
      // Fallback to plain-text comparison (INSECURE - for migration only)
      console.warn("[Login] Using plain-text password comparison. Please migrate to ADMIN_PASSWORD_HASH!")
      isPasswordValid = password === ADMIN_PASSWORD
    } else if (process.env.NODE_ENV !== "production") {
      // Development default
      isPasswordValid = password === "admin123"
    }

    if (isPasswordValid) {
      // Set admin session cookie (2 hours for security)
      try {
        const cookieStore = await cookies()
        cookieStore.set("admin_session", "1", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 2, // 2 hours (reduced from 12 for security)
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
