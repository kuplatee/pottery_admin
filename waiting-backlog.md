# Waiting - Backlog

Here's what I found — ranked by importance:

2. Cloudinary config runs at module load with no validation  
   cloudinaryService.ts calls cloudinary.config() at the top level with process.env.\* values (possibly  
   undefined), then uses ! non-null assertions in generateUploadSignature. No missing-var check like  
   Firestore has.

3. deleteImages in Cloudinary service swallows errors  
   Errors are caught and console.error'd — callers never know deletion failed. On a production system,
   orphaned images are a real operational problem.

4. Tests mock Firestore  
   The makeMockDb is a hand-rolled mock. It doesn't enforce real Firestore constraints (e.g., it returns
   whatever you configure, not what a real query returns). These tests pass for the wrong reasons and  
   won't catch real query/structure bugs.

5. getUploadSignature is defined as a Mutation  
   Semantically it's a Query — no side effects, just signs parameters. Mutations imply writes. This  
   violates GraphQL conventions and will confuse future maintainers.

Start finding BIGGER problems in the code and its structure that we should fix. we  
 want really good quality clean very senior-like code. start giving suggestions on  
 what to do and then also lets implement
