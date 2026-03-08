import type { LocalizedString } from '../common/types'

export type Collection = {
  id: string
  names: LocalizedString
  description: LocalizedString
}

export type CreateCollectionInput = {
  names: LocalizedString
  description: LocalizedString
}

export type UpdateCollectionInput = {
  id: string
  names: LocalizedString
  description: LocalizedString
}
