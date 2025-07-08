// ===========================================
// app/profil/profil-wilayah/page.tsx
// ===========================================

'use client'

import { MapPin, Home, Users, TreePine, Factory } from 'lucide-react'

export default function ProfilWilayahPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <MapPin className="w-8 h-8 mr-4 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profil Wilayah</h1>
          <p className="text-gray-600">Kondisi geografis dan demografis Desa Rejoagung</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
          <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-emerald-600 mb-2">1,850</div>
          <div className="text-emerald-700 font-medium">Luas Wilayah (Ha)</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-blue-600 mb-2">2,547</div>
          <div className="text-blue-700 font-medium">Total Penduduk</div>
        </div>

        <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
          <TreePine className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-green-600 mb-2">1,200</div>
          <div className="text-green-700 font-medium">Lahan Pertanian (Ha)</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl text-center">
          <Home className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
          <div className="text-orange-700 font-medium">Dusun</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kondisi Geografis</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">🌍 Letak Geografis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Desa Rejoagung terletak di Kecamatan Srono, Kabupaten Banyuwangi, 
                Jawa Timur dengan koordinat 8°23'S dan 114°18'E.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">⛰️ Topografi</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Wilayah desa sebagian besar berupa dataran rendah dengan ketinggian 
                45 mdpl. Kondisi tanah subur sangat mendukung pertanian kelapa sawit.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">🌡️ Iklim</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Iklim tropis dengan curah hujan rata-rata 2.500mm/tahun. 
                Suhu berkisar 24-32°C dengan kelembaban udara 75-85%.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pembagian Wilayah</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dusun Krajan</h3>
                <span className="text-sm text-gray-500">3 RT</span>
              </div>
              <p className="text-gray-600 text-sm">Pusat pemerintahan dan fasilitas umum</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dusun Sumberagung</h3>
                <span className="text-sm text-gray-500">2 RT</span>
              </div>
              <p className="text-gray-600 text-sm">Area perkebunan kelapa sawit utama</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dusun Rejoharjo</h3>
                <span className="text-sm text-gray-500">2 RT</span>
              </div>
              <p className="text-gray-600 text-sm">Kawasan pemukiman dan UMKM</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dusun Purwosari</h3>
                <span className="text-sm text-gray-500">2 RT</span>
              </div>
              <p className="text-gray-600 text-sm">Area pertanian dan peternakan</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Dusun Mekarjaya</h3>
                <span className="text-sm text-gray-500">1 RT</span>
              </div>
              <p className="text-gray-600 text-sm">Kawasan pengembangan wisata agro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}