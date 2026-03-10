// @ts-nocheck
import * as Types from '../../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllPiecesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllPiecesQuery = { __typename?: 'Query', pieces: Array<{ __typename?: 'Piece', id: string, designId: string, imageFileNames: Array<string>, sold: boolean, collectionId?: string | null }> };

export type CreatePieceMutationVariables = Types.Exact<{
  input: Types.CreatePieceInput;
}>;


export type CreatePieceMutation = { __typename?: 'Mutation', createPiece: { __typename?: 'Piece', id: string, designId: string, imageFileNames: Array<string>, sold: boolean, collectionId?: string | null } };

export type UpdatePieceMutationVariables = Types.Exact<{
  input: Types.UpdatePieceInput;
}>;


export type UpdatePieceMutation = { __typename?: 'Mutation', updatePiece: { __typename?: 'Piece', id: string, designId: string, imageFileNames: Array<string>, sold: boolean, collectionId?: string | null } };

export type DeletePieceMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeletePieceMutation = { __typename?: 'Mutation', deletePiece: string };


export const GetAllPiecesDocument = gql`
    query GetAllPieces {
  pieces {
    id
    designId
    imageFileNames
    sold
    collectionId
  }
}
    `;
export type GetAllPiecesQueryResult = Apollo.QueryResult<GetAllPiecesQuery, GetAllPiecesQueryVariables>;
export const CreatePieceDocument = gql`
    mutation CreatePiece($input: CreatePieceInput!) {
  createPiece(input: $input) {
    id
    designId
    imageFileNames
    sold
    collectionId
  }
}
    `;
export type CreatePieceMutationFn = Apollo.MutationFunction<CreatePieceMutation, CreatePieceMutationVariables>;
export type CreatePieceMutationResult = Apollo.MutationResult<CreatePieceMutation>;
export type CreatePieceMutationOptions = Apollo.BaseMutationOptions<CreatePieceMutation, CreatePieceMutationVariables>;
export const UpdatePieceDocument = gql`
    mutation UpdatePiece($input: UpdatePieceInput!) {
  updatePiece(input: $input) {
    id
    designId
    imageFileNames
    sold
    collectionId
  }
}
    `;
export type UpdatePieceMutationFn = Apollo.MutationFunction<UpdatePieceMutation, UpdatePieceMutationVariables>;
export type UpdatePieceMutationResult = Apollo.MutationResult<UpdatePieceMutation>;
export type UpdatePieceMutationOptions = Apollo.BaseMutationOptions<UpdatePieceMutation, UpdatePieceMutationVariables>;
export const DeletePieceDocument = gql`
    mutation DeletePiece($id: String!) {
  deletePiece(id: $id)
}
    `;
export type DeletePieceMutationFn = Apollo.MutationFunction<DeletePieceMutation, DeletePieceMutationVariables>;
export type DeletePieceMutationResult = Apollo.MutationResult<DeletePieceMutation>;
export type DeletePieceMutationOptions = Apollo.BaseMutationOptions<DeletePieceMutation, DeletePieceMutationVariables>;