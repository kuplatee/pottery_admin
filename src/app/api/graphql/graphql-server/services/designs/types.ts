import type { LocalizedString } from '../common/types'

export type LocalizedDetails = {
  en: Record<string, string>
  fi: Record<string, string>
}

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
