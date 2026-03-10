'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

const NAV_HREFS = ['/categories', '/collections', '/designs', '/pieces'] as const

type NavHref = (typeof NAV_HREFS)[number]

export default function TopNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const NAV_ITEMS: { href: NavHref; label: string }[] = [
    { href: '/categories', label: t('categories') },
    { href: '/collections', label: t('collections') },
    { href: '/designs', label: t('designs') },
    { href: '/pieces', label: t('pieces') }
  ]

  if (pathname === '/') {
    return null
  }

  return (
    <nav className="flex items-center gap-1 border-b border-gray-200 px-6 py-3">
      <Link
        href="/"
        className="mr-4 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-gray-800 transition-colors leading-tight"
      >
        Tsirbunen<br />Pottery Admin
      </Link>
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            pathname === href
              ? 'bg-gray-200 text-gray-800 border border-gray-500'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
