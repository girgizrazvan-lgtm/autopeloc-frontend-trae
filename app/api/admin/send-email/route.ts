import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { from, to, subject, body } = await request.json()

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
