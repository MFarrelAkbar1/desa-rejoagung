// app/api/news/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/news - Ambil semua berita
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const withBlocks = searchParams.get('withBlocks') // Optional: include content blocks
    
    // Query untuk mengambil berita
    let newsQuery = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter hanya berita yang dipublish untuk user biasa
    if (published === 'true') {
      newsQuery = newsQuery.eq('is_published', true)
    }

    const { data: newsData, error: newsError } = await newsQuery

    if (newsError) {
      console.error('Error fetching news:', newsError)
      return NextResponse.json({ error: newsError.message }, { status: 500 })
    }

    if (!newsData) {
      return NextResponse.json([])
    }

    // Jika withBlocks true, ambil content blocks untuk setiap berita
    let transformedData = newsData
    if (withBlocks === 'true') {
      const newsWithBlocks = await Promise.all(
        newsData.map(async (newsItem) => {
          const { data: blocks, error: blocksError } = await supabase
            .from('news_content_blocks')
            .select('id, type, content, order_index, style, created_at')
            .eq('news_id', newsItem.id)
            .order('order_index', { ascending: true })

          if (blocksError) {
            console.error('Error fetching blocks for news:', newsItem.id, blocksError)
          }

          return {
            ...newsItem,
            content_blocks: blocks || [],
            content_blocks_count: blocks?.length || 0
          }
        })
      )
      transformedData = newsWithBlocks
    } else {
      // Hanya ambil count content blocks untuk performa yang lebih baik
      const newsWithCounts = await Promise.all(
        newsData.map(async (newsItem) => {
          const { count, error: countError } = await supabase
            .from('news_content_blocks')
            .select('*', { count: 'exact', head: true })
            .eq('news_id', newsItem.id)

          if (countError) {
            console.error('Error counting blocks for news:', newsItem.id, countError)
          }

          return {
            ...newsItem,
            content_blocks_count: count || 0
          }
        })
      )
      transformedData = newsWithCounts
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in GET /api/news:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/news - Tambah berita baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content_blocks = [], ...newsData } = body

    console.log('Received news data:', newsData)
    console.log('Received content blocks:', content_blocks)

    // Validate required fields
    if (!newsData.title || !newsData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      )
    }

    // Generate slug dari title jika tidak ada
    const slug = newsData.slug || newsData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()

    // Add timestamp to slug to ensure uniqueness
    const uniqueSlug = `${slug}-${Date.now()}`

    // Insert news
    const { data: newNews, error: newsError } = await supabase
      .from('news')
      .insert([{
        title: newsData.title,
        content: newsData.content,
        excerpt: newsData.excerpt || null,
        image_url: newsData.image_url || null,
        category: newsData.category || null,
        is_published: newsData.is_published || false,
        is_announcement: newsData.is_announcement || false,
        author: newsData.author || 'Admin Desa',
        slug: uniqueSlug
      }])
      .select()
      .single()

    if (newsError) {
      console.error('Error creating news:', newsError)
      return NextResponse.json({ error: newsError.message }, { status: 500 })
    }

    console.log('News created successfully:', newNews)

    // FIXED: Insert content blocks if any with proper style handling
    if (content_blocks.length > 0) {
      const blocksToInsert = content_blocks.map((block: any, index: number) => ({
        news_id: newNews.id,
        type: block.type,
        content: block.content,
        order_index: block.order_index || index,
        // FIXED: Properly handle style field as JSONB
        style: block.style ? JSON.stringify(block.style) : null
      }))

      console.log('Inserting content blocks:', blocksToInsert)

      const { data: insertedBlocks, error: blocksError } = await supabase
        .from('news_content_blocks')
        .insert(blocksToInsert)
        .select()

      if (blocksError) {
        console.error('Error inserting content blocks:', blocksError)
        // Don't return error here, news creation was successful
        console.warn('Content blocks failed to save, but news was created successfully')
      } else {
        console.log('Content blocks inserted successfully:', insertedBlocks)
      }
    }

    return NextResponse.json({
      ...newNews,
      content_blocks: content_blocks,
      success: true
    }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/news:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}