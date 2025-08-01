// components/forms/ContentBlockManager.tsx - SIMPLIFIED dengan auto justify

'use client'

import { Type, ImageIcon, Plus, Heading, Info } from 'lucide-react'
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
          <span className="text-emerald-600 font-medium"> ✨ Paragraf otomatis justify untuk hasil yang rapi.</span>
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
            <span className="text-emerald-600 font-medium block mt-1">✨ Paragraf otomatis rata kanan-kiri!</span>
          </p>
        </div>
      )}

      {/* Add Block Buttons - Enhanced */}
      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Tambah Konten Baru
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {/* Add Paragraph Button */}
              <button
                type="button"
                onClick={() => onAddBlock('text')}
                className="group flex flex-col items-center gap-3 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="p-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors">
                  <Type className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium">Tambah Paragraf</div>
                  <div className="text-xs opacity-90 mt-1">
                    ✨ Otomatis justify
                  </div>
                </div>
              </button>

              {/* Add Subtitle Button */}
              <button
                type="button"
                onClick={() => onAddBlock('subtitle')}
                className="group flex flex-col items-center gap-3 p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="p-2 bg-purple-400 rounded-full group-hover:bg-purple-300 transition-colors">
                  <Heading className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium">Tambah Sub Judul</div>
                  <div className="text-xs opacity-90 mt-1">
                    Judul bagian
                  </div>
                </div>
              </button>

              {/* Add Image Button */}
              <button
                type="button"
                onClick={() => onAddBlock('image')}
                className="group flex flex-col items-center gap-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <div className="p-2 bg-green-400 rounded-full group-hover:bg-green-300 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="font-medium">Tambah Gambar</div>
                  <div className="text-xs opacity-90 mt-1">
                    Gambar dari URL
                  </div>
                </div>
              </button>
            </div>

            {/* SIMPLIFIED Info Box */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h5 className="text-sm font-medium text-emerald-800 mb-1">
                    ✨ Auto Justify Content:
                  </h5>
                  <ul className="text-xs text-emerald-700 space-y-1">
                    <li>• <strong>Paragraf</strong>: Otomatis rata kanan-kiri (justify) untuk hasil rapi</li>
                    <li>• <strong>Sub Judul</strong>: Judul bagian dengan formatting tebal</li>
                    <li>• <strong>Gambar</strong>: Upload dari URL dengan preview</li>
                    <li>• Gunakan tombol panah untuk mengatur urutan konten</li>
                  </ul>
                </div>
              </div>
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