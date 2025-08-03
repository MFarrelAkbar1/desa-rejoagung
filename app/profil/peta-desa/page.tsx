// app/profil/peta-desa/page.tsx - FIXED: Tetap ada toggle, perbaikan hanya di peta sekolah

'use client'

import { useState, useEffect } from 'react'
import { MapPin, School, GraduationCap, Users, Building, Map } from 'lucide-react'
import ToggleableLegend from '@/components/ToggleableLegend'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Dynamic imports untuk menghindari SSR issues
import dynamic from 'next/dynamic'

// Peta Desa tetap menggunakan komponen yang sudah ada (AMAN)
const DesaMapContainer = dynamic(() => import('@/components/DesaMapContainer'), {
  ssr: false,
  loading: () => <MapLoadingSpinner />
})

// Peta Sekolah menggunakan komponen yang sudah diperbaiki
const SekolahMapContainer = dynamic(() => import('@/components/MapContainer'), {
  ssr: false,
  loading: () => <MapLoadingSpinner />
})

function MapLoadingSpinner() {
  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat peta...</p>
      </div>
    </div>
  )
}

// Legend data untuk Peta Desa (TETAP SAMA)
const desaLegendItems = [
  { color: '#10b981', icon: '🏛️', label: 'Fasilitas Desa' },
  { color: '#3b82f6', icon: '🎓', label: 'Pendidikan' },
  { color: '#8b5cf6', icon: '🏢', label: 'Fasilitas Umum' },
  { color: '#f59e0b', icon: '🕌', label: 'Tempat Ibadah' },
  { color: '#ec4899', icon: '🏥', label: 'Kesehatan' },
  { color: '#65a30d', icon: '🌱', label: 'Pertanian' },
  { color: '#dc2626', icon: '🏪', label: 'Ekonomi' }
]

const dusunAreas = [
  { color: '#ef4444', name: 'Dusun Krajan' },
  { color: '#22c55e', name: 'Dusun Sumberagung' },
  { color: '#3b82f6', name: 'Dusun Sumbergroto' }
]

// Statistik sekolah yang disederhanakan
const schoolStats = {
  total: 9,
  byType: { TK: 3, SD: 3, SMP: 1, SMK: 1, SLB: 1 },
  totalStudents: 1450,
  totalTeachers: 87
}

export default function PetaDesaPage() {
  const [activeMap, setActiveMap] = useState<'desa' | 'sekolah'>('desa')
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Peta Desa', href: '/profil/peta-desa' },
          ]}
        />
        
        {/* Header */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Map className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Peta Desa Rejoagung
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi wilayah dan fasilitas pendidikan di Desa Rejoagung melalui peta interaktif
          </p>
        </div>

        {/* Map Toggle Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveMap('desa')}
              className={`
                flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold text-lg
                transition-all duration-300 min-w-[200px]
                ${activeMap === 'desa'
                  ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <MapPin className="w-6 h-6" />
              <span>Peta Desa</span>
            </button>
           
            <button
              onClick={() => setActiveMap('sekolah')}
              className={`
                flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold text-lg
                transition-all duration-300 min-w-[200px]
                ${activeMap === 'sekolah'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <GraduationCap className="w-6 h-6" />
              <span>Peta Sekolah</span>
            </button>
          </div>
        </div>

        {/* School Statistics - Simple version, hanya tampil saat tab sekolah aktif */}
        {activeMap === 'sekolah' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <School className="w-6 h-6 mr-3 text-green-600" />
              Statistik Sekolah
            </h2>
           
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{schoolStats.byType.TK}</div>
                <div className="text-red-700 text-sm">TK/PAUD</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{schoolStats.byType.SD}</div>
                <div className="text-blue-700 text-sm">SD</div>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{schoolStats.byType.SMP}</div>
                <div className="text-green-700 text-sm">SMP</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{schoolStats.byType.SMK}</div>
                <div className="text-orange-700 text-sm">SMK</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{schoolStats.byType.SLB}</div>
                <div className="text-purple-700 text-sm">SLB</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolStats.totalStudents.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Total Siswa</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolStats.totalTeachers}</div>
                <div className="text-gray-600 text-sm">Total Guru</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolStats.total}</div>
                <div className="text-gray-600 text-sm">Total Sekolah</div>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {activeMap === 'desa' ? (
                <>
                  <MapPin className="w-6 h-6 mr-3 text-emerald-600" />
                  Peta Wilayah Desa Rejoagung
                </>
              ) : (
                <>
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                  Peta Lokasi Sekolah
                </>
              )}
            </h2>
          </div>
         
          {/* Map Container */}
          <div className="relative">
            {activeMap === 'desa' ? (
              <>
                {/* PETA DESA - TETAP MENGGUNAKAN KOMPONEN LAMA */}
                <DesaMapContainer height="600px" />
                <ToggleableLegend
                  title="Legenda Peta Desa"
                  items={desaLegendItems}
                  extraInfo="Klik marker untuk melihat detail lokasi"
                  dusunAreas={dusunAreas}
                />
              </>
            ) : (
              <>
                {/* PETA SEKOLAH - MENGGUNAKAN KOMPONEN YANG SUDAH DIPERBAIKI */}
                <SekolahMapContainer height="600px" />
              </>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Informasi Peta</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Cara Menggunakan:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Gunakan tombol toggle untuk beralih antar peta</li>
                <li>• Klik marker untuk melihat detail lokasi</li>
                <li>• Gunakan scroll mouse untuk zoom in/out</li>
                <li>• Drag untuk menggeser peta</li>
                {activeMap === 'desa' && <li>• Klik tombol ☰ di kanan atas untuk melihat legenda</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Informasi:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• {activeMap === 'desa' ? 'Peta desa menampilkan wilayah dan fasilitas' : 'Peta sekolah menampilkan 9 lokasi pendidikan'}</li>
                <li>• Data diperbarui secara berkala</li>
                <li>• Koordinat menggunakan sistem GPS</li>
                <li>• Peta dapat di-zoom hingga level detail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}