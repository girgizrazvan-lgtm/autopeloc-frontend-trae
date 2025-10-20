import * as Sentry from "@sentry/nextjs"

export async function POST(req: Request) {
  try {
    const { source, message, ctx } = await req.json()

    Sentry.captureMessage(`[${source || "V0"}] ${message || "Error"}`, {
      level: "error",
      extra: ctx,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error("[v0] Failed to report to Sentry:", error)
    return Response.json({ error: "Failed to report error" }, { status: 500 })
  }
}
