'use client'

import { useState } from 'react'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GetUploadSignatureMutation,
  GetUploadSignatureDocument
} from '@/services/graphql-client/graphql-queries/pieces.generated'
import { useApiClient } from '@/services/graphql-client/client/ApiClientContext'

export type UploadState = 'idle' | 'uploading' | 'error'

async function uploadFileToCloudinary(
  client: ApolloClient<NormalizedCacheObject>,
  file: File
): Promise<string> {
  const result = await client.mutate<GetUploadSignatureMutation>({
    mutation: GetUploadSignatureDocument
  })

  const sig = result.data?.getUploadSignature
  if (!sig) {
    throw new Error('Failed to get upload signature')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('signature', sig.signature)
  formData.append('timestamp', String(sig.timestamp))
  formData.append('api_key', sig.apiKey)
  formData.append('folder', sig.folder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!response.ok) {
    throw new Error('Cloudinary upload failed')
  }

  const data = await response.json()
  return data.public_id as string
}

export type ImageUploadHandle = {
  pendingFiles: File[]
  uploadState: UploadState
  addFiles: (files: FileList) => void
  removePendingFile: (index: number) => void
  uploadPending: () => Promise<string[]>
}

export function useImageUpload(): ImageUploadHandle {
  const client = useApiClient()
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [uploadState, setUploadState] = useState<UploadState>('idle')

  function addFiles(files: FileList) {
    setPendingFiles((prev) => [...prev, ...Array.from(files)])
  }

  function removePendingFile(index: number) {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function uploadPending(): Promise<string[]> {
    if (pendingFiles.length === 0) {
      return []
    }

    setUploadState('uploading')

    try {
      const ids = await Promise.all(
        pendingFiles.map((file) => uploadFileToCloudinary(client, file))
      )
      setPendingFiles([])
      setUploadState('idle')
      return ids
    } catch {
      setUploadState('error')
      throw new Error('Image upload failed')
    }
  }

  return { pendingFiles, uploadState, addFiles, removePendingFile, uploadPending }
}
