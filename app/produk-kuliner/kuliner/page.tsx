// app/produk-kuliner/kuliner/page.tsx

'use client'

import { useState, useMemo, useEffect } from 'react'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'

// Import components
import { 
  KulinerHeader, 
  KulinerFilter, 
  KulinerCard, 
  KulinerEmptyState, 
  KulinerInfo 
} from './components/kuliner_components'

// Import admin forms
import AddKulinerForm from './forms/add-kuliner'
import EditKulinerForm from './forms/edit-kuliner'
import DeleteKulinerForm from './forms/delete-kuliner'

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
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSignatureOnly, setShowSignatureOnly] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  // Admin states
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<CulinaryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<CulinaryItem | null>(null)

  // Fetch culinary data
  const fetchCulinaryData = async () => {
    try {
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
    let filtered = culinaryItems

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    if (showSignatureOnly) {
      filtered = filtered.filter(item => item.is_signature)
    }

    return filtered
  }, [culinaryItems, selectedCategory, showSignatureOnly])

  // Statistics
  const totalItems = culinaryItems.length
  const signatureItems = culinaryItems.filter(item => item.is_signature).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50">
      {/* Breadcrumb - Tambahkan di container yang sama dengan header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <Breadcrumb
          items={[
            { label: 'Produk & Kuliner', href: '/produk-kuliner' },
            { label: 'Kuliner', href: '/produk-kuliner/kuliner' },
          ]}
        />
      </div>

      {/* Header */}
      <KulinerHeader
        totalItems={totalItems}
        signatureItems={signatureItems}
        isAdmin={isAdmin}
        onAddClick={() => setShowAddForm(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Filter Section */}
        <KulinerFilter
          selectedCategory={selectedCategory}
          showSignatureOnly={showSignatureOnly}
          filteredCount={filteredData.length}
          onCategoryChange={setSelectedCategory}
          onSignatureToggle={() => setShowSignatureOnly(!showSignatureOnly)}
        />

        {/* Menu Grid */}
        {filteredData.length === 0 ? (
          <KulinerEmptyState isAdmin={isAdmin} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <KulinerCard
                key={item.id}
                item={item}
                isAdmin={isAdmin}
                onEdit={setEditingItem}
                onDelete={setDeletingItem}
              />
            ))}
          </div>
        )}

        {/* Information Section */}
        <KulinerInfo />
      </div>

      {/* Admin Forms */}
      {showAddForm && (
        <AddKulinerForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            fetchCulinaryData()
            setShowAddForm(false)
          }}
        />
      )}

      {editingItem && (
        <EditKulinerForm
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => {
            fetchCulinaryData()
            setEditingItem(null)
          }}
        />
      )}

      {deletingItem && (
        <DeleteKulinerForm
          item={deletingItem}
          onClose={() => setDeletingItem(null)}
          onSuccess={() => {
            fetchCulinaryData()
            setDeletingItem(null)
          }}
        />
      )}
    </div>
  )
}