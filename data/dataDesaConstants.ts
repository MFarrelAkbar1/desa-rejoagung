// data/dataDesaConstants.ts

export const kependudukanData = {
  deskripsi: "Desa Rejoagung terdiri dari 5 Dusun yaitu Dusun Krajan, Dusun Sumberagung, Dusun Rejoharjo, Dusun Purwosari, dan Dusun Mekarjaya, dengan 14 RT dan 5 RW. Jumlah penduduk Desa Rejoagung akhir Januari 2025 sebanyak 8451 jiwa yang terdiri dari 4247 laki-laki dan 4204 perempuan dengan jumlah Kepala Keluarga sebanyak 2886 KK.",

  table: [
    ["LAKI-LAKI", "PEREMPUAN", "TOTAL"],
    ["4247 Jiwa", "4204 Jiwa", "8451 Jiwa"]
  ],

  // Data usia
  usiaTable: [
    ["Kategori Usia", "Laki-laki", "Perempuan"],
    ["Bayi/Balita (0-5 tahun)", "487", "506"],
    ["Anak-anak (6-10 tahun)", "397", "393"],
    ["Remaja (10-18 tahun)", "711", "750"],
    ["Dewasa (19-59 tahun)", "2.648", "2.525"],
    ["Lansia (> 60 tahun)", "962", "1.042"]
  ],

  // Data mata pencaharian
  mataPencaharianTable: [
    ["Mata Pencaharian", "Laki-laki", "Perempuan", "Total"],
    ["Petani", "1.352", "506", "1.858"],
    ["Buruh Tani", "1.126", "982", "2.108"],
    ["Pengrajin", "82", "941", "1.023"],
    ["Peternak", "242", "210", "452"],
    ["Pedagang", "54", "42", "96"],
    ["PNS", "26", "84", "110"],
    ["Nelayan", "9", "0", "9"],
    ["Montir", "4", "0", "4"],
    ["TNI", "5", "0", "5"],
    ["Polri", "3", "0", "3"],
    ["Dokter Swasta", "0", "1", "1"],
    ["Bidan Swasta", "0", "6", "6"]
  ],

  // Data agama
  agamaTable: [
    ["Agama/Kepercayaan", "Laki-laki", "Perempuan", "Total"],
    ["Islam", "4.513", "3.936", "8.449"],
    ["Hindu", "51", "31", "82"],
    ["Katholik", "1", "3", "4"]
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
  ]
}

export const seniData = {
  deskripsi: "Di Desa Rejoagung terdapat berbagai kesenian, salah satunya kesenian tradisional (Osing) seperti:",
  kesenianTradisional: ["Gandrung", "Janger", "Barong", "Seblang", "Kuntulan"],
  budayaInfo: "Kesenian tradisional (Osing) biasanya dilakukan setiap ada acara tertentu seperti pada saat 17 Agustus namun saat ini kesenian ini sudah kurang yang disebabkan dengan banyaknya kesenian konvensional yang lebih mendominasi di daerah.",
  budayaTitle: "BUDAYA",
  budayaDesc: "Desa Rejoagung adalah salah satu dari 5 (Delapan) Desa di Kecamatan Srono Kabupaten Banyuwangi dihuni oleh ± 99,06 % Etnis/Suku Bugis secara turun temurun sejak hampir seluruh aktivitas masyarakat memiliki ciri khas Bugis Budaya yang sampai saat ini tetap terjaga dengan baik."
}

export const olahragaData = {
  deskripsi: "Di Desa Rejoagung terdapat berbagai macam olahraga yang dimainkan oleh masyarakat.",
  olahragaTradisional: ["Egrang", "Gobak Sodor", "Lompat Tali", "Petak Umpet"],
  olahragaKonvensional: ["Sepak Bola", "Voli", "Badminton", "Tenis Meja", "Takraw"],
  saranaOlahraga: [
    ["Jenis Sarana", "Jumlah", "Kondisi"],
    ["Lapangan Sepak Bola", "2", "Baik"],
    ["Lapangan Voli", "3", "Baik"],
    ["Lapangan Badminton", "1", "Cukup"],
    ["Meja Tenis", "2", "Baik"]
  ]
}

export const tabsConfig = [
  { id: 'booklet', label: 'Booklet Statistik', color: 'bg-indigo-600' },
  { id: 'kependudukan', label: 'Kependudukan', color: 'bg-blue-600' },
  { id: 'pendidikan', label: 'Pendidikan', color: 'bg-green-600' },
  { id: 'kesehatan', label: 'Kesehatan', color: 'bg-red-600' },
  { id: 'seni', label: 'Seni', color: 'bg-purple-600' },
  { id: 'olahraga', label: 'Olahraga', color: 'bg-orange-600' }
]