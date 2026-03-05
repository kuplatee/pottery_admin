import * as Types from '../../../types/graphql-schema-types.generated';

export type GetAllCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, names: { __typename?: 'LocalizedString', en: string, fi: string } }> };
