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

export type CreateCategoryInput = {
  names: LocalizedStringInput;
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
  deleteCategory: Scalars['String']['output'];
  updateCategory: Category;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  ping?: Maybe<Scalars['String']['output']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  id: Scalars['String']['input'];
  names: LocalizedStringInput;
};
