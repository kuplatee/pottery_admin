import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { AppStateProvider } from '@/state/AppStateProvider'
import { ApiClientProvider } from '@/services/graphql-client/client/ApiClientProvider'
import { DataLoader } from '@/components/data/DataLoader'
import TopNav from '@/components/navigation/TopNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tsirbunen Pottery Admin',
  description: 'Internal admin app for managing pottery inventory'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ApiClientProvider>
            <AppStateProvider>
              <DataLoader />
              <TopNav />
              {children}
            </AppStateProvider>
          </ApiClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
