'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LanguageToggle from '@/components/language/LanguageToggle'

type NavHref = '/categories' | '/collections' | '/designs' | '/pieces'

export default function TopNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)

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
    <nav className="relative z-20 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-1 px-8 py-3">
        {/* Narrow screen: hamburger button (leftmost) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden mr-2 p-1.5 rounded-lg text-gray-400 hover:text-gray-800 bg-gray-100 transition-colors outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <Link
          href="/"
          className="mr-4 max-md:pl-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-gray-800 transition-colors leading-tight"
        >
          Tsirbunen<br />Pottery Admin
        </Link>

        {/* Wide screen: nav items */}
        <div className="hidden md:flex items-center gap-1 flex-1">
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
        </div>

        {/* Language toggle: always visible, pushed to the right */}
        <div className="ml-auto">
          <LanguageToggle />
        </div>
      </div>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 h-screen bg-black/40 z-10"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Narrow screen: dropdown menu */}
      {menuOpen && (
        <div className="md:hidden relative z-20 border-t border-gray-100 pl-[4.5rem] pr-8 py-3 flex flex-col gap-1 bg-white">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-gray-200 text-gray-800 border border-gray-500'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
