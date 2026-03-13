import type { Design, CreateDesignInput, UpdateDesignInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument,
  updateCollectionDocument,
  deleteCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToDesign } from './designMappers'
import { NotFoundError, ReferentialIntegrityError, ValidationError } from '../../errors/AppError'
import type { Firestore } from 'firebase-admin/firestore'

function assertDetailsKeysConsistent(details: CreateDesignInput['details']): void {
  const enCount = Object.keys(details.en).length
  const fiCount = Object.keys(details.fi).length
  if (enCount !== fiCount) {
    throw new ValidationError(
      `details must have the same number of keys in each language — en: ${enCount}, fi: ${fiCount}`
    )
  }
}

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
  assertDetailsKeysConsistent(input.details)

  for (const categoryId of input.categoryIds) {
    const category = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.CATEGORIES,
      categoryId
    )
    if (!category) {
      throw new NotFoundError(ENTITY_NAMES.CATEGORY, categoryId)
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
  assertDetailsKeysConsistent(input.details)

  const existing = await getCollectionDocumentById(
    db,
    DB_COLLECTIONS.DESIGNS,
    input.id
  )
  if (!existing) {
    throw new NotFoundError(ENTITY_NAMES.DESIGN, input.id)
  }

  for (const categoryId of input.categoryIds) {
    const category = await getCollectionDocumentById(
      db,
      DB_COLLECTIONS.CATEGORIES,
      categoryId
    )
    if (!category) {
      throw new NotFoundError(ENTITY_NAMES.CATEGORY, categoryId)
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
    throw new NotFoundError(ENTITY_NAMES.DESIGN, id)
  }

  const referencingPieces = await db
    .collection(DB_COLLECTIONS.PIECES)
    .where('designId', '==', id)
    .limit(1)
    .get()

  if (!referencingPieces.empty) {
    throw new ReferentialIntegrityError(ENTITY_NAMES.DESIGN, id, 'pieces')
  }

  await deleteCollectionDocument(db, DB_COLLECTIONS.DESIGNS, id)

  return id
}
