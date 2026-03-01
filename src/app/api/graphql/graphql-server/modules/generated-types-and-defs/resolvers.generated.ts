/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './resolverTypes.generated';
    import    { ping as Query_ping } from './../query/resolvers/Query/ping';
import    { JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { ping: Query_ping },
      
      
      JSON: JSONResolver
    }