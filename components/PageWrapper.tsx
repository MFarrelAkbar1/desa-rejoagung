// components/PageWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react'
import PostTerbaru from './PostTerbaru'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  mobileScale?: 'normal' | 'compact' | 'dense' | 'ultra' | 'auto'
}

export default function PageWrapper({ 
  children, 
  className = "",
  mobileScale = 'auto'
}: PageWrapperProps) {
  const pathname = usePathname()
  const [showPostTerbaru, setShowPostTerbaru] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [currentScale, setCurrentScale] = useState<string>('normal')

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-detect scale level berdasarkan path dan jenis konten
  useEffect(() => {
    if (mobileScale === 'auto') {
      // Pages dengan infografis/data kompleks - butuh scaling paling aggressive
      const ultraDensePages = [
        '/profil/profil-wilayah',
        '/informasi/data-desa',
        '/sumber-daya-alam',
        '/sarana-prasarana'
      ]
      
      // Pages dengan tabel/form - butuh scaling sedang-berat
      const densePages = [
        '/potensi-desa',
        '/pemerintahan',
        '/program-kerja'
      ]
      
      // Pages dengan content medium - butuh scaling ringan
      const compactPages = [
        '/organisasi',
        '/berita',
        '/pengumuman',
        '/galeri'
      ]

      if (ultraDensePages.some(page => pathname.startsWith(page))) {
        setCurrentScale('ultra')    // 65% - buat infografis besar
      } else if (densePages.some(page => pathname.startsWith(page))) {
        setCurrentScale('dense')    // 75% - buat tabel/data
      } else if (compactPages.some(page => pathname.startsWith(page))) {
        setCurrentScale('compact')  // 85% - buat content medium
      } else {
        setCurrentScale('normal')   // 100% - normal
      }
    } else {
      setCurrentScale(mobileScale)
    }
  }, [pathname, mobileScale])

  // Pages that should not show PostTerbaru
  const excludePostTerbaru = [
    '/',
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/register',
    '/admin/dashboard'
  ]

  // Pages that need full width
  const fullWidthPages = [
    '/profil/profil-wilayah',
    '/informasi/data-desa',
    '/potensi-desa'
  ]

  const shouldExcludePostTerbaru = excludePostTerbaru.includes(pathname) || 
    pathname.startsWith('/admin')
  const needsFullWidth = fullWidthPages.some(page => pathname.startsWith(page))

  // Get scale class - REAL content scaling
  const getScaleClass = () => {
    if (!isMobile) return ''
    
    switch (currentScale) {
      case 'compact':
        return 'mobile-scale-compact'
      case 'dense':
        return 'mobile-scale-dense'
      case 'ultra':
        return 'mobile-scale-ultra'
      default:
        return 'mobile-scale-normal'
    }
  }

  // Mobile-optimized container classes
  const getMobileOptimizedClasses = () => {
    const baseClasses = [
      "min-h-[calc(100vh-4rem)]",
      "w-full",
      "max-w-full",
      "overflow-x-hidden",
      "bg-gray-50",
      // Responsive padding yang akan di-scale
      "px-2 sm:px-4 md:px-6 lg:px-8",
      "text-sm sm:text-base",
      "py-2 sm:py-4 md:py-6"
    ]
    
    return baseClasses.join(" ")
  }

  // Real Content Scaling Controls
  const ScaleControls = () => {
    if (!isMobile) return null

    const scales = ['normal', 'compact', 'dense', 'ultra']
    const currentIndex = scales.indexOf(currentScale)

    const scaleUp = () => {
      const nextIndex = Math.max(0, currentIndex - 1)
      setCurrentScale(scales[nextIndex])
    }

    const scaleDown = () => {
      const nextIndex = Math.min(scales.length - 1, currentIndex + 1)
      setCurrentScale(scales[nextIndex])
    }

    const getScaleInfo = () => {
      switch (currentScale) {
        case 'normal': return { percentage: '100%', label: 'Normal', icon: '📱' }
        case 'compact': return { percentage: '85%', label: 'Compact', icon: '📋' }
        case 'dense': return { percentage: '75%', label: 'Dense', icon: '📊' }
        case 'ultra': return { percentage: '65%', label: 'Ultra', icon: '🔬' }
        default: return { percentage: '100%', label: 'Normal', icon: '📱' }
      }
    }

    const scaleInfo = getScaleInfo()

    return (
      <div className="mobile-zoom-controls">
        <button
          onClick={scaleUp}
          disabled={currentScale === 'normal'}
          aria-label="Make content bigger"
          title="Make content bigger"
        >
          <Maximize className="w-4 h-4" />
        </button>
        
        <div className="mobile-zoom-level">
          <div className="text-center">
            <div className="text-xs font-medium">{scaleInfo.percentage}</div>
            <div className="text-xs opacity-70">{scaleInfo.label}</div>
          </div>
        </div>
        
        <button
          onClick={scaleDown}
          disabled={currentScale === 'ultra'}
          aria-label="Make content smaller"
          title="Make content smaller"
        >
          <Minimize className="w-4 h-4" />
        </button>
      </div>
    )
  }

  // Scale indicator untuk debugging
  const ScaleIndicator = () => {
    if (!isMobile || process.env.NODE_ENV !== 'development') return null
    
    return (
      <div className="fixed top-20 right-4 bg-black text-white px-2 py-1 rounded text-xs z-50 opacity-75">
        Scale: {currentScale}
      </div>
    )
  }

  if (shouldExcludePostTerbaru || needsFullWidth) {
    // Admin pages, excluded pages, or full-width pages
    return (
      <div className={`${getMobileOptimizedClasses()} ${className}`}>
        <div className={`w-full max-w-full ${getScaleClass()}`}>
          {children}
        </div>
        <ScaleControls />
        <ScaleIndicator />
      </div>
    )
  }

  // Other pages - PostTerbaru dengan toggle (responsive layout)
  return (
    <div className={`${getMobileOptimizedClasses()} ${className}`}>
      {/* Mobile Layout - Stack vertically */}
      <div className="block xl:hidden">
        <div className={`w-full max-w-full ${getScaleClass()}`}>
          {children}
        </div>
        
        {/* PostTerbaru di bawah content untuk mobile */}
        {showPostTerbaru && (
          <div className="mt-4 w-full">
            <div className={`bg-white rounded-lg p-4 relative ${getScaleClass()}`}>
              <button
                onClick={() => setShowPostTerbaru(false)}
                className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
              <PostTerbaru />
            </div>
          </div>
        )}
        
        {/* Tombol untuk show PostTerbaru jika hidden */}
        {!showPostTerbaru && (
          <button
            onClick={() => setShowPostTerbaru(true)}
            className="fixed bottom-4 right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-50"
            aria-label="Tampilkan Post Terbaru"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden xl:block">
        <div className="flex gap-6 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className={`flex-1 ${showPostTerbaru ? 'max-w-[calc(100%-24rem)]' : 'max-w-full'}`}>
            {children}
          </div>

          {/* PostTerbaru Sidebar */}
          {showPostTerbaru ? (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg p-4 relative">
                  <button
                    onClick={() => setShowPostTerbaru(false)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                    aria-label="Tutup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <PostTerbaru />
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPostTerbaru(true)}
              className="fixed top-24 right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 z-30"
              aria-label="Tampilkan Post Terbaru"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Scale Controls */}
      <ScaleControls />
      <ScaleIndicator />
    </div>
  )
}