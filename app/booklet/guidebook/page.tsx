'use client'

import { useState } from 'react'
import { Download, FileText, Maximize2, ExternalLink, BookOpen } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function BookletGuidebookPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/guide-book.pdf'
    link.download = 'e-Guidebook-Desa-Rejoagung-UGM.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOpenNewTab = () => {
    window.open('/guide-book.pdf', '_blank')
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Booklet Desa', href: '/booklet' },
            { label: 'E-GuideBook UGM', href: '/booklet/guidebook' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">E-GuideBook Desa UGM</h1>
              <p className="text-gray-600">e-Guidebook Desa Rejoagung Tim KKN-PPM UGM Serona Srono 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">E-GuideBook UGM</h2>
                  <p className="text-gray-600">Tim KKN-PPM UGM Serona Srono 2025</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleOpenNewTab}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka di Tab Baru
                </button>
                <button
                  onClick={handleFullscreen}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
          }`}>
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-700">e-Guidebook Desa Rejoagung UGM</span>
              </div>
              <div className="flex items-center space-x-2">
                {isFullscreen && (
                  <button
                    onClick={handleFullscreen}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
                <p className="text-sm text-gray-500">
                  Gunakan kontrol zoom di dalam PDF untuk memperbesar tampilan
                </p>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className={`${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[800px]'}`}>
              <iframe
                src="/guide-book.pdf"
                className="w-full h-full border-0"
                title="E-GuideBook Desa Rejoagung UGM"
              >
                <p className="p-4 text-center text-gray-500">
                  Browser Anda tidak mendukung tampilan PDF. 
                  <button
                    onClick={handleDownload}
                    className="text-purple-600 hover:text-purple-700 underline ml-1"
                  >
                    Klik di sini untuk mengunduh PDF
                  </button>
                </p>
              </iframe>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Informasi E-GuideBook</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Panduan lengkap hasil kerja Tim KKN-PPM UGM Serona Srono 2025</li>
                  <li>• Berisi dokumentasi kegiatan dan program-program unggulan</li>
                  <li>• Informasi detail tentang kontribusi mahasiswa UGM di Desa Rejoagung</li>
                  <li>• Gunakan tombol "Buka di Tab Baru" untuk tampilan yang lebih leluasa</li>
                  <li>• Mode fullscreen tersedia untuk kemudahan membaca</li>
                  <li>• Dokumen dapat diunduh untuk referensi atau dokumentasi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}