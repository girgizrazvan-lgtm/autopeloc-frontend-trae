import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createServiceClient } from "@/lib/supabase/service"
import { requireAdmin } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

// GET - Fetch all reservations
export async function GET(request: NextRequest) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ success: false, error: "Neautorizat" }, { status: 401 })
    }
    console.log("[v0] Fetching reservations from database")

    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createServiceClient() : await createClient()

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 100

    // Build query
    let query = supabase.from("reservations").select("*").order("created_at", { ascending: false }).limit(limit)

    // Apply status filter if provided
    if (status) {
      query = query.eq("status", status)
    }

    const { data: reservations, error } = await query

    if (error) {
      console.error("[v0] Error fetching reservations:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log(`[v0] Found ${reservations?.length || 0} reservations`)

    return NextResponse.json({
      success: true,
      reservations: reservations || [],
      count: reservations?.length || 0,
    })
  } catch (error: any) {
    console.error("[v0] Error in reservations API:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// GET by ID - Fetch single reservation
export async function POST(request: NextRequest) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ success: false, error: "Neautorizat" }, { status: 401 })
    }
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, error: "Reservation ID required" }, { status: 400 })
    }

    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createServiceClient() : await createClient()

    const { data: reservation, error } = await supabase.from("reservations").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Error fetching reservation:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      reservation,
    })
  } catch (error: any) {
    console.error("[v0] Error in reservation fetch:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH - Update reservation status
export async function PATCH(request: NextRequest) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ success: false, error: "Neautorizat" }, { status: 401 })
    }
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status required" }, { status: 400 })
    }

    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createServiceClient() : await createClient()

    const { data, error } = await supabase
      .from("reservations")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating reservation:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      reservation: data,
    })
  } catch (error: any) {
    console.error("[v0] Error in reservation update:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
