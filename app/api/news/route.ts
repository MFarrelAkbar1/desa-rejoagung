// app/api/news/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/news - Ambil semua berita
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    
    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter hanya berita yang dipublish untuk user biasa
    if (published === 'true') {
      query = query.eq('is_published', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/news - Tambah berita baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate slug dari title jika tidak ada
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')

    const { data, error } = await supabase
      .from('news')
      .insert([{
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        image_url: body.image_url,
        category: body.category,
        is_published: body.is_published || false,
        is_announcement: body.is_announcement || false,
        author: body.author || 'Admin Desa',
        slug: slug
      }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
