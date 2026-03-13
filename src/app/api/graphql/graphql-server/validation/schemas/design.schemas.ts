import { ajv } from '../ajv'
import { localizedStringSchema, localizedDetailsSchema, nonEmptyString, nonEmptyStringArray } from './common'
import type { CreateDesignInput, UpdateDesignInput } from '../../services/designs/types'

const createDesignSchema = {
  type: 'object',
  properties: {
    names: localizedStringSchema,
    categoryIds: nonEmptyStringArray,
    description: localizedStringSchema,
    details: localizedDetailsSchema,
  },
  required: ['names', 'categoryIds', 'description', 'details'],
  additionalProperties: false,
} as const

const updateDesignSchema = {
  type: 'object',
  properties: {
    id: nonEmptyString,
    names: localizedStringSchema,
    categoryIds: nonEmptyStringArray,
    description: localizedStringSchema,
    details: localizedDetailsSchema,
  },
  required: ['id', 'names', 'categoryIds', 'description', 'details'],
  additionalProperties: false,
} as const

export const validateCreateDesign = ajv.compile<CreateDesignInput>(createDesignSchema)
export const validateUpdateDesign = ajv.compile<UpdateDesignInput>(updateDesignSchema)
