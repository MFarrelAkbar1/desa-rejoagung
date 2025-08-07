// components/News/ContentBlockRenderer.tsx - FIXED ALIGN BUTTON POSITION

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
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface ContentBlock {
  id?: string
  type: 'text' | 'subtitle' | 'image'
  content: string
  order_index: number
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    fontSize?: 'small' | 'medium' | 'large'
    caption?: string
  }
  created_at?: string
}

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
    (block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 
    (block.type === 'text' ? 'justify' : block.type === 'subtitle' ? 'center' : 'left')
  )

  const handleSave = () => {
    if (!onEdit) return
    
    const newStyle = {
      ...block.style,
      textAlign: block.type === 'text' ? textAlign : (block.type === 'subtitle' ? textAlign : undefined)
    }
    
    console.log('Saving content block with style:', newStyle)
    onEdit(block.id || '', editingContent, newStyle)
    setLocalEditing(false)
  }

  const handleCancel = () => {
    setEditingContent(block.content)
    setTextAlign(
      (block.style?.textAlign as 'left' | 'center' | 'right' | 'justify') || 
      (block.type === 'text' ? 'justify' : block.type === 'subtitle' ? 'center' : 'left')
    )
    setLocalEditing(false)
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    const confirmMessage = block.type === 'text'
      ? 'Apakah Anda yakin ingin menghapus paragraf ini?'
      : block.type === 'subtitle'
      ? 'Apakah Anda yakin ingin menghapus sub judul ini?'
      : 'Apakah Anda yakin ingin menghapus gambar ini?'
    
    const confirmed = await confirm(confirmMessage, 'Konfirmasi Hapus')
    
    if (confirmed) {
      onDelete(block.id || '')
    }
  }

  const getTextAlignmentClass = (align: string) => {
    const alignmentClass = (() => {
      switch (align) {
        case 'center': return 'text-center'
        case 'right': return 'text-right'
        case 'justify': return 'text-justify'
        default: return 'text-left'
      }
    })()
    
    // Debug log
    console.log(`Text alignment for ${block.type}:`, align, '→', alignmentClass)
    return alignmentClass
  }

  const getAlignmentIcon = (align: string) => {
    switch (align) {
      case 'center': return AlignCenter
      case 'right': return AlignRight
      case 'justify': return AlignJustify
      default: return AlignLeft
    }
  }

  // 🚀 FIXED: Admin Controls Component - positioned relative to parent
  const AdminControls = () => {
    if (!showControls) return null

    return (
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex space-x-1">
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

  // 🆕 FIXED: Separate Alignment Controls - moved to top, always visible in edit mode
  const AlignmentControls = () => {
    if (!showControls || !localEditing || block.type === 'image') return null

    return (
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Perataan {block.type === 'text' ? 'Paragraf' : 'Sub Judul'}:
          </span>
          <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-300">
            {['left', 'center', 'right', 'justify'].map((align) => {
              const IconComponent = getAlignmentIcon(align)
              return (
                <button
                  key={align}
                  onClick={() => setTextAlign(align as any)}
                  className={`p-2 rounded transition-colors ${
                    textAlign === align
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  title={`Rata ${align === 'left' ? 'kiri' : align === 'center' ? 'tengah' : align === 'right' ? 'kanan' : 'justify'}`}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // TEXT BLOCK
  if (block.type === 'text') {
    // If editing mode and local editing is active
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          {/* Header with controls */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Type className="w-4 h-4" />
              <span className="font-medium">Edit Paragraf</span>
            </div>
            <AdminControls />
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* 🚀 FIXED: Alignment Controls moved to top, always visible */}
              <AlignmentControls />
              
              {/* Text Editor */}
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none min-h-[120px] text-gray-900 bg-white ${getTextAlignmentClass(textAlign)}`}
                placeholder="Tulis paragraf di sini... Gunakan enter 2x untuk membuat paragraf baru."
                rows={6}
              />
              
              {/* Action buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 border border-gray-300"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
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

    // Display mode (both for view and edit mode when not locally editing)
    return (
      <div className="relative group">
        {/* Content with controls in same line */}
        <div className="flex justify-between items-start gap-4">
          <div className={`flex-1 prose prose-lg max-w-none text-gray-700 leading-relaxed ${getTextAlignmentClass(block.style?.textAlign || 'justify')}`}>
            {/* 🚀 FIXED: Better paragraph rendering with proper spacing */}
            {block.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null
              return (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )
            })}
          </div>
          {/* Admin controls aligned with content */}
          {showControls && (
            <div className="flex-shrink-0">
              <AdminControls />
            </div>
          )}
        </div>
      </div>
    )
  }

  // SUBTITLE BLOCK
  if (block.type === 'subtitle') {
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          {/* Header with controls */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Heading className="w-4 h-4" />
              <span className="font-medium">Edit Sub Judul</span>
            </div>
            <AdminControls />
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* 🚀 FIXED: Alignment Controls untuk subtitle juga */}
              <AlignmentControls />
              
              <input
                type="text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold text-gray-900 bg-white ${getTextAlignmentClass(textAlign)}`}
                placeholder="Masukkan sub judul..."
              />
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 border border-gray-300"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
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

    return (
      <div className="relative group">
        {/* Content with controls in same line */}
        <div className="flex justify-between items-center gap-4">
          <h3 className={`flex-1 text-xl font-semibold text-gray-900 my-6 ${getTextAlignmentClass(block.style?.textAlign || 'center')}`}>
            {block.content}
          </h3>
          {/* Admin controls aligned with subtitle */}
          {showControls && (
            <div className="flex-shrink-0">
              <AdminControls />
            </div>
          )}
        </div>
      </div>
    )
  }

  // IMAGE BLOCK
  if (block.type === 'image') {
    if (showControls && isEditing && localEditing && onEdit) {
      return (
        <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          {/* Header with controls */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <ImageIcon className="w-4 h-4" />
              <span className="font-medium">Edit Gambar</span>
              <span className="text-emerald-600 text-xs">• Maksimal 10MB</span>
            </div>
            <AdminControls />
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <ImageUpload
                value={editingContent}
                onChange={(url) => setEditingContent(url)}
                label="Upload Gambar Baru"
                className="w-full"
              />
              
              {editingContent && (
                <div className="mt-4">
                  <img
                    src={editingContent}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm bg-gray-50"
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 border border-gray-300"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
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

    return (
      <div className="relative group">
        {/* Image with controls in top-right */}
        <div className="relative">
          {block.content && (
            <div className="my-6">
              <img
                src={block.content}
                alt={block.style?.caption || "Gambar"}
                className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm bg-gray-50"
              />
              {block.style?.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {block.style.caption}
                </p>
              )}
            </div>
          )}
          {/* Admin controls positioned at top-right of image */}
          {showControls && (
            <div className="absolute top-2 right-2">
              <AdminControls />
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}