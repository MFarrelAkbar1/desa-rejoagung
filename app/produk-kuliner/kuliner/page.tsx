// app/produk-kuliner/kuliner/page.tsx - UPDATED
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAdminAuth } from '@/lib/auth'
import { useSearchParams } from 'next/navigation'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Import enhanced components
import {
  KulinerPageHeader,
  KulinerStats,
  KulinerFilter,
  KulinerInfo
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

export default function KulinerPage() {
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
    const editId = searchParams.get('edit')
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

  // Filter data
  const filteredData = useMemo(() => {
    return culinaryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSignature = !showSignatureOnly || item.is_signature
      
      return matchesSearch && matchesCategory && matchesSignature
    })
  }, [culinaryItems, searchQuery, selectedCategory, showSignatureOnly])

  // CRUD Handlers
  const handleCreateSuccess = () => {
    fetchCulinaryData()
    setShowCreateModal(false)
  }

  const handleEditSuccess = () => {
    fetchCulinaryData()
    setEditingItem(null)
    // Clear URL parameter
    window.history.replaceState({}, '', '/produk-kuliner/kuliner')
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

        {/* Info Section */}
        <KulinerInfo />
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
            // Clear URL parameter
            window.history.replaceState({}, '', '/produk-kuliner/kuliner')
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {deletingItem && (
        <DeleteConfirmation
          title="Hapus Menu Kuliner"
          message={`Apakah Anda yakin ingin menghapus "${deletingItem.name}"? Tindakan ini tidak dapat dibatalkan.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  )
}