import { createYoga } from 'graphql-yoga'
import { createSchema } from '../../graphql/graphql-server/create-schema'

export function createTestServer() {
  return createYoga({
    schema: createSchema(),
    graphqlEndpoint: '/graphql'
  })
}

export async function gql(
  yoga: ReturnType<typeof createTestServer>,
  query: string
) {
  const response = await yoga.fetch('http://test/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })

  return response.json()
}
