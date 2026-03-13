import { ajv } from '../ajv'
import { nonEmptyString, nonEmptyStringArray } from './common'
import type { CreatePieceInput, UpdatePieceInput } from '../../services/pieces/types'

const createPieceSchema = {
  type: 'object',
  properties: {
    designId: nonEmptyString,
    imageFileNames: nonEmptyStringArray,
    sold: { type: 'boolean' },
    collectionId: nonEmptyString,
  },
  required: ['designId', 'imageFileNames', 'sold'],
  additionalProperties: false,
} as const

const updatePieceSchema = {
  type: 'object',
  properties: {
    id: nonEmptyString,
    designId: nonEmptyString,
    imageFileNames: nonEmptyStringArray,
    sold: { type: 'boolean' },
    collectionId: nonEmptyString,
  },
  required: ['id', 'designId', 'imageFileNames', 'sold'],
  additionalProperties: false,
} as const

export const validateCreatePiece = ajv.compile<CreatePieceInput>(createPieceSchema)
export const validateUpdatePiece = ajv.compile<UpdatePieceInput>(updatePieceSchema)
