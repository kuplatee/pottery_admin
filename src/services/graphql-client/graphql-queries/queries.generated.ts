// @ts-nocheck
import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, names: { __typename?: 'LocalizedString', en: string, fi: string } }> };


export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  categories {
    id
    names {
      en
      fi
    }
  }
}
    `;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;