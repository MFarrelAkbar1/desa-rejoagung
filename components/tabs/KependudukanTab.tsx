// components/tabs/KependudukanTab.tsx

import DataTable from '../DataTable'
import { kependudukanData } from '@/data/dataDesaConstants'
import Image from 'next/image'

export default function KependudukanTab() {
  return (
    <div>
      <p className="text-gray-800 mb-6 text-sm leading-relaxed font-medium">
        {kependudukanData.deskripsi}
      </p>
      
      {/* 1. JUMLAH PENDUDUK */}
      <h3 className="font-bold text-gray-900 mb-4 text-lg">JUMLAH PENDUDUK</h3>
      
      {/* Gambar Jumlah Penduduk */}
      <div className="my-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <Image
            src="/jumlah-penduduk.png"
            alt="Grafik Jumlah Penduduk Desa Rejoagung"
            width={800}
            height={400}
            className="rounded-lg"
            priority
          />
        </div>
      </div>
      
      <DataTable data={kependudukanData.table} />
      
      {/* 2. DATA PENDUDUK BERDASARKAN USIA */}
      <h3 className="font-bold text-gray-900 mb-4 mt-8 text-lg">DATA PENDUDUK BERDASARKAN USIA</h3>
      <DataTable data={kependudukanData.usiaTable} />
      
      {/* 3. MATA PENCAHARIAN PENDUDUK */}
      <h3 className="font-bold text-gray-900 mb-4 mt-8 text-lg">MATA PENCAHARIAN PENDUDUK TAHUN 2025</h3>
      
      {/* Gambar Mata Pencaharian */}
      <div className="my-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <Image
            src="/mata-pencaharian.png"
            alt="Grafik Mata Pencaharian Penduduk Desa Rejoagung Tahun 2025"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      
      <DataTable data={kependudukanData.mataPencaharianTable} />
      
      {/* 4. AGAMA/KEPERCAYAAN */}
      <h3 className="font-bold text-gray-900 mb-4 mt-8 text-lg">JUMLAH PENGANUT AGAMA/ALIRAN KEPERCAYAAN TAHUN 2025</h3>
      
      {/* Gambar Agama/Kepercayaan */}
      <div className="my-6 flex justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <Image
            src="/jumlah-penganut.png"
            alt="Grafik Jumlah Penganut Agama/Aliran Kepercayaan Desa Rejoagung Tahun 2025"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
      
      <DataTable data={kependudukanData.agamaTable} />
    </div>
  )
}