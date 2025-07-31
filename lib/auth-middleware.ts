// lib/auth-middleware.ts
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { supabase } from '@/lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface DecodedToken {
  userId: string
  username: string
  role: string
  iat: number
  exp: number
}

interface AdminUser {
  id: string
  username: string
  email: string
  full_name: string
  role: string
  is_active: boolean
}

export async function verifyAdminAuth(request: NextRequest): Promise<{
  isValid: boolean
  user?: AdminUser
  error?: string
}> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        isValid: false,  
        error: 'Token tidak valid atau tidak ditemukan'
      }
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify JWT token
    let decoded: DecodedToken
    try {
      decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
    } catch (jwtError) {
      return {
        isValid: false,
        error: 'Token tidak valid atau sudah expired'
      }
    }

    // Check if user still exists and is active
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('id, username, email, full_name, role, is_active')
      .eq('id', decoded.userId)
      .eq('is_active', true)
      .single()

    if (error || !adminUser) {
      return {
        isValid: false,
        error: 'User tidak ditemukan atau tidak aktif'
      }
    }

    return {
      isValid: true,
      user: adminUser
    }

  } catch (error) {
    console.error('Auth verification error:', error)
    return {
      isValid: false,
      error: 'Terjadi kesalahan dalam verifikasi autentikasi'
    }
  }
}

// Helper function to create unauthorized response
export function createUnauthorizedResponse(message: string = 'Akses ditolak') {
  return Response.json(
    { error: message },
    { status: 401 }
  )
}