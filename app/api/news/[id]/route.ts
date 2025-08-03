// app/api/news/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/news/[id] - Ambil berita berdasarkan ID dengan content blocks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params

    // Ambil data berita
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()

    if (newsError || !newsData) {
      console.error('Error fetching news:', newsError)
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 })
    }

    // Ambil content blocks untuk berita ini
    const { data: blocksData, error: blocksError } = await supabase
      .from('news_content_blocks')
      .select('id, type, content, order_index, created_at, updated_at')
      .eq('news_id', id)
      .order('order_index', { ascending: true })

    if (blocksError) {
      console.error('Error fetching content blocks:', blocksError)
    }

    // Gabungkan data
    const transformedData = {
      ...newsData,
      content_blocks: blocksData || []
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in GET /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/news/[id] - Update berita dengan content blocks
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params
    const body = await request.json()
    const { content_blocks = [], ...newsData } = body

    // Validate required fields
    if (!newsData.title || !newsData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      )
    }

    // Update news data
    const { data: updatedNews, error: newsError } = await supabase
      .from('news')
      .update({
        title: newsData.title,
        content: newsData.content,
        excerpt: newsData.excerpt || null,
        image_url: newsData.image_url || null,
        category: newsData.category || null,
        is_published: newsData.is_published || false,
        is_announcement: newsData.is_announcement || false,
        author: newsData.author || 'Admin Desa',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (newsError) {
      console.error('Error updating news:', newsError)
      return NextResponse.json({ error: newsError.message }, { status: 500 })
    }

    // Delete existing content blocks
    const { error: deleteError } = await supabase
      .from('news_content_blocks')
      .delete()
      .eq('news_id', id)

    if (deleteError) {
      console.error('Error deleting content blocks:', deleteError)
    }

    // Insert new content blocks if any
    if (content_blocks.length > 0) {
      const blocksToInsert = content_blocks.map((block: any, index: number) => ({
        news_id: id,
        type: block.type,
        content: block.content,
        order_index: index
      }))

      const { error: insertError } = await supabase
        .from('news_content_blocks')
        .insert(blocksToInsert)

      if (insertError) {
        console.error('Error inserting content blocks:', insertError)
        // Don't return error here, news update was successful
      }
    }

    return NextResponse.json({
      ...updatedNews,
      content_blocks: content_blocks
    })
  } catch (error) {
    console.error('Error in PUT /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/news/[id] - Hapus berita
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params

    // Content blocks will be deleted automatically due to CASCADE foreign key
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting news:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Berita berhasil dihapus',
      success: true 
    })
  } catch (error) {
    console.error('Error in DELETE /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
