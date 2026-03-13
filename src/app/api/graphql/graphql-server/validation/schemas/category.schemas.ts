import { ajv } from '../ajv'
import { localizedStringSchema, nonEmptyString } from './common'
import type { CreateCategoryInput, UpdateCategoryInput } from '../../services/categories/types'

const createCategorySchema = {
  type: 'object',
  properties: {
    names: localizedStringSchema,
  },
  required: ['names'],
  additionalProperties: false,
} as const

const updateCategorySchema = {
  type: 'object',
  properties: {
    id: nonEmptyString,
    names: localizedStringSchema,
  },
  required: ['id', 'names'],
  additionalProperties: false,
} as const

export const validateCreateCategory = ajv.compile<CreateCategoryInput>(createCategorySchema)
export const validateUpdateCategory = ajv.compile<UpdateCategoryInput>(updateCategorySchema)
