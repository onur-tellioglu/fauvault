import { NextResponse } from 'next/server'
import { getSession, clearSessionCookie, invalidateAllSessions } from '@/lib/auth'

export async function POST() {
  const session = await getSession()
  if (session) await invalidateAllSessions(session.userId)
  await clearSessionCookie()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'))
}
