
// app/potensi-desa/non-fisik/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Potensi Non-Fisik - Desa Rejoagung',
  description: 'Potensi sumber daya manusia dan kelembagaan Desa Rejoagung',
}

export default function PotensiNonFisikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}