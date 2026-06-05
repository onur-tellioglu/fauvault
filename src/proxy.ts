import { NextRequest, NextResponse } from 'next/server'
import { verifySession, createSession, COOKIE_NAME } from '@/lib/auth'
import { neon } from '@neondatabase/serverless'

const REFRESH_THRESHOLD = 60 * 60 * 24 * 2 // Refresh if < 2 days left

function loginRedirect(req: NextRequest): URL {
  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
  return loginUrl
}

export async function proxy(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return NextResponse.redirect(loginRedirect(req))

  const session = await verifySession(token)
  if (!session) {
    const res = NextResponse.redirect(loginRedirect(req))
    res.cookies.delete(COOKIE_NAME)
    return res
  }

  // Validate token version against DB to detect revoked sessions
  const sql = neon(process.env.DATABASE_URL!)
  const rows = await sql`SELECT token_version FROM users WHERE id = ${session.userId}` as { token_version: number }[]
  if (!rows[0] || rows[0].token_version !== session.tokenVersion) {
    const res = NextResponse.redirect(loginRedirect(req))
    res.cookies.delete(COOKIE_NAME)
    return res
  }

  const response = NextResponse.next()

  // Sliding window: transparently refresh tokens approaching expiry
  const now = Math.floor(Date.now() / 1000)
  if (session.exp && session.exp - now < REFRESH_THRESHOLD) {
    const newToken = await createSession({ userId: session.userId, username: session.username, tokenVersion: session.tokenVersion })
    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
  }

  return response
}

// Course content routes (/:course/lectures|study|quiz|flashcard|exam-prep) are
// intentionally PUBLIC so guests can explore study material (see the guest-access
// feature). Only personal/aggregate-data routes are gated here. Decision: #17.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/leaderboard',
    '/profile/:path*',
    '/:course/leaderboard',
    '/:course/dashboard',
  ],
}
