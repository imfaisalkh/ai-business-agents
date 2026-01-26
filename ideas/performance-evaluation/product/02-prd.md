# Product Requirements Document (PRD)

---

## PRD at a Glance

**Product Name:** TeamPulse

**One-sentence promise:**
"Run structured 360-degree performance reviews with employee self-review, manager gap analysis, and peer feedback in 15 minutes—not 15 hours."

**Target user:**
Engineering, product, and operations managers at 15-50 person tech companies who currently use Google Docs or can't justify Lattice's pricing.

**Core problem solved:**
Performance reviews are time-consuming chaos (copy-pasting docs, manual peer feedback aggregation, no visibility for employees) OR prohibitively expensive (Lattice $11-16 PEPM for features teams don't need).

**Key differentiator:**
**Self-review gap analysis** (side-by-side comparison of employee vs manager ratings) at SMB pricing ($6-8 PEPM)—only tool in this price tier with this feature.

**MVP feature set (3-5 features):**
1. **Employee Self-Review with Manager Gap Analysis** - Employees rate themselves, managers see side-by-side comparison before the 1:1
2. **Anonymous Peer Feedback Aggregation** - Collect 360-degree feedback with automatic anonymization and theme extraction
3. **Role-Based Review Templates** - Pre-built templates for Software Engineer, Manager, Sales Rep (Junior/Mid/Senior levels)
4. **Goal Setting & Tracking** - Set quarterly goals, track progress, review in next cycle for continuity
5. **Team Analytics Dashboard** - Completion rates, performance distribution, historical trends

**What we're NOT building (yet):**
- Engagement surveys or pulse surveys (enterprise feature bloat)
- OKR management (separate category, adds complexity)
- Compensation management (HR/finance feature, not review-focused)
- 1-on-1 meeting notes (already solved by Fellow, Soapbox)

**Success metrics:**
- **80%+ employee self-review completion rate** (employees actually use it)
- **70%+ peer feedback participation rate** (peers respond to requests)
- **25%+ trial-to-paid conversion** (validates willingness to pay)
- **30 min time savings per review** (managers confirm ROI)
- **Net Revenue Retention >100%** (team growth offsets churn)

**Launch timeline:**
- **Phase 1 (Weeks 1-6):** Foundation (auth, team setup, core database schema)
- **Phase 2 (Weeks 7-14):** Self-review + gap analysis MVP
- **Phase 3 (Weeks 15-20):** Peer feedback + analytics dashboard
- **Beta launch:** Week 20 (5 beta customers)
- **Public launch:** Week 24 (waitlist + Product Hunt)

---

## MVP Funnel (Instrumentation Required)

*Track these events to validate product-market fit:*

### Onboarding Funnel
1. **`signup_started`** - User clicks "Sign up" / "Start free trial"
2. **`account_created`** - Email verified, account active
3. **`team_imported`** - Slack connected OR CSV uploaded (employees added)
4. **`template_selected`** - User picks a role template (Engineer, Manager, Sales)
5. **`first_review_launched`** - User sends first self-review request to team
6. **`onboarding_completed`** - First review cycle started

**Success criteria:** >70% of signups complete onboarding (reach step 6)

---

### Review Cycle Funnel (Core Product Loop)
1. **`self_review_sent`** - Manager sends self-review request to employee
2. **`self_review_opened`** - Employee opens self-review form
3. **`self_review_submitted`** - Employee submits self-review
4. **`manager_review_opened`** - Manager opens gap analysis view
5. **`manager_review_submitted`** - Manager finalizes their ratings
6. **`review_shared`** - Manager shares review with employee (1:1 happens)
7. **`goals_set`** - Manager + employee set goals for next quarter

**Success criteria:**
- 80%+ employees submit self-reviews (step 3)
- 90%+ managers complete reviews (step 5)
- 70%+ reviews result in goals set (step 7)

---

### Peer Feedback Funnel (Differentiation Feature)
1. **`peer_feedback_requested`** - Employee or manager requests peer feedback
2. **`peer_request_sent`** - 2-3 peers receive notification
3. **`peer_feedback_opened`** - Peer opens feedback form
4. **`peer_feedback_submitted`** - Peer submits feedback (anonymized)
5. **`peer_feedback_aggregated`** - System aggregates responses, surfaces themes
6. **`peer_feedback_viewed`** - Manager views aggregated peer feedback

**Success criteria:** 70%+ of peer requests get 2+ responses (step 4)

---

### Retention & Expansion
1. **`review_cycle_completed`** - User completes one full review cycle (all team members reviewed)
2. **`second_cycle_started`** - User starts second review cycle (retention signal)
3. **`team_member_added`** - User adds new employee (expansion)
4. **`template_customized`** - User creates custom review template (power user signal)
5. **`historical_review_viewed`** - Manager accesses past review for promotion/termination decision

**Success criteria:**
- 80%+ of beta users start second cycle (retention)
- 50%+ add team members within 6 months (expansion)

---

## Text Wireframes (Critical Screens)

### Screen 1: Dashboard (Manager Home Screen)

```
┌────────────────────────────────────────────────────────────┐
│ TeamPulse                    [Team: Acme Inc ▼]  [⚙️]│
├────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 Q1 2026 Review Cycle                                    │
│  ───────────────────────────────────                       │
│  Progress: ████████░░ 8/10 reviews completed               │
│                                                              │
│  🎯 Your Action Items (2)                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 🔴 Review self-review for Sarah Chen (Engineer)    │   │
│  │    Submitted 2 days ago • Gap analysis ready       │   │
│  │    [View Gap Analysis →]                            │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 🟡 Finalize review for Alex Kim (Manager)          │   │
│  │    Self-review submitted • Peer feedback ready (3)  │   │
│  │    [Complete Review →]                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ✅ Completed Reviews (8)                                   │
│  Jordan Lee, Priya Sharma, ... [View All]                  │
│                                                              │
│  [+ Start New Review Cycle]                                │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Key interactions:**
- Click "View Gap Analysis" → Opens Screen 2 (Gap Analysis View)
- Click "Complete Review" → Opens manager rating form
- Click "+ Start New Review Cycle" → Launches setup wizard

---

### Screen 2: Gap Analysis View (Differentiator Feature)

```
┌────────────────────────────────────────────────────────────┐
│ ← Back to Dashboard          Sarah Chen • Mid-Level SWE    │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 Self-Review Gap Analysis                                │
│  ───────────────────────────                               │
│  Side-by-side comparison of Sarah's self-ratings vs your   │
│  preliminary ratings. Focus your 1:1 on the gaps.          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Competency       Sarah's Rating  Your Rating   Gap │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Code Quality           4/5           5/5      ✅ +1 │   │
│  │ Impact                 2/5           5/5      ⚠️ +3 │   │
│  │ Communication          5/5           4/5      ↔️ -1 │   │
│  │ Collaboration          4/5           4/5      ✅ 0  │   │
│  │ Initiative             3/5           4/5      ✅ +1 │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  💡 Coaching Insight:                                       │
│  Sarah underrates herself on "Impact" by 3 points. This    │
│  suggests a confidence issue, not a skill gap. In your 1:1, │
│  ask: "Why did you rate yourself 2/5 on Impact?" and share │
│  specific examples of her high-impact work.                 │
│                                                              │
│  📝 Sarah's Self-Reflection:                                │
│  "I shipped the analytics dashboard, but I'm not sure it's │
│  being used. I feel like I could be doing more."           │
│                                                              │
│  🗣️ Peer Feedback (3 responses):                           │
│  "Sarah's code reviews are thorough and kind."             │
│  "She unblocked me twice this quarter—huge impact."        │
│  [View All Peer Feedback →]                                │
│                                                              │
│  [Finalize Your Review →]                                  │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Key interactions:**
- Hover over gap numbers → See explanation ("Large positive gap = underconfidence")
- Click "View All Peer Feedback" → Opens anonymized peer responses
- Click "Finalize Your Review" → Manager rates, adds comments, sets goals

---

### Screen 3: Employee Self-Review Form

```
┌────────────────────────────────────────────────────────────┐
│ TeamPulse                               [Sarah Chen]   │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  📝 Q1 2026 Self-Review                                     │
│  ───────────────────────────                               │
│  Your manager will see your ratings and reflections.       │
│  Be honest—this helps them coach you better.               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 1. Code Quality                                     │   │
│  │    Rate yourself: ⭐⭐⭐⭐☆ (4/5)                    │   │
│  │    What went well:                                  │   │
│  │    [Shipped analytics dashboard with 95% test...]  │   │
│  │    What to improve:                                 │   │
│  │    [Need to reduce PR review time from 2 days...] │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 2. Impact                                           │   │
│  │    Rate yourself: ⭐⭐☆☆☆ (2/5)                    │   │
│  │    Reflection:                                      │   │
│  │    [I shipped the analytics dashboard, but I'm...] │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 3. Communication                                    │   │
│  │    Rate yourself: ⭐⭐⭐⭐⭐ (5/5)                    │   │
│  │    ...                                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  📌 Request Peer Feedback (Optional)                        │
│  Select 2-3 teammates to give you feedback:                │
│  ☑️ Jordan Lee (Engineer)                                   │
│  ☑️ Alex Kim (Manager)                                      │
│  ☑️ Priya Sharma (Designer)                                 │
│                                                              │
│  [Save Draft]  [Submit Self-Review →]                      │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Key interactions:**
- Star rating → Updates score, enables text input
- "Request Peer Feedback" → Sends notifications to selected peers
- "Submit" → Triggers `self_review_submitted` event, notifies manager

---

### Screen 4: Peer Feedback Form (Anonymized)

```
┌────────────────────────────────────────────────────────────┐
│ TeamPulse                               [Anonymous]    │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  🗣️ Peer Feedback Request                                  │
│  ───────────────────────────                               │
│  Sarah Chen has requested your feedback for their Q1       │
│  review. Your responses are anonymous and will be           │
│  aggregated with other peers.                               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 1. What does Sarah do well?                         │   │
│  │    [Sarah's code reviews are thorough and kind...]  │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 2. Where could Sarah improve?                       │   │
│  │    [Sometimes takes 2 days to review PRs, could...] │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 3. One thing Sarah should start/stop/continue?      │   │
│  │    [Continue being generous with pair programming...]│  │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ⚠️ Your responses are anonymous. Sarah's manager will see │
│     aggregated themes, not individual responses.            │
│                                                              │
│  [Skip]  [Submit Feedback →]                               │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Key interactions:**
- Text fields → Free-form feedback
- "Submit" → Triggers `peer_feedback_submitted`, system aggregates themes

---

### Screen 5: Team Analytics Dashboard (Manager View)

```
┌────────────────────────────────────────────────────────────┐
│ TeamPulse                          Team Analytics      │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 Q1 2026 Team Overview                                   │
│  ───────────────────────────                               │
│                                                              │
│  Completion Rate: 80% (8/10 reviews completed)             │
│  ████████░░                                                 │
│                                                              │
│  Peer Feedback Participation: 75% (15/20 requests answered)│
│  ███████░░░                                                 │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Performance Distribution                            │   │
│  │                                                      │   │
│  │  Below Expectations (1-2):  █ 1 person              │   │
│  │  Meets Expectations (3-4):  ████ 6 people           │   │
│  │  Exceeds Expectations (5):  █ 2 people              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Top Competencies (Team Strengths)                   │   │
│  │  1. Communication (Avg: 4.2/5)                      │   │
│  │  2. Collaboration (Avg: 4.0/5)                      │   │
│  │  3. Code Quality (Avg: 3.8/5)                       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Growth Areas (Team Opportunities)                   │   │
│  │  1. Initiative (Avg: 3.2/5)                         │   │
│  │  2. Impact (Avg: 3.4/5)                             │   │
│  └────────────────────────────────────────────────────┘   │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Key interactions:**
- Click bars → Drill into individual employee scores
- Export data → Download CSV for presentations or HR reports

---

## User Stories (Prioritized for MVP)

### Must-Have (P0 - Ship-Blocking)

**Story 1: Manager launches first review cycle**
- **As a** manager
- **I want to** import my team and launch a review cycle in 15 minutes
- **So that** I don't waste 2 hours setting up like I did with Google Docs
- **Acceptance criteria:**
  - Can connect Slack OR upload CSV (2 options)
  - Can select pre-built template (Engineer, Manager, Sales) with Junior/Mid/Senior variants
  - Can send self-review requests to all team members in <3 clicks
  - System sends email + Slack notification to employees

**Story 2: Employee completes self-review**
- **As an** employee
- **I want to** rate myself and reflect on my work
- **So that** my manager understands my perspective before the 1:1
- **Acceptance criteria:**
  - Can rate myself on 5-8 competencies (star ratings)
  - Can add text reflections for each competency
  - Can save draft and return later
  - Can request peer feedback from 2-3 teammates
  - System notifies manager when submitted

**Story 3: Manager sees gap analysis**
- **As a** manager
- **I want to** see side-by-side comparison of my ratings vs employee's self-ratings
- **So that** I can focus the 1:1 on gaps (confidence vs skill issues)
- **Acceptance criteria:**
  - Gap view shows employee rating, my rating, and difference
  - System highlights large gaps (>2 points) with coaching tips
  - Can see employee's text reflections
  - Can see aggregated peer feedback (if requested)

**Story 4: Manager finalizes review and sets goals**
- **As a** manager
- **I want to** finalize my ratings, add comments, and set goals for next quarter
- **So that** the review is documented and we have continuity
- **Acceptance criteria:**
  - Can rate employee on each competency (overriding or confirming preliminary ratings)
  - Can add overall comments
  - Can set 3-5 goals for next quarter
  - Can share review with employee (triggers notification)

**Story 5: Peer submits anonymous feedback**
- **As a** peer
- **I want to** give feedback anonymously in 5-10 minutes
- **So that** I can be honest without worrying about retaliation
- **Acceptance criteria:**
  - Can answer 3 open-ended questions (strengths, growth areas, start/stop/continue)
  - System confirms anonymity (no attribution visible to manager or employee)
  - Can skip or decline (no pressure)

---

### Should-Have (P1 - Launch with This)

**Story 6: Manager views team analytics**
- **As a** manager
- **I want to** see team-wide trends (completion rates, performance distribution)
- **So that** I can spot patterns and improve my team's development
- **Acceptance criteria:**
  - Can see completion rate, peer participation rate
  - Can see performance distribution (1-5 scale)
  - Can see top competencies and growth areas

**Story 7: Manager accesses historical reviews**
- **As a** manager
- **I want to** view past reviews for an employee
- **So that** I can make promotion or termination decisions with documentation
- **Acceptance criteria:**
  - Can view all past reviews for an employee in chronological order
  - Can export reviews as PDF

---

### Nice-to-Have (P2 - Post-MVP)

**Story 8: Manager customizes review templates**
- **As a** manager
- **I want to** create custom competencies or questions
- **So that** reviews match my team's unique needs
- **Acceptance criteria:**
  - Can edit pre-built templates (add/remove/reword competencies)
  - Can save custom templates for future cycles

**Story 9: Employee views their review history**
- **As an** employee
- **I want to** see all my past reviews and goals
- **So that** I can track my growth over time
- **Acceptance criteria:**
  - Can access personal review history
  - Can see goals from previous quarters and completion status

---

## Out of Scope (Not in MVP)

- **Engagement surveys:** Different category, adds complexity
- **OKR management:** Separate tool (use Lattice or 15Five for this)
- **Compensation/salary recommendations:** HR/finance feature, legal risk
- **1-on-1 meeting notes:** Already solved by Fellow, Soapbox
- **Skills matrix/career frameworks:** Enterprise feature, overkill for MVP
- **Mobile app:** Web-responsive is sufficient for beta
- **Integrations (beyond Slack):** HRIS integrations (BambooHR, Rippling) are post-MVP

---

## Technical Constraints

- **Stack:** Nuxt 4 + Vue 3 + shadcn-vue + PostgreSQL (or SQLite for early beta)
- **Performance:** Page load <2 seconds on 4G connection
- **Scalability:** Support 100 teams (5,000 total employees) in Year 1 without infrastructure changes
- **Security:** SOC 2 Type 1 compliance required before enterprise sales (Year 2)
- **Data export:** Users can export all data as CSV/PDF (GDPR requirement)

---

## Success Criteria (Launch +90 Days)

- [ ] **80%+ employee self-review completion rate** (employees actually use it)
- [ ] **70%+ peer feedback participation rate** (peers respond)
- [ ] **25%+ trial-to-paid conversion** (validates willingness to pay)
- [ ] **30 min time savings per review** (managers confirm via testimonial)
- [ ] **<5% churn after first cycle** (they renew for second cycle)
- [ ] **NPS >40** (customer satisfaction)

---

*Last updated: January 27, 2026*
