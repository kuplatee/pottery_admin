'use client'

import { useReducer } from 'react'
import { AppStateContext } from './AppStateContext'
import { appStateReducer } from './appStateReducer'
import { initialAppState } from './types'

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialAppState)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}
