export interface User {
  id: string
  email: string
  name?: string
  company?: string
  role: "client" | "service" | "provider" | "admin"
  status?: "pending" | "approved" | "rejected"
  createdAt?: string
}

export interface AuthSession {
  user: User
  token?: string
  expiresAt?: string
}

// Admin credentials for Auth0
const ADMIN_CREDENTIALS = {
  email: "razvan@autopeloc.ro",
  password: "Razvan4242",
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

export async function registerUser(
  email: string,
  name: string,
  company: string,
  password: string,
): Promise<User | null> {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, company }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Register error:", error)
      return null
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("[v0] Register error:", error)
    return null
  }
}

export async function loginUser(email: string, password: string): Promise<AuthSession | null> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] User login error:", error)
      return null
    }

    const data = await response.json()
    return {
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    console.error("[v0] User login error:", error)
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

export async function logout(role?: "admin" | "user" | "provider" | "client" | "service") {
  const returnTo = "/admin"

  if (typeof window !== "undefined") {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }

    // Redirect to the page (which will show login form since session is cleared)
    window.location.href = returnTo
  }
}

export async function getPendingUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/users/pending")
    if (!response.ok) {
      return []
    }

    const users = await response.json()
    return Array.isArray(users) ? users : []
  } catch (error) {
    console.error("[v0] Get pending users error:", error)
    return []
  }
}

export async function getApprovedUsers(): Promise<User[]> {
  try {
    const response = await fetch("/api/users/approved")
    if (!response.ok) {
      return []
    }

    const users = await response.json()
    return Array.isArray(users) ? users : []
  } catch (error) {
    console.error("[v0] Get approved users error:", error)
    return []
  }
}

export async function approveUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/users/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    return response.ok
  } catch (error) {
    console.error("[v0] Approve user error:", error)
    return false
  }
}

export async function rejectUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/users/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    return response.ok
  } catch (error) {
    console.error("[v0] Reject user error:", error)
    return false
  }
}
