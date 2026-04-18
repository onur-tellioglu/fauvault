import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getTipComments, createComment } from '@/lib/tips'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const comments = await getTipComments(id)
  return NextResponse.json(comments)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { body } = await req.json()
  if (!body || typeof body !== 'string' || body.trim().length === 0 || body.length > 500)
    return NextResponse.json({ error: 'Body must be 1–500 characters' }, { status: 400 })

  await createComment(id, session.userId, body.trim())
  return NextResponse.json({ ok: true })
}
