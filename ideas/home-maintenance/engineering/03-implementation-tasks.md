# Implementation Tasks

*Generated on January 28, 2026*

---

## Phase Overview

| Phase | Focus | Duration | Hours |
|-------|-------|----------|-------|
| **Phase 1** | Foundation | Week 1 | 35-40h |
| **Phase 2** | Core Features | Week 2 | 35-40h |
| **Phase 3** | Mobile & Polish | Week 3 | 30-35h |
| **Phase 4** | Launch Prep | Week 4 | 20-25h |

**Total estimated:** 120-140 hours (3-4 weeks at 20-30 hrs/week)

---

## Phase 1: Foundation (Week 1)

### 1.1 Project Setup (Day 1)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Initialize monorepo with pnpm workspaces | P0 | 1h | [ ] |
| Setup Turborepo configuration | P0 | 1h | [ ] |
| Create packages/db with Drizzle schema | P0 | 2h | [ ] |
| Create packages/shared with types | P0 | 1h | [ ] |
| Setup apps/api with Fastify | P0 | 2h | [ ] |
| Setup apps/admin with Nuxt 4 | P0 | 2h | [ ] |
| Configure ESLint and Prettier | P1 | 1h | [ ] |
| Setup environment variables | P0 | 0.5h | [ ] |

**Day 1 Total:** 10.5 hours

### 1.2 Authentication (Days 2-3)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Implement signup API endpoint | P0 | 2h | [ ] |
| Implement login API endpoint | P0 | 2h | [ ] |
| Implement JWT token generation | P0 | 1h | [ ] |
| Implement refresh token flow | P0 | 2h | [ ] |
| Implement logout endpoint | P0 | 0.5h | [ ] |
| Create auth middleware for protected routes | P0 | 1h | [ ] |
| Build signup page UI | P0 | 2h | [ ] |
| Build login page UI | P0 | 1.5h | [ ] |
| Build password reset flow | P1 | 2h | [ ] |
| Test auth flows end-to-end | P0 | 1h | [ ] |

**Days 2-3 Total:** 15 hours

### 1.3 Business Setup (Day 4)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Create business setup wizard UI | P0 | 3h | [ ] |
| Implement business CRUD API | P0 | 1.5h | [ ] |
| Build settings page | P1 | 2h | [ ] |
| Add timezone selection | P1 | 1h | [ ] |

**Day 4 Total:** 7.5 hours

### 1.4 App Shell & Navigation (Day 5)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Create main layout component | P0 | 2h | [ ] |
| Build sidebar navigation | P0 | 1.5h | [ ] |
| Implement mobile responsive nav | P0 | 1h | [ ] |
| Create dashboard placeholder | P0 | 1h | [ ] |
| Setup route guards | P0 | 1h | [ ] |

**Day 5 Total:** 6.5 hours

---

## Phase 2: Core Features (Week 2)

### 2.1 Customer Management (Days 6-7)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Implement customer list API with search | P0 | 2h | [ ] |
| Implement customer CRUD API | P0 | 2h | [ ] |
| Build customer list page with table | P0 | 3h | [ ] |
| Build add customer modal | P0 | 1.5h | [ ] |
| Build edit customer modal | P0 | 1h | [ ] |
| Build customer profile page | P0 | 2.5h | [ ] |
| Add customer search component | P1 | 1h | [ ] |

**Days 6-7 Total:** 13 hours

### 2.2 Job Scheduling (Days 8-10)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Implement job CRUD API | P0 | 2h | [ ] |
| Implement job status update API | P0 | 1h | [ ] |
| Build calendar component (day/week view) | P0 | 4h | [ ] |
| Render jobs on calendar | P0 | 2h | [ ] |
| Build create job modal | P0 | 2.5h | [ ] |
| Build edit job modal | P0 | 1.5h | [ ] |
| Implement drag-drop rescheduling | P1 | 2h | [ ] |
| Add job list view | P1 | 2h | [ ] |
| Build worker assignment UI | P0 | 1.5h | [ ] |

**Days 8-10 Total:** 18.5 hours

### 2.3 Worker Management (Day 11)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Implement worker invite API | P0 | 2h | [ ] |
| Implement worker list API | P0 | 1h | [ ] |
| Build team management page | P0 | 2h | [ ] |
| Build invite worker modal | P0 | 1.5h | [ ] |
| Create worker invite email template | P0 | 1h | [ ] |
| Implement worker onboarding flow | P1 | 2h | [ ] |

**Day 11 Total:** 9.5 hours

---

## Phase 3: Mobile & Invoicing (Week 3)

### 3.1 Mobile Worker App (Days 12-14)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Setup apps/worker as Nuxt PWA | P0 | 2h | [ ] |
| Configure service worker | P0 | 1.5h | [ ] |
| Build worker login flow | P0 | 2h | [ ] |
| Build today's jobs view | P0 | 3h | [ ] |
| Build job detail page | P0 | 2h | [ ] |
| Add navigation button (open Maps) | P0 | 0.5h | [ ] |
| Implement start job action | P0 | 1h | [ ] |
| Implement complete job action | P0 | 1h | [ ] |
| Add photo capture | P1 | 2h | [ ] |
| Configure push notifications | P1 | 2h | [ ] |
| Test on real mobile devices | P0 | 2h | [ ] |

**Days 12-14 Total:** 19 hours

### 3.2 Invoicing (Days 15-17)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Implement invoice CRUD API | P0 | 2h | [ ] |
| Implement generate invoice from job | P0 | 1.5h | [ ] |
| Build invoice list page | P0 | 2.5h | [ ] |
| Build invoice detail view | P0 | 2h | [ ] |
| Integrate Stripe for payments | P0 | 3h | [ ] |
| Create payment link generation | P0 | 1.5h | [ ] |
| Build send invoice UI (email/SMS) | P0 | 2h | [ ] |
| Create invoice email template | P0 | 1.5h | [ ] |
| Implement Stripe webhook handler | P0 | 2h | [ ] |
| Build mark as paid functionality | P0 | 1h | [ ] |

**Days 15-17 Total:** 19 hours

### 3.3 Two-Way Messaging (Day 18)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Integrate Twilio for SMS | P0 | 2h | [ ] |
| Implement send message API | P0 | 1h | [ ] |
| Implement Twilio webhook for incoming | P0 | 2h | [ ] |
| Build conversation list UI | P0 | 2h | [ ] |
| Build conversation thread UI | P0 | 2h | [ ] |
| Add message compose and send | P0 | 1h | [ ] |

**Day 18 Total:** 10 hours

---

## Phase 4: Polish & Launch (Week 4)

### 4.1 Onboarding & UX (Days 19-20)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Build onboarding wizard | P0 | 3h | [ ] |
| Add empty states for all pages | P0 | 2h | [ ] |
| Add loading states/skeletons | P0 | 1.5h | [ ] |
| Improve error handling and messages | P0 | 1.5h | [ ] |
| Add success toasts/notifications | P1 | 1h | [ ] |
| Build in-app notification center | P1 | 2h | [ ] |

**Days 19-20 Total:** 11 hours

### 4.2 Subscription & Billing (Day 21)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Setup Stripe subscription products | P0 | 1h | [ ] |
| Implement subscription checkout | P0 | 2h | [ ] |
| Build subscription management page | P0 | 2h | [ ] |
| Implement trial expiry handling | P0 | 1.5h | [ ] |
| Add billing history view | P1 | 1h | [ ] |

**Day 21 Total:** 7.5 hours

### 4.3 Testing & Bug Fixes (Days 22-23)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Write critical path integration tests | P0 | 3h | [ ] |
| Fix bugs from testing | P0 | 4h | [ ] |
| Performance audit (Lighthouse) | P1 | 1h | [ ] |
| Performance optimizations | P1 | 2h | [ ] |
| Security review (auth, data access) | P0 | 2h | [ ] |
| Cross-browser testing | P0 | 1.5h | [ ] |

**Days 22-23 Total:** 13.5 hours

### 4.4 Deployment (Day 24)

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Setup Railway/Render project | P0 | 1h | [ ] |
| Configure environment variables | P0 | 0.5h | [ ] |
| Setup custom domain | P0 | 1h | [ ] |
| Configure SSL certificates | P0 | 0.5h | [ ] |
| Deploy and test production | P0 | 1.5h | [ ] |
| Setup error monitoring (Sentry) | P1 | 1h | [ ] |
| Setup uptime monitoring | P1 | 0.5h | [ ] |

**Day 24 Total:** 6 hours

---

## Task Summary by Priority

### P0 (Must Have) - 95 hours
- Project setup and auth
- Customer and job management
- Mobile worker app
- Basic invoicing with Stripe
- SMS messaging
- Subscription billing
- Deployment

### P1 (Should Have) - 25 hours
- Password reset flow
- Drag-drop scheduling
- Photo capture
- Push notifications
- Performance optimizations
- Notification center

### P2 (Nice to Have) - Not in MVP
- Recurring jobs
- Route optimization
- Advanced reporting
- API integrations

---

## Sprint Planning

### Sprint 1 (Days 1-5): Foundation
**Goal:** Auth working, app shell complete

**Deliverables:**
- [ ] User can sign up and log in
- [ ] Main navigation and layout working
- [ ] Business setup wizard complete
- [ ] Basic settings page

### Sprint 2 (Days 6-11): Core Features
**Goal:** Customers and jobs manageable

**Deliverables:**
- [ ] Customer CRUD working
- [ ] Job scheduling with calendar
- [ ] Worker management
- [ ] Jobs assignable to workers

### Sprint 3 (Days 12-18): Mobile & Money
**Goal:** Workers can use mobile app, payments working

**Deliverables:**
- [ ] Mobile PWA for workers
- [ ] Invoice creation and sending
- [ ] Stripe payments
- [ ] Two-way SMS

### Sprint 4 (Days 19-24): Polish & Launch
**Goal:** Production-ready

**Deliverables:**
- [ ] Onboarding flow complete
- [ ] Subscription billing working
- [ ] All critical bugs fixed
- [ ] Deployed to production

---

## Definition of Done

A task is "done" when:
- [ ] Code is written and works
- [ ] UI matches design/wireframes
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Mobile responsive (if UI)
- [ ] No console errors
- [ ] Tested manually end-to-end

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Calendar component complexity | Medium | High | Use existing library (FullCalendar) |
| Stripe integration issues | Low | High | Use Stripe Checkout (hosted) |
| Twilio SMS reliability | Low | Medium | Queue messages, retry logic |
| PWA on iOS issues | Medium | Medium | Document limitations, test early |
| Scope creep | High | High | Strict P0/P1 adherence |

---

## Daily Standup Template

```
**What I completed yesterday:**
- [ Task 1 ]
- [ Task 2 ]

**What I'm working on today:**
- [ Task 1 ]
- [ Task 2 ]

**Blockers:**
- [ Any blockers ]

**Hours logged:** X
**Cumulative hours:** Y / 120
```

---

*Next artifact: 04-code-templates.md*
