import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Dejar pasar la página de login sin verificar
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin-session')
  const cookieSecret = process.env.COOKIE_SECRET

  // Si no hay cookie válida, redirigir al login
  if (!session || !cookieSecret || session.value !== cookieSecret) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Aplica a todas las rutas /admin/* pero NO a rutas públicas
  matcher: ['/admin', '/admin/(.*)'],
}
