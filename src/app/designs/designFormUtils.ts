import { SUPPORTED_LANGUAGES } from '@/lib/languages'
import type { DetailsEntry } from '@/components/entity-form-modal/inputs/DetailsFieldsInput'
import type { LocalizedDetails } from '@/app/api/graphql/graphql-server/services/designs/types'

export function toLocalizedJson(details: DetailsEntry[] | undefined): LocalizedDetails {
  if (!details) {
    return Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, {}])) as LocalizedDetails
  }
  return details.reduce<LocalizedDetails>(
    (acc, entry) => {
      for (const lang of SUPPORTED_LANGUAGES) {
        acc[lang][entry.key[lang]] = entry.value[lang]
      }
      return acc
    },
    Object.fromEntries(SUPPORTED_LANGUAGES.map(lang => [lang, {}])) as LocalizedDetails
  )
}
