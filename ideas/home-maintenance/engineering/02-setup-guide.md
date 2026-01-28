# Project Setup Guide

> **Purpose:** Bootstrap HomeCrew from zero to running locally. Follow once at project start.

## Prerequisites

- Node.js 20+ LTS (`node --version`)
- pnpm 8+ (`pnpm --version`) - Required for monorepo workspaces
- Git (`git --version`)
- VS Code (recommended) with extensions:
  - Vue - Official
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

---

## Step 1: Create Monorepo Structure

```bash
# Create project directory
mkdir homecrew && cd homecrew

# Initialize git
git init

# Create root package.json
cat > package.json << 'EOF'
{
  "name": "homecrew",
  "private": true,
  "scripts": {
    "dev": "pnpm --parallel --filter './apps/*' dev",
    "dev:web": "pnpm --filter web dev",
    "dev:api": "pnpm --filter api dev",
    "build": "pnpm --filter './apps/*' build",
    "lint": "pnpm --parallel --filter './apps/*' lint",
    "typecheck": "pnpm --parallel --filter './apps/*' typecheck",
    "db:generate": "pnpm --filter api db:generate",
    "db:push": "pnpm --filter api db:push",
    "db:studio": "pnpm --filter api db:studio"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
EOF

# Create pnpm workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# Create directory structure
mkdir -p apps/web apps/api packages/shared/src/types
```

---

## Step 2: Set Up Nuxt 4 Frontend

```bash
cd apps/web

# Create Nuxt project
npx nuxi@latest init . --force

# Install dependencies
pnpm add @pinia/nuxt @vueuse/nuxt
pnpm add -D @nuxtjs/tailwindcss tailwindcss-animate

# Install shadcn-vue dependencies
pnpm add radix-vue class-variance-authority clsx tailwind-merge lucide-vue-next

# Install analytics
pnpm add posthog-js
```

### Configure nuxt.config.ts

```typescript
// apps/web/nuxt.config.ts
export default defineNuxtConfig({
  // Client-only SPA mode (no SSR)
  ssr: false,

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'HomeCrew',
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    },
  },

  compatibilityDate: '2024-01-01',
});
```

### Configure Tailwind

```javascript
// apps/web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### Add CSS Variables

```css
/* apps/web/assets/css/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
```

### Initialize shadcn-vue

```bash
# Initialize shadcn-vue (follow prompts)
npx shadcn-vue@latest init

# Add commonly used components
npx shadcn-vue@latest add button input label card table form toast dialog dropdown-menu avatar badge calendar select textarea tabs

cd ../..
```

---

## Step 3: Set Up Fastify Backend

```bash
cd apps/api

# Create package.json
cat > package.json << 'EOF'
{
  "name": "api",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  }
}
EOF

# Install Fastify and plugins
pnpm add fastify @fastify/cors @fastify/cookie @fastify/jwt @fastify/rate-limit

# Install database
pnpm add drizzle-orm better-sqlite3
pnpm add -D drizzle-kit @types/better-sqlite3

# Install utilities
pnpm add zod nanoid bcrypt
pnpm add -D @types/bcrypt tsx typescript @types/node

# Install external service SDKs
pnpm add stripe @twilio/conversations resend

# Create tsconfig
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create directory structure
mkdir -p src/routes src/plugins src/schemas src/services src/middleware src/db data drizzle
```

### Configure Drizzle

```typescript
// apps/api/drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/app.db',
  },
} satisfies Config;
```

### Create Database Connection

```typescript
// apps/api/src/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

const sqlite = new Database('./data/app.db');
export const db = drizzle(sqlite, { schema });
```

### Create Database Schema

```typescript
// apps/api/src/db/schema.ts
// Full schema - see 01-technical-requirements.md for complete version

import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const userRoles = ['owner', 'admin', 'worker'] as const;
export const subscriptionStatuses = ['trial', 'active', 'cancelled', 'past_due'] as const;
export const jobStatuses = ['scheduled', 'in_progress', 'completed', 'cancelled'] as const;
export const invoiceStatuses = ['draft', 'sent', 'paid', 'overdue'] as const;

export const businesses = sqliteTable('businesses', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  timezone: text('timezone').default('America/Chicago'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  subscriptionStatus: text('subscription_status', { enum: subscriptionStatuses }).default('trial'),
  trialEndsAt: integer('trial_ends_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  businessId: text('business_id').references(() => businesses.id, { onDelete: 'cascade' }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  role: text('role', { enum: userRoles }).notNull().default('owner'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const refreshTokens = sqliteTable('refresh_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  workerId: text('worker_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  scheduledDate: text('scheduled_date').notNull(),
  scheduledTime: text('scheduled_time').notNull(),
  durationMinutes: integer('duration_minutes').default(60),
  status: text('status', { enum: jobStatuses }).default('scheduled'),
  price: real('price'),
  notes: text('notes'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  jobId: text('job_id').references(() => jobs.id),
  invoiceNumber: text('invoice_number').notNull(),
  amount: real('amount').notNull(),
  status: text('status', { enum: invoiceStatuses }).default('draft'),
  dueDate: text('due_date'),
  sentAt: integer('sent_at', { mode: 'timestamp' }),
  paidAt: integer('paid_at', { mode: 'timestamp' }),
  stripePaymentLinkUrl: text('stripe_payment_link_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  direction: text('direction', { enum: ['inbound', 'outbound'] }).notNull(),
  body: text('body').notNull(),
  twilioSid: text('twilio_sid'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Type exports
export type Business = typeof businesses.$inferSelect;
export type User = typeof users.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type Message = typeof messages.$inferSelect;
```

### Create Fastify App

```typescript
// apps/api/src/app.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Register plugins
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  await app.register(cookie);

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Health check
  app.get('/health', async () => ({ status: 'ok' }));

  // Register routes (add as you build)
  // await app.register(authRoutes, { prefix: '/api/auth' });
  // await app.register(customerRoutes, { prefix: '/api/customers' });
  // await app.register(jobRoutes, { prefix: '/api/jobs' });
  // await app.register(invoiceRoutes, { prefix: '/api/invoices' });
  // await app.register(messageRoutes, { prefix: '/api/messages' });
  // await app.register(webhookRoutes, { prefix: '/api/webhooks' });

  return app;
}
```

### Create Server Entry Point

```typescript
// apps/api/src/index.ts
import { buildApp } from './app.js';

const start = async () => {
  const app = await buildApp();

  try {
    const port = parseInt(process.env.PORT || '3001');
    const host = process.env.HOST || '0.0.0.0';

    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
```

```bash
cd ../..  # Back to root
```

---

## Step 4: Create Environment Files

```bash
# Root .env.example
cat > .env.example << 'EOF'
# Backend
NODE_ENV=development
PORT=3001
HOST=0.0.0.0
DATABASE_URL=file:./data/app.db
JWT_SECRET=your-secret-key-min-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# Twilio (get from https://console.twilio.com)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Email (get from https://resend.com)
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@homecrew.app

# Frontend
NUXT_PUBLIC_API_URL=http://localhost:3001/api
NUXT_PUBLIC_APP_NAME=HomeCrew
NUXT_PUBLIC_POSTHOG_KEY=phc_...
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# App
APP_URL=http://localhost:3000
EOF

# Copy to .env
cp .env.example .env

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules
.nuxt
.output
dist
*.db
.env
.DS_Store
*.log
EOF
```

---

## Step 5: Initialize Database

```bash
# Generate and push database schema
pnpm db:generate
pnpm db:push

# Open Drizzle Studio to view data (optional)
pnpm db:studio
```

---

## Step 6: Create Shared Types Package

```bash
cd packages/shared

cat > package.json << 'EOF'
{
  "name": "@homecrew/shared",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
EOF

cat > src/index.ts << 'EOF'
export * from './types/api.js';
export * from './types/entities.js';
export * from './constants.js';
EOF

cat > src/types/api.ts << 'EOF'
export interface SuccessResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
EOF

cat > src/types/entities.ts << 'EOF'
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: 'owner' | 'admin' | 'worker';
  businessId: string | null;
  createdAt: Date;
}

export interface Business {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  subscriptionStatus: 'trial' | 'active' | 'cancelled' | 'past_due';
}

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
}

export interface Job {
  id: string;
  customerId: string;
  workerId: string | null;
  title: string;
  description: string | null;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  price: number | null;
  notes: string | null;
}

export interface Invoice {
  id: string;
  customerId: string;
  jobId: string | null;
  invoiceNumber: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string | null;
}

export interface Message {
  id: string;
  customerId: string;
  direction: 'inbound' | 'outbound';
  body: string;
  createdAt: Date;
}
EOF

cat > src/constants.ts << 'EOF'
export const JOB_STATUSES = ['scheduled', 'in_progress', 'completed', 'cancelled'] as const;
export const INVOICE_STATUSES = ['draft', 'sent', 'paid', 'overdue'] as const;
export const USER_ROLES = ['owner', 'admin', 'worker'] as const;

export const TRIAL_DAYS = 14;
export const STARTER_PRICE_CENTS = 4900; // $49
export const PRO_PRICE_CENTS = 7900;     // $79
EOF

cd ../..
```

---

## Development Workflow

### Start Development Servers

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:web   # Frontend only (http://localhost:3000)
pnpm dev:api   # Backend only (http://localhost:3001)
```

### Database Changes

```bash
# After modifying schema.ts
pnpm db:generate  # Generate migration
pnpm db:push      # Apply to database
pnpm db:studio    # View data in browser
```

### Before Committing

```bash
# Type check all packages
pnpm typecheck

# Lint all packages
pnpm lint

# Build all packages
pnpm build
```

---

## Mobile Setup (Capacitor - Phase 2)

When ready to add native mobile apps:

```bash
cd apps && mkdir mobile && cd mobile

pnpm add @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
pnpm add @capacitor/camera @capacitor/geolocation @capacitor/push-notifications

cat > capacitor.config.ts << 'EOF'
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.homecrew.mobile',
  appName: 'HomeCrew',
  webDir: '../web/.output/public',
  server: {
    // Remove for production
    url: 'http://localhost:3000',
    cleartext: true,
  },
};

export default config;
EOF

npx cap add ios
npx cap add android

cd ../..

# Build & sync workflow:
# pnpm --filter web build && npx cap sync

# Open native IDE:
# npx cap open ios
# npx cap open android
```

---

## Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from apps/web
cd apps/web
vercel

# Set environment variables in Vercel dashboard:
# NUXT_PUBLIC_API_URL=https://api.homecrew.app/api
# NUXT_PUBLIC_APP_NAME=HomeCrew
# NUXT_PUBLIC_POSTHOG_KEY=phc_...
```

### Backend (Railway)

1. Connect GitHub repo to Railway
2. Set root directory to `apps/api`
3. Set environment variables (copy from .env)
4. Add persistent volume for SQLite at `/app/data`

**Build command:** `pnpm install && pnpm build`
**Start command:** `node dist/index.js`

---

## External Service Setup

### Stripe Setup

1. Create account at https://dashboard.stripe.com
2. Create two products: "Starter" ($49/mo) and "Professional" ($79/mo)
3. Copy API keys to .env
4. Set up webhook endpoint: `https://api.homecrew.app/api/webhooks/stripe`
5. Subscribe to events: `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`

### Twilio Setup

1. Create account at https://console.twilio.com
2. Get a phone number with SMS capability
3. Copy Account SID, Auth Token, and Phone Number to .env
4. Set webhook URL for inbound SMS: `https://api.homecrew.app/api/webhooks/twilio`

### Resend Setup

1. Create account at https://resend.com
2. Verify your domain
3. Copy API key to .env

### PostHog Setup

1. Create account at https://posthog.com
2. Create new project
3. Copy Project API Key to .env

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS errors | Check CORS_ORIGIN matches frontend URL exactly |
| Database locked | Only one write process at a time; restart API |
| JWT errors | Ensure JWT_SECRET is set and consistent |
| Workspace issues | Run `pnpm install` from root directory |
| Port already in use | Kill process: `lsof -ti:3001 \| xargs kill` |
| Migration failed | Delete `drizzle/` folder and `data/app.db`, re-run setup |
| Stripe webhooks not working | Use Stripe CLI for local testing: `stripe listen` |

---

*Last updated: January 29, 2026*
