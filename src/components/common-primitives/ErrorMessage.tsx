type Props = {
  message: string
}

export function ErrorMessage({ message }: Props) {
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}
