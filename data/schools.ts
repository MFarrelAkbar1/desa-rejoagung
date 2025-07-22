// data/schools.ts - Data Sekolah Lengkap
export interface School {
  id: number
  name: string
  type: 'TK' | 'SD' | 'SMP' | 'SMK' | 'SLB'
  address: string
  coordinates: [number, number]
  description?: string
  students?: number
  teachers?: number
  facilities?: string[]
  rating?: number
  contact?: string
  accreditation?: string
  principal?: string
  established?: number
}

export const schools: School[] = [
  // TK/PAUD (3 buah)
  {
    id: 1,
    name: 'TK Dharma Wanita',
    type: 'TK',
    address: 'Dusun Krajan, RT 02 RW 01, Rejoagung',
    coordinates: [-8.382, 114.302],
    description: 'Taman Kanak-kanak swasta dengan kurikulum nasional',
    students: 45,
    teachers: 4,
    facilities: ['Ruang Kelas', 'Playground', 'Perpustakaan Mini'],
    rating: 4.2,
    contact: '+62 333-456-789',
    principal: 'Ibu Sari Dewi',
    established: 1995
  },
  {
    id: 2,
    name: 'PAUD Tunas Harapan',
    type: 'TK',
    address: 'Dusun Sumberagung, RT 03 RW 02, Rejoagung',
    coordinates: [-8.385, 114.308],
    description: 'Pendidikan Anak Usia Dini dengan metode bermain sambil belajar',
    students: 38,
    teachers: 3,
    facilities: ['Area Bermain', 'Ruang Kelas', 'Kantin'],
    rating: 4.0,
    contact: '+62 333-456-790',
    principal: 'Ibu Lestari',
    established: 2005
  },
  {
    id: 3,
    name: 'Kelompok Bermain Ceria',
    type: 'TK',
    address: 'Dusun Sumbergroto, RT 01 RW 01, Rejoagung',
    coordinates: [-8.387, 114.295],
    description: 'Kelompok bermain untuk anak usia 2-4 tahun',
    students: 25,
    teachers: 2,
    facilities: ['Ruang Bermain', 'Taman', 'Area Outdoor'],
    rating: 3.8,
    contact: '+62 333-456-791',
    principal: 'Ibu Ningsih',
    established: 2010
  },

  // SD (3 buah - termasuk SDN 3)
  {
    id: 4,
    name: 'SDN 1 Rejoagung Srono',
    type: 'SD',
    address: 'J882+2XF, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.384798810410489, 114.30237941420603],
    description: 'Sekolah Dasar Negeri 1 Rejoagung Srono',
    students: 245,
    teachers: 12,
    facilities: ['Perpustakaan', 'Lab Komputer', 'Lapangan Olahraga'],
    rating: 4.5,
    contact: '+62 333-123-456',
    accreditation: 'A',
    principal: 'Dra. Siti Nurhaliza',
    established: 1978
  },
  {
    id: 5,
    name: 'SDN 2 Rejoagung',
    type: 'SD',
    address: 'J884+FPQ, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.383768572513736, 114.30685111350854],
    description: 'Sekolah Dasar Negeri 2 Rejoagung',
    students: 198,
    teachers: 10,
    facilities: ['Perpustakaan', 'Laboratorium IPA', 'Kantin'],
    rating: 4.3,
    contact: '+62 333-123-457',
    accreditation: 'A',
    principal: 'Drs. Ahmad Wijaya',
    established: 1985
  },
  {
    id: 6,
    name: 'SDN 3 Rejoagung',
    type: 'SD',
    address: 'Dusun Sumbergroto, RT 05 RW 02, Rejoagung',
    coordinates: [-8.388, 114.298],
    description: 'Sekolah Dasar Negeri 3 Rejoagung',
    students: 156,
    teachers: 8,
    facilities: ['Perpustakaan', 'Lapangan', 'Ruang UKS'],
    rating: 4.1,
    contact: '+62 333-123-458',
    accreditation: 'B',
    principal: 'Drs. Bambang Sutrisno',
    established: 1992
  },

  // SMP (1 buah)
  {
    id: 7,
    name: 'SMP AL AMIRIYYAH',
    type: 'SMP',
    address: 'J8C4+3F2, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.379497666674562, 114.30612847162135],
    description: 'Sekolah Menengah Pertama swasta dengan nuansa Islami',
    students: 320,
    teachers: 18,
    facilities: ['Lab IPA', 'Lab Komputer', 'Perpustakaan', 'Lapangan Basket', 'Masjid'],
    rating: 4.7,
    contact: '+62 333-123-459',
    accreditation: 'A',
    principal: 'Dr. Budi Santoso, M.Pd',
    established: 1992
  },

  // SMK (1 buah)
  {
    id: 8,
    name: 'SMK NU DARUSSALAM',
    type: 'SMK',
    address: 'J8C4+52 Rejoagung, Banyuwangi Regency, East Java',
    coordinates: [-8.379091765348011, 114.3050691166798],
    description: 'Sekolah Menengah Kejuruan dengan program keahlian Teknik dan Bisnis',
    students: 380,
    teachers: 22,
    facilities: ['Lab Teknik', 'Workshop', 'Lab Komputer', 'Masjid', 'Asrama'],
    rating: 4.6,
    contact: '+62 333-123-460',
    accreditation: 'A',
    principal: 'Ir. Hasan Basri, M.T',
    established: 1998
  },

  // SLB (1 buah)
  {
    id: 9,
    name: 'SLB Bina Insani Srono',
    type: 'SLB',
    address: 'Jl. Pendidikan No. 12, Srono',
    coordinates: [-8.381, 114.301],
    description: 'Sekolah Luar Biasa untuk anak berkebutuhan khusus',
    students: 45,
    teachers: 8,
    facilities: ['Ruang Terapi', 'Ruang Kesenian', 'Workshop Keterampilan', 'Ruang Konseling'],
    rating: 4.4,
    contact: '+62 333-123-461',
    accreditation: 'B',
    principal: 'Dra. Fitri Handayani, M.Pd',
    established: 2003
  }
]

// Summary data untuk statistik
export const schoolsStatistics = {
  total: schools.length,
  byType: {
    TK: schools.filter(s => s.type === 'TK').length,
    SD: schools.filter(s => s.type === 'SD').length,
    SMP: schools.filter(s => s.type === 'SMP').length,
    SMK: schools.filter(s => s.type === 'SMK').length,
    SLB: schools.filter(s => s.type === 'SLB').length
  },
  totalStudents: schools.reduce((sum, school) => sum + (school.students || 0), 0),
  totalTeachers: schools.reduce((sum, school) => sum + (school.teachers || 0), 0),
  averageRating: schools.reduce((sum, school) => sum + (school.rating || 0), 0) / schools.length
}