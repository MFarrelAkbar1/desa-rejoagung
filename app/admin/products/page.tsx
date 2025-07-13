'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { Product } from '@/types/database'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Produk Unggulan</h1>
          <p className="text-gray-600">Kelola produk unggulan desa</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-semibold mb-2">{product.price}</p>
              <p className="text-gray-500 text-sm mb-4">{product.location}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingProduct(product)
                    setShowForm(true)
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
          onSave={() => {
            fetchProducts()
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

// Product Form Component
function ProductForm({ 
  product, 
  onClose, 
  onSave 
}: { 
  product: Product | null
  onClose: () => void
  onSave: () => void 
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    location: product?.location || '',
    contact: product?.contact || '',
    is_featured: product?.is_featured || false
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageUrl = product?.image_url || ''

      // Upload image jika ada file baru
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)
        uploadFormData.append('folder', 'products')

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        })
        
        const uploadData = await uploadResponse.json()
        imageUrl = uploadData.imageUrl
      }

      const productData = {
        ...formData,
        image_url: imageUrl
      }

      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'Edit Produk' : 'Tambah Produk'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Produk</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Harga</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Rp 15.000 - 25.000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kontak</label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                className="mr-2"
              />
              Produk Unggulan
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}