// app/api/products/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware'

// GET - Ambil semua produk (tetap public)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 })
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Tambah produk baru (HANYA ADMIN)
export async function POST(request: NextRequest) {
  try {
    // ✅ VALIDASI AUTENTIKASI ADMIN
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error)
    }

    const body = await request.json()
   
    // Validasi data required
    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { error: 'Nama, kategori, dan deskripsi harus diisi' },
        { status: 400 }
      )
    }

    // Prepare data untuk insert
    const productData = {
      name: body.name.trim(),
      category: body.category,
      description: body.description.trim(),
      price: body.price?.trim() || null,
      location: body.location?.trim() || null,
      image_url: body.image_url?.trim() || null,
      is_featured: Boolean(body.is_featured),
      contact: body.contact?.trim() || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Gagal menyimpan produk' }, { status: 500 })
    }

    return NextResponse.json({ data, success: true })

  } catch (error) {
    console.error('Error in POST /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update produk (HANYA ADMIN)
export async function PUT(request: NextRequest) {
  try {
    // ✅ VALIDASI AUTENTIKASI ADMIN
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error)
    }

    const body = await request.json()
   
    if (!body.id) {
      return NextResponse.json({ error: 'ID produk harus diisi' }, { status: 400 })
    }

    // Validasi data required
    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { error: 'Nama, kategori, dan deskripsi harus diisi' },
        { status: 400 }
      )
    }

    // Prepare data untuk update
    const productData = {
      name: body.name.trim(),
      category: body.category,
      description: body.description.trim(),
      price: body.price?.trim() || null,
      location: body.location?.trim() || null,
      image_url: body.image_url?.trim() || null,
      is_featured: Boolean(body.is_featured),
      contact: body.contact?.trim() || null,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Gagal mengupdate produk' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ data, success: true })

  } catch (error) {
    console.error('Error in PUT /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Hapus produk (HANYA ADMIN)
export async function DELETE(request: NextRequest) {
  try {
    // ✅ VALIDASI AUTENTIKASI ADMIN
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error)
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID produk harus diisi' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Produk berhasil dihapus' })

  } catch (error) {
    console.error('Error in DELETE /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}