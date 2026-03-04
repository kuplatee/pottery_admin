import type { Category } from '@/types/graphql-schema-types.generated'

export type AppState = {
  categories: Category[]
}

export type AppStateAction = { type: 'SET_CATEGORIES'; payload: Category[] }

export type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export const initialAppState: AppState = {
  categories: []
}
