import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()

  // Eliminar la cookie de sesión
  cookieStore.set('admin-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'))
}
