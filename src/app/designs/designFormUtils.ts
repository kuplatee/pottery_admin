import type { DetailsEntry } from '@/components/entity-form-modal/inputs/DetailsFieldsInput'

export function toLocalizedJson(details: DetailsEntry[] | undefined): {
  en: Record<string, string>
  fi: Record<string, string>
} {
  if (!details) {
    return { en: {}, fi: {} }
  }
  return details.reduce<{
    en: Record<string, string>
    fi: Record<string, string>
  }>(
    (acc, entry) => {
      acc.en[entry.key.en] = entry.value.en
      acc.fi[entry.key.fi] = entry.value.fi
      return acc
    },
    { en: {}, fi: {} }
  )
}
