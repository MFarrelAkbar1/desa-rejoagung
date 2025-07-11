'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useNavbar } from './NavbarContext'
import { menuItems } from './menuData'

interface MobileMenuProps {
  isScrolled: boolean
}

export default function MobileMenu({ isScrolled }: MobileMenuProps) {
  const pathname = usePathname()
  const { isMobileMenuOpen, toggleMobileMenu, setIsMobileMenuOpen } = useNavbar()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href
  const isParentActive = (submenu: any[]) => submenu?.some(item => pathname === item.href)

  const toggleSubmenu = (menuId: string) => {
    setOpenSubmenu(openSubmenu === menuId ? null : menuId)
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setOpenSubmenu(null)
  }

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={`p-2 rounded-lg transition-colors ${
          isScrolled 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-white hover:bg-white/10'
        }`}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`
                        w-full flex items-center justify-between px-6 py-4
                        transition-colors duration-200
                        ${isParentActive(item.submenu)
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {openSubmenu === item.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {openSubmenu === item.id && (
                      <div className="bg-gray-50">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className={`
                              flex items-center space-x-3 px-12 py-3
                              transition-colors duration-200
                              ${isActive(subItem.href)
                                ? 'bg-emerald-100 text-emerald-600 border-r-4 border-emerald-600'
                                : 'text-gray-600 hover:bg-gray-100'
                              }
                            `}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="font-medium">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center space-x-3 px-6 py-4
                      transition-colors duration-200
                      ${isActive(item.href!)
                        ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-gray-800 font-semibold">Desa Rejoagung</p>
                <p className="text-gray-500 text-xs">© 2025</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}