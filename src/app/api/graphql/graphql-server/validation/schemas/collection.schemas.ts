import { ajv } from '../ajv'
import { localizedStringSchema, nonEmptyString } from './common'
import type { CreateCollectionInput, UpdateCollectionInput } from '../../services/collections/types'

const createCollectionSchema = {
  type: 'object',
  properties: {
    names: localizedStringSchema,
    description: localizedStringSchema,
  },
  required: ['names', 'description'],
  additionalProperties: false,
} as const

const updateCollectionSchema = {
  type: 'object',
  properties: {
    id: nonEmptyString,
    names: localizedStringSchema,
    description: localizedStringSchema,
  },
  required: ['id', 'names', 'description'],
  additionalProperties: false,
} as const

export const validateCreateCollection = ajv.compile<CreateCollectionInput>(createCollectionSchema)
export const validateUpdateCollection = ajv.compile<UpdateCollectionInput>(updateCollectionSchema)
