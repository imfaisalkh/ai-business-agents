# Architecture Decision Record

> **Purpose:** Documents technical architecture decisions for TeamPulse. Guides implementation and explains rationale.
>
> **Fits in:** Foundation for Setup Guide (02) and Implementation Tasks (03). Update when architecture changes.

## System Overview

**Product:** TeamPulse - 360-degree performance review platform for small teams
**Architecture style:** Monolithic full-stack application (appropriate for SLC stage)
**Deployment:** Edge-deployed serverless (Vercel)

```
┌─────────────────────────────────────────────────────────────────┐
│                         TeamPulse                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │   Next.js 15    │    │   Prisma ORM    │    │  PostgreSQL │ │
│  │   (App Router)  │───▶│                 │───▶│  (Supabase) │ │
│  │   React + SSR   │    │   Type-safe DB  │    │             │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │    shadcn/ui    │    │     Clerk       │    │   Resend    │ │
│  │   Components    │    │     Auth        │    │   Email     │ │
│  └─────────────────┘    └─────────────────┘    └─────────────┘ │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │    PostHog      │    │     Stripe      │                    │
│  │   Analytics     │    │   Payments      │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │     Vercel      │
                    │   Deployment    │
                    └─────────────────┘
```

---

## ADR-001: Full-Stack Framework

### Decision
Use **Next.js 15 with App Router** for the full-stack application.

### Context
Need a framework that supports:
- Server-side rendering for SEO (landing pages)
- API routes for backend logic
- Modern React features
- Fast development velocity
- Easy deployment

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Next.js 15 (App Router)** | Full-stack, great DX, Vercel deployment, RSC | Learning curve for App Router |
| Remix | Great data loading, form handling | Smaller ecosystem, less familiar |
| SvelteKit | Performance, simpler mental model | Smaller talent pool, less ecosystem |
| Separate frontend/backend | Maximum flexibility | More complexity, more repos |

### Decision Rationale
Next.js 15 provides the best balance of:
1. **Developer velocity** - Single codebase, file-based routing
2. **Deployment simplicity** - Vercel makes deployment trivial
3. **Type safety** - TypeScript throughout
4. **Ecosystem** - Large community, many integrations
5. **RSC support** - Server components reduce client bundle

### Consequences
- Must learn App Router patterns (different from Pages Router)
- Tied to Vercel for optimal deployment (can self-host if needed)
- Some experimental features may have rough edges

---

## ADR-002: Database & ORM

### Decision
Use **PostgreSQL via Supabase** with **Prisma ORM**.

### Context
Need a database that supports:
- Multi-tenant data isolation
- Complex queries (reviews, ratings, aggregations)
- Reliable and scalable
- Good developer experience

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **PostgreSQL + Prisma** | Type-safe, migrations, relational | Requires hosted service |
| SQLite + Drizzle | Simpler, no external service | Not ideal for multi-tenant |
| MongoDB | Flexible schema | Less suited for relational data |
| Supabase (Postgres) | Managed, auth, realtime | Another vendor to manage |

### Decision Rationale
1. **PostgreSQL** - Relational data model (users, reviews, ratings) fits SQL well
2. **Prisma** - Type-safe queries, great migration system, excellent DX
3. **Supabase** - Managed Postgres with backups, scaling, and connection pooling
4. **Multi-tenant ready** - Row-level security available if needed

### Schema Design Principles
- Every table has `companyId` for tenant isolation
- Soft deletes with `deletedAt` for audit trail
- Timestamps (`createdAt`, `updatedAt`) on all tables
- UUID primary keys for security (no sequential guessing)

### Consequences
- Monthly cost for Supabase (~$25/month on Pro plan)
- Connection pooling needed for serverless (Supabase provides PgBouncer)
- Must carefully manage migrations in production

---

## ADR-003: Authentication

### Decision
Use **Clerk** for authentication.

### Context
Need authentication that supports:
- Email magic links (passwordless)
- Google OAuth
- Organization/team management
- Role-based access control

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Clerk** | Full-featured, great DX, team management | Cost at scale |
| NextAuth.js | Free, flexible | More setup, self-managed |
| Auth0 | Enterprise features | Complex, expensive |
| Supabase Auth | Bundled with DB | Less feature-rich |

### Decision Rationale
1. **Clerk** provides organization management built-in (multi-tenant)
2. Excellent Next.js integration
3. Handles email verification, MFA, session management
4. Free tier covers early stage (up to 5,000 MAU)

### Consequences
- ~$25/month after 5,000 MAU
- Vendor lock-in (auth is hard to migrate)
- Some customization limitations

---

## ADR-004: UI Component Library

### Decision
Use **shadcn/ui** with **Tailwind CSS**.

### Context
Need UI components that are:
- Fast to implement
- Customizable
- Accessible
- Not a dependency (own the code)

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **shadcn/ui** | Own the code, customizable, Radix-based | Some assembly required |
| Chakra UI | Full component library | Bundle size, less customizable |
| Headless UI | Unstyled, accessible | Requires more styling work |
| Material UI | Comprehensive | Heavy, opinionated design |

### Decision Rationale
1. **shadcn/ui** copies components into your codebase - you own them
2. Built on Radix primitives - accessible by default
3. Tailwind CSS integration - consistent styling
4. Perfect for SaaS dashboards

### Consequences
- Must customize for branding (but that's the point)
- Some components need to be built manually
- Requires Tailwind knowledge

---

## ADR-005: Email Service

### Decision
Use **Resend** for transactional email.

### Context
Need email service for:
- Review reminders
- Self-review notifications
- Peer feedback requests
- Welcome emails

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Resend** | Modern API, React Email, great DX | Newer service |
| SendGrid | Established, full-featured | Complex, expensive |
| Postmark | Reliable, simple | Less modern API |
| AWS SES | Cheap at scale | More setup |

### Decision Rationale
1. **Resend** has the best developer experience
2. React Email allows building emails in React
3. Simple pricing ($0 for 3,000 emails/month)
4. Modern API with great documentation

### Consequences
- Limited free tier (need to upgrade as we grow)
- Newer company (less track record)

---

## ADR-006: Analytics

### Decision
Use **PostHog** for product analytics.

### Context
Need analytics for:
- Funnel tracking (signup to paid)
- Feature usage
- Retention metrics
- Session recording (optional)

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **PostHog** | Self-hostable, generous free tier, full-featured | Learning curve |
| Mixpanel | Powerful analytics | Expensive at scale |
| Amplitude | Industry standard | Complex, expensive |
| Plausible | Simple, privacy-focused | Limited features |

### Decision Rationale
1. **PostHog** free tier: 1M events/month
2. Open source, can self-host later
3. Includes feature flags, session recording
4. Good Next.js integration

### Consequences
- Must instrument events carefully
- Dashboard can be overwhelming
- Session recording adds overhead

---

## ADR-007: Payments

### Decision
Use **Stripe** for payments.

### Context
Need payment processing for:
- Subscription billing (monthly/annual)
- Per-seat pricing updates
- Trial to paid conversion
- Invoicing

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Stripe** | Industry standard, great docs | 2.9% + $0.30 fees |
| Paddle | MoR (handles taxes) | Less flexible |
| Lemon Squeezy | Simple, MoR | Newer, less features |

### Decision Rationale
1. **Stripe** is the standard for SaaS
2. Excellent subscription management
3. Customer portal for self-service
4. Handles seat-based pricing well

### Consequences
- Must handle tax compliance separately (or use Stripe Tax)
- 2.9% + $0.30 per transaction
- Webhook handling complexity

---

## Data Model Overview

### Core Entities

```
Company (tenant)
├── User (employees)
│   ├── Role (admin, manager, employee)
│   └── ManagerRelation (who reports to whom)
├── ReviewCycle
│   ├── Participant (who's being reviewed)
│   ├── Template (competencies)
│   └── Deadlines
├── Review
│   ├── ManagerReview
│   ├── SelfReview
│   └── PeerFeedback[]
└── Goal
```

### Prisma Schema (Key Models)

```prisma
model Company {
  id        String   @id @default(uuid())
  name      String
  plan      String   @default("trial")
  users     User[]
  cycles    ReviewCycle[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id         String   @id @default(uuid())
  email      String   @unique
  name       String
  role       Role     @default(EMPLOYEE)
  companyId  String
  company    Company  @relation(fields: [companyId], references: [id])
  managerId  String?
  manager    User?    @relation("ManagerRelation", fields: [managerId], references: [id])
  reports    User[]   @relation("ManagerRelation")
  reviews    Review[]
  selfReviews SelfReview[]
  goals      Goal[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model ReviewCycle {
  id          String   @id @default(uuid())
  name        String
  companyId   String
  company     Company  @relation(fields: [companyId], references: [id])
  templateId  String
  template    Template @relation(fields: [templateId], references: [id])
  startDate   DateTime
  endDate     DateTime
  selfReviewDeadline DateTime
  peerDeadline DateTime
  managerDeadline DateTime
  status      CycleStatus @default(ACTIVE)
  participants Participant[]
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Review {
  id           String   @id @default(uuid())
  cycleId      String
  cycle        ReviewCycle @relation(fields: [cycleId], references: [id])
  revieweeId   String
  reviewee     User     @relation(fields: [revieweeId], references: [id])
  reviewerId   String
  ratings      Rating[]
  overallRating Float?
  overallFeedback String?
  status       ReviewStatus @default(DRAFT)
  sharedAt     DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Rating {
  id           String   @id @default(uuid())
  reviewId     String
  review       Review   @relation(fields: [reviewId], references: [id])
  competencyId String
  score        Int      // 1-5
  feedback     String?
}

model SelfReview {
  id           String   @id @default(uuid())
  cycleId      String
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  ratings      SelfRating[]
  highlights   String?
  nextGoals    String?
  status       ReviewStatus @default(DRAFT)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum Role {
  ADMIN
  MANAGER
  EMPLOYEE
}

enum CycleStatus {
  DRAFT
  ACTIVE
  COMPLETED
  ARCHIVED
}

enum ReviewStatus {
  DRAFT
  SUBMITTED
  SHARED
}
```

---

## Security Considerations

### Data Isolation
- All queries filtered by `companyId`
- Middleware validates user belongs to company
- No cross-tenant data access possible

### Authentication
- All routes protected by Clerk middleware
- API routes verify session token
- Role-based access on sensitive operations

### Data Protection
- Database encrypted at rest (Supabase default)
- HTTPS enforced (Vercel default)
- Sensitive data (peer feedback) aggregated before display

### Audit Trail
- All entities have `createdAt`, `updatedAt`
- Reviews track `sharedAt` for compliance
- Soft deletes preserve history

---

## Performance Considerations

### Database
- Indexes on `companyId`, `cycleId`, `userId`
- Connection pooling via Supabase PgBouncer
- Caching for templates (rarely change)

### Frontend
- Server Components for initial load
- Client Components only for interactivity
- Streaming for large lists

### API
- Edge functions for low latency
- Rate limiting on API routes
- Optimistic updates for form saves

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Vercel                            │
├─────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │  Preview  │  │  Staging  │  │Production │          │
│  │   (PR)    │  │  (main)   │  │ (release) │          │
│  └───────────┘  └───────────┘  └───────────┘          │
│                                      │                  │
│                                      ▼                  │
│                              ┌───────────────┐         │
│                              │  Vercel Edge  │         │
│                              │   Functions   │         │
│                              └───────────────┘         │
└─────────────────────────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
      ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
      │  Supabase   │  │    Clerk    │  │   Stripe    │
      │ (Database)  │  │   (Auth)    │  │ (Payments)  │
      └─────────────┘  └─────────────┘  └─────────────┘
```

### Environments
- **Preview:** Auto-deployed for each PR
- **Staging:** Deploys from `main` branch
- **Production:** Manual promotion from staging

---

## Cost Projections

### Monthly Costs at Launch (0-100 users)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Supabase | Pro | $25/month |
| Clerk | Free (up to 5K MAU) | $0 |
| Resend | Free (3K emails) | $0 |
| PostHog | Free (1M events) | $0 |
| Stripe | Per transaction | ~$0 |
| **Total** | | **~$45/month** |

### Monthly Costs at Growth (500-1000 users)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Supabase | Pro | $25/month |
| Clerk | Growth | $25/month |
| Resend | Pro | $20/month |
| PostHog | Free | $0 |
| Stripe | Per transaction | ~$150/month |
| **Total** | | **~$240/month** |

---

## Future Considerations

### If We Outgrow Vercel
- Can migrate to Docker + AWS/GCP
- Next.js supports standalone output

### If We Need More Database Power
- Supabase scales automatically
- Can migrate to dedicated Postgres if needed

### If We Need Realtime
- Supabase has built-in realtime
- Not needed for SLC but available

### If We Need to Self-Host
- All tools have self-hostable alternatives
- PostHog, Supabase, etc. are open source
