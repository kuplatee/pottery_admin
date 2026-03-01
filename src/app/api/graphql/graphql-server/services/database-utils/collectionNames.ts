export const DB_COLLECTIONS = {
  CATEGORIES: 'categories',
  COLLECTIONS: 'collections',
  DESIGNS: 'designs',
  PIECES: 'pieces',
} as const

export type DbCollectionName = (typeof DB_COLLECTIONS)[keyof typeof DB_COLLECTIONS]
