// app/potensi-desa/page.tsx - Index page that redirects to wisata
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PotensiDesaPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/potensi-desa/wisata')
  }, [router])
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Mengalihkan ke halaman wisata...</p>
      </div>
    </div>
  )
}