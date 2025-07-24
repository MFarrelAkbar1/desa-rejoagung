// app/berita/umum/create/page.tsx - MODULAR VERSION
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NewsForm from '@/components/forms/NewsForm'

interface NewsFormData {
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  is_published: boolean
  is_announcement: boolean
  author: string
  content_blocks: any[]
}

export default function CreateBeritaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Simple admin check - bisa diganti dengan useAdminAuth hook
  const [isAdmin, setIsAdmin] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)

  // Uncomment ini jika ingin pakai real auth check
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch("/api/auth/check", {
  //         credentials: 'include'
  //       });
  //       setIsAdmin(response.ok);
  //     } catch (error) {
  //       console.error("Auth check error:", error);
  //       setIsAdmin(false);
  //     } finally {
  //       setAuthLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // Redirect non-admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/berita/umum')
    }
  }, [isAdmin, authLoading, router])

  const handleSubmit = async (formData: NewsFormData) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Judul dan konten wajib diisi')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      console.log('📤 Submitting news data:', formData)
      
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('📥 Response status:', response.status)
      
      if (response.ok) {
        const newNews = await response.json()
        console.log('✅ News created successfully:', newNews)
        
        // Redirect ke detail page
        router.push(`/berita/umum/${newNews.id}`)
      } else {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        setError(errorData.error || 'Gagal menyimpan berita')
      }
    } catch (error) {
      console.error('❌ Network Error:', error)
      setError('Terjadi kesalahan saat menyimpan. Periksa koneksi internet Anda.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/berita/umum')
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat...</p>
          </div>
        </div>
      </div>
    )
  }

  // Non-admin access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Akses Terbatas
            </h1>
            <p className="text-gray-600 mb-6">
              Anda tidak memiliki izin untuk mengakses halaman ini.
            </p>
            <button
              onClick={() => router.push('/berita/umum')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Kembali ke Berita
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <a href="/berita/umum" className="hover:text-emerald-600">
              Berita Umum
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Buat Berita Baru</span>
          </nav>
        </div>

        {/* Main Form */}
        <NewsForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          error={error}
          submitLabel="Simpan Berita"
          title="Buat Berita Baru"
          description="Buat berita dengan konten blok yang dapat dikustomisasi"
        />
      </div>
    </div>
  )
}