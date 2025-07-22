import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      // Cek apakah user masih aktif
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('id, username, email, full_name, role, is_active')
        .eq('id', decoded.userId)
        .eq('is_active', true)
        .single()

      if (error || !adminUser) {
        return NextResponse.json(
          { error: 'User tidak ditemukan atau tidak aktif' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        user: adminUser
      })

    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Token tidak valid atau expired' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}