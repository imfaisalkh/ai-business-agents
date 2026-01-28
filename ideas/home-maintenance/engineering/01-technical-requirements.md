# Technical Requirements Document

> **Purpose:** Defines technical architecture and standards for HomeCrew. Reference before making architecture changes.

## Document Info
- **Product:** HomeCrew
- **Version:** 1.0 (MVP)
- **Last Updated:** January 29, 2026

---

## Architecture Overview

**Monorepo with Separate Frontend & Backend**

```
                        Client Browser / Mobile Device
                                    |
                                    | HTTPS
                                    v
+-------------------------------------------------------------------+
|                   Nuxt 4 SPA (Client-Only)                         |
|  * Pages (file-based routing)                                      |
|  * Components (shadcn-vue)                                         |
|  * Role-based views (owner/worker/customer)                        |
|  * Composables (state & API)                                       |
|  * Pinia (state management)                                        |
|                     [Vercel/Netlify]                               |
+-------------------------------------------------------------------+
                                    |
                                    | REST API
                                    v
+-------------------------------------------------------------------+
|                     Fastify Backend                                |
|  * REST Routes + JWT Auth                                          |
|  * Role-based middleware                                           |
|  * Zod Validation                                                  |
|  * Drizzle ORM                                                     |
|                     [Railway/Fly.io]                               |
+-------------------------------------------------------------------+
                                    |
                    +---------------+---------------+
                    |               |               |
                    v               v               v
            +-----------+    +-----------+    +-----------+
            |  SQLite   |    |  Stripe   |    |  Twilio   |
            | (app.db)  |    | Payments  |    |    SMS    |
            +-----------+    +-----------+    +-----------+
```

### Critical: Single App Architecture

**DO NOT create separate apps for different user roles.** Build ONE frontend, ONE backend, ONE mobile app.

```
WRONG: apps/admin-web/, apps/worker-app/, apps/customer-portal/
CORRECT: apps/web/, apps/api/, apps/mobile/
```

Handle multiple roles via:
- **Frontend:** Role-based routing and component visibility
- **Backend:** Role-based middleware and authorization
- **Database:** `role` column on users table

---

## Tech Stack Specification

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Nuxt | 4.x | Vue meta-framework (client-only SPA mode) |
| Vue | 3.x | Reactive UI framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn-vue | latest | UI component library |
| Pinia | 2.x | State management |
| VueUse | latest | Composition utilities |
| PostHog | latest | Product analytics |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x LTS | Runtime |
| Fastify | 4.x | Web framework (high performance) |
| @fastify/jwt | latest | JWT authentication |
| @fastify/cors | latest | CORS handling |
| @fastify/cookie | latest | Cookie management |
| Zod | 3.x | Schema validation |
| Drizzle ORM | latest | Type-safe database queries |
| better-sqlite3 | latest | SQLite driver |

### External Services
| Service | Purpose |
|---------|---------|
| Stripe | Subscription billing + Invoice payments |
| Twilio | Two-way SMS messaging |
| Resend | Transactional email |
| PostHog | Product analytics & feature flags |

### Mobile (Phase 2)
| Technology | Purpose |
|------------|---------|
| Capacitor | Native iOS/Android from same codebase |
| Same Nuxt app runs inside native WebView |

---

## Monorepo Structure

```
homecrew/
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm workspace definition
├── .env.example              # Environment template
├── README.md
│
├── apps/
│   ├── web/                  # Nuxt 4 Frontend (SPA) - ALL ROLES
│   │   ├── nuxt.config.ts
│   │   ├── package.json
│   │   ├── app.vue
│   │   ├── pages/
│   │   │   ├── index.vue           # Landing/login redirect
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   ├── onboarding/         # Business setup wizard
│   │   │   ├── dashboard/          # Owner dashboard
│   │   │   │   └── index.vue
│   │   │   ├── jobs/               # Job scheduling (owners)
│   │   │   │   ├── index.vue       # Calendar view
│   │   │   │   └── [id].vue        # Job detail
│   │   │   ├── customers/          # Customer management
│   │   │   │   ├── index.vue
│   │   │   │   └── [id].vue
│   │   │   ├── invoices/           # Invoicing
│   │   │   │   ├── index.vue
│   │   │   │   └── [id].vue
│   │   │   ├── messages/           # Two-way SMS
│   │   │   │   └── index.vue
│   │   │   ├── team/               # Worker management
│   │   │   │   └── index.vue
│   │   │   ├── worker/             # Worker-specific views
│   │   │   │   ├── today.vue       # Today's jobs (mobile)
│   │   │   │   └── job/[id].vue    # Job detail (worker)
│   │   │   ├── settings/           # Business settings
│   │   │   └── billing/            # Subscription management
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn-vue components
│   │   │   ├── app/                # App-specific components
│   │   │   │   ├── JobCard.vue
│   │   │   │   ├── CustomerPicker.vue
│   │   │   │   ├── CalendarView.vue
│   │   │   │   └── ConversationThread.vue
│   │   │   └── layout/
│   │   │       ├── Sidebar.vue
│   │   │       ├── Header.vue
│   │   │       └── MobileNav.vue
│   │   ├── composables/
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useJobs.ts
│   │   │   ├── useCustomers.ts
│   │   │   ├── useInvoices.ts
│   │   │   ├── useMessages.ts
│   │   │   └── useAnalytics.ts
│   │   ├── stores/
│   │   │   ├── auth.ts
│   │   │   └── business.ts
│   │   ├── layouts/
│   │   │   ├── default.vue         # Owner layout
│   │   │   ├── worker.vue          # Worker mobile layout
│   │   │   └── auth.vue            # Auth pages layout
│   │   ├── middleware/
│   │   │   ├── auth.ts             # Require authentication
│   │   │   ├── owner.ts            # Owner role required
│   │   │   └── worker.ts           # Worker role required
│   │   └── types/
│   │
│   ├── api/                  # Fastify Backend
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── drizzle.config.ts
│   │   ├── src/
│   │   │   ├── index.ts            # Server entry point
│   │   │   ├── app.ts              # Fastify app setup
│   │   │   ├── routes/
│   │   │   │   ├── index.ts        # Route registration
│   │   │   │   ├── auth.ts         # Auth routes
│   │   │   │   ├── businesses.ts   # Business management
│   │   │   │   ├── customers.ts    # Customer CRUD
│   │   │   │   ├── jobs.ts         # Job scheduling
│   │   │   │   ├── invoices.ts     # Invoicing
│   │   │   │   ├── messages.ts     # SMS messaging
│   │   │   │   ├── workers.ts      # Team management
│   │   │   │   └── webhooks.ts     # Stripe/Twilio webhooks
│   │   │   ├── plugins/
│   │   │   │   ├── auth.ts         # JWT plugin
│   │   │   │   ├── cors.ts
│   │   │   │   └── db.ts
│   │   │   ├── middleware/
│   │   │   │   ├── authenticate.ts
│   │   │   │   ├── requireOwner.ts
│   │   │   │   └── requireWorker.ts
│   │   │   ├── schemas/            # Zod schemas
│   │   │   ├── services/           # Business logic
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── job.service.ts
│   │   │   │   ├── invoice.service.ts
│   │   │   │   ├── sms.service.ts
│   │   │   │   └── stripe.service.ts
│   │   │   ├── db/
│   │   │   │   ├── index.ts        # DB connection
│   │   │   │   └── schema.ts       # Drizzle schema
│   │   │   └── utils/
│   │   ├── drizzle/                # Migrations
│   │   └── data/                   # SQLite DB location
│   │
│   └── mobile/               # Capacitor (Phase 2)
│       ├── capacitor.config.ts
│       ├── ios/
│       └── android/
│
└── packages/
    └── shared/               # Shared types
        ├── package.json
        └── src/
            ├── types/
            │   ├── api.ts
            │   ├── entities.ts
            │   └── index.ts
            └── constants.ts
```

---

## Database Schema

### Core Tables (Drizzle ORM)

```typescript
// apps/api/src/db/schema.ts
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// User roles
export const userRoles = ['owner', 'admin', 'worker'] as const;
export type UserRole = typeof userRoles[number];

// Subscription statuses
export const subscriptionStatuses = ['trial', 'active', 'cancelled', 'past_due'] as const;

// Job statuses
export const jobStatuses = ['scheduled', 'in_progress', 'completed', 'cancelled'] as const;

// Invoice statuses
export const invoiceStatuses = ['draft', 'sent', 'paid', 'overdue'] as const;

// ===== BUSINESSES =====
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

// ===== USERS =====
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

// ===== REFRESH TOKENS =====
export const refreshTokens = sqliteTable('refresh_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// ===== CUSTOMERS (of the business) =====
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

// ===== JOBS =====
export const jobs = sqliteTable('jobs', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  workerId: text('worker_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  scheduledDate: text('scheduled_date').notNull(), // ISO date string
  scheduledTime: text('scheduled_time').notNull(), // HH:MM format
  durationMinutes: integer('duration_minutes').default(60),
  status: text('status', { enum: jobStatuses }).default('scheduled'),
  price: real('price'),
  notes: text('notes'),
  recurringRuleId: text('recurring_rule_id').references(() => recurringRules.id),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// ===== RECURRING RULES =====
export const recurringRules = sqliteTable('recurring_rules', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  frequency: text('frequency', { enum: ['weekly', 'biweekly', 'monthly'] }).notNull(),
  interval: integer('interval').default(1),
  dayOfWeek: integer('day_of_week'), // 0-6 for weekly
  endDate: text('end_date'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// ===== INVOICES =====
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
  stripePaymentLinkId: text('stripe_payment_link_id'),
  stripePaymentLinkUrl: text('stripe_payment_link_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// ===== MESSAGES (SMS) =====
export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  businessId: text('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  customerId: text('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  direction: text('direction', { enum: ['inbound', 'outbound'] }).notNull(),
  body: text('body').notNull(),
  twilioSid: text('twilio_sid'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// ===== JOB PHOTOS =====
export const jobPhotos = sqliteTable('job_photos', {
  id: text('id').primaryKey(),
  jobId: text('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  type: text('type', { enum: ['before', 'after'] }).default('after'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Type exports
export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
```

### Indexes (add to migrations)

```sql
CREATE INDEX idx_users_business ON users(business_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_customers_business ON customers(business_id);
CREATE INDEX idx_jobs_business_date ON jobs(business_id, scheduled_date);
CREATE INDEX idx_jobs_worker ON jobs(worker_id, scheduled_date);
CREATE INDEX idx_jobs_customer ON jobs(customer_id);
CREATE INDEX idx_invoices_business_status ON invoices(business_id, status);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_messages_customer ON messages(customer_id, created_at);
```

---

## API Standards

### Base URL
- **Development:** `http://localhost:3001/api`
- **Production:** `https://api.homecrew.app/api`

### Response Format

```typescript
// Success response
interface SuccessResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Error response
interface ErrorResponse {
  error: {
    code: string;        // e.g., 'VALIDATION_ERROR', 'UNAUTHORIZED'
    message: string;     // Human-readable message
    details?: unknown;   // Validation errors, etc.
  };
}
```

### HTTP Status Codes
- 200 - Success
- 201 - Created
- 400 - Bad Request (validation error)
- 401 - Unauthorized (missing/invalid token)
- 403 - Forbidden (no permission / wrong role)
- 404 - Not Found
- 500 - Internal Server Error

### API Endpoints Summary

```
/api/auth
  POST /register         # Owner signup
  POST /login            # All roles
  POST /logout           # Revoke tokens
  POST /refresh          # Refresh access token
  GET  /me               # Current user + business

/api/businesses
  GET  /me               # Current business
  PATCH /me              # Update business
  POST /setup            # Initial business setup

/api/customers
  GET  /                 # List (paginated, searchable)
  GET  /:id              # Get one
  POST /                 # Create
  PUT  /:id              # Update
  DELETE /:id            # Delete

/api/jobs
  GET  /                 # List (date range, worker filter)
  GET  /calendar         # Calendar format (by date)
  GET  /today            # Worker's today jobs
  GET  /:id              # Get one
  POST /                 # Create
  PUT  /:id              # Update
  DELETE /:id            # Delete
  POST /:id/start        # Worker starts job
  POST /:id/complete     # Worker completes job

/api/invoices
  GET  /                 # List (status filter)
  GET  /:id              # Get one
  POST /                 # Create (from job or manual)
  POST /:id/send         # Send via email/SMS
  POST /:id/mark-paid    # Manual mark paid

/api/messages
  GET  /conversations    # List conversations
  GET  /conversations/:customerId  # Thread with customer
  POST /send             # Send SMS

/api/workers
  GET  /                 # List team members
  POST /invite           # Invite worker
  DELETE /:id            # Remove worker

/api/webhooks
  POST /stripe           # Stripe webhook
  POST /twilio           # Twilio inbound SMS
```

---

## Security Requirements

### Authentication
- [x] JWT access tokens (15 min expiry)
- [x] Refresh tokens in httpOnly cookies (7 day expiry)
- [x] Password hashing with bcrypt (cost factor 12)
- [x] Refresh token rotation on use

### Authorization
- [x] All endpoints require authentication (except /auth/*, /webhooks/*)
- [x] Users can only access their own business data (business_id check)
- [x] Workers can only view/modify their assigned jobs
- [x] Owner role required for: team management, billing, business settings

### API Security
- [x] CORS restricted to frontend domain
- [x] Rate limiting on auth endpoints (10 req/min)
- [x] Rate limiting on API endpoints (100 req/min)
- [x] Input validation with Zod on all endpoints
- [x] SQL injection prevention via Drizzle ORM

### Data Security
- [x] Passwords never logged or returned
- [x] No credit card data stored (Stripe handles)
- [x] HTTPS enforced in production
- [x] Database file permissions restricted

---

## Environment Variables

### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=3001
HOST=0.0.0.0

# Database
DATABASE_URL=file:./data/app.db

# JWT
JWT_SECRET=your-secret-key-min-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Email (Resend)
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@homecrew.app

# App URLs
APP_URL=http://localhost:3000
```

### Frontend (.env)
```bash
# API
NUXT_PUBLIC_API_URL=http://localhost:3001/api

# App
NUXT_PUBLIC_APP_NAME=HomeCrew

# Analytics
NUXT_PUBLIC_POSTHOG_KEY=phc_...
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## Deployment Architecture

### Frontend (Nuxt 4 SPA)
- **Platform:** Vercel / Netlify / Cloudflare Pages
- **Build:** `pnpm --filter web build`
- **Output:** `apps/web/.output/public/` (static files)

### Backend (Fastify)
- **Platform:** Railway / Fly.io / Render
- **Build:** `pnpm --filter api build`
- **Start:** `node dist/index.js`
- **Database:** SQLite file persisted on volume mount

### Environment-Specific Config

| Environment | Frontend URL | Backend URL | Database |
|-------------|--------------|-------------|----------|
| Development | localhost:3000 | localhost:3001 | ./data/app.db |
| Staging | staging.homecrew.app | api-staging.homecrew.app | SQLite on volume |
| Production | app.homecrew.app | api.homecrew.app | SQLite on volume |

---

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Frontend Bundle | <150KB | Gzipped initial JS |
| Page Load (LCP) | <2.5s | Core Web Vital |
| Time to Interactive | <3.5s | Core Web Vital |
| API Response (P95) | <500ms | For CRUD operations |
| Calendar Load | <1s | Week view with all jobs |
| Search Results | <500ms | Customer/job search |

---

## Third-Party Integration Notes

### Stripe Integration
- **Subscriptions:** Stripe Checkout for $49/$79 plans
- **Invoice Payments:** Stripe Payment Links (no card storage)
- **Webhooks:** `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`

### Twilio Integration
- **Outbound SMS:** Send appointment reminders, "on my way" texts
- **Inbound SMS:** Webhook receives customer replies
- **Business Number:** One Twilio number per business (future: per-business provisioning)
- **Cost:** ~$0.0079/message

### Resend Integration
- **Invoice emails:** Professional invoice with payment link
- **Reminders:** Overdue invoice reminders
- **Notifications:** Job assigned, payment received

---

## Migration Path: SQLite to PostgreSQL

**When to migrate:**
- >100 concurrent write operations per second
- Need advanced full-text search
- Multi-region deployment required
- Team grows beyond solo founder

**Migration steps:**
1. Update Drizzle config to PostgreSQL adapter
2. Regenerate migrations with `pnpm db:generate`
3. Export SQLite data, import to PostgreSQL
4. Update connection string in environment
5. Deploy backend to managed PostgreSQL (Neon, Supabase)

**Not recommended for:**
- MVP phase (current)
- Solo founder
- <1000 customers

---

*Last updated: January 29, 2026*
