// app/potensi-desa/wisata/page.tsx
'use client'

import { Mountain, Camera, MapPin, Clock, Star, Users, Phone, Calendar } from 'lucide-react'

interface DestinasiWisata {
  id: string
  name: string
  description: string
  image: string
  category: 'alam' | 'budaya' | 'kuliner' | 'edukasi'
  rating: number
  location: string
  openHours: string
  facilities: string[]
  activities: string[]
  ticketPrice: string
  contact: string
  highlights: string[]
}

const destinasiWisata: DestinasiWisata[] = [
  {
    id: 'kebun-sawit',
    name: 'Agrowisata Kebun Kelapa Sawit',
    description: 'Wisata edukasi dan rekreasi di perkebunan kelapa sawit terluas di Desa Rejoagung. Pengunjung dapat belajar tentang proses budidaya kelapa sawit sambil menikmati pemandangan hijau yang menyejukkan.',
    image: '/wisata-kebun-sawit.jpg',
    category: 'edukasi',
    rating: 4.5,
    location: 'Perkebunan Kelapa Sawit, RT 03/02',
    openHours: '08:00 - 17:00 WIB',
    facilities: ['Area Parkir', 'Gazebo', 'Toilet', 'Mushola', 'Warung Makan'],
    activities: ['Tour Kebun', 'Edukasi Pertanian', 'Foto Pre-Wedding', 'Camping Ground'],
    ticketPrice: 'Rp 15.000/orang',
    contact: '+62 821-xxxx-xxxx',
    highlights: [
      'Kebun sawit seluas 200 hektare',
      'Pemandangan hijau yang memukau',
      'Edukasi proses pengolahan sawit',
      'Spot foto Instagram-able'
    ]
  },
  {
    id: 'danau-buatan',
    name: 'Danau Buatan Rejoagung',
    description: 'Danau buatan yang indah dengan air jernih, dikelilingi pepohonan rindang. Tempat yang perfect untuk rekreasi keluarga, memancing, atau sekadar bersantai menikmati alam.',
    image: '/wisata-danau.jpg',
    category: 'alam',
    rating: 4.3,
    location: 'Dusun Krajan, RT 01/01',
    openHours: '06:00 - 18:00 WIB',
    facilities: ['Dermaga', 'Gazebo', 'Area Memancing', 'Playground', 'Food Court'],
    activities: ['Memancing', 'Perahu Kayuh', 'Piknik Keluarga', 'Bird Watching'],
    ticketPrice: 'Rp 10.000/orang',
    contact: '+62 822-xxxx-xxxx',
    highlights: [
      'Danau seluas 5 hektare',
      'Air jernih dan ikan melimpah',
      '20+ jenis burung',
      'Sunset view yang menawan'
    ]
  },
  {
    id: 'rumah-adat',
    name: 'Rumah Adat Rejoagung',
    description: 'Rumah tradisional Jawa yang dipertahankan sebagai warisan budaya. Pengunjung dapat belajar tentang arsitektur tradisional dan kehidupan masyarakat Jawa tempo dulu.',
    image: '/wisata-rumah-adat.jpg',
    category: 'budaya',
    rating: 4.2,
    location: 'Dusun Tengah, RT 02/01',
    openHours: '08:00 - 16:00 WIB',
    facilities: ['Museum Mini', 'Ruang Pameran', 'Toilet', 'Taman', 'Souvenir Shop'],
    activities: ['Tur Budaya', 'Workshop Batik', 'Pertunjukan Tari', 'Belajar Bahasa Jawa'],
    ticketPrice: 'Rp 12.000/orang',
    contact: '+62 823-xxxx-xxxx',
    highlights: [
      'Arsitektur Joglo autentik',
      'Koleksi benda bersejarah',
      'Pertunjukan seni tradisional',
      'Workshop kerajinan tangan'
    ]
  },
  {
    id: 'sentra-kuliner',
    name: 'Sentra Kuliner Tradisional',
    description: 'Pusat kuliner yang menyajikan berbagai makanan khas Desa Rejoagung dan Banyuwangi. Dari gudeg, sale pisang, hingga gula merah, semua tersedia di sini.',
    image: '/wisata-kuliner.jpg',
    category: 'kuliner',
    rating: 4.7,
    location: 'Jalan Raya Desa, Pasar Desa',
    openHours: '05:00 - 22:00 WIB',
    facilities: ['Food Court', 'Parkir Luas', 'Toilet', 'Mushola', 'WiFi Gratis'],
    activities: ['Kuliner Tour', 'Cooking Class', 'Food Photography', 'Shopping Oleh-oleh'],
    ticketPrice: 'Gratis (bayar makanan)',
    contact: '+62 824-xxxx-xxxx',
    highlights: [
      '15+ warung kuliner',
      'Sale pisang terenak se-Banyuwangi',
      'Gula merah organik',
      'Suasana pasar tradisional'
    ]
  }
]

const categoryIcons = {
  alam: Mountain,
  budaya: Users,
  kuliner: Camera,
  edukasi: Users
}

const categoryColors = {
  alam: 'bg-green-100 text-green-600',
  budaya: 'bg-purple-100 text-purple-600',
  kuliner: 'bg-orange-100 text-orange-600',
  edukasi: 'bg-blue-100 text-blue-600'
}

export default function WisataPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Mountain className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Wisata Desa Rejoagung
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi keindahan alam, budaya, dan kuliner khas Desa Rejoagung yang memukau
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
              <Mountain className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">4</h3>
            <p className="text-gray-600">Destinasi Wisata</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">500+</h3>
            <p className="text-gray-600">Pengunjung/Bulan</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">4.4</h3>
            <p className="text-gray-600">Rating Rata-rata</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">15+</h3>
            <p className="text-gray-600">Spot Foto</p>
          </div>
        </div>

        {/* Destinasi Wisata */}
        <div className="space-y-8">
          {destinasiWisata.map((destinasi, index) => {
            const CategoryIcon = categoryIcons[destinasi.category]
            const categoryColor = categoryColors[destinasi.category]
            
            return (
              <div key={destinasi.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  {/* Image */}
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Mountain className="w-16 h-16 mx-auto mb-2 opacity-80" />
                        <p className="text-sm opacity-90">Foto {destinasi.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-800">{destinasi.name}</h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                            {destinasi.category.charAt(0).toUpperCase() + destinasi.category.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{destinasi.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{destinasi.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{destinasi.openHours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">{destinasi.ticketPrice}</div>
                        <div className="text-sm text-gray-500">Tiket Masuk</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">{destinasi.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Highlights */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">🌟 Highlights:</h4>
                        <ul className="space-y-2">
                          {destinasi.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Activities & Facilities */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">🎯 Aktivitas:</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destinasi.activities.map((activity, idx) => (
                            <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
                              {activity}
                            </span>
                          ))}
                        </div>
                        
                        <h4 className="font-semibold text-gray-800 mb-3">🏢 Fasilitas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {destinasi.facilities.map((facility, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">Kontak: {destinasi.contact}</span>
                      </div>
                      <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                        Kunjungi Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Paket Wisata */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl text-white p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Paket Wisata Desa</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Nikmati pengalaman wisata lengkap dengan paket tour yang telah disesuaikan
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">🌿 Paket Alam</h3>
              <div className="text-2xl font-bold mb-2">Rp 50.000</div>
              <div className="text-emerald-100 text-sm mb-4">per orang</div>
              <ul className="space-y-2 text-sm">
                <li>• Agrowisata Kebun Sawit</li>
                <li>• Danau Buatan Rejoagung</li>
                <li>• Makan siang tradisional</li>
                <li>• Guide lokal</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">🎭 Paket Budaya</h3>
              <div className="text-2xl font-bold mb-2">Rp 75.000</div>
              <div className="text-emerald-100 text-sm mb-4">per orang</div>
              <ul className="space-y-2 text-sm">
                <li>• Rumah Adat Rejoagung</li>
                <li>• Workshop batik</li>
                <li>• Pertunjukan tari tradisional</li>
                <li>• Oleh-oleh kerajinan</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">🍽️ Paket Kuliner</h3>
              <div className="text-2xl font-bold mb-2">Rp 40.000</div>
              <div className="text-emerald-100 text-sm mb-4">per orang</div>
              <ul className="space-y-2 text-sm">
                <li>• Sentra Kuliner Tradisional</li>
                <li>• Cooking class</li>
                <li>• 5 menu makanan khas</li>
                <li>• Gula merah organik</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
              Pesan Paket Wisata
            </button>
          </div>
        </div>

        {/* Informasi Penting */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Informasi Penting untuk Wisatawan</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-3">Tips Berkunjung:</h4>
              <ul className="space-y-1">
                <li>• Datang pagi hari untuk pengalaman terbaik</li>
                <li>• Gunakan pakaian yang nyaman dan sepatu yang sesuai</li>
                <li>• Bawa kamera untuk mengabadikan momen</li>
                <li>• Hormati adat dan budaya setempat</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Kontak & Reservasi:</h4>
              <ul className="space-y-1">
                <li>• Kantor Desa: +62 333-xxx-xxxx</li>
                <li>• WhatsApp: +62 821-xxxx-xxxx</li>
                <li>• Email: wisata@rejoagung.desa.id</li>
                <li>• Reservasi H-1 untuk grup 10 orang</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}