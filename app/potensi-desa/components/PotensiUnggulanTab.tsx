// app/potensi-desa/components/PotensiUnggulanTab.tsx (FIXED VERSION)
'use client'

import { useState } from 'react'
import { MapPin, Utensils, Users, Download, Upload, Trash2, Loader2 } from 'lucide-react'

// Conditional imports with error handling
let useAdminAuth: () => { isAdmin: boolean }
let usePDFManagement: () => any

try {
  useAdminAuth = require('@/lib/auth').useAdminAuth
  usePDFManagement = require('../hooks/usePDFManagement').usePDFManagement
} catch (error) {
  console.error('Import error:', error)
  // Fallback functions
  useAdminAuth = () => ({ isAdmin: false })
  usePDFManagement = () => ({
    pdfFiles: [],
    loading: false,
    error: 'Import error: Missing dependencies',
    uploadingFor: null,
    deletingFor: null,
    fetchPDFFiles: async () => {},
    getPDFForCategory: () => null,
    uploadPDF: async () => false,
    deletePDF: async () => false,
    clearError: () => {}
  })
}

// Static data untuk kategori
const potentialCategories = [
  {
    id: 'wisata',
    title: 'Potensi Wisata',
    description: 'Destinasi wisata alam dan budaya yang memukau di Desa Rejoagung',
    icon: MapPin,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    stats: [
      { label: 'Destinasi', value: '8' },
      { label: 'Wisatawan/Bulan', value: '250+' },
      { label: 'Rating', value: '4.5/5' }
    ]
  },
  {
    id: 'kuliner',
    title: 'Potensi Kuliner', 
    description: 'Kekayaan kuliner tradisional dengan cita rasa khas Jawa Timur',
    icon: Utensils,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    stats: [
      { label: 'Makanan', value: '12' },
      { label: 'Warung', value: '25' },
      { label: 'Produk', value: '18' }
    ]
  },
  {
    id: 'sosial-budaya',
    title: 'Sosial Budaya',
    description: 'Tradisi dan kearifan lokal yang terjaga turun temurun',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    stats: [
      { label: 'Tradisi Aktif', value: '6' },
      { label: 'Kesenian Daerah', value: '4' },
      { label: 'Festival Tahunan', value: '3' }
    ]
  }
]

// Error Boundary Component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = (error: any) => {
    console.error('Component Error:', error)
    setHasError(true)
    setError(error?.message || 'Terjadi kesalahan pada komponen')
  }

  if (hasError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            ⚠️ Terjadi Kesalahan
          </h3>
          <p className="text-red-700 text-sm mb-4">
            {error || 'Komponen tidak dapat dimuat'}
          </p>
          <button
            onClick={() => {
              setHasError(false)
              setError(null)
              window.location.reload()
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Muat Ulang Halaman
          </button>
        </div>
      </div>
    )
  }

  try {
    return <>{children}</>
  } catch (err) {
    handleError(err)
    return fallback
  }
}

export default function PotensiUnggulanTab() {
  return (
    <ErrorBoundary fallback={<div>Error loading component</div>}>
      <PotensiUnggulanContent />
    </ErrorBoundary>
  )
}

function PotensiUnggulanContent() {
  const [showUpload, setShowUpload] = useState(false)
  
  // Safe hooks usage with error handling
  let isAdmin = false
  let pdfManagement: any = {
    pdfFiles: [],
    loading: false,
    error: null,
    uploadingFor: null,
    deletingFor: null,
    getPDFForCategory: () => null,
    uploadPDF: async () => false,
    deletePDF: async () => false,
    clearError: () => {}
  }

  try {
    const adminAuth = useAdminAuth()
    isAdmin = adminAuth?.isAdmin || false
    pdfManagement = usePDFManagement()
  } catch (err) {
    console.error('Hook error:', err)
    pdfManagement.error = 'Gagal memuat data: Missing dependencies'
  }

  const {
    loading,
    error,
    uploadingFor,
    deletingFor,
    getPDFForCategory,
    uploadPDF,
    deletePDF,
    clearError
  } = pdfManagement

  // Gunakan satu PDF untuk semua potensi
  const mainPDF = getPDFForCategory ? getPDFForCategory('potensi-unggulan') : null

  const handleDownloadPDF = (fileUrl: string, fileName: string) => {
    try {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download error:', err)
      alert('Gagal download file')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file && uploadPDF) {
        const success = await uploadPDF('potensi-unggulan', file)
        if (success) {
          setShowUpload(false)
        }
      }
      e.target.value = ''
    } catch (err) {
      console.error('Upload handler error:', err)
      alert('Gagal upload file')
    }
  }

  const handleDeletePDF = async () => {
    try {
      if (deletePDF) {
        await deletePDF('potensi-unggulan')
      }
    } catch (err) {
      console.error('Delete handler error:', err)
      alert('Gagal hapus file')
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="text-gray-600">Memuat data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            🌟 Potensi Unggulan Desa Rejoagung
          </h1>
          <p className="text-gray-600 text-lg">
            Temukan berbagai potensi unggulan yang menjadi kebanggaan desa kami
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">⚠️</span>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* PDF Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  📄 Dokumen Potensi Unggulan
                </h2>
                <p className="text-gray-600 mt-1">
                  Dokumen lengkap potensi unggulan Desa Rejoagung
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                {mainPDF && (
                  <button
                    onClick={() => handleDownloadPDF(mainPDF.file_url, mainPDF.file_name)}
                    className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                )}
                
                {/* Admin Controls */}
                {isAdmin && (
                  <>
                    {mainPDF ? (
                      <button
                        onClick={handleDeletePDF}
                        disabled={deletingFor === 'potensi-unggulan'}
                        className="flex items-center px-4 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deletingFor === 'potensi-unggulan' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowUpload(!showUpload)}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload PDF
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Upload Section */}
            {isAdmin && showUpload && !mainPDF && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                {uploadingFor === 'potensi-unggulan' ? (
                  <div className="text-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Mengupload PDF...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowUpload(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Batal
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Maksimal 10MB • Format PDF
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* PDF Display */}
          {mainPDF ? (
            <div className="p-6">
              <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe
                  src={mainPDF.file_url}
                  className="w-full h-full"
                  title="Potensi Unggulan Desa Rejoagung"
                  onError={() => console.log('PDF iframe load error')}
                >
                  <p>
                    Browser Anda tidak mendukung tampilan PDF. 
                    <button 
                      onClick={() => handleDownloadPDF(mainPDF.file_url, mainPDF.file_name)}
                      className="text-blue-600 underline ml-1"
                    >
                      Download PDF
                    </button>
                  </p>
                </iframe>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium mb-2">Dokumen Belum Tersedia</h3>
                <p className="text-sm">
                  {isAdmin 
                    ? "Klik tombol 'Upload PDF' untuk menambahkan dokumen"
                    : "Dokumen sedang dalam proses penyusunan"
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Categories Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {potentialCategories.map((category) => {
            const IconComponent = category.icon
            
            return (
              <div
                key={category.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-gray-200 transition-all duration-300`}
              >
                {/* Icon & Title */}
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {category.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {category.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}