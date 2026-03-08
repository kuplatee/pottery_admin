type Props = {
  children: string
  htmlFor?: string
}

export function LanguageLabel({ children, htmlFor }: Props) {
  const className = 'text-xs font-medium text-gray-500 mb-1'
  if (htmlFor) {
    return <label htmlFor={htmlFor} className={className}>{children}</label>
  }
  return <p className={className}>{children}</p>
}
