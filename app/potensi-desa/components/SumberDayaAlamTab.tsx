// app/potensi-desa/components/SumberDayaAlamTab.tsx

'use client'

import React from 'react'

// Komponen untuk menampilkan gambar sumber daya alam
const SDAImage = ({ 
  src, 
  alt, 
  title,
  className = "",
  zoomLevel = "normal"
}: { 
  src: string, 
  alt: string, 
  title: string,
  className?: string,
  zoomLevel?: "normal" | "zoom-out" | "zoom-in" | "zoom-out-more" | "zoom-in-more" | "zoom-in-max"
}) => {
  const getImageStyle = () => {
    switch (zoomLevel) {
      case "zoom-out-more":
        return "max-w-[75%] max-h-[75%] object-contain w-auto h-auto"
      case "zoom-out":
        return "max-w-[85%] max-h-[85%] object-contain w-auto h-auto"
      case "zoom-in-max":
        return "max-w-full max-h-full object-contain w-auto h-auto scale-[1.35]"
      case "zoom-in-more":
        return "max-w-full max-h-full object-contain w-auto h-auto scale-125"
      case "zoom-in":
        return "max-w-full max-h-full object-contain w-auto h-auto scale-110"
      default:
        return "max-w-full max-h-full object-contain w-auto h-auto"
    }
  }

  const getContainerHeight = () => {
    switch (zoomLevel) {
      case "zoom-out-more":
        return "min-h-[350px] md:min-h-[450px] lg:min-h-[500px]"
      case "zoom-out":
        return "min-h-[350px] md:min-h-[450px] lg:min-h-[500px]"
      case "zoom-in-max":
        return "min-h-[300px] md:min-h-[400px] lg:min-h-[450px]"
      case "zoom-in-more":
        return "min-h-[300px] md:min-h-[400px] lg:min-h-[450px]"
      case "zoom-in":
        return "min-h-[300px] md:min-h-[400px] lg:min-h-[450px]"
      default:
        return "min-h-[300px] md:min-h-[400px] lg:min-h-[450px]"
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden h-full flex flex-col ${className}`}>
      {/* Title */}
      <div className="p-3 md:p-4 bg-gray-50 border-b flex-shrink-0">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center">
          {title}
        </h3>
      </div>
      
      {/* Image */}
      <div className={`p-2 md:p-4 flex-1 flex items-center justify-center bg-gray-50 ${getContainerHeight()}`}>
        <img
          src={src}
          alt={alt}
          className={getImageStyle()}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default function SumberDayaAlamTab() {
  return (
    <div className="w-full bg-gray-50">
      {/* Header Banner - Hijau Muda */}
      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white py-4 md:py-6 px-4 md:px-8">
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
                Desa Rejoagung, Kecamatan Srono, Kabupaten Banyuwangi, Jawa Timur
              </div>
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                Sumber Daya Alam
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

      {/* Content Area */}
      <div className="w-full px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Layout Desktop: Grid 3x3 dengan Tanaman Sayur full width di bawah */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-6 md:gap-8 h-auto">
            {/* Row 1, Col 1: Tanaman Perkebunan - DIPERBESAR LEBIH */}
            <div className="lg:col-span-1 lg:row-span-1">
              <SDAImage
                src="/tanaman-perkebunan.png"
                alt="Infografis Tanaman Perkebunan Desa Rejoagung"
                title="Tanaman Perkebunan"
                zoomLevel="zoom-in-more"
              />
            </div>

            {/* Row 1-2, Col 2-3: Tanaman Buah - KOTAK DIPERKECIL */}
            <div className="lg:col-span-2 lg:row-span-2">
              <SDAImage
                src="/tanaman-buah.png"
                alt="Infografis Tanaman Buah Desa Rejoagung"
                title="Tanaman Buah"
                zoomLevel="zoom-out-more"
                className="min-h-[300px] lg:min-h-[350px]"
              />
            </div>

            {/* Row 2, Col 1: Tanaman Pangan - DIPERBESAR LEBIH */}
            <div className="lg:col-span-1 lg:row-span-1">
              <SDAImage
                src="/tanaman-pangan.png"
                alt="Infografis Tanaman Pangan Desa Rejoagung"
                title="Tanaman Pangan"
                zoomLevel="zoom-in-more"
              />
            </div>

            {/* Row 3, Col 1-3: Tanaman Sayur - DIPERKECIL */}
            <div className="lg:col-span-3 lg:row-span-1">
              <SDAImage
                src="/tanaman-sayur.png"
                alt="Infografis Tanaman Sayur Desa Rejoagung"
                title="Tanaman Sayur"
                zoomLevel="zoom-out"
                className="min-h-[300px] lg:min-h-[400px]"
              />
            </div>
          </div>

          {/* Layout Tablet: 2 kolom dengan Tanaman Buah di bawah */}
          <div className="hidden md:grid lg:hidden gap-6 md:gap-8">
            {/* Row 1: Perkebunan dan Pangan - DIPERBESAR LEBIH */}
            <div className="grid md:grid-cols-2 gap-6">
              <SDAImage
                src="/tanaman-perkebunan.png"
                alt="Infografis Tanaman Perkebunan Desa Rejoagung"
                title="Tanaman Perkebunan"
                zoomLevel="zoom-in-more"
              />
              
              <SDAImage
                src="/tanaman-pangan.png"
                alt="Infografis Tanaman Pangan Desa Rejoagung"
                title="Tanaman Pangan"
                zoomLevel="zoom-in-max"
              />
            </div>

            {/* Row 2: Sayur full width - DIPERKECIL */}
            <SDAImage
              src="/tanaman-sayur.png"
              alt="Infografis Tanaman Sayur Desa Rejoagung"
              title="Tanaman Sayur"
              zoomLevel="zoom-out"
            />

            {/* Row 3: Buah full width - KOTAK DIPERKECIL */}
            <SDAImage
              src="/tanaman-buah.png"
              alt="Infografis Tanaman Buah Desa Rejoagung"
              title="Tanaman Buah"
              zoomLevel="zoom-out-more"
              className="min-h-[350px]"
            />
          </div>

          {/* Layout Mobile: Single Column */}
          <div className="md:hidden space-y-4">
            {/* Tanaman Perkebunan - DIPERBESAR LEBIH */}
            <SDAImage
              src="/tanaman-perkebunan.png"
              alt="Infografis Tanaman Perkebunan Desa Rejoagung"
              title="Tanaman Perkebunan"
              zoomLevel="zoom-in-more"
            />
            
            {/* Tanaman Pangan - DIPERBESAR MAKSIMAL */}
            <SDAImage
              src="/tanaman-pangan.png"
              alt="Infografis Tanaman Pangan Desa Rejoagung"
              title="Tanaman Pangan"
              zoomLevel="zoom-in-max"
            />
            
            {/* Tanaman Sayur - DIPERKECIL */}
            <SDAImage
              src="/tanaman-sayur.png"
              alt="Infografis Tanaman Sayur Desa Rejoagung"
              title="Tanaman Sayur"
              zoomLevel="zoom-out"
            />
            
            {/* Tanaman Buah - KOTAK DIPERKECIL */}
            <SDAImage
              src="/tanaman-buah.png"
              alt="Infografis Tanaman Buah Desa Rejoagung"
              title="Tanaman Buah"
              zoomLevel="zoom-out-more"
              className="min-h-[300px]"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Potensi Alam */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">
                🌱 Potensi Sumber Daya Alam
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🌴 <strong>Perkebunan:</strong> Kelapa sawit sebagai komoditas utama</p>
                <p>🌾 <strong>Pangan:</strong> Padi, jagung, dan umbi-umbian lokal</p>
                <p>🍊 <strong>Buah-buahan:</strong> Jeruk, mangga, dan buah tropis</p>
                <p>🥬 <strong>Sayuran:</strong> Cabai, tomat, dan sayuran hijau</p>
              </div>
            </div>

            {/* Karakteristik Lahan */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">
                🌍 Karakteristik Lahan
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🌿 <strong>Iklim:</strong> Tropis dengan curah hujan tinggi</p>
                <p>🏞️ <strong>Topografi:</strong> Dataran rendah yang subur</p>
                <p>💧 <strong>Irigasi:</strong> Sistem pengairan yang memadai</p>
                <p>🌱 <strong>Produktivitas:</strong> Lahan cocok untuk pertanian intensif</p>
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
            Data terbaru per Juli 2025 • Sumber: Data Potensi Sumber Daya Alam Desa Rejoagung
          </p>
        </div>
      </div>
    </div>
  )
}