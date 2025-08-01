// app/produk-kuliner/kuliner/page.tsx - FIXED VERSION (Compatible with existing components)

'use client'

import { useState, useEffect, useMemo, Suspense, useCallback } from 'react'
import { useAdminAuth } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Import existing components (using their original props)
import {
  KulinerPageHeader,
  KulinerStats,
  KulinerFilter
} from './components'

// Import modals
import CreateKulinerModal from './components/CreateKulinerModal'
import EditKulinerModal from './components/EditKulinerModal'

// Import the new optimized grid component
import OptimizedKulinerGrid from './components/OptimizedKulinerGrid'

// Use the existing CulinaryItem interface from types
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
  updated_at: string // Keep this to match existing interface
}

// Enhanced Loading Component
function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-64"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Loading */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-96 mx-auto"></div>
        </div>
        
        {/* Stats Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        
        {/* Filter Loading */}
        <div className="bg-white rounded-lg p-6 mb-8 animate-pulse">
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
        </div>
        
        {/* Grid Loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Content Component
function KulinerPageContent() {
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  const searchParams = useSearchParams()

  // Data states
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingItem, setEditingItem] = useState<CulinaryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<CulinaryItem | null>(null)

  // Filter states - compatible with existing KulinerFilter
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSignatureOnly, setShowSignatureOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // Add this for KulinerFilter

  // Optimized data fetching with error handling
  const fetchCulinaryData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/culinary', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      // Ensure all items have updated_at field
      const processedData = (Array.isArray(data) ? data : []).map(item => ({
        ...item,
        updated_at: item.updated_at || item.created_at
      }))
      setCulinaryItems(processedData)
    } catch (err) {
      console.error('Error fetching culinary data:', err)
      setError(err instanceof Error ? err.message : 'Gagal memuat data kuliner')
      setCulinaryItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data load
  useEffect(() => {
    fetchCulinaryData()
  }, [fetchCulinaryData])

  // Handle edit modal from URL parameter
  useEffect(() => {
    const editId = searchParams.get('edit')
    if (editId && culinaryItems.length > 0) {
      const itemToEdit = culinaryItems.find(item => item.id === editId)
      if (itemToEdit) {
        setEditingItem(itemToEdit)
      }
    }
  }, [searchParams, culinaryItems])

  // Memoized filtered items for better performance
  const filteredData = useMemo(() => {
    return culinaryItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSignature = !showSignatureOnly || item.is_signature
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesSignature && matchesSearch
    })
  }, [culinaryItems, selectedCategory, showSignatureOnly, searchQuery])

  // CRUD Handlers
  const handleCreateSuccess = useCallback(() => {
    fetchCulinaryData()
    setShowCreateModal(false)
  }, [fetchCulinaryData])

  const handleEditSuccess = useCallback(() => {
    fetchCulinaryData()
    setEditingItem(null)
    // Clear URL parameter
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/produk-kuliner/kuliner')
    }
  }, [fetchCulinaryData])

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingItem) return

    try {
      const response = await fetch(`/api/culinary/${deletingItem.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchCulinaryData()
        setDeletingItem(null)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Gagal menghapus menu kuliner')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Terjadi kesalahan saat menghapus')
    }
  }, [deletingItem, fetchCulinaryData])

  // Show loading while auth is loading
  if (authLoading) {
    return <PageLoading />
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

      {/* Page Header - using existing component props */}
      <KulinerPageHeader
        isAdmin={isAdmin}
        totalItems={culinaryItems.length}
        filteredCount={filteredData.length}
        onAddKuliner={() => setShowCreateModal(true)}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="text-red-600 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold mb-1">Gagal Memuat Data</h3>
                <p className="text-red-700 text-sm mb-3">{error}</p>
                <button 
                  onClick={fetchCulinaryData}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics - using existing component with items prop */}
        {!loading && !error && culinaryItems.length > 0 && (
          <KulinerStats items={culinaryItems} />
        )}

        {/* Filter - using existing component with all required props */}
        {!loading && !error && culinaryItems.length > 0 && (
          <KulinerFilter
            selectedCategory={selectedCategory}
            showSignatureOnly={showSignatureOnly}
            filteredCount={filteredData.length}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onSignatureToggle={() => setShowSignatureOnly(!showSignatureOnly)}
            onSearchChange={setSearchQuery}
          />
        )}

        {/* Grid - using new optimized component */}
        <OptimizedKulinerGrid
          items={filteredData}
          loading={loading}
          isAdmin={isAdmin}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
        />
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateKulinerModal
          onSuccess={handleCreateSuccess}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {editingItem && (
        <EditKulinerModal
          item={editingItem}
          onSuccess={handleEditSuccess}
          onClose={() => {
            setEditingItem(null)
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, '', '/produk-kuliner/kuliner')
            }
          }}
        />
      )}

      {/* Custom Delete Modal (since DeleteConfirmation doesn't have isOpen prop) */}
      {deletingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hapus Menu Kuliner
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus "{deletingItem.name}"? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Page Component with Suspense
export default function KulinerPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <KulinerPageContent />
    </Suspense>
  )
}