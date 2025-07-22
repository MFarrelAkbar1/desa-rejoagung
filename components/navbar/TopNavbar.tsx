// components/navbar/TopNavbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { LogIn, User } from 'lucide-react'
import NavbarLogo from './NavbarLogo'
import NavbarMenu from './NavbarMenu'
import MobileMenu from './MobileMenu'
import GlobalSearchBar from '../SearchBar/GlobalSearchBar'
import { useAdminAuth } from '@/lib/auth'

export default function TopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAdmin, adminUser, logoutAdmin } = useAdminAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoginClick = () => {
    window.location.href = '/admin/login'
  }

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      await logoutAdmin()
      window.location.href = '/'
    }
  }

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled
        ? 'bg-white shadow-lg'
        : 'bg-gradient-to-r from-emerald-600 to-green-600 shadow-md'
      }
    `}>
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavbarLogo isScrolled={isScrolled} />
         
          {/* Desktop Menu */}
          <NavbarMenu isScrolled={isScrolled} />
         
          {/* Search Bar - Shortened from max-w-md to max-w-xs */}
          <div className="hidden lg:block flex-1 max-w-xs mx-6">
            <GlobalSearchBar
              placeholder="Cari berita, kuliner..."
              className="w-full text-black placeholder:text-black"
            />
          </div>

          {/* Right Side - Admin Profile or Login Button */}
          <div className="flex items-center space-x-3">
            {/* Admin Profile Icon atau Login Button */}
            {isAdmin ? (
              <div className="relative group">
                <button className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                  }
                `}>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">{adminUser?.username || 'Admin'}</span>
                </button>
                
                {/* Admin Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{adminUser?.username}</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${isScrolled
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-white/20 text-white hover:bg-white/30'
                  }
                `}
              >
                <LogIn className="w-4 h-4" />
                <span>Login Admin</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <MobileMenu isScrolled={isScrolled} />
          </div>
        </div>

        {/* Mobile Search Bar - Shortened placeholder text */}
        <div className="lg:hidden pb-3">
          <GlobalSearchBar
            placeholder="Cari berita, kuliner..."
            className="w-full"
          />
        </div>
      </div>
    </header>
  )
}