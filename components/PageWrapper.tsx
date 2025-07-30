// components/PageWrapper.tsx - Modified untuk menampilkan PostTerbaru di halaman potensi desa

'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import PostTerbaru from './PostTerbaru'

interface PageWrapperProps {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname()
  const [showPostTerbaru, setShowPostTerbaru] = useState(true)
 
  // Pages that should not show PostTerbaru
  const excludePostTerbaru = [
    '/', // Home page
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/register',
    '/admin/dashboard'
  ]

  // Pages that need full width (like infografis) - POTENSI DESA DIHAPUS DARI SINI
  const fullWidthPages = [
    // '/potensi-desa', // DIHAPUS - sekarang akan menampilkan PostTerbaru
    '/profil/profil-wilayah',
    '/informasi/data-desa'
  ]

  // Check if current path starts with admin or is in exclude list
  const shouldExcludePostTerbaru = excludePostTerbaru.includes(pathname) || pathname.startsWith('/admin')
 
  // Check if current page needs full width
  const needsFullWidth = fullWidthPages.some(page => pathname.startsWith(page))

  if (shouldExcludePostTerbaru || needsFullWidth) {
    // Admin pages, excluded pages, or full-width pages - no sidebar, full width
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    )
  }

  // Other pages - PostTerbaru dengan toggle (TERMASUK POTENSI DESA)
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Toggle Button - Selalu terlihat di desktop */}
      <div className="hidden 2xl:block">
        {showPostTerbaru ? (
          // Tombol Close (X) di dalam PostTerbaru
          <div className={`fixed top-24 right-4 w-80 z-30 transition-transform duration-300 ${
            showPostTerbaru ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="relative">
              <button
                onClick={() => setShowPostTerbaru(false)}
                className="absolute -left-8 top-2 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-l-lg shadow-lg z-40 transition-colors"
                title="Tutup Berita Terbaru"
              >
                <X className="w-4 h-4" />
              </button>
              <PostTerbaru />
            </div>
          </div>
        ) : (
          // Tombol Open (chevron) di kanan layar
          <button
            onClick={() => setShowPostTerbaru(true)}
            className="fixed top-32 right-4 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg shadow-lg z-30 transition-colors"
            title="Buka Berita Terbaru"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Content - NORMAL LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Mobile/Tablet PostTerbaru - Always show, no toggle */}
      <div className="block 2xl:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <PostTerbaru />
      </div>
    </div>
  )
}