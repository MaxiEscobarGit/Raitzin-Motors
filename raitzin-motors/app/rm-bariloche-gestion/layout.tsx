import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: 'Panel Admin — Raitzin Motors',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isLoginPage = pathname === '/rm-bariloche-gestion/login'

  if (isLoginPage) {
    return <>{children}</>
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
