'use client'

import Image from 'next/image'
import { Users, Building, UserCheck, Award } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function StrukturOrganisasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
          ]}
        />

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-8">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mr-6">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Bagian Struktur Organisasi dan Tata Kerja
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-emerald-100">
                  Pemerintah Desa Rejoagung
                </h2>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-emerald-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Tentang Struktur Organisasi</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Struktur organisasi Pemerintah Desa Rejoagung dirancang untuk memberikan pelayanan terbaik 
                kepada masyarakat. Struktur ini terdiri dari berbagai divisi yang bekerja secara sinergis 
                dalam menjalankan tugas dan fungsi pemerintahan desa, mulai dari pelayanan administratif, 
                pembangunan infrastruktur, hingga pemberdayaan masyarakat.
              </p>
            </div>

            {/* Organizational Chart Image */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Bagan Organisasi</h4>
                  <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
                </div>
                
                <div className="relative w-full h-auto bg-white rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm">
                  <Image
                    src="/struktur-organisasi.png"
                    alt="Bagan Struktur Organisasi Pemerintah Desa Rejoagung"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <UserCheck className="w-6 h-6 text-emerald-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-800">Kepemimpinan</h4>
                </div>
                <p className="text-gray-600">
                  Dipimpin oleh Kepala Desa yang dibantu oleh Sekretaris Desa dan berbagai 
                  kepala seksi sesuai bidang tugasnya.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Award className="w-6 h-6 text-blue-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-800">Koordinasi</h4>
                </div>
                <p className="text-gray-600">
                  Setiap divisi memiliki tugas dan tanggung jawab yang jelas untuk 
                  memastikan pelayanan publik yang optimal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}