// app/potensi-desa/hooks/usePDFManagement.tsx (FIXED VERSION)

'use client'

import { useState, useEffect, useCallback } from 'react'

interface PDFFile {
  id: string
  category_id: string
  file_name: string
  file_url: string
  file_size: number
  uploaded_by: string
  created_at: string
}

export function usePDFManagement() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)
  const [deletingFor, setDeletingFor] = useState<string | null>(null)

  // Enhanced error handler with better error categorization
  const handleError = (error: unknown, context: string): string => {
    console.error(`Error in ${context}:`, error)

    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('Failed to fetch')) {
        return 'Koneksi bermasalah. Periksa internet Anda.'
      }
      if (error.message.includes('NetworkError')) {
        return 'Gangguan jaringan. Silakan coba lagi.'
      }
      if (error.message.includes('413')) {
        return 'File terlalu besar. Maksimal 10MB.'
      }
      if (error.message.includes('500')) {
        return 'Server bermasalah. Silakan coba lagi nanti.'
      }
      return error.message
    }

    if (typeof error === 'string') {
      return error
    }

    if (error && typeof error === 'object') {
      const errorObj = error as any
      return errorObj.message || errorObj.error || JSON.stringify(error)
    }

    return `Terjadi kesalahan tidak dikenal pada ${context}`
  }

  // Fetch PDF files with better error handling and retry logic
  const fetchPDFFiles = useCallback(async (retryCount = 0) => {
    try {
      console.log('🔄 Fetching PDF files...', retryCount > 0 ? `(retry ${retryCount})` : '')
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch('/api/potensi-unggulan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 413) {
          throw new Error('Request terlalu besar')
        }
        if (response.status >= 500) {
          throw new Error(`Server error (${response.status})`)
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ PDF files fetched:', data.length, 'files')

      const pdfArray = Array.isArray(data) ? data : []
      setPdfFiles(pdfArray)
      setError(null) // Clear any previous errors

    } catch (err: any) {
      const errorMessage = handleError(err, 'fetchPDFFiles')
      console.error('❌ Fetch error:', errorMessage)

      // Set empty array for graceful fallback
      setPdfFiles([])

      // Retry logic for network errors
      if (retryCount < 2 && (err.name === 'AbortError' || err.message.includes('fetch'))) {
        console.log(`🔄 Retrying fetch... (attempt ${retryCount + 1})`)
        setTimeout(() => fetchPDFFiles(retryCount + 1), 1000 * (retryCount + 1))
        return
      }

      // Only show user-facing errors for real issues
      if (!errorMessage.includes('Failed to fetch') && !errorMessage.includes('NetworkError')) {
        setError(`Gagal memuat data: ${errorMessage}`)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Get PDF file untuk kategori tertentu
  const getPDFForCategory = useCallback((categoryId: string): PDFFile | null => {
    try {
      const found = pdfFiles.find(pdf => pdf.category_id === categoryId)
      return found || null
    } catch (err) {
      console.error('Error in getPDFForCategory:', err)
      return null
    }
  }, [pdfFiles])

  // Upload PDF with enhanced error handling and progress tracking
  const uploadPDF = useCallback(async (categoryId: string, file: File): Promise<boolean> => {
    try {
      console.log('🔄 Starting upload for:', categoryId)
      setUploadingFor(categoryId)
      setError(null)

      // Enhanced client-side validation
      if (!file) {
        throw new Error('File tidak valid')
      }

      if (file.type !== 'application/pdf') {
        throw new Error('Hanya file PDF yang diperbolehkan')
      }

      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
        throw new Error(`Ukuran file ${fileSizeMB}MB melebihi batas maksimal 10MB`)
      }

      // Additional check for very large files that might crash the system
      if (file.size > 50 * 1024 * 1024) { // 50MB
        throw new Error('File terlalu besar dan dapat menyebabkan sistem error')
      }

      // Prepare form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('categoryId', categoryId)
      formData.append('uploadedBy', 'admin')

      // Upload with timeout and progress tracking
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        throw new Error('Upload timeout. Coba lagi dengan file yang lebih kecil.')
      }, 60000) // 60s timeout for uploads

      console.log('📡 Uploading to API...')
      const response = await fetch('/api/potensi-unggulan', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('📡 Upload response status:', response.status)

      if (!response.ok) {
        let errorMessage = `Upload failed (${response.status})`
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
          
          // Handle specific server errors
          if (response.status === 413) {
            errorMessage = 'File terlalu besar untuk server. Kompres file Anda.'
          } else if (response.status === 507) {
            errorMessage = 'Storage penuh. Hubungi administrator.'
          } else if (response.status >= 500) {
            errorMessage = 'Server bermasalah. Coba lagi dalam beberapa menit.'
          }
        } catch {
          if (response.status === 413) {
            errorMessage = 'File terlalu besar. Next.js memiliki limit maksimal untuk upload.'
          } else {
            errorMessage = `Upload failed: ${response.status} ${response.statusText}`
          }
        }

        throw new Error(errorMessage)
      }

      const newFile = await response.json()
      console.log('✅ Upload successful:', newFile)

      // Update state
      setPdfFiles(prev => {
        const filtered = prev.filter(pdf => pdf.category_id !== categoryId)
        return [...filtered, newFile]
      })

      return true

    } catch (err: any) {
      const errorMessage = handleError(err, 'uploadPDF')
      console.error('❌ Upload error:', errorMessage)
      
      // Set more specific error messages
      if (err.name === 'AbortError') {
        setError('Upload dibatalkan karena timeout. Coba dengan file yang lebih kecil.')
      } else if (errorMessage.includes('413') || errorMessage.includes('terlalu besar')) {
        setError('File terlalu besar. Kompres file PDF Anda atau gunakan file maksimal 10MB.')
      } else {
        setError(`Upload gagal: ${errorMessage}`)
      }

      return false
    } finally {
      setUploadingFor(null)
    }
  }, [])

  // Delete PDF with enhanced error handling
  const deletePDF = useCallback(async (categoryId: string): Promise<boolean> => {
    try {
      console.log('🔄 Starting delete for:', categoryId)
      setDeletingFor(categoryId)
      setError(null)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch(`/api/potensi-unggulan?categoryId=${encodeURIComponent(categoryId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('📡 Delete response status:', response.status)

      if (!response.ok) {
        let errorMessage = `Delete failed (${response.status})`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = `Delete failed: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      console.log('✅ Delete successful')

      // Update state
      setPdfFiles(prev => prev.filter(pdf => pdf.category_id !== categoryId))
      return true

    } catch (err: any) {
      const errorMessage = handleError(err, 'deletePDF')
      console.error('❌ Delete error:', errorMessage)
      
      if (err.name === 'AbortError') {
        setError('Penghapusan timeout. Silakan coba lagi.')
      } else {
        setError(`Hapus gagal: ${errorMessage}`)
      }
      
      return false
    } finally {
      setDeletingFor(null)
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    console.log('🧹 Clearing error')
    setError(null)
  }, [])

  // Load data on mount dengan enhanced error boundary
  useEffect(() => {
    console.log('🚀 usePDFManagement hook initialized')

    // Wrap dalam try-catch untuk handle initialization errors
    try {
      fetchPDFFiles()
    } catch (err) {
      const errorMessage = handleError(err, 'hook initialization')
      console.error('❌ Hook init error:', errorMessage)
      setError(`Gagal inisialisasi: ${errorMessage}`)
      setLoading(false)
    }
  }, [fetchPDFFiles])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 usePDFManagement hook cleanup')
      setUploadingFor(null)
      setDeletingFor(null)
      setError(null)
    }
  }, [])

  // Health check method for debugging
  const healthCheck = useCallback(() => {
    return {
      pdfFilesCount: pdfFiles.length,
      loading,
      error,
      uploadingFor,
      deletingFor,
      timestamp: new Date().toISOString()
    }
  }, [pdfFiles.length, loading, error, uploadingFor, deletingFor])

  return {
    pdfFiles,
    loading,
    error,
    uploadingFor,
    deletingFor,
    fetchPDFFiles,
    getPDFForCategory,
    uploadPDF,
    deletePDF,
    clearError,
    healthCheck // For debugging purposes
  }
}