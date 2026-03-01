# TSIRBUNEN POTTERY ADMIN

An internal desktop web application for managing pottery inventory data stored in Firebase Firestore and images stored in Cloudinary.

## Development

You need two terminals running simultaneously:

**Terminal 1 — Firebase Emulator**

```bash
# (once Firebase emulator is configured)
firebase emulators:start
```

**Terminal 2 — Next.js Dev Server**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

No running server or emulator is needed to run tests. GraphQL API tests use graphql-yoga's built-in `fetch()` method to send requests directly to the yoga instance in memory, so the full GraphQL execution stack (schema → resolver → result) is exercised without starting any process.

Run all tests once:

```bash
bun test
```

Run tests in watch mode (re-runs on file changes):

```bash
bun run test:watch
```

## Build

```bash
bun run build
bun start
```

## Lint

```bash
bun run lint
```

## Code Generation

Regenerate GraphQL types and resolvers after schema changes:

```bash
bun run codegen
```
