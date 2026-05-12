# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start:dev      # run in watch mode
npm run build          # compile TypeScript via NestJS CLI
npm run lint           # ESLint with auto-fix
npm run test           # unit tests (Jest, rootDir: src, *.spec.ts)
npm run test:e2e       # e2e tests (test/jest-e2e.json config)
npm run test:cov       # coverage report
```

Run a single test file:
```bash
npx jest src/path/to/file.spec.ts
```

Prisma commands (use `prisma.config.ts` for all CLI ops):
```bash
npx prisma migrate dev    # apply migrations and regenerate client
npx prisma generate       # regenerate client only
```

## Architecture

This is a **NestJS + TypeScript** REST API — a Google Drive-like cloud storage service (study project). See `technical-spec.md` for the full feature roadmap.

### Database / Prisma

- Schema: `prisma/schema.prisma`; migrations: `prisma/migrations/`
- The Prisma client is generated into **`src/generated/prisma/`** (not the default location). Always import from there.
- The driver adapter `@prisma/adapter-pg` (`PrismaPg`) is used instead of the built-in connector — `PrismaService` instantiates it directly with `DATABASE_URL`.
- `PrismaModule` (at `src/prisma/`) wraps `PrismaService` and must be imported into any feature module that needs DB access.

### Code style

Follow the style conventions adopted in NestJS.

### Planned modules (from spec, not yet implemented)

| Module | Responsibility |
|--------|---------------|
| Auth | JWT access + refresh tokens, Passport strategy |
| Users | Registration, login, 100 MB disk quota enforcement |
| Files | Upload (Multer/DiskStorage, UUID filenames), list, download, delete |
| Preview | Sharp-generated 200×200 thumbnails for `image/*` uploads |

### Key constraints from the spec

- Before saving a file: `user.usedSpace + file.size ≤ 100 MB`
- On file delete: remove both the DB record and the physical file from disk
- All file endpoints must be protected by JWT guard
- Local `uploads/` folder for storage initially (S3-compatible later)


## PR Reviews
  - When revieving PRs, carefully check if any unintended `console.log` calls were left. If found, report severely. If not, add to the PR that no console.log were found.
