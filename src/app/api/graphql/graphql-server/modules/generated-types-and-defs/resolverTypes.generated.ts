import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  details: LocalizedJSONInput;
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
  details: LocalizedJSON;
  id: Scalars['String']['output'];
  names: LocalizedString;
};

export type LocalizedJSON = {
  __typename?: 'LocalizedJSON';
  en: Scalars['JSON']['output'];
  fi: Scalars['JSON']['output'];
};

export type LocalizedJSONInput = {
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


export type MutationcreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationcreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationcreateDesignArgs = {
  input: CreateDesignInput;
};


export type MutationcreatePieceArgs = {
  input: CreatePieceInput;
};


export type MutationdeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationdeleteCollectionArgs = {
  id: Scalars['String']['input'];
};


export type MutationdeleteDesignArgs = {
  id: Scalars['String']['input'];
};


export type MutationdeletePieceArgs = {
  id: Scalars['String']['input'];
};


export type MutationupdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationupdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationupdateDesignArgs = {
  input: UpdateDesignInput;
};


export type MutationupdatePieceArgs = {
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


export type QuerycategoryArgs = {
  id: Scalars['String']['input'];
};


export type QuerycollectionArgs = {
  id: Scalars['String']['input'];
};


export type QuerydesignArgs = {
  id: Scalars['String']['input'];
};


export type QuerypieceArgs = {
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
  details: LocalizedJSONInput;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Category: ResolverTypeWrapper<Category>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Collection: ResolverTypeWrapper<Collection>;
  CreateCategoryInput: CreateCategoryInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateDesignInput: CreateDesignInput;
  CreatePieceInput: CreatePieceInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Design: ResolverTypeWrapper<Design>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LocalizedJSON: ResolverTypeWrapper<LocalizedJSON>;
  LocalizedJSONInput: LocalizedJSONInput;
  LocalizedString: ResolverTypeWrapper<LocalizedString>;
  LocalizedStringInput: LocalizedStringInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Piece: ResolverTypeWrapper<Piece>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateDesignInput: UpdateDesignInput;
  UpdatePieceInput: UpdatePieceInput;
  UploadSignature: ResolverTypeWrapper<UploadSignature>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Category: Category;
  String: Scalars['String']['output'];
  Collection: Collection;
  CreateCategoryInput: CreateCategoryInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateDesignInput: CreateDesignInput;
  CreatePieceInput: CreatePieceInput;
  Boolean: Scalars['Boolean']['output'];
  Design: Design;
  JSON: Scalars['JSON']['output'];
  LocalizedJSON: LocalizedJSON;
  LocalizedJSONInput: LocalizedJSONInput;
  LocalizedString: LocalizedString;
  LocalizedStringInput: LocalizedStringInput;
  Mutation: Record<PropertyKey, never>;
  Piece: Piece;
  Query: Record<PropertyKey, never>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateCollectionInput: UpdateCollectionInput;
  UpdateDesignInput: UpdateDesignInput;
  UpdatePieceInput: UpdatePieceInput;
  UploadSignature: UploadSignature;
  Int: Scalars['Int']['output'];
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['LocalizedString'], ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  description?: Resolver<ResolversTypes['LocalizedString'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['LocalizedString'], ParentType, ContextType>;
};

export type DesignResolvers<ContextType = any, ParentType extends ResolversParentTypes['Design'] = ResolversParentTypes['Design']> = {
  categoryIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['LocalizedString'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['LocalizedJSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  names?: Resolver<ResolversTypes['LocalizedString'], ParentType, ContextType>;
};

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocalizedJSONResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocalizedJSON'] = ResolversParentTypes['LocalizedJSON']> = {
  en?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  fi?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
};

export type LocalizedStringResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocalizedString'] = ResolversParentTypes['LocalizedString']> = {
  en?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fi?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationcreateCategoryArgs, 'input'>>;
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationcreateCollectionArgs, 'input'>>;
  createDesign?: Resolver<ResolversTypes['Design'], ParentType, ContextType, RequireFields<MutationcreateDesignArgs, 'input'>>;
  createPiece?: Resolver<ResolversTypes['Piece'], ParentType, ContextType, RequireFields<MutationcreatePieceArgs, 'input'>>;
  deleteCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationdeleteCategoryArgs, 'id'>>;
  deleteCollection?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationdeleteCollectionArgs, 'id'>>;
  deleteDesign?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationdeleteDesignArgs, 'id'>>;
  deletePiece?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationdeletePieceArgs, 'id'>>;
  getUploadSignature?: Resolver<ResolversTypes['UploadSignature'], ParentType, ContextType>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationupdateCategoryArgs, 'input'>>;
  updateCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationupdateCollectionArgs, 'input'>>;
  updateDesign?: Resolver<ResolversTypes['Design'], ParentType, ContextType, RequireFields<MutationupdateDesignArgs, 'input'>>;
  updatePiece?: Resolver<ResolversTypes['Piece'], ParentType, ContextType, RequireFields<MutationupdatePieceArgs, 'input'>>;
};

export type PieceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Piece'] = ResolversParentTypes['Piece']> = {
  collectionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  designId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageFileNames?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  sold?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QuerycategoryArgs, 'id'>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionArgs, 'id'>>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  design?: Resolver<Maybe<ResolversTypes['Design']>, ParentType, ContextType, RequireFields<QuerydesignArgs, 'id'>>;
  designs?: Resolver<Array<ResolversTypes['Design']>, ParentType, ContextType>;
  piece?: Resolver<Maybe<ResolversTypes['Piece']>, ParentType, ContextType, RequireFields<QuerypieceArgs, 'id'>>;
  pieces?: Resolver<Array<ResolversTypes['Piece']>, ParentType, ContextType>;
  ping?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UploadSignatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadSignature'] = ResolversParentTypes['UploadSignature']> = {
  apiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cloudName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  folder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Design?: DesignResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LocalizedJSON?: LocalizedJSONResolvers<ContextType>;
  LocalizedString?: LocalizedStringResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Piece?: PieceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UploadSignature?: UploadSignatureResolvers<ContextType>;
};

