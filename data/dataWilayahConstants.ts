// data/dataWilayahConstants.ts

export const tabsWilayahConfig = [
  {
    id: 'demografis',
    label: 'DEMOGRAFIS',
    color: 'bg-emerald-600'
  },
  {
    id: 'ekonomi', 
    label: 'EKONOMI MASYARAKAT',
    color: 'bg-blue-600'
  },
  {
    id: 'pendidikan',
    label: 'PENDIDIKAN', 
    color: 'bg-purple-600'
  },
  {
    id: 'kesehatan',
    label: 'KESEHATAN',
    color: 'bg-red-600'
  }
]

export const demografisData = {
  deskripsi: "Secara Visualisasi, wilayah administratif dapat dilihat dalam Peta Wilayah Desa Rejoagung Sebagai berikut :",
  gambaran: {
    title: "GAMBARAN UMUM DEMOGRAFIS",
    table: [
      ["Keterangan", "Luas (Ha)"],
      ["Luas Desa Rejoagung", "668,883"],
      ["Tanah Kas Desa", "2,5"],
      ["Kompleks Kantor Desa", "1,2"],
      ["Tanah Kuburan", "3,8"],
      ["Sawah Masyarakat", "145"],
      ["Perkebunan Kelapa Sawit", "480"],
      ["Pekarangan Penduduk", "25"],
      ["Tanah Kering/Lahan Tidur", "8"],
      ["Tanah Lokasi Sekolah", "1,5"],
      ["Lapangan Olahraga", "0,8"],
      ["Jalan Umum", "1,183"]
    ]
  },
  batasDesa: [
    ["Batas Wilayah", "Berbatasan Dengan"],
    ["Sebelah Utara", "Desa Sumberejo Kecamatan Srono"],
    ["Sebelah Timur", "Desa Wonosobo Kecamatan Srono"],
    ["Sebelah Selatan", "Desa Parijatah Kulon Kecamatan Srono"],
    ["Sebelah Barat", "Desa Kepundungan Kecamatan Srono"]
  ]
}

export const ekonomiData = {
  deskripsi: "Secara umum pendapatan masyarakat Desa Rejoagung berasal dari sektor pertanian, peternakan, perkebunan dan perdagangan. Mata pencaharian penduduknya mayoritas petani dan buruh tani dengan komoditas utama kelapa sawit.",
  table: [
    ["Jenis Pekerjaan", "Jumlah"],
    ["Petani Kelapa Sawit", "1.850 Jiwa"],
    ["Buruh Tani", "1.420 Jiwa"],
    ["Pedagang", "345 Jiwa"],
    ["PNS", "89 Jiwa"],
    ["TNI/POLRI", "12 Jiwa"],
    ["Guru", "45 Jiwa"],
    ["Perangkat Desa", "15 Jiwa"],
    ["Tukang", "235 Jiwa"],
    ["Wiraswasta", "890 Jiwa"],
    ["Buruh Harian Lepas", "1.245 Jiwa"],
    ["Ibu Rumah Tangga", "2.089 Jiwa"],
    ["Pelajar/Mahasiswa", "339 Jiwa"]
  ],
  keterangan: [
    "a. Jumlah angkatan kerja yang bekerja (penduduk usia 18-56 th) : 4.125 jiwa",
    "b. Jumlah angkatan kerja yang belum bekerja (penduduk usia 18-56 th) : 1.234 jiwa", 
    "c. Jumlah yang belum/tidak bekerja : 892 jiwa",
    "d. Jumlah Rumah Tangga Petani : 2.156 KK"
  ]
}

export const pendidikanWilayahData = {
  title: "DATA SARANA PENDIDIKAN DESA REJOAGUNG",
  saranaPendidikan: [
    ["Jenis Sarana", "Jumlah"],
    ["TK/PAUD", "3 BUAH"],
    ["SD/Sederajat", "2 BUAH"],
    ["SMP/Sederajat", "1 BUAH"],
    ["SMA/SMK", "1 BUAH"],
    ["SLB", "1 BUAH"]
  ],
  tingkatPendidikan: [
    ["Tingkat Pendidikan", "Jumlah Penduduk"],
    ["TIDAK TAMAT SD", "892 Jiwa"],
    ["TAMAT SD/SEDERAJAT", "2.456 Jiwa"],
    ["TAMAT SMP/SEDERAJAT", "1.890 Jiwa"],
    ["TAMAT SMA/SEDERAJAT", "2.234 Jiwa"],
    ["D1 / D2", "156 Jiwa"],
    ["D3", "234 Jiwa"],
    ["D4", "289 Jiwa"],
    ["S1", "398 Jiwa"],
    ["S2", "25 Jiwa"]
  ]
}

export const kesehatanWilayahData = {
  title: "KESEHATAN MASYARAKAT DESA REJOAGUNG",
  table: [
    ["Jenis Fasilitas", "Jumlah"],
    ["PUSKESMAS", "1 BUAH"],
    ["POSYANDU", "5 BUAH"],
    ["BIDAN DESA", "2 ORANG"],
    ["KADER KESEHATAN", "15 ORANG"],
    ["TENAGA KESEHATAN", "8 ORANG"]
  ],
  informasiTambahan: {
    title: "INFORMASI LAYANAN KESEHATAN",
    data: [
      "• Puskesmas terdekat: UPTD Puskesmas Wonosobo (Jln Raya Srono No. 78)",
      "• Pelayanan 24 jam untuk kasus darurat dan persalinan",
      "• Posyandu aktif melayani ibu hamil, balita, dan lansia setiap bulan",
      "• Program imunisasi rutin dan penyuluhan kesehatan berkala",
      "• Layanan KB dan kesehatan reproduksi",
      "• Program deteksi dini penyakit tidak menular"
    ]
  }
}