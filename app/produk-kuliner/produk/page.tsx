// app/produk-kuliner/produk/page.tsx - FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '@/lib/auth'
import { ApiHelper } from '@/lib/api-helper'
import { ProductItem } from './types'
import ProductPageHeader from './components/ProductPageHeader'
import ProductFilter from './components/ProductFilter'
import ProductGrid from './components/ProductGrid'
import CreateProductModal from './components/CreateProductModal'
import EditProductModal from './components/EditProductModal'

export default function ProductPage() {
  // Auth state
  const { isAdmin, isLoading: authLoading } = useAdminAuth()
  
  // Data states
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<ProductItem | null>(null)
 
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Load products on component mount
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      // ✅ MENGGUNAKAN API HELPER (untuk GET tidak perlu auth)
      const result = await ApiHelper.getProducts()
      setProducts(result.data || [])
    } catch (error) {
      console.error('Error loading products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesFeatured = !showFeaturedOnly || product.is_featured
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
   
    return matchesCategory && matchesFeatured && matchesSearch
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
      // ✅ MENGGUNAKAN API HELPER DENGAN AUTENTIKASI
      await ApiHelper.deleteProduct(deletingItem.id)
      setDeletingItem(null)
      loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      
      if (error instanceof Error) {
        if (error.message.includes('Token tidak valid') || 
            error.message.includes('Akses ditolak')) {
          alert('Sesi Anda telah berakhir. Silakan login kembali.')
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
        } else {
          alert(`Gagal menghapus produk: ${error.message}`)
        }
      } else {
        alert('Terjadi kesalahan saat menghapus produk')
      }
    }
  }

  // Delete Modal Component
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

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    )
  }

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