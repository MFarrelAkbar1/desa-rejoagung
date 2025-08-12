// data/dataDesaConstants.ts

export const kependudukanData = {
  deskripsi: "Desa Rejoagung terdiri dari 4 Dusun yaitu Dusun Sumberagung, Dusun Sumberagung Kidul, Dusun Sumbergroto, dan Dusun Sumbergroto Kidul, dengan 50 RT dan 9 RW. Jumlah penduduk Desa Rejoagung akhir Januari 2025 sebanyak 8451 jiwa yang terdiri dari 4247 laki-laki dan 4204 perempuan dengan jumlah Kepala Keluarga sebanyak 2886 KK.",

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


export const tabsConfig = [
  { id: 'kependudukan', label: 'Kependudukan', color: 'bg-blue-600' },
  { id: 'pendidikan', label: 'Pendidikan', color: 'bg-green-600' },
  { id: 'kesehatan', label: 'Kesehatan', color: 'bg-red-600' }
]