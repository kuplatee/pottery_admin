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

---

1. 🔴 Dual state management — Apollo + custom useReducer

This is the biggest issue. The app uses Apollo Client (with InMemoryCache) and a completely
separate useReducer global state. They manage the same data in parallel.

The current flow:
Apollo fetch → manual dispatch → AppStateReducer → component reads state
Apollo mutate → manual dispatch → AppStateReducer → component reads state

Apollo's cache is populated but never read from. The entire src/state/ directory
(AppStateContext, AppStateProvider, appStateReducer, types.ts), DataLoader, and all the dispatch
calls in createEntityActions exist only because Apollo's cache isn't being used as intended.

The correct architecture: useQuery replaces DataLoader + dispatches. Cache updates after
mutations replace manual dispatch. ~5 files disappear.

---

2. 🟡 No error boundaries

A runtime error in any component crashes the whole app silently. A single <ErrorBoundary> in the
root layout catches anything unexpected.

---

3. 🟡 Detail pages depend on global state for their own data

/designs/[id] and /pieces/[id] look up their entity from state.designs. If you hard-navigate to
a URL before DataLoader finishes, you get a "not found" flash. These pages should own their own
data fetch.

---

4. 🟡 SingleDesignView bypasses i18n — direct JSON imports

import enMessages from '../../../messages/en.json' // raw JSON import
const en = { name: enMessages.singleDesign.name }

This exists because the view shows both languages side-by-side — so useTranslations() (which
gives only the current locale) doesn't help. The problem is the brittle path and the raw import.
This needs a different pattern.

---

My priority order: #1 is the most impactful but also the biggest refactor. #2 is a 10-minute
win. #3 and #4 are medium effort.

Want to tackle these in order, or start with an easy win first?
