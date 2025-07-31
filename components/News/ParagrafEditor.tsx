// components/news/ParagrafEditor.tsx
'use client'

import { useState } from 'react'
import { Edit3, Trash2, ChevronUp, ChevronDown, Type, Save, X, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { ContentBlock } from '@/types/news'

interface ParagrafEditorProps {
  block: ContentBlock
  onEdit: (blockId: string, content: string, style?: any) => void
  onDelete: (blockId: string) => void
  onMoveUp: (blockId: string) => void
  onMoveDown: (blockId: string) => void
  isFirst: boolean
  isLast: boolean
  isEditing?: boolean
  showControls?: boolean
}

export default function ParagrafEditor({
  block,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  isEditing = true,
  showControls = true
}: ParagrafEditorProps) {
  const [editingContent, setEditingContent] = useState(block.content)
  const [localEditing, setLocalEditing] = useState(false)
  const [textAlign, setTextAlign] = useState(block.style?.textAlign || 'left')

  const handleSave = () => {
    onEdit(block.id || '', editingContent, { 
      ...block.style, 
      textAlign 
    })
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setTextAlign(block.style?.textAlign || 'left')
    setLocalEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus paragraf ini?')) {
      onDelete(block.id || '')
    }
  }

  const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      case 'justify': return 'text-justify'
      default: return 'text-left'
    }
  }

  return (
    <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      {/* Admin Controls */}
      {showControls && isEditing && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="flex space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
            {!isFirst && (
              <button
                onClick={() => onMoveUp(block.id || '')}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Pindah ke atas"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
            {!isLast && (
              <button
                onClick={() => onMoveDown(block.id || '')}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Pindah ke bawah"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setLocalEditing(true)}
              className="p-1 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Hapus"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content with Alignment Controls */}
      <div className="p-6">
        {localEditing ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <Type className="w-4 h-4" />
              <span>Edit Paragraf</span>
            </div>

            {/* Text Alignment Controls - Only for Paragraf */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm text-black mr-2">Perataan:</span>
              <div className="flex bg-black rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setTextAlign('left')}
                  className={`p-2 rounded transition-colors ${textAlign === 'left' ? 'bg-black' : 'hover:bg-black'}`}
                  title="Rata Kiri"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTextAlign('center')}
                  className={`p-2 rounded transition-colors ${textAlign === 'center' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Rata Tengah"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTextAlign('right')}
                  className={`p-2 rounded transition-colors ${textAlign === 'right' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Rata Kanan"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTextAlign('justify')}
                  className={`p-2 rounded transition-colors ${textAlign === 'justify' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Rata Kiri-Kanan (Justify)"
                >
                  <AlignJustify className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-900"
              rows={6}
              placeholder="Masukkan teks paragraf..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className={`text-gray-900 leading-relaxed whitespace-pre-wrap ${getAlignmentClass(textAlign)}`}>
              {block.content || 'Masukkan teks paragraf...'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}