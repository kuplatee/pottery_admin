import { createYoga } from 'graphql-yoga'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLJSON } from 'graphql-scalars'
import { typeDefs } from './graphql-server/modules/generated-types-and-defs/typeDefs.generated'
import { resolvers } from './graphql-server/modules/generated-types-and-defs/resolvers.generated'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: { ...resolvers, JSON: GraphQLJSON }
})

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql'
})

export { handleRequest as GET, handleRequest as POST }
