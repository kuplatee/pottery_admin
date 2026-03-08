import { DeleteTextButton } from '@/components/common-primitives/DeleteTextButton'
import { MainActionButton } from '@/components/common-primitives/MainActionButton'

type Props = {
  isEditing: boolean
  onDelete?: () => void
}

export function ModalActions({ isEditing, onDelete }: Props) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      {isEditing && onDelete && <DeleteTextButton onClick={onDelete} />}
      <MainActionButton label={isEditing ? 'Save' : 'Create'} />
    </div>
  )
}
