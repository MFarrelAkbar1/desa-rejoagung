// data/dataDesaConstants.ts

export const kependudukanData = {
  deskripsi: "Desa Rejoagung terdiri dari 5 Dusun yaitu Dusun Krajan, Dusun Sumberagung, Dusun Rejoharjo, Dusun Purwosari, dan Dusun Mekarjaya, dengan 14 RT dan 5 RW. Jumlah penduduk Desa Rejoagung akhir Januari 2025 sebanyak 8.574 jiwa yang terdiri dari 3.975 laki-laki dan 4.599 perempuan dengan jumlah Kepala Keluarga sebanyak 2.886 KK. Sedangkan jumlah Keluarga Miskin (Gakin) 876 KK.",
  table: [
    ["LAKI-LAKI", "PEREMPUAN", "TOTAL"],
    ["3975 Jiwa", "4599 Jiwa", "8574 Jiwa"]
  ]
}

export const pendidikanData = {
  title: "DATA SARANA DAN PRASARANA PENDIDIKAN",
  table: [
    ["GEDUNG/NAMA SEKOLAH", "JUMLAH", "NEGERI", "SWASTA"],
    ["KELOMPOK BERMAIN", "3", "-", "Ya"],
    ["TK DHARMA WANITA", "1", "-", "Ya"],
    ["SEKOLAH DASAR", "", "", ""],
    ["SDN 1 Rejoagung Srono", "1", "Ya", "-"],
    ["SDN 2 Rejoagung", "1", "Ya", "-"],
    ["SDN 3 Rejoagung", "1", "Ya", "-"],
    ["SEKOLAH MENENGAH", "", "", ""],
    ["SMP Al Amiriyyah", "1", "-", "Ya"],
    ["SMK NU Darussalam", "1", "-", "Ya"]
  ],
  tingkatPendidikan: [
    ["URAIAN", "JUMLAH ORANG"],
    ["Usia 3-6 Tahun belum masuk TK", "145"],
    ["Usia 3-6 Tahun yang sedang TK/Playgroup", "298"],
    ["Usia 7-18 Tahun yang sedang sekolah", "1.876"],
    ["Usia 18-56 Tahun tidak pernah sekolah", "23"],
    ["Usia 18-56 Tahun pernah SD tapi tidak tamat", "156"],
    ["Tamat SD/sederajat", "2.845"],
    ["Tamat SLTP/sederajat", "1.923"],
    ["Tamat SLTA/sederajat", "1.401"],
    ["Tamat D-1/sederajat", "45"],
    ["Tamat D-2/sederajat", "67"],
    ["Tamat D-3/sederajat", "123"],
    ["Tamat S-1/sederajat", "189"],
    ["Tamat S-2/sederajat", "34"],
    ["Tamat S-3/sederajat", "8"]
  ]
}

export const kesehatanData = {
  title: "DATA SARANA DAN PRASARANA KESEHATAN",
  table: [
    ["URAIAN", "JUMLAH GEDUNG", "PERMANEN", "DARURAT", "TENAGA MEDIS/KADER"],
    ["POSYANDU", "5", "3", "2", "25 Orang"],
    ["PUSKESMAS PEMBANTU", "1", "1", "-", "8 Orang"],
    ["BIDAN DESA", "2", "2", "-", "2 Orang"],
    ["DUKUN BERANAK TERLATIH", "1", "-", "-", "1 Orang"]
  ],
  keluargaWC: [
    ["URAIAN", "JUMLAH", "PERMANEN", "DARURAT", "BAIK", "RUSAK"],
    ["MCK UMUM", "-", "-", "-", "-", "-"],
    ["JAMBAN KELUARGA", "2.156", "2.089", "67", "2.024", "132"],
    ["RESAPAN AIR LIMBAH RUMAH TANGGA", "-", "-", "-", "-", "-"],
    ["SALURAN PEMBUANGAN AIR", "-", "-", "-", "-", "-"]
  ]
}

export const seniData = {
  deskripsi: "Di Desa Rejoagung terdapat berbagai kesenian, salah satunya kesenian tradisional (Osing) seperti:",
  kesenianTradisional: ["Gandrung", "Janger", "Barong", "Seblang", "Kuntulan"],
  budayaInfo: "Kesenian tradisional (Osing) biasanya dilakukan setiap ada acara tertentu seperti pada saat 17 Agustus namun saat ini kesenian ini sudah kurang yang disebabkan dengan banyaknya kesenian konvensional yang lebih mendominasi di daerah.",
  budayaTitle: "BUDAYA",
  budayaDesc: "Desa Rejoagung adalah salah satu dari 5 (Delapan) Desa di Kecamatan Srono Kabupaten Banyuwangi dihuni oleh ± 99,06 % Etnis/Suku Bugis secara turun temurun sejak hampir seluruh aktivitas masyarakat memiliki ciri khas Bugis Budaya yang sampai saat ini dilestarikan dan bahkan dikembangkan untuk menjaga keasliannya dan khususnya pada pelaksanaan pesta seperti:",
  pestaPernikahan: "PESTA PERNIKAHAN"
}

export const olahragaData = {
  deskripsi: "Adapun jenis olahraga yang terdapat di Desa Rejoagung adalah:",
  olahragaTradisional: [
    "Gandrung (Tari Tradisional)",
    "Hadrah",
    "Jaranan",
    "Kuntulan",
    "Patrol",
    "Angklung Osing",
    "Seblang"
  ],
  olahragaKonvensional: [
    "Sepakbola",
    "Bola Voli", 
    "Tenis Meja",
    "Badminton",
    "Futsal"
  ],
  saranaOlahraga: [
    ["URAIAN", "JUMLAH", "BAIK", "RUSAK", "KETERANGAN"],
    ["Lapangan Sepakbola", "1", "1", "-", "Fasilitas Masyarakat"],
    ["Lapangan Bola Voli", "3", "3", "-", "Fasilitas Masyarakat"],
    ["Lapangan Badminton", "2", "2", "-", "Fasilitas Swasta"],
    ["Meja Ping Pong", "4", "4", "-", "Fasilitas Masyarakat"]
  ]
}

export const tabsConfig = [
  { id: 'kependudukan', label: 'Kependudukan', color: 'bg-blue-600' },
  { id: 'pendidikan', label: 'Pendidikan', color: 'bg-green-600' },
  { id: 'kesehatan', label: 'Kesehatan', color: 'bg-red-600' },
  { id: 'seni', label: 'Seni', color: 'bg-purple-600' },
  { id: 'olahraga', label: 'Olahraga', color: 'bg-orange-600' }
]