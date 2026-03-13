import { describe, it, expect } from 'vitest'
import { validateInput } from '../../graphql/graphql-server/validation/validate'
import { validateCreateCollection, validateUpdateCollection } from '../../graphql/graphql-server/validation/schemas/collection.schemas'
import { ValidationError } from '../../graphql/graphql-server/errors/AppError'

const validInput = {
  names: { en: 'Cafe latte', fi: 'Cafe latte' },
  description: { en: 'A warm collection', fi: 'Lämmin kokoelma' },
}

describe('validateCreateCollection', () => {
  it('accepts valid input', () => {
    expect(() => validateInput(validateCreateCollection, validInput)).not.toThrow()
  })

  it('rejects missing description', () => {
    expect(() =>
      validateInput(validateCreateCollection, { names: { en: 'Cafe latte', fi: 'Cafe latte' } })
    ).toThrow(ValidationError)
  })

  it('rejects empty description string', () => {
    expect(() =>
      validateInput(validateCreateCollection, {
        names: { en: 'Cafe latte', fi: 'Cafe latte' },
        description: { en: '', fi: 'Lämmin kokoelma' },
      })
    ).toThrow(ValidationError)
  })
})

describe('validateUpdateCollection', () => {
  it('accepts valid input', () => {
    expect(() =>
      validateInput(validateUpdateCollection, { id: 'abc', ...validInput })
    ).not.toThrow()
  })

  it('rejects missing id', () => {
    expect(() => validateInput(validateUpdateCollection, validInput)).toThrow(ValidationError)
  })
})
