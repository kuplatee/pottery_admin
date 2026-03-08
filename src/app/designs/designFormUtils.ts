import type { DetailsEntry } from '@/components/form-modal/DetailsFields'

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
      acc.en[entry.keyEn] = entry.valueEn
      acc.fi[entry.keyFi] = entry.valueFi
      return acc
    },
    { en: {}, fi: {} }
  )
}
