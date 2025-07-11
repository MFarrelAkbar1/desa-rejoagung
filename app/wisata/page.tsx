// app/wisata/page.tsx
'use client'

import Breadcrumb from '@/components/layout/Breadcrumb'
import { Download } from 'lucide-react'

export default function WisataPage() {
  // URL ke file PDF di dalam folder /public
  const pdfUrl = '/Tugas 3B_Keamanan Komputer.pdf'

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Navigasi Breadcrumb */}
        <Breadcrumb items={[{ label: 'Wisata', href: '/wisata' }]} />

        <div className="bg-white rounded-xl shadow-lg mt-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Judul Halaman */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Potensi Wisata Desa Rejoagung
                </h1>
                <p className="mt-1 text-gray-500">
                  Dokumen potensi dan rencana pengembangan wisata di desa.
                </p>
              </div>

              {/* Tombol Download */}
              <a
                href={pdfUrl}
                download="Potensi Wisata Desa Rejoagung.pdf" // Nama file saat di-download
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-300 shadow-sm whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Garis Pemisah */}
          <div className="border-t border-gray-200"></div>

          {/* Area Pratinjau PDF */}
          <div className="p-2 sm:p-4 bg-gray-100">
            <div className="w-full h-[calc(100vh-250px)] min-h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-white">
              <object
                data={pdfUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                aria-label="Pratinjau PDF Potensi Wisata"
              >
                {/* Fallback untuk browser yang tidak mendukung pratinjau PDF */}
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <p className="text-gray-600 font-medium mb-4">
                    Browser Anda tidak dapat menampilkan pratinjau PDF.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Silakan klik tombol download untuk melihat dokumen.
                  </p>
                  <a
                    href={pdfUrl}
                    download="Potensi Wisata Desa Rejoagung.pdf"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
