# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

We are building the app described in @SPEC.md and you should read that file for general architectural tasks or to check database structure, tech stack or application architecture (so not every time you do something).

## Security

**NEVER** read or write `.env` files. Do not access, display, or modify any `.env*` file contents.

## Communication Style

Keep answers extremely concise. Focus on key information only — no unnecessary fluff.

## Tech Stack

- **Next.js** (App Router) — framework
- **Bun** — runtime and package manager
- **TypeScript** — strict typing throughout
- **React 19** — UI
- **TailwindCSS** — styling
- **GraphQL** (Yoga server + Apollo Client) — API layer

## Commands

Use **Bun** as the package manager and runtime.

```bash
bun dev        # Start dev server
bun build      # Production build
bun start      # Start production server
bun lint       # Run ESLint
```
