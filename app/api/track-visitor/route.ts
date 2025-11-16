import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { sessionId, currentPage, pageTitle, referrer } = body

    if (!sessionId || !currentPage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user agent & ip
    const userAgent = request.headers.get("user-agent") || ""
    const forwardedFor = request.headers.get("x-forwarded-for") || ""
    const ip = forwardedFor.split(",")[0].trim() || ""

    // Detect bots (basic heuristics)
    const uaLower = userAgent.toLowerCase()
    const isBot = /bot|spider|crawl|curl|wget|httpclient|python-requests/.test(uaLower)

    // Rate-limit per session: skip if last activity < 5s
    let existing: any = null
    try {
      const { data } = await supabase
        .from("live_visitors")
        .select("last_activity, latitude, longitude")
        .eq("session_id", sessionId)
        .single()
      existing = data || null
      if (existing?.last_activity) {
        const last = new Date(existing.last_activity).getTime()
        if (Date.now() - last < 5000) {
          return NextResponse.json({ success: true, skipped: true })
        }
      }
    } catch {}

    // Geo lookup: only when first time or missing coords
    let geo: {
      country_code?: string | null
      country?: string | null
      region?: string | null
      city?: string | null
      latitude?: number | null
      longitude?: number | null
    } = {}
    try {
      const needGeo = !existing || !existing.latitude || !existing.longitude
      if (needGeo) {
        // ipapi.co
        const url1 = ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`
        const r1 = await fetch(url1, { cache: "no-store" })
        const j1 = await r1.json()
        geo = {
          country_code: j1?.country_code || null,
          country: j1?.country_name || j1?.country || null,
          region: j1?.region || j1?.region_code || null,
          city: j1?.city || null,
          latitude: typeof j1?.latitude === "number" ? j1.latitude : Number.parseFloat(j1?.latitude) || null,
          longitude: typeof j1?.longitude === "number" ? j1.longitude : Number.parseFloat(j1?.longitude) || null,
        }
        // Fallback ip-api.com dacă lipsesc coordonatele
        if (!geo.latitude || !geo.longitude) {
          const url2 = ip ? `http://ip-api.com/json/${ip}` : `http://ip-api.com/json/`
          const r2 = await fetch(url2, { cache: "no-store" })
          const j2 = await r2.json()
          if (j2?.status === "success") {
            geo = {
              country_code: j2?.countryCode || geo.country_code || null,
              country: j2?.country || geo.country || null,
              region: j2?.regionName || geo.region || null,
              city: j2?.city || geo.city || null,
              latitude: typeof j2?.lat === "number" ? j2.lat : geo.latitude || null,
              longitude: typeof j2?.lon === "number" ? j2.lon : geo.longitude || null,
            }
          }
        }
      }
    } catch {}

    const payload: Record<string, any> = {
      session_id: sessionId,
      current_page: currentPage,
      page_title: pageTitle || null,
      referrer: referrer || null,
      user_agent: userAgent,
      last_activity: new Date().toISOString(),
      session_start: new Date().toISOString(),
      is_bot: isBot,
      ...geo,
    }

    // Upsert with dynamic trimming for missing columns
    async function upsertWithTrimming(obj: Record<string, any>, maxTrims = 8) {
      let cur = { ...obj }
      for (let i = 0; i < maxTrims; i++) {
        const { error: err } = await supabase
          .from("live_visitors")
          .upsert(cur, { onConflict: "session_id", ignoreDuplicates: false })
        if (!err) return { ok: true }
        const msg = err?.message || ""
        const match = msg.match(/Could not find the '([^']+)' column/)
        if (err?.code === "PGRST204" && match && match[1]) {
          delete (cur as any)[match[1]]
          continue
        }
        return { ok: false, error: err }
      }
      const { error: finalErr } = await supabase
        .from("live_visitors")
        .upsert(cur, { onConflict: "session_id", ignoreDuplicates: false })
      return { ok: !finalErr, error: finalErr }
    }

    const resUpsert = await upsertWithTrimming(payload)
    if (!resUpsert.ok) {
      console.error("Error tracking visitor:", resUpsert.error)
      return NextResponse.json({ error: "Failed to track visitor" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in track-visitor:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
