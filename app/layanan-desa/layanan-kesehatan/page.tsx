'use client'
import { useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { Heart, Activity, Calendar, TrendingUp } from 'lucide-react'
import DataTable from '@/components/DataTable'
import AddKesehatanModal from './forms/add-kesehatan'
import EditKesehatanModal from './forms/edit-kesehatan'
import DeleteKesehatanModal from './forms/delete-kesehatan'

export default function LayananKesehatanPage() {
  const { isOpen } = useSidebar()
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState<{ isOpen: boolean; data?: any }>({ 
    isOpen: false, 
    data: null 
  })
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; data?: any }>({ 
    isOpen: false, 
    data: null 
  })

  // Dummy data layanan kesehatan
  const [dataLayananKesehatan, setDataLayananKesehatan] = useState([
    {
      id: 1,
      noRekamMedis: 'RM-2025-001',
      namaPasien: 'Siti Nurhaliza',
      nik: '3201012505890002',
      jenisKelamin: 'Perempuan',
      umur: 36,
      alamat: 'Jl. Kebon Jeruk No. 8',
      tanggalKunjungan: '2025-06-25',
      jenisLayanan: 'Pemeriksaan Ibu Hamil',
      tenagaMedis: 'Bidan Rina',
      statusLayanan: 'Selesai',
      biaya: 50000,
      keluhan: 'Kontrol kehamilan rutin trimester 2',
      catatan: 'Kondisi ibu dan janin sehat'
    },
    {
      id: 2,
      noRekamMedis: 'RM-2025-002',
      namaPasien: 'Ahmad Wijaya',
      nik: '3201012801920001',
      jenisKelamin: 'Laki-laki',
      umur: 33,
      alamat: 'Jl. Merdeka No. 15',
      tanggalKunjungan: '2025-06-24',
      jenisLayanan: 'Pemeriksaan Umum',
      tenagaMedis: 'dr. Siti Aminah',
      statusLayanan: 'Selesai',
      biaya: 75000,
      keluhan: 'Demam dan batuk selama 3 hari',
      catatan: 'Diberi obat penurun demam dan antibiotik'
    },
    {
      id: 3,
      noRekamMedis: 'RM-2025-003',
      namaPasien: 'Dewi Sartika',
      nik: '3201010809870004',
      jenisKelamin: 'Perempuan',
      umur: 38,
      alamat: 'Jl. Suka Maju No. 5',
      tanggalKunjungan: '2025-06-23',
      jenisLayanan: 'Imunisasi',
      tenagaMedis: 'Bidan Maya',
      statusLayanan: 'Selesai',
      biaya: 25000,
      keluhan: 'Imunisasi anak usia 2 tahun',
      catatan: 'Imunisasi DPT dan Polio berhasil'
    },
    {
      id: 4,
      noRekamMedis: 'RM-2025-004',
      namaPasien: 'Budi Santoso',
      nik: '3201011203950003',
      jenisKelamin: 'Laki-laki',
      umur: 30,
      alamat: 'Jl. Raya Sawit No. 22',
      tanggalKunjungan: '2025-06-22',
      jenisLayanan: 'Pemeriksaan Umum',
      tenagaMedis: 'Perawat Dedi',
      statusLayanan: 'Dirujuk',
      biaya: 50000,
      keluhan: 'Nyeri dada dan sesak napas',
      catatan: 'Dirujuk ke RS untuk pemeriksaan lebih lanjut'
    },
    {
      id: 5,
      noRekamMedis: 'RM-2025-005',
      namaPasien: 'Maya Indah',
      nik: '3201012207900006',
      jenisKelamin: 'Perempuan',
      umur: 35,
      alamat: 'Jl. Manggis Raya No. 7',
      tanggalKunjungan: '2025-06-21',
      jenisLayanan: 'Konsultasi',
      tenagaMedis: 'dr. Siti Aminah',
      statusLayanan: 'Selesai',
      biaya: 40000,
      keluhan: 'Konsultasi gizi dan diet',
      catatan: 'Diberikan panduan diet sehat'
    },
    {
      id: 6,
      noRekamMedis: 'RM-2025-006',
      namaPasien: 'Lina Marlina',
      nik: '3201011609940008',
      jenisKelamin: 'Perempuan',
      umur: 31,
      alamat: 'Jl. Harapan Baru No. 3',
      tanggalKunjungan: '2025-06-27',
      jenisLayanan: 'Pemeriksaan Balita',
      tenagaMedis: 'Bidan Rina',
      statusLayanan: 'Dalam Proses',
      biaya: 30000,
      keluhan: 'Tumbuh kembang anak usia 18 bulan',
      catatan: 'Masih dalam pemeriksaan'
    },
    {
      id: 7,
      noRekamMedis: 'RM-2025-007',
      namaPasien: 'Eko Prasetyo',
      nik: '3201011511930005',
      jenisKelamin: 'Laki-laki',
      umur: 32,
      alamat: 'Jl. Gotong Royong No. 12',
      tanggalKunjungan: '2025-06-20',
      jenisLayanan: 'Pengobatan',
      tenagaMedis: 'dr. Siti Aminah',
      statusLayanan: 'Selesai',
      biaya: 60000,
      keluhan: 'Diabetes mellitus tipe 2',
      catatan: 'Kontrol rutin dan obat diabetes'
    },
    {
      id: 8,
      noRekamMedis: 'RM-2025-008',
      namaPasien: 'Rudi Hermawan',
      nik: '3201010304880007',
      jenisKelamin: 'Laki-laki',
      umur: 37,
      alamat: 'Jl. Sejahtera No. 18',
      tanggalKunjungan: '2025-06-28',
      jenisLayanan: 'Pemeriksaan Lansia',
      tenagaMedis: 'Perawat Dedi',
      statusLayanan: 'Dijadwalkan Ulang',
      biaya: 45000,
      keluhan: 'Pemeriksaan rutin tekanan darah tinggi',
      catatan: 'Jadwal ulang minggu depan'
    }
  ])

  const columns = [
    { key: 'noRekamMedis', label: 'No. RM', sortable: true },
    { key: 'namaPasien', label: 'Nama Pasien', sortable: true },
    { key: 'jenisKelamin', label: 'JK', sortable: true },
    { key: 'umur', label: 'Umur', sortable: true },
    { key: 'tanggalKunjungan', label: 'Tanggal', sortable: true },
    { key: 'jenisLayanan', label: 'Jenis Layanan', sortable: true },
    { key: 'tenagaMedis', label: 'Tenaga Medis', sortable: false },
    { key: 'statusLayanan', label: 'Status', sortable: true }
  ]

  const handleAdd = () => {
    setAddModal(true)
  }

  const handleEdit = (data: any) => {
    setEditModal({ isOpen: true, data })
  }

  const handleDelete = (data: any) => {
    setDeleteModal({ isOpen: true, data })
  }

  const handleSaveAdd = (newData: any) => {
    const id = Math.max(...dataLayananKesehatan.map(p => p.id)) + 1
    setDataLayananKesehatan([...dataLayananKesehatan, { ...newData, id }])
  }

  const handleSaveEdit = (updatedData: any) => {
    setDataLayananKesehatan(dataLayananKesehatan.map(item => 
      item.id === updatedData.id ? updatedData : item
    ))
    setEditModal({ isOpen: false, data: null })
  }

  const confirmDelete = () => {
    setDataLayananKesehatan(dataLayananKesehatan.filter(item => item.id !== deleteModal.data.id))
    setDeleteModal({ isOpen: false, data: null })
  }

  // Hitung statistik
  const totalKunjungan = dataLayananKesehatan.length
  const kunjunganBulanIni = dataLayananKesehatan.filter(item => {
    const date = new Date(item.tanggalKunjungan)
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length
  
  const layananSelesai = dataLayananKesehatan.filter(item => item.statusLayanan === 'Selesai').length
  const totalPendapatan = dataLayananKesehatan
    .filter(item => item.statusLayanan === 'Selesai')
    .reduce((sum, item) => sum + item.biaya, 0)

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-16'} min-h-screen p-8 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 mr-4 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Layanan Kesehatan</h1>
              <p className="text-gray-600">Kelola data layanan kesehatan Desa Rejoagung</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalKunjungan}</div>
                  <div className="text-blue-700 text-sm">Total Kunjungan</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{kunjunganBulanIni}</div>
                  <div className="text-green-700 text-sm">Bulan Ini</div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{layananSelesai}</div>
                  <div className="text-purple-700 text-sm">Layanan Selesai</div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    Rp {totalPendapatan.toLocaleString('id-ID')}
                  </div>
                  <div className="text-orange-700 text-sm">Total Pendapatan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={dataLayananKesehatan}
          columns={columns}
          title="Daftar Layanan Kesehatan"
          addButtonText="Layanan"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Cari berdasarkan nama, no. RM, layanan..."
        />

        {/* Modals */}
        <AddKesehatanModal
          isOpen={addModal}
          onClose={() => setAddModal(false)}
          onSave={handleSaveAdd}
        />

        <EditKesehatanModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, data: null })}
          onSave={handleSaveEdit}
          data={editModal.data}
        />

        <DeleteKesehatanModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, data: null })}
          onConfirm={confirmDelete}
          data={deleteModal.data}
        />
      </div>
    </div>
  )
}