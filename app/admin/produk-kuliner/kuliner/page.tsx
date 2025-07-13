'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAdminAuth } from '@/lib/auth'
import { Plus, Edit, Trash2, Shield } from 'lucide-react'
import { CulinaryItem } from '@/types/database'

// Import komponen modular (yang sudah ada)
import CulinaryHeader from '@/components/CulinaryHeader'
import CulinaryFilter from '@/components/CulinaryFilter'
import CulinaryCard from '@/components/CulinaryCard'
import CulinaryInfo from '@/components/CulinaryInfo'

// Import admin forms
import AddKulinerForm from './forms/add-kuliner'
import EditKulinerForm from './forms/edit-kuliner'
import DeleteKulinerForm from './forms/delete-kuliner'

export default function AdminKulinerPage() {
  const { isAdmin, loginAdmin, logoutAdmin } = useAdminAuth()
  const [culinaryItems, setCulinaryItems] = useState<CulinaryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSignatureOnly, setShowSignatureOnly] = useState<boolean>(false)
  
  // Admin states
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<CulinaryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<CulinaryItem | null>(null)

  // Fetch data dari API
  const fetchCulinaryData = async () => {
    try {
      const response = await fetch('/api/culinary')
      if (response.ok) {
        const data: CulinaryItem[] = await response.json()
        setCulinaryItems(data)
      }
    } catch (error) {
      console.error('Error fetching culinary data:', error)
    }
  }

  useEffect(() => {
    fetchCulinaryData()
  }, [])

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = culinaryItems

    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter berdasarkan signature
    if (showSignatureOnly) {
      filtered = filtered.filter(item => item.is_signature)
    }

    return filtered
  }, [culinaryItems, selectedCategory, showSignatureOnly])

  // Hitung statistik
  const stats = useMemo(() => {
    const totalItems = culinaryItems.length
    const signatureItems = culinaryItems.filter(item => item.is_signature).length
    const avgRating = totalItems > 0 ? culinaryItems.reduce((sum, item) => sum + item.rating, 0) / totalItems : 0
    return { totalItems, signatureItems, avgRating }
  }, [culinaryItems])

  // Hitung jumlah per kategori
  const categoryCount = useMemo(() => {
    return culinaryItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [culinaryItems])

  const getListTitle = () => {
    let title = '🍽️ '
    
    if (selectedCategory === 'all') {
      title += 'Semua Menu Kuliner'
    } else {
      const categoryLabels = {
        makanan: 'Menu Makanan Utama',
        minuman: 'Menu Minuman',
        camilan: 'Menu Camilan & Jajanan'
      }
      title += categoryLabels[selectedCategory as keyof typeof categoryLabels] || 'Menu Kuliner'
    }

    if (showSignatureOnly) {
      title += ' - Signature Only'
    }

    return title
  }

  // Admin login form
  const AdminLoginForm = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      if (loginAdmin(password)) {
        setShowLoginForm(false)
        setPassword('')
        setError('')
      } else {
        setError('Password salah!')
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h3 className="text-lg font-bold mb-4">🔐 Login Admin</h3>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              required
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Component CulinaryList dengan tombol admin
  const CulinaryListWithAdmin = ({ 
    items, 
    title, 
    isAdmin, 
    onEdit, 
    onDelete 
  }: {
    items: CulinaryItem[]
    title: string
    isAdmin: boolean
    onEdit: (item: CulinaryItem) => void
    onDelete: (item: CulinaryItem) => void
  }) => {
    if (items.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-10 border-4 border-gray-200 text-center">
          <div className="text-8xl mb-6">🍽️</div>
          <h3 className="text-3xl font-bold text-gray-600 mb-4">Tidak Ada Menu Ditemukan</h3>
          <p className="text-xl text-gray-500 mb-6">
            Maaf, tidak ada menu yang sesuai dengan filter yang dipilih.
          </p>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-gray-200">
        <div className="flex items-center mb-8">
          <div className="bg-orange-100 p-3 rounded-xl mr-4">
            <Plus className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-xl text-gray-600">
              Menampilkan {items.length} menu kuliner terpilih
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {items.map((item) => (
            <div key={item.id} className="relative">
              {/* Admin Controls Overlay */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg transition-colors"
                    title="Edit Menu"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-colors"
                    title="Hapus Menu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* CulinaryCard dengan data yang sesuai */}
              <CulinaryCard item={item} />
            </div>
          ))}
        </div>

        {/* Summary Info */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-3 border-orange-200 rounded-2xl p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">{items.length}</div>
              <div className="text-lg font-semibold text-orange-700">Menu Tersedia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                {items.filter(item => item.is_signature).length}
              </div>
              <div className="text-lg font-semibold text-yellow-700">Menu Signature</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {items.length > 0 ? (items.reduce((sum, item) => sum + item.rating, 0) / items.length).toFixed(1) : '0'}
              </div>
              <div className="text-lg font-semibold text-green-700">Rating Rata-rata</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Controls - Fixed Position */}
        <div className="fixed top-20 right-8 z-40">
          {!isAdmin ? (
            <button
              onClick={() => setShowLoginForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Login Admin"
            >
              <Shield className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Menu
              </button>
              <button
                onClick={logoutAdmin}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-colors"
                title="Logout Admin"
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Header Section */}
        <CulinaryHeader
          totalItems={stats.totalItems}
          signatureItems={stats.signatureItems}
          avgRating={stats.avgRating}
        />

        {/* Filter Section */}
        <CulinaryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showSignatureOnly={showSignatureOnly}
          onSignatureToggle={() => setShowSignatureOnly(!showSignatureOnly)}
          categoryCount={categoryCount}
        />

        {/* Culinary List Section with Admin Controls */}
        <CulinaryListWithAdmin
          items={filteredData}
          title={getListTitle()}
          isAdmin={isAdmin}
          onEdit={setEditingItem}
          onDelete={setDeletingItem}
        />

        {/* Information Section */}
        <CulinaryInfo />
      </div>

      {/* Admin Forms */}
      {showLoginForm && <AdminLoginForm />}
      
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