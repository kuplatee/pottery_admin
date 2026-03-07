import type { Category, Design } from '@/types/graphql-schema-types.generated'

export type AppState = {
  categories: Category[]
  designs: Design[]
}

export type AppStateAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_DESIGNS'; payload: Design[] }
  | { type: 'ADD_DESIGN'; payload: Design }
  | { type: 'UPDATE_DESIGN'; payload: Design }
  | { type: 'DELETE_DESIGN'; payload: string }

export type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export const initialAppState: AppState = {
  categories: [],
  designs: []
}
