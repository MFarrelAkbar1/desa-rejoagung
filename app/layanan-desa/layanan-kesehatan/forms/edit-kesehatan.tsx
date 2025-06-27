'use client'

interface EditKesehatanModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  data: any
}

export default function EditKesehatanModal({ 
  isOpen, 
  onClose, 
  onSave,
  data 
}: EditKesehatanModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedData = {
      ...data, // Keep original data
      noRekamMedis: formData.get('noRekamMedis'),
      namaPasien: formData.get('namaPasien'),
      nik: formData.get('nik'),
      jenisKelamin: formData.get('jenisKelamin'),
      umur: Number(formData.get('umur')),
      alamat: formData.get('alamat'),
      tanggalKunjungan: formData.get('tanggalKunjungan'),
      jenisLayanan: formData.get('jenisLayanan'),
      tenagaMedis: formData.get('tenagaMedis'),
      statusLayanan: formData.get('statusLayanan'),
      biaya: Number(formData.get('biaya')),
      keluhan: formData.get('keluhan'),
      catatan: formData.get('catatan')
    }
    
    console.log('Updating layanan kesehatan:', updatedData)
    onSave(updatedData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Edit Data Layanan Kesehatan
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Rekam Medis
              </label>
              <input
                type="text"
                name="noRekamMedis"
                defaultValue={data?.noRekamMedis || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Contoh: RM-2025-001"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Pasien
              </label>
              <input
                type="text"
                name="namaPasien"
                defaultValue={data?.namaPasien || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Masukkan nama pasien"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIK
              </label>
              <input
                type="text"
                name="nik"
                defaultValue={data?.nik || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Masukkan NIK"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <select 
                name="jenisKelamin"
                defaultValue={data?.jenisKelamin || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Umur
              </label>
              <input
                type="number"
                name="umur"
                defaultValue={data?.umur || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Masukkan umur"
                min="0"
                max="150"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Kunjungan
              </label>
              <input
                type="date"
                name="tanggalKunjungan"
                defaultValue={data?.tanggalKunjungan || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              defaultValue={data?.alamat || ''}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Masukkan alamat lengkap"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Layanan
              </label>
              <select 
                name="jenisLayanan"
                defaultValue={data?.jenisLayanan || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Pilih Jenis Layanan</option>
                <option value="Pemeriksaan Umum">Pemeriksaan Umum</option>
                <option value="Imunisasi">Imunisasi</option>
                <option value="Pemeriksaan Ibu Hamil">Pemeriksaan Ibu Hamil</option>
                <option value="Pemeriksaan Balita">Pemeriksaan Balita</option>
                <option value="Pemeriksaan Lansia">Pemeriksaan Lansia</option>
                <option value="Pengobatan">Pengobatan</option>
                <option value="Konsultasi">Konsultasi</option>
                <option value="Rujukan">Rujukan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenaga Medis
              </label>
              <select 
                name="tenagaMedis"
                defaultValue={data?.tenagaMedis || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Pilih Tenaga Medis</option>
                <option value="dr. Siti Aminah">dr. Siti Aminah</option>
                <option value="Bidan Rina">Bidan Rina</option>
                <option value="Perawat Dedi">Perawat Dedi</option>
                <option value="Bidan Maya">Bidan Maya</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Layanan
              </label>
              <select 
                name="statusLayanan"
                defaultValue={data?.statusLayanan || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Selesai">Selesai</option>
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Dirujuk">Dirujuk</option>
                <option value="Dijadwalkan Ulang">Dijadwalkan Ulang</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biaya (Rp)
              </label>
              <input
                type="number"
                name="biaya"
                defaultValue={data?.biaya || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Masukkan biaya"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keluhan/Diagnosa
            </label>
            <textarea
              name="keluhan"
              defaultValue={data?.keluhan || ''}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Masukkan keluhan atau diagnosa"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan
            </label>
            <textarea
              name="catatan"
              defaultValue={data?.catatan || ''}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Catatan tambahan (opsional)"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}