'use client'

import { Users, MapPin, Package, Calendar, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Dashboard Desa Rejoagung
            </h1>
            <p className="text-xl text-gray-600">
              Selamat datang di Portal Resmi Desa Rejoagung
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <Users className="w-12 h-12 text-emerald-600" />
                <div>
                  <div className="text-3xl font-bold text-emerald-600">2,547</div>
                  <div className="text-emerald-700 font-medium">Total Penduduk</div>
                </div>
              </div>
            </div>
           
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <MapPin className="w-12 h-12 text-blue-600" />
                <div>
                  <div className="text-3xl font-bold text-blue-600">1,850</div>
                  <div className="text-blue-700 font-medium">Luas Wilayah (Ha)</div>
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
  )
}