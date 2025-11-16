import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/admin-auth"

export async function POST() {
  try {
    await requireAdmin()
  } catch (e: any) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 })
  }

  try {
    const statements = [
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS country_code text;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS country text;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS region text;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS city text;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS latitude double precision;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS longitude double precision;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS is_bot boolean DEFAULT false;`,
      `ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS session_start timestamptz DEFAULT now();`,
      `CREATE UNIQUE INDEX IF NOT EXISTS live_visitors_session_id_idx ON public.live_visitors(session_id);`,
    ]

    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql)
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Eroare la aplicarea setup-ului" }, { status: 500 })
  }
}

