import { useApolloClient } from '@apollo/client/react'
import type { ApolloClient } from '@apollo/client'

export function useApiClient(): ApolloClient {
  return useApolloClient()
}
