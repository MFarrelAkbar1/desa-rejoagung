'use client'

import Image from 'next/image'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function KepalaDesaPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Kepala Desa', href: '/profil/kepala-desa' },
          ]}
        />
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-emerald-600 to-green-600 p-8 flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white/50 shadow-xl transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/kades.jpg" 
                  alt="Foto Kepala Desa Shon Haji"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h2 className="text-white text-3xl font-bold mt-6">Shon Haji</h2>
              <p className="text-emerald-200 mt-1">Kepala Desa Rejoagung</p>
            </div>
            <div className="md:w-2/3 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Sambutan Kepala Desa
              </h1>
              <div className="w-24 h-1.5 bg-emerald-500 mb-8"></div>

              <article className="prose prose-lg max-w-none text-gray-600">
                <p>
                  Assalamualaikum Warahmatullahi Wabarakatuh,
                </p>
                <p>
                  Puji syukur kehadirat Allah SWT yang telah melimpahkan rahmat dan karunia-Nya kepada kita semua. Saya, <strong>Shon Haji</strong>, sebagai Kepala Desa Rejoagung, dengan bangga menyambut Anda di website resmi desa kami.
                </p>
                <p>
                  Website ini kami hadirkan sebagai wujud komitmen pemerintah desa dalam memberikan transparansi informasi dan meningkatkan kualitas pelayanan publik di era digital. Melalui platform ini, kami berharap dapat menjembatani komunikasi yang efektif antara pemerintah desa dengan seluruh lapisan masyarakat, serta menyajikan informasi yang akurat dan terkini seputar program desa, potensi wilayah, dan berita-berita penting lainnya.
                </p>
                <p>
                  Kami mengajak seluruh warga untuk turut serta aktif dalam setiap program pembangunan desa. Mari kita bersama-sama, dengan semangat gotong royong dan kekeluargaan, mewujudkan Desa Rejoagung yang lebih maju, mandiri, dan sejahtera.
                </p>
                <p>
                  Terima kasih atas kunjungan Anda. Kritik dan saran yang membangun sangat kami harapkan demi kemajuan desa kita bersama.
                </p>
                <p>
                  Wassalamualaikum Warahmatullahi Wabarakatuh.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
