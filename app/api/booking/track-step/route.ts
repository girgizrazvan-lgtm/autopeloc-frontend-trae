import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Track-step API called")

    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Request body:", JSON.stringify(body, null, 2))

    const { sessionId, stepNumber, stepName, stepData } = body

    if (!sessionId || !stepNumber || !stepName) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Step 1: Create or update session (simplified - only session_id)
    if (stepNumber === 1) {
      console.log("[v0] Creating/updating session:", sessionId)

      const { data: sessionData, error: sessionError } = await supabase
        .from("booking_sessions")
        .upsert(
          {
            session_id: sessionId,
          },
          {
            onConflict: "session_id",
          },
        )
        .select()

      if (sessionError) {
        console.error("[v0] Error creating session:", sessionError)
        return NextResponse.json({ error: "Failed to create session", details: sessionError }, { status: 500 })
      }

      console.log("[v0] Session created/updated:", sessionData)
    }

    // Track step completion
    console.log("[v0] Tracking step:", stepNumber, stepName)

    const { data: stepData2, error: stepError } = await supabase
      .from("booking_funnel_steps")
      .insert({
        session_id: sessionId,
        step_number: stepNumber,
        step_name: stepName,
        step_data: stepData,
      })
      .select()

    if (stepError) {
      console.error("[v0] Error tracking step:", stepError)
      return NextResponse.json({ error: "Failed to track step", details: stepError }, { status: 500 })
    }

    console.log("[v0] Step tracked successfully:", stepData2)

    return NextResponse.json({ success: true, data: stepData2 })
  } catch (error) {
    console.error("[v0] Error in track-step:", error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}
