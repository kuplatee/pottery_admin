/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './resolverTypes.generated';
    import    { categories as Query_categories } from './../category/resolvers/Query/categories';
import    { category as Query_category } from './../category/resolvers/Query/category';
import    { collection as Query_collection } from './../collections/resolvers/Query/collection';
import    { collections as Query_collections } from './../collections/resolvers/Query/collections';
import    { design as Query_design } from './../designs/resolvers/Query/design';
import    { designs as Query_designs } from './../designs/resolvers/Query/designs';
import    { piece as Query_piece } from './../pieces/resolvers/Query/piece';
import    { pieces as Query_pieces } from './../pieces/resolvers/Query/pieces';
import    { ping as Query_ping } from './../query/resolvers/Query/ping';
import    { createCategory as Mutation_createCategory } from './../category/resolvers/Mutation/createCategory';
import    { createCollection as Mutation_createCollection } from './../collections/resolvers/Mutation/createCollection';
import    { createDesign as Mutation_createDesign } from './../designs/resolvers/Mutation/createDesign';
import    { createPiece as Mutation_createPiece } from './../pieces/resolvers/Mutation/createPiece';
import    { deleteCategory as Mutation_deleteCategory } from './../category/resolvers/Mutation/deleteCategory';
import    { deleteCollection as Mutation_deleteCollection } from './../collections/resolvers/Mutation/deleteCollection';
import    { deleteDesign as Mutation_deleteDesign } from './../designs/resolvers/Mutation/deleteDesign';
import    { deletePiece as Mutation_deletePiece } from './../pieces/resolvers/Mutation/deletePiece';
import    { updateCategory as Mutation_updateCategory } from './../category/resolvers/Mutation/updateCategory';
import    { updateCollection as Mutation_updateCollection } from './../collections/resolvers/Mutation/updateCollection';
import    { updateDesign as Mutation_updateDesign } from './../designs/resolvers/Mutation/updateDesign';
import    { updatePiece as Mutation_updatePiece } from './../pieces/resolvers/Mutation/updatePiece';
import    { Category } from './../category/resolvers/Category';
import    { Collection } from './../collections/resolvers/Collection';
import    { Design } from './../designs/resolvers/Design';
import    { LocalizedJSON } from './../scalars/resolvers/LocalizedJSON';
import    { LocalizedString } from './../scalars/resolvers/LocalizedString';
import    { Piece } from './../pieces/resolvers/Piece';
import    { JSONScalar } from './../scalars/resolvers/JSON';
    export const resolvers: Resolvers = {
      Query: { categories: Query_categories,category: Query_category,collection: Query_collection,collections: Query_collections,design: Query_design,designs: Query_designs,piece: Query_piece,pieces: Query_pieces,ping: Query_ping },
      Mutation: { createCategory: Mutation_createCategory,createCollection: Mutation_createCollection,createDesign: Mutation_createDesign,createPiece: Mutation_createPiece,deleteCategory: Mutation_deleteCategory,deleteCollection: Mutation_deleteCollection,deleteDesign: Mutation_deleteDesign,deletePiece: Mutation_deletePiece,updateCategory: Mutation_updateCategory,updateCollection: Mutation_updateCollection,updateDesign: Mutation_updateDesign,updatePiece: Mutation_updatePiece },
      
      Category: Category,
Collection: Collection,
Design: Design,
LocalizedJSON: LocalizedJSON,
LocalizedString: LocalizedString,
Piece: Piece,
JSON: JSONScalar
    }