// components/forms/ContentBlockEditor.tsx - Fixed Icon conflicts and function signatures
'use client'

import { useState } from 'react'
import { Edit3, Trash2, ChevronUp, ChevronDown, Type, Save, X, Heading, AlignLeft, AlignCenter, AlignRight, AlignJustify, ImageIcon } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { ContentBlock } from '@/types/news'

interface ContentBlockEditorProps {
  block: ContentBlock
  onEdit: (blockId: string, content: string, style?: any) => void
  onDelete: (blockId: string) => void
  onMoveUp: (blockId: string) => void  // Fixed: removed direction parameter
  onMoveDown: (blockId: string) => void  // Fixed: removed direction parameter
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
    if (window.confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
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

  // Subtitle Block Component
  if (block.type === 'subtitle') {
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

        {/* Content */}
        <div className="p-6">
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Heading className="w-4 h-4" />
                <span>Edit Sub Judul</span>
              </div>

              {/* Text Alignment Controls */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-600 mr-2">Perataan:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setTextAlign('left')}
                    className={`p-2 rounded transition-colors ${textAlign === 'left' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
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
                </div>
              </div>

              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
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
            <div className={`${getAlignmentClass(textAlign)}`}>
              <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                {block.content || 'Masukkan sub judul...'}
              </h2>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Text Block Component - Enhanced
  if (block.type === 'text') {
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

        {/* Content */}
        <div className="p-6">
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Type className="w-4 h-4" />
                <span>Edit Paragraf</span>
              </div>

              {/* Text Alignment Controls */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-600 mr-2">Perataan:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setTextAlign('left')}
                    className={`p-2 rounded transition-colors ${textAlign === 'left' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={6}
                placeholder="Masukkan teks..."
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
              <div className={`text-gray-800 leading-relaxed whitespace-pre-wrap ${getAlignmentClass(textAlign)}`}>
                {block.content || 'Masukkan teks...'}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Image Block Component - Enhanced with aspect ratio preservation
  if (block.type === 'image') {
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

        {/* Content */}
        <div className="p-6">
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <ImageIcon className="w-4 h-4" />
                <span>Edit Gambar</span>
              </div>
              
              <ImageUpload
                value={editingContent}
                onChange={setEditingContent}
                label="Upload atau ganti gambar"
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
            <div className="text-center">
              {block.content ? (
                <div className="inline-block max-w-full">
                  <img
                    src={block.content}
                    alt="Content image"
                    className="max-w-full h-auto rounded-lg shadow-sm"
                    style={{
                      objectFit: 'contain',
                      maxHeight: '500px'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo='
                    }}
                  />
                  {/* Optional: Add image caption support */}
                  {block.style?.caption && (
                    <div className="mt-2 text-sm text-gray-600 italic text-center">
                      {block.style.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
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