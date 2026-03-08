import { useTranslations } from 'next-intl'

export default function ItemsPage() {
  const t = useTranslations('pages.items')

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold tracking-wide">{t('title')}</h1>
      <p className="mt-2 text-sm text-gray-500">{t('description')}</p>
    </main>
  )
}
