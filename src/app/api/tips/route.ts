import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createTip } from '@/lib/tips'
import { isValidCourse, type Course } from '@/lib/courses'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { course, body } = await req.json()
  if (!isValidCourse(course)) return NextResponse.json({ error: 'Invalid course' }, { status: 400 })
  if (!body || typeof body !== 'string' || body.trim().length === 0 || body.length > 1000)
    return NextResponse.json({ error: 'Body must be 1–1000 characters' }, { status: 400 })

  await createTip(course as Course, session.userId, body.trim())
  return NextResponse.json({ ok: true })
}
