import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export type UploadSignatureResult = {
  signature: string
  timestamp: number
  apiKey: string
  cloudName: string
  folder: string
}

export async function deleteImages(fileNames: string[]): Promise<void> {
  if (fileNames.length === 0) { return }

  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? ''
  const publicIds = fileNames.map((name) => {
    const nameWithoutExtension = name.replace(/\.[^.]+$/, '')
    return folder ? `${folder}/${nameWithoutExtension}` : nameWithoutExtension
  })

  try {
    await cloudinary.api.delete_resources(publicIds)
  } catch (err) {
    console.error('[cloudinaryService] Failed to delete images:', publicIds, err)
  }
}

export function generateUploadSignature(): UploadSignatureResult {
  const timestamp = Math.round(Date.now() / 1000)
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? ''
  const paramsToSign = { folder, timestamp }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  )

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    folder
  }
}
