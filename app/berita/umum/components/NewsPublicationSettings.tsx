// app/berita/umum/components/NewsPublicationSettings.tsx

import { Settings } from 'lucide-react'

interface NewsFormData {
  is_published: boolean
  is_announcement: boolean
}

interface NewsPublicationSettingsProps {
  formData: NewsFormData
  onChange: (updates: Partial<NewsFormData>) => void
}

export default function NewsPublicationSettings({
  formData,
  onChange
}: NewsPublicationSettingsProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5 text-blue-600" />
        📤 Pengaturan Publikasi
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Published Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_published"
            checked={formData.is_published}
            onChange={(e) => onChange({
              is_published: e.target.checked
            })}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
          />
          <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
            Publikasikan berita sekarang
          </label>
        </div>
        
        {/* Announcement Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_announcement"
            checked={formData.is_announcement}
            onChange={(e) => onChange({
              is_announcement: e.target.checked
            })}
            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
          />
          <label htmlFor="is_announcement" className="ml-3 text-sm font-medium text-gray-700">
            Tandai sebagai pengumuman penting
          </label>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Status saat ini:</strong> {formData.is_published ? 
            '✅ Akan dipublikasikan' : '⏳ Disimpan sebagai draft'} 
          {formData.is_announcement && ' • 📢 Pengumuman Penting'}
        </p>
      </div>
    </div>
  )
}