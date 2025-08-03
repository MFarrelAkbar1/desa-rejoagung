// components/Home/Booklet.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, BarChart3, Leaf, GraduationCap, ExternalLink } from 'lucide-react'

interface BookletItem {
  id: string
  title: string
  description: string
  image: string
  link: string
  icon: any
  color: string
  bgColor: string
}

const bookletData: BookletItem[] = [
  {
    id: 'guidebook',
    title: 'E-Guidebook Desa Rejoagung Tim KKN-PPM UGM Serona Srono 2025',
    description: 'Panduan lengkap hasil kerja Tim KKN-PPM UGM dengan dokumentasi kegiatan dan program unggulan',
    image: '/guidebook.png',
    link: '/booklet/guidebook',
    icon: GraduationCap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'statistik',
    title: 'Statistik Penduduk Desa Rejoagung 2025 TIM KKN-PPM UGM Seron Srono 2025',
    description: 'Data lengkap statistik kependudukan dan demografis Desa Rejoagung tahun 2025',
    image: '/statistik.png',
    link: '/booklet/statistik',
    icon: BarChart3,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'flora',
    title: 'Arsip Flora Desa Rejoagung Tim KKN-PPM UGM Serona Srono 2025',
    description: 'Dokumentasi lengkap keanekaragaman flora dan kekayaan alam Desa Rejoagung',
    image: '/flora.png',
    link: '/booklet/flora',
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
]

const BookletCard = ({ booklet }: { booklet: BookletItem }) => {
  const IconComponent = booklet.icon

  return (
    <Link href={booklet.link}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 h-full">
        {/* Header dengan Icon */}
        <div className={`${booklet.bgColor} p-4 border-b border-gray-100`}>
          <div className="flex items-center gap-3">
            <div className={`${booklet.bgColor} p-2 rounded-lg border border-white`}>
              <IconComponent className={`w-6 h-6 ${booklet.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <BookOpen className={`w-4 h-4 ${booklet.color}`} />
                <span className={`text-sm font-semibold ${booklet.color}`}>Booklet Digital</span>
              </div>
            </div>
            <ExternalLink className={`w-4 h-4 ${booklet.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
          </div>
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={booklet.image}
            alt={booklet.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors">
            {booklet.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {booklet.description}
          </p>
          
          {/* Action */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${booklet.color}`}>
              Lihat Booklet
            </span>
            <div className={`${booklet.bgColor} ${booklet.color} px-3 py-1 rounded-full text-xs font-medium`}>
              PDF Digital
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className={`h-1 bg-gradient-to-r from-${booklet.color.replace('text-', '')} to-${booklet.color.replace('text-', '')}/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </div>
    </Link>
  )
}

export default function Booklet() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 fill-current" />
            <h2 className="text-3xl font-bold text-gray-800">Booklet Digital</h2>
            <BookOpen className="w-8 h-8 text-blue-600 fill-current" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kumpulan dokumentasi digital hasil kerja Tim KKN-PPM UGM dan data lengkap Desa Rejoagung
          </p>
        </div>

        {/* Booklet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bookletData.map((booklet) => (
            <BookletCard key={booklet.id} booklet={booklet} />
          ))}
        </div>
      </div>
    </section>
  )
}