// components/ContentBlock.tsx
"use client";

import { useState } from "react";
import { Edit3, Trash2, ChevronUp, ChevronDown, Image, Type, Save, X } from "lucide-react";
import { ContentBlock as ContentBlockType } from '../types/news';

interface ContentBlockProps {
  block: ContentBlockType;
  onEdit: (blockId: string, content: string) => void;
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
    onEdit(block.id || '', editingContent);
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

  // Text Block Component
  if (block.type === 'text') {
    return (
      <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        {/* Admin Controls */}
        {isAdmin && isEditing && (
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
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit teks"
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

        <div className="p-6">
          {/* Content */}
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Type className="w-4 h-4" />
                <span>Edit Teks</span>
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
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {block.content || 'Masukkan teks...'}
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
      <div className="relative group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
        {/* Admin Controls */}
        {isAdmin && isEditing && (
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
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit gambar"
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

        <div className="p-4">
          {/* Content */}
          {localEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                <Image className="w-4 h-4" />
                <span>Edit URL Gambar</span>
              </div>
              <input
                type="url"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
              {editingContent && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={editingContent}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
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
            <div className="rounded-lg overflow-hidden">
              {block.content ? (
                <img
                  src={block.content}
                  alt="Content image"
                  className="w-full h-auto max-h-96 object-cover mx-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <Image className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Masukkan URL gambar</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}