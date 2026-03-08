export const SUPPORTED_LANGUAGES = ['fi', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<Language, string> = {
  fi: 'Finnish',
  en: 'English'
}
