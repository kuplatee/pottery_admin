import type { Metadata } from 'next'
import { AppStateProvider } from '@/state/AppStateProvider'
import { ApiClientProvider } from '@/services/graphql-client/client/ApiClientProvider'
import { DataLoader } from '@/components/DataLoader'
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
        <ApiClientProvider>
          <AppStateProvider>
            <DataLoader />
            {children}
          </AppStateProvider>
        </ApiClientProvider>
      </body>
    </html>
  )
}
