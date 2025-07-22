// app/admin/forgot-password/page.tsx

'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Terjadi kesalahan')
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Terkirim!</h1>
            
            <p className="text-gray-600 mb-6">
              Kami telah mengirimkan instruksi reset password ke email Anda. 
              Silakan cek inbox dan ikuti petunjuk yang diberikan.
            </p>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Tidak menerima email? Cek folder spam/junk mail Anda.
              </p>
              
              <Link
                href="/admin/login"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Login Link */}
        <Link
          href="/admin/login"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Login
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Image
                src="/logo-rejoagung.png"
                alt="Logo Desa Rejoagung"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Lupa Password</h1>
            <p className="text-emerald-100">Reset password admin Anda</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                Masukkan email admin yang terdaftar untuk menerima instruksi reset password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Admin
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="farrelm212@gmail.com"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim Email...
                  </div>
                ) : (
                  'Kirim Instruksi Reset'
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Catatan:</strong> Email reset password akan dikirim ke alamat email admin yang terdaftar. 
                Pastikan email yang dimasukkan benar dan aktif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}