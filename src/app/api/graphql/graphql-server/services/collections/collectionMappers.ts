import type { QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { Collection } from './types'

export function docToCollection(doc: QueryDocumentSnapshot<DocumentData>): Collection {
  const data = doc.data()

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
