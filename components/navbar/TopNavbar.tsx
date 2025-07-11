// components/navbar/TopNavbar.tsx
'use client'
import { useState, useEffect } from 'react'
import { LogIn, User } from 'lucide-react'
import NavbarLogo from './NavbarLogo'
import NavbarMenu from './NavbarMenu'
import MobileMenu from './MobileMenu'

export default function TopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoginClick = () => {
    // Navigate to admin login page
    window.location.href = '/admin/login'
  }

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled
        ? 'bg-white shadow-lg'
        : 'bg-gradient-to-r from-emerald-600 to-green-600 shadow-md'
      }
    `}>
      {/* Perubahan: 
        - Mengganti 'max-w-7xl mx-auto' dengan 'w-full' untuk membuat navbar full-width.
        - Menyesuaikan padding horizontal (px) menjadi 'px-6 sm:px-8 lg:px-12' agar konten tidak terlalu menempel ke tepi layar.
        - Ini akan membuat logo dan menu tampak lebih ke kiri.
      */}
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavbarLogo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <NavbarMenu isScrolled={isScrolled} />

          {/* Right Side - Login Button and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Login Button - Hidden on mobile, shown on desktop */}
            <button
              onClick={handleLoginClick}
              className={`
                hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 whitespace-nowrap
                ${isScrolled
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }
              `}
            >
              <LogIn className="w-4 h-4" />
              <span>Login Admin</span>
            </button>

            {/* Mobile Menu */}
            <MobileMenu isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </header>
  )
}