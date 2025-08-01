'use client'

import { useState } from 'react'
import { Download, FileText, Maximize2, ExternalLink, Leaf } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function BookletFloraPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/flora.pdf'
    link.download = 'Arsip-Flora-Desa-Rejoagung.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOpenNewTab = () => {
    window.open('/flora.pdf', '_blank')
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Booklet Desa', href: '/booklet' },
            { label: 'Arsip Flora', href: '/booklet/flora' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Arsip Flora Desa</h1>
              <p className="text-gray-600">Dokumentasi keanekaragaman flora di Desa Rejoagung</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Arsip Flora</h2>
                  <p className="text-gray-600 mt-1">
                    Dokumentasi lengkap keanekaragaman flora Desa Rejoagung dalam format PDF
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
                <h3 className="text-white font-medium">Arsip Flora - Desa Rejoagung</h3>
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
                src="/flora.pdf#toolbar=1&navpanes=1&scrollbar=1"
                className="w-full h-full border-0"
                title="Arsip Flora Desa Rejoagung"
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Informasi Dokumen</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Dokumen berisi katalog flora lengkap Desa Rejoagung</li>
                  <li>• Informasi detail tentang keanekaragaman hayati flora</li>
                  <li>• Dapat diunduh untuk referensi penelitian atau edukasi</li>
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