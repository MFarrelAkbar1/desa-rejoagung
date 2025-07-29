// app/potensi-desa/components/SaranaPrasaranaTab.tsx

'use client'

import React from 'react'

// Komponen untuk menampilkan gambar sarana prasarana
const SaranaPrasaranaImage = ({ 
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
  zoomLevel?: "normal" | "zoom-out" | "zoom-in"
}) => {
  const getImageStyle = () => {
    switch (zoomLevel) {
      case "zoom-out":
        return "max-w-[85%] max-h-[85%] object-contain w-auto h-auto"
      case "zoom-in":
        return "max-w-full max-h-full object-contain w-auto h-auto scale-110"
      default:
        return "max-w-full max-h-full object-contain w-auto h-auto"
    }
  }

  const getContainerHeight = () => {
    switch (zoomLevel) {
      case "zoom-out":
        return "min-h-[350px] md:min-h-[450px] lg:min-h-[500px]"
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

export default function SaranaPrasaranaTab() {
  return (
    <div className="w-full bg-gray-50">
      {/* Header Banner - Coklat Muda */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 md:py-6 px-4 md:px-8">
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
                Sarana dan Prasarana
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
          
          {/* Layout Desktop: Grid 2 baris */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-6 md:gap-8 h-auto">
            {/* Row 1, Col 1-2: Layanan Kesehatan (vertikal, memanjang horizontal) */}
            <div className="lg:col-span-2 lg:row-span-1">
              <SaranaPrasaranaImage
                src="/layanan-kesehatan.png"
                alt="Infografis Layanan Kesehatan Desa Rejoagung"
                title="Layanan Kesehatan"
                zoomLevel="zoom-out"
              />
            </div>

            {/* Row 2, Col 1: Jumlah Sekolah */}
            <div className="lg:col-span-1 lg:row-span-1">
              <SaranaPrasaranaImage
                src="/jumlah-sekolah.png"
                alt="Infografis Jumlah Sekolah Desa Rejoagung"
                title="Jumlah Sekolah"
                zoomLevel="zoom-out"
              />
            </div>

            {/* Row 2, Col 2: Rumah dengan Akses Internet */}
            <div className="lg:col-span-1 lg:row-span-1">
              <SaranaPrasaranaImage
                src="/internet.png"
                alt="Infografis Rumah dengan Akses Internet Desa Rejoagung"
                title="Rumah dengan Akses Internet"
                zoomLevel="zoom-out"
              />
            </div>
          </div>

          {/* Layout Tablet: 2 kolom */}
          <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 md:gap-8">
            {/* Layanan Kesehatan - Full width */}
            <div className="md:col-span-2">
              <SaranaPrasaranaImage
                src="/layanan-kesehatan.png"
                alt="Infografis Layanan Kesehatan Desa Rejoagung"
                title="Layanan Kesehatan"
                zoomLevel="zoom-out"
              />
            </div>
            
            {/* Jumlah Sekolah */}
            <SaranaPrasaranaImage
              src="/jumlah-sekolah.png"
              alt="Infografis Jumlah Sekolah Desa Rejoagung"
              title="Jumlah Sekolah"
              zoomLevel="normal"
            />
            
            {/* Internet */}
            <SaranaPrasaranaImage
              src="/internet.png"
              alt="Infografis Rumah dengan Akses Internet Desa Rejoagung"
              title="Rumah dengan Akses Internet"
              zoomLevel="normal"
            />
          </div>

          {/* Layout Mobile: Single Column */}
          <div className="md:hidden space-y-4 md:space-y-6">
            {/* Layanan Kesehatan */}
            <SaranaPrasaranaImage
              src="/layanan-kesehatan.png"
              alt="Infografis Layanan Kesehatan Desa Rejoagung"
              title="Layanan Kesehatan"
              zoomLevel="zoom-out"
            />
            
            {/* Jumlah Sekolah */}
            <SaranaPrasaranaImage
              src="/jumlah-sekolah.png"
              alt="Infografis Jumlah Sekolah Desa Rejoagung"
              title="Jumlah Sekolah"
              zoomLevel="normal"
            />
            
            {/* Internet */}
            <SaranaPrasaranaImage
              src="/internet.png"
              alt="Infografis Rumah dengan Akses Internet Desa Rejoagung"
              title="Rumah dengan Akses Internet"
              zoomLevel="normal"
            />
          </div>
        </div>
        {/* Footer Info */}
        <div className="max-w-7xl mx-auto mt-8 md:mt-12 bg-white rounded-lg p-4 md:p-6 border shadow-sm">
          <div className="space-y-6 md:space-y-8">
          <div>
            <div className="text-xl md:text-xl text-black justify-paragraph">
            <p>Dalam upaya meningkatkan kualitas hidup masyarakat, Desa Rejoagung terus berupaya mengembangkan sarana dan prasarana dasar yang mendukung kegiatan sosial, ekonomi, dan kesehatan warga. Untuk menunjang mobilitas dan kebutuhan darurat masyarakat, desa menyediakan mobil desa sebagai sarana transportasi umum bagi keperluan administratif maupun sosial. Selain itu, terdapat juga ambulans desa yang siap digunakan dalam keadaan darurat medis.</p>
            </div>
          </div>

            <div>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Di bidang kesehatan, desa memiliki 9 Posyandu aktif yang tersebar di beberapa titik dusun. Posyandu ini secara rutin memberikan pelayanan kesehatan ibu dan anak, imunisasi, penimbangan balita, serta edukasi gizi. Dari segi infrastruktur, Desa Rejoagung telah memiliki akses jalan yang cukup baik dengan sebagian besar jalannya sudah beraspal, serta keberadaan Jembatan Gantung Rejoagung yang menghubungkan antarwilayah desa dan mempermudah akses warga, terutama di daerah yang dipisahkan oleh aliran sungai atau medan berat.</p>
              </div>
            </div>

            <div>
              <div className="text-xl md:text-xl text-black justify-paragraph">
                <p>Meski demikian, jumlah fasilitas pendidikan formal di desa masih tergolong minim, terutama jika dibandingkan dengan jumlah penduduk yang terus bertambah. Hal ini menjadi tantangan tersendiri dalam penyediaan layanan pendidikan yang merata dan berkualitas, khususnya untuk anak-anak usia sekolah.</p>
              </div>
            </div>

            <div>
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
        <div className="max-w-full px-4 text-center">
          <p className="text-sm opacity-80">
            © 2025 KKN-PPM Serona Srono - Universitas Gadjah Mada
          </p>
          <p className="text-xs opacity-60 mt-1">
            Data terbaru per Juli 2025 • Sumber: Data Sarana Prasarana Desa Rejoagung
          </p>
        </div>
      </div>
    </div>
  )
}