import type {
  DocumentSnapshot,
  DocumentData,
  DocumentReference
} from 'firebase-admin/firestore'
import type { Piece } from './types'
import { InternalDataError } from '../../errors/AppError'

export function docToPiece(doc: DocumentSnapshot<DocumentData>): Piece {
  const data = doc.data()
  if (!data) {
    throw new InternalDataError(`Document ${doc.id} has no data`)
  }

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
