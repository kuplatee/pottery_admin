'use client'

import { useState, useCallback } from 'react'
import { useController, type Control } from 'react-hook-form'
import { DeleteButton } from '@/components/common-primitives/DeleteIconButton'
import type { UploadState } from '../utils/useImageUpload'
import type { FormValues } from '../types/entity.types'

type Props = {
  control: Control<FormValues>
  pendingFiles: File[]
  uploadState: UploadState
  onFilesAdded: (files: FileList) => void
  onPendingFileRemoved: (index: number) => void
}

export function ImageDropZone({
  control,
  pendingFiles,
  uploadState,
  onFilesAdded,
  onPendingFileRemoved
}: Props) {
  const [isDragging, setIsDragging] = useState(false)

  const { field } = useController({
    name: 'imageFileNames',
    control,
    defaultValue: []
  })

  const uploadedFileNames: string[] = field.value ?? []

  function removeUploadedImage(publicId: string) {
    field.onChange(uploadedFileNames.filter((f) => f !== publicId))
  }

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files) {
        onFilesAdded(e.dataTransfer.files)
      }
    },
    [onFilesAdded]
  )

  const borderColor = isDragging
    ? 'border-blue-400 bg-blue-50'
    : 'border-gray-300 bg-gray-50'

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Images</label>

      <div
        className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors ${borderColor}`}
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        {uploadState === 'uploading' ? (
          <p className="text-sm text-blue-500">Uploading...</p>
        ) : (
          <p className="text-sm text-gray-400">
            Drop images here or{' '}
            <label className="cursor-pointer text-blue-500 underline">
              browse
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    onFilesAdded(e.target.files)
                  }
                }}
              />
            </label>
          </p>
        )}
        {uploadState === 'error' && (
          <p className="mt-1 text-xs text-red-500">Upload failed. Try again.</p>
        )}
      </div>

      {(uploadedFileNames.length > 0 || pendingFiles.length > 0) && (
        <ul className="mt-4 flex flex-wrap gap-4">
          {uploadedFileNames.map((publicId) => (
            <li key={publicId} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_PHOTO_BASE_URL ?? ''}${publicId}`}
                alt={publicId}
                className="h-24 w-24 rounded object-cover"
              />
              <div className="absolute bottom-0 left-0">
                <DeleteButton onClick={() => removeUploadedImage(publicId)} />
              </div>
            </li>
          ))}
          {pendingFiles.map((file, index) => (
            <li key={`pending-${index}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-24 w-24 rounded object-cover opacity-70"
              />
              <div className="absolute bottom-0 left-0">
                <DeleteButton onClick={() => onPendingFileRemoved(index)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
