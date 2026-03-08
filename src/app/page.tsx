import { useTranslations } from 'next-intl'
import HomeNav from '@/components/navigation/HomeNav'

export default function Home() {
  const t = useTranslations('nav')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-12">
      <h1 className="text-2xl font-bold tracking-widest uppercase">
        {t('appName')}
      </h1>
      <HomeNav />
    </main>
  )
}
