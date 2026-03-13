export const nonEmptyString = {
  type: 'string',
  minLength: 1,
  errorMessage: 'must be a non-empty string',
} as const

export const localizedStringSchema = {
  type: 'object',
  properties: {
    en: nonEmptyString,
    fi: nonEmptyString,
  },
  required: ['en', 'fi'],
  additionalProperties: false,
} as const

export const nonEmptyStringArray = {
  type: 'array',
  items: nonEmptyString,
  minItems: 1,
  errorMessage: 'must be a non-empty array of strings',
} as const

export const localizedDetailsSchema = {
  type: 'object',
  properties: {
    en: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
    fi: {
      type: 'object',
      additionalProperties: { type: 'string' },
    },
  },
  required: ['en', 'fi'],
  additionalProperties: false,
} as const
