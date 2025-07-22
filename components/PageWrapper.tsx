// components/PageWrapper.tsx

'use client'

import { usePathname } from 'next/navigation'
import PostTerbaru from './PostTerbaru'

interface PageWrapperProps {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    // Home page - no sidebar, full width
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