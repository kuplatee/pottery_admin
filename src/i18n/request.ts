import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './config'

function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE
  }

  const preferred = acceptLanguage
    .split(',')
    .map((entry) => entry.split(';')[0].trim().slice(0, 2).toLowerCase())

  return (
    preferred.find((lang): lang is Locale =>
      SUPPORTED_LOCALES.includes(lang as Locale)
    ) ?? DEFAULT_LOCALE
  )
}

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get('locale')?.value as
    | Locale
    | undefined
  const locale =
    cookieLocale ??
    detectLocaleFromHeader((await headers()).get('Accept-Language'))

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
