import { createYoga } from 'graphql-yoga'
import { createSchema } from './graphql-server/create-schema'

const { handleRequest } = createYoga({
  schema: createSchema(),
  graphqlEndpoint: '/api/graphql',
})

export { handleRequest as GET, handleRequest as POST }
