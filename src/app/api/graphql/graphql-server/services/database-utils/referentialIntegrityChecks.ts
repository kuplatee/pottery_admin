import type { Firestore, Transaction } from 'firebase-admin/firestore'
import { DB_COLLECTIONS } from './collectionNames'

// Note: transaction.get(query) in the Admin SDK is snapshot-consistent for
// document reads but query results have weaker isolation guarantees. The
// entity doc read + delete pair is fully atomic; the referential check is
// "best-effort" under concurrent load, which is acceptable for this app.

export async function hasDesignsReferencingCategory(
  db: Firestore,
  transaction: Transaction,
  categoryId: string
): Promise<boolean> {
  const query = db
    .collection(DB_COLLECTIONS.DESIGNS)
    .where('categoryIds', 'array-contains', categoryId)
    .limit(1)
  const snapshot = await transaction.get(query)

  return !snapshot.empty
}

export async function hasPiecesReferencingDesign(
  db: Firestore,
  transaction: Transaction,
  designId: string
): Promise<boolean> {
  const query = db
    .collection(DB_COLLECTIONS.PIECES)
    .where('designId', '==', designId)
    .limit(1)
  const snapshot = await transaction.get(query)

  return !snapshot.empty
}

export async function hasPiecesReferencingCollection(
  db: Firestore,
  transaction: Transaction,
  collectionId: string
): Promise<boolean> {
  const query = db
    .collection(DB_COLLECTIONS.PIECES)
    .where('collectionId', '==', collectionId)
    .limit(1)
  const snapshot = await transaction.get(query)

  return !snapshot.empty
}
