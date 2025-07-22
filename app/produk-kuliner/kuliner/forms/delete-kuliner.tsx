// app/produk-kuliner/kuliner/forms/delete-kuliner.tsx

'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'
import { CulinaryItem } from '@/types/database'

interface DeleteKulinerFormProps {
  item: CulinaryItem
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteKulinerForm({ item, onClose, onSuccess }: DeleteKulinerFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = async () => {
    if (confirmText !== 'HAPUS') {
      alert('Ketik "HAPUS" untuk konfirmasi')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Gagal menghapus menu kuliner')
      }
    } catch (error) {
      console.error('Error deleting culinary item:', error)
      alert('Terjadi kesalahan')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Anda yakin ingin menghapus menu kuliner:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-lg">{item?.name}</h3>
              <p className="text-gray-600 text-sm">{item?.location}</p>
              <p className="text-green-600 font-semibold">{item?.price}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ketik "HAPUS" untuk mengonfirmasi:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="HAPUS"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || confirmText !== 'HAPUS'}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? 'Menghapus...' : 'Hapus Menu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}