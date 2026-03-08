import type { Language } from '@/lib/languages'
import type { DetailsEntry } from '../inputs/DetailsFieldsInput'

export type MultilingualText = Record<Language, string>

export type EntityFieldConfig = {
  names?: boolean
  description?: boolean
  details?: boolean
  categoryIds?: boolean
}

export type FormValues = {
  names?: Record<Language, string>
  description?: Record<Language, string>
  details?: DetailsEntry[]
  categoryIds?: string[]
}

export type EntityFormData = {
  names?: MultilingualText
  description?: MultilingualText
  details?: DetailsEntry[]
  categoryIds?: string[]
}

export type EntityData = {
  id: string
  names?: MultilingualText
  description?: MultilingualText
  details?: Record<Language, Record<string, string>>
  categoryIds?: string[]
}

export type AvailableCategory = {
  id: string
  names: MultilingualText
}
