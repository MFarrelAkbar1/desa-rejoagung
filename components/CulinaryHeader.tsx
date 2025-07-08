// components/CulinaryHeader.tsx
import { Utensils, Star, MapPin, Users } from 'lucide-react'

interface CulinaryHeaderProps {
  totalItems: number
  signatureItems: number
  avgRating: number
}

export default function CulinaryHeader({ 
  totalItems, 
  signatureItems, 
  avgRating 
}: CulinaryHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 border-4 border-gray-200">
      <div className="flex items-center mb-8">
        <div className="bg-orange-100 p-4 rounded-2xl mr-6">
          <Utensils className="w-12 h-12 text-orange-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            🍛 Kuliner Lokal Desa Rejoagung
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Cita Rasa Autentik dengan Bahan-Bahan Lokal Berkualitas Tinggi
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-3 border-orange-300 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-orange-600 p-4 rounded-2xl mr-4">
              <Utensils className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-700">{totalItems}</div>
              <div className="text-lg font-semibold text-orange-600">Menu Tersedia</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-3 border-yellow-300 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-yellow-600 p-4 rounded-2xl mr-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-700">{signatureItems}</div>
              <div className="text-lg font-semibold text-yellow-600">Menu Signature</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-green-300 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-green-600 p-4 rounded-2xl mr-4">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-4xl font-bold text-green-700">6+</div>
              <div className="text-lg font-semibold text-green-600">Lokasi Warung</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-3 border-purple-300 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center">
            <div className="bg-purple-600 p-4 rounded-2xl mr-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-700">{avgRating.toFixed(1)}</div>
              <div className="text-lg font-semibold text-purple-600">Rating Rata-rata</div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Notice */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-3 border-orange-200 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <Star className="w-8 h-8 text-orange-600 mr-3" />
          <h3 className="text-2xl font-bold text-orange-800">
            ⭐ Keunggulan Kuliner Desa Rejoagung
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-lg">
          <div className="flex items-center text-orange-700">
            <span className="text-2xl mr-3">🌱</span>
            <span className="font-semibold">Bahan lokal segar setiap hari</span>
          </div>
          <div className="flex items-center text-orange-700">
            <span className="text-2xl mr-3">👩‍🍳</span>
            <span className="font-semibold">Resep turun temurun authentic</span>
          </div>
          <div className="flex items-center text-orange-700">
            <span className="text-2xl mr-3">💰</span>
            <span className="font-semibold">Harga terjangkau untuk semua</span>
          </div>
        </div>
      </div>
    </div>
  )
}