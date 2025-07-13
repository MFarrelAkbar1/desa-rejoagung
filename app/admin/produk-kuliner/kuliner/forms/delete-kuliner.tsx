'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'

interface DeleteKulinerFormProps {
  item: any
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
            <label className="block text-sm font-semibold mb-2 text-red-600">
              Ketik "HAPUS" untuk konfirmasi:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full border border-red-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="HAPUS"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || confirmText !== 'HAPUS'}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-semibold flex items-center justify-center"
            >
              {isDeleting ? (
                'Menghapus...'
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus Menu
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}