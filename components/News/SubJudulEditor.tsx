// components/news/SubJudulEditor.tsx
'use client'

import { useState } from 'react'
import { Edit3, Trash2, ChevronUp, ChevronDown, Heading, Save, X } from 'lucide-react'
import { ContentBlock } from '@/types/news'

interface SubJudulEditorProps {
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

export default function SubJudulEditor({
  block,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  isEditing = true,
  showControls = true
}: SubJudulEditorProps) {
  const [editingContent, setEditingContent] = useState(block.content)
  const [localEditing, setLocalEditing] = useState(false)

  const handleSave = () => {
    onEdit(block.id || '', editingContent, block.style)
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setLocalEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus sub judul ini?')) {
      onDelete(block.id || '')
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

      {/* Content - No alignment controls for subtitle */}
      <div className="p-6">
        {localEditing ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <Heading className="w-4 h-4" />
              <span>Edit Sub Judul</span>
            </div>

            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-900"
              rows={3}
              placeholder="Masukkan sub judul..."
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
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {block.content || 'Masukkan sub judul...'}
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}