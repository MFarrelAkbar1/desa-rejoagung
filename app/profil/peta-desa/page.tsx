// app/profil/peta-desa/page.tsx - OPTIMIZED VERSION

'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { MapPin, School, GraduationCap, Users, Building, Map } from 'lucide-react'
import { schools, schoolsStatistics } from '@/data/schools'
import Legend from '@/components/Legend'
import ToggleableLegend from '@/components/ToggleableLegend'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Optimized dynamic imports with better loading states
import dynamic from 'next/dynamic'

// Pre-load components with optimized chunks
const DesaMapContainer = dynamic(() => import('@/components/DesaMapContainer'), {
  ssr: false,
  loading: () => <OptimizedMapLoadingSpinner mapType="desa" />
})

const SekolahMapContainer = dynamic(() => import('@/components/MapContainer'), {
  ssr: false,
  loading: () => <OptimizedMapLoadingSpinner mapType="sekolah" />
})

// Enhanced loading spinner with progress indication
function OptimizedMapLoadingSpinner({ mapType }: { mapType: 'desa' | 'sekolah' }) {
  const [loadingText, setLoadingText] = useState('Mempersiapkan peta...')
  
  useEffect(() => {
    const messages = [
      'Mempersiapkan peta...',
      'Memuat data lokasi...',
      'Menginisialisasi marker...',
      'Hampir selesai...'
    ]
    
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % messages.length
      setLoadingText(messages[index])
    }, 800)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
      <div className="text-center max-w-xs">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {mapType === 'desa' ? (
              <MapPin className="w-6 h-6 text-emerald-600" />
            ) : (
              <School className="w-6 h-6 text-blue-600" />
            )}
          </div>
        </div>
        
        <p className="text-gray-700 font-medium mb-2">
          {mapType === 'desa' ? 'Peta Desa Rejoagung' : 'Peta Sekolah'}
        </p>
        <p className="text-gray-500 text-sm animate-pulse">{loadingText}</p>
        
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-emerald-600 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  )
}

// Memoized legend data to prevent re-creation
const DESA_LEGEND_ITEMS = [
  { color: '#10b981', icon: '🏛️', label: 'Fasilitas Desa' },
  { color: '#3b82f6', icon: '🎓', label: 'Pendidikan' },
  { color: '#8b5cf6', icon: '🏢', label: 'Fasilitas Umum' },
  { color: '#f59e0b', icon: '🕌', label: 'Tempat Ibadah' },
  { color: '#ec4899', icon: '🏥', label: 'Kesehatan' },
  { color: '#65a30d', icon: '🌱', label: 'Pertanian' },
  { color: '#dc2626', icon: '🏪', label: 'Ekonomi' }
]

const DUSUN_AREAS = [
  { color: '#ef4444', name: 'Dusun Krajan' },
  { color: '#22c55e', name: 'Dusun Sumberagung' },
  { color: '#3b82f6', name: 'Dusun Sumbergroto' }
]

// Optimized statistics calculation
const getOptimizedStatistics = () => {
  return {
    totalSekolah: schools.length,
    totalLokasi: 25
  }
}

export default function PetaDesaPage() {
  const [activeMap, setActiveMap] = useState<'desa' | 'sekolah'>('desa')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  
  // Memoize statistics to prevent recalculation
  const statistics = useMemo(() => getOptimizedStatistics(), [])
  
  // Remove artificial delay - let components load naturally
  useEffect(() => {
    // Mark initial load as complete immediately
    setIsInitialLoad(false)
  }, [])

  // Memoize map toggle handler
  const handleMapToggle = useMemo(() => ({
    toDesa: () => setActiveMap('desa'),
    toSekolah: () => setActiveMap('sekolah')
  }), [])

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

        {/* Optimized Map Toggle Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleMapToggle.toDesa}
              className={`
                flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold text-lg
                transition-all duration-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-emerald-500
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
              onClick={handleMapToggle.toSekolah}
              className={`
                flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold text-lg
                transition-all duration-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500
                ${activeMap === 'sekolah'
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <School className="w-6 h-6" />
              <span>Peta Sekolah</span>
            </button>
          </div>
        </div>

        {/* Optimized Map Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            {activeMap === 'desa' ? (
              <Suspense fallback={<OptimizedMapLoadingSpinner mapType="desa" />}>
                <DesaMapContainer height="600px" />
              </Suspense>
            ) : (
              <Suspense fallback={<OptimizedMapLoadingSpinner mapType="sekolah" />}>
                <SekolahMapContainer height="600px" />
              </Suspense>
            )}
            
            {/* Legend Overlay */}
            {activeMap === 'desa' ? (
              <ToggleableLegend 
                items={DESA_LEGEND_ITEMS}
                title="🗺️ Legenda Peta Desa"
                extraInfo={
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">📍 Area Dusun:</h4>
                    <div className="space-y-1">
                      {DUSUN_AREAS.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-sm border border-white shadow-sm"
                            style={{ backgroundColor: area.color }}
                          />
                          <span className="text-xs text-gray-600">{area.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            ) : (
              <Legend />
            )}
          </div>
        </div>

        {/* Statistics Cards - Memoized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-emerald-600">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {activeMap === 'desa' ? statistics.totalLokasi : statistics.totalSekolah}+
            </h3>
            <p className="text-gray-600">
              {activeMap === 'desa' ? 'Lokasi Penting' : 'Sekolah Tersedia'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-600">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">3</h3>
            <p className="text-gray-600">Dusun di Desa</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-purple-600">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">7</h3>
            <p className="text-gray-600">Kategori Fasilitas</p>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Informasi Peta
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {activeMap === 'desa' ? `${statistics.totalLokasi}+ lokasi penting di desa` : `${statistics.totalSekolah} sekolah dari TK sampai SMK`}</li>
                <li>• Data resmi Desa Rejoagung</li>
                <li>• Peta dari OpenStreetMap</li>
                <li>• Terakhir diperbarui: Juli 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}