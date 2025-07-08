'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useNavbar } from './NavbarContext'
import { menuItems } from './menuData'

interface NavbarMenuProps {
  isScrolled: boolean
}

export default function NavbarMenu({ isScrolled }: NavbarMenuProps) {
  const pathname = usePathname()
  const { activeDropdown, setActiveDropdown } = useNavbar()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isActive = (href: string) => pathname === href
  const isParentActive = (submenu: any[]) => submenu?.some(item => pathname === item.href)

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(menuId)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => item.submenu && handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          {item.submenu ? (
            <button
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 whitespace-nowrap
                ${isScrolled
                  ? isParentActive(item.submenu)
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  : isParentActive(item.submenu)
                    ? 'bg-white/20 text-white'
                    : 'text-white hover:bg-white/10'
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                activeDropdown === item.id ? 'rotate-180' : ''
              }`} />
            </button>
          ) : (
            <Link
              href={item.href!}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 whitespace-nowrap
                ${isScrolled
                  ? isActive(item.href!)
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  : isActive(item.href!)
                    ? 'bg-white/20 text-white'
                    : 'text-white hover:bg-white/10'
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          )}

          {/* Dropdown Menu */}
          {item.submenu && activeDropdown === item.id && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.id}
                  href={subItem.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 text-sm
                    transition-all duration-300 whitespace-nowrap group
                    ${isActive(subItem.href)
                      ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:translate-x-1'
                    }
                  `}
                >
                  <subItem.icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive(subItem.href) 
                      ? 'text-emerald-600' 
                      : 'text-gray-500 group-hover:text-emerald-600'
                  }`} />
                  <span className="font-medium">{subItem.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}