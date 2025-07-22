
// app/api/auth/reset-password/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token dan password baru harus diisi' },
        { status: 400 }
      )
    }

    // Validasi password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      )
    }

    // Cari admin dengan reset token yang valid
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('reset_token', token)
      .eq('is_active', true)
      .single()

    if (error || !adminUser) {
      return NextResponse.json(
        { error: 'Token tidak valid atau sudah expired' },
        { status: 400 }
      )
    }

    // Cek apakah token masih berlaku
    const now = new Date()
    const tokenExpires = new Date(adminUser.reset_token_expires)

    if (now > tokenExpires) {
      return NextResponse.json(
        { error: 'Token sudah expired. Silakan minta reset password baru' },
        { status: 400 }
      )
    }

    // Hash password baru
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    // Update password dan hapus reset token
    await supabase
      .from('admin_users')
      .update({
        password_hash: passwordHash,
        reset_token: null,
        reset_token_expires: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', adminUser.id)

    return NextResponse.json({
      success: true,
      message: 'Password berhasil direset'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}