import type { Collection, CreateCollectionInput, UpdateCollectionInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToCollection } from './collectionMappers'
import { hasPiecesReferencingCollection } from '../database-utils/referentialIntegrityChecks'
import { NotFoundError, ReferentialIntegrityError } from '../../errors/AppError'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllCollections(db: Firestore): Promise<Collection[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.COLLECTIONS)

  return docs.map(docToCollection)
}

export async function getCollection(db: Firestore, id: string): Promise<Collection> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.COLLECTIONS, id)
  if (!doc) {
    throw new NotFoundError(ENTITY_NAMES.COLLECTION, id)
  }

  return docToCollection(doc)
}

export async function createCollection(
  db: Firestore,
  input: CreateCollectionInput
): Promise<Collection> {
  const data = {
    names: { ...input.names },
    description: { ...input.description }
  }

  const id = await createCollectionDocument(db, DB_COLLECTIONS.COLLECTIONS, data)

  return {
    id,
    names: { ...input.names },
    description: { ...input.description }
  }
}

export async function updateCollection(
  db: Firestore,
  input: UpdateCollectionInput
): Promise<Collection> {
  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.COLLECTIONS).doc(input.id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.COLLECTION, input.id)
    }

    transaction.update(ref, {
      names: { ...input.names },
      description: { ...input.description }
    })
  })

  return {
    id: input.id,
    names: { ...input.names },
    description: { ...input.description }
  }
}

export async function deleteCollection(db: Firestore, id: string): Promise<string> {
  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.COLLECTIONS).doc(id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.COLLECTION, id)
    }

    if (await hasPiecesReferencingCollection(db, transaction, id)) {
      throw new ReferentialIntegrityError(ENTITY_NAMES.COLLECTION, id, 'pieces')
    }

    transaction.delete(ref)
  })

  return id
}
