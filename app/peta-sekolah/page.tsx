// app/peta-sekolah/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { GraduationCap, MapPin, School, Users } from 'lucide-react'
import Legend from '@/components/Legend'
import { schools } from '@/data/schools'

// Dynamic import for MapContainer to avoid SSR issues with Leaflet
import dynamic from 'next/dynamic'

const MapContainer = dynamic(() => import('@/components/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat peta sekolah...</p>
      </div>
    </div>
  )
})

export default function PetaSekolahPage() {
  const { isOpen } = useSidebar()
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Statistics
  const totalSekolah = schools.length
  const jumlahSD = schools.filter(s => s.type === 'SD').length
  const jumlahSMP = schools.filter(s => s.type === 'SMP').length
  const jumlahSMK = schools.filter(s => s.type === 'SMK').length

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-16'} min-h-screen p-8 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-8 h-8 mr-4 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Peta Sekolah Desa Rejoagung</h1>
              <p className="text-gray-600">Lokasi dan informasi sekolah-sekolah di Desa Rejoagung</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center">
                <School className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalSekolah}</div>
                  <div className="text-blue-700 text-sm">Total Sekolah</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{jumlahSD}</div>
                  <div className="text-green-700 text-sm">Sekolah Dasar</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{jumlahSMP}</div>
                  <div className="text-purple-700 text-sm">SMP</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{jumlahSMK}</div>
                  <div className="text-orange-700 text-sm">SMK</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              Peta Lokasi Sekolah
            </h2>
          </div>

          {/* Map Container with Legend */}
          <div className="relative">
            <MapContainer height="600px" />
            <Legend />
          </div>
        </div>

        {/* School List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <School className="w-6 h-6 mr-3 text-green-600" />
            Daftar Sekolah
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {schools.map((school) => (
              <div key={school.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{school.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    school.type === 'SD' ? 'bg-blue-100 text-blue-800' :
                    school.type === 'SMP' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {school.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{school.description}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{school.address}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  {school.coordinates[0].toFixed(6)}, {school.coordinates[1].toFixed(6)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Informasi Peta</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Cara Menggunakan:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Klik marker untuk melihat detail sekolah</li>
                <li>• Gunakan scroll mouse untuk zoom in/out</li>
                <li>• Drag untuk menggeser peta</li>
                <li>• Lihat legenda untuk memahami jenis sekolah</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Sumber Data:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Data lokasi sekolah Desa Rejoagung</li>
                <li>• Peta dari OpenStreetMap</li>
                <li>• Terakhir diperbarui: Juni 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}