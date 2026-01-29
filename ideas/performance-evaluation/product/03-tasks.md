# Development Tasks

> **Purpose:** Breaks TeamPulse PRD into actionable epics, stories, and tasks. Provides estimates and priorities for sprint planning.
>
> **Fits in:** Engineering Manager (engineering/03) adds technical details to these tasks. Track completion here.

*Generated from PRD v1.0 on January 2026*

---

## Summary

| Epic | Stories | Est. Hours | Priority |
|------|---------|------------|----------|
| 1. Foundation & Auth | 4 | 32h | Week 1-2 |
| 2. Team & User Management | 3 | 20h | Week 2-3 |
| 3. Review Cycle Management | 4 | 28h | Week 3-4 |
| 4. Manager Reviews | 4 | 32h | Week 4-5 |
| 5. Employee Self-Review | 3 | 20h | Week 5-6 |
| 6. Gap Analysis (WOW) | 3 | 24h | Week 6-7 |
| 7. Peer Feedback System | 4 | 28h | Week 7-8 |
| 8. Goal Setting | 3 | 16h | Week 8-9 |
| 9. Templates & Polish | 3 | 20h | Week 9-10 |
| **Total** | **31** | **220h** | **10-12 weeks** |

---

## Epic 1: Foundation & Auth

**Description:** Set up project infrastructure, authentication, and basic database schema
**Business Value:** Enables all other features to be built on solid foundation
**Success Criteria:** Users can sign up, log in, and see empty dashboard

### Story 1.1: Project Setup & Infrastructure

**As a** developer
**I want** a properly configured Next.js project
**So that** I can build features quickly with good developer experience

**Acceptance Criteria:**
- [ ] Next.js 15 with App Router configured
- [ ] TypeScript strict mode enabled
- [ ] Prisma ORM connected to PostgreSQL
- [ ] shadcn/ui components installed and themed
- [ ] Tailwind CSS configured with custom colors
- [ ] Environment variables properly managed

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-1.1.1 | Initialize Next.js 15 project with TypeScript | 1h | None |
| T-1.1.2 | Configure Prisma with PostgreSQL connection | 2h | T-1.1.1 |
| T-1.1.3 | Install and configure shadcn/ui + Tailwind | 2h | T-1.1.1 |
| T-1.1.4 | Set up environment variables (.env.local, .env.example) | 1h | T-1.1.2 |
| T-1.1.5 | Configure ESLint, Prettier, Git hooks | 1h | T-1.1.1 |
| T-1.1.6 | Deploy initial app to Vercel | 1h | T-1.1.1 |

**Story Points:** 5

---

### Story 1.2: Authentication System

**As a** user
**I want** to sign up and log in securely
**So that** my data is protected

**Acceptance Criteria:**
- [ ] Given a new user, when they enter email, then they receive a magic link
- [ ] Given a returning user, when they click Google OAuth, then they're logged in
- [ ] Given a logged-in user, when they're inactive for 7 days, then session expires
- [ ] Given any page, when user is not authenticated, then redirect to login

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-1.2.1 | Install and configure Clerk (or NextAuth) | 2h | T-1.1.1 |
| T-1.2.2 | Create User model in Prisma schema | 1h | T-1.1.2 |
| T-1.2.3 | Build login page with email + Google OAuth | 3h | T-1.2.1 |
| T-1.2.4 | Build signup page with company creation | 3h | T-1.2.2 |
| T-1.2.5 | Implement auth middleware for protected routes | 2h | T-1.2.1 |
| T-1.2.6 | Add PostHog events: signup_started, signup_completed | 1h | T-1.2.4 |

**Story Points:** 8

---

### Story 1.3: Database Schema Design

**As a** system
**I want** a well-designed multi-tenant database schema
**So that** data is organized and queries are efficient

**Acceptance Criteria:**
- [ ] All core entities modeled (Company, User, ReviewCycle, Review, etc.)
- [ ] Multi-tenant isolation via companyId on all tables
- [ ] Indexes on frequently queried columns
- [ ] Foreign key relationships properly defined

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-1.3.1 | Design complete Prisma schema (all models) | 4h | T-1.1.2 |
| T-1.3.2 | Create initial migration | 1h | T-1.3.1 |
| T-1.3.3 | Seed database with test data | 2h | T-1.3.2 |
| T-1.3.4 | Document schema in README | 1h | T-1.3.1 |

**Story Points:** 5

---

### Story 1.4: App Shell & Navigation

**As a** user
**I want** a clean, consistent navigation experience
**So that** I can easily access different parts of the app

**Acceptance Criteria:**
- [ ] Sidebar navigation with Dashboard, Review Cycles, Team, Goals, Templates
- [ ] Responsive layout (collapses on mobile)
- [ ] User dropdown with profile, settings, logout
- [ ] Breadcrumbs on nested pages

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-1.4.1 | Build main layout component with sidebar | 3h | T-1.1.3 |
| T-1.4.2 | Build header with user dropdown | 2h | T-1.4.1, T-1.2.1 |
| T-1.4.3 | Add responsive sidebar (mobile drawer) | 2h | T-1.4.1 |
| T-1.4.4 | Create empty state components | 2h | T-1.4.1 |

**Story Points:** 5

---

## Epic 2: Team & User Management

**Description:** Manage company employees who will participate in reviews
**Business Value:** Foundation for assigning reviews and peer feedback
**Success Criteria:** Manager can add team members and assign manager relationships

### Story 2.1: Team Member Management

**As a** manager
**I want** to add and manage my team members
**So that** I can include them in review cycles

**Acceptance Criteria:**
- [ ] Given a manager, when they click "Add Team Member", then they can enter name/email
- [ ] Given team list, when viewing, then I see all employees with their role and manager
- [ ] Given an employee, when editing, then I can change their role and manager

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-2.1.1 | Build Team list page with table/cards | 3h | T-1.4.1 |
| T-2.1.2 | Build Add/Edit Team Member modal | 3h | T-2.1.1 |
| T-2.1.3 | Create Employee CRUD API routes | 3h | T-1.3.1 |
| T-2.1.4 | Add manager relationship (self-referential) | 2h | T-2.1.3 |
| T-2.1.5 | Add event: team_members_added | 1h | T-2.1.2 |

**Story Points:** 8

---

### Story 2.2: CSV Import

**As a** manager with many team members
**I want** to import employees from CSV
**So that** I don't have to add them one by one

**Acceptance Criteria:**
- [ ] Given a CSV file, when uploaded, then employees are created in bulk
- [ ] Given invalid CSV, when uploaded, then show clear error messages
- [ ] Given duplicate emails, when importing, then skip or update existing

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-2.2.1 | Build CSV upload component | 2h | T-2.1.1 |
| T-2.2.2 | Parse CSV and validate format | 2h | T-2.2.1 |
| T-2.2.3 | Bulk create employees with error handling | 2h | T-2.2.2 |
| T-2.2.4 | Show import results (success/errors) | 1h | T-2.2.3 |

**Story Points:** 5

---

### Story 2.3: Role-Based Permissions

**As an** admin
**I want** role-based access control
**So that** employees only see what they should

**Acceptance Criteria:**
- [ ] Roles: Admin, Manager, Employee
- [ ] Admins can manage all users and cycles
- [ ] Managers can manage their direct reports
- [ ] Employees can only see their own reviews

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-2.3.1 | Add role field to User model | 1h | T-1.3.1 |
| T-2.3.2 | Create authorization middleware | 2h | T-2.3.1 |
| T-2.3.3 | Apply permissions to API routes | 2h | T-2.3.2 |
| T-2.3.4 | Hide UI elements based on role | 2h | T-2.3.3 |

**Story Points:** 5

---

## Epic 3: Review Cycle Management

**Description:** Create and manage review cycles with deadlines and participants
**Business Value:** Core workflow - enables structured review process
**Success Criteria:** Manager can create a cycle, add participants, set deadlines, track completion

### Story 3.1: Create Review Cycle

**As a** manager
**I want** to create a review cycle
**So that** I can kick off quarterly reviews

**Acceptance Criteria:**
- [ ] Given manager dashboard, when clicking "New Cycle", then wizard opens
- [ ] Given wizard step 1, when entering name/dates, then cycle is configured
- [ ] Given wizard step 2, when selecting participants, then they're added to cycle
- [ ] Given wizard step 3, when setting deadlines, then reminders are scheduled

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-3.1.1 | Create ReviewCycle model and API | 2h | T-1.3.1 |
| T-3.1.2 | Build cycle creation wizard (3 steps) | 6h | T-3.1.1, T-1.4.1 |
| T-3.1.3 | Participant selection with checkboxes | 2h | T-3.1.2, T-2.1.1 |
| T-3.1.4 | Deadline configuration UI | 2h | T-3.1.2 |
| T-3.1.5 | Add event: first_cycle_created | 1h | T-3.1.2 |

**Story Points:** 8

---

### Story 3.2: Review Cycle Dashboard

**As a** manager
**I want** to see cycle progress at a glance
**So that** I know who's completed their reviews

**Acceptance Criteria:**
- [ ] Given active cycle, when viewing dashboard, then I see completion percentage
- [ ] Given participants, when viewing list, then I see status for each person
- [ ] Given pending items, when viewing, then I can click to take action

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-3.2.1 | Build cycle dashboard page | 4h | T-3.1.1 |
| T-3.2.2 | Create completion status calculations | 2h | T-3.2.1 |
| T-3.2.3 | Build participant status table | 2h | T-3.2.1 |
| T-3.2.4 | Add progress indicators (bars, percentages) | 2h | T-3.2.1 |

**Story Points:** 5

---

### Story 3.3: Automated Reminders

**As a** manager
**I want** automated email reminders
**So that** people complete reviews on time

**Acceptance Criteria:**
- [ ] Given deadline in 3 days, when time passes, then reminder email sent
- [ ] Given deadline in 1 day, when time passes, then urgent reminder sent
- [ ] Given deadline passed, when viewing dashboard, then show overdue status

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-3.3.1 | Set up Resend for transactional email | 2h | T-1.1.4 |
| T-3.3.2 | Create email templates (reminder, overdue) | 2h | T-3.3.1 |
| T-3.3.3 | Build cron job for checking deadlines | 3h | T-3.3.1 |
| T-3.3.4 | Send appropriate reminders based on deadline | 2h | T-3.3.3 |
| T-3.3.5 | Add event: email_delivered, email_bounced | 1h | T-3.3.4 |

**Story Points:** 5

---

### Story 3.4: Cycle History

**As a** manager
**I want** to view past review cycles
**So that** I can reference historical data

**Acceptance Criteria:**
- [ ] Given cycles list, when viewing, then I see all past cycles
- [ ] Given past cycle, when clicking, then I can view all reviews from that cycle
- [ ] Given employee, when viewing history, then I see reviews across cycles

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-3.4.1 | Build cycles list page with filters | 3h | T-3.1.1 |
| T-3.4.2 | Build cycle detail page (read-only for past) | 2h | T-3.4.1 |
| T-3.4.3 | Add employee review history view | 3h | T-3.4.2 |

**Story Points:** 5

---

## Epic 4: Manager Reviews

**Description:** Write and submit performance reviews for direct reports
**Business Value:** Core feature - the main thing managers do
**Success Criteria:** Manager can write, save, and submit a complete review

### Story 4.1: Review Writing Interface

**As a** manager
**I want** to write structured reviews
**So that** I can document employee performance

**Acceptance Criteria:**
- [ ] Given an employee in cycle, when clicking "Write Review", then form opens
- [ ] Given review form, when completing, then I can rate all competencies
- [ ] Given ratings, when completing, then I can add written feedback for each
- [ ] Given review, when submitting, then status changes to "Completed"

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-4.1.1 | Create Review model with competency ratings | 2h | T-1.3.1 |
| T-4.1.2 | Build review form with rating inputs | 4h | T-4.1.1 |
| T-4.1.3 | Add written feedback fields (textarea) | 2h | T-4.1.2 |
| T-4.1.4 | Build overall rating/summary section | 2h | T-4.1.2 |
| T-4.1.5 | Create review API routes (save, submit) | 2h | T-4.1.1 |
| T-4.1.6 | Add event: first_review_written | 1h | T-4.1.5 |

**Story Points:** 8

---

### Story 4.2: Auto-Save Drafts

**As a** manager
**I want** my reviews to auto-save
**So that** I don't lose work if something goes wrong

**Acceptance Criteria:**
- [ ] Given review form, when typing stops for 3 seconds, then draft is saved
- [ ] Given saved draft, when reopening, then all previous data is loaded
- [ ] Given auto-save, when successful, then show "Saved" indicator

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-4.2.1 | Implement debounced auto-save function | 2h | T-4.1.2 |
| T-4.2.2 | Add draft status to Review model | 1h | T-4.1.1 |
| T-4.2.3 | Build "Saved" indicator component | 1h | T-4.2.1 |
| T-4.2.4 | Handle save errors gracefully | 1h | T-4.2.1 |

**Story Points:** 3

---

### Story 4.3: Context Sidebar

**As a** manager
**I want** to see relevant context while writing
**So that** I can write more informed reviews

**Acceptance Criteria:**
- [ ] Given review form, when viewing sidebar, then I see employee's goals
- [ ] Given peer feedback completed, when viewing sidebar, then I see summarized feedback
- [ ] Given past reviews, when viewing sidebar, then I can reference them

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-4.3.1 | Build collapsible sidebar component | 2h | T-4.1.2 |
| T-4.3.2 | Display employee goals in sidebar | 2h | T-4.3.1 |
| T-4.3.3 | Display peer feedback summary in sidebar | 2h | T-4.3.1 |
| T-4.3.4 | Link to past reviews in sidebar | 1h | T-4.3.1 |

**Story Points:** 5

---

### Story 4.4: Share Review with Employee

**As a** manager
**I want** to share the completed review
**So that** employees can see their feedback

**Acceptance Criteria:**
- [ ] Given completed review, when clicking "Share", then employee is notified
- [ ] Given shared review, when employee views, then they see full feedback
- [ ] Given shared review, when including peer feedback, then it's anonymized

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-4.4.1 | Add "shared" status to Review model | 1h | T-4.1.1 |
| T-4.4.2 | Build share confirmation modal | 2h | T-4.4.1 |
| T-4.4.3 | Send notification email to employee | 2h | T-4.4.2, T-3.3.1 |
| T-4.4.4 | Build employee view of shared review | 3h | T-4.4.1 |
| T-4.4.5 | Add event: review_shared_to_employee | 1h | T-4.4.2 |

**Story Points:** 5

---

## Epic 5: Employee Self-Review

**Description:** Employees rate themselves on same criteria as manager
**Business Value:** Enables gap analysis - our differentiating feature
**Success Criteria:** Employee can complete self-review before manager review

### Story 5.1: Self-Review Form

**As an** employee
**I want** to complete a self-review
**So that** I can share my perspective with my manager

**Acceptance Criteria:**
- [ ] Given pending self-review, when opening, then I see same questions as manager
- [ ] Given self-review form, when completing, then I can rate myself and add comments
- [ ] Given self-review, when submitting, then manager can see it

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-5.1.1 | Create SelfReview model (same structure as Review) | 1h | T-4.1.1 |
| T-5.1.2 | Build self-review form (reuse review components) | 4h | T-5.1.1, T-4.1.2 |
| T-5.1.3 | Add accomplishments/highlights section | 2h | T-5.1.2 |
| T-5.1.4 | Add goals for next period section | 2h | T-5.1.2 |
| T-5.1.5 | Create self-review API routes | 2h | T-5.1.1 |
| T-5.1.6 | Add event: self_review_completed | 1h | T-5.1.5 |

**Story Points:** 8

---

### Story 5.2: Self-Review Dashboard (Employee View)

**As an** employee
**I want** to see my pending reviews
**So that** I know what I need to complete

**Acceptance Criteria:**
- [ ] Given employee dashboard, when viewing, then I see my pending self-reviews
- [ ] Given completed self-review, when viewing dashboard, then status shows "Completed"
- [ ] Given shared reviews, when viewing, then I can access them

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-5.2.1 | Build employee dashboard view | 3h | T-1.4.1 |
| T-5.2.2 | Show pending self-reviews list | 2h | T-5.2.1, T-5.1.1 |
| T-5.2.3 | Show completed/shared reviews | 2h | T-5.2.1 |

**Story Points:** 5

---

### Story 5.3: Self-Review Reminders

**As a** system
**I want** to remind employees about pending self-reviews
**So that** they complete them before deadline

**Acceptance Criteria:**
- [ ] Given self-review due in 3 days, when time passes, then reminder sent
- [ ] Given self-review overdue, when manager views, then show warning

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-5.3.1 | Add self-review to reminder cron job | 2h | T-3.3.3 |
| T-5.3.2 | Create self-review email template | 1h | T-3.3.2 |
| T-5.3.3 | Show "Self-review pending" warning to manager | 1h | T-4.1.2 |

**Story Points:** 3

---

## Epic 6: Gap Analysis (WOW Feature)

**Description:** Side-by-side comparison of manager vs self ratings
**Business Value:** Primary differentiator - transforms review meetings
**Success Criteria:** Manager sees clear visualization of rating differences

### Story 6.1: Gap Calculation Engine

**As a** system
**I want** to calculate gaps between ratings
**So that** I can highlight significant differences

**Acceptance Criteria:**
- [ ] Given manager + self ratings, when calculated, then gap = |manager - self|
- [ ] Given gaps, when processed, then sort by largest gap first
- [ ] Given gap >= 2, when displayed, then flag as "significant"

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-6.1.1 | Create gap calculation utility function | 2h | T-4.1.1, T-5.1.1 |
| T-6.1.2 | Create API endpoint for gap analysis data | 2h | T-6.1.1 |
| T-6.1.3 | Add sorting by gap size | 1h | T-6.1.2 |
| T-6.1.4 | Add significance threshold logic | 1h | T-6.1.2 |

**Story Points:** 5

---

### Story 6.2: Gap Analysis Dashboard

**As a** manager
**I want** to see gap analysis visually
**So that** I can quickly identify discussion points

**Acceptance Criteria:**
- [ ] Given completed reviews, when viewing gap analysis, then I see side-by-side ratings
- [ ] Given large gaps, when viewing, then they're highlighted in red/yellow
- [ ] Given aligned ratings, when viewing, then they're shown in green
- [ ] Given gap, when clicking, then I see written feedback from both sides

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-6.2.1 | Build gap analysis page layout | 4h | T-6.1.2 |
| T-6.2.2 | Create side-by-side rating visualization | 4h | T-6.2.1 |
| T-6.2.3 | Add color coding for gap severity | 2h | T-6.2.2 |
| T-6.2.4 | Display written feedback comparison | 2h | T-6.2.2 |
| T-6.2.5 | Add coaching tips for large gaps | 2h | T-6.2.3 |
| T-6.2.6 | Add event: gap_analysis_viewed | 1h | T-6.2.1 |

**Story Points:** 8

---

### Story 6.3: PDF Export

**As a** manager
**I want** to export gap analysis as PDF
**So that** I can use it in 1:1 meetings

**Acceptance Criteria:**
- [ ] Given gap analysis, when clicking "Export PDF", then PDF downloads
- [ ] Given PDF, when viewed, then it's formatted nicely for printing/sharing
- [ ] Given PDF, when generated, then it includes all ratings and feedback

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-6.3.1 | Install PDF generation library (react-pdf or puppeteer) | 1h | T-6.2.1 |
| T-6.3.2 | Create PDF template for gap analysis | 4h | T-6.3.1 |
| T-6.3.3 | Build export API endpoint | 2h | T-6.3.2 |
| T-6.3.4 | Add download button to UI | 1h | T-6.3.3 |
| T-6.3.5 | Add event: gap_analysis_pdf_exported | 1h | T-6.3.4 |

**Story Points:** 5

---

## Epic 7: Peer Feedback System

**Description:** Collect and aggregate anonymous feedback from peers
**Business Value:** Enables true 360-degree reviews
**Success Criteria:** Manager sees aggregated, anonymous peer feedback

### Story 7.1: Peer Selection

**As a** manager
**I want** to select peer reviewers
**So that** I get 360-degree perspective

**Acceptance Criteria:**
- [ ] Given review cycle, when configuring, then I can select 2-5 peers per employee
- [ ] Given peer selection, when complete, then peers are notified
- [ ] Alternatively, employee nominates and manager approves

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-7.1.1 | Create PeerFeedback model | 2h | T-1.3.1 |
| T-7.1.2 | Build peer selection UI in cycle wizard | 3h | T-7.1.1, T-3.1.2 |
| T-7.1.3 | Add employee nomination flow | 3h | T-7.1.2 |
| T-7.1.4 | Send notification to selected peers | 2h | T-7.1.2, T-3.3.1 |

**Story Points:** 5

---

### Story 7.2: Peer Feedback Form

**As a** peer
**I want** to submit feedback for a colleague
**So that** they get 360 perspective

**Acceptance Criteria:**
- [ ] Given peer feedback request, when opening, then I see short form (3-5 questions)
- [ ] Given form, when completing, then I can rate and provide written feedback
- [ ] Given submission, when complete, then my identity is not visible to recipient

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-7.2.1 | Build peer feedback form (3-5 questions) | 3h | T-7.1.1 |
| T-7.2.2 | Create peer feedback API routes | 2h | T-7.2.1 |
| T-7.2.3 | Store feedback without attribution | 1h | T-7.2.2 |
| T-7.2.4 | Show anonymity assurance in UI | 1h | T-7.2.1 |

**Story Points:** 5

---

### Story 7.3: Feedback Aggregation

**As a** system
**I want** to aggregate peer feedback
**So that** individual responses aren't identifiable

**Acceptance Criteria:**
- [ ] Given 3+ peer responses, when aggregating, then show combined themes
- [ ] Given <3 responses, when aggregating, then show warning about anonymity
- [ ] Given aggregated feedback, when displayed, then show response count, not names

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-7.3.1 | Create aggregation logic | 3h | T-7.2.2 |
| T-7.3.2 | Build aggregated feedback display component | 3h | T-7.3.1 |
| T-7.3.3 | Add minimum response threshold (3) | 1h | T-7.3.1 |
| T-7.3.4 | Display "3 peers responded" not names | 1h | T-7.3.2 |

**Story Points:** 5

---

### Story 7.4: Peer Feedback Reminders

**As a** system
**I want** to remind peers about pending feedback
**So that** they submit before deadline

**Acceptance Criteria:**
- [ ] Given peer feedback due in 3 days, when time passes, then reminder sent
- [ ] Given incomplete feedback, when manager views, then show warning

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-7.4.1 | Add peer feedback to reminder cron job | 2h | T-3.3.3 |
| T-7.4.2 | Create peer feedback email template | 1h | T-3.3.2 |
| T-7.4.3 | Show peer feedback status on dashboard | 2h | T-3.2.1 |

**Story Points:** 3

---

## Epic 8: Goal Setting

**Description:** Set and track goals that connect to reviews
**Business Value:** Provides context for reviews, shows progress over time
**Success Criteria:** Goals visible during review writing, tracked across cycles

### Story 8.1: Goal CRUD

**As an** employee
**I want** to create and track goals
**So that** my objectives are documented

**Acceptance Criteria:**
- [ ] Given goal form, when completing, then I can set title, description, due date
- [ ] Given goal, when updating, then I can change status (In Progress, Completed, etc.)
- [ ] Given goal list, when viewing, then I see all my goals with status

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-8.1.1 | Create Goal model | 1h | T-1.3.1 |
| T-8.1.2 | Build goals list page | 3h | T-8.1.1 |
| T-8.1.3 | Build add/edit goal modal | 2h | T-8.1.2 |
| T-8.1.4 | Create goal API routes | 2h | T-8.1.1 |
| T-8.1.5 | Add status update functionality | 1h | T-8.1.4 |

**Story Points:** 5

---

### Story 8.2: Goals in Review Context

**As a** manager
**I want** to see employee goals while writing reviews
**So that** I can assess progress and set context

**Acceptance Criteria:**
- [ ] Given review form, when viewing sidebar, then employee goals appear
- [ ] Given goals, when displayed, then show status and progress
- [ ] Given completed goals, when displayed, then highlight achievements

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-8.2.1 | Add goals to review sidebar | 2h | T-4.3.1, T-8.1.1 |
| T-8.2.2 | Display goal progress indicators | 1h | T-8.2.1 |
| T-8.2.3 | Include goals in review PDF export | 2h | T-8.2.1 |

**Story Points:** 3

---

### Story 8.3: Goal Carry Forward

**As an** employee
**I want** incomplete goals to carry forward
**So that** I don't lose track of ongoing objectives

**Acceptance Criteria:**
- [ ] Given new review cycle, when starting, then option to carry forward goals
- [ ] Given incomplete goal, when carried forward, then it appears in new period

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-8.3.1 | Add carry forward option in cycle creation | 2h | T-3.1.2, T-8.1.1 |
| T-8.3.2 | Copy incomplete goals to new period | 2h | T-8.3.1 |
| T-8.3.3 | Show "Carried from Q1" badge on goals | 1h | T-8.3.2 |

**Story Points:** 3

---

## Epic 9: Templates & Polish

**Description:** Pre-built templates and final polish for launch
**Business Value:** Reduces friction for new users, improves overall experience
**Success Criteria:** 6 templates ready, UI polished, analytics complete

### Story 9.1: Pre-built Templates

**As a** manager
**I want** pre-built role templates
**So that** I don't start from scratch

**Acceptance Criteria:**
- [ ] Given template selection, when viewing, then I see 6 role templates
- [ ] Given template, when selected, then competencies are pre-populated
- [ ] Given template, when customizing, then I can add/remove competencies

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-9.1.1 | Create Template model | 1h | T-1.3.1 |
| T-9.1.2 | Seed 6 default templates (Engineering IC, Manager, Product, Sales, General IC, General Manager) | 4h | T-9.1.1 |
| T-9.1.3 | Build template selection UI | 2h | T-9.1.2 |
| T-9.1.4 | Build template customization UI | 3h | T-9.1.3 |
| T-9.1.5 | Save customized templates for reuse | 2h | T-9.1.4 |

**Story Points:** 8

---

### Story 9.2: Analytics & Instrumentation

**As a** product owner
**I want** complete analytics instrumentation
**So that** I can track user behavior and conversion

**Acceptance Criteria:**
- [ ] Given all events in PRD, when triggered, then they fire to PostHog
- [ ] Given funnel events, when tracked, then conversion rates are visible
- [ ] Given SLC events, when tracked, then we can measure Simple/Lovable/Complete

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-9.2.1 | Install and configure PostHog | 2h | T-1.1.1 |
| T-9.2.2 | Create event tracking utility | 1h | T-9.2.1 |
| T-9.2.3 | Instrument all funnel events from PRD | 3h | T-9.2.2 |
| T-9.2.4 | Instrument SLC-specific events | 2h | T-9.2.3 |
| T-9.2.5 | Set up PostHog dashboards | 2h | T-9.2.4 |

**Story Points:** 5

---

### Story 9.3: UI Polish & Edge Cases

**As a** user
**I want** a polished, bug-free experience
**So that** I trust the product

**Acceptance Criteria:**
- [ ] Given any empty state, when viewing, then helpful messaging appears
- [ ] Given any error, when occurring, then clear error message shown
- [ ] Given loading states, when waiting, then spinners/skeletons shown
- [ ] Given mobile device, when using, then layout is responsive

**Tasks:**
| ID | Task | Estimate | Dependencies |
|----|------|----------|--------------|
| T-9.3.1 | Add empty states to all list views | 2h | All epics |
| T-9.3.2 | Add error boundaries and error states | 2h | All epics |
| T-9.3.3 | Add loading skeletons throughout | 2h | All epics |
| T-9.3.4 | Mobile responsive audit and fixes | 3h | All epics |
| T-9.3.5 | Cross-browser testing (Chrome, Firefox, Safari) | 2h | All epics |

**Story Points:** 5

---

## Technical Debt / Infrastructure

### TD-001: Set up Analytics Infrastructure
**Reason:** Need to track funnel events from PRD
**Priority:** High (Week 1)
**Estimate:** 4 hours
**Tasks:**
- [x] Choose PostHog (free tier for startups)
- [ ] Add tracking code to app
- [ ] Define custom events from PRD funnel
- [ ] Test event firing

### TD-002: Set up CI/CD Pipeline
**Reason:** Deploy to staging/production reliably
**Priority:** High (Week 1)
**Estimate:** 3 hours
**Tasks:**
- [ ] Configure Vercel auto-deploy from main branch
- [ ] Set up preview deploys for PRs
- [ ] Configure environment variables in Vercel

### TD-003: Database Backups
**Reason:** Protect user data
**Priority:** Medium (Week 4)
**Estimate:** 2 hours
**Tasks:**
- [ ] Configure automated daily backups (Railway/Supabase feature)
- [ ] Test backup restoration process

### TD-004: Error Monitoring
**Reason:** Catch and fix production errors
**Priority:** Medium (Week 4)
**Estimate:** 2 hours
**Tasks:**
- [ ] Install Sentry or similar
- [ ] Configure error reporting
- [ ] Set up Slack alerts for critical errors

---

## Sprint Planning View

### Sprint 1: Foundation (Weeks 1-2)
**Goal:** Core database, auth, and app shell working
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-1.1.1 | Initialize Next.js project | 1h | ⬜ Not Started |
| T-1.1.2 | Configure Prisma + PostgreSQL | 2h | ⬜ Not Started |
| T-1.1.3 | Install shadcn/ui + Tailwind | 2h | ⬜ Not Started |
| T-1.2.1 | Configure Clerk/NextAuth | 2h | ⬜ Not Started |
| T-1.2.2 | Create User model | 1h | ⬜ Not Started |
| T-1.2.3 | Build login page | 3h | ⬜ Not Started |
| T-1.2.4 | Build signup page | 3h | ⬜ Not Started |
| T-1.3.1 | Design complete Prisma schema | 4h | ⬜ Not Started |
| T-1.4.1 | Build main layout + sidebar | 3h | ⬜ Not Started |
| T-1.4.2 | Build header + user dropdown | 2h | ⬜ Not Started |
| TD-001 | Set up PostHog | 4h | ⬜ Not Started |
| TD-002 | Set up CI/CD | 3h | ⬜ Not Started |

**Total committed:** 30 hours

---

### Sprint 2: Team & Cycles (Weeks 3-4)
**Goal:** Team management and review cycle creation working
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-2.1.* | Team member management | 12h | ⬜ Not Started |
| T-2.2.* | CSV import | 7h | ⬜ Not Started |
| T-3.1.* | Create review cycle | 13h | ⬜ Not Started |
| T-3.2.* | Cycle dashboard | 10h | ⬜ Not Started |

**Total committed:** 42 hours

---

### Sprint 3: Core Reviews (Weeks 5-6)
**Goal:** Manager reviews and self-reviews working
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-4.1.* | Review writing interface | 13h | ⬜ Not Started |
| T-4.2.* | Auto-save drafts | 5h | ⬜ Not Started |
| T-5.1.* | Self-review form | 12h | ⬜ Not Started |
| T-5.2.* | Employee dashboard | 7h | ⬜ Not Started |

**Total committed:** 37 hours

---

### Sprint 4: Gap Analysis + Peer Feedback (Weeks 7-8)
**Goal:** WOW feature (gap analysis) and peer feedback working
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-6.1.* | Gap calculation engine | 6h | ⬜ Not Started |
| T-6.2.* | Gap analysis dashboard | 15h | ⬜ Not Started |
| T-7.1.* | Peer selection | 10h | ⬜ Not Started |
| T-7.2.* | Peer feedback form | 7h | ⬜ Not Started |

**Total committed:** 38 hours

---

### Sprint 5: Complete & Polish (Weeks 9-10)
**Goal:** Goals, templates, reminders, and polish
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-7.3.* | Feedback aggregation | 8h | ⬜ Not Started |
| T-8.1.* | Goal CRUD | 9h | ⬜ Not Started |
| T-9.1.* | Pre-built templates | 12h | ⬜ Not Started |
| T-3.3.* | Automated reminders | 10h | ⬜ Not Started |

**Total committed:** 39 hours

---

### Sprint 6: Launch Prep (Weeks 11-12)
**Goal:** Final polish, testing, launch
**Capacity:** 40 hours

| Task ID | Description | Estimate | Status |
|---------|-------------|----------|--------|
| T-4.4.* | Share review with employee | 9h | ⬜ Not Started |
| T-6.3.* | PDF export | 9h | ⬜ Not Started |
| T-9.2.* | Analytics instrumentation | 10h | ⬜ Not Started |
| T-9.3.* | UI polish + edge cases | 11h | ⬜ Not Started |

**Total committed:** 39 hours

---

## Backlog (Post-Launch)

| ID | Task | Epic | Notes |
|----|------|------|-------|
| B-001 | AI-assisted review writing | Reviews | v1.1 - differentiation opportunity |
| B-002 | HRIS integrations (BambooHR, Gusto) | Integrations | Based on customer requests |
| B-003 | Mobile app (React Native) | Platform | If mobile usage is high |
| B-004 | Upward feedback (manager reviews) | Reviews | 360 from employee to manager |
| B-005 | Team analytics dashboard | Analytics | Trends across team/time |
| B-006 | Custom competency frameworks | Templates | Enterprise feature |
| B-007 | SSO/SAML support | Auth | Enterprise feature |
| B-008 | API for integrations | Platform | Developer-focused customers |

---

## Definition of Done

A task is "Done" when:
- [ ] Code complete and self-reviewed
- [ ] Tested manually (happy path + edge cases)
- [ ] Analytics events firing correctly (verify in PostHog)
- [ ] Deployed to staging
- [ ] Acceptance criteria verified
- [ ] No console errors
- [ ] Mobile responsive (if applicable)
- [ ] Loading and error states handled
- [ ] Documentation updated (if applicable)
