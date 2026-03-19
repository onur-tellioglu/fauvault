import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { upsertProgress } from '@/lib/progress'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { lectureId, patch } = await req.json()
  await upsertProgress(session.userId, lectureId, patch)
  return NextResponse.json({ ok: true })
}
