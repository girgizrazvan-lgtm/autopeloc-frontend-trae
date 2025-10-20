import { cookies } from "next/headers"

const ADMIN_EMAIL = "razvan@autopeloc.ro"
const ADMIN_PASSWORD = "Razvan4242"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set admin session cookie (12 hours)
      cookies().set("admin_session", "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 12,
        path: "/",
      })

      return Response.json({ ok: true })
    }

    return Response.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
