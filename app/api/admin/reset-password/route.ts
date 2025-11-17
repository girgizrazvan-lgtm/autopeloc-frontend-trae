import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import crypto from "crypto"
import { Resend } from "resend"
import { passwordResetRequestSchema, passwordResetSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "razvan@autopeloc.ro"
const RESEND_API_KEY = process.env.RESEND_API_KEY
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@autopeloc.ro"

// Helper to generate password hash (NEVER store plain-text passwords)
async function generatePasswordHash(newPassword: string): Promise<string> {
  const saltRounds = 12
  const hash = await bcrypt.hash(newPassword, saltRounds)
  console.warn("========================================")
  console.warn("NEW ADMIN PASSWORD HASH GENERATED")
  console.warn("========================================")
  console.warn("Please update your ADMIN_PASSWORD_HASH environment variable with:")
  console.warn(hash)
  console.warn("========================================")
  console.warn("IMPORTANT: Update ADMIN_PASSWORD_HASH in your hosting platform's environment variables")
  console.warn("========================================")
  return hash
}

// POST - Request password reset
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const validationResult = passwordResetRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Email invalid", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Verify email matches admin email
    if (email !== ADMIN_EMAIL) {
      // Don't reveal if email exists for security
      return NextResponse.json({ ok: true, message: "Dacă email-ul există, vei primi link-ul de resetare" })
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // Token valid for 1 hour

    try {
      // Save reset token to database
      try {
        await prisma.adminPasswordReset.create({
          data: {
            email,
            token,
            expiresAt,
          },
        })
      } catch (dbError: any) {
        // If table doesn't exist, use raw SQL
        if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
          await prisma.$executeRaw`
            INSERT INTO admin_password_resets (email, token, expires_at)
            VALUES (${email}, ${token}, ${expiresAt.toISOString()})
            ON CONFLICT (token) DO NOTHING
          `
        } else {
          throw dbError
        }
      }

      // Send reset email
      if (RESEND_API_KEY) {
        const resend = new Resend(RESEND_API_KEY)
        const resetLink = `${SITE_URL}/admin/reset-password?token=${token}`

        await resend.emails.send({
          from: FROM_EMAIL.includes("@") ? `autopeloc.ro <${FROM_EMAIL}>` : FROM_EMAIL,
          to: email,
          subject: "Resetare parolă - Admin autopeloc.ro",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Resetare parolă Admin</h2>
              <p>Ai solicitat resetarea parolei pentru contul de admin.</p>
              <p>Click pe link-ul de mai jos pentru a reseta parola (link-ul este valid 1 oră):</p>
              <p style="margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Resetare Parolă
                </a>
              </p>
              <p>SAU copiază link-ul în browser:</p>
              <p style="word-break: break-all; color: #666;">${resetLink}</p>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">
                Dacă nu ai solicitat resetarea parolei, poți ignora acest email.
              </p>
            </div>
          `,
        })
      }

      return NextResponse.json({ ok: true, message: "Dacă email-ul există, vei primi link-ul de resetare" })
    } catch (dbError: any) {
      // If table doesn't exist yet, log and continue
      if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
        console.warn("Password reset table does not exist. Run migration first.")
        // Still send email if possible
        if (RESEND_API_KEY) {
          const resend = new Resend(RESEND_API_KEY)
          const resetLink = `${SITE_URL}/admin/reset-password?token=${token}`

          await resend.emails.send({
            from: FROM_EMAIL.includes("@") ? `autopeloc.ro <${FROM_EMAIL}>` : FROM_EMAIL,
            to: email,
            subject: "Resetare parolă - Admin autopeloc.ro",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Resetare parolă Admin</h2>
                <p>Ai solicitat resetarea parolei. Token-ul este: <strong>${token}</strong></p>
                <p>Mergi la: ${SITE_URL}/admin/reset-password?token=${token}</p>
              </div>
            `,
          })
        }
        return NextResponse.json({ ok: true, message: "Link trimis (verifică și spam)" })
      }
      throw dbError
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Reset password with token
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const validationResult = passwordResetSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Date invalide", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { token, newPassword } = validationResult.data

    try {
      // Verify token
      let resetRecord
      try {
        resetRecord = await prisma.adminPasswordReset.findFirst({
          where: {
            token,
            used: false,
            expiresAt: {
              gt: new Date(),
            },
          },
        })
      } catch (dbError: any) {
        // If table doesn't exist, use raw SQL
        if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
          const records = await prisma.$queryRaw<Array<{
            id: string
            email: string
            token: string
            expires_at: Date
            used: boolean
          }>>`
            SELECT * FROM admin_password_resets
            WHERE token = ${token}
            AND used = false
            AND expires_at > NOW()
            LIMIT 1
          `
          resetRecord = records.length > 0 ? records[0] : null
        } else {
          throw dbError
        }
      }

      if (!resetRecord) {
        return NextResponse.json({ error: "Token invalid sau expirat" }, { status: 400 })
      }

      // Generate password hash (never store plain-text)
      const passwordHash = await generatePasswordHash(newPassword)

      // Mark token as used
      try {
        await prisma.adminPasswordReset.update({
          where: { token },
          data: { used: true },
        })
      } catch (dbError: any) {
        // If table doesn't exist, use raw SQL
        if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
          await prisma.$executeRaw`
            UPDATE admin_password_resets
            SET used = true
            WHERE token = ${token}
          `
        } else {
          throw dbError
        }
      }

      return NextResponse.json({
        ok: true,
        message: "Parolă resetată cu succes. Verifică log-urile server pentru hash-ul parolei și actualizează ADMIN_PASSWORD_HASH în variabilele de mediu.",
        warning: "IMPORTANT: Actualizează variabila de mediu ADMIN_PASSWORD_HASH cu hash-ul afișat în log-uri.",
        passwordHash: process.env.NODE_ENV !== "production" ? passwordHash : undefined,
      })
    } catch (dbError: any) {
      if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
        return NextResponse.json({ error: "Tabelul de resetare parolă nu există. Rulează migrarea." }, { status: 500 })
      }
      throw dbError
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

