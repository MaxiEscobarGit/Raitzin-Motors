import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Inject pathname so server layouts can read it
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Login page is always accessible
  if (pathname === '/admin/login') {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const session = request.cookies.get('admin-session')
  const cookieSecret = process.env.COOKIE_SECRET

  // Si no hay cookie válida, redirigir al login
  if (!session || !cookieSecret || session.value !== cookieSecret) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: '/admin/:path*',
}
