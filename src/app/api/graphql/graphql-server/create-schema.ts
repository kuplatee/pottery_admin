import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLJSON } from 'graphql-scalars'
import { typeDefs } from './modules/generated-types-and-defs/typeDefs.generated'
import { resolvers } from './modules/generated-types-and-defs/resolvers.generated'

export function createSchema() {
  return makeExecutableSchema({
    typeDefs,
    resolvers: { ...resolvers, JSON: GraphQLJSON },
  })
}
