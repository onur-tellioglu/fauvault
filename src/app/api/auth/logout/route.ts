import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'

export async function POST() {
  await clearSessionCookie()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'))
}
