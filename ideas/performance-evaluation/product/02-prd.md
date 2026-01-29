# Product Requirements Document

> **Purpose:** Defines exactly what TeamPulse will do (and NOT do). Follows SLC methodology: Simple (focused scope), Lovable (delightful UX), Complete (whole workflows). Includes PRD at a Glance, Conversion Funnel, and Text Wireframes.
>
> **Fits in:** Source of truth for Development Tasks (03). Engineering uses this to build. Update when scope changes.

## Document Info
- **Product:** TeamPulse
- **Version:** 1.0 (SLC Launch)
- **Methodology:** Simple, Lovable, Complete (not traditional MVP)
- **Author:** Product Manager
- **Last Updated:** January 2026
- **Status:** Draft

---

## PRD at a Glance

*One-page decision box - the essence of this PRD*

### Product Philosophy
| Principle | How We Apply It |
|-----------|-----------------|
| **Simple** | Reviews + Goals + Feedback only. No OKRs, no engagement surveys, no weekly check-ins. |
| **Lovable** | Gap analysis that makes managers say "wow" - side-by-side self vs manager ratings |
| **Complete** | Full review cycle: create, self-review, peer feedback, manager review, share results |

### Core Definition
- **Target persona:** First-time engineering managers at 10-50 person tech companies
- **Core job-to-be-done:** Run comprehensive 360-degree performance reviews without enterprise complexity or cost
- **SLC promise:** A complete review cycle from launch to shared results in under 30 minutes setup, with gap analysis that transforms review meetings into coaching conversations

### Core Feature Set (Competitive with Non-Enterprise Market)
*Include ALL features that 80% of users in competing products use regularly. The product must feel COMPLETE.*

**Core Features (Must have - 80%+ user adoption in market):**
1. **Manager Performance Reviews:** Create, write, and share structured reviews with employees - *Used by 95% of competitor users*
2. **Employee Self-Review:** Employees rate themselves on same criteria as manager - *Used by 85% of competitor users*
3. **Gap Analysis Dashboard:** Side-by-side comparison of self vs manager ratings with highlighted differences - *Used by 70%, our WOW feature*
4. **Peer Feedback System:** Request, collect, and aggregate anonymous peer feedback - *Used by 75% of competitor users*
5. **Goal Setting & Tracking:** Set quarterly goals, track progress, reference in reviews - *Used by 60% of competitor users*
6. **Pre-built Role Templates:** Engineering, Sales, Manager, Individual Contributor templates with level-specific criteria - *Used by 80% of competitor users*

**Supporting Features (Complete the workflow):**
1. **Review Cycle Management:** Create review periods, set deadlines, track completion - *Required for complete user experience*
2. **Automated Reminders:** Email/notification reminders for pending reviews - *Required for completion rates*
3. **Review History:** Access past reviews for reference and growth tracking - *Required for complete user experience*
4. **Team Dashboard:** View team completion rates and basic analytics - *Required for managers*

### "Wow" Feature (MAP - What Makes Us Stand Out)
**The one thing that makes users say "wow":**
- **Feature:** Gap Analysis Dashboard
- **Why it's special:** Small Improvements (main SMB competitor) doesn't show self vs manager comparison. We show ratings side-by-side with highlighted gaps, turning awkward review meetings into productive coaching conversations.
- **User delight moment:** When a manager clicks "View Gap Analysis" and sees exactly where they rated their employee differently than the employee rated themselves - sparking a specific, actionable coaching discussion.

### Critical Assumptions
- **Riskiest assumption:** Engineering managers at small companies will pay $6-8 PEPM for gap analysis and proper 360 feedback instead of continuing with Google Docs
- **MVE validation:** Landing page with "gap analysis" as headline feature, track signup intent

### Success Criteria (SLC Metrics)
| Dimension | Metric | Target | Timeline |
|-----------|--------|--------|----------|
| **Simple** | Time to first review cycle launched | <15 min | Week 2 |
| **Simple** | Time to complete one review | <20 min | Week 2 |
| **Lovable** | NPS score | >40 | Week 8 |
| **Lovable** | Gap analysis feature adoption | >70% of reviews | Week 4 |
| **Complete** | Review cycle completion rate | >80% | Week 4 |
| **Complete** | Self-review completion rate | >80% | Week 4 |
| **Business** | Weekly Active Users | 50 | Week 8 |
| **Business** | Free-to-paid conversion | 25% | Week 12 |

### Explicitly NOT Building (Keeps Us Simple)
*Only exclude features that <20% of users need or are enterprise-specific. Everything else should be included to feel COMPLETE.*
- No Weekly check-ins - *<30% use in SMB segment, separate workflow*
- No OKR platform - *Teams use Notion/dedicated tools, <25% want bundled*
- No Engagement surveys - *Different buying decision, separate product category*
- No 1:1 meeting tools - *Many alternatives exist, not core to reviews*
- No HRIS integrations - *V2 feature, manual employee management sufficient for 10-50*
- No SSO/SAML - *Enterprise feature, <10% of target market needs this*
- No Calibration tools - *Large team feature, not needed under 50 employees*

---

## Executive Summary

### Problem Statement
First-time engineering managers and HR leads at 10-50 person companies are stuck between expensive enterprise tools ($11+ PEPM) and basic solutions that lack critical features. Lattice and 15Five are overkill with OKRs, engagement surveys, and complex setup. Small Improvements is affordable but missing self-review gap analysis and proper anonymous 360 feedback. Many resort to Google Docs, creating chaos: lost reviews, no employee visibility, inconsistent criteria, and zero historical tracking.

### Solution Overview
TeamPulse delivers the core review features that 80% of users actually need - manager reviews, employee self-review with gap analysis, peer feedback with anonymous aggregation, and goal tracking - at 50% the cost of enterprise tools. Setup takes 15 minutes, not 2 weeks. The "wow" moment: managers see exactly where their ratings differ from their employees', transforming review meetings from awkward monologues into focused coaching conversations.

### Success Metrics
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Primary: Monthly Active Teams | 0 | 50 | Month 6 |
| Secondary: Review Completion Rate | 0% | >80% | Month 2 |
| Revenue: MRR | $0 | $3-5K | Month 6 |

---

## User Stories

### Primary User Persona
**Name:** Engineering Manager (First-Time)
**Goal:** As an engineering manager with 6 direct reports, I want to run structured 360-degree reviews so that I can give consistent feedback and help my team grow
**Context:** End of quarter, preparing for review cycle, 15-30 minutes per review
**Pain today:** Copy-pasting from last quarter's Google Doc, no way for employees to see their reviews, no peer feedback, worried about being inconsistent

### User Stories (Prioritized)

#### Core Features (COMPLETE - 80%+ market adoption)
*Include ALL features that make the product feel WHOLE. Users should never feel like something is missing.*

| ID | Story | Acceptance Criteria | SLC Dimension |
|----|-------|---------------------|---------------|
| US-001 | As a manager, I want to create a review cycle so that I can kick off quarterly reviews | Given a logged-in manager, when I click "New Review Cycle", then I can set cycle name, date range, and select participants | Complete - core workflow |
| US-002 | As a manager, I want to select a template so that I don't start from scratch | Given review cycle creation, when I choose a template, then questions are pre-populated based on role type | Complete - table stakes |
| US-003 | As a manager, I want to write performance reviews for my team so that I can document their performance | Given an active review cycle, when I select an employee, then I can rate them on all criteria and add written feedback | Complete - core use case |
| US-004 | As an employee, I want to complete a self-review so that I can share my perspective | Given a pending self-review, when I open it, then I can rate myself on same criteria as manager and add comments | Complete - expected feature |
| US-005 | As an employee, I want to submit peer feedback so that colleagues get 360 perspective | Given a peer feedback request, when I submit, then my feedback is stored anonymously | Complete - expected feature |
| US-006 | As a manager, I want to see aggregated peer feedback so that I have full picture | Given completed peer feedback, when I view an employee, then I see anonymized, aggregated feedback themes | Complete - expected feature |
| US-007 | As a manager, I want to share reviews with employees so that they receive feedback | Given a completed review, when I click "Share", then employee receives notification and can view their review | Complete - core workflow |
| US-008 | As an employee, I want to view my review so that I understand my performance | Given a shared review, when I open it, then I can see manager feedback, peer feedback, and my self-review | Complete - core workflow |
| US-009 | As a user, I want to set and track goals so that reviews connect to objectives | Given an employee profile, when I add goals, then they appear in review context | Complete - expected feature |
| US-010 | As a manager, I want automated reminders so that people complete reviews on time | Given a review cycle with deadlines, when deadline approaches, then participants receive email reminders | Simple - reduces friction |

#### "Wow" Feature (LOVABLE - Differentiation)
*The one feature that makes users love us, not just use us*

| ID | Story | Acceptance Criteria | Why It's "Wow" |
|----|-------|---------------------|----------------|
| US-WOW | As a manager, I want to see gap analysis between my ratings and employee self-ratings so that I can have better coaching conversations | Given completed manager + self-review, when I view "Gap Analysis", then I see side-by-side ratings with differences highlighted and sorted by largest gaps | Competitors skip this - transforms reviews from monologue to dialogue |

#### Quality of Life (LOVABLE - Polish)
*Small touches that show we care about UX*

| ID | Story | Acceptance Criteria | Why Include |
|----|-------|---------------------|-------------|
| US-011 | As a user, I want to save draft reviews so that I don't lose work | Given a review in progress, when I navigate away, then my work is auto-saved | Reduces friction |
| US-012 | As a manager, I want review history so that I can reference past feedback | Given an employee, when I view history, then I see all past reviews organized by date | Complete workflow |
| US-013 | As a manager, I want a completion dashboard so that I can track cycle progress | Given an active cycle, when I view dashboard, then I see who's completed vs pending | Reduces anxiety |

#### NOT Building (Keeps Us SIMPLE)
*Only features with <20% adoption or enterprise-specific*

| ID | Story | Why Skip |
|----|-------|----------|
| US-SKIP-1 | As a user, I want weekly check-ins | Different workflow, <30% adoption, 15Five's differentiator |
| US-SKIP-2 | As a user, I want OKR management | Teams use Notion/dedicated tools, scope creep |
| US-SKIP-3 | As HR, I want engagement surveys | Separate product category, different buying decision |
| US-SKIP-4 | As admin, I want SSO/SAML | Enterprise feature, <10% of target market |
| US-SKIP-5 | As HR, I want calibration tools | Large team feature, target is <50 employees |

---

## Functional Requirements

### Feature 1: Review Cycle Management

**Description:** Create and manage review cycles with participants, templates, and deadlines
**User story:** US-001, US-002, US-010
**Priority:** Must Have

**Requirements:**
- [ ] FR-1.1: Create review cycle with name, start date, end date
- [ ] FR-1.2: Add participants (employees to be reviewed)
- [ ] FR-1.3: Select from pre-built templates or create custom
- [ ] FR-1.4: Set self-review deadline (before manager review deadline)
- [ ] FR-1.5: Set peer feedback deadline
- [ ] FR-1.6: Set manager review deadline
- [ ] FR-1.7: Configure automated email reminders (3 days before, 1 day before, on due date)
- [ ] FR-1.8: View cycle progress dashboard (completed vs pending by participant)

**Out of scope:**
- Multiple parallel review cycles
- Review cycle templates (reuse previous cycle settings)

**UI/UX Notes:**
- Wizard-style creation (3 steps: basics, participants, schedule)
- Default templates prominently displayed with "Customize" option
- Progress dashboard shows completion % and individual status

---

### Feature 2: Manager Performance Reviews

**Description:** Write structured reviews for direct reports with ratings and written feedback
**User story:** US-003
**Priority:** Must Have

**Requirements:**
- [ ] FR-2.1: Display review form based on selected template
- [ ] FR-2.2: Rating scale (1-5 with clear labels) for each competency
- [ ] FR-2.3: Written feedback field for each competency
- [ ] FR-2.4: Overall rating summary
- [ ] FR-2.5: Overall written summary field
- [ ] FR-2.6: Auto-save every 30 seconds
- [ ] FR-2.7: Submit review (moves to ready-to-share status)
- [ ] FR-2.8: View peer feedback while writing (if available)
- [ ] FR-2.9: View employee goals in sidebar for context

**Out of scope:**
- AI-assisted writing suggestions (v2)
- Multiple manager reviews for same employee

**UI/UX Notes:**
- Single-page form with sticky navigation
- Peer feedback visible in collapsible sidebar
- Character count for written sections (suggest 100-500 chars)

---

### Feature 3: Employee Self-Review

**Description:** Employees rate themselves on same criteria as manager review
**User story:** US-004
**Priority:** Must Have

**Requirements:**
- [ ] FR-3.1: Display same questions/competencies as manager review
- [ ] FR-3.2: Rating scale matches manager review exactly (1-5)
- [ ] FR-3.3: Written self-assessment for each competency
- [ ] FR-3.4: Overall self-rating
- [ ] FR-3.5: Accomplishments/highlights section
- [ ] FR-3.6: Goals for next period section
- [ ] FR-3.7: Auto-save drafts
- [ ] FR-3.8: Submit before manager review deadline

**Out of scope:**
- Multiple self-reviews in one cycle
- Self-review templates different from manager templates

**UI/UX Notes:**
- Clear progress indicator (X of Y sections complete)
- Encouraging copy ("Your perspective matters")
- Mobile-friendly for employees on-the-go

---

### Feature 4: Gap Analysis Dashboard (WOW Feature)

**Description:** Side-by-side comparison of manager ratings vs employee self-ratings
**User story:** US-WOW
**Priority:** Must Have (Differentiator)

**Requirements:**
- [ ] FR-4.1: Display manager rating and self-rating for each competency side-by-side
- [ ] FR-4.2: Calculate gap (difference) for each competency
- [ ] FR-4.3: Highlight gaps >= 2 points as "significant"
- [ ] FR-4.4: Sort competencies by gap size (largest first) by default
- [ ] FR-4.5: Show overall rating comparison
- [ ] FR-4.6: Display written feedback from both perspectives
- [ ] FR-4.7: Export gap analysis as PDF for 1:1 meetings
- [ ] FR-4.8: Accessible to manager before sharing full review

**Out of scope:**
- Historical gap analysis trends
- Team-wide gap patterns

**UI/UX Notes:**
- Clean, visual comparison (bar charts or side-by-side columns)
- Color coding: green (aligned), yellow (minor gap), red (significant gap)
- "Coaching tip" prompts for large gaps ("This competency has a 2-point gap. Consider discussing perception vs reality.")

---

### Feature 5: Peer Feedback System

**Description:** Request, collect, and aggregate anonymous feedback from peers
**User story:** US-005, US-006
**Priority:** Must Have

**Requirements:**
- [ ] FR-5.1: Manager selects 2-5 peer reviewers per employee
- [ ] FR-5.2: OR employee nominates peers (manager approves)
- [ ] FR-5.3: Peer feedback form: 3-5 questions (strengths, areas for growth, collaboration rating)
- [ ] FR-5.4: Peer feedback is anonymous (no individual attribution)
- [ ] FR-5.5: Aggregate feedback when 3+ peers respond (protect anonymity)
- [ ] FR-5.6: Show aggregated themes to manager
- [ ] FR-5.7: Include in final review shared with employee (anonymized)
- [ ] FR-5.8: Deadline reminders for peer reviewers

**Out of scope:**
- 360 feedback from manager's manager (upward feedback)
- Cross-team feedback (only direct peers)

**UI/UX Notes:**
- Quick form (should take <5 min per peer)
- Anonymity prominently stated ("Your feedback is anonymous")
- Manager sees "3 peers responded" not names

---

### Feature 6: Goal Setting & Tracking

**Description:** Set quarterly goals, track progress, reference in reviews
**User story:** US-009
**Priority:** Must Have

**Requirements:**
- [ ] FR-6.1: Create goals with title, description, due date
- [ ] FR-6.2: Goal status: Not Started, In Progress, Completed, Missed
- [ ] FR-6.3: Progress updates (manual percentage or status change)
- [ ] FR-6.4: Goals visible during review writing (sidebar reference)
- [ ] FR-6.5: Include goal progress in review summary
- [ ] FR-6.6: Carry forward incomplete goals to next period
- [ ] FR-6.7: Manager can view employee goals
- [ ] FR-6.8: Employee owns goal creation and updates

**Out of scope:**
- OKR hierarchy (company > team > individual)
- Goal alignment/linking
- Key Results tracking

**UI/UX Notes:**
- Simple list view with status badges
- Quick add (title only, details optional)
- Progress indicator (% or status)

---

### Feature 7: Pre-built Role Templates

**Description:** Ready-to-use review templates for common roles
**User story:** US-002
**Priority:** Must Have

**Requirements:**
- [ ] FR-7.1: Engineering IC template (Jr/Mid/Senior/Staff levels)
- [ ] FR-7.2: Engineering Manager template
- [ ] FR-7.3: Product Manager template
- [ ] FR-7.4: Sales/Business Development template
- [ ] FR-7.5: General Individual Contributor template
- [ ] FR-7.6: General Manager template
- [ ] FR-7.7: Each template: 5-8 competencies with descriptions
- [ ] FR-7.8: Customize any template (add/remove/edit competencies)
- [ ] FR-7.9: Save customized templates for reuse

**Out of scope:**
- Industry-specific templates
- Template marketplace

**UI/UX Notes:**
- Template preview before selection
- "Most popular" badge on Engineering IC template
- Copy with one click to customize

---

## Non-Functional Requirements

### Performance
- Page load time: <2 seconds (core flows)
- API response time: <500ms (P95)
- Concurrent users supported: 500+ (50 companies x 10 users each)
- Auto-save latency: <1 second

### Security
- Authentication: Email magic link + Google OAuth
- Authorization: Role-based (admin, manager, employee)
- Data encryption: At rest (AES-256) and in transit (TLS 1.3)
- Data isolation: Multi-tenant with strict tenant separation
- Compliance: GDPR baseline (data export, deletion)

### Scalability
- Expected load: 100-500 active users in first 3 months
- Growth projection: 30% MoM
- Database: PostgreSQL (not SQLite - needs multi-tenant from start)
- Spike handling: Review deadline days have 10x normal load

---

## Conversion Funnel & Instrumentation

*Track the complete user journey from first touch to paid customer*

### Conversion Funnel

| Stage | Event Name | Description | Target Conversion | Notes |
|-------|------------|-------------|-------------------|-------|
| **Visit** | `landing_page_view` | User lands on homepage | 100% (baseline) | Track source (linkedin, organic, referral) |
| | `pricing_page_view` | User views pricing | 40% of visits | Strong buying intent signal |
| **Signup** | `signup_started` | User clicks "Start Free Trial" | 15% of visits | |
| | `signup_completed` | Account created | 10% of visits | Track signup method (email, google) |
| **Activate** | `onboarding_started` | Enters onboarding | 90% of signups | |
| | `team_members_added` | Adds first team members | 70% of signups | Critical activation step |
| | `first_cycle_created` | Creates first review cycle | 60% of signups | Core activation event |
| **Engage** | `first_review_written` | Completes first manager review | 50% of activated | Value realization |
| | `self_review_completed` | Employee completes self-review | 40% of activated | Team engagement |
| | `gap_analysis_viewed` | Manager views gap analysis | 35% of activated | WOW feature adoption |
| **Retain** | `day_7_active` | Active on day 7 | 30% of activated | Retention milestone |
| | `second_cycle_created` | Creates another review cycle | 25% of activated | Habit formed |
| **Pay** | `trial_upgrade_clicked` | Clicks upgrade during trial | 15% of activated | |
| | `payment_completed` | Converts to paid | 10% of activated | Track plan selected |

### SLC-Specific Events

**"Lovable" Metrics:**
- `gap_analysis_viewed` - Track adoption of standout feature
- `gap_analysis_pdf_exported` - High-value usage
- `nps_response_submitted` - Capture NPS scores
- `review_shared_to_employee` - Completing the loop
- `positive_feedback_given` - Qualitative signals

**"Complete" Metrics:**
- `review_cycle_completed` - Full workflow end-to-end
- `review_abandoned` - Where users drop off (incompleteness signal)
- `help_requested` - Confusion points (incompleteness signal)
- `template_selected` - Template vs custom usage

**"Simple" Metrics:**
- `time_to_first_cycle` - How fast users get value
- `onboarding_completed` - Easy to get started
- `error_encountered` - Friction points
- `time_per_review` - Efficiency metric

**System Events:**
- `page_load_time` - Performance monitoring
- `api_error` - Backend failures
- `email_delivered` - Notification success
- `email_bounced` - Contact issues

---

## Technical Constraints

- **Tech stack:** Next.js 15 (App Router) + Prisma + PostgreSQL + shadcn/ui
- **Hosting:** Vercel (frontend) + Railway or Supabase (database)
- **Third-party dependencies:**
  - Stripe: Payment processing
  - Resend: Transactional email (reminders, notifications)
  - PostHog: Product analytics
  - Clerk or NextAuth: Authentication

---

## Scope & Timeline

### Launch Scope (SLC Product)
**Release date target:** 10-12 weeks from start

**SIMPLE - Focused scope:**
- Review cycle creation with templates
- Manager reviews with ratings + feedback
- Employee self-reviews on same criteria
- Goal setting and tracking
- Automated reminders

**LOVABLE - Delightful experience:**
- Gap analysis dashboard (WOW feature)
- Clean, modern UI with shadcn components
- Auto-save everywhere
- PDF export for 1:1 meetings

**COMPLETE - Whole workflows:**
- Full cycle: create -> self-review -> peer feedback -> manager review -> share
- Review history accessible
- Team completion dashboard
- 6 pre-built role templates

**NOT included (Keeps us SIMPLE):**
1. Weekly check-ins - Different workflow, <30% adoption
2. OKR platform - Teams use dedicated tools
3. Engagement surveys - Separate product category
4. SSO/SAML - Enterprise feature
5. Calibration tools - Large team feature
6. HRIS integrations - V2

### Milestones

| Milestone | SLC Focus | Target Date |
|-----------|-----------|-------------|
| MVE | Landing page live, validate positioning | Week 1-2 |
| Foundation | Auth, database, basic UI shell | Week 2-4 |
| Alpha | SIMPLE - Review cycle flow works end-to-end | Week 5-7 |
| Beta | COMPLETE - Self-review, peer feedback, gap analysis | Week 8-10 |
| Launch | LOVABLE - Polish, templates, production-ready | Week 11-12 |

---

## Open Questions

| Question | Owner | Due Date | Decision |
|----------|-------|----------|----------|
| Single-tenant vs multi-tenant database design? | Engineering | Week 2 | TBD - recommend multi-tenant from start |
| Should peer feedback require 3+ responses for anonymity? | Product | Week 3 | Leaning yes |
| PDF export styling - custom or standard? | Product | Week 6 | TBD |
| Mobile app or mobile web only? | Product | Week 8 | Mobile web for SLC |

---

## Appendix

### Text-Based Wireframes

#### Dashboard View (Manager)
```
+------------------------------------------------------------------+
| TeamPulse        [Search...]        [Bell] [Settings] [Avatar v] |
+------------------------------------------------------------------+
|                                                                   |
| [Sidebar]        Dashboard                                        |
| Dashboard*                                                        |
| Review Cycles    Hello, Sarah! Here's your team's status.        |
| Team                                                              |
| Goals            +------------------+  +------------------+       |
| Templates        | Active Cycle     |  | Completion Rate |       |
|                  | Q1 2026 Reviews  |  |     67%         |       |
|                  | 8 days left      |  |  [====----]     |       |
|                  +------------------+  +------------------+       |
|                                                                   |
|                  Pending Reviews                    [View All >]  |
|                  +---------------------------------------------+  |
|                  | [ ] Alex Kim - Self-review pending          |  |
|                  | [ ] Jordan Lee - Manager review due         |  |
|                  | [x] Sam Chen - Completed                    |  |
|                  | [ ] Taylor Wu - Peer feedback pending       |  |
|                  +---------------------------------------------+  |
|                                                                   |
|                  Quick Actions                                    |
|                  [+ New Cycle]  [Write Review]  [View Gap Report] |
|                                                                   |
+------------------------------------------------------------------+
```

#### Review Writing View (Manager)
```
+------------------------------------------------------------------+
| TeamPulse        Q1 2026 Review - Alex Kim          [Save Draft] |
+------------------------------------------------------------------+
|                                                                   |
| [<- Back]        Review for: Alex Kim (Software Engineer L3)     |
|                  Template: Engineering IC - Mid-Level             |
|                                                                   |
| Progress: [====------] 4/10 competencies rated                   |
|                                                                   |
| +---------------------------+  +-------------------------------+  |
| | Competencies              |  | Peer Feedback (3 responses)   |  |
| |                           |  |                               |  |
| | 1. Technical Skills    *  |  | Strengths:                    |  |
| |    [==x==] 4/5            |  | - "Great code reviews"        |  |
| |    [Write feedback...]    |  | - "Always helps teammates"    |  |
| |                           |  |                               |  |
| | 2. Communication       *  |  | Areas for growth:             |  |
| |    [==x==] 3/5            |  | - "Could speak up more"       |  |
| |    [Write feedback...]    |  |                               |  |
| |                           |  | +---------------------------+ |  |
| | 3. Problem Solving        |  | | Alex's Goals              | |  |
| |    [Select rating...]     |  | | - Ship auth feature [Done]| |  |
| |                           |  | | - Mentor new hire [75%]   | |  |
| | 4. Collaboration          |  | +---------------------------+ |  |
| |    [Select rating...]     |  |                               |  |
| |                           |  |                               |  |
| | [...]                     |  |                               |  |
| +---------------------------+  +-------------------------------+  |
|                                                                   |
| Overall Rating: [Select...]    Auto-saved 10 seconds ago         |
|                                                                   |
|                                      [Save Draft] [Submit Review] |
+------------------------------------------------------------------+
```

#### Gap Analysis View (WOW Feature)
```
+------------------------------------------------------------------+
| TeamPulse        Gap Analysis - Alex Kim            [Export PDF] |
+------------------------------------------------------------------+
|                                                                   |
| [<- Back]        Manager vs Self-Review Comparison               |
|                  Q1 2026 Review Cycle                             |
|                                                                   |
| +---------------------------------------------------------------+|
| |                    OVERALL RATING                              ||
| |  Manager: [====x] 3.8/5     Self: [=====x] 4.2/5    Gap: 0.4  ||
| +---------------------------------------------------------------+|
|                                                                   |
| Competencies (sorted by gap size)                [Sort: Gap v]   |
|                                                                   |
| +---------------------------------------------------------------+|
| | Communication                              GAP: 1.5 points (!)||
| | +----------------------------------------------------------+  ||
| | | Manager: [==x--] 3/5  |  Self: [====x] 4.5/5             |  ||
| | +----------------------------------------------------------+  ||
| | Manager said: "Sometimes unclear in meetings..."              ||
| | Self said: "I communicate proactively with stakeholders..."   ||
| | [!] Coaching tip: Large gap - discuss perception vs reality   ||
| +---------------------------------------------------------------+|
|                                                                   |
| +---------------------------------------------------------------+|
| | Technical Skills                           GAP: 0.5 points    ||
| | +----------------------------------------------------------+  ||
| | | Manager: [====x] 4/5  |  Self: [====x] 4.5/5             |  ||
| | +----------------------------------------------------------+  ||
| | Manager said: "Strong debugging skills..."                    ||
| | Self said: "Confident in code quality..."                     ||
| +---------------------------------------------------------------+|
|                                                                   |
| +---------------------------------------------------------------+|
| | Problem Solving                            GAP: 0 points (!)  ||
| | +----------------------------------------------------------+  ||
| | | Manager: [====x] 4/5  |  Self: [====x] 4/5               |  ||
| | +----------------------------------------------------------+  ||
| | [Aligned] Both agree on this competency                       ||
| +---------------------------------------------------------------+|
|                                                                   |
|                                      [Share with Employee] [PDF] |
+------------------------------------------------------------------+
```

#### Employee Self-Review View
```
+------------------------------------------------------------------+
| TeamPulse        Q1 2026 Self-Review              [Save Draft]   |
+------------------------------------------------------------------+
|                                                                   |
| Your Self-Review for Q1 2026                                     |
| Due: March 15, 2026 (5 days remaining)                           |
|                                                                   |
| Your perspective matters! This helps your manager understand     |
| how you see your own performance.                                |
|                                                                   |
| Progress: [========--] 80% complete                               |
|                                                                   |
| 1. Technical Skills                                   [Completed]|
| +---------------------------------------------------------------+|
| | How would you rate your technical skills this quarter?         ||
| |                                                                ||
| | [1] [2] [3] [4*] [5]                                           ||
| |  Poor      Average      Excellent                              ||
| |                                                                ||
| | Describe your technical contributions:                         ||
| | +-----------------------------------------------------------+ ||
| | | I shipped the authentication feature ahead of schedule,   | ||
| | | improved our test coverage to 80%, and mentored two new...| ||
| | +-----------------------------------------------------------+ ||
| +---------------------------------------------------------------+|
|                                                                   |
| 2. Communication                                         [Edit]  |
| +---------------------------------------------------------------+|
| | ...                                                            ||
| +---------------------------------------------------------------+|
|                                                                   |
| Highlights & Accomplishments                                     |
| +---------------------------------------------------------------+|
| | What are you most proud of this quarter?                       ||
| | +-----------------------------------------------------------+ ||
| | | [Your response...]                                        | ||
| | +-----------------------------------------------------------+ ||
| +---------------------------------------------------------------+|
|                                                                   |
|                                [Save Draft]  [Submit Self-Review] |
+------------------------------------------------------------------+
```

#### Empty State (New User - No Cycles)
```
+------------------------------------------------------------------+
| TeamPulse        [Search...]        [Bell] [Settings] [Avatar v] |
+------------------------------------------------------------------+
|                                                                   |
| [Sidebar]                                                         |
| Dashboard*                                                        |
| Review Cycles                                                     |
| Team                                                              |
| Goals                     +-------------------------------+       |
| Templates                 |                               |       |
|                           |         [Calendar Icon]       |       |
|                           |                               |       |
|                           |  No review cycles yet         |       |
|                           |                               |       |
|                           |  Create your first review     |       |
|                           |  cycle to start giving your   |       |
|                           |  team structured feedback.    |       |
|                           |                               |       |
|                           |  [+ Create First Cycle]       |       |
|                           |                               |       |
|                           |  Need help? Watch a 2-min     |       |
|                           |  setup walkthrough [>]        |       |
|                           |                               |       |
|                           +-------------------------------+       |
|                                                                   |
+------------------------------------------------------------------+
```

#### Error State
```
+---------------------------------------------------------------+
|                                                               |
|  [!] Unable to load review data                               |
|                                                               |
|  This might be due to:                                        |
|  * Network connection issues                                  |
|  * Server maintenance                                         |
|  * Session expired                                            |
|                                                               |
|  [Refresh Page]  [Contact Support]                            |
|                                                               |
+---------------------------------------------------------------+
```

### User Research
[Link to interview notes folder once interviews conducted]

### Competitor Screenshots
[Folder with Lattice, 15Five, Small Improvements screenshots for reference]
