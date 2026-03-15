// AppState is intentionally empty — entity data is managed by Apollo cache.
// User-related and other app-level state will be added here as needed.
export type AppState = Record<string, never>

export type AppStateAction = never

export type AppStateContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppStateAction>
}

export const initialAppState: AppState = {}
