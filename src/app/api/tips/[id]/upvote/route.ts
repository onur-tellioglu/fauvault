import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { toggleUpvote } from '@/lib/tips'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await toggleUpvote(id, session.userId)
  return NextResponse.json({ ok: true })
}
