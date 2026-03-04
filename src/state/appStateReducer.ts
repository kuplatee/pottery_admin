import type { AppState, AppStateAction } from './types'

export function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
  }
}
