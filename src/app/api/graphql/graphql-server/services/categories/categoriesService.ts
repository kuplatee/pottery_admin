import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput
} from '../../modules/generated-types-and-defs/resolverTypes.generated'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById
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
  _db: Firestore,
  _input: CreateCategoryInput
): Promise<Category> {
  throw new Error('Not implemented')
}

export async function updateCategory(
  _db: Firestore,
  _input: UpdateCategoryInput
): Promise<Category> {
  throw new Error('Not implemented')
}

export async function deleteCategory(
  _db: Firestore,
  _id: string
): Promise<string> {
  throw new Error('Not implemented')
}
