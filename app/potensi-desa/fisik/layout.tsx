
// app/potensi-desa/fisik/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Potensi Fisik - Desa Rejoagung',
  description: 'Potensi sumber daya alam dan fisik Desa Rejoagung',
}

export default function PotensiFisikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
