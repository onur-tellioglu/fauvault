import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import sql from './db'

const raw = process.env.JWT_SECRET
if (!raw) throw new Error('JWT_SECRET environment variable is not set')
const SECRET = new TextEncoder().encode(raw)
export const COOKIE_NAME = 'aip_session'

export type SessionPayload = { userId: number; username: string; tokenVersion: number; exp?: number }

export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

/** Increments token_version, invalidating all existing sessions for this user. */
export async function invalidateAllSessions(userId: number): Promise<void> {
  await sql`UPDATE users SET token_version = token_version + 1 WHERE id = ${userId}`
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    const { userId, username, tokenVersion } = payload as unknown as SessionPayload
    return { userId, username, tokenVersion, exp: payload.exp }
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}
