import type { Category, Collection, Design, Piece } from '@/types/graphql-schema-types.generated'

export type AppState = {
  categories: Category[]
  collections: Collection[]
  designs: Design[]
  pieces: Piece[]
}

export type AppStateAction =
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_COLLECTIONS'; payload: Collection[] }
  | { type: 'ADD_COLLECTION'; payload: Collection }
  | { type: 'UPDATE_COLLECTION'; payload: Collection }
  | { type: 'DELETE_COLLECTION'; payload: string }
  | { type: 'SET_DESIGNS'; payload: Design[] }
  | { type: 'ADD_DESIGN'; payload: Design }
  | { type: 'UPDATE_DESIGN'; payload: Design }
  | { type: 'DELETE_DESIGN'; payload: string }
  | { type: 'SET_PIECES'; payload: Piece[] }
  | { type: 'ADD_PIECE'; payload: Piece }
  | { type: 'UPDATE_PIECE'; payload: Piece }
  | { type: 'DELETE_PIECE'; payload: string }

export type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export const initialAppState: AppState = {
  categories: [],
  collections: [],
  designs: [],
  pieces: []
}
