# Implementation Tasks

> **Purpose:** Technical implementation guide for TeamPulse. Phase-by-phase breakdown with specific file paths and code patterns.
>
> **Fits in:** Extends Product Tasks (product/03). Use with Setup Guide (02) and Code Templates (04).

## Implementation Overview

| Phase | Focus | Duration | Deliverable |
|-------|-------|----------|-------------|
| 1 | Foundation | Week 1-2 | Auth, DB, app shell |
| 2 | Core Reviews | Week 3-5 | Review cycles, manager reviews, self-reviews |
| 3 | Gap Analysis | Week 6-7 | WOW feature, PDF export |
| 4 | Peer Feedback | Week 8 | 360 feedback system |
| 5 | Goals & Polish | Week 9-10 | Goals, templates, polish |
| 6 | Launch Prep | Week 11-12 | Payments, final testing |

**Total Estimated Hours:** 200-240 hours
**Team:** Solo developer or 2-person team

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Project Bootstrap

**Files to create:**
```
src/
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── posthog.ts          # Analytics helper
│   └── utils.ts            # Utility functions (cn, etc.)
├── middleware.ts           # Clerk auth middleware
└── app/
    ├── layout.tsx          # Root layout with providers
    └── globals.css         # Tailwind base styles
```

**Tasks:**
- [ ] Initialize Next.js project (1h) - See Setup Guide
- [ ] Configure Prisma + PostgreSQL (2h)
- [ ] Set up Clerk authentication (2h)
- [ ] Install and configure shadcn/ui (1h)
- [ ] Set up PostHog analytics (1h)
- [ ] Configure environment variables (1h)
- [ ] Deploy to Vercel (initial) (1h)

**Estimated:** 9 hours

---

### 1.2 Database Schema

**Files to modify:**
```
prisma/
├── schema.prisma           # Full schema from Setup Guide
└── seed.ts                 # Default templates
```

**Tasks:**
- [ ] Create complete Prisma schema (3h)
- [ ] Run initial migration (30m)
- [ ] Create seed script with default templates (2h)
- [ ] Test database connection (30m)
- [ ] Set up Prisma Studio for debugging (30m)

**Estimated:** 6.5 hours

---

### 1.3 Authentication Flow

**Files to create:**
```
src/app/
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── onboarding/
│   └── page.tsx            # Post-signup company setup
```

**Tasks:**
- [ ] Create Clerk sign-in page (1h)
- [ ] Create Clerk sign-up page (1h)
- [ ] Build onboarding flow (company name, first user) (3h)
- [ ] Set up Clerk webhook for user sync (2h)
- [ ] Add analytics events (signup_started, signup_completed) (1h)

**API Routes:**
```typescript
// src/app/api/webhooks/clerk/route.ts
// Handle user.created, organization.created webhooks
```

**Estimated:** 8 hours

---

### 1.4 App Shell & Navigation

**Files to create:**
```
src/
├── app/(dashboard)/
│   ├── layout.tsx          # Dashboard layout with sidebar
│   ├── dashboard/page.tsx  # Main dashboard
│   └── loading.tsx         # Loading state
├── components/
│   ├── sidebar.tsx         # Sidebar navigation
│   ├── header.tsx          # Top header with user menu
│   └── empty-state.tsx     # Reusable empty state
```

**Tasks:**
- [ ] Build responsive sidebar (2h)
- [ ] Build header with user dropdown (1h)
- [ ] Create empty state component (1h)
- [ ] Build dashboard skeleton page (2h)
- [ ] Add mobile responsive drawer (2h)

**Estimated:** 8 hours

---

## Phase 2: Core Reviews (Week 3-5)

### 2.1 Team Management

**Files to create:**
```
src/app/(dashboard)/team/
├── page.tsx                # Team list page
├── loading.tsx
└── [userId]/
    └── page.tsx            # Individual team member
src/components/
├── team-table.tsx          # Team member table
├── add-member-dialog.tsx   # Add member modal
└── csv-import.tsx          # CSV import component
src/app/api/team/
├── route.ts                # GET (list), POST (create)
└── [userId]/route.ts       # GET, PATCH, DELETE
```

**Tasks:**
- [ ] Create Team list page with table (3h)
- [ ] Build Add Team Member dialog (2h)
- [ ] Create Team API routes (CRUD) (3h)
- [ ] Add manager relationship UI (2h)
- [ ] Build CSV import functionality (4h)
- [ ] Add event: team_members_added (30m)

**Estimated:** 14.5 hours

---

### 2.2 Review Cycle Creation

**Files to create:**
```
src/app/(dashboard)/cycles/
├── page.tsx                # Cycles list
├── new/page.tsx            # Create cycle wizard
└── [cycleId]/
    ├── page.tsx            # Cycle dashboard
    └── participants/page.tsx
src/components/
├── cycle-wizard/
│   ├── step-basics.tsx     # Name, dates
│   ├── step-participants.tsx
│   ├── step-deadlines.tsx
│   └── wizard-navigation.tsx
├── cycle-card.tsx
└── cycle-progress.tsx
src/app/api/cycles/
├── route.ts                # GET, POST
└── [cycleId]/route.ts      # GET, PATCH, DELETE
```

**Tasks:**
- [ ] Create Cycles list page (2h)
- [ ] Build cycle creation wizard - Step 1: Basics (2h)
- [ ] Build cycle creation wizard - Step 2: Participants (3h)
- [ ] Build cycle creation wizard - Step 3: Deadlines (2h)
- [ ] Create Cycles API routes (3h)
- [ ] Build cycle dashboard page (4h)
- [ ] Add event: first_cycle_created (30m)

**Estimated:** 16.5 hours

---

### 2.3 Manager Reviews

**Files to create:**
```
src/app/(dashboard)/cycles/[cycleId]/
├── review/[userId]/page.tsx   # Write review
└── reviews/page.tsx           # All reviews for cycle
src/components/
├── review-form/
│   ├── rating-input.tsx       # 1-5 rating component
│   ├── competency-section.tsx
│   └── review-summary.tsx
├── review-sidebar.tsx         # Goals, peer feedback context
└── auto-save-indicator.tsx
src/app/api/reviews/
├── route.ts                   # POST (create)
└── [reviewId]/route.ts        # GET, PATCH
```

**Tasks:**
- [ ] Build rating input component (1-5 scale) (2h)
- [ ] Build competency section with feedback (3h)
- [ ] Create review form page (4h)
- [ ] Implement auto-save with debounce (2h)
- [ ] Build context sidebar (goals, peer feedback) (3h)
- [ ] Create reviews API routes (3h)
- [ ] Add "Submit" vs "Save Draft" states (1h)
- [ ] Add event: first_review_written (30m)

**Estimated:** 18.5 hours

---

### 2.4 Employee Self-Reviews

**Files to create:**
```
src/app/(dashboard)/
├── my-reviews/
│   ├── page.tsx               # Employee's pending reviews
│   └── [cycleId]/page.tsx     # Self-review form
src/components/
├── self-review-form.tsx
└── highlights-section.tsx
src/app/api/self-reviews/
├── route.ts
└── [selfReviewId]/route.ts
```

**Tasks:**
- [ ] Create My Reviews page (employee dashboard) (2h)
- [ ] Build self-review form (reuse rating components) (3h)
- [ ] Add highlights/accomplishments section (1h)
- [ ] Add next period goals section (1h)
- [ ] Create self-review API routes (2h)
- [ ] Add event: self_review_completed (30m)

**Estimated:** 9.5 hours

---

## Phase 3: Gap Analysis - WOW Feature (Week 6-7)

### 3.1 Gap Calculation

**Files to create:**
```
src/lib/
└── gap-analysis.ts            # Gap calculation utilities
src/app/api/reviews/[reviewId]/
└── gap-analysis/route.ts      # GET gap data
```

**Tasks:**
- [ ] Create gap calculation utility (2h)
  - Compare manager rating vs self rating per competency
  - Calculate gap = |manager - self|
  - Flag significant gaps (>= 2 points)
- [ ] Create gap analysis API endpoint (2h)
- [ ] Add sorting by gap size (1h)

**Code pattern:**
```typescript
// src/lib/gap-analysis.ts
export interface GapAnalysisItem {
  competencyName: string;
  managerRating: number;
  selfRating: number;
  gap: number;
  isSignificant: boolean;
  managerFeedback: string | null;
  selfFeedback: string | null;
}

export function calculateGapAnalysis(
  managerRatings: Rating[],
  selfRatings: SelfRating[]
): GapAnalysisItem[] {
  // Implementation
}
```

**Estimated:** 5 hours

---

### 3.2 Gap Analysis Dashboard

**Files to create:**
```
src/app/(dashboard)/cycles/[cycleId]/
└── gap-analysis/[userId]/page.tsx
src/components/
├── gap-analysis/
│   ├── gap-chart.tsx          # Visual comparison
│   ├── gap-item.tsx           # Single competency gap
│   ├── coaching-tip.tsx       # Tips for large gaps
│   └── feedback-comparison.tsx
```

**Tasks:**
- [ ] Build gap analysis page layout (2h)
- [ ] Create side-by-side rating visualization (4h)
- [ ] Add color coding for gap severity (1h)
- [ ] Display written feedback comparison (2h)
- [ ] Add coaching tips for large gaps (2h)
- [ ] Add event: gap_analysis_viewed (30m)

**Estimated:** 11.5 hours

---

### 3.3 PDF Export

**Files to create:**
```
src/components/
└── gap-analysis-pdf.tsx       # React PDF template
src/app/api/reviews/[reviewId]/
└── export-pdf/route.ts        # PDF generation endpoint
```

**Tasks:**
- [ ] Install @react-pdf/renderer (30m)
- [ ] Create PDF template for gap analysis (4h)
- [ ] Build export API endpoint (2h)
- [ ] Add download button to UI (1h)
- [ ] Add event: gap_analysis_pdf_exported (30m)

**Estimated:** 8 hours

---

## Phase 4: Peer Feedback (Week 8)

### 4.1 Peer Selection

**Files to create:**
```
src/components/
├── peer-selector.tsx          # Select peers for employee
└── peer-nomination.tsx        # Employee nominates peers
src/app/api/cycles/[cycleId]/
└── participants/[userId]/peers/route.ts
```

**Tasks:**
- [ ] Build peer selector component (3h)
- [ ] Add peer selection to cycle wizard (2h)
- [ ] Create peer nomination flow (employee nominates) (3h)
- [ ] Create peer API routes (2h)

**Estimated:** 10 hours

---

### 4.2 Peer Feedback Form

**Files to create:**
```
src/app/(dashboard)/
└── peer-feedback/[feedbackId]/page.tsx
src/components/
└── peer-feedback-form.tsx
src/app/api/peer-feedback/
├── route.ts
└── [feedbackId]/route.ts
```

**Tasks:**
- [ ] Build peer feedback form (3-5 questions) (3h)
- [ ] Create peer feedback API routes (2h)
- [ ] Ensure anonymity in storage (1h)
- [ ] Add anonymity assurance in UI (1h)

**Estimated:** 7 hours

---

### 4.3 Feedback Aggregation

**Files to create:**
```
src/lib/
└── peer-aggregation.ts        # Aggregate feedback
src/components/
└── aggregated-feedback.tsx
```

**Tasks:**
- [ ] Create aggregation logic (3h)
- [ ] Build aggregated feedback display (3h)
- [ ] Add minimum response threshold (3+) (1h)
- [ ] Show response count, not names (1h)

**Estimated:** 8 hours

---

## Phase 5: Goals & Polish (Week 9-10)

### 5.1 Goal Management

**Files to create:**
```
src/app/(dashboard)/goals/
├── page.tsx                   # Goals list
└── [goalId]/page.tsx          # Edit goal
src/components/
├── goal-card.tsx
├── goal-form.tsx
└── goal-progress.tsx
src/app/api/goals/
├── route.ts
└── [goalId]/route.ts
```

**Tasks:**
- [ ] Create Goals list page (2h)
- [ ] Build add/edit goal modal (2h)
- [ ] Create goal API routes (2h)
- [ ] Add status update functionality (1h)
- [ ] Add goals to review sidebar (2h)
- [ ] Add goal carry-forward feature (2h)

**Estimated:** 11 hours

---

### 5.2 Templates

**Files to create:**
```
src/app/(dashboard)/templates/
├── page.tsx                   # Templates list
└── [templateId]/page.tsx      # Edit template
src/components/
├── template-card.tsx
├── template-form.tsx
└── competency-editor.tsx
```

**Tasks:**
- [ ] Create Templates list page (2h)
- [ ] Build template selection UI (2h)
- [ ] Build template customization UI (3h)
- [ ] Save customized templates for reuse (2h)
- [ ] Seed 6 default templates (2h)

**Estimated:** 11 hours

---

### 5.3 Email Reminders

**Files to create:**
```
src/lib/
└── email.ts                   # Resend email helper
src/emails/
├── reminder.tsx               # Review reminder
├── self-review-reminder.tsx
├── peer-feedback-request.tsx
└── review-shared.tsx
src/app/api/cron/
└── reminders/route.ts         # Cron endpoint
```

**Tasks:**
- [ ] Set up Resend integration (1h)
- [ ] Create email templates (4h)
- [ ] Build reminder cron job (Vercel Cron) (3h)
- [ ] Send reminders based on deadlines (2h)
- [ ] Add events: email_delivered, email_bounced (1h)

**Estimated:** 11 hours

---

### 5.4 Share Reviews

**Files to create:**
```
src/app/(dashboard)/my-reviews/
└── received/[reviewId]/page.tsx  # View shared review
src/components/
└── share-review-dialog.tsx
```

**Tasks:**
- [ ] Build share confirmation dialog (1h)
- [ ] Send notification email on share (1h)
- [ ] Build employee view of shared review (3h)
- [ ] Add event: review_shared_to_employee (30m)

**Estimated:** 5.5 hours

---

### 5.5 UI Polish

**Tasks:**
- [ ] Add empty states to all list views (2h)
- [ ] Add error boundaries and error states (2h)
- [ ] Add loading skeletons throughout (2h)
- [ ] Mobile responsive audit and fixes (4h)
- [ ] Cross-browser testing (2h)
- [ ] Accessibility audit (ARIA labels, keyboard nav) (3h)

**Estimated:** 15 hours

---

## Phase 6: Launch Prep (Week 11-12)

### 6.1 Payments (Stripe)

**Files to create:**
```
src/app/(dashboard)/settings/
└── billing/page.tsx           # Billing settings
src/app/api/
├── checkout/route.ts          # Create checkout session
├── billing-portal/route.ts    # Customer portal
└── webhooks/stripe/route.ts   # Handle webhooks
src/lib/
└── stripe.ts                  # Stripe helper
```

**Tasks:**
- [ ] Set up Stripe integration (2h)
- [ ] Create checkout session API (2h)
- [ ] Create billing portal API (1h)
- [ ] Handle Stripe webhooks (3h)
- [ ] Build billing settings page (2h)
- [ ] Add trial expiration logic (2h)
- [ ] Add event: payment_completed (30m)

**Estimated:** 12.5 hours

---

### 6.2 Analytics Instrumentation

**Tasks:**
- [ ] Audit all funnel events from PRD (2h)
- [ ] Add missing events (2h)
- [ ] Set up PostHog dashboards (2h)
- [ ] Create conversion funnel in PostHog (1h)
- [ ] Set up retention analysis (1h)

**Estimated:** 8 hours

---

### 6.3 Performance & Security

**Tasks:**
- [ ] Add indexes for common queries (1h)
- [ ] Implement rate limiting on API routes (2h)
- [ ] Audit all routes for proper auth (2h)
- [ ] Add CSRF protection (1h)
- [ ] Set up error monitoring (Sentry) (2h)
- [ ] Load testing basic flows (2h)

**Estimated:** 10 hours

---

### 6.4 Landing Page

**Files to create:**
```
src/app/(marketing)/
├── page.tsx                   # Landing page
├── pricing/page.tsx           # Pricing page
└── layout.tsx                 # Marketing layout
```

**Tasks:**
- [ ] Build landing page following marketing/05 spec (4h)
- [ ] Build pricing page (2h)
- [ ] Add call-to-action buttons (1h)
- [ ] Optimize for SEO (meta tags, OG) (1h)

**Estimated:** 8 hours

---

## Total Hours Summary

| Phase | Hours |
|-------|-------|
| Phase 1: Foundation | 31.5 |
| Phase 2: Core Reviews | 59 |
| Phase 3: Gap Analysis | 24.5 |
| Phase 4: Peer Feedback | 25 |
| Phase 5: Goals & Polish | 53.5 |
| Phase 6: Launch Prep | 38.5 |
| **Total** | **232 hours** |

**At 40 hrs/week:** ~6 weeks (solo dev)
**At 20 hrs/week:** ~12 weeks (part-time)

---

## Priority Order (If Time-Constrained)

If you need to launch faster, prioritize:

### Must Have (Week 1-8)
1. Auth + app shell
2. Team management (basic)
3. Review cycles
4. Manager reviews
5. Self-reviews
6. **Gap analysis** (WOW feature)
7. Share reviews

### Should Have (Week 9-10)
8. Peer feedback
9. Email reminders
10. Templates

### Nice to Have (Post-launch)
11. Goals
12. CSV import
13. PDF export
14. Polish items

---

## Definition of Done (Per Task)

- [ ] Code complete and self-reviewed
- [ ] TypeScript strict mode passes
- [ ] Basic tests for critical paths
- [ ] Analytics events firing
- [ ] Loading and error states handled
- [ ] Mobile responsive
- [ ] Deployed to staging
