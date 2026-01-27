# Product Requirements Document (PRD)

*Generated for: Performance Evaluation Tool*

---

## PRD at a Glance

### One-Sentence Promise

> Help small team managers run comprehensive 360-degree performance reviews with self-review, peer feedback, and gap analysis in 15 minutes instead of 5 hours.

### MVP Features (3-5 Max)

1. **Self-Review + Gap Analysis** - Employees rate themselves, managers see side-by-side comparison
2. **Peer Feedback System** - Request, collect, and anonymize peer feedback automatically
3. **Review Templates** - Pre-built role-specific templates (Engineering, Product, Sales, Manager)
4. **Review Cycle Management** - Create cycles, set deadlines, automatic reminders

### MVP Scope Boundaries

| In Scope | Out of Scope |
|----------|--------------|
| Self-review submission | Mobile native app |
| Manager review with gap analysis | HRIS integration |
| Peer feedback request/collection | Compensation management |
| Role/level templates | Engagement surveys |
| Email reminders | Advanced analytics |
| PDF export | 1:1 meeting tracking |
| Basic team dashboard | OKR management |

### Riskiest Assumptions

1. **Managers will pay $6-8 PEPM** for reviews (vs free spreadsheets)
2. **Employees will complete self-reviews** (80%+ completion target)
3. **Peers will provide feedback** when requested (70%+ response rate)
4. **Gap analysis is valuable** enough to differentiate from basic tools

### Success Metrics (MVP)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Trial-to-paid conversion | 25%+ | Revenue validation |
| Self-review completion rate | 80%+ | Core feature works |
| Peer feedback response rate | 70%+ | 360 value delivered |
| Manager time saved per review | 30 min | Value proposition proven |
| NPS after first review cycle | 40+ | Product-market fit signal |

---

## MVP Funnel

### Funnel Events (Track These)

```
1. SIGNUP_STARTED
   └─> User clicks "Start Free Trial"

2. SIGNUP_COMPLETED
   └─> User creates account (email + password)

3. TEAM_SETUP_STARTED
   └─> User navigates to team setup

4. FIRST_EMPLOYEE_ADDED
   └─> User adds first team member

5. TEAM_SETUP_COMPLETED
   └─> User adds 3+ employees

6. TEMPLATE_SELECTED
   └─> User chooses a review template

7. REVIEW_CYCLE_CREATED
   └─> User creates first review cycle

8. FIRST_SELF_REVIEW_COMPLETED
   └─> An employee submits self-review

9. FIRST_PEER_FEEDBACK_COMPLETED
   └─> A peer submits feedback

10. FIRST_MANAGER_REVIEW_COMPLETED
    └─> Manager completes their evaluation

11. GAP_ANALYSIS_VIEWED
    └─> Manager views self vs manager comparison

12. REVIEW_CYCLE_COMPLETED
    └─> All reviews in cycle are done

13. SUBSCRIPTION_STARTED
    └─> User converts to paid
```

### Funnel Targets

| Stage | Event | Target % | Drop-off Action |
|-------|-------|----------|-----------------|
| Signup | SIGNUP_COMPLETED | 70% of starts | Simplify signup form |
| Onboarding | TEAM_SETUP_COMPLETED | 60% of signups | Add import options |
| Activation | REVIEW_CYCLE_CREATED | 50% of setups | Template guidance |
| Engagement | FIRST_SELF_REVIEW_COMPLETED | 80% of cycles | Better employee emails |
| Value | GAP_ANALYSIS_VIEWED | 90% of reviews | Highlight in UI |
| Conversion | SUBSCRIPTION_STARTED | 25% of trials | Improve value demo |

---

## Text Wireframes

### Screen 1: Dashboard (Manager View)

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                    [Team ▼] [Profile ▼]         │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Welcome back, Sarah                                               │
│                                                                    │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐│
│  │ CURRENT CYCLE                   │  │ QUICK STATS              ││
│  │ Q1 2026 Reviews                 │  │                          ││
│  │                                 │  │ Team Size: 8             ││
│  │ Progress: 6/8 complete          │  │ Pending Reviews: 2       ││
│  │ ████████████░░░░ 75%            │  │ Avg Rating: 3.8          ││
│  │                                 │  │ Cycle Ends: Feb 15       ││
│  │ [View Details]                  │  └──────────────────────────┘│
│  └─────────────────────────────────┘                              │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  PENDING ACTIONS                                                   │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ ⏳ John Smith          Self-review pending                   │  │
│  │    Software Engineer   Reminder sent 2 days ago              │  │
│  │                        [Send Reminder] [Mark Complete]       │  │
│  ├─────────────────────────────────────────────────────────────┤  │
│  │ ⏳ Alice Chen          Manager review pending                │  │
│  │    Product Manager     Self-review: Complete                 │  │
│  │                        [Start Review]                        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  [+ Start New Review Cycle]                                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Screen 2: Self-Review Form (Employee View)

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                              [Your Profile ▼]   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Your Q1 2026 Self-Review                                          │
│  Due: February 10, 2026                                            │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  TECHNICAL SKILLS                                     Section 1/4  │
│                                                                    │
│  1. Code Quality                                                   │
│     How would you rate your code quality this quarter?             │
│                                                                    │
│     [1] [2] [3] [4] [5]                                            │
│      😕      😐      😊                                            │
│     Needs    Meets   Exceeds                                       │
│     Work     Expect  Expect                                        │
│                                                                    │
│     Comments (optional):                                           │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │ I refactored the auth module and reduced bugs by 40%...  │  │
│     └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  2. Problem Solving                                                │
│     How would you rate your problem-solving skills?                │
│                                                                    │
│     [1] [2] [3] [4] (5)  ← Selected                                │
│                                                                    │
│     Comments (optional):                                           │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │                                                          │  │
│     └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  Progress: 2/12 questions                                          │
│  ████░░░░░░░░░░░░░░░░ 17%                                          │
│                                                                    │
│                               [Save Draft] [Next Section →]        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Screen 3: Manager Review with Gap Analysis

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                    [Team ▼] [Profile ▼]         │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Review: Alice Chen - Product Manager                              │
│  Q1 2026 Performance Review                                        │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ VIEW: [Your Review] [Gap Analysis] [Peer Feedback]          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ═══════════════════════════════════════════════════════════════  │
│  GAP ANALYSIS                                                      │
│  ═══════════════════════════════════════════════════════════════  │
│                                                                    │
│  STRATEGIC THINKING                                                │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Alice's Self-Rating:    ████████████████████  5/5           │  │
│  │ Your Rating:            ████████████░░░░░░░░  3/5           │  │
│  │                                                             │  │
│  │ ⚠️  GAP: -2 points                                          │  │
│  │                                                             │  │
│  │ Alice's Comment: "I led the Q4 roadmap planning..."         │  │
│  │ Your Comment: [Add your perspective]                        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  💡 COACHING OPPORTUNITY: Significant perception gap.              │
│     Consider discussing specific examples in your 1:1.             │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  COMMUNICATION                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Alice's Self-Rating:    ████████████████░░░░  4/5           │  │
│  │ Your Rating:            ████████████████░░░░  4/5           │  │
│  │                                                             │  │
│  │ ✅  ALIGNED                                                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  OVERALL SUMMARY                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Average Self-Rating:    4.2/5                               │  │
│  │ Average Manager Rating: 3.5/5                               │  │
│  │ Gap: -0.7 (Self rates higher)                               │  │
│  │                                                             │  │
│  │ Areas of Alignment (3): Communication, Execution, Teamwork  │  │
│  │ Areas to Discuss (2): Strategic Thinking, Leadership        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│                          [Save] [Complete & Share with Employee]   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Screen 4: Peer Feedback Request

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                              [Your Profile ▼]   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Peer Feedback Request                                             │
│  For: John Smith, Software Engineer                                │
│                                                                    │
│  Sarah (Manager) has requested your feedback on John's             │
│  performance this quarter. Your responses are anonymous.           │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  1. How effectively does John collaborate with the team?           │
│                                                                    │
│     [1] [2] [3] (4) [5]                                            │
│                                                                    │
│  2. What is John's greatest strength?                              │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │ John is incredibly reliable. When he commits to a        │  │
│     │ deadline, he always delivers...                          │  │
│     └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  3. What is one area where John could improve?                     │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │ Sometimes John could communicate blockers earlier...     │  │
│     └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  4. Any additional comments for John's manager?                    │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │ (Optional)                                               │  │
│     └──────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  🔒 Your feedback is anonymous. John will see aggregated           │
│     insights but not who said what.                                │
│                                                                    │
│                                              [Submit Feedback]     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Screen 5: Aggregated Peer Feedback View (Manager)

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                    [Team ▼] [Profile ▼]         │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Peer Feedback Summary: John Smith                                 │
│  Q1 2026 | 4 of 5 peers responded                                  │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ VIEW: [Your Review] [Gap Analysis] [Peer Feedback]          │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ═══════════════════════════════════════════════════════════════  │
│  QUANTITATIVE RATINGS (Averaged)                                   │
│  ═══════════════════════════════════════════════════════════════  │
│                                                                    │
│  Collaboration:     ████████████████░░░░  4.0/5 (4 responses)      │
│  Communication:     ████████████████████  4.5/5 (4 responses)      │
│  Reliability:       ████████████████████  5.0/5 (4 responses)      │
│  Technical Skills:  ████████████████░░░░  4.0/5 (3 responses)      │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  STRENGTHS (What peers said)                                       │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ • "Incredibly reliable - always delivers on commitments"    │  │
│  │ • "Great at explaining technical concepts"                  │  │
│  │ • "Always willing to help when others are stuck"            │  │
│  │ • "Strong code reviewer - catches bugs others miss"         │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  AREAS FOR GROWTH (What peers said)                                │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ • "Could communicate blockers earlier"                      │  │
│  │ • "Sometimes takes on too much and gets stretched thin"     │  │
│  │ • "Would benefit from more visibility in team meetings"     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  💡 INSIGHT: Peers rate John highest on reliability and            │
│     communication. Consider discussing workload management.        │
│                                                                    │
│                                             [Include in Review]    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Screen 6: Create Review Cycle

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] Performance                    [Team ▼] [Profile ▼]         │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Create New Review Cycle                                           │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  STEP 1 OF 4: Basic Info                                           │
│                                                                    │
│  Cycle Name:                                                       │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ Q1 2026 Performance Reviews                                  │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  Review Period:                                                    │
│  [Jan 1, 2026] to [Mar 31, 2026]                                   │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  STEP 2 OF 4: Who's Included                                       │
│                                                                    │
│  ☑ Engineering Team (8 people)                                     │
│  ☐ Product Team (4 people)                                         │
│  ☐ Sales Team (6 people)                                           │
│                                                                    │
│  Or: [Select Individual Employees]                                 │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  STEP 3 OF 4: Review Components                                    │
│                                                                    │
│  ☑ Self-Review          (Employees rate themselves)                │
│  ☑ Manager Review       (You rate your reports)                    │
│  ☑ Peer Feedback        (Collect from teammates)                   │
│  ☐ Upward Feedback      (Reports rate managers)                    │
│                                                                    │
│  Peer Feedback Settings:                                           │
│  Number of peers to request: [3]                                   │
│  ☑ Allow employees to suggest peers                                │
│  ☑ Anonymize feedback                                              │
│                                                                    │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  STEP 4 OF 4: Timeline                                             │
│                                                                    │
│  Self-reviews due:     [Feb 7, 2026]                               │
│  Peer feedback due:    [Feb 10, 2026]                              │
│  Manager reviews due:  [Feb 14, 2026]                              │
│  Share with employees: [Feb 15, 2026]                              │
│                                                                    │
│  ☑ Send automatic reminders (3 days and 1 day before due)          │
│                                                                    │
│                                                                    │
│               [Save as Draft]          [Launch Cycle →]            │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## User Stories

### Epic 1: Account & Team Setup

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U1.1 | As a manager, I can sign up with email/password so I can create an account | P0 | 4h |
| U1.2 | As a manager, I can create a team and invite employees via email | P0 | 6h |
| U1.3 | As a manager, I can import employees from CSV | P1 | 4h |
| U1.4 | As a manager, I can assign reporting relationships (who reports to whom) | P0 | 4h |
| U1.5 | As an employee, I can accept an invitation and create my account | P0 | 3h |

### Epic 2: Review Templates

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U2.1 | As a manager, I can choose from pre-built templates (Engineering, Product, etc.) | P0 | 8h |
| U2.2 | As a manager, I can customize template questions | P1 | 6h |
| U2.3 | As a manager, I can create a template from scratch | P2 | 8h |
| U2.4 | As a manager, I can see template previews before selecting | P1 | 3h |

### Epic 3: Review Cycles

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U3.1 | As a manager, I can create a review cycle with name, dates, and participants | P0 | 6h |
| U3.2 | As a manager, I can select which components to include (self, peer, manager) | P0 | 4h |
| U3.3 | As a manager, I can set deadlines for each review type | P0 | 3h |
| U3.4 | As a manager, I can launch a cycle which notifies all participants | P0 | 4h |
| U3.5 | As a manager, I can see cycle progress (who completed, who pending) | P0 | 6h |

### Epic 4: Self-Reviews

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U4.1 | As an employee, I receive an email when a self-review is requested | P0 | 2h |
| U4.2 | As an employee, I can complete my self-review with ratings and comments | P0 | 8h |
| U4.3 | As an employee, I can save my review as draft and return later | P1 | 3h |
| U4.4 | As an employee, I can see my self-review after submitting | P0 | 2h |

### Epic 5: Peer Feedback

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U5.1 | As a manager, I can request peer feedback for my reports | P0 | 4h |
| U5.2 | As an employee, I can suggest peers who should review me | P1 | 3h |
| U5.3 | As a peer, I receive an email when feedback is requested | P0 | 2h |
| U5.4 | As a peer, I can submit anonymous feedback | P0 | 6h |
| U5.5 | As a manager, I can see aggregated peer feedback (anonymized) | P0 | 6h |

### Epic 6: Manager Reviews & Gap Analysis

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U6.1 | As a manager, I can complete my review of a direct report | P0 | 8h |
| U6.2 | As a manager, I can see gap analysis (self vs manager ratings) | P0 | 8h |
| U6.3 | As a manager, I can see peer feedback alongside my review | P0 | 4h |
| U6.4 | As a manager, I can share the completed review with the employee | P0 | 4h |
| U6.5 | As an employee, I can view my completed review and feedback | P0 | 4h |

### Epic 7: Notifications & Reminders

| ID | User Story | Priority | Estimate |
|----|------------|----------|----------|
| U7.1 | As a participant, I receive reminder emails before deadlines | P0 | 4h |
| U7.2 | As a manager, I can manually send reminders to pending participants | P1 | 3h |
| U7.3 | As a manager, I get notified when all reviews in a cycle are complete | P1 | 2h |

---

## Technical Requirements

### Performance

- Page load time: <2 seconds
- Review form save: <500ms
- Dashboard load: <1 second with 50 employees

### Security

- All data encrypted at rest and in transit
- Role-based access (manager sees reports, employee sees own)
- Peer feedback anonymization enforced in database
- Session management with secure tokens

### Scalability

- Support teams up to 100 employees initially
- Handle 10 concurrent review cycles
- Store 4 years of review history per employee

### Integrations (V2)

- Slack (reminders and notifications)
- Google Workspace (SSO)
- CSV import/export

---

## Launch Criteria

### Alpha (Internal Testing)

- [ ] Core flows working (signup, create cycle, complete reviews)
- [ ] Gap analysis displays correctly
- [ ] Peer feedback anonymization working
- [ ] Email notifications sending

### Beta (5 Customers)

- [ ] All P0 user stories complete
- [ ] 3 role templates available
- [ ] Automatic reminders working
- [ ] PDF export functional
- [ ] No critical bugs for 1 week

### GA (General Availability)

- [ ] 10+ customers completed full review cycle
- [ ] 80%+ self-review completion rate
- [ ] 70%+ peer feedback response rate
- [ ] NPS 40+
- [ ] <5 critical bugs reported

---

*Next artifact: 03-tasks.md*
