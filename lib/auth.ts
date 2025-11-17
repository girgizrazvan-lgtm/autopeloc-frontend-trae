export interface User {
  id: string
  email: string
  name?: string
  company?: string
  role: "admin"
  status?: "pending" | "approved" | "rejected"
  createdAt?: string
}

export interface AuthSession {
  user: User
  token?: string
  expiresAt?: string
}

export async function loginAdmin(email: string, password: string): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Admin login error:", error)
      return null
    }

    const data = await response.json()

    return {
      user: {
        id: "admin",
        email: email,
        role: "admin",
      },
    }
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return null
  }
}

export async function getAdminSession(): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/auth/session")
    if (!response.ok) {
      return null
    }

    const session = await response.json()
    if (session.user.role !== "admin") {
      return null
    }

    return session
  } catch (error) {
    console.error("[v0] Get admin session error:", error)
    return null
  }
}

export async function getUserSession(): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/auth/session")
    if (!response.ok) {
      return null
    }

    const session = await response.json()
    return session
  } catch (error) {
    console.error("[v0] Get user session error:", error)
    return null
  }
}

export async function logout() {
  const returnTo = "/admin"

  if (typeof window !== "undefined") {
    try {
      await fetch("/api/admin/login", {
        method: "DELETE",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }

    // Redirect to admin login page
    window.location.href = returnTo
  }
}
