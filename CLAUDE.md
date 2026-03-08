# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

We are building the app described in @SPEC.md and you should read that file only when specifically asked.

This app is small and local-only today, but treat every decision as if it will scale into a large, complex, production-grade system. Apply proper architecture, clean boundaries, and no shortcuts — even when a simpler approach would work for the current scope.

To save on tokens:
ALWAYS READ ONLY FILES NEEDED!
Always avoid scanning the whole repo unless necessary!

## Engineering expectations

Prefer solutions that reflect strong senior-engineering judgment, not just the fastest local fix.
Optimize for excellent production code and for teaching the user to think like a senior engineer.

Use the `senior-engineering-coach` skill and log that you use it.

## Git Commits

Always use the `git-committer` skill — never commit directly via Bash.
Do not suggest to commit on your own. I will ask you to commit when needed.

## Security

**NEVER** read or write `.env` files. Do not access, display, or modify any `.env*` file contents.

## Code Style

Always use curly braces for `if`/`else` blocks — never the braceless single-line form (e.g., use `if (x) { throw ... }` not `if (x) throw ...`)

## Communication Style

Keep answers extremely concise. Focus on key information only — no unnecessary fluff.

## Tech Stack

- **Next.js** (App Router) — framework
- **Bun** — runtime and package manager
- **TypeScript** — strict typing throughout
- **React 19** — UI
- **TailwindCSS** — styling
- **GraphQL** (Yoga server + Apollo Client) — API layer
- **Firebase Admin SDK** — Firestore data persistence
- **Vitest** — unit and service testing

## Commands

Use **Bun** as the package manager and runtime.

```bash
bun dev        # Start dev server
bun build      # Production build
bun start      # Start production server
bun lint       # Run ESLint
```
