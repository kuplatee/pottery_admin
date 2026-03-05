import { createContext, useContext } from 'react'
import type { ApolloClient } from '@apollo/client'

export const ApiClientContext = createContext<ApolloClient | null>(null)

export function useApiClient(): ApolloClient {
  const client = useContext(ApiClientContext)

  if (!client) {
    throw new Error('useApiClient must be used inside ApiClientProvider')
  }

  return client
}
