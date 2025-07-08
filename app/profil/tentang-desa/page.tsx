// app/profil/tentang-desa/page.tsx
'use client'

import { FileText, Calendar, Users, MapPin } from 'lucide-react'

export default function TentangDesaPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
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
              Desa Rejoagung didirikan pada tahun 1965 oleh para transmigran yang berasal dari Jawa Tengah. 
              Nama "Rejoagung" berasal dari bahasa Jawa yang berarti "kebahagiaan yang agung". 
              Awalnya, desa ini merupakan daerah hutan yang kemudian dibuka menjadi lahan pertanian.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kondisi Geografis</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Desa Rejoagung terletak di wilayah yang strategis dengan kondisi tanah yang subur. 
              Topografi desa sebagian besar berupa dataran rendah dengan sedikit perbukitan di bagian selatan. 
              Kondisi ini sangat mendukung untuk pengembangan pertanian kelapa sawit.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Potensi Unggulan</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Perkebunan kelapa sawit dengan kualitas terbaik</li>
              <li>Industri gula merah tradisional</li>
              <li>Produksi sale pisang berkualitas tinggi</li>
              <li>Potensi wisata agro dan kuliner</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
            <h3 className="font-semibold text-emerald-800 mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Didirikan: 1965</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Penduduk: 2,547 jiwa</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Luas: 1,850 Ha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}