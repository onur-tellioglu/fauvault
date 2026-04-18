import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { deleteTip, getUserRole } from '@/lib/tips'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const role = await getUserRole(session.userId)
  await deleteTip(id, session.userId, role === 'admin')
  return NextResponse.json({ ok: true })
}
