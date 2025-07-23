// app/produk-kuliner/produk/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'
<Breadcrumb
  items={[
    { label: 'Produk & Kuliner', href: '/produk-kuliner' },
    { label: 'Produk', href: '/produk-kuliner/produk' },
  ]}
/>
// Import components
import { 
  ProdukHeader, 
  ProdukFilter, 
  ProdukCard, 
  ProdukEmptyState, 
  ProdukInfo 
} from './components/produk_components'

// Import forms
import AddProdukForm from './forms/add-produk'
import EditProdukForm from './forms/edit-produk'
import DeleteProdukForm from './forms/delete-produk'

interface Product {
  id: string
  name: string
  description: string
  price?: string
  image_url?: string
  category?: string
  is_featured: boolean
  contact?: string
  location?: string
  created_at: string
  updated_at: string
}

export default function ProdukUnggulanPage() {
  const { isAdmin } = useAdminAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Admin states
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Statistics
  const totalProducts = products.length
  const featuredProducts = products.filter(p => p.is_featured).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50">
            {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Produk & Kuliner', href: '/produk-kuliner' },
          { label: 'Produk', href: '/produk-kuliner/produk' },
        ]}
      />
      
      {/* Header */}
      <ProdukHeader
        totalProducts={totalProducts}
        featuredProducts={featuredProducts}
        isAdmin={isAdmin}
        onAddClick={() => setShowAddForm(true)}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Products Grid */}
        {products.length === 0 ? (
          <ProdukEmptyState isAdmin={isAdmin} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProdukCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={setEditingProduct}
                onDelete={setDeletingProduct}
              />
            ))}
          </div>
        )}

        {/* Info Section */}
        <ProdukInfo />
      </div>

      {/* Admin Forms */}
      {showAddForm && (
        <AddProdukForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            fetchProducts()
            setShowAddForm(false)
          }}
        />
      )}

      {editingProduct && (
        <EditProdukForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            fetchProducts()
            setEditingProduct(null)
          }}
        />
      )}

      {deletingProduct && (
        <DeleteProdukForm
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onSuccess={() => {
            fetchProducts()
            setDeletingProduct(null)
          }}
        />
      )}
    </div>
  )
}