import type {
  DocumentSnapshot,
  DocumentData,
  DocumentReference
} from 'firebase-admin/firestore'
import type { Design, LocalizedDetails } from './types'
import { InternalDataError } from '../../errors/AppError'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import type { LocalizedString } from '../common/types'

export function docToDesign(doc: DocumentSnapshot<DocumentData>): Design {
  const data = doc.data()
  if (!data) {
    throw new InternalDataError(`Document ${doc.id} has no data`)
  }

  return {
    id: doc.id,
    names: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, data.names[lang] as string])
    ) as LocalizedString,
    categoryIds: (data.categoryIds as Array<string | DocumentReference>).map(
      (ref) => (typeof ref === 'string' ? ref : ref.id)
    ),
    description: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [lang, data.description[lang] as string])
    ) as LocalizedString,
    details: Object.fromEntries(
      SUPPORTED_LANGUAGES.map(lang => [
        lang,
        typeof data.details[lang] === 'string' ? JSON.parse(data.details[lang]) : data.details[lang]
      ])
    ) as LocalizedDetails
  }
}
