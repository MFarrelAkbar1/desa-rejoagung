'use client'

import { Users, MapPin, Package, Calendar, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleExploreClick = () => {
    router.push('/profil/tentang-desa')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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
              JELAJAHI DESA KAMI
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Selamat datang di Portal Resmi Desa Rejoagung
              </h2>
              <p className="text-xl text-gray-600">
                Temukan informasi terkini, berita, dan layanan desa kami
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Users className="w-12 h-12 text-emerald-600" />
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">10,709</div>
                    <div className="text-emerald-700 font-medium">Total Penduduk</div>
                  </div>
                </div>
              </div>
             
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-12 h-12 text-blue-600" />
                  <div>
                    <div className="text-3xl font-bold text-blue-600">6,7776</div>
                    <div className="text-blue-700 font-medium">Luas Wilayah (km<sup>2</sup>)</div>
                  </div>
                </div>
              </div>
             
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Package className="w-12 h-12 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-orange-600">Kelapa Sawit</div>
                    <div className="text-orange-700 font-medium">Produk Unggulan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-emerald-600" />
                Informasi Terkini
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Panen raya kelapa sawit periode Juni 2025</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Program pelatihan petani modern telah dimulai</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Pembangunan infrastruktur jalan desa selesai</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Peluncuran portal digital desa Rejoagung</p>
                </div>
              </div>
            </div>
           
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Pencapaian 2025
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Peningkatan hasil panen 25% dari tahun sebelumnya</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">15 sekolah tersedia dengan fasilitas lengkap</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">100% akses layanan kesehatan untuk warga</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Digitalisasi layanan administrasi desa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
}