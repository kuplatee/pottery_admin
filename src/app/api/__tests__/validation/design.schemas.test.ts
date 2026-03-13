import { describe, it, expect } from 'vitest'
import { validateInput } from '../../graphql/graphql-server/validation/validate'
import { validateCreateDesign, validateUpdateDesign } from '../../graphql/graphql-server/validation/schemas/design.schemas'
import { ValidationError } from '../../graphql/graphql-server/errors/AppError'

const validInput = {
  names: { en: 'Wave', fi: 'Aalto' },
  categoryIds: ['cat-1'],
  description: { en: 'Flowing lines', fi: 'Virtaavat linjat' },
  details: { en: { height: '10cm' }, fi: { korkeus: '10cm' } },
}

describe('validateCreateDesign', () => {
  it('accepts valid input', () => {
    expect(() => validateInput(validateCreateDesign, validInput)).not.toThrow()
  })

  it('rejects empty categoryIds array', () => {
    expect(() =>
      validateInput(validateCreateDesign, { ...validInput, categoryIds: [] })
    ).toThrow(ValidationError)
  })

  it('rejects empty string in categoryIds', () => {
    expect(() =>
      validateInput(validateCreateDesign, { ...validInput, categoryIds: [''] })
    ).toThrow(ValidationError)
  })

  it('rejects missing details', () => {
    const { details: _details, ...rest } = validInput
    expect(() => validateInput(validateCreateDesign, rest)).toThrow(ValidationError)
  })

  it('rejects non-string detail values', () => {
    expect(() =>
      validateInput(validateCreateDesign, {
        ...validInput,
        details: { en: { height: 10 }, fi: { korkeus: '10cm' } },
      })
    ).toThrow(ValidationError)
  })
})

describe('validateUpdateDesign', () => {
  it('accepts valid input', () => {
    expect(() =>
      validateInput(validateUpdateDesign, { id: 'abc', ...validInput })
    ).not.toThrow()
  })

  it('rejects missing id', () => {
    expect(() => validateInput(validateUpdateDesign, validInput)).toThrow(ValidationError)
  })
})
