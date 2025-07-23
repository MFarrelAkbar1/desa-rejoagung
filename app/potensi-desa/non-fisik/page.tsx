// app/potensi-desa/non-fisik/page.tsx
'use client'

import { Users, Building, BookOpen, DollarSign, Heart, Music, Award, Briefcase } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

interface PotensiNonFisik {
  id: string
  title: string
  description: string
  icon: any
  details: string[]
  achievements?: string[]
  stats?: {
    label: string
    value: string
    icon?: any
  }[]
}

const potensiNonFisik: PotensiNonFisik[] = [
  {
    id: 'sdm',
    title: 'Sumber Daya Manusia',
    description: 'Kualitas dan potensi masyarakat Desa Rejoagung',
    icon: Users,
    details: [
      'Tingkat pendidikan yang terus meningkat',
      'Keterampilan pertanian dan perkebunan yang mumpuni',
      'Semangat gotong royong yang kuat',
      'Kemampuan adaptasi teknologi yang baik',
      'Etos kerja tinggi dan disiplin',
      'Keahlian dalam pengolahan hasil pertanian'
    ],
    stats: [
      { label: 'Jumlah Penduduk', value: '3.245', icon: Users },
      { label: 'Usia Produktif', value: '65%', icon: Briefcase },
      { label: 'Tingkat Literasi', value: '92%', icon: BookOpen }
    ],
    achievements: [
      'Juara 1 Lomba Desa Tingkat Kabupaten 2024',
      'Desa dengan UMKM terbanyak di Kecamatan Srono',
      'Tingkat partisipasi masyarakat 85% dalam program desa'
    ]
  },
  {
    id: 'kelembagaan',
    title: 'Kelembagaan Desa',
    description: 'Struktur organisasi dan lembaga yang mendukung pembangunan',
    icon: Building,
    details: [
      'Pemerintah desa yang profesional dan transparan',
      'BPD (Badan Permusyawaratan Desa) yang aktif',
      'PKK dengan program pemberdayaan perempuan',
      'Karang Taruna yang produktif',
      'Kelompok Tani dan Gapoktan yang solid',
      'BUMDES yang berkembang pesat'
    ],
    stats: [
      { label: 'Lembaga Aktif', value: '12', icon: Building },
      { label: 'Anggota PKK', value: '285', icon: Heart },
      { label: 'Kelompok Tani', value: '8', icon: Users }
    ],
    achievements: [
      'Transparansi keuangan desa 100%',
      'BUMDES dengan omzet Rp 500 juta/tahun',
      'Program PKK juara tingkat kecamatan'
    ]
  },
  {
    id: 'budaya',
    title: 'Budaya dan Tradisi',
    description: 'Kekayaan budaya lokal yang menjadi identitas desa',
    icon: Music,
    details: [
      'Tradisi gotong royong dalam pembangunan',
      'Upacara adat harvest festival kelapa sawit',
      'Kesenian tradisional Jawa Timur',
      'Kuliner khas dengan resep turun temurun',
      'Sistem nilai yang mengutamakan kebersamaan',
      'Pelestarian bahasa dan dialek lokal'
    ],
    stats: [
      { label: 'Event Budaya/Tahun', value: '6', icon: Music },
      { label: 'Grup Kesenian', value: '4', icon: Award },
      { label: 'Kuliner Khas', value: '15+', icon: Heart }
    ],
    achievements: [
      'Festival Kelapa Sawit tahunan sejak 2018',
      'Pelestarian tari tradisional Gandrung',
      'Kuliner sale pisang terkenal se-Banyuwangi'
    ]
  },
  {
    id: 'ekonomi',
    title: 'Potensi Ekonomi Lainnya',
    description: 'Peluang ekonomi dan bisnis yang berkembang di desa',
    icon: DollarSign,
    details: [
      'UMKM pengolahan hasil pertanian',
      'Industri rumah tangga makanan ringan',
      'Peluang agrowisata kelapa sawit',
      'Jasa transportasi dan logistik',
      'Perdagangan hasil bumi',
      'Potensi e-commerce produk lokal'
    ],
    stats: [
      { label: 'UMKM Aktif', value: '45', icon: Briefcase },
      { label: 'Omzet/Bulan', value: 'Rp 150M', icon: DollarSign },
      { label: 'Lapangan Kerja', value: '180', icon: Users }
    ],
    achievements: [
      'Produk gula merah masuk supermarket regional',
      'Platform online untuk produk desa',
      'Kemitraan dengan 5 perusahaan besar'
    ]
  }
]

export default function PotensiNonFisikPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb - Tambahkan di sini */}
        <Breadcrumb
          items={[
            { label: 'Potensi Desa', href: '/potensi-desa' },
            { label: 'Potensi Non-Fisik', href: '/potensi-desa/non-fisik' },
          ]}
        />

        {/* Header */}
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Potensi Non-Fisik Desa Rejoagung
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kekuatan sosial, budaya, dan ekonomi yang menjadi modal pembangunan berkelanjutan
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">SDM Berkualitas</h3>
            <p className="text-gray-600">3.245 jiwa penduduk produktif</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Kelembagaan</h3>
            <p className="text-gray-600">12 lembaga desa aktif</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Budaya Kaya</h3>
            <p className="text-gray-600">6 event budaya per tahun</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">UMKM Maju</h3>
            <p className="text-gray-600">45 UMKM dengan omzet Rp 150M/bulan</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {potensiNonFisik.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">{item.title}</h2>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">{item.description}</p>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Details */}
                      <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Karakteristik & Keunggulan:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Achievements */}
                        {item.achievements && (
                          <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">🏆 Prestasi & Pencapaian:</h4>
                            <div className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                                  <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Statistics */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data & Statistik:</h3>
                        <div className="space-y-4">
                          {item.stats?.map((stat, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                              <div className="flex items-center space-x-3 mb-2">
                                {stat.icon && <stat.icon className="w-5 h-5 text-blue-600" />}
                                <div className="text-sm text-gray-600">{stat.label}</div>
                              </div>
                              <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="bg-gray-50 px-8 py-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Potensi {index + 1} dari {potensiNonFisik.length}</span>
                  <div className="flex space-x-1">
                    {potensiNonFisik.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === index ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Mari Berkontribusi untuk Desa</h2>
            <p className="text-blue-100 mb-6 text-lg max-w-3xl mx-auto">
              Dengan potensi non-fisik yang luar biasa ini, setiap warga dapat berperan aktif 
              dalam memajukan Desa Rejoagung menuju desa mandiri dan sejahtera.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">3.245</div>
                <div className="text-blue-100 text-sm">Total Penduduk</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">45</div>
                <div className="text-blue-100 text-sm">UMKM Aktif</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">12</div>
                <div className="text-blue-100 text-sm">Lembaga Desa</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-blue-100 text-sm">Tingkat Literasi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}