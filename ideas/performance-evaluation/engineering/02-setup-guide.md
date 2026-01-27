# Project Setup Guide

*Generated for: Performance Evaluation Tool*

---

## Prerequisites

### Required Software

| Software | Version | Installation |
|----------|---------|--------------|
| Node.js | 20.x LTS | `nvm install 20` |
| pnpm | 8.x+ | `npm install -g pnpm` |
| Git | 2.x+ | System package manager |

### Recommended Tools

| Tool | Purpose |
|------|---------|
| VS Code | IDE with great Vue/TS support |
| TablePlus | Database GUI |
| Postman/Insomnia | API testing |
| ngrok | Local tunnel for webhooks |

### VS Code Extensions

```
- Vue - Official (Vue.vscode-vue)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Drizzle (optional)
```

---

## Project Initialization

### Step 1: Create Project Structure

```bash
# Create project directory
mkdir performance-review-app
cd performance-review-app

# Initialize pnpm workspace
pnpm init

# Create workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF
```

### Step 2: Create Frontend (Nuxt 4)

```bash
# Create Nuxt app
pnpm dlx nuxi@latest init apps/web --template v4

# Navigate to frontend
cd apps/web

# Install dependencies
pnpm add @nuxt/ui shadcn-vue @vueuse/core
pnpm add -D @nuxt/devtools tailwindcss postcss autoprefixer

# Initialize Tailwind
pnpm dlx tailwindcss init -p
```

### Step 3: Configure Nuxt for SPA Mode

Update `apps/web/nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  ssr: false, // SPA mode

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3001',
    },
  },

  compatibilityDate: '2024-11-01',
})
```

### Step 4: Create Backend (Fastify)

```bash
# Go back to root
cd ../..

# Create backend directory
mkdir -p apps/api/src

# Initialize backend package
cd apps/api
pnpm init

# Install dependencies
pnpm add fastify @fastify/cors @fastify/cookie @fastify/formbody
pnpm add drizzle-orm better-sqlite3 better-auth
pnpm add zod resend dotenv

# Dev dependencies
pnpm add -D typescript tsx @types/node @types/better-sqlite3
pnpm add -D drizzle-kit
```

### Step 5: Configure TypeScript for Backend

Create `apps/api/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 6: Create Backend Entry Point

Create `apps/api/src/index.ts`:

```typescript
import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import { config } from 'dotenv'

config()

const app = Fastify({
  logger: true,
})

// Plugins
await app.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
})
await app.register(cookie)

// Health check
app.get('/health', async () => ({ status: 'ok' }))

// Start server
const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' })
    console.log('Server running on http://localhost:3001')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
```

### Step 7: Setup Database (Drizzle + SQLite)

Create `apps/api/src/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const teams = sqliteTable('teams', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey(),
  teamId: text('team_id').notNull().references(() => teams.id),
  userId: text('user_id').notNull().references(() => users.id),
  role: text('role', { enum: ['admin', 'manager', 'employee'] }).notNull(),
  managerId: text('manager_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

// Add more tables as needed...
```

Create `apps/api/drizzle.config.ts`:

```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/app.db',
  },
})
```

### Step 8: Setup Scripts

Update root `package.json`:

```json
{
  "name": "performance-review-app",
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "dev:web": "pnpm --filter web dev",
    "dev:api": "pnpm --filter api dev",
    "build": "pnpm -r build",
    "db:generate": "pnpm --filter api db:generate",
    "db:migrate": "pnpm --filter api db:migrate"
  }
}
```

Update `apps/api/package.json`:

```json
{
  "name": "api",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

Update `apps/web/package.json`:

```json
{
  "name": "web",
  "scripts": {
    "dev": "nuxt dev --port 3000",
    "build": "nuxt build",
    "preview": "nuxt preview"
  }
}
```

---

## Environment Setup

### Create Environment Files

`apps/api/.env`:

```env
# Server
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=./data/app.db

# Auth
AUTH_SECRET=your-super-secret-key-change-in-production
AUTH_URL=http://localhost:3001

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
```

`apps/web/.env`:

```env
# API
NUXT_PUBLIC_API_BASE=http://localhost:3001
```

### Create .gitignore

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
.output/
.nuxt/

# Environment
.env
.env.local
.env.*.local

# Database
*.db
data/

# IDE
.vscode/
.idea/

# OS
.DS_Store
```

---

## Verification

### Run the Development Environment

```bash
# From project root
pnpm install

# Generate database
pnpm db:generate
pnpm db:migrate

# Start everything
pnpm dev
```

### Verify Services

| Service | URL | Expected |
|---------|-----|----------|
| Frontend | http://localhost:3000 | Nuxt welcome page |
| Backend | http://localhost:3001/health | `{"status":"ok"}` |

### Test Database Connection

```bash
# In apps/api directory
pnpm tsx -e "
import Database from 'better-sqlite3'
const db = new Database('./data/app.db')
console.log(db.prepare('SELECT 1').get())
"
```

---

## Quick Start Commands

### Daily Development

```bash
# Start dev servers
pnpm dev

# Frontend only
pnpm dev:web

# Backend only
pnpm dev:api
```

### Database Commands

```bash
# After schema changes
pnpm db:generate  # Generate migration
pnpm db:migrate   # Apply migration

# Reset database (development only)
rm apps/api/data/app.db
pnpm db:migrate
```

### Testing

```bash
# Run tests (once set up)
pnpm test

# Type check
pnpm typecheck
```

### Building

```bash
# Build all
pnpm build

# Preview production build
pnpm preview
```

---

## Project Structure

```
performance-review-app/
├── apps/
│   ├── web/                    # Nuxt frontend
│   │   ├── assets/
│   │   │   └── css/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── nuxt.config.ts
│   │   └── package.json
│   │
│   └── api/                    # Fastify backend
│       ├── src/
│       │   ├── db/
│       │   │   ├── schema.ts
│       │   │   └── index.ts
│       │   ├── routes/
│       │   ├── services/
│       │   ├── utils/
│       │   └── index.ts
│       ├── drizzle/            # Migrations
│       ├── data/               # SQLite DB (gitignored)
│       ├── drizzle.config.ts
│       └── package.json
│
├── packages/                   # Shared packages (future)
│   └── shared/                 # Shared types, utils
│
├── pnpm-workspace.yaml
├── package.json
└── .gitignore
```

---

## Deployment Setup

### Railway Configuration

Create `railway.json` in root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Procfile for Railway

```
web: cd apps/api && pnpm start
```

### Deploy Steps

1. Push to GitHub
2. Connect Railway to repo
3. Set environment variables in Railway dashboard
4. Railway auto-deploys on push

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| pnpm not found | `npm install -g pnpm` |
| Port already in use | Kill process: `lsof -ti:3000 \| xargs kill` |
| Database locked | Restart API server |
| Module not found | Run `pnpm install` |
| TypeScript errors | Run `pnpm typecheck` |

### Reset Everything

```bash
# Nuclear option - start fresh
rm -rf node_modules apps/*/node_modules
rm -rf apps/api/data
pnpm install
pnpm db:migrate
pnpm dev
```

---

*Next artifact: 03-implementation-tasks.md*
