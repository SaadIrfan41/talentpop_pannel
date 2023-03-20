import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })
  if (pathname === '/') {
    if (!session)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
  }
  if (pathname === '/login' || pathname === '/signup') {
    if (session) return NextResponse.redirect(`${origin}`)
  }
}
