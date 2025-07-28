// app/produk-kuliner/kuliner/components/KulinerInfo.tsx
'use client'

import { Utensils, Leaf, Heart, Clock, Users, Star } from 'lucide-react'

export default function KulinerInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Utensils className="w-8 h-8" />
          Informasi Kuliner Lokal
        </h2>
        <p className="text-emerald-100 leading-relaxed">
          Kuliner khas Desa Rejoagung yang menggunakan bahan-bahan segar dari kebun sendiri 
          dengan cita rasa autentik dan resep turun temurun.
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Keunggulan */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              Keunggulan Kuliner Kami
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg mt-1">
                  <Leaf className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Bahan Segar Lokal</h4>
                  <p className="text-gray-600 text-sm">Menggunakan bahan-bahan segar langsung dari kebun petani lokal</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg mt-1">
                  <Heart className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Resep Tradisional</h4>
                  <p className="text-gray-600 text-sm">Resep turun temurun yang telah diwariskan secara generasi</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg mt-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Harga Terjangkau</h4>
                  <p className="text-gray-600 text-sm">Harga yang ramah di kantong untuk semua kalangan masyarakat</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg mt-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Selalu Fresh</h4>
                  <p className="text-gray-600 text-sm">Dimasak fresh setiap hari dengan standar higienis yang terjaga</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-lg">
              <Utensils className="w-5 h-5 text-emerald-500" />
              Tips Menikmati Kuliner
            </h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-medium text-emerald-800 mb-2">🕒 Waktu Terbaik</h4>
                <p className="text-emerald-700 text-sm">
                  Datang pada jam makan (11:00-14:00 & 18:00-21:00) untuk mendapatkan cita rasa terbaik
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">👑 Menu Signature</h4>
                <p className="text-yellow-700 text-sm">
                  Jangan lewatkan menu signature kami untuk pengalaman kuliner yang autentik
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📞 Reservasi Grup</h4>
                <p className="text-blue-700 text-sm">
                  Hubungi warung terlebih dahulu untuk reservasi rombongan atau acara khusus
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">📸 Dokumentasi</h4>
                <p className="text-purple-700 text-sm">
                  Jangan lupa foto untuk kenang-kenangan dan share pengalaman kuliner Anda!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">Siap Mencicipi Kuliner Khas Kami?</h4>
            <p className="text-emerald-100 mb-4">
              Hubungi langsung warung pilihan Anda atau datang langsung untuk menikmati kelezatan kuliner Desa Rejoagung
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                📍 Tersedia di berbagai lokasi desa
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                🕒 Buka setiap hari
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}