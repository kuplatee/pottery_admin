import type { Piece, CreatePieceInput, UpdatePieceInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { docToPiece } from './pieceMappers'
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
    throw new Error(`Design with id "${input.designId}" not found`)
  }

  if (input.collectionId != null) {
    const collection = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.COLLECTIONS,
      input.collectionId
    )
    if (!collection) {
      throw new Error(`Collection with id "${input.collectionId}" not found`)
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
    throw new Error(`Piece with id "${input.id}" not found`)
  }

  const design = await getCollectionDocumentById(db, DB_COLLECTIONS.DESIGNS, input.designId)
  if (!design) {
    throw new Error(`Design with id "${input.designId}" not found`)
  }

  if (input.collectionId != null) {
    const collection = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.COLLECTIONS,
      input.collectionId
    )
    if (!collection) {
      throw new Error(`Collection with id "${input.collectionId}" not found`)
    }
  }

  const data = {
    designId: input.designId,
    imageFileNames: input.imageFileNames,
    sold: input.sold,
    ...(input.collectionId != null ? { collectionId: input.collectionId } : {})
  }

  await updateCollectionDocument(db, DB_COLLECTIONS.PIECES, input.id, data)

  return { ...input }
}

export async function deletePiece(db: Firestore, id: string): Promise<string> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.PIECES, id)
  if (!existing) {
    throw new Error(`Piece with id "${id}" not found`)
  }

  await deleteCollectionDocument(db, DB_COLLECTIONS.PIECES, id)

  return id
}
