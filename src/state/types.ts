import type { Category } from '@/types/graphql-schema-types.generated'

export type AppState = {
  categories: Category[]
}

export type AppStateAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }

export type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export const initialAppState: AppState = {
  categories: []
}
