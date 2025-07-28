// app/api/culinary/[id]/route.ts - FIXED untuk Next.js 15
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/culinary/[id] - Ambil satu item kuliner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // AWAIT params dulu (Next.js 15 requirement)
    const { id } = await params

    const { data, error } = await supabase
      .from('culinary_items')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/culinary/[id] - Update item kuliner
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // AWAIT params dulu (Next.js 15 requirement)
    const { id } = await params
    const body = await request.json()

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
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/culinary/[id] - Hapus item kuliner
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // AWAIT params dulu (Next.js 15 requirement)
    const { id } = await params

    const { error } = await supabase
      .from('culinary_items')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Item deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}