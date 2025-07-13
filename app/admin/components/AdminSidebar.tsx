'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Utensils, Newspaper, Camera, Home, LogOut } from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: Home
  },
  {
    name: 'Produk Unggulan',
    href: '/admin/products',
    icon: Package
  },
  {
    name: 'Menu Kuliner',
    href: '/admin/culinary',
    icon: Utensils
  },
  {
    name: 'Berita & Artikel',
    href: '/admin/news',
    icon: Newspaper
  },
  {
    name: 'Galeri',
    href: '/admin/gallery',
    icon: Camera
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Desa</h1>
        <p className="text-sm text-gray-600">Kelola Konten Website</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 border-r-2 border-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t">
        <button className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </div>
  )
}