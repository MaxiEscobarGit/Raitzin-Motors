import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: 'Panel Admin — Raitzin Motors',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  const cookieSecret = process.env.COOKIE_SECRET

  // Redirect to login if session cookie is absent or doesn't match the secret
  if (!session || !cookieSecret || session.value !== cookieSecret) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F3F4F6' }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Contenido principal */}
      <main className="flex-1 min-w-0 overflow-auto md:ml-0">
        <div className="p-6 md:p-8 pt-16 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
