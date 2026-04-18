import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { upsertFlashcardProgress } from '@/lib/flashcard-progress'
import { isValidCourse } from '@/lib/courses'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { course, known, cardIndex } = await req.json()

  if (!isValidCourse(course))
    return NextResponse.json({ error: 'Invalid course' }, { status: 400 })
  if (!Array.isArray(known) || typeof cardIndex !== 'number')
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  await upsertFlashcardProgress(session.userId, course, known, cardIndex)
  return NextResponse.json({ ok: true })
}
