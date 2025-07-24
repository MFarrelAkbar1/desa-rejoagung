// components/forms/ContentBlockManager.tsx
'use client'

import { Type, Image, Plus } from 'lucide-react'
import ContentBlockEditor from './ContentBlockEditor'
import { ContentBlock } from '@/types/news'

interface ContentBlockManagerProps {
  contentBlocks: ContentBlock[]
  onAddBlock: (type: 'text' | 'image') => void
  onEditBlock: (blockId: string, content: string) => void
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
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📝 Konten Tambahan
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Tambahkan blok teks dan gambar untuk memperkaya konten berita Anda.
        </p>
      </div>

      {/* Content Blocks List */}
      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <ContentBlockEditor
            key={block.id}
            block={block}
            onEdit={onEditBlock}
            onDelete={onDeleteBlock}
            onMoveUp={(blockId) => onMoveBlock(blockId, 'up')}
            onMoveDown={(blockId) => onMoveBlock(blockId, 'down')}
            isFirst={index === 0}
            isLast={index === contentBlocks.length - 1}
            isEditing={isEditing}
            showControls={isEditing}
          />
        ))}

        {/* Empty State */}
        {contentBlocks.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-500">
              <Type className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Belum ada konten tambahan</p>
              <p className="text-xs text-gray-400">
                Tambahkan blok teks atau gambar untuk memperkaya berita
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Content Block Buttons */}
      {isEditing && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Tambah Konten Baru
            </h4>
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                onClick={() => onAddBlock('text')}
                className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Type className="w-4 h-4" />
                Tambah Teks
              </button>
              <button
                type="button"
                onClick={() => onAddBlock('image')}
                className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
              >
                <Image className="w-4 h-4" />
                Tambah Gambar
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              Klik pada konten untuk mengedit secara langsung
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
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
                <li>• Gambar akan diupload ke Cloudinary secara otomatis</li>
                <li>• Konten tambahan akan muncul setelah konten utama</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}