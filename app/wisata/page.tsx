'use client'

import { FileText, Download, Eye, Calendar, MapPin } from 'lucide-react'

export default function WisataPage() {
  const wisataPDFs = [
    {
      id: 1,
      title: 'Panduan Wisata Desa Rejoagung 2025',
      description: 'Panduan lengkap destinasi wisata, kuliner, dan aktivitas menarik di Desa Rejoagung',
      fileSize: '2.5 MB',
      pages: 24,
      lastUpdated: '15 Juni 2025',
      downloadUrl: '/files/panduan-wisata-rejoagung-2025.pdf',
      previewUrl: '/files/panduan-wisata-rejoagung-2025.pdf'
    },
    {
      id: 2,
      title: 'Peta Wisata Desa Rejoagung',
      description: 'Peta detail lokasi wisata, penginapan, dan fasilitas umum di sekitar desa',
      fileSize: '1.8 MB',
      pages: 4,
      lastUpdated: '10 Juni 2025',
      downloadUrl: '/files/peta-wisata-rejoagung.pdf',
      previewUrl: '/files/peta-wisata-rejoagung.pdf'
    }
  ]

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 mr-4 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Wisata Desa Rejoagung</h1>
              <p className="text-gray-600">Panduan dan Informasi Wisata dalam Format PDF</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              📋 <strong>Informasi:</strong> Dokumen wisata tersedia dalam format PDF untuk memudahkan 
              Anda membaca offline dan mencetak sebagai panduan perjalanan.
            </p>
          </div>
        </div>

        {/* PDF Documents */}
        <div className="grid gap-6">
          {wisataPDFs.map((pdf) => (
            <div key={pdf.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FileText className="w-6 h-6 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800">{pdf.title}</h3>
                    <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                      PDF
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{pdf.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{pdf.pages} halaman</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      <span>{pdf.fileSize}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{pdf.lastUpdated}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Desa Rejoagung</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => window.open(pdf.previewUrl, '_blank')}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button 
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = pdf.downloadUrl
                    link.download = pdf.title + '.pdf'
                    link.click()
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">ℹ️ Informasi Tambahan</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">📱 Format Digital</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Kompatibel dengan semua perangkat</li>
                <li>• Dapat dibaca offline</li>
                <li>• Resolusi tinggi untuk cetak</li>
                <li>• Ukuran file dioptimalkan</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔄 Update Berkala</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Informasi selalu terkini</li>
                <li>• Update setiap 3 bulan</li>
                <li>• Notifikasi otomatis tersedia</li>
                <li>• Versi lama tetap dapat diakses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}