'use client'

import { Target, Eye, CheckCircle, Star } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Tambahkan di sini */}
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Visi Misi', href: '/profil/visi-misi' },
          ]}
        />

        <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 mr-4 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Visi dan Misi</h1>
              <p className="text-gray-600">Arah dan tujuan pembangunan Desa Rejoagung</p>
            </div>
          </div>

          {/* Visi Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Eye className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-6">🎯 VISI DESA REJOAGUNG</h2>
              <blockquote className="text-xl italic text-emerald-700 leading-relaxed max-w-4xl mx-auto">
                "Menjadi desa mandiri, sejahtera, dan berkelanjutan berbasis agrobisnis kelapa sawit 
                dengan tetap menjaga kelestarian lingkungan dan nilai-nilai gotong royong"
              </blockquote>
            </div>
          </div>

          {/* Misi Section */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800">🚀 MISI DESA REJOAGUNG</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Pengembangan Agrobisnis</h3>
                    <p className="text-blue-700 text-sm">
                      Meningkatkan produktivitas dan kualitas kelapa sawit melalui teknologi modern 
                      dan praktik pertanian berkelanjutan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">Pemberdayaan Ekonomi</h3>
                    <p className="text-green-700 text-sm">
                      Mengembangkan industri pengolahan hasil pertanian dan UMKM 
                      untuk meningkatkan kesejahteraan masyarakat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-800 mb-2">Peningkatan SDM</h3>
                    <p className="text-purple-700 text-sm">
                      Meningkatkan kualitas sumber daya manusia melalui pendidikan, 
                      pelatihan, dan pembinaan berkelanjutan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <CheckCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">Kelestarian Lingkungan</h3>
                    <p className="text-orange-700 text-sm">
                      Menjaga kelestarian lingkungan dan biodiversitas melalui 
                      praktik ramah lingkungan dan konservasi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <CheckCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Infrastruktur & Pelayanan</h3>
                    <p className="text-red-700 text-sm">
                      Meningkatkan infrastruktur desa dan kualitas pelayanan publik 
                      yang prima bagi seluruh masyarakat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <CheckCircle className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-indigo-800 mb-2">Gotong Royong</h3>
                    <p className="text-indigo-700 text-sm">
                      Melestarikan nilai-nilai gotong royong dan kearifan lokal 
                      dalam setiap aspek pembangunan desa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tujuan Strategis */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-yellow-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-800">🎯 Tujuan Strategis 2025</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-2">25%</div>
                <p className="text-gray-600">Peningkatan Hasil Panen</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-gray-600">Akses Layanan Digital</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">50</div>
                <p className="text-gray-600">UMKM Baru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}