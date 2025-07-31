// app/api/culinary/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware'

// GET /api/culinary - Ambil semua menu kuliner (tetap public)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('culinary_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/culinary - Tambah menu kuliner baru (HANYA ADMIN)
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
      .insert([{
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
        contact: body.contact
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error adding culinary:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/culinary - Update menu kuliner (HANYA ADMIN) 
export async function PUT(request: NextRequest) {
  try {
    // ✅ VALIDASI AUTENTIKASI ADMIN
    const authResult = await verifyAdminAuth(request)
    if (!authResult.isValid) {
      return createUnauthorizedResponse(authResult.error)
    }

    const body = await request.json()
   
    if (!body.id) {
      return NextResponse.json({ error: 'ID menu harus diisi' }, { status: 400 })
    }

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
      .eq('id', body.id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Menu tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error updating culinary:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/culinary - Hapus menu kuliner (HANYA ADMIN)
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
      return NextResponse.json({ error: 'ID menu harus diisi' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('culinary_items')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Menu tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Menu berhasil dihapus' })
  } catch (error) {
    console.error('Error deleting culinary:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}