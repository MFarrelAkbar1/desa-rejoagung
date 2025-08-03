// components/News/ContentBlockRenderer.tsx - FIXED with NotificationSystem

'use client'

import { useState } from 'react'
import { 
  Edit3, 
  Save, 
  X, 
  Type, 
  Heading, 
  ImageIcon, 
  ChevronUp, 
  ChevronDown, 
  Trash2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from 'lucide-react'
import ImageUpload from '@/components/forms/ImageUpload'
import { ContentBlock } from '@/types/news'
import { useNotifications } from '@/components/notifications/NotificationSystem'

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
  const { confirm } = useNotifications()
  
  const [editingContent, setEditingContent] = useState(block.content)
  const [localEditing, setLocalEditing] = useState(false)
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>(
    (block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left'
  )

  const handleSave = () => {
    if (!onEdit) return
    
    onEdit(block.id || '', editingContent, {
      ...block.style,
      textAlign: block.type !== 'image' ? textAlign : undefined
    })
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setTextAlign((block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left')
    setLocalEditing(false)
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    const confirmMessage = block.type === 'text'
      ? 'Apakah Anda yakin ingin menghapus paragraf ini?'
      : block.type === 'subtitle'
      ? 'Apakah Anda yakin ingin menghapus sub judul ini?'
      : 'Apakah Anda yakin ingin menghapus gambar ini?'
    
    // FIXED: Replace window.confirm with confirm from useNotifications
    const confirmed = await confirm(confirmMessage, 'Konfirmasi Hapus')
    
    if (confirmed) {
      onDelete(block.id || '')
    }
  }

  const getTextAlignmentClass = (align: string) => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      case 'justify': return 'text-justify'
      default: return 'text-left'
    }
  }

  const getAlignmentIcon = (align: string) => {
    switch (align) {
      case 'center': return AlignCenter
      case 'right': return AlignRight
      case 'justify': return AlignJustify
      default: return AlignLeft
    }
  }

  // Admin Controls Component
  const AdminControls = () => {
    if (!showControls) return null

    return (
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex space-x-1">
        {/* Move Up */}
        {!isFirst && onMoveUp && (
          <button
            onClick={() => onMoveUp(block.id || '')}
            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            title="Pindah ke atas"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}
        
        {/* Move Down */}
        {!isLast && onMoveDown && (
          <button
            onClick={() => onMoveDown(block.id || '')}
            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
            title="Pindah ke bawah"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
        
        {/* Edit */}
        {onEdit && (
          <button
            onClick={() => setLocalEditing(true)}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
        
        {/* Delete */}
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  // TEXT BLOCK
  if (block.type === 'text') {
    // If editing mode and local editing is active
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <AdminControls />
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Type className="w-4 h-4" />
                  <span>Edit Paragraf</span>
                </div>
                
                {/* Text Alignment Options */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {['left', 'center', 'right', 'justify'].map((align) => {
                    const IconComponent = getAlignmentIcon(align)
                    return (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align as any)}
                        className={`p-1 rounded transition-colors ${
                          textAlign === align 
                            ? 'bg-white text-emerald-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        title={`Rata ${align === 'left' ? 'kiri' : align === 'center' ? 'tengah' : align === 'right' ? 'kanan' : 'kiri-kanan'}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[120px] text-black placeholder-gray-500 ${getTextAlignmentClass(textAlign)}`}
                placeholder="Tulis paragraf di sini..."
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
          </div>
        </div>
      )
    }

    // Display mode
    return (
      <div className={`relative ${showControls ? 'group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors' : ''}`}>
        <AdminControls />
        
        <div className={showControls ? 'p-6' : 'py-4'}>
          <div className={`${getTextAlignmentClass(block.style?.textAlign || 'justify')}`}>
            <p className="text-gray-700 leading-relaxed m-0">
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Heading className="w-4 h-4" />
                  <span>Edit Sub Judul</span>
                </div>
                
                {/* Text Alignment Options */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {['left', 'center', 'right'].map((align) => {
                    const IconComponent = getAlignmentIcon(align)
                    return (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align as any)}
                        className={`p-1 rounded transition-colors ${
                          textAlign === align 
                            ? 'bg-white text-emerald-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        title={`Rata ${align === 'left' ? 'kiri' : align === 'center' ? 'tengah' : 'kanan'}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold text-black placeholder-gray-500 ${getTextAlignmentClass(textAlign)}`}
                placeholder="Tulis sub judul di sini..."
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
          </div>
        </div>
      )
    }

    // Display mode
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
              
              {/* FIXED: Gunakan ImageUpload component */}
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
          </div>
        </div>
      )
    }

    // Display mode
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
            ) : (
              showControls && (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">
                    Klik untuk menambahkan gambar
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}