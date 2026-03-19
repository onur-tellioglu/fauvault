import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('aip_session')?.value
  if (!token) return NextResponse.redirect(new URL('/', req.url))
  const session = await verifySession(token)
  if (!session) return NextResponse.redirect(new URL('/', req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/lecture/:path*', '/quiz/:path*', '/study/:path*', '/profile/:path*'],
}
