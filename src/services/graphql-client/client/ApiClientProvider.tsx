'use client'

import { useMemo } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { makeGraphQLClient } from './makeGraphQLClient'

export function ApiClientProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => makeGraphQLClient(), [])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
