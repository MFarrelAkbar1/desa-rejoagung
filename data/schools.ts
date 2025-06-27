// data/schools.ts
export interface School {
  id: number
  name: string
  type: 'SD' | 'SMP' | 'SMK'
  address: string
  coordinates: [number, number]
  description?: string
}

export const schools: School[] = [
  {
    id: 1,
    name: 'SDN 2 Rejoagung',
    type: 'SD',
    address: 'J884+FPQ, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.383768572513736, 114.30685111350854],
    description: 'Sekolah Dasar Negeri 2 Rejoagung'
  },
  {
    id: 2,
    name: 'SDN 1 Rejoagung Srono',
    type: 'SD',
    address: 'J882+2XF, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.384798810410489, 114.30237941420603],
    description: 'Sekolah Dasar Negeri 1 Rejoagung Srono'
  },
  {
    id: 3,
    name: 'SMP AL AMIRIYYAH',
    type: 'SMP',
    address: 'J8C4+3F2, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.379497666674562, 114.30612847162135],
    description: 'Sekolah Menengah Pertama Al Amiriyyah'
  },
  {
    id: 4,
    name: 'SMK NU DARUSSALAM',
    type: 'SMK',
    address: 'J8C4+52 Rejoagung, Banyuwangi Regency, East Java',
    coordinates: [-8.379091765348011, 114.3050691166798],
    description: 'Sekolah Menengah Kejuruan NU Darussalam'
  }
]

export const schoolTypeColors = {
  SD: '#3B82F6',
  SMP: '#10B981',
  SMK: '#F59E0B'
}

export const schoolTypeLabels = {
  SD: 'Sekolah Dasar',
  SMP: 'Sekolah Menengah Pertama',
  SMK: 'Sekolah Menengah Kejuruan'
}