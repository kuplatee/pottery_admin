export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  names: LocalizedString;
};

export type Collection = {
  __typename?: 'Collection';
  description: LocalizedString;
  id: Scalars['String']['output'];
  names: LocalizedString;
};

export type CreateCategoryInput = {
  names: LocalizedStringInput;
};

export type CreateCollectionInput = {
  description: LocalizedStringInput;
  names: LocalizedStringInput;
};

export type CreateDesignInput = {
  categoryIds: Array<Scalars['String']['input']>;
  description: LocalizedStringInput;
  details: LocalizedJsonInput;
  names: LocalizedStringInput;
};

export type CreatePieceInput = {
  collectionId?: InputMaybe<Scalars['String']['input']>;
  designId: Scalars['String']['input'];
  imageFileNames: Array<Scalars['String']['input']>;
  sold: Scalars['Boolean']['input'];
};

export type Design = {
  __typename?: 'Design';
  categoryIds: Array<Scalars['String']['output']>;
  description: LocalizedString;
  details: LocalizedJson;
  id: Scalars['String']['output'];
  names: LocalizedString;
};

export type LocalizedJson = {
  __typename?: 'LocalizedJSON';
  en: Scalars['JSON']['output'];
  fi: Scalars['JSON']['output'];
};

export type LocalizedJsonInput = {
  en: Scalars['JSON']['input'];
  fi: Scalars['JSON']['input'];
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  en: Scalars['String']['output'];
  fi: Scalars['String']['output'];
};

export type LocalizedStringInput = {
  en: Scalars['String']['input'];
  fi: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createCollection: Collection;
  createDesign: Design;
  createPiece: Piece;
  deleteCategory: Scalars['String']['output'];
  deleteCollection: Scalars['String']['output'];
  deleteDesign: Scalars['String']['output'];
  deletePiece: Scalars['String']['output'];
  getUploadSignature: UploadSignature;
  updateCategory: Category;
  updateCollection: Collection;
  updateDesign: Design;
  updatePiece: Piece;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateDesignArgs = {
  input: CreateDesignInput;
};


export type MutationCreatePieceArgs = {
  input: CreatePieceInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDesignArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePieceArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationUpdateDesignArgs = {
  input: UpdateDesignInput;
};


export type MutationUpdatePieceArgs = {
  input: UpdatePieceInput;
};

export type Piece = {
  __typename?: 'Piece';
  collectionId?: Maybe<Scalars['String']['output']>;
  designId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageFileNames: Array<Scalars['String']['output']>;
  sold: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  design?: Maybe<Design>;
  designs: Array<Design>;
  piece?: Maybe<Piece>;
  pieces: Array<Piece>;
  ping?: Maybe<Scalars['String']['output']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryCollectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryDesignArgs = {
  id: Scalars['String']['input'];
};


export type QueryPieceArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  id: Scalars['String']['input'];
  names: LocalizedStringInput;
};

export type UpdateCollectionInput = {
  description: LocalizedStringInput;
  id: Scalars['String']['input'];
  names: LocalizedStringInput;
};

export type UpdateDesignInput = {
  categoryIds: Array<Scalars['String']['input']>;
  description: LocalizedStringInput;
  details: LocalizedJsonInput;
  id: Scalars['String']['input'];
  names: LocalizedStringInput;
};

export type UpdatePieceInput = {
  collectionId?: InputMaybe<Scalars['String']['input']>;
  designId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  imageFileNames: Array<Scalars['String']['input']>;
  sold: Scalars['Boolean']['input'];
};

export type UploadSignature = {
  __typename?: 'UploadSignature';
  apiKey: Scalars['String']['output'];
  cloudName: Scalars['String']['output'];
  folder: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};
