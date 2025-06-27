'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/context/SidebarContext'
import { 
  Home, 
  User, 
  Newspaper, 
  Package, 
  Utensils, 
  Settings, 
  Users, 
  Heart, 
  FileText, 
  GraduationCap,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: any
  href?: string
  submenu?: SubMenuItem[]
}

interface SubMenuItem {
  id: string
  label: string
  icon: any
  href: string
}

export default function SidebarNavbar() {
  const { isOpen, toggleSidebar } = useSidebar()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  const toggleSubmenu = (menuId: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }
// Update untuk SidebarNavbar.tsx - bagian menuItems
const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/'
  },
  {
    id: 'profil',
    label: 'Profil Desa',
    icon: User,
    href: '/profil'
  },
  {
    id: 'berita',
    label: 'Berita & Artikel',
    icon: Newspaper,
    href: '/berita'
  },
  {
    id: 'produk-kuliner',
    label: 'Produk & Kuliner',
    icon: Package,
    submenu: [
      {
        id: 'produk',
        label: 'Produk Unggulan',
        icon: Package,
        href: '/produk'
      },
      {
        id: 'kuliner',
        label: 'Kuliner Lokal',
        icon: Utensils,
        href: '/kuliner'
      }
    ]
  },
  {
    id: 'layanan-desa',
    label: 'Layanan Desa',
    icon: Settings,
    submenu: [
      {
        id: 'data-penduduk',
        label: 'Data Penduduk',
        icon: Users,
        href: '/layanan-desa/data-penduduk'
      },
      {
        id: 'layanan-kesehatan',
        label: 'Layanan Kesehatan',
        icon: Heart,
        href: '/layanan-desa/layanan-kesehatan'
      }
    ]
  },
  {
    id: 'wisata',
    label: 'Wisata (PDF)',
    icon: FileText,
    href: '/wisata'
  },
  {
    id: 'peta-sekolah',
    label: 'Peta Sekolah',
    icon: GraduationCap,
    href: '/peta-sekolah'
  }
]
  const isActive = (href: string) => pathname === href
  const isParentActive = (submenu: SubMenuItem[]) => submenu.some(item => pathname === item.href)

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
        shadow-2xl bg-green-50
      `}>
        {/* Header */}
        <div className="flex items-center justify-center p-4 border-b border-gray-200">
          <div className={`flex items-center space-x-3 ${!isOpen && 'justify-center'}`}>
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Image
                src="/logo-rejoagung.png"
                alt="Logo Desa Rejoagung"
                width={28}
                height={28}
                className="object-contain"
              />
            </button>
            {isOpen && (
              <div>
                <h1 className="text-gray-800 font-bold text-lg">Desa Rejoagung</h1>
                <p className="text-gray-600 text-xs">Portal Resmi</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              {/* Main Menu Item */}
              {item.submenu ? (
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer
                    transition-all duration-200
                    ${isParentActive(item.submenu)
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                  onClick={() => toggleSubmenu(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </div>
                  {isOpen && (
                    <div className="text-gray-500">
                      {openMenus[item.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  className={`
                    flex items-center p-3 rounded-lg
                    transition-all duration-200
                    ${isActive(item.href!)
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                    ${!isOpen && 'justify-center'}
                  `}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {isOpen && item.submenu && openMenus[item.id] && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className={`
                        flex items-center space-x-3 p-2 rounded-lg
                        transition-all duration-200
                        ${isActive(subItem.href)
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span className="text-sm">{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-100 rounded-lg p-3 text-center border border-gray-200">
              <p className="text-gray-600 text-xs mb-1">Portal Desa</p>
              <p className="text-gray-800 font-semibold text-sm">Rejoagung</p>
              <p className="text-gray-500 text-xs">© 2025</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}