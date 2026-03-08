type Props = {
  children: string
}

export function SectionTitle({ children }: Props) {
  return <p className="pt-3 mb-2 text-base font-medium text-gray-700">{children}</p>
}
