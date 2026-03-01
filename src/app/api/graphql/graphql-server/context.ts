import type { Firestore } from 'firebase-admin/firestore'

export type GraphQLContext = {
  db: Firestore
}
