import type { Piece, CreatePieceInput, UpdatePieceInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToPiece } from './pieceMappers'
import { deleteImages } from '../cloudinary/cloudinaryService'
import { NotFoundError } from '../../errors/AppError'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllPieces(db: Firestore): Promise<Piece[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.PIECES)

  return docs.map(docToPiece)
}

export async function getPiece(
  db: Firestore,
  id: string
): Promise<Piece | null | undefined> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.PIECES, id)
  if (!doc) {
    return null
  }

  return docToPiece(doc as Parameters<typeof docToPiece>[0])
}

export async function createPiece(
  db: Firestore,
  input: CreatePieceInput
): Promise<Piece> {
  const design = await getCollectionDocumentById(db, DB_COLLECTIONS.DESIGNS, input.designId)
  if (!design) {
    throw new NotFoundError(ENTITY_NAMES.DESIGN, input.designId)
  }

  if (input.collectionId != null) {
    const collection = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.COLLECTIONS,
      input.collectionId
    )
    if (!collection) {
      throw new NotFoundError(ENTITY_NAMES.COLLECTION, input.collectionId)
    }
  }

  const data = {
    designId: input.designId,
    imageFileNames: input.imageFileNames,
    sold: input.sold,
    ...(input.collectionId != null ? { collectionId: input.collectionId } : {})
  }

  const id = await createCollectionDocument(db, DB_COLLECTIONS.PIECES, data)

  return { id, ...input }
}

export async function updatePiece(
  db: Firestore,
  input: UpdatePieceInput
): Promise<Piece> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.PIECES, input.id)
  if (!existing) {
    throw new NotFoundError(ENTITY_NAMES.PIECE, input.id)
  }

  const design = await getCollectionDocumentById(db, DB_COLLECTIONS.DESIGNS, input.designId)
  if (!design) {
    throw new NotFoundError(ENTITY_NAMES.DESIGN, input.designId)
  }

  if (input.collectionId != null) {
    const collection = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.COLLECTIONS,
      input.collectionId
    )
    if (!collection) {
      throw new NotFoundError(ENTITY_NAMES.COLLECTION, input.collectionId)
    }
  }

  const data = {
    designId: input.designId,
    imageFileNames: input.imageFileNames,
    sold: input.sold,
    ...(input.collectionId != null ? { collectionId: input.collectionId } : {})
  }

  await updateCollectionDocument(db, DB_COLLECTIONS.PIECES, input.id, data)

  const existingPiece = docToPiece(existing as Parameters<typeof docToPiece>[0])
  const removedFileNames = existingPiece.imageFileNames.filter(
    (name) => !input.imageFileNames.includes(name)
  )
  await deleteImages(removedFileNames)

  return { ...input }
}

export async function deletePiece(db: Firestore, id: string): Promise<string> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.PIECES, id)
  if (!existing) {
    throw new NotFoundError(ENTITY_NAMES.PIECE, id)
  }

  const piece = docToPiece(existing as Parameters<typeof docToPiece>[0])

  await deleteCollectionDocument(db, DB_COLLECTIONS.PIECES, id)
  await deleteImages(piece.imageFileNames)

  return id
}
