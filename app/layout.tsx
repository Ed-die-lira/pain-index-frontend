import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Pain Index',
  description: 'Your Compass for Crypto Capitulation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Sem 'suppressHydrationWarning' por enquanto
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}