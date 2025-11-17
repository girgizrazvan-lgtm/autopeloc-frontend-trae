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
    // Use $executeRaw with template literals instead of $executeRawUnsafe
    // This is safer as it uses parameterized queries when possible
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS country_code text;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS country text;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS region text;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS city text;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS latitude double precision;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS longitude double precision;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS is_bot boolean DEFAULT false;`
    await prisma.$executeRaw`ALTER TABLE IF EXISTS public.live_visitors ADD COLUMN IF NOT EXISTS session_start timestamptz DEFAULT now();`
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS live_visitors_session_id_idx ON public.live_visitors(session_id);`

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Eroare la aplicarea setup-ului" }, { status: 500 })
  }
}

