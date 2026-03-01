import { createYoga } from 'graphql-yoga'
import { createSchema } from './graphql-server/create-schema'
import { getDb } from './graphql-server/services/database-utils/firestore'

const { handleRequest } = createYoga({
  schema: createSchema(),
  context: () => ({ db: getDb() }),
  graphqlEndpoint: '/api/graphql',
})

export { handleRequest as GET, handleRequest as POST }
