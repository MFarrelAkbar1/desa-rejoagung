'use client'
import { AlertCircle } from 'lucide-react'

interface DeleteKesehatanModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  data?: any
}

export default function DeleteKesehatanModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  data 
}: DeleteKesehatanModalProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    console.log('Menghapus data layanan kesehatan:', data)
    onConfirm()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          Apakah Anda yakin ingin menghapus data layanan kesehatan untuk pasien:
        </p>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
          <div className="space-y-1 text-gray-900">
            <p><strong>Nama:</strong> {data?.namaPasien}</p>
            <p><strong>No. RM:</strong> {data?.noRekamMedis}</p>
            <p><strong>Layanan:</strong> {data?.jenisLayanan}</p>
            <p><strong>Tanggal:</strong> {data?.tanggalKunjungan}</p>
            <p><strong>Tenaga Medis:</strong> {data?.tenagaMedis}</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>Perhatian:</strong> Data rekam medis yang dihapus tidak dapat dikembalikan dan akan hilang permanen.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}