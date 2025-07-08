'use client'

import { useState, useEffect } from 'react'
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

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-gradient-to-r from-emerald-600 to-green-600 shadow-md'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavbarLogo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <NavbarMenu isScrolled={isScrolled} />

          {/* Mobile Menu */}
          <MobileMenu isScrolled={isScrolled} />
        </div>
      </div>
    </header>
  )
}