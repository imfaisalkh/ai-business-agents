# Architecture Decision Record

*Generated on January 28, 2026*

---

## Architecture Overview

### System Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │   Admin SPA     │  │  Worker PWA     │  │ Customer Portal │         │
│  │   (Nuxt 4)      │  │  (Nuxt 4)       │  │   (Nuxt 4)      │         │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘         │
│           │                    │                    │                   │
│           └────────────────────┼────────────────────┘                   │
│                                │                                        │
│                         REST API Calls                                  │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                              SERVER                                     │
├────────────────────────────────┼────────────────────────────────────────┤
│                                ▼                                        │
│                    ┌──────────────────────┐                            │
│                    │   Fastify API        │                            │
│                    │   (TypeScript)       │                            │
│                    └──────────┬───────────┘                            │
│                               │                                        │
│           ┌───────────────────┼───────────────────┐                    │
│           │                   │                   │                    │
│           ▼                   ▼                   ▼                    │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          │
│  │   Drizzle ORM   │ │    Services     │ │  External APIs  │          │
│  │   + SQLite      │ │  (Auth, Jobs,   │ │  (Stripe,       │          │
│  │                 │ │   Invoicing)    │ │   Twilio)       │          │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Tech Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Nuxt 4 (Client SPA) | Modern Vue 3, fast builds, TypeScript |
| **UI Components** | shadcn-vue | Accessible, customizable, Tailwind-based |
| **Backend** | Fastify | Fast, TypeScript-first, plugin ecosystem |
| **Database** | SQLite + Drizzle ORM | Simple, portable, zero-config, type-safe |
| **Auth** | Custom JWT + Sessions | Simple, no vendor lock-in |
| **Payments** | Stripe | Industry standard, great DX |
| **SMS** | Twilio | Reliable, two-way SMS support |
| **Email** | Resend | Modern API, good deliverability |
| **Hosting** | Railway or Render | Simple deployment, auto-scaling |
| **Monorepo** | pnpm workspaces + Turborepo | Fast installs, shared code |

---

## Key Architecture Decisions

### ADR 1: Client-Only SPA (No SSR)

**Status:** Accepted

**Context:**
- Application is behind authentication (no SEO needed)
- Workers use app on slow/spotty mobile connections
- Want fast page transitions after initial load

**Decision:** Use Nuxt 4 in client-only (SPA) mode.

**Consequences:**
- (+) Simpler deployment (static files + API)
- (+) Faster perceived navigation after first load
- (+) Works offline with service worker
- (-) Slower initial load (mitigated by code splitting)
- (-) Can't use SSR-only features

**Configuration:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  // ... rest of config
})
```

---

### ADR 2: SQLite for Database

**Status:** Accepted

**Context:**
- Bootstrapped product with 0-100 customers initially
- Want simple deployment without managed database
- Read-heavy workload (viewing schedules, job lists)
- Can migrate to Postgres later if needed

**Decision:** Use SQLite with Drizzle ORM.

**Consequences:**
- (+) Zero configuration, embedded database
- (+) Excellent read performance
- (+) Easy backups (single file)
- (+) Drizzle provides type safety
- (-) Write concurrency limitations (acceptable at scale)
- (-) Migration to Postgres later if exceeding 1000+ customers

**Migration Path:**
- Drizzle supports both SQLite and Postgres
- Switch adapter when ready to scale
- Use Turso (SQLite edge) for multi-region if needed

---

### ADR 3: JWT + Database Sessions

**Status:** Accepted

**Context:**
- Need auth for admin portal, worker app, and customer portal
- Workers need to stay logged in on mobile
- Want ability to revoke sessions

**Decision:** Use short-lived JWTs (15 min) with database-backed refresh tokens.

**Consequences:**
- (+) Stateless request handling with JWT
- (+) Can revoke sessions via database
- (+) Refresh tokens provide persistence
- (-) Slightly more complex than session-only approach

**Implementation:**
- Access token: 15 minutes, stored in memory
- Refresh token: 30 days, stored in HTTP-only cookie
- Session table tracks active sessions, allows revocation

---

### ADR 4: Monorepo Structure

**Status:** Accepted

**Context:**
- Three client apps (admin, worker, customer portal)
- Shared API client, types, utilities
- Single deployable backend

**Decision:** Use pnpm workspaces with Turborepo.

**Consequences:**
- (+) Shared TypeScript types across apps
- (+) Single dependency management
- (+) Parallel builds with caching
- (+) Easy to refactor and share code
- (-) Initial setup complexity

**Structure:**
```
/
├── apps/
│   ├── admin/          # Admin SPA (Nuxt)
│   ├── worker/         # Worker PWA (Nuxt)
│   ├── customer/       # Customer portal (Nuxt)
│   └── api/            # Fastify backend
├── packages/
│   ├── shared/         # Shared types, utilities
│   ├── db/             # Drizzle schema and migrations
│   └── ui/             # Shared UI components (if needed)
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

### ADR 5: Stripe for Payments

**Status:** Accepted

**Context:**
- Need to accept customer payments for invoices
- Need subscription billing for SaaS
- Want reliable, well-documented solution

**Decision:** Use Stripe for both invoice payments and subscriptions.

**Consequences:**
- (+) Industry standard, well documented
- (+) Handles PCI compliance
- (+) Checkout for subscriptions, Payment Links for invoices
- (+) Webhooks for payment confirmation
- (-) 2.9% + $0.30 per transaction (industry standard)

**Implementation:**
- **Subscriptions:** Stripe Checkout for signup
- **Invoice payments:** Stripe Payment Links
- **Webhooks:** Handle `checkout.session.completed`, `invoice.paid`

---

### ADR 6: Twilio for SMS

**Status:** Accepted

**Context:**
- Need two-way SMS for customer communication
- Workers need to send "on my way" texts
- Auto-reminders for appointments

**Decision:** Use Twilio for all SMS functionality.

**Consequences:**
- (+) Reliable delivery
- (+) Two-way SMS support
- (+) Good developer experience
- (-) Cost: ~$0.0079/message (acceptable)

**Implementation:**
- Provision one phone number per business
- Inbound webhook to handle replies
- Queue outbound messages to handle rate limits

---

### ADR 7: PWA for Mobile Worker App

**Status:** Accepted

**Context:**
- Workers use mobile phones (iOS and Android)
- Don't want to maintain native apps initially
- Need offline access to job list

**Decision:** Build worker app as PWA using Nuxt 4.

**Consequences:**
- (+) Single codebase for web and mobile
- (+) No app store approval process
- (+) Instant updates
- (+) Add to home screen on both platforms
- (-) Limited native features (acceptable for MVP)
- (-) iOS PWA limitations (notifications workaround needed)

**Implementation:**
- Service worker for offline job list
- Web push notifications (with iOS limitations noted)
- Install prompt for add-to-home-screen

---

## Database Schema

### Core Tables

```sql
-- Users (owners, workers, admins)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL, -- 'owner' | 'worker' | 'admin'
  business_id TEXT REFERENCES businesses(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Businesses
CREATE TABLE businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  timezone TEXT DEFAULT 'America/Chicago',
  stripe_customer_id TEXT,
  subscription_status TEXT, -- 'trial' | 'active' | 'cancelled'
  trial_ends_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customers (of the business)
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES businesses(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Jobs
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES businesses(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  worker_id TEXT REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled', -- 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  price DECIMAL(10,2),
  notes TEXT,
  recurring_rule_id TEXT REFERENCES recurring_rules(id),
  started_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Invoices
CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES businesses(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  job_id TEXT REFERENCES jobs(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft' | 'sent' | 'paid' | 'overdue'
  due_date DATE,
  sent_at DATETIME,
  paid_at DATETIME,
  stripe_payment_link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES businesses(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  direction TEXT NOT NULL, -- 'inbound' | 'outbound'
  body TEXT NOT NULL,
  twilio_sid TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sessions (for auth)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  refresh_token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Recurring Rules
CREATE TABLE recurring_rules (
  id TEXT PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES businesses(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  frequency TEXT NOT NULL, -- 'weekly' | 'biweekly' | 'monthly'
  interval INTEGER DEFAULT 1,
  day_of_week INTEGER, -- 0-6 for weekly
  end_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes

```sql
CREATE INDEX idx_jobs_business_date ON jobs(business_id, scheduled_date);
CREATE INDEX idx_jobs_worker ON jobs(worker_id, scheduled_date);
CREATE INDEX idx_invoices_business_status ON invoices(business_id, status);
CREATE INDEX idx_messages_customer ON messages(customer_id, created_at);
CREATE INDEX idx_customers_business ON customers(business_id);
```

---

## API Structure

### Route Organization

```
/api
├── /auth
│   ├── POST /signup
│   ├── POST /login
│   ├── POST /refresh
│   ├── POST /logout
│   └── POST /reset-password
├── /businesses
│   ├── GET /me
│   ├── PATCH /me
│   └── POST /setup
├── /customers
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PATCH /:id
│   └── DELETE /:id
├── /jobs
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PATCH /:id
│   ├── DELETE /:id
│   ├── POST /:id/start
│   └── POST /:id/complete
├── /invoices
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── POST /:id/send
│   └── POST /:id/mark-paid
├── /messages
│   ├── GET /conversations
│   ├── GET /conversations/:customerId
│   └── POST /send
├── /workers
│   ├── GET /
│   ├── POST /invite
│   └── DELETE /:id
└── /webhooks
    ├── POST /stripe
    └── POST /twilio
```

### Request/Response Patterns

**Standard Response Format:**
```typescript
// Success
{
  success: true,
  data: { ... }
}

// Error
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Email is required",
    details: { field: "email" }
  }
}
```

**Pagination:**
```typescript
// Request
GET /api/jobs?page=1&limit=20&status=scheduled

// Response
{
  success: true,
  data: {
    items: [...],
    pagination: {
      page: 1,
      limit: 20,
      total: 156,
      pages: 8
    }
  }
}
```

---

## Security Considerations

### Authentication
- Passwords hashed with bcrypt (cost factor 12)
- JWTs signed with RS256
- Refresh tokens stored as HTTP-only, secure cookies
- CSRF protection via SameSite=Strict

### Authorization
- All routes check `business_id` ownership
- Workers can only see/modify their assigned jobs
- Customers can only see their own data

### Data Protection
- All connections over HTTPS
- PII encrypted at rest (SQLite encryption extension if needed)
- No credit card data stored (Stripe handles)
- Regular automated backups

### Rate Limiting
- Auth endpoints: 5 requests/minute
- API endpoints: 100 requests/minute
- SMS sending: 1 message/second/business

---

## Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────────┐
│                         Railway / Render                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Web Service                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │  Fastify    │  │  SQLite     │  │  Static    │  │   │
│  │  │  API        │  │  Database   │  │  Files     │  │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Persistent Volume (SQLite)             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     External Services                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  Stripe   │  │  Twilio   │  │  Resend   │               │
│  └───────────┘  └───────────┘  └───────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### Environment Variables

```bash
# Database
DATABASE_URL=file:./data/app.db

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_PRICE_ID_ANNUAL=price_...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Email
RESEND_API_KEY=re_...

# App
APP_URL=https://app.yourdomain.com
API_URL=https://api.yourdomain.com
```

---

## Scaling Considerations

### Phase 1: 0-100 Customers
- Single Railway/Render service
- SQLite on persistent volume
- Estimated cost: $20-50/month

### Phase 2: 100-1000 Customers
- Migrate to Postgres (managed)
- Consider read replicas
- Add Redis for caching/sessions
- Estimated cost: $100-300/month

### Phase 3: 1000+ Customers
- Horizontal scaling (multiple API instances)
- CDN for static assets
- Background job queue (BullMQ)
- Consider Turso for edge SQLite
- Estimated cost: $500+/month

---

## Monitoring & Observability

### Logging
- Pino for structured logging (Fastify default)
- Log levels: error, warn, info, debug
- Request/response logging with correlation IDs

### Monitoring (Start Simple)
- Railway/Render built-in metrics
- UptimeRobot for uptime monitoring (free)
- Sentry for error tracking (free tier)

### Key Metrics to Track
- API response times (P50, P95, P99)
- Error rates by endpoint
- Database query times
- External API latencies (Stripe, Twilio)

---

*Next artifact: 02-setup-guide.md*
