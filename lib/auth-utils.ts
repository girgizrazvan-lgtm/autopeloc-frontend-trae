import { createSupabaseServerClient } from "./supabase-server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

// Session management
export async function createSession(userId: string, email: string, role: string, company?: string) {
  const sessionId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const supabase = await createSupabaseServerClient()

  // Store session in database
  await supabase.from("sessions").insert({
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt.toISOString(),
    created_at: new Date().toISOString(),
  })

  // Set session cookie
  const cookieStore = await cookies()
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { sessionId, expiresAt }
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) {
    return null
  }

  const supabase = await createSupabaseServerClient()

  // Get session from database with user data
  const { data: sessions, error } = await supabase
    .from("sessions")
    .select(
      `
      *,
      users!inner (
        id,
        email,
        name,
        role,
        company,
        status
      )
    `,
    )
    .eq("id", sessionId)
    .gt("expires_at", new Date().toISOString())
    .limit(1)

  if (error || !sessions || sessions.length === 0) {
    return null
  }

  const session = sessions[0]
  const user = session.users as any

  return {
    user: {
      id: session.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company,
      status: user.status,
    },
    expiresAt: session.expires_at,
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (sessionId) {
    const supabase = await createSupabaseServerClient()
    // Delete session from database
    await supabase.from("sessions").delete().eq("id", sessionId)
  }

  // Clear session cookie
  cookieStore.delete("session")
}

// Password hashing with bcrypt (secure implementation)
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12 // Higher rounds = more secure but slower
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
