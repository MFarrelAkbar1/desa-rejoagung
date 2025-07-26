// app/api/potensi-unggulan/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Ambil semua PDF files
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('potensi_pdf_files')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching PDF files:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/potensi-unggulan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Upload PDF file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const categoryId = formData.get('categoryId') as string
    const uploadedBy = formData.get('uploadedBy') as string || 'admin'

    if (!file || !categoryId) {
      return NextResponse.json(
        { error: 'File dan category ID harus diisi' },
        { status: 400 }
      )
    }

    // Validasi file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Hanya file PDF yang diperbolehkan' },
        { status: 400 }
      )
    }

    // Validasi file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${categoryId}-${Date.now()}.${fileExt}`
    const filePath = `${categoryId}/${fileName}`

    // Upload file ke Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('potensi-pdfs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (storageError) {
      console.error('Storage error:', storageError)
      return NextResponse.json(
        { error: 'Gagal upload file ke storage' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('potensi-pdfs')
      .getPublicUrl(filePath)

    // Hapus file lama jika ada (karena satu kategori hanya satu file)
    const { error: deleteError } = await supabase
      .from('potensi_pdf_files')
      .delete()
      .eq('category_id', categoryId)

    // Simpan info file ke database
    const { data, error } = await supabase
      .from('potensi_pdf_files')
      .insert({
        category_id: categoryId,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_size: file.size,
        uploaded_by: uploadedBy
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      // Hapus file dari storage jika gagal simpan ke database
      await supabase.storage.from('potensi-pdfs').remove([filePath])
      return NextResponse.json(
        { error: 'Gagal simpan info file ke database' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in POST /api/potensi-unggulan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Hapus PDF file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID harus diisi' },
        { status: 400 }
      )
    }

    // Get file info dari database
    const { data: fileData, error: fetchError } = await supabase
      .from('potensi_pdf_files')
      .select('*')
      .eq('category_id', categoryId)
      .single()

    if (fetchError || !fileData) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 404 }
      )
    }

    // Extract file path dari URL
    const url = new URL(fileData.file_url)
    const filePath = url.pathname.split('/storage/v1/object/public/potensi-pdfs/')[1]

    // Hapus file dari storage
    const { error: storageError } = await supabase.storage
      .from('potensi-pdfs')
      .remove([filePath])

    if (storageError) {
      console.error('Storage delete error:', storageError)
      // Lanjutkan untuk hapus dari database meskipun gagal hapus dari storage
    }

    // Hapus record dari database
    const { error: dbError } = await supabase
      .from('potensi_pdf_files')
      .delete()
      .eq('category_id', categoryId)

    if (dbError) {
      console.error('Database delete error:', dbError)
      return NextResponse.json(
        { error: 'Gagal hapus file dari database' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'File berhasil dihapus' })
  } catch (error) {
    console.error('Error in DELETE /api/potensi-unggulan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}