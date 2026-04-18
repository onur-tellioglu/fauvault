import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'
import { createSession, setSessionCookie } from '@/lib/auth'
import { checkAuthLimit } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || typeof username !== 'string' || username.length < 3 || username.length > 50)
    return NextResponse.json({ error: 'Username must be 3–50 characters' }, { status: 400 })

  const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/
  if (!USERNAME_REGEX.test(username))
    return NextResponse.json({ error: 'Username may only contain letters, numbers, and underscores' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  if (!await checkAuthLimit(`register:${ip}`))
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  if (!password || typeof password !== 'string' || password.length < 8 || password.length > 72)
    return NextResponse.json({ error: 'Password must be 8–72 characters' }, { status: 400 })

  const existing = await sql`SELECT id FROM users WHERE username = ${username}` as unknown as unknown[]
  if (existing.length > 0)
    return NextResponse.json({ error: 'Username already taken' }, { status: 409 })

  const hash = await bcrypt.hash(password, 10)
  const rows = await sql`
    INSERT INTO users (username, password_hash) VALUES (${username}, ${hash})
    RETURNING id, username
  ` as unknown as { id: number; username: string }[]
  const user = rows[0]

  const token = await createSession({ userId: user.id, username: user.username, tokenVersion: 0 })
  await setSessionCookie(token)
  return NextResponse.json({ username: user.username })
}
