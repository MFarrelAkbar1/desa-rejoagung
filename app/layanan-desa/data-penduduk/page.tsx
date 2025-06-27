'use client'
import { useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { Users, FileText } from 'lucide-react'
import DataTable from '@/components/DataTable'
import AddPendudukModal from './forms/add-penduduk'
import EditPendudukModal from './forms/edit-penduduk'
import DeletePendudukModal from './forms/delete-penduduk'

export default function DataPendudukPage() {
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

  // Dummy data penduduk
  const [dataPenduduk, setDataPenduduk] = useState([
    {
      id: 1,
      nik: '3201012801920001',
      nama: 'Ahmad Wijaya',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Jakarta',
      tanggalLahir: '1992-01-28',
      alamat: 'Jl. Merdeka No. 15',
      rtRw: '001/002',
      statusPerkawinan: 'Kawin',
      pekerjaan: 'Petani Kelapa Sawit',
      agama: 'Islam',
      pendidikan: 'SMA/SMK'
    },
    {
      id: 2,
      nik: '3201012505890002',
      nama: 'Siti Nurhaliza',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Bandung',
      tanggalLahir: '1989-05-25',
      alamat: 'Jl. Kebon Jeruk No. 8',
      rtRw: '002/003',
      statusPerkawinan: 'Kawin',
      pekerjaan: 'Ibu Rumah Tangga',
      agama: 'Islam',
      pendidikan: 'SMP'
    },
    {
      id: 3,
      nik: '3201011203950003',
      nama: 'Budi Santoso',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Surabaya',
      tanggalLahir: '1995-03-12',
      alamat: 'Jl. Raya Sawit No. 22',
      rtRw: '003/002',
      statusPerkawinan: 'Belum Kawin',
      pekerjaan: 'Karyawan Pabrik',
      agama: 'Islam',
      pendidikan: 'SMA/SMK'
    },
    {
      id: 4,
      nik: '3201010809870004',
      nama: 'Dewi Sartika',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Medan',
      tanggalLahir: '1987-09-08',
      alamat: 'Jl. Suka Maju No. 5',
      rtRw: '001/003',
      statusPerkawinan: 'Kawin',
      pekerjaan: 'Guru',
      agama: 'Islam',
      pendidikan: 'Sarjana'
    },
    {
      id: 5,
      nik: '3201011511930005',
      nama: 'Eko Prasetyo',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Yogyakarta',
      tanggalLahir: '1993-11-15',
      alamat: 'Jl. Gotong Royong No. 12',
      rtRw: '002/001',
      statusPerkawinan: 'Kawin',
      pekerjaan: 'Petani',
      agama: 'Islam',
      pendidikan: 'SD'
    },
    {
      id: 6,
      nik: '3201012207900006',
      nama: 'Maya Indah',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Solo',
      tanggalLahir: '1990-07-22',
      alamat: 'Jl. Manggis Raya No. 7',
      rtRw: '003/001',
      statusPerkawinan: 'Cerai Hidup',
      pekerjaan: 'Pedagang',
      agama: 'Islam',
      pendidikan: 'SMA/SMK'
    },
    {
      id: 7,
      nik: '3201010304880007',
      nama: 'Rudi Hermawan',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Palembang',
      tanggalLahir: '1988-04-03',
      alamat: 'Jl. Sejahtera No. 18',
      rtRw: '001/001',
      statusPerkawinan: 'Kawin',
      pekerjaan: 'Sopir',
      agama: 'Islam',
      pendidikan: 'SMP'
    },
    {
      id: 8,
      nik: '3201011609940008',
      nama: 'Lina Marlina',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Bekasi',
      tanggalLahir: '1994-09-16',
      alamat: 'Jl. Harapan Baru No. 3',
      rtRw: '002/002',
      statusPerkawinan: 'Belum Kawin',
      pekerjaan: 'Bidan',
      agama: 'Islam',
      pendidikan: 'Diploma'
    }
  ])

  const columns = [
    { key: 'nik', label: 'NIK', sortable: true },
    { key: 'nama', label: 'Nama Lengkap', sortable: true },
    { key: 'jenisKelamin', label: 'Jenis Kelamin', sortable: true },
    { key: 'alamat', label: 'Alamat', sortable: false },
    { key: 'rtRw', label: 'RT/RW', sortable: true },
    { key: 'pekerjaan', label: 'Pekerjaan', sortable: true },
    { key: 'statusPerkawinan', label: 'Status Perkawinan', sortable: true }
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
    const id = Math.max(...dataPenduduk.map(p => p.id)) + 1
    setDataPenduduk([...dataPenduduk, { ...newData, id }])
  }

  const handleSaveEdit = (updatedData: any) => {
    setDataPenduduk(dataPenduduk.map(item => 
      item.id === updatedData.id ? updatedData : item
    ))
    setEditModal({ isOpen: false, data: null })
  }

  const confirmDelete = () => {
    setDataPenduduk(dataPenduduk.filter(item => item.id !== deleteModal.data.id))
    setDeleteModal({ isOpen: false, data: null })
  }

  // Hitung statistik
  const totalPenduduk = dataPenduduk.length
  const lakiLaki = dataPenduduk.filter(p => p.jenisKelamin === 'Laki-laki').length
  const perempuan = dataPenduduk.filter(p => p.jenisKelamin === 'Perempuan').length
  const sudahMenikah = dataPenduduk.filter(p => p.statusPerkawinan === 'Kawin').length

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-16'} min-h-screen p-8 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 mr-4 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Data Penduduk</h1>
              <p className="text-gray-600">Kelola data kependudukan Desa Rejoagung</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalPenduduk}</div>
                  <div className="text-blue-700 text-sm">Total Penduduk</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{lakiLaki}</div>
                  <div className="text-green-700 text-sm">Laki-laki</div>
                </div>
              </div>
            </div>
            
            <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-pink-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-pink-600">{perempuan}</div>
                  <div className="text-pink-700 text-sm">Perempuan</div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{sudahMenikah}</div>
                  <div className="text-orange-700 text-sm">Sudah Menikah</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={dataPenduduk}
          columns={columns}
          title="Daftar Penduduk"
          addButtonText="Penduduk"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="Cari berdasarkan NIK, nama, alamat..."
        />

        {/* Modals */}
        <AddPendudukModal
          isOpen={addModal}
          onClose={() => setAddModal(false)}
          onSave={handleSaveAdd}
        />

        <EditPendudukModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, data: null })}
          onSave={handleSaveEdit}
          data={editModal.data}
        />

        <DeletePendudukModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, data: null })}
          onConfirm={confirmDelete}
          data={deleteModal.data}
        />
      </div>
    </div>
  )
}