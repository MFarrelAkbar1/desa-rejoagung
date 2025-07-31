// app/api/culinary/[id]/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware'

// GET /api/culinary/[id] - Ambil detail menu kuliner (tetap public)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('culinary_items')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Menu tidak ditemukan' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/culinary/[id] - Update menu kuliner (HANYA ADMIN)
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

    // Validasi kategori
    const validCategories = ['makanan', 'minuman', 'camilan']
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: 'Kategori harus salah satu dari: makanan, minuman, camilan' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('culinary_items')
      .update({
        name: body.name,
        category: body.category,
        description: body.description,
        ingredients: body.ingredients || [],
        price: body.price,
        location: body.location,
        image_url: body.image_url,
        rating: body.rating || 0,
        is_signature: body.is_signature || false,
        cooking_time: body.cooking_time,
        serving_size: body.serving_size,
        benefits: body.benefits || [],
        contact: body.contact,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Menu tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/culinary/[id] - Hapus menu kuliner (HANYA ADMIN)
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

    // Cek apakah menu ada
    const { data: existingItem, error: checkError } = await supabase
      .from('culinary_items')
      .select('id')
      .eq('id', params.id)
      .single()

    if (checkError || !existingItem) {
      return NextResponse.json({ error: 'Menu tidak ditemukan' }, { status: 404 })
    }

    // Hapus menu
    const { error } = await supabase
      .from('culinary_items')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Menu berhasil dihapus' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}