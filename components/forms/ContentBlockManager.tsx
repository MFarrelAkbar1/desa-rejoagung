// components/forms/ContentBlockManager.tsx - FIXED dengan ImageUpload yang benar

'use client'

import { Type, ImageIcon, Plus, Heading, Info } from 'lucide-react'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'
import { ContentBlock } from '@/types/news'

interface ContentBlockManagerProps {
  contentBlocks: ContentBlock[]
  onAddBlock: (type: 'text' | 'subtitle' | 'image') => void
  onEditBlock: (blockId: string, content: string, style?: any) => void
  onDeleteBlock: (blockId: string) => void
  onMoveBlock: (blockId: string, direction: 'up' | 'down') => void
  isEditing?: boolean
}

export default function ContentBlockManager({
  contentBlocks,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
  onMoveBlock,
  isEditing = true
}: ContentBlockManagerProps) {

  // Helper functions to handle move operations
  const handleMoveUp = (blockId: string) => {
    onMoveBlock(blockId, 'up')
  }

  const handleMoveDown = (blockId: string) => {
    onMoveBlock(blockId, 'down')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📝 Konten Tambahan
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Tambahkan blok teks, sub judul, dan gambar untuk memperkaya konten berita Anda.
          <span className="text-emerald-600 font-medium"> ✨ Paragraf otomatis justify untuk hasil yang rapi.</span>
        </p>
      </div>

      {/* Add Block Buttons */}
      {isEditing && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Tambah Konten Baru</h4>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onAddBlock('text')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Type className="w-4 h-4" />
              Tambah Paragraf
            </button>
            <button
              type="button"
              onClick={() => onAddBlock('subtitle')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Heading className="w-4 h-4" />
              Tambah Sub Judul
            </button>
            {/* FIXED: Tambah Gambar - akan menggunakan ImageUpload component */}
            <button
              type="button"
              onClick={() => onAddBlock('image')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              Tambah Gambar (JPG/PNG/WEBP)
            </button>
          </div>
          
          {/* Informational Box */}
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium text-emerald-800 mb-1">Jenis Konten Tersedia:</h5>
                <ul className="text-xs text-emerald-700 space-y-1">
                  <li>• <strong>Paragraf</strong>: Otomatis rata kanan-kiri (justify) untuk hasil rapi</li>
                  <li>• <strong>Sub Judul</strong>: Judul bagian dengan formatting tebal</li>
                  <li>• <strong>Gambar</strong>: Upload file atau URL yang akan dikonversi ke JPG/PNG/WEBP</li>
                  <li>• Gunakan tombol panah untuk mengatur urutan konten</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Blocks */}
      <div className="space-y-4">
        {contentBlocks
          .sort((a, b) => a.order_index - b.order_index)
          .map((block, index) => (
            <ContentBlockRenderer
              key={block.id || `block-${index}`}
              block={block}
              onEdit={onEditBlock}
              onDelete={onDeleteBlock}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              isFirst={index === 0}
              isLast={index === contentBlocks.length - 1}
              isEditing={isEditing}
              showControls={isEditing}
            />
          ))}
      </div>

      {/* Empty State */}
      {contentBlocks.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-gray-500" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada konten tambahan
          </h4>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Mulai menambahkan paragraf, sub judul, atau gambar untuk memperkaya artikel Anda.
          </p>
          
          {isEditing && (
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                onClick={() => onAddBlock('text')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Type className="w-4 h-4" />
                Tambah Paragraf
              </button>
              <button
                type="button"
                onClick={() => onAddBlock('subtitle')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Heading className="w-4 h-4" />
                Tambah Sub Judul
              </button>
              <button
                type="button"
                onClick={() => onAddBlock('image')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                Tambah Gambar
              </button>
            </div>
          )}

          {/* Quick Tips for Empty State */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Tips Konten Tambahan:</h5>
              <ul className="text-xs text-blue-700 space-y-1 text-left">
                <li>• Gunakan sub judul untuk membagi topik</li>
                <li>• Paragraf akan otomatis ter-justify untuk tampilan rapi</li>
                <li>• Tambahkan gambar untuk memperkaya visual</li>
                <li>• Atur urutan dengan tombol panah ↑↓</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content Statistics */}
      {contentBlocks.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
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
                🖼️ {contentBlocks.filter(b => b.type === 'image').length} Gambar
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}