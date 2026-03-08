import type { DetailsEntry } from './DetailsFields'

export type EntityFieldConfig = {
  names?: boolean
  description?: boolean
  details?: boolean
  categoryIds?: boolean
}

export type EntityFormData = {
  names?: { en: string; fi: string }
  description?: { en: string; fi: string }
  details?: DetailsEntry[]
  categoryIds?: string[]
}

export type EntityData = {
  id: string
  names?: { en: string; fi: string }
  description?: { en: string; fi: string }
  details?: { en: Record<string, string>; fi: Record<string, string> }
  categoryIds?: string[]
}

export type AvailableCategory = {
  id: string
  names: { en: string; fi: string }
}
