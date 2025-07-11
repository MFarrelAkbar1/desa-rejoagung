// data/desaData.ts

export interface DesaMarker {
  id: number
  name: string
  type: 'fasilitas-umum' | 'pendidikan' | 'fasilitas-desa' | 'lain-lain' | 'dusun'
  coordinates: [number, number]
  description: string
  facilities?: string
  color: string
  rtRw?: string
}

export const desaMarkers: DesaMarker[] = [
  // Fasilitas Desa (Hijau)
  {
    id: 1,
    name: 'Balai Desa',
    type: 'fasilitas-desa',
    coordinates: [-8.3833, 114.3014],
    description: 'Kantor Pemerintahan Desa Rejoagung',
    facilities: 'Kantor Kepala Desa, Ruang Pelayanan, Balai Pertemuan',
    color: '#10B981'
  },
  
  {
    id: 2,
    name: 'Poskesdes',
    type: 'fasilitas-desa',
    coordinates: [-8.384, 114.303],
    description: 'Pos Kesehatan Desa',
    facilities: 'Pelayanan Kesehatan Dasar, Persalinan, KB',
    color: '#10B981'
  },
  
  // Pendidikan (Biru)
  {
    id: 3,
    name: 'TK Rejoagung',
    type: 'pendidikan',
    coordinates: [-8.382, 114.302],
    description: 'Taman Kanak-kanak',
    facilities: 'Pendidikan Usia Dini, 3 Ruang Kelas',
    color: '#3B82F6'
  },
  
  {
    id: 4,
    name: 'MI (Madrasah Ibtidaiyah)',
    type: 'pendidikan',
    coordinates: [-8.385, 114.304],
    description: 'Madrasah Ibtidaiyah',
    facilities: 'Pendidikan Dasar Islam, 6 Ruang Kelas',
    color: '#3B82F6'
  },
  
  {
    id: 5,
    name: 'SMP Rejoagung',
    type: 'pendidikan',
    coordinates: [-8.379497666674562, 114.30612847162135],
    description: 'Sekolah Menengah Pertama',
    facilities: 'SMP, Lab IPA, Perpustakaan',
    color: '#3B82F6'
  },
  
  {
    id: 6,
    name: 'SMK Rejoagung',
    type: 'pendidikan',
    coordinates: [-8.379091765348011, 114.3050691166798],
    description: 'Sekolah Menengah Kejuruan',
    facilities: 'SMK, Lab Teknik, Workshop',
    color: '#3B82F6'
  },
  
  // Fasilitas Umum (Ungu)
  {
    id: 7,
    name: 'Psr Sabtu',
    type: 'fasilitas-umum',
    coordinates: [-8.383, 114.305],
    description: 'Pasar Sabtu',
    facilities: 'Pasar Mingguan, Pedagang Lokal',
    color: '#8B5CF6'
  },
  
  {
    id: 8,
    name: 'Psr Tradisional Laisin',
    type: 'fasilitas-umum',
    coordinates: [-8.386, 114.302],
    description: 'Pasar Tradisional Laisin',
    facilities: 'Pasar Harian, Kebutuhan Pokok',
    color: '#8B5CF6'
  },
  
  {
    id: 9,
    name: 'Rejoagung Sport Center',
    type: 'fasilitas-umum',
    coordinates: [-8.384, 114.306],
    description: 'Pusat Olahraga Rejoagung',
    facilities: 'Lapangan Olahraga, GOR, Tribun',
    color: '#8B5CF6'
  },
  
  {
    id: 10,
    name: 'Climb Hill Rejoagung',
    type: 'fasilitas-umum',
    coordinates: [-8.380, 114.308],
    description: 'Area Panjat Tebing',
    facilities: 'Wisata Alam, Panjat Tebing, View Point',
    color: '#8B5CF6'
  },
  
  {
    id: 11,
    name: 'Boklawan',
    type: 'fasilitas-umum',
    coordinates: [-8.387, 114.301],
    description: 'Area Boklawan',
    facilities: 'Fasilitas Rekreasi, Area Berkumpul',
    color: '#8B5CF6'
  },
  
  // Lain-lain (berdasarkan legend)
  {
    id: 12,
    name: 'Lapangan Utama',
    type: 'lain-lain',
    coordinates: [-8.384, 114.304],
    description: 'Lapangan Desa Utama',
    facilities: 'Lapangan Serbaguna, Upacara, Olahraga',
    color: '#6B7280'
  },
  
  {
    id: 13,
    name: 'Masjid Al-Ikhlas',
    type: 'lain-lain',
    coordinates: [-8.384, 114.303],
    description: 'Masjid Jami Desa',
    facilities: 'Masjid Utama, TPA, Perpustakaan Islam',
    color: '#059669'
  },
  
  {
    id: 14,
    name: 'Pos Ronda Krajan',
    type: 'lain-lain',
    coordinates: [-8.383, 114.302],
    description: 'Pos Ronda Dusun Krajan',
    facilities: 'Pos Keamanan, Ronda Malam',
    color: '#DC2626'
  },
  
  // Pusat Dusun berdasarkan peta
  {
    id: 15,
    name: 'Dusun Krajan',
    type: 'dusun',
    coordinates: [-8.383, 114.303],
    description: 'Pusat Dusun Krajan (Area Merah)',
    facilities: 'Balai Dusun, RT 1/1 - RT 6/4',
    color: '#EF4444',
    rtRw: 'RT 1/1 - RT 6/4'
  },
  
  {
    id: 16,
    name: 'Dusun Sumberagung',
    type: 'dusun',
    coordinates: [-8.382, 114.306],
    description: 'Pusat Dusun Sumberagung (Area Hijau)',
    facilities: 'Balai Dusun, RT 1/3 - RT 6/4',
    color: '#22C55E',
    rtRw: 'RT 1/3 - RT 6/4'
  },
  
  {
    id: 17,
    name: 'Dusun Sumbergroto',
    type: 'dusun',
    coordinates: [-8.387, 114.304],
    description: 'Pusat Dusun Sumbergroto (Area Biru)',
    facilities: 'Balai Dusun, RT 1/1 - RT 5/1',
    color: '#3B82F6',
    rtRw: 'RT 1/1 - RT 5/1'
  }
]

// Data dusun dengan pembagian RT/RW sesuai peta
export const dusunData = [
  {
    name: 'Krajan',
    color: '#EF4444', // Merah seperti di peta
    area: 'Bagian Utara-Tengah',
    rtList: ['1/1', '2/2', '3/3', '4/4', '5/5', '6/4', '1/5', '2/5', '3/5', '4/5', '4/6'],
    description: 'Pusat pemerintahan dan fasilitas umum'
  },
  {
    name: 'Sumberagung', 
    color: '#22C55E', // Hijau seperti di peta
    area: 'Bagian Timur',
    rtList: ['1/3', '2/3', '3/3', '4/3', '5/3', '1/4', '2/4', '3/4', '4/4', '5/4', '6/4'],
    description: 'Area perkebunan kelapa sawit utama'
  },
  {
    name: 'Sumbergroto',
    color: '#3B82F6', // Biru seperti di peta  
    area: 'Bagian Selatan',
    rtList: ['1/1', '2/1', '3/1', '1/2', '2/2', '3/2', '4/2', '5/2', '6/1', '4/1', '5/1'],
    description: 'Kawasan pemukiman dan UMKM'
  }
]

// Koordinat batas desa yang lebih akurat berdasarkan peta
export const desaBoundaries = [
  // Batas Utara (dengan Bomo)
  [-8.375, 114.295],
  [-8.375, 114.310],
  // Batas Timur  
  [-8.380, 114.315],
  [-8.385, 114.315],
  // Batas Selatan (dengan Bagorejo)
  [-8.390, 114.310],
  [-8.395, 114.305],
  [-8.395, 114.295],
  // Batas Barat (dengan Wonosobo)
  [-8.390, 114.290],
  [-8.385, 114.285],
  [-8.380, 114.290],
  [-8.375, 114.295] // Close polygon
]

// Data tambahan untuk informasi desa yang lebih akurat
export const desaInfo = {
  name: 'Desa Rejoagung',
  kecamatan: 'Srono',
  kabupaten: 'Banyuwangi', 
  provinsi: 'Jawa Timur',
  luasWilayah: '668,883 Ha',
  jumlahPenduduk: '8.574 jiwa',
  jumlahKK: '2.886 KK',
  koordinat: {
    latitude: -8.3833,
    longitude: 114.3014
  },
  ketinggian: '210 mdpl',
  curahHujan: '1.066 mm/tahun',
  dusun: [
    'Dusun Krajan (Area Merah)',
    'Dusun Sumberagung (Area Hijau)', 
    'Dusun Sumbergroto (Area Biru)'
  ],
  batasWilayah: {
    utara: 'Bomo',
    selatan: 'Bagorejo', 
    timur: 'Batas Kecamatan',
    barat: 'Wonosobo'
  },
  fasilitas: {
    fasilitasUmum: [
      'Psr Sabtu',
      'Psr tradisional Laisin', 
      'Rejoagung Sport center',
      'Climb hill Rejoagung',
      'Boklawan'
    ],
    pendidikan: ['TK', 'MI', 'SMP', 'SMK'],
    fasilitasDesa: ['Balai Desa', 'Poskesdes'],
    lainLain: ['Lapangan', 'Masjid', 'Pos Ronda', 'RT/RW']
  }
}