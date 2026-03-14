import type {
  DocumentSnapshot,
  DocumentData
} from 'firebase-admin/firestore'
import type { Category } from './types'
import { InternalDataError } from '../../errors/AppError'

export function docToCategory(
  doc: DocumentSnapshot<DocumentData>
): Category {
  const data = doc.data()
  if (!data) {
    throw new InternalDataError(`Document ${doc.id} has no data`)
  }

  return {
    id: doc.id,
    names: {
      en: data.names.en,
      fi: data.names.fi
    }
  }
}
