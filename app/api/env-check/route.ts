import { NextResponse } from "next/server"

export async function GET() {
  const envs = {
    hasNEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasNEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasSUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasDATABASE_URL: !!process.env.DATABASE_URL,
    hasDIRECT_URL: !!process.env.DIRECT_URL,
    vercelEnv: process.env.VERCEL_ENV || null,
    nodeEnv: process.env.NODE_ENV || null,
  }
  return NextResponse.json(envs)
}

