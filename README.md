# Katel Capital digital operating platform

The existing public React site remains in `frontend`. New authenticated application code is TypeScript and communicates with the NestJS API in `backend-nest` through GraphQL.

## Local start

1. Start Docker Desktop's Linux engine.
2. Run `docker compose up -d` from the repository root.
3. Copy `backend-nest/.env.example` to `backend-nest/.env` and replace the secrets.
4. In `backend-nest`, run `pnpm install`, `pnpm run db:migrate`, `pnpm run db:seed`, and `pnpm run start:dev`.
5. Copy `frontend/.env.example` to `frontend/.env`.
6. In `frontend`, run `pnpm install` and `pnpm run dev`.

GraphQL is at `http://localhost:3000/graphql`; REST documentation is at `http://localhost:3000/api/docs`.

## Production

- Render backend root: `backend-nest` using Docker.
- Backend variables: `DATABASE_URL`, `REDIS_URL`, `JWT_ACCESS_SECRET`, `FRONTEND_ORIGINS`.
- Vercel frontend root: `frontend`.
- Frontend variable: `VITE_GRAPHQL_URL=https://YOUR-API.onrender.com/graphql`.
- Before the first deployment set `NODE_ENV=production`, `SEED_SUPER_ADMIN_EMAIL`, and `SEED_SUPER_ADMIN_PASSWORD` (unique password, at least 12 characters) on Render. Leave `SEED_DEMO_PASSWORD` unset.
- Docker startup automatically applies pending migrations, runs the initial seed once, and starts the API. No Render shell is required. Remove any old custom Docker command override so the image command is used. For a Node-based deployment use `pnpm run start:prod` after building with development dependencies installed.
- A database marker (`deployment.initial-seed.v1` in `SystemSetting`) skips initial seeding on later starts. A database lock serializes setup across instances. Failed migrations or seeds stop startup, and failed seeds do not write the marker.
- Subsequent releases apply only pending migrations. Commit new migration folders; never modify applied migrations or run database reset/db push against production. Future reference-data changes need reviewed data migrations rather than rerunning initial seed.
- Existing Super Admin accounts, passwords, and user statuses are preserved. Seed credentials are first-setup values, not password-reset controls. You may remove them after successful initialization. Never store production passwords in Git.

Access tokens live only in browser memory. Refresh tokens are hashed in PostgreSQL and transported in HttpOnly cookies. Backend services enforce permissions and organization boundaries.
