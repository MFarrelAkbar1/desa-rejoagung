// app/produk-kuliner/kuliner/page.tsx - UPDATED
'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useAdminAuth } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Import enhanced components (REMOVED KulinerInfo)
import {
  KulinerPageHeader,
  KulinerStats,
  KulinerFilter
} from './components'

// Import enhanced grid
import KulinerGrid from './components/KulinerGrid'

// Import modals
import CreateKulinerModal from './components/CreateKulinerModal'
import EditKulinerModal from './components/EditKulinerModal'
import DeleteConfirmation from '@/components/DeleteConfirmation'

interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image_url?: string
  rating?: number
  is_signature: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact?: string
  created_at: string
  updated_at: string
}

function KulinerPageContent() {
  const { isAdmin } = useAdminAuth()
  const searchParams = useSearchParams()
 
  // Simple states
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSignatureOnly, setShowSignatureOnly] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState('')
 
  // Admin states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingItem, setEditingItem] = useState<CulinaryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<CulinaryItem | null>(null)

  // Check for edit parameter from detail page
  useEffect(() => {
    const editId = searchParams?.get('edit')
    if (editId && isAdmin) {
      // Find and set editing item
      const itemToEdit = culinaryItems.find(item => item.id === editId)
      if (itemToEdit) {
        setEditingItem(itemToEdit)
      }
    }
  }, [searchParams, culinaryItems, isAdmin])

  // Fetch data from API
  const fetchCulinaryData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/culinary')
      if (response.ok) {
        const data = await response.json()
        setCulinaryItems(data)
      }
    } catch (error) {
      console.error('Error fetching culinary data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCulinaryData()
  }, [])

  // Filter data (REMOVED searchQuery filter since we removed search bar)
  const filteredData = useMemo(() => {
    return culinaryItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSignature = !showSignatureOnly || item.is_signature
     
      return matchesCategory && matchesSignature
    })
  }, [culinaryItems, selectedCategory, showSignatureOnly])

  // CRUD Handlers
  const handleCreateSuccess = () => {
    fetchCulinaryData()
    setShowCreateModal(false)
  }

  const handleEditSuccess = () => {
    fetchCulinaryData()
    setEditingItem(null)
    // Clear URL parameter
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/produk-kuliner/kuliner')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return
   
    try {
      const response = await fetch(`/api/culinary/${deletingItem.id}`, {
        method: 'DELETE'
      })
     
      if (response.ok) {
        fetchCulinaryData()
        setDeletingItem(null)
      } else {
        alert('Gagal menghapus menu kuliner')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Terjadi kesalahan saat menghapus')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: 'Produk & Kuliner', href: '/produk-kuliner' },
              { label: 'Kuliner', href: '/produk-kuliner/kuliner' },
            ]}
          />
        </div>
      </div>

      {/* Page Header */}
      <KulinerPageHeader
        isAdmin={isAdmin}
        totalItems={culinaryItems.length}
        filteredCount={filteredData.length}
        onAddKuliner={() => setShowCreateModal(true)}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics */}
        <KulinerStats items={culinaryItems} />

        {/* Filter Section */}
        <KulinerFilter
          selectedCategory={selectedCategory}
          showSignatureOnly={showSignatureOnly}
          filteredCount={filteredData.length}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onSignatureToggle={() => setShowSignatureOnly(!showSignatureOnly)}
          onSearchChange={setSearchQuery}
        />

        {/* Enhanced Content Grid */}
        <KulinerGrid
          items={filteredData}
          loading={loading}
          isAdmin={isAdmin}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
        />

        {/* REMOVED KulinerInfo component */}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateKulinerModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editingItem && (
        <EditKulinerModal
          item={editingItem}
          onClose={() => {
            setEditingItem(null)
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, '', '/produk-kuliner/kuliner')
            }
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Fixed DeleteConfirmation usage - Custom Modal */}
      {deletingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 p-6 border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-800">Hapus Menu Kuliner</h3>
                </div>
                <button
                  onClick={() => setDeletingItem(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Apakah Anda yakin ingin menghapus "{deletingItem.name}"? Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Peringatan:</p>
                    <p>Data yang dihapus tidak dapat dikembalikan.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeletingItem(null)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function KulinerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <KulinerPageContent />
    </Suspense>
  )
}