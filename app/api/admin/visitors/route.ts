import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdmin()
  } catch (error: any) {
    if (error?.message === "Unauthorized" || error?.message?.includes("Unauthorized") || error?.name === "UnauthorizedError") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    console.error("[Visitors API] Auth error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
    })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = await createClient()

    // Get all active visitors (active in last 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()

    const includeBots = request.nextUrl.searchParams.get("include_bots") === "true"
    const { data: visitors, error } = await supabase
      .from("live_visitors")
      .select("session_id,current_page,page_title,referrer,user_agent,first_seen,last_activity,country_code,country,region,city,latitude,longitude,is_bot")
      .gte("last_activity", twoMinutesAgo)
      .order("last_activity", { ascending: false })

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === "PGRST116" || error.message?.includes("does not exist")) {
        console.warn("[Visitors API] Table 'live_visitors' does not exist yet")
        return NextResponse.json({ visitors: [] })
      }
      console.error("[Visitors API] Error fetching visitors:", error)
      return NextResponse.json({ visitors: [] }, { status: 200 }) // Return empty instead of error
    }

    // Calculate status for each visitor (active if last activity < 90 seconds ago)
    const now = Date.now()
    let processed = (visitors || [])
    if (!includeBots) {
      processed = processed.filter((v: any) => v.is_bot !== true)
    }
    const visitorsWithStatus = processed.map((visitor: any) => {
      const lastActivity = new Date(visitor.last_activity).getTime()
      const secondsSinceActivity = (now - lastActivity) / 1000
      const isActive = secondsSinceActivity < 90

      return {
        ...visitor,
        status: isActive ? "active" : "inactive",
        secondsSinceActivity: Math.floor(secondsSinceActivity),
      }
    })

    console.log(`[Visitors API] Successfully loaded ${visitorsWithStatus.length} visitors`)
    return NextResponse.json({ visitors: visitorsWithStatus })
  } catch (error: any) {
    console.error("[Visitors API] Error:", {
      message: error?.message || "Unknown error",
      name: error?.name,
      code: error?.code,
    })
    // Return empty array instead of error to prevent breaking the UI
    return NextResponse.json({ visitors: [] }, { status: 200 })
  }
}
