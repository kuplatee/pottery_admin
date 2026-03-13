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
