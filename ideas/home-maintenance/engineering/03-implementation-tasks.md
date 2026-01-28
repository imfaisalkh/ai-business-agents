# Implementation Tasks

> **Purpose:** Phased breakdown of development work for HomeCrew. Your daily work tracker.
>
> **References:** product/03-tasks.md for user stories, Code Templates (04) for implementation patterns.

## Task Format

- **Depends On:** Task IDs that must complete first (- = no blockers)
- **Acceptance Criteria:** Testable conditions for "done"
- **API Contract:** Request/response schema where applicable

---

## Summary

| Phase | Estimate | Timeline |
|-------|----------|----------|
| Phase 1: Foundation | 34h | Week 1 |
| Phase 2: Core Features | 50h | Weeks 2-3 |
| Phase 3: Polish & Launch | 28h | Week 4 |
| **Total** | **112h** | **4 weeks** |

At 20h/week = 6 weeks to MVP
At 30h/week = 4 weeks to MVP

---

## Phase 1: Foundation (Week 1)

### 1.1 Project Setup

**Reference:** Product Story 1.1

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-1.1.1 | Run setup guide commands (monorepo, packages) | - | 2h | [ ] |
| E-1.1.2 | Configure environment variables | E-1.1.1 | 30m | [ ] |
| E-1.1.3 | Deploy empty app to staging | E-1.1.2 | 1h | [ ] |

**Acceptance Criteria:**
- [ ] `pnpm dev` starts frontend (3000) and backend (3001)
- [ ] `curl localhost:3001/health` returns `{"status":"ok"}`
- [ ] Staging URL responds with app shell

---

### 1.2 Database Schema

**Reference:** Product Story 1.1

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-1.2.1 | Create users table with role column | E-1.1.1 | 30m | [ ] |
| E-1.2.2 | Create businesses table | E-1.2.1 | 30m | [ ] |
| E-1.2.3 | Create customers table | E-1.2.2 | 30m | [ ] |
| E-1.2.4 | Create jobs table | E-1.2.3 | 30m | [ ] |
| E-1.2.5 | Create invoices table | E-1.2.4 | 30m | [ ] |
| E-1.2.6 | Create messages table | E-1.2.5 | 30m | [ ] |
| E-1.2.7 | Add foreign keys and indexes | E-1.2.6 | 30m | [ ] |
| E-1.2.8 | Run migrations | E-1.2.7 | 15m | [ ] |

**Acceptance Criteria:**
- [ ] `pnpm db:push` applies schema without errors
- [ ] `pnpm db:studio` shows all tables with correct columns

---

### 1.3 Authentication

**Reference:** Product Story 1.2

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-1.3.1 | Auth service (createUser, validateCredentials) | E-1.2.8 | 2h | [ ] |
| E-1.3.2 | POST /api/auth/register endpoint | E-1.3.1 | 2h | [ ] |
| E-1.3.3 | POST /api/auth/login endpoint | E-1.3.1 | 1.5h | [ ] |
| E-1.3.4 | Auth middleware (JWT verification) | E-1.3.2 | 1h | [ ] |
| E-1.3.5 | POST /api/auth/logout endpoint | E-1.3.4 | 30m | [ ] |
| E-1.3.6 | POST /api/auth/refresh endpoint | E-1.3.4 | 1h | [ ] |
| E-1.3.7 | GET /api/auth/me endpoint | E-1.3.4 | 30m | [ ] |
| E-1.3.8 | Register page UI | E-1.3.2 | 2h | [ ] |
| E-1.3.9 | Login page UI | E-1.3.3 | 1.5h | [ ] |
| E-1.3.10 | Auth store (Pinia) | E-1.3.3 | 1h | [ ] |
| E-1.3.11 | Route guards (auth middleware) | E-1.3.10 | 1h | [ ] |

**API Contract:**
```
POST /api/auth/register
  Request:  { email, password, name, businessName }
  Response: { data: { user: { id, email, name, role }, accessToken } }
  Cookies:  Sets refreshToken (httpOnly)
  Errors:   400 EMAIL_EXISTS

POST /api/auth/login
  Request:  { email, password }
  Response: { data: { user, accessToken } }
  Errors:   401 INVALID_CREDENTIALS

POST /api/auth/refresh
  Cookies:  Reads refreshToken
  Response: { data: { accessToken } }
  Errors:   401 INVALID_TOKEN

GET /api/auth/me
  Headers:  Authorization: Bearer <token>
  Response: { data: { user, business } }
```

**Acceptance Criteria:**
- [ ] Register creates user + business, returns JWT, sets httpOnly refresh cookie
- [ ] Login returns JWT for valid credentials, 401 for invalid
- [ ] Middleware returns 401 for missing/expired token
- [ ] Route guard redirects unauthenticated users to /login
- [ ] After login, user redirected to dashboard

---

### 1.4 Business Setup

**Reference:** Product Story 1.3

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-1.4.1 | GET /api/businesses/me endpoint | E-1.3.4 | 30m | [ ] |
| E-1.4.2 | PATCH /api/businesses/me endpoint | E-1.4.1 | 1h | [ ] |
| E-1.4.3 | Business setup wizard UI (3 steps) | E-1.4.2 | 2h | [ ] |
| E-1.4.4 | Settings page UI | E-1.4.2 | 1.5h | [ ] |

**Acceptance Criteria:**
- [ ] New user sees setup wizard after first login
- [ ] Wizard captures: business name, address, phone
- [ ] Settings page allows editing business info

---

### 1.5 Base Layout

**Reference:** Product Story 1.4

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-1.5.1 | App layout with sidebar | E-1.1.1 | 2h | [ ] |
| E-1.5.2 | Header with user menu | E-1.3.10 | 1h | [ ] |
| E-1.5.3 | Mobile responsive nav | E-1.5.1 | 1h | [ ] |
| E-1.5.4 | Dashboard page shell | E-1.5.1 | 1h | [ ] |

**UI Mock:**
```
+--------------------------------------------------+
| HomeCrew                       [User V] [Logout] |
+----------+---------------------------------------+
| Dashboard|  Welcome back, Mike!                  |
| Jobs     |  +--------+ +--------+ +--------+     |
| Customers|  | 6 Jobs | | $1,010 | | 2 Open |     |
| Invoices |  | Today  | | Today  | | Invoices|    |
| Messages |  +--------+ +--------+ +--------+     |
| Team     |                                       |
| Settings |  Today's Schedule                     |
|          |  [Job cards...]                       |
+----------+---------------------------------------+
```

**Acceptance Criteria:**
- [ ] Sidebar shows navigation items
- [ ] User menu shows name and logout
- [ ] Dashboard loads after login
- [ ] Mobile hamburger menu works

---

**Phase 1 Total:** 34 hours

---

## Phase 2: Core Features (Weeks 2-3)

### 2.1 Customer Management

**Reference:** Product Epic E2

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-2.1.1 | GET /api/customers (list with search) | E-1.3.4 | 2h | [ ] |
| E-2.1.2 | POST /api/customers (create) | E-1.3.4 | 1h | [ ] |
| E-2.1.3 | GET /api/customers/:id | E-2.1.1 | 30m | [ ] |
| E-2.1.4 | PUT /api/customers/:id | E-2.1.3 | 30m | [ ] |
| E-2.1.5 | DELETE /api/customers/:id | E-2.1.3 | 30m | [ ] |
| E-2.1.6 | Customer list page with data table | E-2.1.1 | 2.5h | [ ] |
| E-2.1.7 | Customer search component | E-2.1.1 | 1h | [ ] |
| E-2.1.8 | Add customer modal | E-2.1.2 | 1.5h | [ ] |
| E-2.1.9 | Edit customer modal | E-2.1.4 | 1h | [ ] |
| E-2.1.10 | Customer profile page | E-2.1.3 | 2h | [ ] |
| E-2.1.11 | Delete confirmation dialog | E-2.1.5 | 30m | [ ] |
| E-2.1.12 | Empty state + loading states | E-2.1.6 | 30m | [ ] |

**API Contract:**
```
GET /api/customers?page=1&limit=20&search=john
  Response: { data: Customer[], meta: { total, page, limit, totalPages } }

POST /api/customers
  Request:  { name, email?, phone?, address?, notes? }
  Response: { data: Customer }
  Errors:   400 VALIDATION_ERROR

GET /api/customers/:id
  Response: { data: Customer }
  Errors:   404 NOT_FOUND

PUT /api/customers/:id
  Request:  { name?, email?, phone?, address?, notes? }
  Response: { data: Customer }

DELETE /api/customers/:id
  Response: { success: true }
```

**Acceptance Criteria:**
- [ ] List shows paginated customers with search
- [ ] Create form validates required fields, shows success toast
- [ ] Edit pre-fills form with existing data
- [ ] Delete shows confirmation modal first
- [ ] Profile page shows customer info, job history, invoice history

**Analytics Events (from PRD MVP Funnel):**
- `customer_created` - First customer added

---

### 2.2 Job Scheduling

**Reference:** Product Epic E3

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-2.2.1 | GET /api/jobs (list with filters) | E-1.3.4 | 2h | [ ] |
| E-2.2.2 | GET /api/jobs/calendar (by date range) | E-2.2.1 | 1h | [ ] |
| E-2.2.3 | POST /api/jobs (create) | E-1.3.4 | 1.5h | [ ] |
| E-2.2.4 | GET /api/jobs/:id | E-2.2.1 | 30m | [ ] |
| E-2.2.5 | PUT /api/jobs/:id | E-2.2.4 | 1h | [ ] |
| E-2.2.6 | DELETE /api/jobs/:id | E-2.2.4 | 30m | [ ] |
| E-2.2.7 | POST /api/jobs/:id/start | E-2.2.4 | 30m | [ ] |
| E-2.2.8 | POST /api/jobs/:id/complete | E-2.2.4 | 30m | [ ] |
| E-2.2.9 | Calendar component (day/week view) | E-2.2.2 | 4h | [ ] |
| E-2.2.10 | Jobs rendered on calendar | E-2.2.9 | 2h | [ ] |
| E-2.2.11 | Create job modal | E-2.2.3 | 2.5h | [ ] |
| E-2.2.12 | CustomerPicker component | E-2.1.7 | 1h | [ ] |
| E-2.2.13 | WorkerPicker component | E-2.2.3 | 1h | [ ] |
| E-2.2.14 | Edit job modal | E-2.2.5 | 1.5h | [ ] |
| E-2.2.15 | Job detail page | E-2.2.4 | 2h | [ ] |
| E-2.2.16 | Filter by worker dropdown | E-2.2.9 | 1h | [ ] |

**API Contract:**
```
GET /api/jobs?page=1&limit=20&status=scheduled&workerId=xxx&startDate=2026-01-28&endDate=2026-02-04
  Response: { data: Job[], meta: { ... } }

GET /api/jobs/calendar?startDate=2026-01-28&endDate=2026-02-04
  Response: { data: { [date]: Job[] } }

POST /api/jobs
  Request:  { customerId, workerId?, title, description?, scheduledDate, scheduledTime, durationMinutes, price?, notes? }
  Response: { data: Job }

PUT /api/jobs/:id
  Request:  { customerId?, workerId?, ... }
  Response: { data: Job }

POST /api/jobs/:id/start
  Response: { data: Job } // status = 'in_progress', startedAt set

POST /api/jobs/:id/complete
  Response: { data: Job } // status = 'completed', completedAt set
```

**Acceptance Criteria:**
- [ ] Calendar shows jobs for current week
- [ ] Click date to create job on that date
- [ ] Click job to view/edit
- [ ] Worker filter shows only that worker's jobs
- [ ] Jobs can be assigned to workers

**Analytics Events:**
- `job_created` - First job created
- `job_completed` - First job completed

---

### 2.3 Worker Management

**Reference:** Product Epic E3, Story 3.3

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-2.3.1 | GET /api/workers (team list) | E-1.3.4 | 1h | [ ] |
| E-2.3.2 | POST /api/workers/invite | E-2.3.1 | 2h | [ ] |
| E-2.3.3 | DELETE /api/workers/:id | E-2.3.1 | 30m | [ ] |
| E-2.3.4 | Worker accept invite flow | E-2.3.2 | 2h | [ ] |
| E-2.3.5 | Team management page | E-2.3.1 | 2h | [ ] |
| E-2.3.6 | Invite worker modal | E-2.3.2 | 1.5h | [ ] |
| E-2.3.7 | Worker invite email template | E-2.3.2 | 1h | [ ] |

**API Contract:**
```
GET /api/workers
  Response: { data: User[] } // role='worker' for this business

POST /api/workers/invite
  Request:  { email, name }
  Response: { data: { inviteToken, expiresAt } }

DELETE /api/workers/:id
  Response: { success: true }
```

**Acceptance Criteria:**
- [ ] Owner can invite worker by email
- [ ] Worker receives email with invite link
- [ ] Worker sets password and joins team
- [ ] Team page shows all workers

**Analytics Events:**
- `worker_invited` - First worker invited

---

### 2.4 Mobile Worker App (PWA)

**Reference:** Product Epic E4

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-2.4.1 | Worker layout (mobile optimized) | E-1.5.1 | 2h | [ ] |
| E-2.4.2 | GET /api/jobs/today (worker's jobs) | E-2.2.1 | 1h | [ ] |
| E-2.4.3 | Today's jobs page (worker view) | E-2.4.2 | 3h | [ ] |
| E-2.4.4 | Job detail page (worker view) | E-2.4.3 | 2h | [ ] |
| E-2.4.5 | Navigate button (Google/Apple Maps) | E-2.4.4 | 30m | [ ] |
| E-2.4.6 | Start job button | E-2.2.7 | 1h | [ ] |
| E-2.4.7 | Complete job button | E-2.2.8 | 1h | [ ] |
| E-2.4.8 | Worker role middleware | E-1.3.4 | 30m | [ ] |

**Acceptance Criteria:**
- [ ] Worker logs in and sees today's jobs
- [ ] Jobs ordered by scheduled time
- [ ] Navigate button opens map app with address
- [ ] Start/Complete updates job status
- [ ] Only workers can access /worker/* routes

**Analytics Events:**
- `job_started` (worker)
- `job_completed` (worker)

---

**Phase 2 Total:** 50 hours

---

## Phase 3: Polish & Launch (Week 4)

### 3.1 Invoicing

**Reference:** Product Epic E5

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-3.1.1 | GET /api/invoices (list) | E-1.3.4 | 1.5h | [ ] |
| E-3.1.2 | POST /api/invoices (create) | E-1.3.4 | 1.5h | [ ] |
| E-3.1.3 | POST /api/invoices/from-job/:jobId | E-3.1.2 | 1h | [ ] |
| E-3.1.4 | GET /api/invoices/:id | E-3.1.1 | 30m | [ ] |
| E-3.1.5 | POST /api/invoices/:id/send | E-3.1.4 | 2h | [ ] |
| E-3.1.6 | POST /api/invoices/:id/mark-paid | E-3.1.4 | 30m | [ ] |
| E-3.1.7 | Stripe integration service | E-3.1.2 | 2h | [ ] |
| E-3.1.8 | Create payment link | E-3.1.7 | 1h | [ ] |
| E-3.1.9 | POST /api/webhooks/stripe | E-3.1.7 | 2h | [ ] |
| E-3.1.10 | Invoice list page | E-3.1.1 | 2h | [ ] |
| E-3.1.11 | Invoice detail page | E-3.1.4 | 2h | [ ] |
| E-3.1.12 | Send invoice modal (email/SMS) | E-3.1.5 | 1.5h | [ ] |
| E-3.1.13 | Invoice email template | E-3.1.5 | 1h | [ ] |
| E-3.1.14 | "Create Invoice" from job button | E-3.1.3 | 30m | [ ] |

**API Contract:**
```
GET /api/invoices?page=1&limit=20&status=sent
  Response: { data: Invoice[], meta: { ... } }

POST /api/invoices
  Request:  { customerId, jobId?, amount, dueDate? }
  Response: { data: Invoice }

POST /api/invoices/from-job/:jobId
  Response: { data: Invoice } // Creates from job.price

POST /api/invoices/:id/send
  Request:  { method: 'email' | 'sms' }
  Response: { data: Invoice } // status = 'sent'

POST /api/invoices/:id/mark-paid
  Response: { data: Invoice } // status = 'paid'
```

**Acceptance Criteria:**
- [ ] Invoice created from completed job
- [ ] Send via email with payment link
- [ ] Customer clicks link, pays via Stripe
- [ ] Webhook marks invoice paid

**Analytics Events:**
- `invoice_sent` - First invoice sent
- `payment_received` - First payment received

---

### 3.2 Two-Way SMS

**Reference:** Product Epic E6

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-3.2.1 | Twilio service (send, receive) | E-1.1.1 | 2h | [ ] |
| E-3.2.2 | POST /api/messages/send | E-3.2.1 | 1h | [ ] |
| E-3.2.3 | POST /api/webhooks/twilio | E-3.2.1 | 1.5h | [ ] |
| E-3.2.4 | GET /api/messages/conversations | E-3.2.1 | 1h | [ ] |
| E-3.2.5 | GET /api/messages/conversations/:customerId | E-3.2.4 | 30m | [ ] |
| E-3.2.6 | Conversation list page | E-3.2.4 | 2h | [ ] |
| E-3.2.7 | Conversation thread UI | E-3.2.5 | 2h | [ ] |
| E-3.2.8 | Send message input | E-3.2.2 | 1h | [ ] |

**Acceptance Criteria:**
- [ ] Owner can send SMS to customer
- [ ] Customer reply appears in conversation
- [ ] Unread indicator on conversations

---

### 3.3 Analytics & Onboarding

**Reference:** PRD MVP Funnel

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-3.3.1 | PostHog plugin setup | E-1.1.1 | 1h | [ ] |
| E-3.3.2 | Analytics composable | E-3.3.1 | 30m | [ ] |
| E-3.3.3 | Track all funnel events | E-3.3.2 | 2h | [ ] |
| E-3.3.4 | Onboarding wizard (post-signup) | E-1.4.3 | 2h | [ ] |
| E-3.3.5 | Progress checklist component | E-3.3.4 | 1h | [ ] |

**Funnel Events to Track:**
```
signup_started
signup_completed
onboarding_completed
first_customer_created
first_worker_invited
first_job_created
first_job_completed
first_invoice_sent
first_payment_received
day_7_active
converted_to_paid
```

---

### 3.4 Error Handling & Polish

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-3.4.1 | Global error handler | E-1.1.1 | 1h | [ ] |
| E-3.4.2 | 404/500 error pages | E-3.4.1 | 1h | [ ] |
| E-3.4.3 | Toast notification system | E-1.1.1 | 1h | [ ] |
| E-3.4.4 | Loading states (skeletons) | E-1.1.1 | 1.5h | [ ] |
| E-3.4.5 | Empty states for all pages | E-1.1.1 | 1h | [ ] |

---

### 3.5 Production Deploy

| Task ID | Task | Depends On | Est | Status |
|---------|------|------------|-----|--------|
| E-3.5.1 | Production environment setup | E-1.1.3 | 1h | [ ] |
| E-3.5.2 | Domain/SSL configuration | E-3.5.1 | 1h | [ ] |
| E-3.5.3 | Environment variables (prod) | E-3.5.1 | 30m | [ ] |
| E-3.5.4 | Deploy frontend to Vercel | E-3.5.2 | 1h | [ ] |
| E-3.5.5 | Deploy backend to Railway | E-3.5.2 | 1h | [ ] |
| E-3.5.6 | Full user journey test | E-3.5.5 | 2h | [ ] |
| E-3.5.7 | Set up error monitoring (Sentry) | E-3.5.5 | 1h | [ ] |

**Acceptance Criteria:**
- [ ] Production URL accessible via HTTPS
- [ ] Full flow works: signup -> login -> create customer -> create job -> complete job -> send invoice -> receive payment
- [ ] Analytics events firing in PostHog dashboard

---

**Phase 3 Total:** 28 hours

---

## Critical Path

```
Setup -> Schema -> Auth API -> Middleware -> Customer API -> Job API -> Calendar UI -> Invoice API -> Deploy
```

**Parallel Opportunities:**
- While backend builds Customer API, frontend can build customer list with mock data
- While backend builds Job API, frontend can build calendar component
- SMS messaging can be built in parallel with Invoicing

---

## Technical Debt Backlog

| ID | Item | Priority | Notes |
|----|------|----------|-------|
| TD-001 | Add unit tests for auth flow | Medium | After MVP launch |
| TD-002 | Add E2E tests (Playwright) | Medium | After MVP launch |
| TD-003 | Set up CI/CD pipeline | Low | When deploy frequency increases |
| TD-004 | Database backups | High | After first paying customer |
| TD-005 | Recurring jobs feature | Medium | Phase 2 feature |
| TD-006 | Push notifications | Medium | Phase 2 feature |

---

## Definition of Done

A task is "done" when:
- [ ] Code compiles without errors
- [ ] Feature works as described
- [ ] Error states handled gracefully
- [ ] Loading states shown
- [ ] Mobile responsive (if UI)
- [ ] Manually tested end-to-end

---

*Last updated: January 29, 2026*
