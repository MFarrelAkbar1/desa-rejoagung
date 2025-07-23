'use client'

import { useState } from 'react'
import { Heart, Calendar, MapPin, Phone, User, Clock, Stethoscope, Pill } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

interface LayananKesehatan {
  id: number
  nama: string
  jenis: 'Posyandu' | 'Puskesmas' | 'Dokter Praktik' | 'Bidan'
  alamat: string
  jadwal: string
  kontak: string
  fasilitas: string[]
  status: 'Buka' | 'Tutup' | 'Libur'
}

const layananKesehatan: LayananKesehatan[] = [
  {
    id: 1,
    nama: 'Posyandu Melati',
    jenis: 'Posyandu',
    alamat: 'Dusun Krajan RT 01 RW 01',
    jadwal: 'Setiap Rabu, 08:00-12:00',
    kontak: '+62 812-3456-7890',
    fasilitas: ['Imunisasi', 'Penimbangan Bayi', 'Konsultasi Gizi', 'Vitamin A'],
    status: 'Buka'
  },
  {
    id: 2,
    nama: 'Puskesmas Srono',
    jenis: 'Puskesmas',
    alamat: 'Jl. Raya Srono No. 15',
    jadwal: 'Senin-Sabtu, 07:00-14:00',
    kontak: '+62 333-123-456',
    fasilitas: ['Pemeriksaan Umum', 'Laboratorium', 'Gigi', 'KIA', 'Farmasi'],
    status: 'Buka'
  },
  {
    id: 3,
    nama: 'Bidan Siti Khadijah',
    jenis: 'Bidan',
    alamat: 'Dusun Sumberagung RT 02 RW 02',
    jadwal: '24 Jam (On Call)',
    kontak: '+62 813-4567-8901',
    fasilitas: ['Persalinan', 'ANC', 'KB', 'Imunisasi'],
    status: 'Buka'
  }
]

export default function LayananKesehatanPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const filteredLayanan = selectedFilter === 'all' 
    ? layananKesehatan 
    : layananKesehatan.filter(item => item.jenis === selectedFilter)

  const stats = {
    total: layananKesehatan.length,
    posyandu: layananKesehatan.filter(l => l.jenis === 'Posyandu').length,
    puskesmas: layananKesehatan.filter(l => l.jenis === 'Puskesmas').length,
    bidan: layananKesehatan.filter(l => l.jenis === 'Bidan').length
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb - Tambahkan di sini */}
        <Breadcrumb
          items={[
            { label: 'Informasi', href: '/informasi' },
            { label: 'Layanan', href: '/informasi/layanan' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 mr-4 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Layanan Kesehatan</h1>
              <p className="text-gray-600">Informasi Fasilitas Kesehatan di Desa Rejoagung</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{stats.total}</div>
                  <div className="text-red-700 text-sm">Total Layanan</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.posyandu}</div>
                  <div className="text-blue-700 text-sm">Posyandu</div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Pill className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.puskesmas}</div>
                  <div className="text-green-700 text-sm">Puskesmas</div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="flex items-center">
                <User className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.bidan}</div>
                  <div className="text-purple-700 text-sm">Bidan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Jenis Layanan</h3>
          <div className="flex flex-wrap gap-3">
            {['all', 'Posyandu', 'Puskesmas', 'Bidan', 'Dokter Praktik'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === filter
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'Semua Layanan' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Layanan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLayanan.map((layanan) => (
            <div key={layanan.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`p-4 ${
                layanan.jenis === 'Posyandu' ? 'bg-blue-500' :
                layanan.jenis === 'Puskesmas' ? 'bg-green-500' :
                layanan.jenis === 'Bidan' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{layanan.nama}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    layanan.status === 'Buka' ? 'bg-green-100 text-green-800' :
                    layanan.status === 'Tutup' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {layanan.status}
                  </span>
                </div>
                <p className="text-white/90 mt-1">{layanan.jenis}</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Alamat</p>
                      <p className="text-sm text-gray-600">{layanan.alamat}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Jadwal</p>
                      <p className="text-sm text-gray-600">{layanan.jadwal}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Kontak</p>
                      <p className="text-sm text-gray-600">{layanan.kontak}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-2">Fasilitas</p>
                    <div className="flex flex-wrap gap-2">
                      {layanan.fasilitas.map((fasilitas, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                        >
                          {fasilitas}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Hubungi
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Kontak Darurat
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-red-700">
            <div>
              <h4 className="font-medium mb-2">🚑 Ambulans Desa</h4>
              <p className="text-sm">+62 812-3456-7890</p>
              <p className="text-xs text-red-600">24 Jam Siaga</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🏥 Puskesmas Srono</h4>
              <p className="text-sm">+62 333-123-456</p>
              <p className="text-xs text-red-600">Senin-Sabtu 07:00-14:00</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🩺 Bidan Desa</h4>
              <p className="text-sm">+62 813-4567-8901</p>
              <p className="text-xs text-red-600">On Call 24 Jam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}