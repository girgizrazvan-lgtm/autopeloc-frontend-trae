import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { guard } from "@/lib/sentry-wrapper"

export const POST = guard(async (request: NextRequest) => {
  const userId = request.cookies.get("user_id")?.value

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const { role } = await request.json()

    if (!["client", "service", "provider", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}, "onboarding-complete")
