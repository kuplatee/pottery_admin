'use client'

import { useMemo } from 'react'
import { ApiClientContext } from './ApiClientContext'
import { makeGraphQLClient } from './makeGraphQLClient'

export function ApiClientProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => makeGraphQLClient(), [])

  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  )
}
