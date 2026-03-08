import { CloseIconButton } from '../../common-primitives/CloseIconButton'

type Props = {
  title: string
  onClose: () => void
}

export function ModalHeader({ title, onClose }: Props) {
  return (
    <div className="flex items-start justify-between">
      <h2 id="entity-modal-title" className="text-lg font-semibold">
        {title}
      </h2>
      <CloseIconButton onClick={onClose} />
    </div>
  )
}
