import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function HomeNav() {
  const t = useTranslations('nav')

  const NAV_ITEMS = [
    {
      href: '/categories',
      label: t('categories'),
      description: t('categoriesDescription')
    },
    {
      href: '/collections',
      label: t('collections'),
      description: t('collectionsDescription')
    },
    {
      href: '/designs',
      label: t('designs'),
      description: t('designsDescription')
    },
    {
      href: '/pieces',
      label: t('pieces'),
      description: t('piecesDescription')
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
      {NAV_ITEMS.map(({ href, label, description }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 p-6 hover:border-gray-500 hover:bg-gray-200 transition-colors"
        >
          <span className="text-lg font-semibold tracking-wide">{label}</span>
          <span className="text-sm text-gray-500">{description}</span>
        </Link>
      ))}
    </div>
  )
}
