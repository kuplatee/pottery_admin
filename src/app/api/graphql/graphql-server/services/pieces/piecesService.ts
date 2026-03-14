import type { Piece, CreatePieceInput, UpdatePieceInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument
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

export async function getPiece(db: Firestore, id: string): Promise<Piece> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.PIECES, id)
  if (!doc) {
    throw new NotFoundError(ENTITY_NAMES.PIECE, id)
  }

  return docToPiece(doc)
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

  return { id, ...data }
}

export async function updatePiece(
  db: Firestore,
  input: UpdatePieceInput
): Promise<Piece> {
  let removedFileNames: string[] = []

  const data = {
    designId: input.designId,
    imageFileNames: input.imageFileNames,
    sold: input.sold,
    ...(input.collectionId != null ? { collectionId: input.collectionId } : {})
  }

  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.PIECES).doc(input.id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.PIECE, input.id)
    }

    const designRef = db.collection(DB_COLLECTIONS.DESIGNS).doc(input.designId)
    const designDoc = await transaction.get(designRef)
    if (!designDoc.exists) {
      throw new NotFoundError(ENTITY_NAMES.DESIGN, input.designId)
    }

    if (input.collectionId != null) {
      const collectionRef = db.collection(DB_COLLECTIONS.COLLECTIONS).doc(input.collectionId)
      const collectionDoc = await transaction.get(collectionRef)
      if (!collectionDoc.exists) {
        throw new NotFoundError(ENTITY_NAMES.COLLECTION, input.collectionId)
      }
    }

    removedFileNames = docToPiece(doc).imageFileNames.filter(
      (name) => !input.imageFileNames.includes(name)
    )

    transaction.update(ref, data)
  })

  // Cloudinary deletion is intentionally outside the transaction — cross-system
  // atomicity is not possible. Orphaned images on Cloudinary failure are acceptable.
  await deleteImages(removedFileNames)

  return { id: input.id, ...data }
}

export async function deletePiece(db: Firestore, id: string): Promise<string> {
  let imageFileNames: string[] = []

  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.PIECES).doc(id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.PIECE, id)
    }

    imageFileNames = docToPiece(doc).imageFileNames
    transaction.delete(ref)
  })

  // Cloudinary deletion is intentionally outside the transaction — cross-system
  // atomicity is not possible. Orphaned images on Cloudinary failure are acceptable.
  await deleteImages(imageFileNames)

  return id
}
