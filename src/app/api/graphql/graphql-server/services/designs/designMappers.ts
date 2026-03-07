import type {
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase-admin/firestore'
import type { Design } from './types'

export function docToDesign(
  doc: QueryDocumentSnapshot<DocumentData>
): Design {
  const data = doc.data()

  return {
    id: doc.id,
    names: {
      en: data.names.en,
      fi: data.names.fi
    },
    categoryIds: data.categoryIds,
    description: {
      en: data.description.en,
      fi: data.description.fi
    },
    details: {
      en: data.details.en,
      fi: data.details.fi
    }
  }
}
