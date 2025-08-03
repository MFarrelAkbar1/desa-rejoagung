// app/api/news/content-blocks/route.ts - FIXED
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/news/content-blocks - Simpan content blocks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blocks } = body

    if (!blocks || !Array.isArray(blocks)) {
      return NextResponse.json(
        { error: 'Blocks array is required' },
        { status: 400 }
      )
    }

    // Validate each block
    for (const block of blocks) {
      if (!block.news_id || !block.type || block.content === undefined) {
        return NextResponse.json(
          { error: 'Each block must have news_id, type, and content' },
          { status: 400 }
        )
      }

      // Validate block type
      if (!['text', 'subtitle', 'image'].includes(block.type)) {
        return NextResponse.json(
          { error: 'Block type must be text, subtitle, or image' },
          { status: 400 }
        )
      }
    }

    // FIXED: Prepare data dengan style yang benar
    const blocksToInsert = blocks.map((block: any, index: number) => ({
      news_id: block.news_id,
      type: block.type,
      content: block.content || '',
      order_index: block.order_index !== undefined ? block.order_index : index,
      style: block.style || {} // FIXED: Simpan style sebagai JSON
    }))

    console.log('Inserting content blocks:', blocksToInsert)

    // Insert content blocks
    const { data, error } = await supabase
      .from('news_content_blocks')
      .insert(blocksToInsert)
      .select()

    if (error) {
      console.error('Error inserting content blocks:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Content blocks inserted successfully:', data)

    return NextResponse.json({
      success: true,
      data: data,
      message: `${data.length} content blocks saved successfully`
    })

  } catch (error) {
    console.error('Error in POST /api/news/content-blocks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/news/content-blocks - Ambil content blocks berdasarkan news_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const newsId = searchParams.get('news_id')

    if (!newsId) {
      return NextResponse.json(
        { error: 'news_id parameter is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('news_content_blocks')
      .select('*')
      .eq('news_id', newsId)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching content blocks:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])

  } catch (error) {
    console.error('Error in GET /api/news/content-blocks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/news/content-blocks - Hapus content blocks berdasarkan news_id
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const newsId = searchParams.get('news_id')

    if (!newsId) {
      return NextResponse.json(
        { error: 'news_id parameter is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('news_content_blocks')
      .delete()
      .eq('news_id', newsId)

    if (error) {
      console.error('Error deleting content blocks:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Content blocks deleted successfully'
    })

  } catch (error) {
    console.error('Error in DELETE /api/news/content-blocks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}