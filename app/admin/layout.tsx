// app/admin/layout.tsx
import type { Metadata } from 'next'

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
    <div className="min-h-screen">
      {children}
    </div>
  )
}