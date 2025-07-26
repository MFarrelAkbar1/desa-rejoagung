// components/PageWrapper.tsx - Fixed to prevent squishing

'use client'

import { usePathname } from 'next/navigation'
import PostTerbaru from './PostTerbaru'

interface PageWrapperProps {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname()
 
  // Pages that should not show PostTerbaru
  const excludePostTerbaru = [
    '/', // Home page
    '/admin/login',
    '/admin/forgot-password',
    '/admin/reset-password',
    '/admin/register',
    '/admin/dashboard'
  ]

  // Pages that need full width (like infografis)
  const fullWidthPages = [
    '/potensi-desa', // Infografis halaman
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

  // Other pages - with PostTerbaru sidebar but prevent squishing
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content - Takes most of the space but has minimum width */}
          <div className="flex-1 min-w-0 max-w-none xl:max-w-[1000px]">
            {children}
          </div>
         
          {/* Sidebar with PostTerbaru - Only show on very large screens */}
          <div className="hidden 2xl:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <PostTerbaru />
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet PostTerbaru - Show below content on smaller screens */}
        <div className="block 2xl:hidden mt-8">
          <PostTerbaru />
        </div>
      </div>
    </div>
  )
}