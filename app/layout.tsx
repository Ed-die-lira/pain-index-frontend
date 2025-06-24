import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider' // A importação continua a mesma

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
        {/* Agora só precisamos envolver os children, sem passar props */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}