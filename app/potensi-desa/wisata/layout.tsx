
// app/potensi-desa/wisata/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wisata - Desa Rejoagung',
  description: 'Destinasi wisata menarik di Desa Rejoagung',
}

export default function WisataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}