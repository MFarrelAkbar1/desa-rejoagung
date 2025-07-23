// app/potensi-desa/wisata/page.tsx
'use client'

import { Download } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function WisataPage() {
  const pdfUrl = '/Tugas 3B_Keamanan Komputer.pdf'
  
  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Tugas 3B_Keamanan Komputer.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Potensi Desa', href: '/potensi-desa' },
            { label: 'Wisata', href: '/potensi-desa/wisata' },
          ]}
        />
        
        <div className="bg-white rounded-xl shadow-lg mt-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Wisata Desa Rejoagung
                </h1>
                <p className="text-gray-600 mt-1">
                  Dokumen wisata Desa Rejoagung
                </p>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="w-full h-[800px] border rounded-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="Wisata Desa Rejoagung"
              >
                <p>Browser Anda tidak mendukung tampilan PDF. <a href={pdfUrl}>Download PDF</a></p>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}