import type {
  DocumentSnapshot,
  DocumentData
} from 'firebase-admin/firestore'
import type { Category } from './types'
import { InternalDataError } from '../../errors/AppError'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import type { LocalizedString } from '../common/types'

export function docToCategory(
  doc: DocumentSnapshot<DocumentData>
): Category {
  const data = doc.data()
  if (!data) {
    throw new InternalDataError(`Document ${doc.id} has no data`)
  }

  return {
    id: doc.id,
    names: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, data.names[lang] as string])
    ) as LocalizedString
  }
}
