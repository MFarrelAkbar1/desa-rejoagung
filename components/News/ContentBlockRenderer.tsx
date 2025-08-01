// components/News/ContentBlockRenderer.tsx - Updated to support TextAlignmentControl styles

'use client'

import { useState } from 'react'
import { 
  Edit3, 
  Save, 
  X, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Type, 
  Heading, 
  ImageIcon,
  Link as LinkIcon
} from 'lucide-react'

import TextAlignmentControl, { getTextAlignmentClass } from '@/components/forms/TextAlignmentControl'
import { ContentBlock } from '@/types/news'

interface ContentBlockRendererProps {
  block: ContentBlock
  onEdit?: (blockId: string, content: string, style?: any) => void
  onDelete?: (blockId: string) => void
  onMoveUp?: (blockId: string) => void
  onMoveDown?: (blockId: string) => void
  isFirst?: boolean
  isLast?: boolean
  isEditing?: boolean
  showControls?: boolean
}

export default function ContentBlockRenderer({
  block,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  isEditing = false,
  showControls = false
}: ContentBlockRendererProps) {
  const [editingContent, setEditingContent] = useState(block.content)
  const [localEditing, setLocalEditing] = useState(false)
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>(
    (block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left'
  )
  const [imageUrl, setImageUrl] = useState('')

  const handleSave = () => {
    if (!onEdit) return
    
    const newContent = block.type === 'image' ? imageUrl : editingContent
    onEdit(block.id || '', newContent, {
      ...block.style,
      textAlign: block.type !== 'image' ? textAlign : undefined
    })
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setTextAlign((block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left')
    setImageUrl('')
    setLocalEditing(false)
  }

  const handleDelete = () => {
    if (!onDelete) return
    
    const confirmMessage = block.type === 'text' 
      ? 'Apakah Anda yakin ingin menghapus paragraf ini?'
      : block.type === 'subtitle' 
      ? 'Apakah Anda yakin ingin menghapus sub judul ini?'
      : 'Apakah Anda yakin ingin menghapus gambar ini?'
    
    if (window.confirm(confirmMessage)) {
      onDelete(block.id || '')
    }
  }

  // Admin Control Buttons Component
  const AdminControls = () => showControls && isEditing && (
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <div className="flex space-x-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
        {!isFirst && onMoveUp && (
          <button
            onClick={() => onMoveUp(block.id || '')}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Pindah ke atas"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}
        {!isLast && onMoveDown && (
          <button
            onClick={() => onMoveDown(block.id || '')}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Pindah ke bawah"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => setLocalEditing(true)}
            className="p-1 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  // TEXT/PARAGRAPH BLOCK
  if (block.type === 'text') {
    // If editing mode and local editing is active
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <AdminControls />
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Type className="w-4 h-4" />
                <span>Edit Paragraf</span>
              </div>
              
              {/* Text Alignment Control using TextAlignmentControl */}
              <TextAlignmentControl
                value={textAlign}
                onChange={setTextAlign}
                label="Perataan Teks"
                size="sm"
                className="mb-3"
              />
              
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 resize-none ${getTextAlignmentClass(textAlign)}`}
                rows={4}
                placeholder="Tulis paragraf di sini..."
              />
              
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Display mode or view mode
    return (
      <div className={`relative ${showControls ? 'group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors' : ''}`}>
        <AdminControls />
        
        <div className={showControls ? 'p-6' : 'py-2'}>
          <div className={`prose max-w-none ${getTextAlignmentClass(block.style?.textAlign || 'left')}`}>
            <p className="text-gray-900 leading-relaxed whitespace-pre-wrap m-0 text-base">
              {block.content || (showControls ? 'Klik untuk menambahkan paragraf...' : '')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // SUBTITLE BLOCK
  if (block.type === 'subtitle') {
    // If editing mode and local editing is active
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <AdminControls />
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Heading className="w-4 h-4" />
                <span>Edit Sub Judul</span>
              </div>
              
              {/* Text Alignment Control using TextAlignmentControl */}
              <TextAlignmentControl
                value={textAlign}
                onChange={setTextAlign}
                label="Perataan Sub Judul"
                size="sm"
                className="mb-3"
              />
              
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-semibold text-lg ${getTextAlignmentClass(textAlign)}`}
                placeholder="Masukkan sub judul..."
              />
              
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Display mode or view mode
    return (
      <div className={`relative ${showControls ? 'group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors' : ''}`}>
        <AdminControls />
        
        <div className={showControls ? 'p-6' : 'py-4'}>
          <div className={`${getTextAlignmentClass(block.style?.textAlign || 'left')}`}>
            <h3 className="text-xl font-bold text-gray-900 m-0 leading-tight">
              {block.content || (showControls ? 'Klik untuk menambahkan sub judul...' : '')}
            </h3>
          </div>
        </div>
      </div>
    )
  }

  // IMAGE BLOCK
  if (block.type === 'image') {
    // If editing mode and local editing is active
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <AdminControls />
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <ImageIcon className="w-4 h-4" />
                <span>Edit Gambar</span>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  URL Gambar
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl(imageUrl)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Preview gambar"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Preview gambar jika URL valid */}
                {imageUrl && (
                  <div className="mt-3">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-w-full h-auto max-h-48 rounded-lg border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Display mode or view mode
    return (
      <div className={`relative ${showControls ? 'group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors' : ''}`}>
        <AdminControls />
        
        <div className={showControls ? 'p-6' : 'py-4'}>
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
                    (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo='
                  }}
                />
                {/* Optional: Add image caption support */}
                {block.style?.caption && (
                  <div className="mt-2 text-sm text-gray-600 italic text-center">
                    {block.style.caption}
                  </div>
                )}
              </div>
            ) : showControls ? (
              <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">
                  Klik untuk menambahkan gambar
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return null
}