'use client'

import { useState } from 'react'
import { Download, FileText, Maximize2, ExternalLink, BarChart3 } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function BookletStatistikPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Booklet.pdf'
    link.download = 'Booklet-Statistik-Desa-Rejoagung.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOpenNewTab = () => {
    window.open('/Booklet.pdf', '_blank')
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Booklet Desa', href: '/booklet' },
            { label: 'Statistik', href: '/booklet/statistik' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Booklet Statistik Desa</h1>
              <p className="text-gray-600">Dokumen lengkap data statistik Desa Rejoagung</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Booklet Statistik</h2>
                  <p className="text-gray-600 mt-1">
                    Dokumen lengkap data statistik Desa Rejoagung dalam format PDF
                  </p>
                </div>
              </div>
             
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={handleOpenNewTab}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka di Tab Baru
                </button>
                <button
                  onClick={handleFullscreen}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {isFullscreen ? 'Normal' : 'Fullscreen'}
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer Section */}
          <div className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${
            isFullscreen ? 'fixed inset-4 z-50' : ''
          }`}>
            {isFullscreen && (
              <div className="bg-gray-800 p-3 flex justify-between items-center">
                <h3 className="text-white font-medium">Booklet Statistik - Desa Rejoagung</h3>
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-gray-300 p-1 rounded"
                >
                  ✕
                </button>
              </div>
            )}
           
            <div className={`relative ${isFullscreen ? 'h-full' : 'h-[800px]'}`}>
              <iframe
                src="/Booklet.pdf#toolbar=1&navpanes=1&scrollbar=1"
                className="w-full h-full border-0"
                title="Booklet Statistik Desa Rejoagung"
                loading="lazy"
              >
                <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center mb-4">
                    Browser Anda tidak mendukung tampilan PDF secara langsung.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                </div>
              </iframe>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 p-2 rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Informasi Dokumen</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Dokumen berisi data statistik lengkap Desa Rejoagung</li>
                  <li>• Dapat diunduh untuk referensi offline</li>
                  <li>• Gunakan tombol "Buka di Tab Baru" untuk tampilan yang lebih leluasa</li>
                  <li>• Mode fullscreen tersedia untuk kemudahan membaca</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}