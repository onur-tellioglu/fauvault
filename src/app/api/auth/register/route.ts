import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || username.length < 2)
    return NextResponse.json({ error: 'Username too short (min 2 chars)' }, { status: 400 })
  if (!password || password.length < 6)
    return NextResponse.json({ error: 'Password too short (min 6 chars)' }, { status: 400 })

  const existing = await sql`SELECT id FROM users WHERE username = ${username}`
  if (existing.length > 0)
    return NextResponse.json({ error: 'Username already taken' }, { status: 409 })

  const hash = await bcrypt.hash(password, 10)
  const [user] = await sql`
    INSERT INTO users (username, password_hash) VALUES (${username}, ${hash})
    RETURNING id, username
  `

  const token = await createSession({ userId: user.id, username: user.username })
  await setSessionCookie(token)
  return NextResponse.json({ username: user.username })
}
