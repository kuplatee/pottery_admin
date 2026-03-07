import type { Design, CreateDesignInput, UpdateDesignInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { docToDesign } from './designMappers'
import type { Firestore } from 'firebase-admin/firestore'

export async function getAllDesigns(db: Firestore): Promise<Design[]> {
  const docs = await getAllCollectionDocuments(db, DB_COLLECTIONS.DESIGNS)

  return docs.map(docToDesign)
}

export async function getDesign(
  db: Firestore,
  id: string
): Promise<Design | null | undefined> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.DESIGNS, id)
  if (!doc) {
    return null
  }

  return docToDesign(doc as Parameters<typeof docToDesign>[0])
}

export async function createDesign(
  db: Firestore,
  input: CreateDesignInput
): Promise<Design> {
  for (const categoryId of input.categoryIds) {
    const category = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.CATEGORIES,
      categoryId
    )
    if (!category) {
      throw new Error(`Category with id "${categoryId}" not found`)
    }
  }

  const data = {
    names: { en: input.names.en, fi: input.names.fi },
    categoryIds: input.categoryIds,
    description: { en: input.description.en, fi: input.description.fi },
    details: { en: input.details.en, fi: input.details.fi }
  }

  const id = await createCollectionDocument(db, DB_COLLECTIONS.DESIGNS, data)

  return { id, ...input }
}

export async function updateDesign(
  db: Firestore,
  input: UpdateDesignInput
): Promise<Design> {
  const existing = await getCollectionDocumentById(
    db,
    DB_COLLECTIONS.DESIGNS,
    input.id
  )
  if (!existing) {
    throw new Error(`Design with id "${input.id}" not found`)
  }

  for (const categoryId of input.categoryIds) {
    const category = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.CATEGORIES,
      categoryId
    )
    if (!category) {
      throw new Error(`Category with id "${categoryId}" not found`)
    }
  }

  const data = {
    names: { en: input.names.en, fi: input.names.fi },
    categoryIds: input.categoryIds,
    description: { en: input.description.en, fi: input.description.fi },
    details: { en: input.details.en, fi: input.details.fi }
  }

  await updateCollectionDocument(db, DB_COLLECTIONS.DESIGNS, input.id, data)

  return { ...input }
}

export async function deleteDesign(db: Firestore, id: string): Promise<string> {
  const existing = await getCollectionDocumentById(
    db,
    DB_COLLECTIONS.DESIGNS,
    id
  )
  if (!existing) {
    throw new Error(`Design with id "${id}" not found`)
  }

  // FIXME: before deleting, check that no Piece references this design (designId).
  // If any pieces are linked, reject the deletion to preserve referential integrity.

  await deleteCollectionDocument(db, DB_COLLECTIONS.DESIGNS, id)

  return id
}
