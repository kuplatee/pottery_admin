import { describe, it, expect } from 'vitest'
import { validateInput } from '../../graphql/graphql-server/validation/validate'
import { validateCreateCategory, validateUpdateCategory } from '../../graphql/graphql-server/validation/schemas/category.schemas'
import { ValidationError } from '../../graphql/graphql-server/errors/AppError'

describe('validateCreateCategory', () => {
  it('accepts valid input', () => {
    expect(() =>
      validateInput(validateCreateCategory, { names: { en: 'Cups', fi: 'Kupit' } })
    ).not.toThrow()
  })

  it('rejects missing names', () => {
    expect(() => validateInput(validateCreateCategory, {})).toThrow(ValidationError)
  })

  it('rejects empty en name', () => {
    expect(() =>
      validateInput(validateCreateCategory, { names: { en: '', fi: 'Kupit' } })
    ).toThrow(ValidationError)
  })

  it('rejects empty fi name', () => {
    expect(() =>
      validateInput(validateCreateCategory, { names: { en: 'Cups', fi: '' } })
    ).toThrow(ValidationError)
  })

  it('rejects extra properties', () => {
    expect(() =>
      validateInput(validateCreateCategory, { names: { en: 'Cups', fi: 'Kupit' }, extra: true })
    ).toThrow(ValidationError)
  })
})

describe('validateUpdateCategory', () => {
  it('accepts valid input', () => {
    expect(() =>
      validateInput(validateUpdateCategory, { id: 'abc', names: { en: 'Cups', fi: 'Kupit' } })
    ).not.toThrow()
  })

  it('rejects missing id', () => {
    expect(() =>
      validateInput(validateUpdateCategory, { names: { en: 'Cups', fi: 'Kupit' } })
    ).toThrow(ValidationError)
  })

  it('rejects empty id', () => {
    expect(() =>
      validateInput(validateUpdateCategory, { id: '', names: { en: 'Cups', fi: 'Kupit' } })
    ).toThrow(ValidationError)
  })
})
