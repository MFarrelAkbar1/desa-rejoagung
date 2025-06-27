// constants/schoolsData.ts
export interface School {
  id: number
  name: string
  type: string
  address: string
  coordinates: [number, number]
  students: number
  teachers: number
  facilities: string[]
  rating: number
  contact: string
  accreditation: string
  principal: string
  established: number
}

export const schoolsData: School[] = [
  {
    id: 1,
    name: 'New SDN 1 Rejoagung Srono',
    type: 'Sekolah Dasar',
    address: 'J882+2XF, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.384798810410489, 114.30237941420603],
    students: 245,
    teachers: 12,
    facilities: ['Perpustakaan', 'Lab Komputer', 'Lapangan Olahraga'],
    rating: 4.5,
    contact: '0333-123-456',
    accreditation: 'A',
    principal: 'Dra. Siti Nurhaliza',
    established: 1978
  },
  {
    id: 2,
    name: 'SDN 2 Rejoagung',
    type: 'Sekolah Dasar',
    address: 'J884+FPQ, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.383768572513736, 114.30685111350854],
    students: 198,
    teachers: 10,
    facilities: ['Perpustakaan', 'Laboratorium IPA', 'Kantin'],
    rating: 4.3,
    contact: '0333-123-457',
    accreditation: 'A',
    principal: 'Drs. Ahmad Wijaya',
    established: 1985
  },
  {
    id: 3,
    name: 'SMP AL AMIRIYYAH',
    type: 'Sekolah Menengah Pertama',
    address: 'J8C4+3F2, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.379497666674562, 114.30612847162135],
    students: 320,
    teachers: 18,
    facilities: ['Lab IPA', 'Lab Komputer', 'Perpustakaan', 'Lapangan Basket', 'Masjid'],
    rating: 4.7,
    contact: '0333-123-458',
    accreditation: 'A',
    principal: 'Dr. Budi Santoso, M.Pd',
    established: 1992
  },
  {
    id: 4,
    name: 'SMK NU DARUSSALAM',
    type: 'Sekolah Menengah Kejuruan',
    address: 'J8C4+52 Rejoagung, Banyuwangi Regency, East Java',
    coordinates: [-8.379091765348011, 114.3050691166798],
    students: 380,
    teachers: 22,
    facilities: ['Lab Teknik', 'Workshop', 'Lab Komputer', 'Masjid', 'Asrama'],
    rating: 4.6,
    contact: '0333-123-459',
    accreditation: 'A',
    principal: 'Ir. Eko Prasetyo, M.Pd',
    established: 2000
  }
]