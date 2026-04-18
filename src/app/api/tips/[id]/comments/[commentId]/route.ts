import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { deleteComment, getUserRole } from '@/lib/tips'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; commentId: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { commentId } = await params
  const role = await getUserRole(session.userId)
  await deleteComment(commentId, session.userId, role === 'admin')
  return NextResponse.json({ ok: true })
}
