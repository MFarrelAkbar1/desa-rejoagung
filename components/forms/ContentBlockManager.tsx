// components/forms/ContentBlockManager.tsx - Fixed function signatures
'use client'

import { Type, ImageIcon, Plus, Heading } from 'lucide-react'
import ContentBlockEditor from './ContentBlockEditor'
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
          Gunakan opsi format untuk mengatur tata letak teks.
        </p>
      </div>

      {/* Content Blocks */}
      <div className="space-y-4">
        {contentBlocks
          .sort((a, b) => a.order_index - b.order_index)
          .map((block, index) => (
            <ContentBlockEditor
              key={block.id || `block-${index}`}
              block={block}
              onEdit={onEditBlock}
              onDelete={onDeleteBlock}
              onMoveUp={handleMoveUp}  // Fixed: use wrapper function
              onMoveDown={handleMoveDown}  // Fixed: use wrapper function
              isFirst={index === 0}
              isLast={index === contentBlocks.length - 1}
              isEditing={isEditing}
              showControls={isEditing}
            />
          ))}
      </div>

      {/* Add Block Buttons - Enhanced */}
      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Tambah Konten Baru
            </h4>
            <div className="flex justify-center space-x-3 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onAddBlock('text')}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Type className="w-4 h-4" />
                Tambah Paragraf
              </button>
              
              <button
                type="button"
                onClick={() => onAddBlock('subtitle')}
                className="flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
              >
                <Heading className="w-4 h-4" />
                Tambah Sub Judul
              </button>
              
              <button
                type="button"
                onClick={() => onAddBlock('image')}
                className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
              >
                <ImageIcon className="w-4 h-4" />
                Tambah Gambar
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              Klik pada konten untuk mengedit secara langsung. Gunakan tombol format untuk mengatur tata letak teks.
            </p>
          </div>
        </div>
      )}

      {/* Info Box - Enhanced */}
      {contentBlocks.length > 0 && isEditing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 mt-0.5">
              ℹ️
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Tips Mengelola Konten:</p>
              <ul className="text-xs space-y-1 text-blue-600">
                <li>• Gunakan tombol ↑↓ untuk mengatur urutan konten</li>
                <li>• Klik pada konten untuk mengedit langsung</li>
                <li>• Pilih alignment (rata kiri/kanan/tengah/justify) untuk teks</li>
                <li>• Sub judul akan tampil besar dan tebal</li>
                <li>• Gambar akan mempertahankan rasio aslinya</li>
                <li>• Konten tambahan akan muncul setelah konten utama</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}