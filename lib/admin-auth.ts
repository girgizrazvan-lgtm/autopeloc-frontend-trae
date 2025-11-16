import { cookies } from "next/headers"

export async function checkAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    return adminSession === "1"
  } catch (error: any) {
    console.error("[AdminAuth] Error checking session:", {
      message: error?.message || "Unknown error",
      name: error?.name,
    })
    return false
  }
}

export async function requireAdmin(): Promise<void> {
  try {
    const isAdmin = await checkAdminSession()
    if (!isAdmin) {
      const error = new Error("Unauthorized")
      error.name = "UnauthorizedError"
      throw error
    }
  } catch (error: any) {
    // Re-throw with proper error type
    if (error?.name === "UnauthorizedError" || error?.message === "Unauthorized") {
      throw error
    }
    // For other errors (like cookie errors), also throw as unauthorized
    console.error("[AdminAuth] Error in requireAdmin:", error)
    const authError = new Error("Unauthorized")
    authError.name = "UnauthorizedError"
    throw authError
  }
}

