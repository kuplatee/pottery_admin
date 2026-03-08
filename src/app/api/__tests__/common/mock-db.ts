import { vi } from 'vitest'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore'

type MockDoc = Pick<QueryDocumentSnapshot<DocumentData>, 'id'> & {
  data: () => DocumentData
}

interface MockDbOptions {
  hasReferencingDocs?: boolean
}

export function makeMockDb(docs: MockDoc[] = [], options: MockDbOptions = {}) {
  return {
    collection: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ docs }),
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: docs.length > 0, ...(docs[0] ?? {}) }),
        set: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
        delete: vi.fn().mockResolvedValue(undefined),
        id: 'generated-id',
      }),
      where: vi.fn().mockReturnValue({
        limit: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({ empty: !options.hasReferencingDocs }),
        }),
      }),
    }),
  }
}
