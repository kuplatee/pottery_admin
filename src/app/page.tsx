import HomeNav from '@/components/HomeNav'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-12">
      <h1 className="text-2xl font-bold tracking-widest uppercase">
        Tsirbunen Pottery Admin
      </h1>
      <HomeNav />
    </main>
  )
}
