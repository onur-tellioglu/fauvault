import { NextRequest, NextResponse } from 'next/server'
import { getSession, clearSessionCookie, invalidateAllSessions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (session) await invalidateAllSessions(session.userId)
  await clearSessionCookie()
  return NextResponse.redirect(new URL('/', request.url), { status: 303 })
}
