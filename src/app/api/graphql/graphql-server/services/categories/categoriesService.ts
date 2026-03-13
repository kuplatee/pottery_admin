import type { Category, CreateCategoryInput, UpdateCategoryInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { docToCategory } from './categoryMappers'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllCategories(db: Firestore): Promise<Category[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.CATEGORIES)

  return docs.map(docToCategory)
}

export async function getCategory(
  db: Firestore,
  id: string
): Promise<Category | null | undefined> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.CATEGORIES, id)
  if (!doc) return null

  return docToCategory(doc as Parameters<typeof docToCategory>[0])
}

export async function createCategory(
  db: Firestore,
  input: CreateCategoryInput
): Promise<Category> {
  const data = { names: { en: input.names.en, fi: input.names.fi } }
  const id = await createCollectionDocument(db, DB_COLLECTIONS.CATEGORIES, data)

  return { id, names: input.names }
}

export async function updateCategory(
  db: Firestore,
  input: UpdateCategoryInput
): Promise<Category> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.CATEGORIES, input.id)
  if (!existing) {
    throw new Error(`Category with id "${input.id}" not found`)
  }

  const data = { names: { en: input.names.en, fi: input.names.fi } }
  await updateCollectionDocument(db, DB_COLLECTIONS.CATEGORIES, input.id, data)

  return { id: input.id, names: input.names }
}

export async function deleteCategory(
  db: Firestore,
  id: string
): Promise<string> {
  const existing = await getCollectionDocumentById(db, DB_COLLECTIONS.CATEGORIES, id)
  if (!existing) {
    throw new Error(`Category with id "${id}" not found`)
  }

  const referencingDesigns = await db
    .collection(DB_COLLECTIONS.DESIGNS)
    .where('categoryIds', 'array-contains', id)
    .limit(1)
    .get()

  if (!referencingDesigns.empty) {
    throw new Error(`Category with id "${id}" cannot be deleted because it is referenced by one or more designs`)
  }

  await deleteCollectionDocument(db, DB_COLLECTIONS.CATEGORIES, id)

  return id
}
