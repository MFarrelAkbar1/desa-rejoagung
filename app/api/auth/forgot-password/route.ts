// app/api/auth/forgot-password/route.ts - Complete SMTP implementation
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    // Check if admin user exists with this email
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (error || !adminUser) {
      // For security, don't reveal if email exists or not
      return NextResponse.json({
        success: true,
        message: 'Jika email terdaftar, instruksi reset password akan dikirim'
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save reset token to database
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', adminUser.id)

    if (updateError) {
      console.error('Error saving reset token:', updateError)
      return NextResponse.json(
        { error: 'Terjadi kesalahan saat memproses permintaan' },
        { status: 500 }
      )
    }

    // Create nodemailer transporter using SMTP settings
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify SMTP connection
    try {
      await transporter.verify()
      console.log('SMTP server is ready to take our messages')
    } catch (error) {
      console.error('SMTP verification failed:', error)
      return NextResponse.json(
        { error: 'Server email tidak dapat diakses saat ini' },
        { status: 500 }
      )
    }

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`

    // Email template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password - Desa Rejoagung</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .warning { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏛️ Desa Rejoagung</h1>
            <h2>Reset Password Admin</h2>
          </div>
          <div class="content">
            <p>Halo <strong>${adminUser.username}</strong>,</p>
            
            <p>Kami menerima permintaan untuk mereset password akun admin Anda di portal Desa Rejoagung.</p>
            
            <p>Untuk mereset password Anda, silakan klik tombol di bawah ini:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password Sekarang</a>
            </div>
            
            <p>Atau salin dan paste URL berikut ke browser Anda:</p>
            <p style="word-break: break-all; background: #e5e7eb; padding: 10px; border-radius: 4px;">
              ${resetUrl}
            </p>
            
            <div class="warning">
              <strong>⚠️ Penting:</strong>
              <ul>
                <li>Link ini akan kedaluwarsa dalam <strong>1 jam</strong></li>
                <li>Link hanya dapat digunakan sekali</li>
                <li>Jika Anda tidak meminta reset password, abaikan email ini</li>
                <li>Jangan bagikan link ini kepada siapapun</li>
              </ul>
            </div>
            
            <p>Jika Anda mengalami kesulitan, silakan hubungi administrator sistem.</p>
            
            <p>Terima kasih,<br>
            <strong>Tim IT Desa Rejoagung</strong></p>
          </div>
          <div class="footer">
            <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
            <p>© 2025 Desa Rejoagung, Kec. Srono, Kab. Banyuwangi, Jawa Timur</p>
          </div>
        </div>
      </body>
      </html>
    `

    const emailText = `
Reset Password - Desa Rejoagung

Halo ${adminUser.username},

Kami menerima permintaan untuk mereset password akun admin Anda di portal Desa Rejoagung.

Untuk mereset password Anda, silakan kunjungi link berikut:
${resetUrl}

PENTING:
- Link ini akan kedaluwarsa dalam 1 jam
- Link hanya dapat digunakan sekali
- Jika Anda tidak meminta reset password, abaikan email ini
- Jangan bagikan link ini kepada siapapun

Jika Anda mengalami kesulitan, silakan hubungi administrator sistem.

Terima kasih,
Tim IT Desa Rejoagung

---
Email ini dikirim secara otomatis. Mohon tidak membalas email ini.
© 2025 Desa Rejoagung, Kec. Srono, Kab. Banyuwangi, Jawa Timur
    `

    // Send email
    const mailOptions = {
      from: {
        name: 'Desa Rejoagung',
        address: process.env.SMTP_USER!
      },
      to: email,
      subject: '🔐 Reset Password Admin - Desa Rejoagung',
      text: emailText,
      html: emailHtml,
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Reset password email sent:', info.messageId)
      
      return NextResponse.json({
        success: true,
        message: 'Email reset password berhasil dikirim'
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      
      // Remove the reset token since email failed
      await supabase
        .from('admin_users')
        .update({
          reset_token: null,
          reset_token_expiry: null
        })
        .eq('id', adminUser.id)
      
      return NextResponse.json(
        { error: 'Gagal mengirim email. Silakan coba lagi.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}