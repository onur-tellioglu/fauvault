import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'
import { createSession, setSessionCookie } from '@/lib/auth'
import { checkAuthLimit } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (!username || typeof username !== 'string' || username.length < 3 || username.length > 50)
    return NextResponse.json({ error: 'Username must be 3–50 characters' }, { status: 400 })

  if (!await checkAuthLimit(`login:${username.toLowerCase()}`))
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  if (!password || typeof password !== 'string' || password.length < 8 || password.length > 72)
    return NextResponse.json({ error: 'Password must be 8–72 characters' }, { status: 400 })

  const rows = await sql`
    SELECT id, username, password_hash, token_version FROM users WHERE username = ${username}
  ` as unknown as { id: number; username: string; password_hash: string; token_version: number }[]
  const user = rows[0]
  if (!user)
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid)
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

  const token = await createSession({ userId: user.id, username: user.username, tokenVersion: user.token_version })
  await setSessionCookie(token)
  return NextResponse.json({ username: user.username })
}
