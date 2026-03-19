import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const [user] = await sql`
    SELECT id, username, password_hash FROM users WHERE username = ${username}
  `
  if (!user)
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid)
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

  const token = await createSession({ userId: user.id, username: user.username })
  await setSessionCookie(token)
  return NextResponse.json({ username: user.username })
}
