// app/berita/umum/[id]/components/NewsEditor.tsx - Edit Component

'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Save, X, Settings } from 'lucide-react'
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface NewsDetail {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
  slug?: string
  created_at: string
  updated_at?: string
}

interface NewsEditorProps {
  news: NewsDetail
  onSave: (updatedNews: NewsDetail) => void
  onCancel: () => void
}

export default function NewsEditor({ news, onSave, onCancel }: NewsEditorProps) {
  const params = useParams()
  const { showError, confirm } = useNotifications()
  
  const [editedNews, setEditedNews] = useState<NewsDetail>({ ...news })
  const [isSaving, setIsSaving] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)
      
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedNews.title,
          content: editedNews.content,
          excerpt: editedNews.excerpt,
          image_url: editedNews.image_url,
          is_published: editedNews.is_published,
          is_announcement: editedNews.is_announcement,
        }),
      })

      if (!response.ok) {
        throw new Error('Gagal menyimpan perubahan')
      }

      const updatedNews = await response.json()
      onSave(updatedNews)
    } catch (error) {
      console.error('Error saving news:', error)
      showError(error instanceof Error ? error.message : 'Gagal menyimpan perubahan')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = async () => {
    const confirmed = await confirm(
      'Apakah Anda yakin ingin membatalkan perubahan?',
      'Konfirmasi Pembatalan'
    )
    
    if (confirmed) {
      onCancel()
    }
  }

  return (
    <>
      {/* Loading Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Menyimpan perubahan...</p>
            <p className="text-gray-500 text-sm mt-2">Mohon tunggu, jangan tutup halaman ini</p>
          </div>
        </div>
      )}

      {/* Main Editor */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex justify-between items-start">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-2">📝 Edit Berita</h1>
              <p className="text-blue-100">
                Terakhir diupdate: {formatDate(news.updated_at || news.created_at)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-8">
            {/* Publication Settings */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                📤 Pengaturan Publikasi
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Published Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={editedNews.is_published}
                    onChange={(e) => setEditedNews({
                      ...editedNews,
                      is_published: e.target.checked
                    })}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
                    Publikasikan berita sekarang
                  </label>
                </div>
                
                {/* Announcement Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_announcement"
                    checked={editedNews.is_announcement}
                    onChange={(e) => setEditedNews({
                      ...editedNews,
                      is_announcement: e.target.checked
                    })}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <label htmlFor="is_announcement" className="ml-3 text-sm font-medium text-gray-700">
                    Tandai sebagai pengumuman penting
                  </label>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Status saat ini:</strong> {editedNews.is_published ? 
                    '✅ Dipublikasikan' : '⏳ Draft'} 
                  {editedNews.is_announcement && ' • 📢 Pengumuman Penting'}
                </p>
              </div>
            </div>

            {/* Title Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita
              </label>
              <input
                type="text"
                value={editedNews.title}
                onChange={(e) => setEditedNews({
                  ...editedNews,
                  title: e.target.value
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Masukkan judul berita..."
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Isi Berita
              </label>
              <textarea
                value={editedNews.content}
                onChange={(e) => setEditedNews({
                  ...editedNews,
                  content: e.target.value
                })}
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Tulis isi berita di sini..."
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Tip: Gunakan baris baru untuk membuat paragraf terpisah
              </p>
            </div>

            {/* Excerpt Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ringkasan Berita (Opsional)
              </label>
              <textarea
                value={editedNews.excerpt || ''}
                onChange={(e) => setEditedNews({
                  ...editedNews,
                  excerpt: e.target.value
                })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ringkasan singkat untuk preview berita..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}