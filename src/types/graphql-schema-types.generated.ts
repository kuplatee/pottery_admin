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

export type CreateDesignInput = {
  categoryIds: Array<Scalars['String']['input']>;
  description: LocalizedStringInput;
  details: LocalizedJsonInput;
  names: LocalizedStringInput;
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
  createDesign: Design;
  deleteCategory: Scalars['String']['output'];
  deleteDesign: Scalars['String']['output'];
  updateCategory: Category;
  updateDesign: Design;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateDesignArgs = {
  input: CreateDesignInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDesignArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateDesignArgs = {
  input: UpdateDesignInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  design?: Maybe<Design>;
  designs: Array<Design>;
  ping?: Maybe<Scalars['String']['output']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryDesignArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
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
