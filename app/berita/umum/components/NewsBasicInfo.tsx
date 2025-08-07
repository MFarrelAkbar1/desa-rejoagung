// app/berita/umum/components/NewsBasicInfo.tsx

import ImageUpload from '@/components/forms/ImageUpload'

interface NewsFormData {
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  author: string
}

interface NewsBasicInfoProps {
  formData: NewsFormData
  onChange: (updates: Partial<NewsFormData>) => void
}

export default function NewsBasicInfo({
  formData,
  onChange
}: NewsBasicInfoProps) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        📰 Informasi Dasar Berita
      </h2>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Berita *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChange({
              title: e.target.value
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-lg"
            placeholder="Masukkan judul berita yang menarik..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Isi Berita Utama *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => onChange({
              content: e.target.value
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
            rows={12}
            placeholder="Tulis isi berita utama di sini..."
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ringkasan Berita (Excerpt)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => onChange({
              excerpt: e.target.value
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
            rows={3}
            placeholder="Ringkasan singkat yang akan muncul di daftar berita (opsional)"
          />
        </div>

        {/* Enhanced Gambar Utama dengan 10MB Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Utama Berita
            <span className="text-emerald-600 text-xs ml-2">• Maksimal 10MB</span>
          </label>
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => onChange({
              image_url: url
            })}
            label=""
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Format yang didukung: JPG, PNG, WEBP, GIF • Ukuran maksimal: 10MB
          </p>
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) => onChange({
                category: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
            >
              <option value="">Pilih Kategori</option>
              <option value="Berita">Berita</option>
              <option value="Pengumuman">Pengumuman</option>
              <option value="Kegiatan">Kegiatan</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Infrastruktur">Infrastruktur</option>
              <option value="Budaya">Budaya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penulis *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => onChange({
                author: e.target.value
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
              placeholder="Nama penulis..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}