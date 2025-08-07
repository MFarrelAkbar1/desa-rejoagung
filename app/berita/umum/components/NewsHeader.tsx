// app/berita/umum/components/NewsHeader.tsx

import { Edit3, Save, X } from 'lucide-react'

interface ContentBlock {
  id?: string
  type: 'text' | 'subtitle' | 'image'
  content: string
  order_index: number
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    fontSize?: 'small' | 'medium' | 'large'
    caption?: string
  }
  created_at?: string
}

interface NewsDetail {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
  slug?: string
  created_at: string
  updated_at?: string
  content_blocks?: ContentBlock[]
}

interface NewsHeaderProps {
  isEditing: boolean
  currentNews: NewsDetail
  contentBlocks: ContentBlock[]
  formatDate: (dateString: string) => string
  isAdmin: boolean
  isSaving: boolean
  onStartEdit: () => void
  onSave: () => void
  onCancel: () => void
}

export default function NewsHeader({
  isEditing,
  currentNews,
  contentBlocks,
  formatDate,
  isAdmin,
  isSaving,
  onStartEdit,
  onSave,
  onCancel
}: NewsHeaderProps) {
  return (
    <div className={`${isEditing ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-emerald-600 to-green-600'} p-6`}>
      <div className="flex justify-between items-start">
        <div className="text-white">
          <h1 className="text-2xl font-bold mb-2">
            {isEditing ? '📝 Edit Berita' : '📰 Detail Berita'}
          </h1>
          <p className="text-emerald-100">
            Terakhir diupdate: {formatDate(currentNews.updated_at || currentNews.created_at)}
          </p>
          <p className="text-emerald-100 text-sm mt-1">
            Content blocks: {contentBlocks.length} blok • 🖼️ Maksimal gambar: 10MB
          </p>
        </div>

        {/* Admin Controls - hanya tampil untuk admin */}
        {isAdmin && (
          <div className="flex space-x-2">
            {!isEditing ? (
              <button
                onClick={onStartEdit}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Berita
              </button>
            ) : (
              <>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button
                  onClick={onCancel}
                  disabled={isSaving}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}