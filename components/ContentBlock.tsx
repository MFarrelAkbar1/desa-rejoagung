// components/ContentBlock.tsx - Fixed display component
"use client";

import { useState } from "react";
import { Edit3, Trash2, ChevronUp, ChevronDown, ImageIcon, Type, Save, X, Heading } from "lucide-react";
import { ContentBlock as ContentBlockType } from '../types/news';

interface ContentBlockProps {
  block: ContentBlockType;
  onEdit: (blockId: string, content: string, style?: any) => void;
  onDelete: (blockId: string) => void;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  isEditing: boolean;
  isAdmin: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export default function ContentBlock({
  block,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isEditing,
  isAdmin,
  isFirst,
  isLast
}: ContentBlockProps) {
  const [editingContent, setEditingContent] = useState(block.content);
  const [localEditing, setLocalEditing] = useState(false);

  const handleSave = () => {
    onEdit(block.id || '', editingContent, block.style);
    setLocalEditing(false);
  };

  const handleCancel = () => {
    setEditingContent(block.content);
    setLocalEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
      onDelete(block.id || '');
    }
  };

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      case 'justify': return 'text-justify'
      default: return 'text-left'
    }
  };

  // Subtitle Block Component
  if (block.type === 'subtitle') {
    return (
      <div className="relative group">
        {/* Admin Controls */}
        {isAdmin && isEditing && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
        <div className="my-6">
          {localEditing ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Heading className="w-4 h-4" />
                <span>Edit Sub Judul</span>
              </div>
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={3}
                placeholder="Masukkan sub judul..."
              />
              <div className="flex justify-end space-x-2 mt-3">
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
            <div className={`${getAlignmentClass(block.style?.textAlign)}`}>
              <h2 className="text-2xl font-bold text-gray-800 leading-tight my-6">
                {block.content}
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Text Block Component
  if (block.type === 'text') {
    return (
      <div className="relative group">
        {/* Admin Controls */}
        {isAdmin && isEditing && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
        <div className="my-4">
          {localEditing ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Type className="w-4 h-4" />
                <span>Edit Paragraf</span>
              </div>
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={6}
                placeholder="Masukkan teks..."
              />
              <div className="flex justify-end space-x-2 mt-3">
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
              <div className={`text-gray-800 leading-relaxed whitespace-pre-wrap ${getAlignmentClass(block.style?.textAlign)}`}>
                {block.content}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Image Block Component
  if (block.type === 'image') {
    return (
      <div className="relative group my-6">
        {/* Admin Controls */}
        {isAdmin && isEditing && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
        <div className="text-center">
          {localEditing ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <ImageIcon className="w-4 h-4" />
                <span>Edit Gambar</span>
              </div>
              {/* Add ImageUpload component here if needed */}
              <div className="flex justify-end space-x-2 mt-3">
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
            block.content ? (
              <div className="inline-block max-w-full">
                <img
                  src={block.content}
                  alt="Content image"
                  className="max-w-full h-auto rounded-lg shadow-sm"
                  style={{
                    objectFit: 'contain',
                    maxHeight: '600px',
                    width: 'auto',
                    height: 'auto'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo='
                  }}
                />
                {/* Caption support - now properly typed */}
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
                  Gambar tidak tersedia
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return null;
}