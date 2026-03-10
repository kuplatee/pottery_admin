// @ts-nocheck
import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllDesignsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllDesignsQuery = { __typename?: 'Query', designs: Array<{ __typename?: 'Design', id: string, categoryIds: Array<string>, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string }, details: { __typename?: 'LocalizedJSON', en: any, fi: any } }> };

export type CreateDesignMutationVariables = Types.Exact<{
  input: Types.CreateDesignInput;
}>;


export type CreateDesignMutation = { __typename?: 'Mutation', createDesign: { __typename?: 'Design', id: string, categoryIds: Array<string>, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string }, details: { __typename?: 'LocalizedJSON', en: any, fi: any } } };

export type UpdateDesignMutationVariables = Types.Exact<{
  input: Types.UpdateDesignInput;
}>;


export type UpdateDesignMutation = { __typename?: 'Mutation', updateDesign: { __typename?: 'Design', id: string, categoryIds: Array<string>, names: { __typename?: 'LocalizedString', en: string, fi: string }, description: { __typename?: 'LocalizedString', en: string, fi: string }, details: { __typename?: 'LocalizedJSON', en: any, fi: any } } };

export type DeleteDesignMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteDesignMutation = { __typename?: 'Mutation', deleteDesign: string };


export const GetAllDesignsDocument = gql`
    query GetAllDesigns {
  designs {
    id
    names {
      en
      fi
    }
    categoryIds
    description {
      en
      fi
    }
    details {
      en
      fi
    }
  }
}
    `;
export type GetAllDesignsQueryResult = Apollo.QueryResult<GetAllDesignsQuery, GetAllDesignsQueryVariables>;
export const CreateDesignDocument = gql`
    mutation CreateDesign($input: CreateDesignInput!) {
  createDesign(input: $input) {
    id
    names {
      en
      fi
    }
    categoryIds
    description {
      en
      fi
    }
    details {
      en
      fi
    }
  }
}
    `;
export type CreateDesignMutationFn = Apollo.MutationFunction<CreateDesignMutation, CreateDesignMutationVariables>;
export type CreateDesignMutationResult = Apollo.MutationResult<CreateDesignMutation>;
export type CreateDesignMutationOptions = Apollo.BaseMutationOptions<CreateDesignMutation, CreateDesignMutationVariables>;
export const UpdateDesignDocument = gql`
    mutation UpdateDesign($input: UpdateDesignInput!) {
  updateDesign(input: $input) {
    id
    names {
      en
      fi
    }
    categoryIds
    description {
      en
      fi
    }
    details {
      en
      fi
    }
  }
}
    `;
export type UpdateDesignMutationFn = Apollo.MutationFunction<UpdateDesignMutation, UpdateDesignMutationVariables>;
export type UpdateDesignMutationResult = Apollo.MutationResult<UpdateDesignMutation>;
export type UpdateDesignMutationOptions = Apollo.BaseMutationOptions<UpdateDesignMutation, UpdateDesignMutationVariables>;
export const DeleteDesignDocument = gql`
    mutation DeleteDesign($id: String!) {
  deleteDesign(id: $id)
}
    `;
export type DeleteDesignMutationFn = Apollo.MutationFunction<DeleteDesignMutation, DeleteDesignMutationVariables>;
export type DeleteDesignMutationResult = Apollo.MutationResult<DeleteDesignMutation>;
export type DeleteDesignMutationOptions = Apollo.BaseMutationOptions<DeleteDesignMutation, DeleteDesignMutationVariables>;