// components/Footer.tsx
'use client'

import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Clock, 
  Users, 
  TreePine,
  Package,
  ExternalLink,
  Heart,
  Home
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Desa', href: '/profil/tentang-desa' },
    { name: 'Berita & Artikel', href: '/berita' },
    { name: 'Produk Unggulan', href: '/produk-kuliner/produk' },
    { name: 'Layanan', href: '/informasi/data-desa' },
    { name: 'Galeri Foto', href: '/galeri/foto' }
  ]

  const layananDesa = [
    { name: 'Data Penduduk', href: '/informasi/data-desa' },
    { name: 'Layanan', href: '/informasi/layanan' },
    { name: 'Peta Sekolah', href: '/peta-sekolah' },
    { name: 'Visi & Misi', href: '/profil/visi-misi' },
    { name: 'Peta Desa', href: '/profil/peta-desa' },
    { name: 'Wisata', href: '/wisata' }
  ]

  const produkUnggulan = [
    { name: 'Gula Merah (Gula Kelapa)', icon: '🍯' },
    { name: 'Sale Pisang UD. Sejati', icon: '🍌' },
    { name: 'Kelapa Sawit Premium', icon: '🌴' },
    { name: 'Kuliner Lokal', icon: '🍛' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informasi Desa */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Desa Rejoagung</h3>
                  <p className="text-emerald-200 text-sm">Portal Resmi</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Desa Rejoagung, pusat agrobisnis kelapa sawit yang mandiri, sejahtera, 
                dan berkelanjutan dengan tetap menjaga kelestarian lingkungan.
              </p>
            </div>

            {/* Statistik Singkat */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-lg font-bold text-white">2,547</div>
                    <div className="text-xs text-gray-300">Penduduk</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <TreePine className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-lg font-bold text-white">6,777.6</div>
                    <div className="text-xs text-gray-300">km²</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-emerald-400" />
              Menu Utama
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan Desa */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-emerald-400" />
              Layanan & Info
            </h4>
            <ul className="space-y-2">
              {layananDesa.map((layanan, index) => (
                <li key={index}>
                  <Link 
                    href={layanan.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    {layanan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak & Produk */}
          <div className="space-y-6">
            {/* Kontak Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-emerald-400" />
                Kontak Kami
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-white">Alamat:</div>
                    Jl. Raya Rejoagung No. 1<br />
                    Kec. Srono, Kab. Banyuwangi<br />
                    Jawa Timur 68471
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-white">Email:</div>
                    info@rejoagung-desa.id
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-white">Jam Pelayanan:</div>
                    Senin - Jumat: 08:00 - 16:00
                  </div>
                </div>
              </div>
            </div>

            {/* Produk Unggulan */}
            <div>
              <h5 className="text-base font-semibold text-white mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-emerald-400" />
                Produk Unggulan
              </h5>
              <div className="space-y-2">
                {produkUnggulan.map((produk, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-base">{produk.icon}</span>
                    <span>{produk.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Ikuti Kami:</span>
              <a
                href="https://www.facebook.com/rejo.agung.374"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-200 group"
              >
                <Facebook className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </a>
              <div className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg transition-colors duration-200 group cursor-pointer">
                <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 group cursor-pointer">
                <Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} Desa Rejoagung. Semua hak dilindungi.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Website resmi Pemerintah Desa Rejoagung
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600"></div>
    </footer>
  )
}