import { describe, it, expect } from 'vitest'
import { validateInput } from '../../graphql/graphql-server/validation/validate'
import { validateCreatePiece, validateUpdatePiece } from '../../graphql/graphql-server/validation/schemas/piece.schemas'
import { ValidationError } from '../../graphql/graphql-server/errors/AppError'

const validInput = {
  designId: 'design-1',
  imageFileNames: ['photo.jpg'],
  sold: false,
}

describe('validateCreatePiece', () => {
  it('accepts valid input without collectionId', () => {
    expect(() => validateInput(validateCreatePiece, validInput)).not.toThrow()
  })

  it('accepts valid input with collectionId', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, collectionId: 'col-1' })
    ).not.toThrow()
  })

  it('rejects empty imageFileNames', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, imageFileNames: [] })
    ).toThrow(ValidationError)
  })

  it('rejects empty string in imageFileNames', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, imageFileNames: [''] })
    ).toThrow(ValidationError)
  })

  it('rejects empty designId', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, designId: '' })
    ).toThrow(ValidationError)
  })

  it('rejects empty collectionId', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, collectionId: '' })
    ).toThrow(ValidationError)
  })

  it('rejects non-boolean sold', () => {
    expect(() =>
      validateInput(validateCreatePiece, { ...validInput, sold: 'false' })
    ).toThrow(ValidationError)
  })
})

describe('validateUpdatePiece', () => {
  it('accepts valid input', () => {
    expect(() =>
      validateInput(validateUpdatePiece, { id: 'piece-1', ...validInput })
    ).not.toThrow()
  })

  it('rejects missing id', () => {
    expect(() => validateInput(validateUpdatePiece, validInput)).toThrow(ValidationError)
  })
})
