// app/berita/umum/components/NewsContentBlocks.tsx

import { Type, ImageIcon, Heading } from 'lucide-react'
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
}

interface NewsContentBlocksProps {
  contentBlocks: ContentBlock[]
  onAddContentBlock: (type: 'text' | 'subtitle' | 'image') => void
  onEditContentBlock: (blockId: string, content: string, style?: any) => void
  onDeleteContentBlock: (blockId: string) => void
  onMoveContentBlock: (blockId: string, direction: 'up' | 'down') => void
}

export default function NewsContentBlocks({
  contentBlocks,
  onAddContentBlock,
  onEditContentBlock,
  onDeleteContentBlock,
  onMoveContentBlock
}: NewsContentBlocksProps) {
  return (
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
  )
}