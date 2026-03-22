import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { upsertProgress, type ProgressRow } from '@/lib/progress'

const ALLOWED_PATCH_KEYS: Array<keyof Omit<ProgressRow, 'lecture_id'>> = [
  'concept_index',
  'mini_quiz_results',
  'final_quiz_result',
  'completed_at',
]

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lectureId, patch } = await req.json()

  if (typeof lectureId !== 'number')
    return NextResponse.json({ error: 'Invalid lectureId' }, { status: 400 })

  if (!patch || typeof patch !== 'object' || Array.isArray(patch))
    return NextResponse.json({ error: 'Invalid patch' }, { status: 400 })

  const safePatch = Object.fromEntries(
    Object.entries(patch).filter(([key]) => ALLOWED_PATCH_KEYS.includes(key as keyof Omit<ProgressRow, 'lecture_id'>))
  ) as Partial<Omit<ProgressRow, 'lecture_id'>>

  await upsertProgress(session.userId, lectureId, safePatch)
  return NextResponse.json({ ok: true })
}
