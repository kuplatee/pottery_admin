import type { DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { Collection } from './types'
import { InternalDataError } from '../../errors/AppError'

export function docToCollection(doc: DocumentSnapshot<DocumentData>): Collection {
  const data = doc.data()
  if (!data) {
    throw new InternalDataError(`Document ${doc.id} has no data`)
  }

  return {
    id: doc.id,
    names: {
      en: data.names.en,
      fi: data.names.fi
    },
    description: {
      en: data.description.en,
      fi: data.description.fi
    }
  }
}
