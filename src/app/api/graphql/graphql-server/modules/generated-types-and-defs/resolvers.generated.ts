/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './resolverTypes.generated';
    import    { categories as Query_categories } from './../category/resolvers/Query/categories';
import    { category as Query_category } from './../category/resolvers/Query/category';
import    { ping as Query_ping } from './../query/resolvers/Query/ping';
import    { createCategory as Mutation_createCategory } from './../category/resolvers/Mutation/createCategory';
import    { deleteCategory as Mutation_deleteCategory } from './../category/resolvers/Mutation/deleteCategory';
import    { updateCategory as Mutation_updateCategory } from './../category/resolvers/Mutation/updateCategory';
import    { Category } from './../category/resolvers/Category';
import    { LocalizedString } from './../scalars/resolvers/LocalizedString';
import    { JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { categories: Query_categories,category: Query_category,ping: Query_ping },
      Mutation: { createCategory: Mutation_createCategory,deleteCategory: Mutation_deleteCategory,updateCategory: Mutation_updateCategory },
      
      Category: Category,
LocalizedString: LocalizedString,
JSON: JSONResolver
    }