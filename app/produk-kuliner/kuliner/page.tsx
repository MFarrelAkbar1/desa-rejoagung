// app/produk-kuliner/kuliner/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { culinaryData } from '@/data/culinary'

// Import komponen modular
import CulinaryHeader from '@/components/CulinaryHeader'
import CulinaryFilter from '@/components/CulinaryFilter'
import CulinaryList from '@/components/CulinaryList'
import CulinaryInfo from '@/components/CulinaryInfo'

export default function KulinerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showSignatureOnly, setShowSignatureOnly] = useState<boolean>(false)

  // Filter data berdasarkan kategori dan signature
  const filteredData = useMemo(() => {
    let filtered = culinaryData

    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter berdasarkan signature
    if (showSignatureOnly) {
      filtered = filtered.filter(item => item.isSignature)
    }

    return filtered
  }, [selectedCategory, showSignatureOnly])

  // Hitung statistik
  const stats = useMemo(() => {
    const totalItems = culinaryData.length
    const signatureItems = culinaryData.filter(item => item.isSignature).length
    const avgRating = culinaryData.reduce((sum, item) => sum + item.rating, 0) / totalItems

    return { totalItems, signatureItems, avgRating }
  }, [])

  // Hitung jumlah per kategori
  const categoryCount = useMemo(() => {
    return culinaryData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }, [])

  // Generate title berdasarkan filter
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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
       
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

        {/* Culinary List Section */}
        <CulinaryList
          items={filteredData}
          title={getListTitle()}
        />

        {/* Information Section */}
        <CulinaryInfo />
      </div>
    </div>
  )
}