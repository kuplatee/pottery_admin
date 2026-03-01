import type {
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase-admin/firestore'
import type { Category } from '../../modules/generated-types-and-defs/resolverTypes.generated'

export function docToCategory(
  doc: QueryDocumentSnapshot<DocumentData>
): Category {
  const data = doc.data()

  return {
    id: doc.id,
    names: {
      en: data.names.en,
      fi: data.names.fi
    }
  }
}
