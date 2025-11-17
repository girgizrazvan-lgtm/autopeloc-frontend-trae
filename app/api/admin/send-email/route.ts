import { NextResponse } from "next/server"
import { Resend } from "resend"
import { requireAdmin } from "@/lib/admin-auth"
import { z } from "zod"

// Validation schema for email sending
const emailSchema = z.object({
  to: z.string().email("Email destinatar invalid"),
  subject: z.string().min(1, "Subiectul este obligatoriu").max(200, "Subiectul este prea lung (max 200 caractere)"),
  body: z.string().min(1, "Conținutul este obligatoriu").max(10000, "Conținutul este prea lung (max 10000 caractere)"),
  // "from" field is ignored - always use RESEND_FROM_EMAIL
})

// Allowed sender domains (prevent email spoofing)
const ALLOWED_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@autopeloc.ro"

export async function POST(request: Request) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ success: false, error: "Neautorizat" }, { status: 401 })
    }

    const body = await request.json()

    // Validate input
    const validationResult = emailSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: "Date invalide",
        details: validationResult.error.issues
      }, { status: 400 })
    }

    const { to, subject, body: emailBody } = validationResult.data

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, error: "RESEND_API_KEY not configured" }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Always use configured FROM email (prevent spoofing)
    const { data, error } = await resend.emails.send({
      from: ALLOWED_FROM_EMAIL,
      to: [to],
      subject: subject,
      text: emailBody,
    })

    // Log email send for audit trail
    console.log("[Email] Admin sent email to:", to, "subject:", subject.substring(0, 50))

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
