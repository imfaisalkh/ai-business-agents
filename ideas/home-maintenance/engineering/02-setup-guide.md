# Project Setup Guide

*Generated on January 28, 2026*

---

## Prerequisites

Before starting, ensure you have:

- [ ] Node.js 20+ (`node --version`)
- [ ] pnpm 8+ (`pnpm --version`)
- [ ] Git (`git --version`)
- [ ] VS Code (recommended)
- [ ] Stripe account (for payments)
- [ ] Twilio account (for SMS)
- [ ] Resend account (for email)

---

## Step 1: Initialize Monorepo

### Create project directory

```bash
mkdir home-maintenance-app
cd home-maintenance-app
git init
```

### Initialize pnpm workspace

```bash
# Create package.json
cat > package.json << 'EOF'
{
  "name": "home-maintenance-app",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "db:push": "pnpm --filter @app/db push",
    "db:studio": "pnpm --filter @app/db studio",
    "db:generate": "pnpm --filter @app/db generate"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.3.0"
  },
  "packageManager": "pnpm@8.15.0"
}
EOF

# Create pnpm workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# Create turbo config
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".output/**", ".nuxt/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}
EOF
```

### Create directory structure

```bash
mkdir -p apps/admin apps/worker apps/api
mkdir -p packages/shared packages/db
```

---

## Step 2: Setup Database Package

### Initialize db package

```bash
cd packages/db

cat > package.json << 'EOF'
{
  "name": "@app/db",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "push": "drizzle-kit push:sqlite",
    "generate": "drizzle-kit generate:sqlite",
    "studio": "drizzle-kit studio"
  },
  "dependencies": {
    "better-sqlite3": "^9.4.0",
    "drizzle-orm": "^0.29.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.8",
    "drizzle-kit": "^0.20.0"
  }
}
EOF

cd ../..
```

### Create database schema

```bash
cat > packages/db/schema.ts << 'EOF'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  role: text('role', { enum: ['owner', 'worker', 'admin'] }).notNull(),
  businessId: text('business_id').references(() => businesses.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).defaultNow(),
});

// Businesses table
export const businesses = sqliteTable('businesses', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  timezone: text('timezone').default('America/Chicago'),
  stripeCustomerId: text('stripe_customer_id'),
  subscriptionStatus: text('subscription_status', {
    enum: ['trial', 'active', 'cancelled', 'past_due']
  }).default('trial'),
  trialEndsAt: integer('trial_ends_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Customers table
export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Jobs table
export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id),
  customerId: text('customer_id').notNull().references(() => customers.id),
  workerId: text('worker_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  scheduledDate: text('scheduled_date').notNull(), // ISO date string
  scheduledTime: text('scheduled_time').notNull(), // HH:MM format
  durationMinutes: integer('duration_minutes').default(60),
  status: text('status', {
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled']
  }).default('scheduled'),
  price: real('price'),
  notes: text('notes'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Invoices table
export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id),
  customerId: text('customer_id').notNull().references(() => customers.id),
  jobId: text('job_id').references(() => jobs.id),
  amount: real('amount').notNull(),
  status: text('status', {
    enum: ['draft', 'sent', 'paid', 'overdue']
  }).default('draft'),
  dueDate: text('due_date'),
  sentAt: integer('sent_at', { mode: 'timestamp' }),
  paidAt: integer('paid_at', { mode: 'timestamp' }),
  stripePaymentLink: text('stripe_payment_link'),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Messages table
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id),
  customerId: text('customer_id').notNull().references(() => customers.id),
  direction: text('direction', { enum: ['inbound', 'outbound'] }).notNull(),
  body: text('body').notNull(),
  twilioSid: text('twilio_sid'),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Sessions table
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
EOF
```

### Create Drizzle config

```bash
cat > packages/db/drizzle.config.ts << 'EOF'
import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  out: './migrations',
  driver: 'better-sqlite3',
  dbCredentials: {
    url: process.env.DATABASE_URL || './data/app.db',
  },
} satisfies Config;
EOF
```

### Create database connection

```bash
cat > packages/db/index.ts << 'EOF'
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqlite = new Database(process.env.DATABASE_URL || './data/app.db');
export const db = drizzle(sqlite, { schema });

export * from './schema';
EOF
```

---

## Step 3: Setup Shared Package

### Initialize shared package

```bash
cd packages/shared

cat > package.json << 'EOF'
{
  "name": "@app/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "dependencies": {
    "zod": "^3.22.0"
  }
}
EOF

cd ../..
```

### Create shared types and utilities

```bash
cat > packages/shared/index.ts << 'EOF'
// Re-export everything
export * from './types';
export * from './validation';
export * from './utils';
EOF

cat > packages/shared/types.ts << 'EOF'
// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Job status type
export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

// Invoice status type
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

// User role type
export type UserRole = 'owner' | 'worker' | 'admin';
EOF

cat > packages/shared/validation.ts << 'EOF'
import { z } from 'zod';

// Customer validation
export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

// Job validation
export const jobSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  workerId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  scheduledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  scheduledTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  durationMinutes: z.number().min(15).max(480).default(60),
  price: z.number().min(0).optional(),
  notes: z.string().optional(),
});

// Invoice validation
export const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  jobId: z.string().optional(),
  amount: z.number().min(0, 'Amount must be positive'),
  dueDate: z.string().optional(),
});

// Auth validation
export const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});
EOF

cat > packages/shared/utils.ts << 'EOF'
import { customAlphabet } from 'nanoid';

// Generate short IDs for database records
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);
export const generateId = () => nanoid();

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(d);
};

// Format time
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
EOF
```

Add nanoid dependency:
```bash
cd packages/shared
pnpm add nanoid
cd ../..
```

---

## Step 4: Setup Fastify API

### Initialize API app

```bash
cd apps/api

cat > package.json << 'EOF'
{
  "name": "@app/api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@app/db": "workspace:*",
    "@app/shared": "workspace:*",
    "@fastify/cookie": "^9.3.0",
    "@fastify/cors": "^9.0.0",
    "@fastify/jwt": "^8.0.0",
    "bcrypt": "^5.1.1",
    "fastify": "^4.26.0",
    "stripe": "^14.0.0",
    "twilio": "^4.20.0",
    "resend": "^3.0.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/node": "^20.11.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0"
  }
}
EOF

cd ../..
```

### Create API entry point

```bash
mkdir -p apps/api/src/routes apps/api/src/services apps/api/src/middleware

cat > apps/api/src/index.ts << 'EOF'
import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';

// Import routes
import { authRoutes } from './routes/auth';
import { customerRoutes } from './routes/customers';
import { jobRoutes } from './routes/jobs';
import { invoiceRoutes } from './routes/invoices';
import { messageRoutes } from './routes/messages';
import { workerRoutes } from './routes/workers';
import { webhookRoutes } from './routes/webhooks';

const app = Fastify({
  logger: true,
});

// Register plugins
app.register(cors, {
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true,
});

app.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'your-cookie-secret',
});

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-jwt-secret',
});

// Health check
app.get('/health', async () => ({ status: 'ok' }));

// Register routes
app.register(authRoutes, { prefix: '/api/auth' });
app.register(customerRoutes, { prefix: '/api/customers' });
app.register(jobRoutes, { prefix: '/api/jobs' });
app.register(invoiceRoutes, { prefix: '/api/invoices' });
app.register(messageRoutes, { prefix: '/api/messages' });
app.register(workerRoutes, { prefix: '/api/workers' });
app.register(webhookRoutes, { prefix: '/api/webhooks' });

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
EOF
```

### Create auth routes

```bash
cat > apps/api/src/routes/auth.ts << 'EOF'
import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { db, users, businesses, sessions } from '@app/db';
import { generateId, signupSchema, loginSchema } from '@app/shared';
import { eq } from 'drizzle-orm';

export async function authRoutes(app: FastifyInstance) {
  // Signup
  app.post('/signup', async (request, reply) => {
    const result = signupSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: result.error.message },
      });
    }

    const { email, password, name, businessName } = result.data;

    // Check if user exists
    const existing = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      return reply.status(400).send({
        success: false,
        error: { code: 'USER_EXISTS', message: 'Email already registered' },
      });
    }

    // Create business and user
    const businessId = generateId();
    const userId = generateId();
    const passwordHash = await bcrypt.hash(password, 12);

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    await db.insert(businesses).values({
      id: businessId,
      name: businessName,
      trialEndsAt,
    });

    await db.insert(users).values({
      id: userId,
      email,
      passwordHash,
      name,
      role: 'owner',
      businessId,
    });

    // Generate tokens
    const accessToken = app.jwt.sign(
      { userId, businessId, role: 'owner' },
      { expiresIn: '15m' }
    );

    const refreshToken = generateId() + generateId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await db.insert(sessions).values({
      id: generateId(),
      userId,
      refreshToken,
      expiresAt,
    });

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { success: true, data: { accessToken, user: { id: userId, email, name } } };
  });

  // Login
  app.post('/login', async (request, reply) => {
    const result = loginSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: result.error.message },
      });
    }

    const { email, password } = result.data;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }

    // Generate tokens
    const accessToken = app.jwt.sign(
      { userId: user.id, businessId: user.businessId, role: user.role },
      { expiresIn: '15m' }
    );

    const refreshToken = generateId() + generateId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await db.insert(sessions).values({
      id: generateId(),
      userId: user.id,
      refreshToken,
      expiresAt,
    });

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      data: {
        accessToken,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      },
    };
  });

  // Refresh token
  app.post('/refresh', async (request, reply) => {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      return reply.status(401).send({
        success: false,
        error: { code: 'NO_TOKEN', message: 'No refresh token' },
      });
    }

    const session = await db.query.sessions.findFirst({
      where: eq(sessions.refreshToken, refreshToken),
    });

    if (!session || session.expiresAt < new Date()) {
      return reply.status(401).send({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' },
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.userId),
    });

    if (!user) {
      return reply.status(401).send({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' },
      });
    }

    const accessToken = app.jwt.sign(
      { userId: user.id, businessId: user.businessId, role: user.role },
      { expiresIn: '15m' }
    );

    return { success: true, data: { accessToken } };
  });

  // Logout
  app.post('/logout', async (request, reply) => {
    const refreshToken = request.cookies.refreshToken;
    if (refreshToken) {
      await db.delete(sessions).where(eq(sessions.refreshToken, refreshToken));
    }
    reply.clearCookie('refreshToken');
    return { success: true };
  });
}
EOF
```

### Create placeholder route files

```bash
# Create placeholder files for other routes
for route in customers jobs invoices messages workers webhooks; do
  cat > apps/api/src/routes/${route}.ts << EOF
import { FastifyInstance } from 'fastify';

export async function ${route}Routes(app: FastifyInstance) {
  // TODO: Implement ${route} routes
  app.get('/', async () => ({ message: '${route} endpoint' }));
}
EOF
done
```

### Create tsconfig for API

```bash
cat > apps/api/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

---

## Step 5: Setup Nuxt Admin App

### Initialize admin app

```bash
cd apps/admin
npx nuxi init . --force
```

### Update nuxt.config.ts

```bash
cat > apps/admin/nuxt.config.ts << 'EOF'
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3001',
    },
  },
});
EOF
```

### Setup Tailwind and shadcn

```bash
cd apps/admin
npx nuxi module add @nuxtjs/tailwindcss
npx nuxi module add shadcn-nuxt
npx shadcn-vue@latest init

cd ../..
```

---

## Step 6: Create Environment Files

### Root .env.example

```bash
cat > .env.example << 'EOF'
# Database
DATABASE_URL=./data/app.db

# Auth
JWT_SECRET=your-jwt-secret-change-this
COOKIE_SECRET=your-cookie-secret-change-this

# API
PORT=3001
API_URL=http://localhost:3001
APP_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_PRICE_ID_ANNUAL=price_...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Email
RESEND_API_KEY=re_...
EOF
```

### Create .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build outputs
.output/
.nuxt/
dist/

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

# Turbo
.turbo/

# OS
.DS_Store
EOF
```

---

## Step 7: Install Dependencies & Run

### Install all dependencies

```bash
pnpm install
```

### Initialize database

```bash
mkdir -p data
pnpm db:push
```

### Start development servers

```bash
# Terminal 1: Start API
pnpm --filter @app/api dev

# Terminal 2: Start Admin app
pnpm --filter @app/admin dev
```

---

## Quick Reference Commands

```bash
# Development
pnpm dev                    # Start all apps in dev mode
pnpm --filter @app/api dev  # Start API only
pnpm --filter @app/admin dev # Start Admin only

# Database
pnpm db:push               # Push schema changes
pnpm db:studio             # Open Drizzle Studio
pnpm db:generate           # Generate migrations

# Build
pnpm build                 # Build all apps

# Lint
pnpm lint                  # Lint all apps
```

---

## Next Steps

1. [ ] Copy `.env.example` to `.env` and fill in values
2. [ ] Create Stripe account and add keys
3. [ ] Create Twilio account and add keys
4. [ ] Create Resend account and add keys
5. [ ] Run `pnpm db:push` to create database
6. [ ] Run `pnpm dev` to start development
7. [ ] Open http://localhost:3000 to see the app

---

*Next artifact: 03-implementation-tasks.md*
