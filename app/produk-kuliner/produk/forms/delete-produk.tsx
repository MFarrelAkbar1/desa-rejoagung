// app/produk-kuliner/produk/forms/delete-produk.tsx

'use client'

import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price?: string
  location?: string
}

interface DeleteProdukFormProps {
  product: Product
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteProdukForm({ product, onClose, onSuccess }: DeleteProdukFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = async () => {
    if (confirmText !== 'HAPUS') {
      alert('Ketik "HAPUS" untuk konfirmasi')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Gagal menghapus produk')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
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
              Anda yakin ingin menghapus produk unggulan:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-lg">{product?.name}</h3>
              <p className="text-gray-600 text-sm">{product?.location}</p>
              <p className="text-green-600 font-semibold">{product?.price}</p>
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
              {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}