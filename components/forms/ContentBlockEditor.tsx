// components/forms/ContentBlockEditor.tsx
'use client'

import { useState } from 'react'
import { Edit3, Trash2, ChevronUp, ChevronDown, Type, Save, X } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { ContentBlock } from '@/types/news'

interface ContentBlockEditorProps {
  block: ContentBlock
  onEdit: (blockId: string, content: string) => void
  onDelete: (blockId: string) => void
  onMoveUp: (blockId: string) => void
  onMoveDown: (blockId: string) => void
  isFirst: boolean
  isLast: boolean
  isEditing?: boolean
  showControls?: boolean
}

export default function ContentBlockEditor({
  block,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  isEditing = true,
  showControls = true
}: ContentBlockEditorProps) {
  const [editingContent, setEditingContent] = useState(block.content)
  const [localEditing, setLocalEditing] = useState(false)

  const handleSave = () => {
    onEdit(block.id || '', editingContent)
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setLocalEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
      onDelete(block.id || '')
    }
  }

  // Text Block
  if (block.type === 'text') {
    return (
      <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        {/* Controls */}
        {showControls && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="flex space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
              {!isFirst && (
                <button
                  type="button"
                  onClick={() => onMoveUp(block.id || '')}
                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Pindah ke atas"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}
              {!isLast && (
                <button
                  type="button"
                  onClick={() => onMoveDown(block.id || '')}
                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Pindah ke bawah"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setLocalEditing(!localEditing)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit teks"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Type className="w-4 h-4" />
            <span>Blok Teks</span>
          </div>

          {/* Content */}
          {localEditing ? (
            <div className="space-y-4">
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-900"
                rows={6}
                placeholder="Masukkan teks..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="prose prose-lg max-w-none cursor-pointer"
              onClick={() => isEditing && setLocalEditing(true)}
            >
              <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                {block.content || (
                  <span className="text-gray-400 italic">
                    Klik untuk menambahkan teks...
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Image Block
  if (block.type === 'image') {
    return (
      <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        {/* Controls */}
        {showControls && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="flex space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
              {!isFirst && (
                <button
                  type="button"
                  onClick={() => onMoveUp(block.id || '')}
                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Pindah ke atas"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}
              {!isLast && (
                <button
                  type="button"
                  onClick={() => onMoveDown(block.id || '')}
                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Pindah ke bawah"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setLocalEditing(!localEditing)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit gambar"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="p-4">
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Type className="w-4 h-4" />
                <span>Edit Gambar</span>
              </div>
              
              <ImageUpload
                value={editingContent}
                onChange={setEditingContent}
                label="Ganti Gambar"
              />
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="rounded-lg overflow-hidden cursor-pointer"
              onClick={() => isEditing && setLocalEditing(true)}
            >
              {block.content ? (
                <img
                  src={block.content}
                  alt="Content image"
                  className="w-full h-auto max-h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo='
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <Type className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">
                    Klik untuk menambahkan gambar
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}