export const SUPPORTED_LANGUAGES = ['fi', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<Language, Record<Language, string>> = {
  fi: { fi: 'Suomi', en: 'Englanti' },
  en: { fi: 'Finnish', en: 'English' }
}
