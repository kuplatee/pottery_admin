import Image from 'next/image'
import { useTranslations } from 'next-intl'

const PHOTO_BASE_URL = process.env.NEXT_PUBLIC_PHOTO_BASE_URL ?? ''

type Piece = {
  id: string
  sold: boolean
  imageFileNames: string[]
}

type Props = {
  piece: Piece
  designName: string
  collectionName?: string
  onClick?: () => void
  onDelete?: () => void
}

export function PieceCard({ piece, designName, collectionName, onClick, onDelete }: Props) {
  const t = useTranslations()
  const imageUrl = piece.imageFileNames[0] ? `${PHOTO_BASE_URL}${piece.imageFileNames[0]}` : null

  return (
    <li
      className="relative flex w-44 cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <div className="relative h-44 w-full bg-gray-100">
        {imageUrl ? (
          <Image src={imageUrl} alt={piece.id} fill className="object-cover object-center" sizes="144px" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            {t('singlePiece.noImage')}
          </div>
        )}
        {piece.sold && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
            {t('entityForm.sold')}
          </span>
        )}

      </div>
      <div className="relative z-10 -mt-6 rounded-t-xl bg-white px-3 pb-2 pt-2">
        <p className="truncate text-sm font-medium text-gray-800">{designName}</p>
        {collectionName && (
          <p className="truncate text-xs text-gray-400">{collectionName}</p>
        )}
      </div>
    </li>
  )
}
