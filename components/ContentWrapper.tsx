'use client'
import { ReactNode } from 'react'

interface ContentWrapperProps {
  children: ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div className="ml-16 lg:ml-64 min-h-screen transition-all duration-300">
      {children}
    </div>
  )
}