// app/potensi-desa/hooks/usePDFManagement.ts (FIXED VERSION)
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

  // Helper function untuk handle error dengan proper logging
  const handleError = (error: unknown, context: string): string => {
    console.error(`Error in ${context}:`, error)
    
    if (error instanceof Error) {
      return error.message
    }
    
    if (typeof error === 'string') {
      return error
    }
    
    if (error && typeof error === 'object') {
      // Handle error objects properly
      const errorObj = error as any
      return errorObj.message || errorObj.error || JSON.stringify(error)
    }
    
    return `Unknown error in ${context}`
  }

  // Fetch PDF files dari database
  const fetchPDFFiles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Fetching PDF files...')
      
      const response = await fetch('/api/potensi-unggulan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })
      
      console.log('📡 Response status:', response.status)
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log('📭 No PDF files found (404 - empty or no table)')
          setPdfFiles([])
          return
        }
        
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      console.log('✅ PDF files fetched:', data)
      
      // Ensure data is array
      const pdfArray = Array.isArray(data) ? data : []
      setPdfFiles(pdfArray)
      
    } catch (err) {
      const errorMessage = handleError(err, 'fetchPDFFiles')
      console.error('❌ Fetch error:', errorMessage)
      
      // Set empty array for graceful fallback
      setPdfFiles([])
      
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

  // Upload PDF
  const uploadPDF = useCallback(async (categoryId: string, file: File): Promise<boolean> => {
    try {
      console.log('🔄 Starting upload for:', categoryId)
      setUploadingFor(categoryId)
      setError(null)

      // Validate file
      if (!file) {
        throw new Error('File tidak valid')
      }
      
      if (file.type !== 'application/pdf') {
        throw new Error('Hanya file PDF yang diperbolehkan')
      }
      
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Ukuran file maksimal 10MB')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('categoryId', categoryId)
      formData.append('uploadedBy', 'admin')

      const response = await fetch('/api/potensi-unggulan', {
        method: 'POST',
        body: formData
      })

      console.log('📡 Upload response status:', response.status)

      if (!response.ok) {
        let errorMessage = `Upload failed (${response.status})`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = `Upload failed: ${response.status} ${response.statusText}`
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
    } catch (err) {
      const errorMessage = handleError(err, 'uploadPDF')
      console.error('❌ Upload error:', errorMessage)
      setError(`Upload gagal: ${errorMessage}`)
      return false
    } finally {
      setUploadingFor(null)
    }
  }, [])

  // Delete PDF
  const deletePDF = useCallback(async (categoryId: string): Promise<boolean> => {
    try {
      console.log('🔄 Starting delete for:', categoryId)
      setDeletingFor(categoryId)
      setError(null)

      const response = await fetch(`/api/potensi-unggulan?categoryId=${encodeURIComponent(categoryId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

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
    } catch (err) {
      const errorMessage = handleError(err, 'deletePDF')
      console.error('❌ Delete error:', errorMessage)
      setError(`Hapus gagal: ${errorMessage}`)
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

  // Load data on mount dengan error boundary
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
    clearError
  }
}
