import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const URI = process.env.NEXT_PUBLIC_API_URI_LOCAL ?? '/api/graphql'

export function makeGraphQLClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: URI }),
    cache: new InMemoryCache(),
  })
}
