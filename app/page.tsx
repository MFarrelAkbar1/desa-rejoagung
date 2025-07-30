'use client'

import { Users, MapPin, Package, Calendar, TrendingUp, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import NewsSection from '@/components/News/NewsSection'

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push('/profil/tentang-desa')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Dipertahankan dari kode asli */}
      <div
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/foto-beranda.jpg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow-lg">
              Desa Rejoagung
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-medium mb-8 text-gray-100">
              Kecamatan Srono, Kabupaten Banyuwangi, Jawa Timur
            </p>
            
            {/* CTA Button */}
            <button
              onClick={handleExploreClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Jelajahi Desa
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section - Data asli yang dipertahankan */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Jumlah Penduduk */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">2,847</div>
              <p className="text-gray-600 font-medium">Jiwa</p>
              <p className="text-sm text-gray-500">Total Penduduk</p>
            </div>

            {/* Luas Wilayah */}
            <div className="text-center">
              <div className="bg-green-100 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">485</div>
              <p className="text-gray-600 font-medium">Hektar</p>
              <p className="text-sm text-gray-500">Luas Wilayah</p>
            </div>

            {/* Produk UMKM */}
            <div className="text-center">
              <div className="bg-yellow-100 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">127</div>
              <p className="text-gray-600 font-medium">Produk</p>
              <p className="text-sm text-gray-500">UMKM Unggulan</p>
            </div>

            {/* Program Aktif */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">15</div>
              <p className="text-gray-600 font-medium">Program</p>
              <p className="text-sm text-gray-500">Sedang Berjalan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Berita - Komponen baru */}
      <NewsSection />
    </div>
  )
}