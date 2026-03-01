import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getFirestoreDb() {
  if (getApps().length === 0) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const projectId = process.env.FIREBASE_PROJECT_ID

    const missing = [
      !privateKey && 'FIREBASE_PRIVATE_KEY',
      !clientEmail && 'FIREBASE_CLIENT_EMAIL',
      !projectId && 'FIREBASE_PROJECT_ID'
    ].filter(Boolean)

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variable(s): ${missing.join(', ')}`
      )
    }

    initializeApp({
      credential: cert({
        privateKey: privateKey!.replace(/\\n/g, '\n'),
        clientEmail,
        projectId
      })
    })
  }

  return getFirestore()
}

export function getDb() {
  return getFirestoreDb()
}
