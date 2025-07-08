// app/profil/peta-desa/page.tsx
'use client'

import { MapPin, Download, ZoomIn, Navigation } from 'lucide-react'

export default function PetaDesaPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <MapPin className="w-8 h-8 mr-4 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Peta Desa Rejoagung</h1>
          <p className="text-gray-600">Lokasi dan batas wilayah administratif desa</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gray-100 rounded-xl p-6 mb-8">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-4">
          {/* Placeholder untuk peta - ganti dengan Google Maps atau Leaflet */}
          <div className="w-full h-80 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Peta Desa Rejoagung</h3>
              <p className="text-gray-600">Peta interaktif akan ditampilkan di sini</p>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <ZoomIn className="w-4 h-4 mr-2" />
            Zoom In
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Navigation className="w-4 h-4 mr-2" />
            Lokasi Saya
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Peta
          </button>
        </div>
      </div>

      {/* Informasi Koordinat */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-emerald-800 mb-4">📍 Koordinat Desa</h3>
          <div className="space-y-2 text-emerald-700">
            <div>
              <strong>Latitude:</strong> -8.3833° S
            </div>
            <div>
              <strong>Longitude:</strong> 114.3014° E
            </div>
            <div>
              <strong>Ketinggian:</strong> 45 mdpl
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">🗺️ Batas Wilayah</h3>
          <div className="space-y-2 text-blue-700 text-sm">
            <div><strong>Utara:</strong> Desa Sumberejo</div>
            <div><strong>Selatan:</strong> Desa Karangrejo</div>
            <div><strong>Timur:</strong> Desa Purwoharjo</div>
            <div><strong>Barat:</strong> Desa Kedungrejo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
