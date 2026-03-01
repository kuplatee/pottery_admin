import { describe, it, expect } from 'vitest'
import { createTestServer, gql } from '../common/test-server'

describe('ping', () => {
  it('returns pong', async () => {
    const yoga = createTestServer()
    const result = await gql(yoga, '{ ping }')
    expect(result.data.ping).toBe('pong')
  })
})
