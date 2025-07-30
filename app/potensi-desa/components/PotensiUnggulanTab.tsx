// app/potensi-desa/components/PotensiUnggulanTab.tsx (FIXED VERSION)

'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Utensils, Users, Download, Upload, Trash2, Loader2 } from 'lucide-react'

// Import Toast component
import Toast, { useToast } from '@/components/ui/Toast'

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

// Error Boundary component
function ErrorBoundary({ 
  children, 
  fallback = <div>Something went wrong</div> 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: any) => {
    console.error('ErrorBoundary caught error:', err)
    setHasError(true)
    setError(err?.message || 'Unknown error occurred')
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
  
  // Initialize toast
  const { toast, showToast, hideToast } = useToast()

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
      
      showToast('File berhasil didownload', 'success')
    } catch (err) {
      console.error('Download error:', err)
      showToast('Gagal download file. Silakan coba lagi.', 'error')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      // Validasi file type
      if (file.type !== 'application/pdf') {
        showToast('Hanya file PDF yang diperbolehkan', 'error')
        e.target.value = ''
        return
      }

      // Validasi file size - Improved error handling for large files
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
        showToast(`Ukuran file terlalu besar (${fileSizeMB}MB). Maksimal 10MB`, 'error')
        e.target.value = ''
        return
      }

      // Additional check for very large files that might crash Next.js
      if (file.size > 50 * 1024 * 1024) { // 50MB
        showToast('File terlalu besar dan dapat menyebabkan error sistem. Gunakan file maksimal 10MB', 'error')
        e.target.value = ''
        return
      }

      showToast('Mulai mengupload file...', 'info')

      if (uploadPDF) {
        const success = await uploadPDF('potensi-unggulan', file)
        if (success) {
          setShowUpload(false)
          showToast('File berhasil diupload!', 'success')
        } else {
          showToast('Gagal upload file. Silakan coba lagi.', 'error')
        }
      }
      
      e.target.value = ''
    } catch (err) {
      console.error('Upload handler error:', err)
      showToast('Terjadi kesalahan saat upload. Silakan coba lagi.', 'error')
      e.target.value = ''
    }
  }

  const handleDeletePDF = async () => {
    try {
      if (deletePDF) {
        showToast('Menghapus file...', 'info')
        const success = await deletePDF('potensi-unggulan')
        if (success) {
          showToast('File berhasil dihapus!', 'success')
        } else {
          showToast('Gagal hapus file. Silakan coba lagi.', 'error')
        }
      }
    } catch (err) {
      console.error('Delete handler error:', err)
      showToast('Terjadi kesalahan saat menghapus. Silakan coba lagi.', 'error')
    }
  }

  // Clear error when component mounts and show toast if there's persistent error
  useEffect(() => {
    if (error && !error.includes('Missing dependencies')) {
      showToast(error, 'error')
      clearError()
    }
  }, [error, clearError, showToast])

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
      {/* Toast component */}
      <Toast
        isOpen={toast.isOpen}
        onClose={hideToast}
        message={toast.message}
        type={toast.type}
        duration={5000}
        position="top-right"
      />

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

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Admin Controls */}
          {isAdmin && (
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Panel Admin
                </h3>
                <div className="flex gap-3">
                  {mainPDF ? (
                    <button
                      onClick={handleDeletePDF}
                      disabled={deletingFor === 'potensi-unggulan'}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {deletingFor === 'potensi-unggulan' ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      {deletingFor === 'potensi-unggulan' ? 'Menghapus...' : 'Hapus PDF'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowUpload(!showUpload)}
                      className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF
                    </button>
                  )}
                </div>
              </div>

              {showUpload && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  {uploadingFor === 'potensi-unggulan' ? (
                    <div className="text-center py-4">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Mengupload PDF...</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Proses ini mungkin membutuhkan waktu beberapa saat
                      </p>
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
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800 font-medium">⚠️ Persyaratan File:</p>
                        <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                          <li>• Format: PDF (.pdf)</li>
                          <li>• Ukuran maksimal: 10MB</li>
                          <li>• File besar dapat menyebabkan error sistem</li>
                          <li>• Kompres file jika ukuran terlalu besar</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PDF Display */}
          {mainPDF ? (
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    📄 {mainPDF.file_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Ukuran: {(mainPDF.file_size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPDF(mainPDF.file_url, mainPDF.file_name)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>

              <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe
                  src={mainPDF.file_url}
                  className="w-full h-full"
                  title="Potensi Unggulan Desa Rejoagung"
                  onError={() => {
                    console.log('PDF iframe load error')
                    showToast('Gagal memuat PDF. Silakan coba download file.', 'warning')
                  }}
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
                    ? 'Silakan upload dokumen PDF untuk menampilkan potensi unggulan desa'
                    : 'Dokumen sedang dalam proses persiapan'}
                </p>
              </div>
            </div>
          )}

          {/* Potensi Cards */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🎯 Kategori Potensi Unggulan
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Wisata Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Potensi Wisata</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Destinasi wisata alam dan budaya yang menjadi daya tarik utama desa, 
                  termasuk objek wisata sejarah dan panorama alam yang indah.
                </p>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  🌿 Wisata Alam • 🏛️ Wisata Sejarah
                </div>
              </div>

              {/* Kuliner Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <Utensils className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Kuliner Khas</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Makanan dan minuman tradisional yang menjadi ciri khas desa, 
                  diolah dengan resep turun temurun dan bahan lokal berkualitas.
                </p>
                <div className="mt-4 text-sm text-orange-600 font-medium">
                  🍜 Makanan Tradisional • 🥤 Minuman Khas
                </div>
              </div>

              {/* UMKM Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">UMKM Lokal</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Usaha mikro, kecil, dan menengah yang dikelola masyarakat desa, 
                  menghasilkan produk berkualitas dan memberikan dampak ekonomi positif.
                </p>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  🏪 Usaha Mikro • 📦 Produk Lokal
                </div>
              </div>
            </div>
          </div>

          {/* Info Footer */}
          <div className="bg-emerald-50 border-t border-emerald-200 p-6">
            <div className="text-center">
              <h4 className="font-semibold text-emerald-800 mb-2">
                💡 Informasi Lebih Lanjut
              </h4>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Untuk informasi detail mengenai potensi unggulan Desa Rejoagung, 
                silakan download dokumen PDF di atas atau hubungi pihak desa. 
                Dokumen berisi data lengkap dan terkini tentang berbagai potensi yang dimiliki desa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}