/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './resolverTypes.generated';
    import    { categories as Query_categories } from './../category/resolvers/Query/categories';
import    { category as Query_category } from './../category/resolvers/Query/category';
import    { design as Query_design } from './../designs/resolvers/Query/design';
import    { designs as Query_designs } from './../designs/resolvers/Query/designs';
import    { ping as Query_ping } from './../query/resolvers/Query/ping';
import    { createCategory as Mutation_createCategory } from './../category/resolvers/Mutation/createCategory';
import    { createDesign as Mutation_createDesign } from './../designs/resolvers/Mutation/createDesign';
import    { deleteCategory as Mutation_deleteCategory } from './../category/resolvers/Mutation/deleteCategory';
import    { deleteDesign as Mutation_deleteDesign } from './../designs/resolvers/Mutation/deleteDesign';
import    { updateCategory as Mutation_updateCategory } from './../category/resolvers/Mutation/updateCategory';
import    { updateDesign as Mutation_updateDesign } from './../designs/resolvers/Mutation/updateDesign';
import    { Category } from './../category/resolvers/Category';
import    { Design } from './../designs/resolvers/Design';
import    { LocalizedJSON } from './../scalars/resolvers/LocalizedJSON';
import    { LocalizedString } from './../scalars/resolvers/LocalizedString';
import    { JSONScalar } from './../scalars/resolvers/JSON';
    export const resolvers: Resolvers = {
      Query: { categories: Query_categories,category: Query_category,design: Query_design,designs: Query_designs,ping: Query_ping },
      Mutation: { createCategory: Mutation_createCategory,createDesign: Mutation_createDesign,deleteCategory: Mutation_deleteCategory,deleteDesign: Mutation_deleteDesign,updateCategory: Mutation_updateCategory,updateDesign: Mutation_updateDesign },
      
      Category: Category,
Design: Design,
LocalizedJSON: LocalizedJSON,
LocalizedString: LocalizedString,
JSON: JSONScalar
    }