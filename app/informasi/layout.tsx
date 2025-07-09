// app/informasi/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informasi - Desa Rejoagung',
  description: 'Informasi data desa dan layanan Desa Rejoagung',
}

export default function InformasiLayout({
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