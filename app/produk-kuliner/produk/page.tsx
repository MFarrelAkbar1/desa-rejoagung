// app/produk-kuliner/produk/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { ProductItem } from './types'
import ProductPageHeader from './components/ProductPageHeader'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'
import CreateProductModal from './components/CreateProductModal'
import EditProductModal from './components/EditProductModal'

export default function ProductPage() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<ProductItem | null>(null)
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Check if user is admin (simplified - you may want to implement proper auth)
  const [isAdmin, setIsAdmin] = useState(false)

  // Load products
  useEffect(() => {
    loadProducts()
    // Check admin status - replace with your auth logic
    checkAdminStatus()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const result = await response.json()
        setProducts(result.data || [])
      } else {
        console.error('Failed to load products')
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkAdminStatus = () => {
    // Implement your admin check logic here
    // For now, we'll assume user is admin if in development
    setIsAdmin(process.env.NODE_ENV === 'development')
  }

  // Filter products (REMOVED search query filter since we removed search bar)
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesFeatured = !showFeaturedOnly || product.is_featured
    
    return matchesCategory && matchesFeatured
  })

  // Handle create success
  const handleCreateSuccess = () => {
    setShowCreateModal(false)
    loadProducts()
  }

  // Handle edit success  
  const handleEditSuccess = () => {
    setEditingItem(null)
    loadProducts()
  }

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return
    
    try {
      const response = await fetch(`/api/products?id=${deletingItem.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setDeletingItem(null)
        loadProducts()
      } else {
        const errorData = await response.json()
        alert(`Gagal menghapus produk: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Terjadi kesalahan saat menghapus produk')
    }
  }

  // Simple Delete Modal Component
  const DeleteModal = ({ item, onConfirm, onCancel }: {
    item: ProductItem
    onConfirm: () => void
    onCancel: () => void
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Produk</h3>
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus produk <strong>"{item.name}"</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProductPageHeader
        isAdmin={isAdmin}
        totalItems={products.length}
        filteredCount={filteredProducts.length}
        onAddProduct={() => setShowCreateModal(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Filter */}
        <ProductFilter
          selectedCategory={selectedCategory}
          showFeaturedOnly={showFeaturedOnly}
          filteredCount={filteredProducts.length}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
          onSearchChange={setSearchQuery}
        />

        {/* Product Grid */}
        <ProductGrid
          items={filteredProducts}
          loading={loading}
          isAdmin={isAdmin}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
        />
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editingItem && (
        <EditProductModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {deletingItem && (
        <DeleteModal
          item={deletingItem}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  )
}