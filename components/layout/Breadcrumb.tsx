'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

// Mendefinisikan tipe untuk setiap item breadcrumb
interface BreadcrumbItem {
  label: string;
  href: string;
}

// Mendefinisikan tipe untuk props komponen Breadcrumb
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* Item pertama selalu link ke Beranda */}
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-emerald-600">
            <Home className="w-4 h-4 me-2.5" />
            Beranda
          </Link>
        </li>
        
        {/* Membuat daftar item breadcrumb secara dinamis */}
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
              <Link
                href={item.href}
                className={`text-sm font-medium ${
                  // Memberi gaya berbeda untuk item terakhir (halaman aktif)
                  index === items.length - 1
                    ? 'text-gray-500'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
