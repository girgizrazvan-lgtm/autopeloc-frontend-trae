import { NextResponse } from "next/server"
import { Resend } from "resend"
import { requireAdmin } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    try {
      await requireAdmin()
    } catch (error: any) {
      return NextResponse.json({ success: false, error: "Neautorizat" }, { status: 401 })
    }
    const { from, to, subject, body } = await request.json()

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, error: "RESEND_API_KEY not configured" }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: from || process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: [to],
      subject: subject,
      text: body,
    })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
