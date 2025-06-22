import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Importa o CSS da mesma pasta 'app'
import { ThemeProvider } from 'next-themes'

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
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}