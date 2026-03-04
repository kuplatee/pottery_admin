import type { Metadata } from 'next'
import { AppStateProvider } from '@/state/AppStateProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tsirbunen Pottery Admin',
  description: 'Internal admin app for managing pottery inventory'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
          <AppStateProvider>{children}</AppStateProvider>
        </body>
    </html>
  )
}
