# Waiting - Backlog

Here's what I found — ranked by importance:

2. Cloudinary config runs at module load with no validation  
   cloudinaryService.ts calls cloudinary.config() at the top level with process.env.\* values (possibly  
   undefined), then uses ! non-null assertions in generateUploadSignature. No missing-var check like  
   Firestore has.

3. No error handling in client-side action hooks  
   All useXxxActions hooks (useCategoryActions, usePieceActions, etc.) have no try/catch. If a mutation
   throws (network error, GraphQL error), it propagates uncaught — no error state, no user feedback.  
   Silent failures.

4. Service layer hardcodes language keys  
   categoriesService.ts explicitly copies { en: input.names.en, fi: input.names.fi } instead of  
   spreading input.names. Repeated in create and update. Adding a language requires touching every
   service.

5. No single-entity GraphQL queries  
   SPEC explicitly says "Provide both list queries and single-item queries." Only list queries exist.  
   The getCategory(db, id) service function has no GraphQL resolver wiring it up.

6. deleteImages in Cloudinary service swallows errors  
   Errors are caught and console.error'd — callers never know deletion failed. On a production system,
   orphaned images are a real operational problem.

7. Tests mock Firestore  
   The makeMockDb is a hand-rolled mock. It doesn't enforce real Firestore constraints (e.g., it returns
   whatever you configure, not what a real query returns). These tests pass for the wrong reasons and  
   won't catch real query/structure bugs.

8. getUploadSignature is defined as a Mutation  
   Semantically it's a Query — no side effects, just signs parameters. Mutations imply writes. This  
   violates GraphQL conventions and will confuse future maintainers.
