// app/produk-kuliner/produk/components/ProductInfo.tsx
'use client'

import { Star, Award, Leaf, Users, Clock, ShoppingBag } from 'lucide-react'

export default function ProductInfo() {
  return (
    <div className="bg-white rounded-xl shadow-lg mt-8 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border-b border-emerald-100">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-emerald-100 p-3 rounded-full">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Tentang Produk Unggulan Desa Rejoagung
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Produk unggulan kami dibuat dengan dedikasi tinggi menggunakan bahan lokal berkualitas
            dan keahlian tradisional yang telah diwariskan turun temurun.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Keunggulan */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              Keunggulan Produk Kami
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg mt-1">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Bahan Lokal Berkualitas</h4>
                  <p className="text-gray-600 text-sm">Menggunakan bahan baku terbaik langsung dari desa dan sekitarnya</p>
                </div>
              </div>
             
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <Award className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Keahlian Tradisional</h4>
                  <p className="text-gray-600 text-sm">Diproduksi dengan teknik dan keahlian turun temurun</p>
                </div>
              </div>
             
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Harga Terjangkau</h4>
                  <p className="text-gray-600 text-sm">Kualitas premium dengan harga yang ramah di kantong</p>
                </div>
              </div>
             
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg mt-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Produksi Fresh</h4>
                  <p className="text-gray-600 text-sm">Diproduksi fresh dengan standar kualitas terjaga</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
              <ShoppingBag className="w-5 h-5 text-emerald-500" />
              Tips Berbelanja Produk
            </h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-medium text-emerald-800 mb-2">💬 Hubungi Langsung</h4>
                <p className="text-emerald-700 text-sm">
                  Hubungi nomor kontak yang tertera untuk menanyakan ketersediaan dan melakukan pemesanan
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📍 Kunjungi Lokasi</h4>
                <p className="text-blue-700 text-sm">
                  Datang langsung ke lokasi produksi untuk melihat proses pembuatan dan memilih produk
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">⭐ Cek Produk Unggulan</h4>
                <p className="text-yellow-700 text-sm">
                  Produk dengan label "UNGGULAN" adalah produk terbaik yang direkomendasikan
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">🎯 Pesan Sesuai Kebutuhan</h4>
                <p className="text-purple-700 text-sm">
                  Beberapa produk dapat dibuat custom sesuai permintaan dengan pemesanan khusus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">Tertarik dengan Produk Unggulan Kami?</h4>
            <p className="text-emerald-100 mb-4">
              Hubungi langsung produsen atau datang langsung ke lokasi untuk mendapatkan produk berkualitas dari Desa Rejoagung
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                📦 Produk Berkualitas
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                🏆 Harga Terjangkau
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                🚀 Siap Kirim
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}