// app/berita/umum/components/NewsEditForm.tsx

import { Type, ImageIcon, Heading, Settings } from 'lucide-react'
import ImageUpload from '@/components/forms/ImageUpload'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'

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

interface NewsEditFormProps {
  editedNews: NewsDetail
  setEditedNews: (news: NewsDetail) => void
  contentBlocks: ContentBlock[]
  onAddContentBlock: (type: 'text' | 'subtitle' | 'image') => void
  onEditContentBlock: (blockId: string, content: string, style?: any) => void
  onDeleteContentBlock: (blockId: string) => void
  onMoveContentBlock: (blockId: string, direction: 'up' | 'down') => void
}

export default function NewsEditForm({
  editedNews,
  setEditedNews,
  contentBlocks,
  onAddContentBlock,
  onEditContentBlock,
  onDeleteContentBlock,
  onMoveContentBlock
}: NewsEditFormProps) {
  return (
    <div className="space-y-8">
      {/* 📤 PENGATURAN PUBLIKASI */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          📤 Pengaturan Publikasi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Published Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              checked={editedNews.is_published}
              onChange={(e) => setEditedNews({
                ...editedNews,
                is_published: e.target.checked
              })}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
            />
            <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
              Publikasikan berita sekarang
            </label>
          </div>
          
          {/* Announcement Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_announcement"
              checked={editedNews.is_announcement}
              onChange={(e) => setEditedNews({
                ...editedNews,
                is_announcement: e.target.checked
              })}
              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
            />
            <label htmlFor="is_announcement" className="ml-3 text-sm font-medium text-gray-700">
              Tandai sebagai pengumuman penting
            </label>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Status saat ini:</strong> {editedNews.is_published ? 
              '✅ Dipublikasikan' : '⏳ Draft'} 
            {editedNews.is_announcement && ' • 📢 Pengumuman Penting'}
          </p>
        </div>
      </div>

      {/* 📰 INFORMASI DASAR BERITA */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
          📰 Informasi Dasar Berita
        </h2>
        
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Berita *
            </label>
            <input
              type="text"
              value={editedNews.title}
              onChange={(e) => setEditedNews({
                ...editedNews,
                title: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-lg"
              placeholder="Masukkan judul berita yang menarik..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Isi Berita Utama *
            </label>
            <textarea
              value={editedNews.content}
              onChange={(e) => setEditedNews({
                ...editedNews,
                content: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
              rows={12}
              placeholder="Tulis isi berita utama di sini..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan Berita (Excerpt)
            </label>
            <textarea
              value={editedNews.excerpt || ''}
              onChange={(e) => setEditedNews({
                ...editedNews,
                excerpt: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
              rows={3}
              placeholder="Ringkasan singkat yang akan muncul di daftar berita (opsional)"
            />
          </div>

          {/* Enhanced Gambar Utama dengan 10MB Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Utama Berita
              <span className="text-emerald-600 text-xs ml-2">• Maksimal 10MB</span>
            </label>
            <ImageUpload
              value={editedNews.image_url || ''}
              onChange={(url) => setEditedNews({
                ...editedNews,
                image_url: url
              })}
              label=""
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Format yang didukung: JPG, PNG, WEBP, GIF • Ukuran maksimal: 10MB
            </p>
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={editedNews.category || ''}
                onChange={(e) => setEditedNews({
                  ...editedNews,
                  category: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
                placeholder="Kategori berita..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis *
              </label>
              <input
                type="text"
                value={editedNews.author}
                onChange={(e) => setEditedNews({
                  ...editedNews,
                  author: e.target.value
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
                placeholder="Nama penulis..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* 📝 CONTENT BLOCKS SECTION */}
      <div className="space-y-6">
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
            📝 Konten Tambahan ({contentBlocks.length} blok)
            <span className="text-emerald-600 text-sm">• Gambar maks. 10MB</span>
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Tambahkan blok teks, sub judul, dan gambar untuk memperkaya konten berita Anda.
            <span className="text-emerald-600 font-medium"> ✨ Paragraf otomatis justify untuk hasil yang rapi.</span>
          </p>
          
          {/* Add Content Block Buttons */}
          <div className="flex space-x-3 mb-6">
            <button
              type="button"
              onClick={() => onAddContentBlock('text')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Type className="w-4 h-4" />
              Tambah Paragraf
            </button>
            <button
              type="button"
              onClick={() => onAddContentBlock('subtitle')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Heading className="w-4 h-4" />
              Tambah Sub Judul
            </button>
            <button
              type="button"
              onClick={() => onAddContentBlock('image')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Tambah Gambar (10MB max)
            </button>
          </div>

          {/* Content Blocks List */}
          {contentBlocks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">Belum ada content blocks</p>
              <p className="text-sm">Gunakan tombol di atas untuk menambahkan konten tambahan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contentBlocks.map((block, index) => (
                <div key={block.id || `block-${index}`} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Block #{index + 1}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        block.type === 'text' ? 'bg-blue-100 text-blue-800' :
                        block.type === 'subtitle' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {block.type === 'text' ? '📝 Paragraf' :
                         block.type === 'subtitle' ? '📋 Sub Judul' : '🖼️ Gambar (10MB max)'}
                      </span>
                    </div>
                  </div>

                  <ContentBlockRenderer
                    block={block}
                    isEditing={true}
                    showControls={true}
                    onEdit={(blockId, content, style) => onEditContentBlock(blockId, content, style)}
                    onDelete={(blockId) => onDeleteContentBlock(blockId)}
                    onMoveUp={(blockId) => onMoveContentBlock(blockId, 'up')}
                    onMoveDown={(blockId) => onMoveContentBlock(blockId, 'down')}
                    isFirst={index === 0}
                    isLast={index === contentBlocks.length - 1}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Content Statistics */}
          {contentBlocks.length > 0 && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="text-emerald-800">
                  <strong>Statistik Konten:</strong>
                </div>
                <div className="flex space-x-4 text-emerald-700">
                  <span>
                    📝 {contentBlocks.filter(b => b.type === 'text').length} Paragraf (Auto Justify)
                  </span>
                  <span>
                    📖 {contentBlocks.filter(b => b.type === 'subtitle').length} Sub Judul
                  </span>
                  <span>
                    🖼️ {contentBlocks.filter(b => b.type === 'image').length} Gambar (Max 10MB)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}