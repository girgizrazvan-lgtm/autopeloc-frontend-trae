import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

function formatDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const dateOnly = dateString.split("T")[0]
    const [year, month, day] = dateOnly.split("-")

    if (!year || !month || !day) {
      return dateString
    }

    return `${day}.${month}.${year}`
  } catch (error) {
    console.error("Date formatting error:", error)
    return dateString
  }
}

function formatDateTime(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${day}.${month}.${year} ${hours}:${minutes}`
  } catch (error) {
    console.error("DateTime formatting error:", error)
    return dateString
  }
}

export async function POST(request: NextRequest) {
  try {
    const reservationData = await request.json()

    console.log("New reservation:", reservationData)

    const reservationId = `RES-${Date.now()}`
    const createdAt = new Date().toISOString()

    const formattedStartDate = formatDate(reservationData.serviceStartDate)
    const formattedEndDate = formatDate(reservationData.serviceEndDate)

    const fileDownloadLinks = reservationData.damageReportUrl
      ? `<tr>
<td style="padding: 12px 20px; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Notă constatare</td>
<td style="padding: 12px 20px; font-size: 14px; font-family: Arial, sans-serif; text-align: right;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://autopeloc.ro"}/api/blob-download?url=${encodeURIComponent(reservationData.damageReportUrl)}" style="color: #000000; text-decoration: underline;">Descarcă fișier</a></td>
</tr>`
      : ""

    const customerEmailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ro">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Confirmare cerere – autopeloc.ro</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
<tr>
<td align="center" style="padding: 20px 0;">
<table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff;">
<tr>
<td style="padding: 30px 40px; background-color: #f5f5f5; border-bottom: 2px solid #000000;">
<h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #000000; font-family: Arial, sans-serif;">Rezervare primită!</h1>
</td>
</tr>
<tr>
<td style="padding: 40px 40px 20px 40px;">
<p style="margin: 0 0 20px 0; font-size: 16px; color: #000000; font-family: Arial, sans-serif;">Salutare ${reservationData.clientName},</p>
<p style="margin: 0 0 30px 0; font-size: 14px; color: #333333; line-height: 1.6; font-family: Arial, sans-serif;">Cererea ta a fost înregistrată cu succes! Îți mulțumim că ai ales serviciile autopeloc.ro.</p>
</td>
</tr>
<tr>
<td style="padding: 0 40px 30px 40px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #cccccc; background-color: #fafafa;">
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif; width: 50%;">Vehicul rezervat</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.vehicleName}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Oraș</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.city}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Vinovat</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.atFault === "da" ? "Da" : "Nu"}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Programare reparație</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${formattedStartDate}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Finalizare reparație</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${formattedEndDate}</td>
</tr>
<tr>
<td style="padding: 12px 20px; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Telefon</td>
<td style="padding: 12px 20px; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.clientPhone}</td>
</tr>
${fileDownloadLinks}
</table>
</td>
</tr>
<tr>
<td style="padding: 0 40px 30px 40px;">
<p style="margin: 0 0 15px 0; font-size: 16px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Pașii următori:</p>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding: 8px 0; font-size: 14px; color: #333333; line-height: 1.6; font-family: Arial, sans-serif;">1. Verificăm nota de constatare încărcată pentru a obține acord de mașină de înlocuire.</td>
</tr>
<tr>
<td style="padding: 8px 0; font-size: 14px; color: #333333; line-height: 1.6; font-family: Arial, sans-serif;">2. Un coleg vă va contacta pentru a stabili detalii suplimentare dacă este cazul.</td>
</tr>
<tr>
<td style="padding: 8px 0; font-size: 14px; color: #333333; line-height: 1.6; font-family: Arial, sans-serif;">3. Îți vom confirma detaliile finale ale rezervării.</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 0 40px 30px 40px; text-align: center;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; border: 1px solid #cccccc;">
<tr>
<td style="padding: 20px; text-align: center;">
<p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-family: Arial, sans-serif;">Sună-ne la</p>
<p style="margin: 0; font-size: 20px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">0790 743 974</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 30px 40px; border-top: 2px solid #e0e0e0;">
<p style="margin: 0 0 5px 0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Mobilitate #peloc</p>
<p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-family: Arial, sans-serif;"><a href="https://autopeloc.ro" style="color: #000000; text-decoration: none; font-family: Arial, sans-serif;">autopeloc.ro</a></p>
<p style="margin: 0; font-size: 13px; color: #666666; font-family: Arial, sans-serif;">contact@autopeloc.ro | 0790 743 974</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`

    const customerEmailText = `Rezervare primită!

Salutare ${reservationData.clientName},

Cererea ta a fost înregistrată cu succes! Îți mulțumim că ai ales serviciile autopeloc.ro.

DETALII REZERVARE
------------------
Vehicul rezervat: ${reservationData.vehicleName}
Oraș: ${reservationData.city}
Vinovat: ${reservationData.atFault === "da" ? "Da" : "Nu"}
Programare reparație: ${formattedStartDate}
Finalizare reparație: ${formattedEndDate}
Telefon: ${reservationData.clientPhone}

${reservationData.damageReportUrl ? `FIȘIERE ATAȘATE\n-------------------\nNotă constatare: ${process.env.NEXT_PUBLIC_SITE_URL || "https://autopeloc.ro"}/api/blob-download?url=${encodeURIComponent(reservationData.damageReportUrl)}\n\n` : ""}PAȘII URMĂTORI
---------------
1. Verificăm nota de constatare încărcată pentru a obține acord de mașină de înlocuire.
2. Un coleg vă va contacta pentru a stabili detalii suplimentare dacă este cazul.
3. Îți vom confirma detaliile finale ale rezervării.

Sună-ne la 0790 743 974

---
Mobilitate #peloc
autopeloc.ro
contact@autopeloc.ro | 0790 743 974`

    const internalEmailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ro">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cerere nouă – autopeloc.ro</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
<tr>
<td align="center" style="padding: 20px 0;">
<table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff;">
<tr>
<td style="padding: 30px 40px; background-color: #f5f5f5; border-bottom: 2px solid #000000;">
<h1 style="margin: 0; font-size: 22px; font-weight: bold; color: #000000; font-family: Arial, sans-serif;">Cerere nouă înregistrată</h1>
</td>
</tr>
<tr>
<td style="padding: 30px 40px 20px 40px;">
<h2 style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold; color: #000000; font-family: Arial, sans-serif;">Date client</h2>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #cccccc; background-color: #fafafa;">
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif; width: 40%;">Nume</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.clientName}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Telefon</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; font-family: Arial, sans-serif; text-align: right;"><a href="tel:${reservationData.clientPhone}" style="color: #000000; text-decoration: none;">${reservationData.clientPhone}</a></td>
</tr>
<tr>
<td style="padding: 12px 20px; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Email</td>
<td style="padding: 12px 20px; font-size: 14px; font-family: Arial, sans-serif; text-align: right;"><a href="mailto:${reservationData.clientEmail}" style="color: #000000; text-decoration: none;">${reservationData.clientEmail}</a></td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 0 40px 20px 40px;">
<h2 style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold; color: #000000; font-family: Arial, sans-serif;">Detalii solicitare</h2>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #cccccc; background-color: #fafafa;">
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif; width: 40%;">Oraș</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.city}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Vehicul</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.vehicleName}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Vinovat</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationData.atFault === "da" ? "Da" : "Nu"}</td>
</tr>
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Programare reparație</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${formattedStartDate}</td>
</tr>
<tr>
<td style="padding: 12px 20px; ${fileDownloadLinks ? "border-bottom: 1px solid #e0e0e0;" : ""} font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Finalizare reparație</td>
<td style="padding: 12px 20px; ${fileDownloadLinks ? "border-bottom: 1px solid #e0e0e0;" : ""} font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${formattedEndDate}</td>
</tr>
${fileDownloadLinks}
</table>
</td>
</tr>
<tr>
<td style="padding: 0 40px 20px 40px;">
<h2 style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold; color: #000000; font-family: Arial, sans-serif;">Meta</h2>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #cccccc; background-color: #fafafa;">
<tr>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif; width: 40%;">ID Rezervare</td>
<td style="padding: 12px 20px; border-bottom: 1px solid #e0e0e0; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${reservationId}</td>
</tr>
<tr>
<td style="padding: 12px 20px; font-size: 14px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;">Data creării</td>
<td style="padding: 12px 20px; font-size: 14px; color: #333333; font-family: Arial, sans-serif; text-align: right;">${formatDateTime(createdAt)}</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 0 40px 30px 40px; text-align: center;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding: 10px; text-align: center;">
<a href="https://autopeloc.ro" style="display: inline-block; padding: 12px 30px; background-color: #f5f5f5; color: #000000; text-decoration: none; font-size: 14px; font-weight: bold; font-family: Arial, sans-serif; border: 1px solid #cccccc;">Vezi pe site</a>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding: 20px 40px; border-top: 2px solid #e0e0e0; background-color: #fafafa;">
<p style="margin: 0; font-size: 13px; color: #666666; font-family: Arial, sans-serif; text-align: center;">Mesaj intern automat – autopeloc.ro | contact@autopeloc.ro | 0790 743 974</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`

    const internalEmailText = `Cerere nouă înregistrată (${formatDateTime(createdAt)})

DATE CLIENT
-----------
Nume: ${reservationData.clientName}
Telefon: ${reservationData.clientPhone}
Email: ${reservationData.clientEmail}

DETALII SOLICITARE
------------------
Oraș: ${reservationData.city}
Vehicul: ${reservationData.vehicleName}
Vinovat: ${reservationData.atFault === "da" ? "Da" : "Nu"}
Programare reparație: ${formattedStartDate}
Finalizare reparație: ${formattedEndDate}

${reservationData.damageReportUrl ? `FIȘIERE ATAȘATE\n-------------------\nNotă constatare: ${process.env.NEXT_PUBLIC_SITE_URL || "https://autopeloc.ro"}/api/blob-download?url=${encodeURIComponent(reservationData.damageReportUrl)}\n\n` : ""}META
----
ID Rezervare: ${reservationId}
Data creării: ${formatDateTime(createdAt)}

---
Vezi pe site: https://autopeloc.ro

Mesaj intern automat – autopeloc.ro | contact@autopeloc.ro | 0790 743 974`

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

        await resend.emails.send({
          from: fromEmail.includes("@") ? `autopeloc.ro <${fromEmail}>` : `autopeloc.ro <${fromEmail}>`,
          to: reservationData.clientEmail,
          replyTo: "contact@autopeloc.ro",
          subject: "Confirmare cerere – autopeloc.ro",
          html: customerEmailHtml,
          text: customerEmailText,
        })

        console.log("✓ Customer confirmation email sent to:", reservationData.clientEmail)

        const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || "contact@autopeloc.ro"

        await resend.emails.send({
          from: fromEmail.includes("@") ? `autopeloc.ro <${fromEmail}>` : `autopeloc.ro <${fromEmail}>`,
          to: internalEmail,
          replyTo: reservationData.clientEmail,
          subject: `Cerere nouă – ${reservationData.vehicleName} – ${reservationData.city} – ${reservationData.clientName}`,
          html: internalEmailHtml,
          text: internalEmailText,
        })

        console.log("✓ Internal notification email sent to:", internalEmail)
      } catch (emailError: any) {
        console.error("✗ Failed to send email:", emailError?.message || emailError)
      }
    } else {
      console.warn("⚠ RESEND_API_KEY not configured - skipping email notifications")
    }

    return NextResponse.json({
      success: true,
      message: "Reservation received successfully",
      reservationId,
    })
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ error: "Failed to process reservation" }, { status: 500 })
  }
}
