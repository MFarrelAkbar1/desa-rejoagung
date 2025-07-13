import type { Metadata } from 'next'
import AdminSidebar from './components/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin - Desa Rejoagung',
  description: 'Portal administrasi Desa Rejoagung',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}