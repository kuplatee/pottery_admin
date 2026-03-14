'use client'

import { useLocale } from 'next-intl'
import { setLocale } from '@/i18n/setLocaleAction'
export default function LanguageToggle() {
  const locale = useLocale()

  function handleToggle() {
    setLocale(locale === 'en' ? 'fi' : 'en')
  }

  return (
    <button
      onClick={handleToggle}
      className="ml-auto flex items-center gap-1.5 p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
      aria-label="Change language"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2" />
        <path d="M2 12h20" />
      </svg>
      <span className="text-xs font-medium uppercase">{locale}</span>
    </button>
  )
}
