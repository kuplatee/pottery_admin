import Link from 'next/link'

const NAV_ITEMS = [
  {
    href: '/categories',
    label: 'Categories',
    description: 'Manage pottery categories'
  },
  {
    href: '/collections',
    label: 'Collections',
    description: 'Manage aesthetic collections'
  },
  {
    href: '/designs',
    label: 'Designs',
    description: 'Manage artistic designs and their details'
  },
  {
    href: '/items',
    label: 'Items',
    description: 'Manage individual physical pottery pieces'
  }
]

export default function HomeNav() {
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
