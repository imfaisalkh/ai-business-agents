# Development Tasks

*Generated on January 28, 2026*

---

## Epic Overview

| Epic | Description | Estimate | Priority |
|------|-------------|----------|----------|
| E1: Foundation | Auth, DB, API scaffold, UI shell | 3-4 days | P0 |
| E2: Customer Management | Customer CRUD, search, profile | 2 days | P0 |
| E3: Job Scheduling | Jobs, calendar, assignments | 3-4 days | P0 |
| E4: Mobile Worker App | PWA for workers | 3 days | P0 |
| E5: Invoicing | Invoice generation, sending, payments | 3 days | P0 |
| E6: Messaging | Two-way SMS with customers | 2 days | P1 |
| E7: Polish & Launch | Onboarding, notifications, bugs | 2-3 days | P0 |

**Total estimate:** 18-23 days (3-4 weeks at 20 hrs/week)

---

## E1: Foundation

### Story 1.1: Project Setup
**As a developer, I want the project scaffolded so I can start building features.**

| Task | Estimate | Details |
|------|----------|---------|
| 1.1.1 Initialize monorepo | 2h | pnpm workspaces, Turborepo |
| 1.1.2 Setup Nuxt 4 frontend | 2h | Client-only SPA, shadcn-vue |
| 1.1.3 Setup Fastify backend | 2h | TypeScript, folder structure |
| 1.1.4 Setup Drizzle + SQLite | 2h | Schema, migrations, seed |
| 1.1.5 Configure deployment | 2h | Railway/Render, CI/CD |
| 1.1.6 Setup dev environment | 1h | .env, scripts, README |

**Total: 11 hours**

### Story 1.2: Authentication
**As a user, I want to sign up and log in so I can access my account.**

| Task | Estimate | Details |
|------|----------|---------|
| 1.2.1 DB schema: users, sessions | 1h | Drizzle schema |
| 1.2.2 Signup API endpoint | 2h | Email/password, validation |
| 1.2.3 Login API endpoint | 2h | Session creation, JWT |
| 1.2.4 Password reset flow | 2h | Email token, reset page |
| 1.2.5 Signup page UI | 2h | Form, validation, errors |
| 1.2.6 Login page UI | 1h | Form, redirect |
| 1.2.7 Auth middleware | 1h | Protect routes |

**Total: 11 hours**

### Story 1.3: Business Setup
**As an owner, I want to set up my business profile after signup.**

| Task | Estimate | Details |
|------|----------|---------|
| 1.3.1 DB schema: businesses | 1h | Name, address, phone, logo |
| 1.3.2 Business create/update API | 2h | CRUD endpoints |
| 1.3.3 Business setup wizard UI | 2h | Step-by-step form |
| 1.3.4 Settings page UI | 2h | Edit business info |

**Total: 7 hours**

### Story 1.4: App Shell
**As a user, I want consistent navigation so I can move between features.**

| Task | Estimate | Details |
|------|----------|---------|
| 1.4.1 Layout component | 2h | Sidebar, header, main area |
| 1.4.2 Navigation menu | 1h | Dashboard, Jobs, Customers, Invoices, Messages |
| 1.4.3 Mobile responsive nav | 1h | Hamburger menu, slide-out |
| 1.4.4 Dashboard placeholder | 1h | Today's jobs summary |

**Total: 5 hours**

---

## E2: Customer Management

### Story 2.1: Customer CRUD
**As an owner, I want to add and manage customers.**

| Task | Estimate | Details |
|------|----------|---------|
| 2.1.1 DB schema: customers | 1h | Name, address, phone, email, notes |
| 2.1.2 Customer API endpoints | 2h | List, get, create, update, delete |
| 2.1.3 Customer list page | 2h | Table with search, pagination |
| 2.1.4 Add customer modal | 1h | Form, validation |
| 2.1.5 Edit customer modal | 1h | Prefilled form |
| 2.1.6 Customer profile page | 2h | Info, notes, history |

**Total: 9 hours**

### Story 2.2: Customer Search
**As an owner, I want to quickly find a customer by name or phone.**

| Task | Estimate | Details |
|------|----------|---------|
| 2.2.1 Search API endpoint | 1h | Full-text search on name, phone, email |
| 2.2.2 Search input component | 1h | Debounced input, results dropdown |
| 2.2.3 Integration in job creation | 1h | Customer picker uses search |

**Total: 3 hours**

---

## E3: Job Scheduling

### Story 3.1: Job CRUD
**As an owner, I want to create and manage jobs.**

| Task | Estimate | Details |
|------|----------|---------|
| 3.1.1 DB schema: jobs | 1h | customer_id, worker_id, date, time, duration, status, price, notes |
| 3.1.2 Job API endpoints | 2h | List, get, create, update, delete |
| 3.1.3 Job list view | 2h | Table or list format |
| 3.1.4 Create job modal | 2h | Customer select, date/time, worker, price |
| 3.1.5 Edit job modal | 1h | Update any field |
| 3.1.6 Job status updates | 1h | Scheduled → In Progress → Complete |

**Total: 9 hours**

### Story 3.2: Calendar View
**As an owner, I want to see all jobs on a calendar.**

| Task | Estimate | Details |
|------|----------|---------|
| 3.2.1 Calendar component | 3h | Day/week view, time slots |
| 3.2.2 Jobs on calendar | 2h | Render jobs as blocks |
| 3.2.3 Click job to view/edit | 1h | Open job modal |
| 3.2.4 Filter by worker | 1h | Dropdown to filter view |

**Total: 7 hours**

### Story 3.3: Worker Management
**As an owner, I want to add workers to my team.**

| Task | Estimate | Details |
|------|----------|---------|
| 3.3.1 DB schema: workers | 1h | user_id, business_id, name, phone, role |
| 3.3.2 Worker API endpoints | 2h | List, invite, update, remove |
| 3.3.3 Team page UI | 2h | List workers, invite button |
| 3.3.4 Invite worker flow | 2h | Email/SMS invite, worker signup |
| 3.3.5 Worker assignment in job | 1h | Dropdown to assign worker |

**Total: 8 hours**

### Story 3.4: Recurring Jobs
**As an owner, I want to schedule recurring jobs.**

| Task | Estimate | Details |
|------|----------|---------|
| 3.4.1 DB schema: recurring rules | 1h | frequency, interval, end_date |
| 3.4.2 Recurring job API | 2h | Create series, generate instances |
| 3.4.3 UI: recurring option in job modal | 1h | Checkbox, frequency picker |
| 3.4.4 Edit series vs instance | 1h | Choice when editing recurring |

**Total: 5 hours**

---

## E4: Mobile Worker App

### Story 4.1: Worker PWA Shell
**As a worker, I want to access my jobs from my phone.**

| Task | Estimate | Details |
|------|----------|---------|
| 4.1.1 PWA configuration | 2h | manifest.json, service worker |
| 4.1.2 Mobile-optimized layout | 2h | Full-screen, touch-friendly |
| 4.1.3 Worker auth flow | 1h | Login, session persistence |
| 4.1.4 Install prompt | 1h | Add to home screen prompt |

**Total: 6 hours**

### Story 4.2: Today's Jobs
**As a worker, I want to see my jobs for today.**

| Task | Estimate | Details |
|------|----------|---------|
| 4.2.1 Today's jobs API | 1h | Filter by worker, date |
| 4.2.2 Job list UI (mobile) | 2h | Card-based list |
| 4.2.3 Job detail page | 2h | Customer info, address, notes |
| 4.2.4 Navigate button | 1h | Open Google/Apple Maps |

**Total: 6 hours**

### Story 4.3: Job Actions
**As a worker, I want to start and complete jobs.**

| Task | Estimate | Details |
|------|----------|---------|
| 4.3.1 Start job API | 1h | Update status, log time |
| 4.3.2 Complete job API | 1h | Update status, log time |
| 4.3.3 Start/complete buttons | 1h | State changes in UI |
| 4.3.4 Photo capture | 2h | Camera access, upload to storage |

**Total: 5 hours**

### Story 4.4: Push Notifications
**As a worker, I want to be notified of new or changed jobs.**

| Task | Estimate | Details |
|------|----------|---------|
| 4.4.1 Push notification setup | 2h | FCM or web push |
| 4.4.2 Notification triggers | 2h | New job, job rescheduled |
| 4.4.3 Worker preferences | 1h | Enable/disable notifications |

**Total: 5 hours**

---

## E5: Invoicing

### Story 5.1: Invoice Generation
**As an owner, I want to create invoices from completed jobs.**

| Task | Estimate | Details |
|------|----------|---------|
| 5.1.1 DB schema: invoices | 1h | job_id, customer_id, amount, status, sent_at, paid_at |
| 5.1.2 Invoice API endpoints | 2h | Create, list, get, update |
| 5.1.3 Generate invoice from job | 1h | One-click from completed job |
| 5.1.4 Invoice list page | 2h | Filter by status, search |
| 5.1.5 Invoice detail view | 2h | Full invoice display |

**Total: 8 hours**

### Story 5.2: Send Invoice
**As an owner, I want to send invoices to customers.**

| Task | Estimate | Details |
|------|----------|---------|
| 5.2.1 Invoice email template | 2h | Professional HTML email |
| 5.2.2 Send invoice API | 1h | Email via Resend/Postmark |
| 5.2.3 Send via SMS | 1h | Text with payment link |
| 5.2.4 Track sent status | 1h | Update invoice, show in UI |

**Total: 5 hours**

### Story 5.3: Online Payments
**As a customer, I want to pay invoices online.**

| Task | Estimate | Details |
|------|----------|---------|
| 5.3.1 Stripe integration | 2h | Stripe account, API keys |
| 5.3.2 Payment page | 2h | Public page with Stripe Checkout |
| 5.3.3 Webhook handler | 2h | Handle payment success |
| 5.3.4 Payment confirmation | 1h | Receipt email, status update |

**Total: 7 hours**

### Story 5.4: Invoice Reminders
**As an owner, I want overdue invoices to be followed up automatically.**

| Task | Estimate | Details |
|------|----------|---------|
| 5.4.1 Reminder schedule | 1h | 7, 14, 30 days overdue |
| 5.4.2 Reminder job (cron) | 2h | Daily check, send reminders |
| 5.4.3 Manual reminder button | 1h | Send reminder from invoice view |

**Total: 4 hours**

---

## E6: Messaging

### Story 6.1: SMS Setup
**As an owner, I want to send and receive texts with customers.**

| Task | Estimate | Details |
|------|----------|---------|
| 6.1.1 Twilio integration | 2h | Account, phone number, API |
| 6.1.2 DB schema: messages | 1h | customer_id, direction, body, timestamp |
| 6.1.3 Send SMS API | 1h | Send message to customer |
| 6.1.4 Receive SMS webhook | 2h | Handle incoming messages |

**Total: 6 hours**

### Story 6.2: Conversation UI
**As an owner, I want to see message history with each customer.**

| Task | Estimate | Details |
|------|----------|---------|
| 6.2.1 Conversation list | 2h | All customers with recent message |
| 6.2.2 Conversation thread | 2h | Chat-style message display |
| 6.2.3 Send message UI | 1h | Input field, send button |
| 6.2.4 Real-time updates | 1h | New messages appear instantly |

**Total: 6 hours**

### Story 6.3: Auto-Messages
**As an owner, I want appointment reminders sent automatically.**

| Task | Estimate | Details |
|------|----------|---------|
| 6.3.1 Reminder templates | 1h | Configurable message text |
| 6.3.2 Reminder scheduler | 2h | Send day-before reminder |
| 6.3.3 On-my-way from worker app | 1h | Quick send button |

**Total: 4 hours**

---

## E7: Polish & Launch

### Story 7.1: Onboarding Flow
**As a new user, I want to be guided through setup.**

| Task | Estimate | Details |
|------|----------|---------|
| 7.1.1 Onboarding wizard | 3h | Step 1: Business, Step 2: First customer, Step 3: First job |
| 7.1.2 Progress tracking | 1h | Show completion percentage |
| 7.1.3 Skip/finish later option | 1h | Allow skipping non-essential steps |

**Total: 5 hours**

### Story 7.2: Notifications
**As a user, I want to be notified of important events.**

| Task | Estimate | Details |
|------|----------|---------|
| 7.2.1 In-app notification center | 2h | Bell icon, dropdown list |
| 7.2.2 Email notifications | 2h | Job assigned, payment received |
| 7.2.3 Notification preferences | 1h | Enable/disable per type |

**Total: 5 hours**

### Story 7.3: Bug Fixes & Performance
**As a user, I want the app to be fast and reliable.**

| Task | Estimate | Details |
|------|----------|---------|
| 7.3.1 Performance audit | 2h | Lighthouse, load testing |
| 7.3.2 Bug fix buffer | 4h | Address issues from testing |
| 7.3.3 Error handling | 2h | User-friendly error messages |
| 7.3.4 Loading states | 1h | Skeletons, spinners |

**Total: 9 hours**

### Story 7.4: Billing & Subscription
**As an owner, I want to subscribe and manage my billing.**

| Task | Estimate | Details |
|------|----------|---------|
| 7.4.1 Stripe subscription setup | 2h | Products, prices, checkout |
| 7.4.2 Subscription page | 2h | Current plan, upgrade, cancel |
| 7.4.3 Trial expiry handling | 1h | Prompt to subscribe, grace period |
| 7.4.4 Billing history | 1h | Past invoices from Stripe |

**Total: 6 hours**

---

## Task Summary by Week

### Week 1: Foundation + Customers
| Epic | Hours |
|------|-------|
| E1: Foundation | 34h |
| E2: Customer Management | 12h |
| **Total** | **46h** |

*Note: At 20 hrs/week, Week 1 may extend to 10 days*

### Week 2: Jobs + Calendar
| Epic | Hours |
|------|-------|
| E3: Job Scheduling | 29h |
| **Total** | **29h** |

### Week 3: Mobile + Invoicing
| Epic | Hours |
|------|-------|
| E4: Mobile Worker App | 22h |
| E5: Invoicing | 24h |
| **Total** | **46h** |

*Note: At 20 hrs/week, Week 3 may extend*

### Week 4: Messaging + Polish
| Epic | Hours |
|------|-------|
| E6: Messaging | 16h |
| E7: Polish & Launch | 25h |
| **Total** | **41h** |

---

## Prioritization Notes

### Must Have for MVP (P0)
- Auth + business setup
- Customer CRUD
- Job creation + calendar
- Mobile worker app (view + complete jobs)
- Basic invoicing (generate + send + Stripe)

### Should Have for Launch (P1)
- Two-way SMS
- Auto-reminders (jobs + invoices)
- Recurring jobs
- Photo capture

### Nice to Have (P2) - Post-Launch
- Push notifications
- Advanced search
- Route optimization
- Estimates/quotes

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Calendar component complexity | Use existing library (FullCalendar, shadcn) |
| Twilio SMS reliability | Queue messages, retry on failure |
| Stripe integration issues | Use Stripe Checkout (hosted page) |
| Mobile app performance | Progressive loading, offline-first for job list |
| Scope creep | Strict P0/P1/P2 adherence |

---

*Next artifact: 04-product-metrics.md*
