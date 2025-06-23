import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// 1. Importe o nosso novo componente de provedor
import { ThemeProvider } from '@/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Pain Index',
  description: 'Your Compass for Crypto Capitulation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 2. Use nosso componente aqui. Ele já tem o 'use client' */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}