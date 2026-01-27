# Architecture Decision Record

*Generated for: Performance Evaluation Tool*

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Nuxt 4 (Client-only SPA)                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │   │
│  │  │  Vue 3 +     │  │  shadcn-vue  │  │  Pinia       │          │   │
│  │  │  Composition │  │  Components  │  │  State Mgmt  │          │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                │                                        │
│                                │ HTTP/JSON                              │
│                                ▼                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                              BACKEND                                     │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Fastify API Server                            │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │   │
│  │  │  Routes      │  │  Auth        │  │  Validation  │          │   │
│  │  │  /api/*      │  │  JWT/Session │  │  Zod Schemas │          │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │   │
│  │                                                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │   │
│  │  │  Drizzle ORM │  │  Email       │  │  Jobs        │          │   │
│  │  │  SQLite/PG   │  │  Resend      │  │  BullMQ      │          │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                │                                        │
│                                ▼                                        │
├─────────────────────────────────────────────────────────────────────────┤
│                            DATABASE                                      │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │               SQLite (dev) / PostgreSQL (prod)                   │   │
│  │                        Drizzle ORM                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Nuxt 4 (SPA mode) | Modern Vue framework, fast DX |
| **UI Components** | shadcn-vue | Beautiful, accessible, customizable |
| **State** | Pinia | Vue's official state management |
| **Backend** | Fastify | Fast, lightweight, TypeScript-native |
| **ORM** | Drizzle | Type-safe, performant, SQL-like |
| **Database** | SQLite → PostgreSQL | Simple to start, scales when needed |
| **Auth** | Better Auth | Simple, secure authentication |
| **Email** | Resend | Developer-friendly, reliable |
| **Jobs** | BullMQ (later) | Background job processing |
| **Hosting** | Railway / Render | Simple deployment, good free tiers |

---

## ADR 1: Frontend Framework

### Decision: Nuxt 4 in SPA Mode

**Context:**
- Need to build a performant web app quickly
- Team has Vue experience
- SEO not critical for app (authenticated pages)

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Nuxt 4 SSR | SEO, initial load | Complexity, server costs |
| **Nuxt 4 SPA** | **Simple, fast DX** | **No SEO** |
| Vue 3 + Vite | Lightweight | Missing routing, etc. |
| React + Next | Popular | Team has Vue experience |

**Decision:** Nuxt 4 in SPA mode

**Rationale:**
- All app pages are behind auth (no SEO needed)
- SPA mode is simpler to deploy (static hosting)
- Nuxt provides routing, composables, auto-imports
- Can switch to SSR later if needed

---

## ADR 2: Component Library

### Decision: shadcn-vue

**Context:**
- Need professional-looking UI fast
- Want customizable components (not locked to a library)
- Accessibility matters

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **shadcn-vue** | **Beautiful, customizable, accessible** | **Newer, smaller community** |
| Vuetify | Mature, comprehensive | Heavy, opinionated styling |
| PrimeVue | Feature-rich | Complex, learning curve |
| Headless UI | Accessible, minimal | More work to style |

**Decision:** shadcn-vue

**Rationale:**
- Copy-paste components we own and customize
- Radix-based accessibility built-in
- Modern, clean aesthetic matches our target users
- Can modify without fighting the library

---

## ADR 3: Backend Framework

### Decision: Fastify

**Context:**
- Need fast, reliable API server
- TypeScript support required
- Team can manage own infrastructure

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **Fastify** | **Fast, great TS support** | **Less ecosystem than Express** |
| Express | Mature, huge ecosystem | Slow, poor TS support |
| Hono | Ultra-fast, modern | Very new |
| tRPC | Type-safe E2E | Locks you in, learning curve |

**Decision:** Fastify

**Rationale:**
- Best-in-class performance
- Native TypeScript support
- Schema validation built-in
- Rich plugin ecosystem
- Easy to test

---

## ADR 4: Database & ORM

### Decision: Drizzle ORM + SQLite/PostgreSQL

**Context:**
- Need relational database for reviews, users, teams
- Want type-safety with TypeScript
- Start simple, scale later

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **Drizzle + SQLite/PG** | **Type-safe, performant, SQL-like** | **Newer** |
| Prisma | Popular, good DX | Slow queries, complex migrations |
| Knex | Flexible | Not type-safe |
| TypeORM | Mature | Buggy, complex |

**Decision:** Drizzle ORM

**Rationale:**
- SQL-like syntax (what you write = what runs)
- Excellent TypeScript inference
- Fast migrations with drizzle-kit
- Works great with both SQLite and PostgreSQL
- No runtime overhead

**Database Strategy:**
- Development: SQLite (zero setup)
- Production: PostgreSQL (Railway provides free tier)
- Same Drizzle code works for both

---

## ADR 5: Authentication

### Decision: Better Auth

**Context:**
- Need secure authentication
- Email/password required, Google SSO nice to have
- Don't want to build auth from scratch

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **Better Auth** | **Simple, self-hosted, full-featured** | **Newer** |
| Lucia Auth | Lightweight | More manual setup |
| NextAuth | Popular | React-focused |
| Auth0/Clerk | Managed | Expensive at scale, vendor lock-in |

**Decision:** Better Auth

**Rationale:**
- Full-featured (sessions, OAuth, email verification)
- Self-hosted (no monthly costs, no vendor lock-in)
- Works great with Fastify and Drizzle
- Active development and good docs

---

## ADR 6: Email Service

### Decision: Resend

**Context:**
- Need to send transactional emails (invites, reminders)
- Developer-friendly API preferred
- Low volume initially (<1000/month)

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **Resend** | **Beautiful API, great DX** | **Newer** |
| SendGrid | Mature, reliable | Complex API |
| Postmark | Great deliverability | More expensive |
| AWS SES | Cheap | Complex setup |

**Decision:** Resend

**Rationale:**
- Clean, modern API
- React Email templates (works with Vue too)
- Generous free tier (3,000 emails/month)
- Great deliverability

---

## ADR 7: Deployment

### Decision: Railway (Monorepo)

**Context:**
- Need simple deployment
- Budget-conscious (< $30/month target)
- Want to focus on product, not infrastructure

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| **Railway** | **Simple, monorepo support, good free tier** | **Newer** |
| Render | Similar to Railway | Slightly less DX |
| Vercel | Great for frontend | Complex for backend |
| Digital Ocean | Flexible | More manual setup |
| Self-hosted | Full control | Time sink |

**Decision:** Railway

**Rationale:**
- Deploy from GitHub with zero config
- PostgreSQL included
- Good free tier to start
- Easy to scale when needed
- Supports monorepo structure

---

## Data Model

### Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │────<│  TeamMember │>────│    Team     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Review    │────<│ReviewCycle  │>────│  Template   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Response   │     │PeerFeedback │
└─────────────┘     └─────────────┘
```

### Core Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts |
| `teams` | Organizations/companies |
| `team_members` | Users belonging to teams |
| `templates` | Review templates |
| `template_questions` | Questions in templates |
| `review_cycles` | Review periods |
| `reviews` | Individual review instances |
| `responses` | Answers to questions |
| `peer_feedback_requests` | Peer review assignments |
| `peer_feedback` | Submitted peer feedback |

### Key Relationships

- User belongs to many Teams (via TeamMember)
- Team has many ReviewCycles
- ReviewCycle uses one Template
- Review belongs to ReviewCycle
- Review has many Responses
- PeerFeedback links to Review

---

## API Structure

### Route Organization

```
/api
├── /auth
│   ├── POST /signup
│   ├── POST /login
│   ├── POST /logout
│   └── GET  /me
│
├── /teams
│   ├── GET  /
│   ├── POST /
│   ├── GET  /:id
│   └── PUT  /:id
│
├── /members
│   ├── GET  /
│   ├── POST /
│   ├── POST /invite
│   └── DELETE /:id
│
├── /templates
│   ├── GET  /
│   ├── GET  /:id
│   ├── POST /
│   └── PUT  /:id
│
├── /cycles
│   ├── GET  /
│   ├── POST /
│   ├── GET  /:id
│   ├── PUT  /:id
│   └── POST /:id/launch
│
├── /reviews
│   ├── GET  /
│   ├── GET  /:id
│   ├── PUT  /:id
│   └── POST /:id/submit
│
└── /feedback
    ├── GET  /pending
    ├── GET  /:id
    └── POST /:id/submit
```

---

## Security Considerations

### Authentication

- Sessions stored in database (not JWT)
- CSRF protection enabled
- Secure cookie settings (httpOnly, sameSite, secure)

### Authorization

- Role-based access (admin, manager, employee)
- Team-scoped permissions
- Managers can only see their direct reports
- Peer feedback anonymized at database level

### Data Protection

- Passwords hashed with Argon2
- PII encrypted at rest
- SQL injection prevented via Drizzle parameterization
- Rate limiting on auth endpoints

---

## Performance Considerations

### Frontend

- Code splitting by route
- Lazy loading for heavy components
- Image optimization (if needed)
- CDN for static assets

### Backend

- Database connection pooling
- Query optimization (indexes on foreign keys)
- Caching for templates (rarely change)
- Background jobs for emails

### Database Indexes

```sql
-- Critical indexes
CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_reviews_cycle ON reviews(cycle_id);
CREATE INDEX idx_reviews_employee ON reviews(employee_id);
CREATE INDEX idx_responses_review ON responses(review_id);
CREATE INDEX idx_peer_feedback_review ON peer_feedback(review_id);
```

---

## Scalability Path

### Phase 1: MVP (Current)
- Single Railway instance
- SQLite or PostgreSQL
- <100 concurrent users

### Phase 2: Growth
- PostgreSQL with connection pooling
- Redis for sessions/caching
- Background job queue (BullMQ)
- 100-1000 concurrent users

### Phase 3: Scale
- Database read replicas
- CDN for frontend
- Horizontal API scaling
- 1000+ concurrent users

---

## Technical Debt Boundaries

### Acceptable for MVP
- No mobile app (web only)
- Basic error handling
- Manual deployments (not CI/CD)
- Minimal logging

### Must Fix Before Scale
- Proper error tracking (Sentry)
- CI/CD pipeline
- Comprehensive logging
- Database backups
- Monitoring dashboards

### Never Compromise
- Security (auth, encryption)
- Data integrity (transactions)
- User privacy (peer feedback anonymization)

---

*Next artifact: 02-setup-guide.md*
