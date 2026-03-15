import type { Language } from '@/lib/languages'
import type { LocalizedString } from '../common/types'

export type LocalizedDetails = Record<Language, Record<string, string>>

export type Design = {
  id: string
  names: LocalizedString
  categoryIds: string[]
  description: LocalizedString
  details: LocalizedDetails
}

export type CreateDesignInput = {
  names: LocalizedString
  categoryIds: string[]
  description: LocalizedString
  details: LocalizedDetails
}

export type UpdateDesignInput = {
  id: string
  names: LocalizedString
  categoryIds: string[]
  description: LocalizedString
  details: LocalizedDetails
}
