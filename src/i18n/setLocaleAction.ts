'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { SUPPORTED_LOCALES, type Locale } from './config'

export async function setLocale(locale: Locale): Promise<void> {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return
  }

  ;(await cookies()).set('locale', locale, { path: '/' })
  revalidatePath('/', 'layout')
}
