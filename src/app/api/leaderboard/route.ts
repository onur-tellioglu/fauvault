import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getLeaderboard } from '@/lib/leaderboard'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await getLeaderboard()
  return NextResponse.json(rows)
}
