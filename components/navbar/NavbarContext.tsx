'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface NavbarContextType {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  activeDropdown: string | null
  setActiveDropdown: (dropdown: string | null) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <NavbarContext.Provider value={{ 
      isMobileMenuOpen, 
      setIsMobileMenuOpen, 
      toggleMobileMenu,
      activeDropdown,
      setActiveDropdown
    }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider')
  }
  return context
}