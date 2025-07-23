'use client'

import Image from 'next/image'
import { Calendar, MapPin, Users, Award, BookOpen, Heart } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function KepalaDesaPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Kepala Desa', href: '/profil/kepala-desa' },
          ]}
        />

        {/* Header Profile Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          <div className="md:flex">
            {/* Photo & Basic Info */}
            <div className="md:w-1/3 bg-gradient-to-br from-emerald-600 to-green-600 p-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white/50 shadow-xl transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/kades.jpg"
                  alt="Foto Kepala Desa Sonhaji"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h2 className="text-white text-3xl font-bold mt-6">Sonhaji</h2>
              <p className="text-emerald-200 mt-1">Kepala Desa Rejoagung</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-emerald-100 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Periode: 2019 - Sekarang</span>
                </div>
                <div className="flex items-center text-emerald-100 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Desa Rejoagung, Kec. Srono</span>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="md:w-2/3 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Profil Kepala Desa
              </h1>
              <div className="w-24 h-1.5 bg-emerald-500 mb-8"></div>
              <article className="prose prose-lg max-w-none text-gray-600">
                <p>
                  Assalamualaikum Warahmatullahi Wabarakatuh,
                </p>
                <p>
                  Puji syukur kehadirat Allah SWT yang telah melimpahkan rahmat dan karunia-Nya kepada kita semua. 
                  Saya, <strong>Sonhaji</strong>, sebagai Kepala Desa Rejoagung, dengan bangga telah mengabdi untuk 
                  kemajuan desa kami tercinta.
                </p>
                <p>
                  Selama masa jabatan, kami telah berkomitmen penuh dalam memberikan transparansi informasi dan 
                  meningkatkan kualitas pelayanan publik. Berbagai program pembangunan telah dilaksanakan untuk 
                  mewujudkan Desa Rejoagung yang lebih maju, mandiri, dan sejahtera.
                </p>
                <p>
                  Kami mengajak seluruh warga untuk terus bersatu dalam semangat gotong royong dan kekeluargaan 
                  demi kemajuan desa kita bersama.
                </p>
                <p>
                  Wassalamualaikum Warahmatullahi Wabarakatuh.
                </p>
              </article>
            </div>
          </div>
        </div>

        {/* Detailed Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Informasi Pribadi</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Nama:</span>
                <span className="text-gray-600">Sonhaji</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Jabatan:</span>
                <span className="text-gray-600">Kepala Desa</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Desa:</span>
                <span className="text-gray-600">Rejoagung</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Kecamatan:</span>
                <span className="text-gray-600">Srono</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">Kabupaten:</span>
                <span className="text-gray-600">Banyuwangi</span>
              </div>
            </div>
          </div>

          {/* Period Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-800">Masa Jabatan</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-28">Periode:</span>
                <span className="text-gray-600">2019 - Sekarang</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-28">Masa Jabatan:</span>
                <span className="text-gray-600">6+ Tahun</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-28">Status:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Aktif</span>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Visi dan Misi Kepemimpinan</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-emerald-600 mr-2" />
                <h4 className="text-lg font-semibold text-emerald-800">Visi</h4>
              </div>
              <p className="text-emerald-700 text-sm leading-relaxed">
                "Terwujudnya Desa Rejoagung yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Gotong Royong"
              </p>
            </div>

            {/* Mission */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                <h4 className="text-lg font-semibold text-blue-800">Misi</h4>
              </div>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Meningkatkan kualitas pelayanan publik</li>
                <li>• Mengembangkan sektor pertanian dan perkebunan</li>
                <li>• Memperkuat ekonomi masyarakat desa</li>
                <li>• Membangun infrastruktur desa yang berkualitas</li>
                <li>• Melestarikan nilai gotong royong dan kekeluargaan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-2xl font-bold text-gray-800">Program dan Pencapaian</h3>
            </div>
            <p className="text-gray-600">Beberapa program utama yang telah dilaksanakan selama masa kepemimpinan</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-lg">
              <div className="text-green-600 mb-3">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Pembangunan Sosial</h4>
              <p className="text-gray-600 text-sm">Peningkatan kualitas hidup masyarakat melalui program-program sosial kemasyarakatan</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-lg">
              <div className="text-blue-600 mb-3">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Infrastruktur</h4>
              <p className="text-gray-600 text-sm">Pembangunan dan perbaikan jalan, saluran air, serta fasilitas umum desa</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-lg">
              <div className="text-yellow-600 mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Kesejahteraan</h4>
              <p className="text-gray-600 text-sm">Program peningkatan ekonomi masyarakat dan pengembangan UMKM desa</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mt-8">
          <div className="text-center">
            <h4 className="font-semibold text-emerald-800 mb-4">Informasi Pemerintahan Desa</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-emerald-700">Hari Jadi Desa: 18 Juli (ke-29 pada 2025)</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-emerald-700">Penduduk: ±8.574 jiwa</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-emerald-700">Luas: 668,883 Ha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}