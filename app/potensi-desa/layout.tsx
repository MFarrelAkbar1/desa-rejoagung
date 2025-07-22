// app/potensi-desa/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Potensi Desa - Desa Rejoagung',
  description: 'Potensi wisata, fisik, dan non-fisik Desa Rejoagung',
}

export default function PotensiDesaLayout({
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