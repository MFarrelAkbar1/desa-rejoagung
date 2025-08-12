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
  zoomLevel?: "normal" | "zoom-out" | "zoom-in" | "zoom-out-more" | "zoom-in-more" | "zoom-in-max" | "zoom-out-extra"
}) => {
  const getImageStyle = () => {
    switch (zoomLevel) {
      case "zoom-out-extra":
        return "max-w-[60%] max-h-[60%] object-contain w-auto h-auto"
      case "zoom-out-more":
        return "max-w-[65%] max-h-[65%] object-contain w-auto h-auto"
      case "zoom-out":
        return "max-w-[70%] max-h-[70%] object-contain w-auto h-auto"
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
      case "zoom-out-extra":
        return "min-h-[180px] md:min-h-[220px] lg:min-h-[250px]"
      case "zoom-out-more":
        return "min-h-[200px] md:min-h-[240px] lg:min-h-[280px]"
      case "zoom-out":
        return "min-h-[220px] md:min-h-[260px] lg:min-h-[300px]"
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
          
          {/* Layout Desktop dan Tablet: Grid Layout yang Sederhana */}
          <div className="hidden md:block space-y-6 md:space-y-8">
            {/* Baris 1: Perkebunan dan Pangan berdampingan */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <SDAImage
                src="/tanaman-perkebunan.png"
                alt="Infografis Tanaman Perkebunan Desa Rejoagung"
                title="Tanaman Perkebunan"
                zoomLevel="normal"
              />
              
              <SDAImage
                src="/tanaman-pangan.png"
                alt="Infografis Tanaman Pangan Desa Rejoagung"
                title="Tanaman Pangan"
                zoomLevel="normal"
              />
            </div>

            {/* Baris 2: Tanaman Buah melebar penuh */}
            <SDAImage
              src="/tanaman-buah.png"
              alt="Infografis Tanaman Buah Desa Rejoagung"
              title="Tanaman Buah"
              zoomLevel="zoom-out-more"
              className="min-h-[250px] lg:min-h-[300px]"
            />

            {/* Baris 3: Tanaman Sayur melebar penuh */}
            <SDAImage
              src="/tanaman-sayur.png"
              alt="Infografis Tanaman Sayur Desa Rejoagung"
              title="Tanaman Sayur"
              zoomLevel="zoom-out-more"
              className="min-h-[250px] lg:min-h-[300px]"
            />
          </div>

          {/* Layout Mobile: Single Column */}
          <div className="md:hidden space-y-4">
            {/* Tanaman Perkebunan */}
            <SDAImage
              src="/tanaman-perkebunan.png"
              alt="Infografis Tanaman Perkebunan Desa Rejoagung"
              title="Tanaman Perkebunan"
              zoomLevel="zoom-in-more"
            />
            
            {/* Tanaman Pangan */}
            <SDAImage
              src="/tanaman-pangan.png"
              alt="Infografis Tanaman Pangan Desa Rejoagung"
              title="Tanaman Pangan"
              zoomLevel="zoom-in-more"
            />
            
            {/* Tanaman Buah */}
            <SDAImage
              src="/tanaman-buah.png"
              alt="Infografis Tanaman Buah Desa Rejoagung"
              title="Tanaman Buah"
              zoomLevel="zoom-out-more"
              className="min-h-[200px]"
            />
            
            {/* Tanaman Sayur */}
            <SDAImage
              src="/tanaman-sayur.png"
              alt="Infografis Tanaman Sayur Desa Rejoagung"
              title="Tanaman Sayur"
              zoomLevel="zoom-out-more"
              className="min-h-[200px]"
            />
          </div>
        </div>
        {/* Footer Info */}
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 bg-white rounded-lg p-4 md:p-6 border shadow-sm ">
          <div className="space-y-6 md:space-y-8">
            {/* Intro SDA */}
            <div>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Desa Rejoagung merupakan salah satu desa dengan potensi sumber daya alam yang sangat menjanjikan, khususnya di sektor pertanian dan perkebunan. Hingga saat ini, sektor pertanian menjadi tulang punggung utama perekonomian masyarakat desa. Dengan luas lahan sawah mencapai 63,776 hektare per tahun 2025, serta dukungan kondisi iklim dan struktur tanah yang subur, Desa Rejoagung mampu menghasilkan berbagai komoditas pertanian dengan produktivitas cukup tinggi.</p>
              </div>
            </div>

            {/* Pertanian */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 justify-paragraph">
                🌾 Pertanian
              </h3>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Komoditas utama yang dibudidayakan meliputi padi dan jagung, yang menjadi hasil pertanian unggulan desa. Selain itu, masyarakat juga menanam berbagai jenis tanaman hortikultura, seperti buah-buahan dan sayur-mayur, yang memiliki nilai jual tinggi dan diminati pasar. Produk-produk pertanian dari Desa Rejoagung dipasarkan ke berbagai daerah, di antaranya ke Pasar Induk Genteng di Banyuwangi dan Pasar Caringin di Bandung. Keberadaan BUMDesa yang bergerak di bidang perdagangan pertanian turut memperkuat rantai distribusi hasil panen. Melalui unit usaha ini, hasil pertanian dikelola dan dipasarkan secara lebih profesional dan terorganisir, sehingga memberikan nilai tambah bagi petani dan meningkatkan pendapatan asli desa.</p>
              </div>
            </div>

            {/* Perkebunan */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                🌴 Perkebunan
              </h3>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Selain pertanian, sektor perkebunan rakyat juga berkembang dengan cukup baik. Beberapa komoditas yang banyak dihasilkan antara lain pisang gula merah, yang diolah menjadi produk turunan seperti sale pisang dan gula merah, baik untuk konsumsi lokal maupun dipasarkan keluar desa. Komoditas unggulan lainnya adalah durian dan tembakau, yang memiliki nilai ekonomi tinggi. Hasil panen dari dua komoditas ini dipasarkan ke wilayah sekitar, seperti Banyuwangi dan Jember, dan menjadi sumber pendapatan tambahan bagi petani, terutama di luar musim tanam padi.</p>
              </div>
            </div>

            {/* Peternakan */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                🐄 Peternakan
              </h3>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Sementara itu, sektor peternakan dan perikanan di Desa Rejoagung saat ini masih dalam tahap pengembangan. Kepemilikan ternak oleh warga umumnya masih berskala kecil dan bersifat tradisional, sehingga kontribusinya terhadap perekonomian desa belum terlalu signifikan. Meski demikian, sektor ini menyimpan potensi besar untuk dikembangkan di masa depan melalui dukungan program pemerintah, pelatihan, serta inisiatif swadaya masyarakat.</p>
              </div>
            </div>
            <style jsx>{`
            .justify-paragraph p {
              text-align: justify;
              text-justify: inter-word;
            }
          `}</style>
          <div className="justify-paragraph"></div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 md:py-6">
        <div className="max-w-full px-4 text-center ">
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