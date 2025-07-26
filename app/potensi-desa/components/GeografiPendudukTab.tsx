// app/potensi-desa/components/GeografiPendudukTab.tsx

'use client'

import React from 'react'

// Komponen untuk menampilkan gambar infografis
const InfografisImage = ({ 
  src, 
  alt, 
  title,
  isRow2 = false 
}: { 
  src: string, 
  alt: string, 
  title: string,
  isRow2?: boolean 
}) => (
  <div className={`bg-white rounded-lg shadow-sm border overflow-hidden ${isRow2 ? 'h-full flex flex-col' : ''}`}>
    {/* Title */}
    <div className="p-3 md:p-4 bg-gray-50 border-b flex-shrink-0">
      <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center">
        {title}
      </h3>
    </div>
    
    {/* Image - Different handling for row 2 to prevent squishing */}
    <div className={
      isRow2 
        ? "p-2 md:p-4 flex-1 flex items-center justify-center bg-gray-50" 
        : "p-2 md:p-4"
    }>
      <img
        src={src}
        alt={alt}
        className={
          isRow2 
            ? "max-w-full max-h-full object-contain w-auto h-auto" 
            : "w-full h-auto object-contain rounded-lg"
        }
        loading="lazy"
        style={isRow2 ? { maxHeight: '500px' } : {}}
      />
    </div>
  </div>
)

export default function GeografiPendudukTab() {
  return (
    <div className="w-full bg-gray-50">
      {/* Header Infografis - Layout yang benar sesuai gambar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 md:py-6 px-4 md:px-8">
        <div className="max-w-full">
          <div className="flex items-center justify-between">
            {/* Kiri - Logo Banyuwangi + Logo Rejoagung berdampingan */}
            <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
              <img 
                src="/banyuwangi-logo.png" 
                alt="Logo Kabupaten Banyuwangi" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              />
              <img 
                src="/logo-rejoagung.png" 
                alt="Logo Desa Rejoagung" 
                className="h-12 md:h-16 lg:h-20 w-auto object-contain"
              />
            </div>

            {/* Tengah - Content */}
            <div className="flex-1 text-center px-4 md:px-8">
              <div className="text-xs md:text-sm lg:text-base font-medium mb-1 md:mb-2">
                Infografis Desa Rejoagung, Kecamatan Srono, Kabupaten Banyuwangi, Jawa Timur
              </div>
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                Geografi dan Kependudukan
              </h1>
            </div>

            {/* Kanan - Info KKN */}
            <div className="flex-shrink-0 text-right">
              <div className="text-xs md:text-sm lg:text-base">
                <div className="font-bold mb-1">KKN-PPM Serona Srono 2025</div>
                <div className="font-medium">Universitas Gadjah Mada</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - Full width without constraints */}
      <div className="w-full px-4 py-6 md:py-8">
        {/* Grid Layout untuk Infografis */}
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Row 1: Wilayah Geografi + Populasi Penduduk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Wilayah Geografi */}
            <InfografisImage
              src="/wilayah-geografi.png"
              alt="Infografis Wilayah Geografi Desa Rejoagung"
              title="Wilayah Geografis"
            />
            
            {/* Populasi Penduduk */}
            <InfografisImage
              src="/populasi-penduduk.png"
              alt="Infografis Populasi Penduduk Desa Rejoagung"
              title="Populasi Penduduk"
            />
          </div>

          {/* Row 2: Pekerjaan + Pendidikan + Agama Etnis - Equal height containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:items-stretch">
            {/* Jenis Pekerjaan */}
            <InfografisImage
              src="/jenis-pekerjaan.png"
              alt="Infografis Jenis Pekerjaan Desa Rejoagung"
              title="Jenis Pekerjaan"
              isRow2={true}
            />
            
            {/* Tingkat Pendidikan */}
            <InfografisImage
              src="/tingkat-pendidikan1.png"
              alt="Infografis Tingkat Pendidikan Desa Rejoagung"
              title="Tingkat Pendidikan"
              isRow2={true}
            />
            
            {/* Agama dan Etnis */}
            <InfografisImage
              src="/agama-etnis.png"
              alt="Infografis Agama dan Etnis Desa Rejoagung"
              title="Agama dan Etnis"
              isRow2={true}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Informasi Umum */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">
                ℹ️ Informasi Umum
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📍 <strong>Lokasi:</strong> Kecamatan Srono, Kabupaten Banyuwangi</p>
                <p>📏 <strong>Luas:</strong> 6.7776 km² dengan 4 dusun</p>
                <p>👥 <strong>Penduduk:</strong> 10.715 jiwa dalam 4.413 keluarga</p>
                <p>🏘️ <strong>Administrasi:</strong> 4 Dusun, 9 RW, 50 RT</p>
              </div>
            </div>

            {/* Potensi Unggulan */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">
                🌟 Potensi Unggulan
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🌾 <strong>Pertanian:</strong> Kelapa sawit dan padi sebagai komoditas utama</p>
                <p>👷 <strong>SDM:</strong> Mayoritas pekerja swasta dengan pendidikan SMP</p>
                <p>🕌 <strong>Sosial:</strong> Harmoni beragama dengan mayoritas Muslim</p>
                <p>🏞️ <strong>Geografis:</strong> Dataran rendah cocok untuk pertanian</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 md:py-6">
        <div className="max-w-full px-4 text-center">
          <p className="text-sm opacity-80">
            © 2025 KKN-PPM Serona Srono - Universitas Gadjah Mada
          </p>
          <p className="text-xs opacity-60 mt-1">
            Data terbaru per Juli 2025 • Sumber: Profil Desa dan Kelurahan Rejoagung
          </p>
        </div>
      </div>
    </div>
  )
}