import type {
  QueryDocumentSnapshot,
  DocumentData,
  DocumentReference
} from 'firebase-admin/firestore'
import type { Piece } from './types'

export function docToPiece(doc: QueryDocumentSnapshot<DocumentData>): Piece {
  const data = doc.data()

  return {
    id: doc.id,
    designId:
      typeof data.designId === 'string' ? data.designId : (data.designId as DocumentReference).id,
    imageFileNames: data.imageFileNames as string[],
    sold: data.sold as boolean,
    collectionId:
      data.collectionId == null
        ? undefined
        : typeof data.collectionId === 'string'
          ? data.collectionId
          : (data.collectionId as DocumentReference).id
  }
}
