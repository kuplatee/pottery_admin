import { SUPPORTED_LANGUAGES, type Language } from '@/lib/languages'
import type { DetailsEntry } from '../inputs/DetailsFieldsInput'
import type {
  EntityFieldConfig,
  EntityData,
  FormValues
} from '../types/entity.types'

export function buildMultilingualDefault(
  source?: Record<Language, string>
): Record<Language, string> {
  return Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, source?.[lang] ?? ''])
  ) as Record<Language, string>
}

export function buildDefaultValues(
  fieldConfig: EntityFieldConfig,
  entity?: EntityData
): FormValues {
  return {
    ...(fieldConfig.names && {
      names: buildMultilingualDefault(entity?.names)
    }),
    ...(fieldConfig.description && {
      description: buildMultilingualDefault(entity?.description)
    }),
    ...(fieldConfig.details && {
      details: entity?.details ? toDetailsEntries(entity.details) : []
    }),
    ...(fieldConfig.categoryIds && { categoryIds: entity?.categoryIds ?? [] })
  }
}

export function toDetailsEntries(
  details: Record<Language, Record<string, string>>
): DetailsEntry[] {
  const firstLang = SUPPORTED_LANGUAGES[0]
  return Object.keys(details[firstLang]).map((_, i) => ({
    key: Object.fromEntries(
      SUPPORTED_LANGUAGES.map((lang) => [
        lang,
        Object.keys(details[lang])[i] ?? ''
      ])
    ) as Record<Language, string>,
    value: Object.fromEntries(
      SUPPORTED_LANGUAGES.map((lang) => [
        lang,
        Object.values(details[lang])[i] ?? ''
      ])
    ) as Record<Language, string>
  }))
}
