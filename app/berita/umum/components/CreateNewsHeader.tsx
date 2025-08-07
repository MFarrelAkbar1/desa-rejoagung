// app/berita/umum/components/CreateNewsHeader.tsx

import { Save, X } from 'lucide-react'

interface CreateNewsHeaderProps {
  contentBlocksCount: number
  isLoading: boolean
  onSave: () => void
  onCancel: () => void
}

export default function CreateNewsHeader({
  contentBlocksCount,
  isLoading,
  onSave,
  onCancel
}: CreateNewsHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
      <div className="flex justify-between items-start">
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-2">🆕 Buat Berita Baru</h1>
          <p className="text-blue-100">
            Buat berita dengan konten blok yang dapat dikustomisasi
          </p>
          <p className="text-blue-100 text-sm mt-1">
            Content blocks: {contentBlocksCount} blok • 🖼️ Maksimal gambar: 10MB
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Menyimpan...' : 'Simpan Berita'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}