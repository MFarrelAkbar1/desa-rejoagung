// app/api/culinary/route.ts
// COPY PASTE INI, REPLACE SEMUA ISI FILE!

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/culinary - Ambil semua menu kuliner
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

// POST /api/culinary - Tambah menu kuliner baru (TANPA AUTH)
export async function POST(request: NextRequest) {
  try {
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