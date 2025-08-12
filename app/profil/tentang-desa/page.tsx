'use client'

import { FileText, Calendar, Users, MapPin } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function TentangDesaPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Tentang Desa', href: '/profil/tentang-desa' },
          ]}
        />

        <div className="bg-white rounded-xl shadow-lg p-8 mt-6">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 mr-4 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Tentang Desa Rejoagung</h1>
              <p className="text-gray-600">Profil dan informasi umum Desa Rejoagung</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sejarah Desa</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Desa Rejoagung adalah salah satu dari 10 desa yang terletak di wilayah Kecamatan Srono, Kabupaten Banyuwangi, Provinsi Jawa Timur. Dengan luas wilayah mencapai 6,7776 km², Desa Rejoagung memiliki struktur wilayah yang terdiri dari empat dusun, yaitu Dusun Sumberagung, Sumberagung Kidul, Sumbergroto, dan Sumbergroto Kidul. Keempat dusun ini terbagi ke dalam 9 Rukun Warga (RW) dan 50 Rukun Tetangga (RT), menjadikan desa ini sebagai salah satu wilayah dengan tata kelola sosial yang cukup aktif dan dinamis.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Secara historis, Desa Rejoagung merupakan hasil pemekaran dari Dusun Bagorejo dan Dusun Sumberagung, yang dulunya merupakan bagian dari satu wilayah yang sangat luas. Karena cakupan wilayahnya yang besar dan potensi wilayah yang menjanjikan, maka dipandang perlu untuk membentuk desa baru agar pengelolaan pemerintahan dan pelayanan kepada masyarakat menjadi lebih efektif. Berdasarkan pertimbangan tersebut, maka pada tahun 1996 secara resmi Desa Rejoagung didirikan sebagai desa mandiri yang terus berkembang hingga saat ini.
                </p>
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4">📊 Data Ringkas</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Luas Wilayah</p>
                      <p className="font-semibold text-gray-800">6,7776 km²</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Jumlah Dusun</p>
                      <p className="font-semibold text-gray-800">4 Dusun</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Tahun Berdiri</p>
                      <p className="font-semibold text-gray-800">1996</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">📍 Lokasi</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>Kecamatan:</strong> Srono</p>
                  <p><strong>Kabupaten:</strong> Banyuwangi</p>
                  <p><strong>Provinsi:</strong> Jawa Timur</p>
                  <p><strong>Kode Pos:</strong> 68471</p>
                </div>
              </div>

              {/* Administrative Structure */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🏛️ Struktur Wilayah</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Rukun Warga (RW)</span>
                    <span className="font-semibold">4 RW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rukun Tetangga (RT)</span>
                    <span className="font-semibold">50 RT</span>
                  </div>
                  <hr className="my-2" />
                  <div className="text-xs text-gray-500">
                    <p><strong>Dusun:</strong></p>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Sumberagung</li>
                      <li>• Sumberagung Kidul</li>
                      <li>• Sumbergroto</li>
                      <li>• Sumbergroto Kidul</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}