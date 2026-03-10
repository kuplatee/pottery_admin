import type { AppState, AppStateAction } from './types'

export function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) => (c.id === action.payload.id ? action.payload : c))
      }
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload)
      }
    case 'SET_COLLECTIONS':
      return { ...state, collections: action.payload }
    case 'ADD_COLLECTION':
      return { ...state, collections: [...state.collections, action.payload] }
    case 'UPDATE_COLLECTION':
      return {
        ...state,
        collections: state.collections.map((c) => (c.id === action.payload.id ? action.payload : c))
      }
    case 'DELETE_COLLECTION':
      return {
        ...state,
        collections: state.collections.filter((c) => c.id !== action.payload)
      }
    case 'SET_DESIGNS':
      return { ...state, designs: action.payload }
    case 'ADD_DESIGN':
      return { ...state, designs: [...state.designs, action.payload] }
    case 'UPDATE_DESIGN':
      return {
        ...state,
        designs: state.designs.map((d) => (d.id === action.payload.id ? action.payload : d))
      }
    case 'DELETE_DESIGN':
      return {
        ...state,
        designs: state.designs.filter((d) => d.id !== action.payload)
      }
    case 'SET_PIECES':
      return { ...state, pieces: action.payload }
    case 'ADD_PIECE':
      return { ...state, pieces: [...state.pieces, action.payload] }
    case 'UPDATE_PIECE':
      return {
        ...state,
        pieces: state.pieces.map((p) => (p.id === action.payload.id ? action.payload : p))
      }
    case 'DELETE_PIECE':
      return {
        ...state,
        pieces: state.pieces.filter((p) => p.id !== action.payload)
      }
  }
}
