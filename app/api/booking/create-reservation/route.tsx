import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

async function detectReservationsSchema(supabase: any): Promise<"new" | "legacy"> {
  // Try selecting the 'city' column (new schema)
  const testNew = await supabase.from("reservations").select("city").limit(1)
  if (!testNew.error) return "new"

  // Fallback: try selecting 'pickup_city' (legacy schema)
  const testLegacy = await supabase.from("reservations").select("pickup_city").limit(1)
  if (!testLegacy.error) return "legacy"

  // Default to new schema if detection fails
  return "new"
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Create-reservation API called")

    const supabase = await createClient()
    const body = await request.json()

    console.log("[v0] Create-reservation API called with data:", JSON.stringify(body, null, 2))

    const { sessionId, userCar, replacementCar, city, pickupDate, returnDate, contact, documentUrl, atFault } = body

    // Validate required fields
    if (!sessionId || !contact?.name || !contact?.email || !contact?.phone || !documentUrl) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Enforce policy: only register if atFault === "nu"
    const normalizedFault = String(atFault || "").trim().toLowerCase()
    if (normalizedFault !== "nu") {
      console.log("[v0] Rejecting reservation: atFault is not 'nu'", normalizedFault)
      return NextResponse.json(
        { error: "Serviciul se adresează doar păgubiților (NU vinovat)." },
        { status: 400 },
      )
    }

    // Prepare reservation data with schema detection (handles legacy vs new columns)
    const schemaVersion = await detectReservationsSchema(supabase)

    const reservationDataNew = {
      session_id: sessionId,
      contact_name: contact.name,
      contact_email: contact.email,
      contact_phone: contact.phone,
      user_car_brand: userCar?.brand || "Unknown",
      user_car_model: userCar?.model || "Unknown",
      user_car_year: userCar?.year ? Number.parseInt(userCar.year) : new Date().getFullYear(),
      user_car_transmission: userCar?.transmission || "Unknown",
      city: city || "Unknown",
      document_url: documentUrl,
      document_blob_id: null,
      pickup_date: null,
      return_date: null,
      replacement_car_brand: replacementCar?.brand || "TBD",
      replacement_car_model: replacementCar?.model || "TBD",
      replacement_car_category: replacementCar?.category || "TBD",
      replacement_car_sipp: replacementCar?.sipp || "TBD",
      status: "pending",
    }

    const reservationDataLegacy = {
      session_id: sessionId,
      customer_name: contact.name,
      customer_email: contact.email,
      customer_phone: contact.phone,
      pickup_city: city || "Unknown",
      user_car: {
        brand: userCar?.brand || "Unknown",
        model: userCar?.model || "Unknown",
        year: userCar?.year ? Number.parseInt(userCar.year) : new Date().getFullYear(),
        transmission: userCar?.transmission || "Unknown",
      },
      selected_vehicle: {
        brand: replacementCar?.brand || "TBD",
        model: replacementCar?.model || "TBD",
        category: replacementCar?.category || "TBD",
        sipp: replacementCar?.sipp || "TBD",
      },
      document_url: documentUrl,
      status: "pending",
      pickup_date: null,
    }

    // Hybrid: legacy pickup_city + contact_* fields (for mixed schemas)
    const reservationDataHybrid = {
      session_id: sessionId,
      contact_name: contact.name,
      contact_email: contact.email,
      contact_phone: contact.phone,
      pickup_city: city || "Unknown",
      user_car: {
        brand: userCar?.brand || "Unknown",
        model: userCar?.model || "Unknown",
        year: userCar?.year ? Number.parseInt(userCar.year) : new Date().getFullYear(),
        transmission: userCar?.transmission || "Unknown",
      },
      selected_vehicle: {
        brand: replacementCar?.brand || "TBD",
        model: replacementCar?.model || "TBD",
        category: replacementCar?.category || "TBD",
        sipp: replacementCar?.sipp || "TBD",
      },
      document_url: documentUrl,
      status: "pending",
      pickup_date: null,
    }

    const insertPayload = schemaVersion === "new" ? reservationDataNew : reservationDataLegacy

    console.log("[v0] Inserting reservation (schema:", schemaVersion, "):", JSON.stringify(insertPayload, null, 2))

    // Helper: attempt insert and trim unknown columns dynamically
    async function insertWithColumnTrimming(payload: Record<string, any>, maxTrims = 10) {
      let current = { ...payload }
      for (let i = 0; i < maxTrims; i++) {
        const attempt = await supabase.from("reservations").insert(current).select().single()
        if (!attempt.error) return attempt
        const err = attempt.error
        const msg = err?.message || ""
        // PostgREST unknown column error (PGRST204): extract column name and delete
        const match = msg.match(/Could not find the '([^']+)' column/)
        if (err?.code === "PGRST204" && match && match[1]) {
          const col = match[1]
          console.warn(`[v0] Trimming unknown column from payload: ${col}`)
          delete (current as any)[col]
          continue
        }
        return attempt
      }
      return await supabase.from("reservations").insert(current).select().single()
    }

    // Try insert with dynamic trimming on primary payload
    let reservationInsert = await insertWithColumnTrimming(insertPayload)
    let reservation = reservationInsert.data
    let reservationError = reservationInsert.error

    // Fallbacks if still error
    if (reservationError) {
      console.warn("[v0] Primary insert failed. Trying legacy payload with trimming.")
      reservationInsert = await insertWithColumnTrimming(reservationDataLegacy)
      reservation = reservationInsert.data
      reservationError = reservationInsert.error

      if (reservationError) {
        console.warn("[v0] Legacy insert failed. Trying hybrid payload with trimming.")
        reservationInsert = await insertWithColumnTrimming(reservationDataHybrid)
        reservation = reservationInsert.data
        reservationError = reservationInsert.error
      }
    }

    if (reservationError) {
      console.error("[v0] Error creating reservation:", reservationError)
      return NextResponse.json({ error: "Failed to create reservation", details: reservationError }, { status: 500 })
    }

    console.log("[v0] Reservation created:", reservation.id)

    // Track Step 3 completion with step_number
    try {
      const { error: stepError } = await supabase.from("booking_funnel_steps").insert({
        session_id: sessionId,
        step_number: 3,
        step_name: "reservation_submitted",
        step_data: {
          reservation_id: reservation.id,
          at_fault: normalizedFault,
          user_car: userCar,
          replacement_car: replacementCar,
          contact: contact,
        },
      })

      if (stepError) {
        console.error("[v0] Step tracking error:", stepError.message)
      }
    } catch (stepErr) {
      console.error("[v0] Step tracking failed:", stepErr)
    }

    // Send confirmation emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
        const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || "razvan42@icloud.com"

        // Email to customer
        await resend.emails.send({
          from: fromEmail,
          to: contact.email,
          subject: "Confirmare rezervare - autopeloc.ro",
          html: `
            <h2>Rezervare confirmată</h2>
            <p>Bună ${contact.name},</p>
            <p>Am primit cererea ta de rezervare pentru mașina de înlocuire.</p>
            <h3>Detalii rezervare:</h3>
            <ul>
              <li><strong>Mașina ta:</strong> ${userCar?.brand} ${userCar?.model} (${userCar?.year})</li>
              <li><strong>Oraș:</strong> ${city || "Nespecificat"}</li>
              <li><strong>Contact:</strong> ${contact.phone}</li>
            </ul>
            <p>Te vom contacta în cel mai scurt timp pentru confirmarea disponibilității.</p>
            <p>Cu respect,<br>Echipa autopeloc.ro</p>
          `,
        })

        // Email to internal team
        await resend.emails.send({
          from: fromEmail,
          to: internalEmail,
          subject: `Rezervare nouă - ${contact.name}`,
          html: `
            <h2>Rezervare nouă primită</h2>
            <h3>Detalii client:</h3>
            <ul>
              <li><strong>Nume:</strong> ${contact.name}</li>
              <li><strong>Email:</strong> ${contact.email}</li>
              <li><strong>Telefon:</strong> ${contact.phone}</li>
            </ul>
            <h3>Detalii mașină client:</h3>
            <ul>
              <li><strong>Marca:</strong> ${userCar?.brand}</li>
              <li><strong>Model:</strong> ${userCar?.model}</li>
              <li><strong>An:</strong> ${userCar?.year}</li>
              <li><strong>Transmisie:</strong> ${userCar?.transmission}</li>
            </ul>
            <h3>Mașină solicitată:</h3>
            <ul>
              <li><strong>Marca:</strong> ${replacementCar?.brand || "TBD"}</li>
              <li><strong>Model:</strong> ${replacementCar?.model || "TBD"}</li>
              <li><strong>Categorie:</strong> ${replacementCar?.category || "TBD"}</li>
            </ul>
            <h3>Alte detalii:</h3>
            <ul>
              <li><strong>Oraș:</strong> ${city || "Nespecificat"}</li>
              <li><strong>Vinovat:</strong> Nu</li>
              <li><strong>Document:</strong> <a href="${documentUrl}">Vezi document</a></li>
            </ul>
            <p><strong>ID Rezervare:</strong> ${reservation.id}</p>
          `,
        })

        console.log("[v0] Confirmation emails sent")
      } catch (emailError) {
        console.error("[v0] Email error:", emailError)
      }
    } else {
      console.warn("⚠ RESEND_API_KEY not configured - skipping email notifications")
    }

    // Sync to admin platform (if configured)
    try {
      const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL
      const adminApiKey = process.env.ADMIN_API_KEY

      if (adminUrl && adminApiKey) {
        const response = await fetch(`${adminUrl}/api/reservations/incoming`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminApiKey}`,
            "X-Source": "autopeloc-frontend",
          },
          body: JSON.stringify({
            reservation_id: reservation.id,
            session_id: sessionId,
            // Send both keys for compatibility
            customer: contact,
            contact: contact,
            user_car: userCar,
            replacement_car: replacementCar,
            city: city,
            pickup_date: reservation?.pickup_date ?? null,
            return_date: reservation?.return_date ?? null,
            document_url: documentUrl,
            at_fault: normalizedFault,
            created_at: new Date().toISOString(),
          }),
        })

        if (response.ok) {
          const adminData = await response.json()
          const adminId = adminData?.reservation_id || adminData?.id || null

          await supabase
            .from("reservations")
            .update({
              synced_to_admin: true,
              admin_sync_at: new Date().toISOString(),
              admin_reservation_id: adminId,
            })
            .eq("id", reservation.id)

          console.log("[v0] Synced to admin platform")
        } else {
          const errText = await response.text()
          console.warn("[v0] Admin sync failed:", response.status, errText)
        }
      }
    } catch (syncError) {
      console.error("[v0] Admin sync error:", syncError)
    }

    return NextResponse.json({
      success: true,
      reservation_id: reservation.id,
      message: "Rezervare creată cu succes",
    })
  } catch (error) {
    console.error("[v0] Error in create-reservation:", error)
    return NextResponse.json({ error: "Internal server error", details: String(error) }, { status: 500 })
  }
}
