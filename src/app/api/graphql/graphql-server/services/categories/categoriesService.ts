import type { Category, CreateCategoryInput, UpdateCategoryInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToCategory } from './categoryMappers'
import { hasDesignsReferencingCategory } from '../database-utils/referentialIntegrityChecks'
import { NotFoundError, ReferentialIntegrityError } from '../../errors/AppError'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllCategories(db: Firestore): Promise<Category[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.CATEGORIES)

  return docs.map(docToCategory)
}

export async function getCategory(db: Firestore, id: string): Promise<Category> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.CATEGORIES, id)
  if (!doc) {
    throw new NotFoundError(ENTITY_NAMES.CATEGORY, id)
  }

  return docToCategory(doc)
}

export async function createCategory(
  db: Firestore,
  input: CreateCategoryInput
): Promise<Category> {
  const data = { names: { en: input.names.en, fi: input.names.fi } }
  const id = await createCollectionDocument(db, DB_COLLECTIONS.CATEGORIES, data)

  return { id, names: { en: input.names.en, fi: input.names.fi } }
}

export async function updateCategory(
  db: Firestore,
  input: UpdateCategoryInput
): Promise<Category> {
  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.CATEGORIES).doc(input.id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.CATEGORY, input.id)
    }

    transaction.update(ref, { names: { en: input.names.en, fi: input.names.fi } })
  })

  return { id: input.id, names: { en: input.names.en, fi: input.names.fi } }
}

export async function deleteCategory(
  db: Firestore,
  id: string
): Promise<string> {
  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.CATEGORIES).doc(id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.CATEGORY, id)
    }

    if (await hasDesignsReferencingCategory(db, transaction, id)) {
      throw new ReferentialIntegrityError(ENTITY_NAMES.CATEGORY, id, 'designs')
    }

    transaction.delete(ref)
  })

  return id
}
