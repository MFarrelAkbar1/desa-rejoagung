// app/profil/peta-desa/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { MapPin, Download, ZoomIn, Navigation, Info } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import untuk MapContainer desa
const DesaMapContainer = dynamic(() => import('@/components/DesaMapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat peta desa...</p>
      </div>
    </div>
  )
})

export default function PetaDesaPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapControls, setMapControls] = useState<any>(null)

  const handleMapReady = (controls: any) => {
    setMapControls(controls)
    setIsMapLoaded(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapControls) {
        setIsMapLoaded(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [mapControls])

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
        <div className="relative mb-4">
          <DesaMapContainer height="600px" onMapReady={handleMapReady} />
        </div>

        {/* Map Controls */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => mapControls?.zoomIn()}
            disabled={!mapControls}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <ZoomIn className="w-4 h-4 mr-2" />
            Zoom In
          </button>
          <button 
            onClick={() => mapControls?.locateUser()}
            disabled={!mapControls}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Lokasi Saya
          </button>
          <button 
            onClick={() => mapControls?.centerMap()}
            disabled={!mapControls}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Pusat Desa
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Peta
          </button>
        </div>
      </div>

      {/* Informasi Koordinat */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
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
              <strong>Ketinggian:</strong> 210 meter
            </div>
            <div>
              <strong>Luas Wilayah:</strong> 668,883 Ha
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">🗺️ Batas Wilayah</h3>
          <div className="space-y-2 text-blue-700 text-sm">
            <div><strong>Utara:</strong> Bomo</div>
            <div><strong>Selatan:</strong> Bagorejo</div>
            <div><strong>Timur:</strong> Batas Kecamatan</div>
            <div><strong>Barat:</strong> Wonosobo</div>
          </div>
        </div>
      </div>

      {/* Informasi Dusun */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Info className="w-6 h-6 mr-3 text-emerald-600" />
          Pembagian Dusun dan RT/RW
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border-l-4 border-red-500 pl-4">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <h3 className="font-bold text-gray-800">Dusun Krajan</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">Bagian Utara-Tengah</p>
            <p className="text-gray-700 text-sm">Pusat pemerintahan dan fasilitas umum</p>
            <div className="mt-2 text-xs text-gray-500">
              RT/RW: 1/1, 2/2, 3/3, 4/4, 5/5, 6/4, dst.
            </div>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <h3 className="font-bold text-gray-800">Dusun Sumberagung</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">Bagian Timur</p>
            <p className="text-gray-700 text-sm">Area perkebunan kelapa sawit utama</p>
            <div className="mt-2 text-xs text-gray-500">
              RT/RW: 1/3, 2/3, 3/3, 4/3, 5/3, dst.
            </div>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <h3 className="font-bold text-gray-800">Dusun Sumbergroto</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">Bagian Selatan</p>
            <p className="text-gray-700 text-sm">Kawasan pemukiman dan UMKM</p>
            <div className="mt-2 text-xs text-gray-500">
              RT/RW: 1/1, 2/1, 3/1, 1/2, 2/2, dst.
            </div>
          </div>
        </div>
        
        {/* Fasilitas berdasarkan peta */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🏛️ Fasilitas Umum</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Psr Sabtu</li>
              <li>• Psr tradisional Laisin</li>
              <li>• Rejoagung Sport center</li>
              <li>• Climb hill Rejoagung</li>
              <li>• Boklawan</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🎓 Pendidikan</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• TK</li>
              <li>• MI (Madrasah Ibtidaiyah)</li>
              <li>• SMP</li>
              <li>• SMK</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🏢 Fasilitas Desa</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Balai Desa</li>
              <li>• Poskesdes</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">📍 Lain-lain</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Lapangan</li>
              <li>• Masjid</li>
              <li>• Pos Ronda</li>
              <li>• RT/RW</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-emerald-800 mb-3">ℹ️ Informasi Peta</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
          <div>
            <h4 className="font-medium mb-2">Cara Menggunakan:</h4>
            <ul className="space-y-1 text-emerald-600">
              <li>• Klik marker untuk melihat detail lokasi</li>
              <li>• Gunakan scroll mouse untuk zoom in/out</li>
              <li>• Drag untuk menggeser peta</li>
              <li>• Lihat informasi dusun di bawah peta</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Sumber Data:</h4>
            <ul className="space-y-1 text-emerald-600">
              <li>• Data geografis Desa Rejoagung</li>
              <li>• Peta dari OpenStreetMap</li>
              <li>• Terakhir diperbarui: Desember 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}