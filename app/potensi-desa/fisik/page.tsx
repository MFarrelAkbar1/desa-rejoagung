// app/potensi-desa/fisik/page.tsx
'use client'

import { TreePine, Waves, Sun, Wheat, Fish } from 'lucide-react'

interface PotensiItem {
    id: string
    title: string
    description: string
    icon: any
    details: string[]
    stats?: {
        label: string
        value: string
    }[]
}

const potensiFisik: PotensiItem[] = [
    {
        id: 'tanah',
        title: 'Tanah',
        description: 'Kondisi tanah yang subur dan cocok untuk berbagai jenis tanaman',
        icon: TreePine,
        details: [
            'Jenis tanah alluvial yang subur',
            'pH tanah berkisar 6.0-7.0 (optimal untuk pertanian)',
            'Kandungan bahan organik tinggi',
            'Drainase baik dengan struktur tanah gembur'
        ],
        stats: [
            { label: 'Luas Area Pertanian', value: '450 Ha' },
            { label: 'Tingkat Kesuburan', value: '85%' }
        ]
    },
    {
        id: 'air',
        title: 'Sumber Daya Air',
        description: 'Ketersediaan air yang melimpah untuk kebutuhan pertanian dan domestik',
        icon: Waves,
        details: [
            'Sungai yang mengalir sepanjang tahun',
            'Sumur artesis dengan kualitas air baik',
            'Sistem irigasi teknis yang teratur',
            'Curah hujan rata-rata 2.500 mm/tahun'
        ],
        stats: [
            { label: 'Sumber Air', value: '12 Titik' },
            { label: 'Kualitas Air', value: 'Baik' }
        ]
    },
    {
        id: 'iklim',
        title: 'Iklim',
        description: 'Kondisi iklim tropis yang mendukung pertumbuhan tanaman',
        icon: Sun,
        details: [
            'Iklim tropis dengan 2 musim',
            'Suhu rata-rata 26-30°C',
            'Kelembaban udara 70-80%',
            'Penyinaran matahari 6-8 jam/hari'
        ],
        stats: [
            { label: 'Suhu Rata-rata', value: '28°C' },
            { label: 'Curah Hujan', value: '2.500mm/th' }
        ]
    },
    {
        id: 'pertanian',
        title: 'Hasil Pertanian',
        description: 'Produksi pertanian yang beragam dan berkualitas',
        icon: Wheat,
        details: [
            'Padi dengan produktivitas 6-7 ton/ha',
            'Kelapa sawit sebagai komoditas utama',
            'Jagung, kacang tanah, dan singkong',
            'Sayuran seperti cabai, tomat, dan kangkung'
        ],
        stats: [
            { label: 'Produktivitas Padi', value: '6.5 ton/ha' },
            { label: 'Luas Sawit', value: '200 Ha' }
        ]
    },
    // Cow (Peternakan) item removed as requested
    {
        id: 'perikanan',
        title: 'Perikanan',
        description: 'Pengembangan budidaya ikan di kolam dan sungai',
        icon: Fish,
        details: [
            'Kolam ikan air tawar',
            'Budidaya lele, nila, dan gurame',
            'Ikan patin dan mas',
            'Budidaya ikan hias'
        ],
        stats: [
            { label: 'Jumlah Kolam', value: '45 unit' },
            { label: 'Produksi/bulan', value: '800 kg' }
        ]
    }
]

export default function PotensiFisikPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <TreePine className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Potensi Fisik Desa Rejoagung
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Kekayaan sumber daya alam dan kondisi geografis yang mendukung pembangunan berkelanjutan
                    </p>
                </div>

                {/* Overview Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                            <TreePine className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tanah Subur</h3>
                        <p className="text-gray-600">450 Ha lahan pertanian produktif</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                            <Waves className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Sumber Air</h3>
                        <p className="text-gray-600">12 titik sumber air berkualitas</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                            <Sun className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Iklim Ideal</h3>
                        <p className="text-gray-600">Tropis dengan curah hujan optimal</p>
                    </div>
                </div>

                {/* Detailed Potensi */}
                <div className="space-y-8">
                    {potensiFisik.map((item, index) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <item.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{item.description}</p>
                                        
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* Details */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail & Karakteristik:</h3>
                                                <ul className="space-y-3">
                                                    {item.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-start space-x-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-700">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            
                                            {/* Statistics */}
                                            {item.stats && (
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik:</h3>
                                                    <div className="space-y-4">
                                                        {item.stats.map((stat, idx) => (
                                                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                                                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                                                                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress indicator */}
                            <div className="bg-gray-50 px-8 py-4">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Potensi {index + 1} dari {potensiFisik.length}</span>
                                    <div className="flex space-x-1">
                                        {potensiFisik.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full ${
                                                    idx === index ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white p-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Ringkasan Potensi Fisik</h2>
                        <p className="text-green-100 mb-6 text-lg max-w-3xl mx-auto">
                            Desa Rejoagung memiliki kekayaan sumber daya alam yang luar biasa dengan kondisi geografis 
                            yang sangat mendukung pengembangan sektor pertanian, peternakan, dan perikanan sebagai 
                            tulang punggung perekonomian desa.
                        </p>
                        
                        <div className="grid md:grid-cols-4 gap-6 mt-8">
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-2xl font-bold">450 Ha</div>
                                <div className="text-green-100 text-sm">Lahan Produktif</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-2xl font-bold">6.5 ton/ha</div>
                                <div className="text-green-100 text-sm">Produktivitas Padi</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-green-100 text-sm">Sumber Air</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-2xl font-bold">2.500 mm</div>
                                <div className="text-green-100 text-sm">Curah Hujan/th</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
