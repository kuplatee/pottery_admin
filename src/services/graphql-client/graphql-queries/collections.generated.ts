// @ts-nocheck
import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllCollectionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string } }> };

export type CreateCollectionMutationVariables = Types.Exact<{
  input: Types.CreateCollectionInput;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: string, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string } } };

export type UpdateCollectionMutationVariables = Types.Exact<{
  input: Types.UpdateCollectionInput;
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'Collection', id: string, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string } } };

export type DeleteCollectionMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: string };


export const GetAllCollectionsDocument = gql`
    query GetAllCollections {
  collections {
    id
    names {
      en
      fi
    }
    description {
      en
      fi
    }
  }
}
    `;
export type GetAllCollectionsQueryResult = Apollo.QueryResult<GetAllCollectionsQuery, GetAllCollectionsQueryVariables>;
export const CreateCollectionDocument = gql`
    mutation CreateCollection($input: CreateCollectionInput!) {
  createCollection(input: $input) {
    id
    names {
      en
      fi
    }
    description {
      en
      fi
    }
  }
}
    `;
export type CreateCollectionMutationFn = Apollo.MutationFunction<CreateCollectionMutation, CreateCollectionMutationVariables>;
export type CreateCollectionMutationResult = Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const UpdateCollectionDocument = gql`
    mutation UpdateCollection($input: UpdateCollectionInput!) {
  updateCollection(input: $input) {
    id
    names {
      en
      fi
    }
    description {
      en
      fi
    }
  }
}
    `;
export type UpdateCollectionMutationFn = Apollo.MutationFunction<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export type UpdateCollectionMutationResult = Apollo.MutationResult<UpdateCollectionMutation>;
export type UpdateCollectionMutationOptions = Apollo.BaseMutationOptions<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export const DeleteCollectionDocument = gql`
    mutation DeleteCollection($id: String!) {
  deleteCollection(id: $id)
}
    `;
export type DeleteCollectionMutationFn = Apollo.MutationFunction<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export type DeleteCollectionMutationResult = Apollo.MutationResult<DeleteCollectionMutation>;
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>;