import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/news - Ambil semua berita
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const announcement = searchParams.get('announcement')

    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter berdasarkan published
    if (published === 'true') {
      query = query.eq('is_published', true)
    }

    // Filter berdasarkan announcement
    if (announcement === 'true') {
      query = query.eq('is_announcement', true)
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
    
    // Generate slug dari title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newsData = {
      ...body,
      slug,
      excerpt: body.content.substring(0, 200) + '...'
    }
    
    const { data, error } = await supabase
      .from('news')
      .insert(newsData)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}