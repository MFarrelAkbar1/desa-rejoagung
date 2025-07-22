// app/profil/peta-desa/page.tsx - Final Version with Toggleable Legend
'use client'

import { useState, useEffect } from 'react'
import { MapPin, School, GraduationCap, Users, Building, Map } from 'lucide-react'
import { schools, schoolsStatistics } from '@/data/schools'
import Legend from '@/components/Legend'
import ToggleableLegend from '@/components/ToggleableLegend'

// Dynamic imports for maps to avoid SSR issues
import dynamic from 'next/dynamic'

const DesaMapContainer = dynamic(() => import('@/components/DesaMapContainer'), {
  ssr: false,
  loading: () => <MapLoadingSpinner />
})

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

// Legend data for Desa Map
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
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Desa Information - Only show when desa map is active */}
        {activeMap === 'desa' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Building className="w-6 h-6 mr-3 text-emerald-600" />
              Informasi Umum Desa Rejoagung
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <Users className="w-8 h-8 text-emerald-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">8.574</div>
                    <div className="text-emerald-700 text-sm">Jiwa</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <Building className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">2.886</div>
                    <div className="text-blue-700 text-sm">KK</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">668</div>
                    <div className="text-green-700 text-sm">Hektare</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <School className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-purple-700 text-sm">Dusun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* School Statistics - Only show when sekolah map is active */}
        {activeMap === 'sekolah' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <School className="w-6 h-6 mr-3 text-blue-600" />
              Statistik Pendidikan di Desa Rejoagung
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <School className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-red-600">{schoolsStatistics.byType.TK}</div>
                    <div className="text-red-700 text-sm">TK/PAUD</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{schoolsStatistics.byType.SD}</div>
                    <div className="text-blue-700 text-sm">SD</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <Building className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">{schoolsStatistics.byType.SMP}</div>
                    <div className="text-green-700 text-sm">SMP</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{schoolsStatistics.byType.SMK}</div>
                    <div className="text-orange-700 text-sm">SMK</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{schoolsStatistics.byType.SLB}</div>
                    <div className="text-purple-700 text-sm">SLB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional School Statistics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolsStatistics.totalStudents.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Total Siswa</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolsStatistics.totalTeachers}</div>
                <div className="text-gray-600 text-sm">Total Guru</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">{schoolsStatistics.averageRating.toFixed(1)}</div>
                <div className="text-gray-600 text-sm">Rating Rata-rata</div>
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
          
          {/* Map Container with Legend */}
          <div className="relative">
            {activeMap === 'desa' ? (
              <>
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
                <SekolahMapContainer height="600px" />
                <Legend />
              </>
            )}
          </div>
        </div>

        {/* School List - Only show when sekolah map is active */}
        {activeMap === 'sekolah' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <School className="w-6 h-6 mr-3 text-green-600" />
              Daftar Lengkap Sekolah
            </h2>
            
            {/* Group schools by type */}
            {['TK', 'SD', 'SMP', 'SMK', 'SLB'].map(type => {
              const schoolsByType = schools.filter(s => s.type === type)
              if (schoolsByType.length === 0) return null
              
              return (
                <div key={type} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
                    {type === 'TK' ? 'Taman Kanak-kanak & PAUD' : 
                     type === 'SD' ? 'Sekolah Dasar' :
                     type === 'SMP' ? 'Sekolah Menengah Pertama' :
                     type === 'SMK' ? 'Sekolah Menengah Kejuruan' :
                     'Sekolah Luar Biasa'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {schoolsByType.map((school) => (
                      <div key={school.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">{school.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            school.type === 'TK' ? 'bg-red-100 text-red-800' :
                            school.type === 'SD' ? 'bg-blue-100 text-blue-800' :
                            school.type === 'SMP' ? 'bg-green-100 text-green-800' :
                            school.type === 'SMK' ? 'bg-orange-100 text-orange-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {school.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{school.description}</p>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{school.address}</p>
                        
                        {/* School Details */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                          {school.students && (
                            <div>👥 {school.students} siswa</div>
                          )}
                          {school.teachers && (
                            <div>👨‍🏫 {school.teachers} guru</div>
                          )}
                          {school.rating && (
                            <div>⭐ {school.rating}/5.0</div>
                          )}
                          {school.accreditation && (
                            <div>🏆 Akreditasi {school.accreditation}</div>
                          )}
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-400">
                          <MapPin className="w-3 h-3 mr-1" />
                          {school.coordinates[0].toFixed(6)}, {school.coordinates[1].toFixed(6)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

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
                <li>• Klik tombol ☰ di kanan atas untuk melihat legenda</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Informasi:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• {activeMap === 'desa' ? '25+ lokasi penting di desa' : `${schools.length} sekolah dari TK sampai SMK`}</li>
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