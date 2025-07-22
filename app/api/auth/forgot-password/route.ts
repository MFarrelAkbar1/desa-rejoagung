// app/api/auth/forgot-password/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email harus diisi' },
        { status: 400 }
      )
    }

    // Cari admin dengan email tersebut
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (error || !adminUser) {
      // Untuk security, tidak memberitahu apakah email ada atau tidak
      return NextResponse.json({
        success: true,
        message: 'Jika email terdaftar, instruksi reset password akan dikirim'
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpires = new Date(Date.now() + 3600000) // 1 hour

    // Simpan reset token ke database
    await supabase
      .from('admin_users')
      .update({
        reset_token: resetToken,
        reset_token_expires: resetTokenExpires.toISOString()
      })
      .eq('id', adminUser.id)

    // Kirim email
    await sendResetEmail(email, resetToken, adminUser.full_name)

    return NextResponse.json({
      success: true,
      message: 'Email reset password berhasil dikirim'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

async function sendResetEmail(email: string, token: string, fullName: string) {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${token}`

  const mailOptions = {
    from: `"Admin Desa Rejoagung" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Password Admin - Desa Rejoagung',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Password Admin</h1>
            <p>Desa Rejoagung</p>
          </div>
          
          <div class="content">
            <h2>Halo ${fullName},</h2>
            
            <p>Kami menerima permintaan untuk mereset password akun admin Anda di website Desa Rejoagung.</p>
            
            <p>Klik tombol di bawah ini untuk mereset password Anda:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Atau copy dan paste link berikut ke browser Anda:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">
              ${resetUrl}
            </p>
            
            <p><strong>Link ini akan expire dalam 1 jam.</strong></p>
            
            <p>Jika Anda tidak meminta reset password, abaikan email ini. Password Anda akan tetap aman.</p>
            
            <p>Terima kasih,<br>
            Tim Admin Desa Rejoagung</p>
          </div>
          
          <div class="footer">
            <p>Email ini dikirim otomatis. Jangan balas email ini.</p>
            <p>© 2025 Desa Rejoagung. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  await transporter.sendMail(mailOptions)
}