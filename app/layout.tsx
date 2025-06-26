import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SidebarProvider } from '@/context/SidebarContext'
import SidebarNavbar from '@/components/SidebarNavbar'

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
      <body className={`${inter.className} bg-white text-gray-800 antialiased`}>
        <SidebarProvider>
            <div className="flex min-h-screen bg-white">
            <SidebarNavbar />
            <main className="flex-1">
              {children}
            </main>
            </div>
        </SidebarProvider>
      </body>
    </html>
  )
}