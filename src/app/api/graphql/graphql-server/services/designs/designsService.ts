import type { Design, CreateDesignInput, UpdateDesignInput } from './types'
import {
  getAllCollectionDocuments,
  getCollectionDocumentById,
  createCollectionDocument
} from '../database-utils/firestoreUtils'
import { DB_COLLECTIONS } from '../database-utils/collectionNames'
import { ENTITY_NAMES } from '../database-utils/entityNames'
import { docToDesign } from './designMappers'
import { hasPiecesReferencingDesign } from '../database-utils/referentialIntegrityChecks'
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

export async function getDesign(db: Firestore, id: string): Promise<Design> {
  const doc = await getCollectionDocumentById(db, DB_COLLECTIONS.DESIGNS, id)
  if (!doc) {
    throw new NotFoundError(ENTITY_NAMES.DESIGN, id)
  }

  return docToDesign(doc)
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

  return {
    id,
    names: { en: input.names.en, fi: input.names.fi },
    categoryIds: input.categoryIds,
    description: { en: input.description.en, fi: input.description.fi },
    details: { en: input.details.en, fi: input.details.fi }
  }
}

export async function updateDesign(
  db: Firestore,
  input: UpdateDesignInput
): Promise<Design> {
  assertDetailsKeysConsistent(input.details)

  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.DESIGNS).doc(input.id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.DESIGN, input.id)
    }

    for (const categoryId of input.categoryIds) {
      const categoryRef = db.collection(DB_COLLECTIONS.CATEGORIES).doc(categoryId)
      const categoryDoc = await transaction.get(categoryRef)
      if (!categoryDoc.exists) {
        throw new NotFoundError(ENTITY_NAMES.CATEGORY, categoryId)
      }
    }

    transaction.update(ref, {
      names: { en: input.names.en, fi: input.names.fi },
      categoryIds: input.categoryIds,
      description: { en: input.description.en, fi: input.description.fi },
      details: { en: input.details.en, fi: input.details.fi }
    })
  })

  return {
    id: input.id,
    names: { en: input.names.en, fi: input.names.fi },
    categoryIds: input.categoryIds,
    description: { en: input.description.en, fi: input.description.fi },
    details: { en: input.details.en, fi: input.details.fi }
  }
}

export async function deleteDesign(db: Firestore, id: string): Promise<string> {
  await db.runTransaction(async (transaction) => {
    const ref = db.collection(DB_COLLECTIONS.DESIGNS).doc(id)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      throw new NotFoundError(ENTITY_NAMES.DESIGN, id)
    }

    if (await hasPiecesReferencingDesign(db, transaction, id)) {
      throw new ReferentialIntegrityError(ENTITY_NAMES.DESIGN, id, 'pieces')
    }

    transaction.delete(ref)
  })

  return id
}
