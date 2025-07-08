
// ===========================================
// app/profil/kepala-desa/page.tsx
// ===========================================

'use client'

import { User, Mail, Phone, Calendar, Award } from 'lucide-react'

export default function KepalaDesaPage() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <User className="w-8 h-8 mr-4 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profil Kepala Desa</h1>
          <p className="text-gray-600">Pemimpin Desa Rejoagung</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
            <img 
              src="/kepala-desa.jpg" 
              alt="Kepala Desa"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bapak Ahmad Wijaya</h2>
          <p className="text-emerald-600 font-medium mb-4">Kepala Desa Rejoagung</p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Periode: 2019 - 2025</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>kades@rejoagung.desa.id</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Biodata</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
              <p className="text-gray-800">Ahmad Wijaya, S.Pd</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Tempat, Tanggal Lahir</label>
              <p className="text-gray-800">Banyuwangi, 15 Agustus 1975</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Pendidikan</label>
              <p className="text-gray-800">S1 Pendidikan</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Pengalaman</label>
              <p className="text-gray-800">Kepala Desa (6 tahun)</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Visi Kepemimpinan</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            "Membangun Desa Rejoagung yang mandiri, sejahtera, dan berkeadilan melalui 
            pengembangan potensi lokal dan pemberdayaan masyarakat yang berkelanjutan."
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Program Unggulan</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Pengembangan agrobisnis kelapa sawit berkelanjutan</li>
            <li>Peningkatan kualitas infrastruktur desa</li>
            <li>Pemberdayaan ekonomi masyarakat melalui UMKM</li>
            <li>Digitalisasi layanan administrasi desa</li>
            <li>Pengembangan wisata agro dan kuliner</li>
          </ul>
        </div>
      </div>
    </div>
  )
}