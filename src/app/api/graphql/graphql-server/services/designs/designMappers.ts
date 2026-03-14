import type {
  DocumentSnapshot,
  DocumentData,
  DocumentReference
} from 'firebase-admin/firestore'
import type { Design } from './types'
import { InternalDataError } from '../../errors/AppError'

export function docToDesign(doc: DocumentSnapshot<DocumentData>): Design {
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
    categoryIds: (data.categoryIds as Array<string | DocumentReference>).map(
      (ref) => (typeof ref === 'string' ? ref : ref.id)
    ),
    description: {
      en: data.description.en,
      fi: data.description.fi
    },
    details: {
      en: typeof data.details.en === 'string' ? JSON.parse(data.details.en) : data.details.en,
      fi: typeof data.details.fi === 'string' ? JSON.parse(data.details.fi) : data.details.fi
    }
  }
}
