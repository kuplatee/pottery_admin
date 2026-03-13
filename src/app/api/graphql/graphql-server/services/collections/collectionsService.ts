import type { Collection, CreateCollectionInput, UpdateCollectionInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToCollection } from './collectionMappers'
import { NotFoundError, ReferentialIntegrityError } from '../../errors/AppError'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllCollections(db: Firestore): Promise<Collection[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.COLLECTIONS)

  return docs.map(docToCollection)
}

export async function getCollection(
  db: Firestore,
  id: string
): Promise<Collection | null | undefined> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.COLLECTIONS, id)
  if (!doc) {
    return null
  }

  return docToCollection(doc as Parameters<typeof docToCollection>[0])
}

export async function createCollection(
  db: Firestore,
  input: CreateCollectionInput
): Promise<Collection> {
  const data = {
    names: { en: input.names.en, fi: input.names.fi },
    description: { en: input.description.en, fi: input.description.fi }
  }

  const id = await createCollectionDocument(db, DB_COLLECTIONS.COLLECTIONS, data)

  return { id, ...input }
}

export async function updateCollection(
  db: Firestore,
  input: UpdateCollectionInput
): Promise<Collection> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.COLLECTIONS, input.id)
  if (!existing) {
    throw new NotFoundError(ENTITY_NAMES.COLLECTION, input.id)
  }

  const data = {
    names: { en: input.names.en, fi: input.names.fi },
    description: { en: input.description.en, fi: input.description.fi }
  }

  await updateCollectionDocument(db, DB_COLLECTIONS.COLLECTIONS, input.id, data)

  return { ...input }
}

export async function deleteCollection(db: Firestore, id: string): Promise<string> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.COLLECTIONS, id)
  if (!existing) {
    throw new NotFoundError(ENTITY_NAMES.COLLECTION, id)
  }

  const referencingPieces = await db
    .collection(DB_COLLECTIONS.PIECES)
    .where('collectionId', '==', id)
    .limit(1)
    .get()

  if (!referencingPieces.empty) {
    throw new ReferentialIntegrityError(ENTITY_NAMES.COLLECTION, id, 'pieces')
  }

  await deleteCollectionDocument(db, DB_COLLECTIONS.COLLECTIONS, id)

  return id
}
