'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Package,
  Star,
  MapPin,
  Phone,
  ShoppingCart,
  Truck,
  Award,
  Users,
  Factory,
  Leaf,
  Heart,
  Info
} from 'lucide-react'

export default function ProdukUnggulanPage() {
  const [selectedProduct, setSelectedProduct] = useState<'gula' | 'sale' | null>(null)

  const products = [
    {
      id: 'gula',
      name: 'Gula Merah (Gula Kelapa)',
      image: '/gula-merah.jpg',
      description: 'Gula merah murni dari nira kelapa segar, diolah secara tradisional oleh pengrajin berpengalaman',
      price: 'Rp 15.000 - 25.000',
      unit: 'per kilogram',
      features: [
        'Tanpa bahan pengawet',
        'Proses tradisional turun temurun',
        'Rasa manis alami',
        'Kualitas premium',
        'Tahan lama'
      ],
      benefits: [
        'Mengandung mineral alami',
        'Indeks glikemik lebih rendah',
        'Cocok untuk diabetes (konsultasi dokter)',
        'Aroma dan rasa khas'
      ],
      markets: ['Bali', 'Surabaya', 'Jakarta', 'Malang'],
      production: '500-800 kg per bulan',
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300'
    },
    {
      id: 'sale',
      name: 'Sale Pisang',
      image: '/sale-pisang.jpg',
      description: 'Sale pisang berkualitas tinggi dari Agroindustri UD. Sejati, dibuat dengan pisang pilihan dan bumbu tradisional',
      price: 'Rp 25.000 - 35.000',
      unit: 'per kemasan 500g',
      features: [
        'Pisang pilihan terbaik',
        'Bumbu rahasia tradisional',
        'Tekstur renyah tahan lama',
        'Kemasan higienis',
        'Kontrol kualitas ketat'
      ],
      benefits: [
        'Sumber energi alami',
        'Mengandung potasium',
        'Camilan sehat keluarga',
        'Tahan lama tanpa pengawet'
      ],
      markets: ['Banyuwangi', 'Jember', 'Surabaya', 'Bali'],
      production: '200-300 kemasan per minggu',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300'
    }
  ]

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
       
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 border-4 border-gray-200">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-4 rounded-2xl mr-6">
              <Package className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                🌟 Produk Unggulan Desa Rejoagung
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Gula Merah & Sale Pisang Berkualitas Tinggi yang Terkenal Hingga Bali & Surabaya
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-green-300 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-600 p-4 rounded-2xl mr-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-700">2</div>
                  <div className="text-lg font-semibold text-green-600">Produk Unggulan</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-300 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-blue-600 p-4 rounded-2xl mr-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-700">50+</div>
                  <div className="text-lg font-semibold text-blue-600">Pengrajin Aktif</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-3 border-purple-300 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-purple-600 p-4 rounded-2xl mr-4">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-700">4+</div>
                  <div className="text-lg font-semibold text-purple-600">Kota Pemasaran</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-3 border-orange-300 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-orange-600 p-4 rounded-2xl mr-4">
                  <Factory className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-700">15+</div>
                  <div className="text-lg font-semibold text-orange-600">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className={`${product.bgColor} border-4 ${product.borderColor} rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300`}
            >
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute top-4 left-4 ${product.color} text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg`}>
                  🌟 UNGGULAN
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-2 rounded-xl">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                    <span className="font-bold text-gray-800">4.8/5</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                  <Package className="w-8 h-8 mr-3 text-gray-600" />
                  {product.name}
                </h2>
               
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Price */}
                <div className="bg-white rounded-xl p-4 mb-6 border-3 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">{product.price}</span>
                      <span className="text-lg text-gray-600 ml-2">{product.unit}</span>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                    <Leaf className="w-6 h-6 mr-2 text-green-600" />
                    ✨ Keunggulan:
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-lg text-gray-700">
                        <span className="text-green-600 mr-3 text-xl">✓</span>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-red-600" />
                    💪 Manfaat:
                  </h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-lg text-gray-700">
                        <span className="text-red-600 mr-3 text-xl">♥</span>
                        <span className="font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Markets */}
                <div className="bg-white rounded-xl p-4 border-3 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <Truck className="w-6 h-6 mr-2 text-blue-600" />
                    🚚 Dipasarkan ke:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.markets.map((market, index) => (
                      <span
                        key={index}
                        className={`${product.color} text-white px-3 py-2 rounded-lg font-semibold text-base shadow-md`}
                      >
                        📍 {market}
                      </span>
                    ))}
                  </div>
                  <p className="text-base text-gray-600 mt-3 font-medium">
                    📊 Produksi: <strong>{product.production}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-4 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            📞 Informasi Pemesanan
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-amber-50 border-3 border-amber-300 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
                🍯 Gula Merah (Gula Kelapa)
              </h3>
              <div className="space-y-3 text-lg">
                <p className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-amber-600" />
                  <span><strong>Pengrajin:</strong> Kelompok Tani Sejahtera</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-amber-600" />
                  <span><strong>Telepon:</strong> +62 812-3456-7890</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-amber-600" />
                  <span><strong>Lokasi:</strong> Dusun Krajan, Desa Rejoagung</span>
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-amber-700 font-medium">
                    💰 <strong>Minimal Order:</strong> 10 kg<br/>
                    🚚 <strong>Pengiriman:</strong> Tersedia ke seluruh Jawa & Bali
                  </p>
                </div>
              </div>
            </div>

            {/* Sale Pisang Contact */}
            <div className="bg-yellow-50 border-3 border-yellow-300 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                🍌 Sale Pisang UD. Sejati
              </h3>
              <div className="space-y-3 text-lg">
                <p className="flex items-center">
                  <Factory className="w-6 h-6 mr-3 text-yellow-600" />
                  <span><strong>Perusahaan:</strong> Agroindustri UD. Sejati</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-yellow-600" />
                  <span><strong>Telepon:</strong> +62 813-4567-8901</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-yellow-600" />
                  <span><strong>Alamat:</strong> Jl. Raya Srono No. 45, Rejoagung</span>
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-yellow-700 font-medium">
                    💰 <strong>Minimal Order:</strong> 5 kemasan<br/>
                    🚚 <strong>Pengiriman:</strong> Same day delivery area Banyuwangi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-100 border-4 border-green-300 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="bg-green-600 p-4 rounded-2xl mr-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-green-800">
              🏆 Prestasi & Pengakuan
            </h3>
          </div>
         
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border-3 border-green-200 shadow-lg text-center">
              <div className="text-4xl mb-3">🥇</div>
              <h4 className="text-xl font-bold text-green-800 mb-2">Juara 1 Gula Merah Terbaik</h4>
              <p className="text-green-700">Lomba Produk Unggulan Kabupaten Banyuwangi 2024</p>
            </div>
           
            <div className="bg-white rounded-xl p-6 border-3 border-blue-200 shadow-lg text-center">
              <div className="text-4xl mb-3">📜</div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">Sertifikat Halal</h4>
              <p className="text-blue-700">MUI Jawa Timur untuk semua produk unggulan desa</p>
            </div>
           
            <div className="bg-white rounded-xl p-6 border-3 border-purple-200 shadow-lg text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="text-xl font-bold text-purple-800 mb-2">Rating 4.8/5</h4>
              <p className="text-purple-700">Dari 500+ pelanggan setia di seluruh Indonesia</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 border-3 border-gray-200">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 mr-2 text-blue-600" />
              <h4 className="text-2xl font-bold text-gray-800">💡 Mengapa Memilih Produk Desa Rejoagung?</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <span><strong>Kualitas Terjamin:</strong> Proses produksi yang sudah teruji puluhan tahun</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <span><strong>Harga Terjangkau:</strong> Langsung dari pengrajin tanpa perantara</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <span><strong>Pengiriman Aman:</strong> Kemasan khusus untuk menjaga kualitas produk</span>
                </li>
              </ul>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">✓</span>
                  <span><strong>Mendukung UMKM:</strong> Membeli berarti membantu ekonomi desa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">✓</span>
                  <span><strong>Tradisi Turun Temurun:</strong> Resep dan teknik yang diwariskan generasi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl">✓</span>
                  <span><strong>Pelayanan Ramah:</strong> Customer service yang siap membantu 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}