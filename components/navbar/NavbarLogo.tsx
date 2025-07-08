'use client'

import Link from 'next/link'
import Image from 'next/image'

interface NavbarLogoProps {
  isScrolled: boolean
}

export default function NavbarLogo({ isScrolled }: NavbarLogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
      <div className={`
        rounded-lg flex items-center justify-center shadow-md transition-all duration-300
        ${isScrolled 
          ? 'w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600' 
          : 'w-12 h-12 bg-white'
        }
      `}>
        <Image
          src="/logo-rejoagung.png"
          alt="Logo Desa Rejoagung"
          width={isScrolled ? 24 : 28}
          height={isScrolled ? 24 : 28}
          className="object-contain"
        />
      </div>
      
      <div className="hidden sm:block">
        <h1 className={`font-bold text-lg transition-colors duration-300 ${
          isScrolled ? 'text-gray-800' : 'text-white'
        }`}>
          Desa Rejoagung
        </h1>
      </div>
    </Link>
  )
}