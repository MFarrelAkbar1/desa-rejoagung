// app/api/products/[id]/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware'

// GET /api/products/[id] - Ambil satu produk (tetap public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/products/[id] - Update produk (HANYA ADMIN)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { data, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        description: body.description,
        price: body.price,
        image_url: body.image_url,
        category: body.category,
        is_featured: body.is_featured || false,
        contact: body.contact,
        location: body.location,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Hapus produk (HANYA ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ VALIDASI AUTENTIKASI ADMIN
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error)
    }

    // Cek apakah produk ada
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('id')
      .eq('id', params.id)
      .single()

    if (checkError || !existingProduct) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    // Hapus produk
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Produk berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}