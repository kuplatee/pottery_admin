import { createYoga } from 'graphql-yoga'
import { createSchema } from './graphql-server/create-schema'
import { getDb } from './graphql-server/services/database-utils/firestore'
import { maskError } from './graphql-server/errors/errorHandler'

const { handleRequest } = createYoga({
  schema: createSchema(),
  context: () => ({ db: getDb() }),
  graphqlEndpoint: '/api/graphql',
  maskedErrors: { maskError },
})

export { handleRequest as GET, handleRequest as POST }
