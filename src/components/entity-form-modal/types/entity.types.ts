import type { Language } from '@/lib/languages'
import type { DetailsEntry } from '../inputs/DetailsFieldsInput'

export type MultilingualText = Record<Language, string>

export type EntityFieldConfig = {
  names?: boolean
  description?: boolean
  details?: boolean
  categoryIds?: boolean
  imageFileNames?: boolean
  designId?: boolean
  collectionId?: boolean
  sold?: boolean
}

export type FormValues = {
  names?: Record<Language, string>
  description?: Record<Language, string>
  details?: DetailsEntry[]
  categoryIds?: string[]
  imageFileNames?: string[]
  designId?: string
  collectionId?: string
  sold?: boolean
}

export type EntityFormData = {
  names?: MultilingualText
  description?: MultilingualText
  details?: DetailsEntry[]
  categoryIds?: string[]
  imageFileNames?: string[]
  designId?: string
  collectionId?: string
  sold?: boolean
}

export type EntityData = {
  id: string
  names?: MultilingualText
  description?: MultilingualText
  details?: Record<Language, Record<string, string>>
  categoryIds?: string[]
  imageFileNames?: string[]
  designId?: string
  collectionId?: string
  sold?: boolean
}

export type AvailableGroup = {
  id: string
  names: MultilingualText
}
