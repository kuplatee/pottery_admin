import { vi } from 'vitest'
import type { QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore'

type MockDoc = Pick<QueryDocumentSnapshot<DocumentData>, 'id'> & {
  data: () => DocumentData
}

export function makeMockDb(docs: MockDoc[] = []) {
  return {
    collection: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ docs }),
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: docs.length > 0, ...docs[0] }),
      }),
    }),
  }
}
