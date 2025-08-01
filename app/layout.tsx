// app/layout.tsx - Updated with NotificationProvider

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavbarProvider } from '@/components/navbar/NavbarContext'
import TopNavbar from '@/components/navbar/TopNavbar'
import PageWrapper from '@/components/PageWrapper'
import Footer from '@/components/Footer'
import { NotificationProvider } from '@/components/notifications/NotificationSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desa Rejoagung - Portal Resmi',
  description: 'Website resmi Desa Rejoagung - Pusat informasi, layanan, dan produk unggulan kelapa sawit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-800 antialiased`}>
        {/* Wrap everything with NotificationProvider */}
        <NotificationProvider>
          <NavbarProvider>
            <TopNavbar />
            <main className="pt-16 min-h-screen">
              <PageWrapper>
                {children}
              </PageWrapper>
            </main>
            <Footer />
          </NavbarProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}