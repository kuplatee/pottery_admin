import type { DbCollectionName } from './collectionNames'
import type {
  Firestore,
  DocumentSnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'

export async function getCollectionDocumentById(
  db: Firestore,
  collectionName: DbCollectionName,
  id: string
): Promise<DocumentSnapshot<DocumentData> | null> {
  const snapshot = await db.collection(collectionName).doc(id).get()
  if (!snapshot.exists) {
    return null
  }

  return snapshot
}

export async function getAllCollectionDocuments(
  db: Firestore,
  collectionName: DbCollectionName
): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  const snapshot = await db.collection(collectionName).get()

  return snapshot.docs
}

export async function createCollectionDocument(
  db: Firestore,
  collectionName: DbCollectionName,
  data: DocumentData
): Promise<string> {
  const ref = db.collection(collectionName).doc()
  await ref.set(data)

  return ref.id
}

export async function deleteCollectionDocument(
  db: Firestore,
  collectionName: DbCollectionName,
  id: string
): Promise<void> {
  await db.collection(collectionName).doc(id).delete()
}
