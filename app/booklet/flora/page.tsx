'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Maximize2, ExternalLink, Leaf, Smartphone, Monitor, AlertCircle } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function BookletFloraPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pdfError, setPdfError] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect mobile and handle hydration
  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
      // Kurangi waktu loading untuk desktop
      setTimeout(() => setIsLoading(false), isMobileDevice ? 500 : 100)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/flora.pdf'
    link.download = 'Arsip-Flora-Desa-Rejoagung.pdf'
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOpenNewTab = () => {
    // Multiple fallback methods for opening PDF
    try {
      const newWindow = window.open('/flora.pdf', '_blank')
      if (!newWindow) {
        // Fallback if popup blocked
        window.location.href = '/flora.pdf'
      }
    } catch (error) {
      // Final fallback
      window.location.href = '/flora.pdf'
    }
  }

  const handlePdfError = () => {
    setPdfError(true)
  }

  // Simplified loading component
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Show loading only for mobile, skip for desktop
  if (isLoading && isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mobile-container py-4 md:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mobile-card animate-pulse">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 p-3 rounded-xl mr-4 w-14 h-14"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mobile PDF Viewer Component
  const MobilePDFViewer = () => (
    <div className="mobile-card">
      <div className="text-center py-8">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-12 h-12 text-green-600" />
        </div>
        
        <h3 className="mobile-heading mb-2">Arsip Flora PDF</h3>
        <p className="mobile-text mb-6 max-w-md mx-auto text-gray-600">
          Dokumentasi keanekaragaman flora Desa Rejoagung
        </p>

        {/* Document Preview */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 max-w-sm mx-auto">
          <div className="aspect-[3/4] bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center p-4">
              <Leaf className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Arsip Flora</p>
              <p className="text-xs text-gray-400">Desa Rejoagung</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                <FileText className="w-3 h-3" />
                <span>PDF Document</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-3 max-w-sm mx-auto mb-6">
          <button
            onClick={handleOpenNewTab}
            className="w-full mobile-button bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-3 text-base font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            Buka PDF di Tab Baru
          </button>
          
          <button
            onClick={handleDownload}
            className="w-full mobile-button bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Mobile Tips */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="font-semibold text-amber-800 text-sm mb-1">Tips Mobile</h4>
              <p className="mobile-text text-amber-700">
                PDF akan terbuka di aplikasi pembaca default perangkat Anda untuk tampilan yang optimal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Desktop PDF Viewer Component
  const DesktopPDFViewer = () => (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {isFullscreen && (
        <div className="bg-gray-800 p-3 flex justify-between items-center">
          <h3 className="text-white font-medium">Arsip Flora - Desa Rejoagung</h3>
          <button
            onClick={handleFullscreen}
            className="text-white hover:text-gray-300 p-1 rounded"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className={`relative ${isFullscreen ? 'h-full' : 'h-[800px]'} bg-gray-50`}>
        {!pdfError ? (
          <iframe
            src="/flora.pdf#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
            className="w-full h-full border-0"
            title="Arsip Flora Desa Rejoagung"
            onLoad={() => setIsLoading(false)}
            onError={handlePdfError}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
            <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
            <p className="text-gray-600 text-center mb-4 max-w-md">
              Tidak dapat memuat PDF. Browser Anda mungkin tidak mendukung tampilan PDF secara langsung.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleOpenNewTab}
                className="mobile-button bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Buka di Tab Baru
              </button>
              <button
                onClick={handleDownload}
                className="mobile-button bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-zoom-container">
        <div className="mobile-container py-4 md:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: 'Booklet Desa', href: '/booklet' },
                { label: 'Arsip Flora', href: '/booklet/flora' },
              ]}
            />

            {/* Header */}
            <div className="mobile-card mt-6">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="bg-green-100 p-2 md:p-3 rounded-xl mr-3 md:mr-4 flex-shrink-0">
                  <Leaf className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="mobile-heading text-black">Arsip Flora Desa Rejoagung</h1>
                  <p className="mobile-text text-black">Dokumentasi lengkap keanekaragaman flora Tim KKN-PPM UGM</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 md:space-y-6">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 md:p-6 border border-green-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="bg-green-100 p-2 md:p-3 rounded-xl flex-shrink-0">
                      <Leaf className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-2xl font-bold text-gray-800">Arsip Flora</h2>
                      <p className="mobile-text text-gray-600">
                        Dokumentasi keanekaragaman flora Desa Rejoagung Tim KKN-PPM UGM Serona Srono 2025
                      </p>
                    </div>
                  </div>
                  
                  {/* Device Indicator */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 rounded-lg px-3 py-2">
                    {isMobile ? (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Mobile View</span>
                      </>
                    ) : (
                      <>
                        <Monitor className="w-4 h-4" />
                        <span>Desktop View</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Desktop Action Buttons */}
                {!isMobile && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={handleDownload}
                      className="mobile-button bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleOpenNewTab}
                      className="mobile-button bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Buka di Tab Baru
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="mobile-button bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2 text-sm"
                    >
                      <Maximize2 className="w-4 h-4" />
                      {isFullscreen ? 'Normal' : 'Fullscreen'}
                    </button>
                  </div>
                )}
              </div>

              {/* PDF Viewer Section - Conditional Rendering */}
              {isMobile ? <MobilePDFViewer /> : <DesktopPDFViewer />}

              {/* Info Section */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 mb-2">Informasi Arsip Flora</h4>
                    <ul className="mobile-text text-green-700 space-y-1">
                      <li>• Dokumentasi lengkap keanekaragaman flora dan kekayaan alam Desa Rejoagung</li>
                      <li>• Hasil penelitian dan pendataan Tim KKN-PPM UGM Serona Srono 2025</li>
                      <li>• Berisi foto, nama latin, dan deskripsi berbagai spesies tumbuhan</li>
                      <li>• {isMobile ? 'Tap "Buka di Tab Baru" untuk tampilan optimal di mobile' : 'Gunakan mode fullscreen untuk kemudahan membaca'}</li>
                      <li>• Dokumen dapat diunduh untuk referensi atau dokumentasi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}