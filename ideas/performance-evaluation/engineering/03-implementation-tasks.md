# Implementation Tasks

> **Purpose:** Phased breakdown of development work for TeamPulse. Your daily work tracker.
>
> **References:** PRD (product/02-prd.md) for user stories, Code Templates (04) for implementation patterns.
>
> **Timeline:** 10-12 weeks to SLC launch (per PRD)

## Task Format

- **Depends On:** Task IDs that must complete first (- = no blockers)
- **Acceptance Criteria:** Testable conditions for "done"
- **API Contract:** Request/response schema where applicable
- **User Stories:** Links to PRD user story IDs

---

## Phase 1: Foundation (Weeks 1-2)

### 1.1 Project Setup

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-1.1.1 | Run setup guide commands (Next.js, dependencies) | - | [ ] | 2h |
| E-1.1.2 | Configure environment variables (Supabase, Stripe, Resend, PostHog) | E-1.1.1 | [ ] | 1h |
| E-1.1.3 | Setup Supabase project and apply schema | E-1.1.1 | [ ] | 30m |
| E-1.1.4 | Configure Supabase Auth (middleware, client setup) | E-1.1.2 | [ ] | 2h |
| E-1.1.5 | Deploy empty app to Vercel staging | E-1.1.4 | [ ] | 1h |

**Acceptance Criteria:**
- [ ] `pnpm dev` starts app on port 3000
- [ ] Can sign up and sign in via Supabase Auth
- [ ] Staging URL responds with protected routes working

---

### 1.2 Database Schema

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-1.2.1 | Apply SQL schema to Supabase (all tables from TRD) | E-1.1.3 | [ ] | 3h |
| E-1.2.2 | Configure RLS policies for all tables | E-1.2.1 | [ ] | 30m |
| E-1.2.3 | Seed system templates via SQL | E-1.2.2 | [ ] | 2h |
| E-1.2.4 | Verify tables in Supabase Dashboard | E-1.2.2 | [ ] | 15m |

**Acceptance Criteria:**
- [ ] All tables visible in Supabase Table Editor
- [ ] RLS policies applied and tested
- [ ] Seed creates 4 system templates with competencies

---

### 1.3 Multi-Tenant Foundation

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-1.3.1 | Create Organization model and CRUD actions | E-1.2.2 | [ ] | 2h |
| E-1.3.2 | Auto-create profile on Supabase auth signup (trigger) | E-1.1.4 | [ ] | 1h |
| E-1.3.3 | Create onboarding flow (create org, invite team) | E-1.3.1 | [ ] | 4h |
| E-1.3.4 | Add organization context via RLS policies | E-1.3.2 | [ ] | 2h |
| E-1.3.5 | Role-based authorization in server actions | E-1.3.4 | [ ] | 3h |

**API Contract:**

```typescript
// Server Actions: src/actions/organization.ts

createOrganization({ name: string, slug: string })
  Output: { success: true, data: Organization }
  Errors: SLUG_TAKEN

inviteTeamMember({ email: string, role: UserRole })
  Output: { success: true }
  Errors: ALREADY_MEMBER, LIMIT_EXCEEDED
```

**Acceptance Criteria:**
- [ ] New user creates org during onboarding
- [ ] User can invite team members via email
- [ ] All queries filtered by organizationId
- [ ] Role checks block unauthorized actions

---

### 1.4 Base Layout & Navigation

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-1.4.1 | Dashboard layout with sidebar (shadcn) | E-1.1.1 | [ ] | 3h |
| E-1.4.2 | Header with user menu (Supabase user dropdown) | E-1.1.4 | [ ] | 1h |
| E-1.4.3 | Mobile responsive navigation | E-1.4.1 | [ ] | 2h |
| E-1.4.4 | Empty state dashboard | E-1.4.1 | [ ] | 1h |

**UI Mock (from PRD):**
```
+------------------------------------------------------------------+
| TeamPulse        [Search...]        [Bell] [Settings] [Avatar v] |
+------------------------------------------------------------------+
| [Sidebar]        Dashboard                                        |
| Dashboard*                                                        |
| Review Cycles    Hello, Sarah! Here's your team's status.        |
| Team                                                              |
| Goals            +------------------+  +------------------+       |
| Templates        | Active Cycle     |  | Completion Rate |       |
|                  | Q1 2026 Reviews  |  |     67%         |       |
+------------------------------------------------------------------+
```

**Acceptance Criteria:**
- [ ] Sidebar navigation works on desktop
- [ ] Collapsible sidebar on mobile
- [ ] User menu shows name and sign out
- [ ] Empty state shows CTA to create first cycle

---

## Phase 2: Review Cycle Management (Weeks 3-4)

**User Stories:** US-001, US-002, US-010 (FR-1.1 through FR-1.8)

### 2.1 Review Cycle CRUD

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-2.1.1 | Review cycle list page | E-1.4.1 | [ ] | 2h |
| E-2.1.2 | Create cycle wizard (step 1: basics) | E-2.1.1 | [ ] | 3h |
| E-2.1.3 | Create cycle wizard (step 2: participants) | E-2.1.2 | [ ] | 3h |
| E-2.1.4 | Create cycle wizard (step 3: schedule) | E-2.1.3 | [ ] | 2h |
| E-2.1.5 | Cycle detail/progress page | E-2.1.4 | [ ] | 4h |
| E-2.1.6 | Start/activate cycle action | E-2.1.5 | [ ] | 1h |

**API Contract:**

```typescript
// Server Actions: src/actions/cycles.ts

getCycles({ status?: CycleStatus })
  Output: { data: ReviewCycle[], meta: { total } }

createCycle({
  name: string,
  templateId: string,
  startDate: Date,
  endDate: Date,
  selfReviewDue: Date,
  peerFeedbackDue: Date,
  managerReviewDue: Date,
  participantIds: string[]
})
  Output: { success: true, data: ReviewCycle }
  Errors: INVALID_DATES, NO_PARTICIPANTS

getCycle({ id: string })
  Output: { data: ReviewCycle & { participants, reviews, selfReviews } }
  Errors: NOT_FOUND

activateCycle({ id: string })
  Output: { success: true }
  Errors: ALREADY_ACTIVE, NO_PARTICIPANTS
```

**Acceptance Criteria:**
- [ ] FR-1.1: Create cycle with name, start date, end date
- [ ] FR-1.2: Add participants from team
- [ ] FR-1.3: Select template from library
- [ ] FR-1.4: Set self-review deadline
- [ ] FR-1.5: Set peer feedback deadline
- [ ] FR-1.6: Set manager review deadline
- [ ] FR-1.8: View cycle progress (completed vs pending)

---

### 2.2 Template System

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-2.2.1 | Template list page | E-1.4.1 | [ ] | 2h |
| E-2.2.2 | Template preview component | E-2.2.1 | [ ] | 2h |
| E-2.2.3 | Clone/customize template | E-2.2.2 | [ ] | 3h |
| E-2.2.4 | Template selector in cycle wizard | E-2.2.2 | [ ] | 2h |

**API Contract:**

```typescript
// Server Actions: src/actions/templates.ts

getTemplates()
  Output: { data: Template[] } // System + org templates

getTemplate({ id: string })
  Output: { data: Template & { competencies } }

cloneTemplate({ templateId: string, name: string })
  Output: { success: true, data: Template }

updateTemplate({ id: string, competencies: [...] })
  Output: { success: true, data: Template }
  Errors: SYSTEM_TEMPLATE (can't edit system templates)
```

**Acceptance Criteria:**
- [ ] FR-7.1-7.6: Display all 4 system templates
- [ ] FR-7.7: Each shows 5-8 competencies with descriptions
- [ ] FR-7.8: Can customize any template
- [ ] FR-7.9: Can save customized templates for reuse

---

### 2.3 Team Management

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-2.3.1 | Team members list page | E-1.3.2 | [ ] | 2h |
| E-2.3.2 | Member profile page (edit role, manager) | E-2.3.1 | [ ] | 3h |
| E-2.3.3 | Invite member form | E-2.3.1 | [ ] | 2h |
| E-2.3.4 | Set manager relationships | E-2.3.2 | [ ] | 2h |

**API Contract:**

```typescript
// Server Actions: src/actions/team.ts

getTeamMembers()
  Output: { data: User[] & { manager, directReports } }

updateMember({ id, role?, managerId?, jobTitle?, level? })
  Output: { success: true, data: User }

inviteMember({ email, name, role })
  Output: { success: true } // Sends invite email
  Errors: ALREADY_MEMBER

removeMember({ id: string })
  Output: { success: true }
  Errors: CANNOT_REMOVE_OWNER
```

**Acceptance Criteria:**
- [ ] List all team members with role, job title
- [ ] Edit member details (role, manager, title, level)
- [ ] Invite new members via email
- [ ] Set manager relationships (for review assignments)

---

## Phase 3: Core Review Workflow (Weeks 5-7)

**User Stories:** US-003, US-004, US-005, US-006, US-007, US-008, US-011, US-012

### 3.1 Manager Review Writing

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-3.1.1 | Review writing page (form with competencies) | E-2.1.5 | [ ] | 4h |
| E-3.1.2 | Rating input component (1-5 scale) | E-3.1.1 | [ ] | 2h |
| E-3.1.3 | Feedback text editor per competency | E-3.1.1 | [ ] | 2h |
| E-3.1.4 | Overall rating and summary | E-3.1.1 | [ ] | 1h |
| E-3.1.5 | Auto-save functionality (debounced) | E-3.1.1 | [ ] | 3h |
| E-3.1.6 | Peer feedback sidebar (read-only) | E-3.1.1 | [ ] | 2h |
| E-3.1.7 | Goals sidebar (read-only) | E-3.1.1 | [ ] | 1h |
| E-3.1.8 | Submit review action | E-3.1.4 | [ ] | 2h |

**API Contract:**

```typescript
// Server Actions: src/actions/reviews.ts

getReview({ cycleId: string, subjectId: string })
  Output: { data: Review & { ratings, subject, peerFeedback, goals } }
  Errors: NOT_FOUND, UNAUTHORIZED

updateReview({ id: string, ratings: [...], overallRating?, overallFeedback? })
  Output: { success: true, data: Review }
  Errors: ALREADY_SUBMITTED

submitReview({ id: string })
  Output: { success: true }
  Errors: INCOMPLETE (missing ratings)
```

**UI Mock (from PRD):**
```
+------------------------------------------------------------------+
| TeamPulse        Q1 2026 Review - Alex Kim          [Save Draft] |
+------------------------------------------------------------------+
| Progress: [====------] 4/10 competencies rated                   |
|                                                                   |
| +---------------------------+  +-------------------------------+  |
| | Competencies              |  | Peer Feedback (3 responses)   |  |
| | 1. Technical Skills    *  |  | Strengths: "Great reviews"    |  |
| |    [==x==] 4/5            |  +-------------------------------+  |
| |    [Write feedback...]    |  | Alex's Goals                  |  |
| +---------------------------+  | - Ship auth [Done]            |  |
|                                +-------------------------------+  |
|                                      [Save Draft] [Submit Review] |
+------------------------------------------------------------------+
```

**Acceptance Criteria:**
- [ ] FR-2.1: Display form based on template
- [ ] FR-2.2: Rating scale 1-5 with labels
- [ ] FR-2.3: Written feedback field per competency
- [ ] FR-2.4: Overall rating summary
- [ ] FR-2.5: Overall written summary
- [ ] FR-2.6: Auto-save every 30 seconds (US-011)
- [ ] FR-2.7: Submit moves to ready-to-share
- [ ] FR-2.8: View peer feedback in sidebar
- [ ] FR-2.9: View goals in sidebar

---

### 3.2 Employee Self-Review

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-3.2.1 | Self-review page (same template as manager) | E-3.1.1 | [ ] | 3h |
| E-3.2.2 | Progress indicator | E-3.2.1 | [ ] | 1h |
| E-3.2.3 | Accomplishments section | E-3.2.1 | [ ] | 1h |
| E-3.2.4 | Next period goals section | E-3.2.1 | [ ] | 1h |
| E-3.2.5 | Submit self-review action | E-3.2.1 | [ ] | 2h |

**API Contract:**

```typescript
// Server Actions: src/actions/self-reviews.ts

getSelfReview({ cycleId: string })
  Output: { data: SelfReview & { ratings } }
  Errors: NOT_FOUND

updateSelfReview({ id, ratings, accomplishments?, nextPeriodGoals? })
  Output: { success: true, data: SelfReview }

submitSelfReview({ id: string })
  Output: { success: true }
  Errors: INCOMPLETE, PAST_DEADLINE
```

**Acceptance Criteria:**
- [ ] FR-3.1: Same competencies as manager review
- [ ] FR-3.2: Same 1-5 rating scale
- [ ] FR-3.3: Written self-assessment per competency
- [ ] FR-3.4: Overall self-rating
- [ ] FR-3.5: Accomplishments/highlights section
- [ ] FR-3.6: Goals for next period section
- [ ] FR-3.7: Auto-save drafts
- [ ] FR-3.8: Submit before deadline

---

### 3.3 Peer Feedback System

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-3.3.1 | Request peer feedback (select reviewers) | E-2.1.5 | [ ] | 3h |
| E-3.3.2 | Peer feedback form page | E-3.3.1 | [ ] | 3h |
| E-3.3.3 | Submit peer feedback action | E-3.3.2 | [ ] | 2h |
| E-3.3.4 | Aggregate feedback (themes, anonymize) | E-3.3.3 | [ ] | 4h |
| E-3.3.5 | Display aggregated feedback to manager | E-3.3.4 | [ ] | 2h |

**API Contract:**

```typescript
// Server Actions: src/actions/peer-feedback.ts

requestPeerFeedback({ cycleId, subjectId, reviewerIds: string[] })
  Output: { success: true }
  Errors: TOO_MANY_REVIEWERS (max 5)

getPeerFeedbackRequest({ requestId: string })
  Output: { data: PeerFeedbackRequest & { subject } }

submitPeerFeedback({
  requestId: string,
  strengths: string,
  areasForGrowth: string,
  collaborationRating: number
})
  Output: { success: true }

getAggregatedFeedback({ cycleId, subjectId })
  Output: { data: { count, themes, avgCollaborationRating } }
  Errors: MIN_RESPONSES_NOT_MET (need 3+ for anonymity)
```

**Acceptance Criteria:**
- [ ] FR-5.1: Manager selects 2-5 peer reviewers
- [ ] FR-5.3: Peer form: strengths, areas for growth, collaboration rating
- [ ] FR-5.4: Feedback is anonymous
- [ ] FR-5.5: Only aggregate when 3+ peers respond
- [ ] FR-5.6: Show themes to manager
- [ ] FR-5.8: Deadline reminders

---

### 3.4 Share Review with Employee

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-3.4.1 | Share review action (changes status) | E-3.1.8 | [ ] | 2h |
| E-3.4.2 | Notification email on share | E-3.4.1 | [ ] | 2h |
| E-3.4.3 | Employee review view page (read-only) | E-3.4.1 | [ ] | 3h |
| E-3.4.4 | Review history page | E-3.4.3 | [ ] | 2h |

**API Contract:**

```typescript
shareReview({ reviewId: string })
  Output: { success: true }
  Side effect: Sends notification email

getMyReviews()
  Output: { data: Review[] } // Reviews where user is subject
```

**Acceptance Criteria:**
- [ ] US-007: Share button sends notification
- [ ] US-008: Employee sees manager feedback, peer feedback, self-review
- [ ] US-012: Review history shows all past reviews

---

## Phase 4: Gap Analysis - WOW Feature (Week 8)

**User Stories:** US-WOW (FR-4.1 through FR-4.8)

### 4.1 Gap Analysis Dashboard

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-4.1.1 | Gap analysis page layout | E-3.1.8, E-3.2.5 | [ ] | 3h |
| E-4.1.2 | Side-by-side rating comparison chart | E-4.1.1 | [ ] | 4h |
| E-4.1.3 | Gap calculation logic (difference per competency) | E-4.1.1 | [ ] | 2h |
| E-4.1.4 | Highlight significant gaps (>=2 points) | E-4.1.3 | [ ] | 1h |
| E-4.1.5 | Sort by gap size | E-4.1.3 | [ ] | 1h |
| E-4.1.6 | Display written feedback comparison | E-4.1.1 | [ ] | 2h |
| E-4.1.7 | Coaching tips for large gaps | E-4.1.4 | [ ] | 2h |
| E-4.1.8 | PDF export of gap analysis | E-4.1.1 | [ ] | 4h |

**API Contract:**

```typescript
// Server Actions: src/actions/gap-analysis.ts

getGapAnalysis({ reviewId: string })
  Output: {
    data: {
      review: Review,
      selfReview: SelfReview,
      gaps: {
        competencyId: string,
        competencyName: string,
        managerRating: number,
        selfRating: number,
        gap: number,
        managerFeedback: string,
        selfFeedback: string,
        isSignificant: boolean
      }[],
      overallGap: number
    }
  }
  Errors: SELF_REVIEW_NOT_SUBMITTED, REVIEW_NOT_SUBMITTED
```

**UI Mock (from PRD):**
```
+---------------------------------------------------------------+
| Communication                              GAP: 1.5 points (!)|
| +----------------------------------------------------------+  |
| | Manager: [==x--] 3/5  |  Self: [====x] 4.5/5             |  |
| +----------------------------------------------------------+  |
| Manager said: "Sometimes unclear in meetings..."              |
| Self said: "I communicate proactively with stakeholders..."   |
| [!] Coaching tip: Large gap - discuss perception vs reality   |
+---------------------------------------------------------------+
```

**Acceptance Criteria:**
- [ ] FR-4.1: Side-by-side manager vs self ratings
- [ ] FR-4.2: Calculate gap for each competency
- [ ] FR-4.3: Highlight gaps >= 2 points
- [ ] FR-4.4: Sort by gap size (largest first)
- [ ] FR-4.5: Show overall rating comparison
- [ ] FR-4.6: Display written feedback from both
- [ ] FR-4.7: Export as PDF
- [ ] FR-4.8: Accessible to manager before sharing

**Analytics Events:**
- `gap_analysis_viewed` - Core WOW metric
- `gap_analysis_pdf_exported` - High-value usage

---

## Phase 5: Goal Tracking (Week 9)

**User Stories:** US-009 (FR-6.1 through FR-6.8)

### 5.1 Goal Management

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-5.1.1 | Goals list page (employee view) | E-1.4.1 | [ ] | 2h |
| E-5.1.2 | Create goal form | E-5.1.1 | [ ] | 2h |
| E-5.1.3 | Goal detail/edit page | E-5.1.1 | [ ] | 2h |
| E-5.1.4 | Progress update (status, percentage) | E-5.1.3 | [ ] | 2h |
| E-5.1.5 | Manager view of employee goals | E-5.1.1 | [ ] | 2h |
| E-5.1.6 | Goals sidebar in review form | E-5.1.1, E-3.1.1 | [ ] | 1h |

**API Contract:**

```typescript
// Server Actions: src/actions/goals.ts

getGoals({ userId?: string }) // Own goals or employee's goals (if manager)
  Output: { data: Goal[] }

createGoal({ title, description?, dueDate? })
  Output: { success: true, data: Goal }

updateGoal({ id, title?, description?, status?, progress? })
  Output: { success: true, data: Goal }

deleteGoal({ id: string })
  Output: { success: true }
```

**Acceptance Criteria:**
- [ ] FR-6.1: Create goals with title, description, due date
- [ ] FR-6.2: Goal status: Not Started, In Progress, Completed, Missed
- [ ] FR-6.3: Progress updates (manual percentage)
- [ ] FR-6.4: Goals visible during review writing
- [ ] FR-6.7: Manager can view employee goals
- [ ] FR-6.8: Employee owns goal creation

---

## Phase 6: Notifications & Reminders (Week 10)

**User Stories:** US-010 (FR-1.7)

### 6.1 Email Reminders

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-6.1.1 | Reminder email templates (React Email) | E-1.1.2 | [ ] | 3h |
| E-6.1.2 | Cron job for deadline reminders | E-6.1.1 | [ ] | 4h |
| E-6.1.3 | Self-review reminder (3d, 1d, due) | E-6.1.2 | [ ] | 1h |
| E-6.1.4 | Peer feedback reminder | E-6.1.2 | [ ] | 1h |
| E-6.1.5 | Manager review reminder | E-6.1.2 | [ ] | 1h |

**API Contract:**

```typescript
// API Route: src/app/api/cron/reminders/route.ts
// Triggered daily by Vercel Cron

POST /api/cron/reminders
Authorization: CRON_SECRET
Response: { sent: number, errors: string[] }
```

**Acceptance Criteria:**
- [ ] FR-1.7: Reminders at 3 days before, 1 day before, on due date
- [ ] Reminders only sent once per type per deadline
- [ ] Unsubscribe link in all emails

---

### 6.2 In-App Notifications

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-6.2.1 | Notification dropdown in header | E-1.4.2 | [ ] | 3h |
| E-6.2.2 | Notification when review shared | E-3.4.1 | [ ] | 2h |
| E-6.2.3 | Notification when peer feedback requested | E-3.3.1 | [ ] | 2h |
| E-6.2.4 | Badge count for unread | E-6.2.1 | [ ] | 1h |

---

## Phase 7: Analytics & Billing (Week 11)

### 7.1 Analytics Integration

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-7.1.1 | PostHog provider setup | E-1.1.2 | [ ] | 2h |
| E-7.1.2 | Identify users on login | E-7.1.1 | [ ] | 1h |
| E-7.1.3 | Track conversion funnel events (see PRD) | E-7.1.1 | [ ] | 4h |
| E-7.1.4 | Track WOW feature events | E-7.1.3 | [ ] | 1h |

**Events to Track (from PRD Conversion Funnel):**

```typescript
// Core funnel
track('landing_page_view', { source })
track('pricing_page_view')
track('signup_started')
track('signup_completed', { method: 'email' | 'google' })
track('onboarding_started')
track('team_members_added', { count })
track('first_cycle_created')
track('first_review_written')
track('self_review_completed')
track('gap_analysis_viewed') // WOW feature
track('day_7_active')
track('second_cycle_created')
track('trial_upgrade_clicked')
track('payment_completed', { plan, employees })
```

---

### 7.2 Stripe Billing

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-7.2.1 | Stripe webhook handler | E-1.1.2 | [ ] | 4h |
| E-7.2.2 | Create subscription on trial end | E-7.2.1 | [ ] | 3h |
| E-7.2.3 | Billing settings page | E-7.2.1 | [ ] | 3h |
| E-7.2.4 | Stripe Customer Portal integration | E-7.2.3 | [ ] | 2h |
| E-7.2.5 | Usage-based billing (employee count) | E-7.2.2 | [ ] | 3h |

**API Contract:**

```typescript
// Webhook: src/app/api/webhooks/stripe/route.ts

Handles:
- customer.subscription.created -> update org.subscriptionStatus
- customer.subscription.updated -> update org.subscriptionStatus
- customer.subscription.deleted -> set org.subscriptionStatus = 'canceled'
- invoice.paid -> update org billing date
- invoice.payment_failed -> notify admin

// Server Action
createBillingPortalSession()
  Output: { url: string } // Redirect to Stripe portal
```

---

### 7.3 Team Dashboard

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-7.3.1 | Completion rate stats | E-2.1.5 | [ ] | 2h |
| E-7.3.2 | Active cycle summary widget | E-7.3.1 | [ ] | 2h |
| E-7.3.3 | Quick action buttons | E-7.3.1 | [ ] | 1h |

**Acceptance Criteria:**
- [ ] US-013: Dashboard shows completion % by participant
- [ ] Quick actions: New Cycle, Write Review, View Gap Report

---

## Phase 8: Polish & Launch (Week 12)

### 8.1 Error Handling & Edge Cases

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-8.1.1 | Global error boundary | E-1.1.1 | [ ] | 2h |
| E-8.1.2 | 404/500 error pages | E-8.1.1 | [ ] | 2h |
| E-8.1.3 | Toast notifications for all actions | E-8.1.1 | [ ] | 2h |
| E-8.1.4 | Form validation error messages | E-8.1.3 | [ ] | 2h |
| E-8.1.5 | Loading skeletons | E-8.1.1 | [ ] | 2h |

---

### 8.2 Landing Page & Marketing

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-8.2.1 | Landing page with value prop | E-1.1.1 | [ ] | 4h |
| E-8.2.2 | Pricing page | E-8.2.1 | [ ] | 3h |
| E-8.2.3 | Features page | E-8.2.1 | [ ] | 2h |
| E-8.2.4 | SEO meta tags | E-8.2.1 | [ ] | 1h |

---

### 8.3 Production Launch

| Task ID | Task | Depends On | Status | Est |
|---------|------|------------|--------|-----|
| E-8.3.1 | Production database (Railway) | E-1.2.1 | [ ] | 1h |
| E-8.3.2 | Production environment variables | E-8.3.1 | [ ] | 1h |
| E-8.3.3 | Domain/SSL setup | E-8.3.2 | [ ] | 1h |
| E-8.3.4 | Stripe production mode | E-7.2.1 | [ ] | 1h |
| E-8.3.5 | Full user journey test (E2E) | E-8.3.3 | [ ] | 3h |
| E-8.3.6 | Performance audit (Lighthouse) | E-8.3.5 | [ ] | 2h |

**Acceptance Criteria:**
- [ ] Production URL accessible via HTTPS
- [ ] Full flow works: signup -> onboard -> create cycle -> reviews -> gap analysis
- [ ] Analytics events firing in PostHog
- [ ] Payment flow works with real Stripe

---

## Summary

| Phase | Focus | Weeks | Est. Hours |
|-------|-------|-------|------------|
| Phase 1: Foundation | Auth, DB, Layout | 1-2 | 35h |
| Phase 2: Cycle Management | Cycles, Templates, Team | 3-4 | 40h |
| Phase 3: Review Workflow | Manager, Self, Peer Reviews | 5-7 | 55h |
| Phase 4: Gap Analysis | WOW Feature | 8 | 20h |
| Phase 5: Goals | Goal Tracking | 9 | 12h |
| Phase 6: Notifications | Email, In-App | 10 | 18h |
| Phase 7: Analytics & Billing | PostHog, Stripe, Dashboard | 11 | 28h |
| Phase 8: Polish & Launch | Error handling, Landing, Deploy | 12 | 26h |
| **Total** | | **12 weeks** | **234h** |

At 20 hours/week = 12 weeks. At 30 hours/week = 8 weeks.

---

## Critical Path

```
Setup -> Schema -> Auth -> Cycle CRUD -> Review Writing -> Self-Review -> Gap Analysis -> Production
```

**Parallel Opportunities:**
- While building review forms (Phase 3), start goal tracking (Phase 5)
- Email templates (Phase 6) can be built alongside Phase 4
- Landing page (Phase 8) can start after Phase 1 foundation

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Supabase auth issues | Supabase has great docs and support, fallback to self-hosted if needed |
| RLS policy complexity | Test policies thoroughly, use Supabase Dashboard policy editor |
| Stripe complexity | Start with simple plan, add metered billing in v1.1 |
| PDF export performance | Use client-side generation, optimize later |
| Peer feedback anonymity edge cases | Enforce 3+ minimum strictly |
