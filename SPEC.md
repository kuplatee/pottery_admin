# TECHNICAL SPECIFICATION DOCUMENT

## 1. SYSTEM OVERVIEW

**Tsirbunen Pottery Admin** is an internal desktop web application for managing pottery inventory data stored in **Firebase Firestore** and images stored in **Cloudinary**.

The system enables:

- Creating, editing and deleting Categories, Collections, Designs, and Pieces
- Managing multilingual content (start with `en`, `fi`)
- Uploading and linking images to pieces
- Structuring data consumed by a separate Flutter mobile app

The Flutter app is the (currently read-only) consumer of this data.
The Admin app is the authoritative system for managing and shaping that data.

This application is:

- Single-user (no authentication initially)
- Local-development and local-use focused
- Not publicly exposed
- Not handling payments or stock reservations yet

The architecture must remain clean and extensible so authentication and e-commerce features can be introduced later without restructuring the core domain.

## 2. ARCHITECTURE

### High-Level Flow

```
UI (Next.js + Apollo)
  → GraphQL API (Yoga)
  → Domain Resolvers
  → Service Layer
  → Firestore / Cloudinary
```

### Layered Responsibility Model

| Layer      | Responsibility                                                |
| ---------- | ------------------------------------------------------------- |
| UI         | Forms, list views, editing flows, GraphQL queries/mutations   |
| GraphQL    | Schema definition and strict API contract                     |
| Resolvers  | Input validation, orchestration, error shaping                |
| Services   | Business logic, Firestore interaction, Cloudinary integration |
| Firestore  | Canonical data storage                                        |
| Cloudinary | Image storage and CDN delivery                                |

### Architectural Principles

- GraphQL is the only UI → backend communication channel
- No Firestore calls from the UI layer
- No business logic inside resolvers
- Services encapsulate all persistence logic
- Domain modules are isolated and cohesive
- Types are generated, not duplicated

## 3. TECH STACK

## Core

- Next.js (App Router)
- Bun (runtime + package manager)
- TypeScript
- React 19

## Styling

- TailwindCSS
- Geist (fonts / base styling)

## API Layer

- GraphQL Yoga (`/api/graphql`)
- Schema-first modular GraphQL
- GraphQL Scalars
- GraphQL Code Generator
  - `@eddeee888/gcg-typescript-resolver-files`
  - `near-operation-file` preset

## Client

- Apollo Client (primary)
- graphql-request (optional lightweight use)

## Data

- Firebase Admin SDK (Firestore)
- Cloudinary

## Validation

- AJV
- ajv-formats
- ajv-errors

## Testing

- Vitest (unit)
- Jest (API)
- Testing Library

## Tooling

- Biome (lint/format)
- dotenv

## 4. DOMAIN MODEL OVERVIEW

The system models four primary domain entities:

1. **Category**
2. **Collection**
3. **Design**
4. **Piece**

These entities reflect both creative structure and inventory structure.

### Conceptual Hierarchy

- A **Category** groups similar designs (e.g. "Cups & mugs")
- A **Collection** groups pieces aesthetically (e.g. "Cafe latte")
- A **Design** defines the artistic pattern or structure
- A **Piece** represents a physical individual product

A Design can belong to multiple Categories.
A Piece references exactly one Design.
A Piece may optionally belong to a Collection.

## 5. FIRESTORE DATA STRUCTURE

## Collections

- `categories/`
- `collections/`
- `designs/`
- `pieces/`

## Category

```ts
{
  id: string
  names: {
    en: string
    fi: string
  }
}
```

**Constraints:**

- Names required in both languages
- No empty strings

## Collection

```ts
{
  id: string
  names: {
    en: string
    fi: string
  }
  description: {
    en: string
    fi: string
  }
}
```

**Constraints:**

- Names required in both languages
- Description required in both languages

## Design

```ts
{
  id: string
  names: {
    en: string
    fi: string
  }
  categoryIds: string[]
  description: {
    en: string
    fi: string
  }
  details: {
    en: Record<string, string>
    fi: Record<string, string>
  }
}
```

**Constraints:**

- Must reference valid `categoryIds`
- Details keys may vary but must be consistent per language
- All languages must be present

## Piece

```ts
{
  id: string
  designId: string
  imageFileNames: string[]
  sold: boolean
  collectionId?: string
}
```

**Constraints:**

- `designId` must reference an existing Design
- `collectionId`, if provided, must reference an existing Collection
- `imageFileNames` cannot be empty
- `sold` defaults to `false`

## 6. GRAPHQL SCHEMA DESIGN

The GraphQL schema is modular and domain-driven.

### Module Structure

```
modules/category/
modules/collection/
modules/design/
modules/piece/
```

Each module contains:

- `schema.graphql`
- Resolvers
- Validation logic
- Service calls

### Schema Guidelines

- Explicit `CreateXInput` and `UpdateXInput` types per domain entity
- Avoid nullable fields unless truly optional
- Return domain objects, not Firestore snapshots
- Provide both list queries and single-item queries
- Mutations return the updated entity

GraphQL is the API contract layer. The Flutter app indirectly depends on the integrity of this structure.

## 7. RESOLVER LAYER DESIGN

Resolvers act as controlled entry points into the domain.

### Responsibilities

- Validate inputs using AJV
- Call the appropriate service
- Catch and format errors
- Return the domain entity

### Resolvers Must NOT

- Access Firestore directly
- Perform business logic
- Transform data across domains

Error handling must standardize GraphQL error extensions for consistent client-side handling.

## 8. SERVICE LAYER DESIGN

Services are domain-centric and persistence-aware.

### Structure

```
services/categories/
services/collections/
services/designs/
services/pieces/
services/database-utils/
```

### Service Responsibilities

- Firestore CRUD operations
- Referential integrity checks
- ID generation
- Business constraints (e.g., deletion rules)
- Cloudinary integration logic

### Referential Integrity Rules

- Cannot delete a Category if it is referenced by a Design
- Cannot delete a Design if Pieces reference it
- Cannot delete a Collection if Pieces reference it

These rules live in services, not resolvers.
