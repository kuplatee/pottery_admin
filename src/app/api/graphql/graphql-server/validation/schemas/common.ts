import { SUPPORTED_LANGUAGES } from '@/lib/languages'

export const nonEmptyString = {
  type: 'string',
  minLength: 1,
  errorMessage: 'must be a non-empty string',
} as const

export const localizedStringSchema = {
  type: 'object',
  properties: Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, nonEmptyString])),
  required: [...SUPPORTED_LANGUAGES],
  additionalProperties: false,
}

export const nonEmptyStringArray = {
  type: 'array',
  items: nonEmptyString,
  minItems: 1,
  errorMessage: 'must be a non-empty array of strings',
} as const

export const localizedDetailsSchema = {
  type: 'object',
  properties: Object.fromEntries(
    SUPPORTED_LANGUAGES.map(lang => [lang, { type: 'object', additionalProperties: { type: 'string' } }])
  ),
  required: [...SUPPORTED_LANGUAGES],
  additionalProperties: false,
}
