import { GraphQLScalarType } from 'graphql'

// Pass-through scalar: objects are returned as-is without JSON.stringify
export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Arbitrary JSON value',
  serialize: (value) => value,
  parseValue: (value) =>
    typeof value === 'string' ? (JSON.parse(value) as unknown) : value,
  parseLiteral: () => null,
})
