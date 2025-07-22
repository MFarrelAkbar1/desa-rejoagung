// components/PageWrapper.tsx - Fixed to exclude PostTerbaru from admin pages
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

  // Check if current path starts with admin or is in exclude list
  const shouldExcludePostTerbaru = excludePostTerbaru.includes(pathname) || pathname.startsWith('/admin')

  if (shouldExcludePostTerbaru) {
    // Admin pages or excluded pages - no sidebar, full width
    return (
      <div className="min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    )
  }

  // Other pages - with PostTerbaru sidebar positioned more to the right
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content - Takes most of the space */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
         
          {/* Sidebar with PostTerbaru - Fixed width, positioned to the right */}
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <PostTerbaru />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}