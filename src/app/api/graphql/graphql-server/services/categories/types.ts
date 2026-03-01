import type { LocalizedString } from '../common/types'

export type Category = {
  id: string
  names: LocalizedString
}

export type CreateCategoryInput = {
  names: LocalizedString
}

export type UpdateCategoryInput = {
  id: string
  names: LocalizedString
}
