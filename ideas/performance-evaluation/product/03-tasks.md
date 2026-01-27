# Development Tasks

*Generated for: Performance Evaluation Tool*

---

## Epic Overview

| Epic | Priority | Est. Hours | Sprint |
|------|----------|------------|--------|
| E1: Account & Team Setup | P0 | 21h | 1 |
| E2: Review Templates | P0/P1 | 25h | 1-2 |
| E3: Review Cycles | P0 | 23h | 2 |
| E4: Self-Reviews | P0/P1 | 15h | 2 |
| E5: Peer Feedback | P0/P1 | 21h | 3 |
| E6: Manager Reviews & Gap Analysis | P0 | 28h | 3 |
| E7: Notifications & Reminders | P0/P1 | 9h | 3 |
| **Total MVP** | - | **142h** | ~4-5 weeks |

---

## Epic 1: Account & Team Setup

### User Stories

**U1.1: Manager Sign Up** (P0, 4h)
- As a manager, I can sign up with email/password

**U1.2: Invite Employees** (P0, 6h)
- As a manager, I can create a team and invite employees via email

**U1.3: CSV Import** (P1, 4h)
- As a manager, I can import employees from CSV

**U1.4: Reporting Relationships** (P0, 4h)
- As a manager, I can assign who reports to whom

**U1.5: Accept Invitation** (P0, 3h)
- As an employee, I can accept invitation and create account

### Tasks

#### U1.1: Manager Sign Up (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T1.1.1 | Create signup page UI (email, password, name, company) | 1h | [ ] |
| T1.1.2 | Implement signup API endpoint with validation | 1.5h | [ ] |
| T1.1.3 | Add email verification flow | 1h | [ ] |
| T1.1.4 | Create account confirmation page | 0.5h | [ ] |

#### U1.2: Invite Employees (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T1.2.1 | Create team settings page | 1h | [ ] |
| T1.2.2 | Build invite form (name, email, role, manager) | 1.5h | [ ] |
| T1.2.3 | Implement invite API with email sending | 2h | [ ] |
| T1.2.4 | Create pending invitations list with resend/cancel | 1h | [ ] |
| T1.2.5 | Add invite tracking in database | 0.5h | [ ] |

#### U1.3: CSV Import (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T1.3.1 | Create CSV upload UI with drag-and-drop | 1h | [ ] |
| T1.3.2 | Build CSV parser with column mapping | 1.5h | [ ] |
| T1.3.3 | Add validation and error display | 1h | [ ] |
| T1.3.4 | Process imports in batch with progress indicator | 0.5h | [ ] |

#### U1.4: Reporting Relationships (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T1.4.1 | Add manager assignment to employee profile | 1h | [ ] |
| T1.4.2 | Create org hierarchy view (simple list, not tree) | 1.5h | [ ] |
| T1.4.3 | Allow bulk manager assignment | 1h | [ ] |
| T1.4.4 | Update database schema for manager_id relationship | 0.5h | [ ] |

#### U1.5: Accept Invitation (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T1.5.1 | Create invitation landing page with token validation | 1h | [ ] |
| T1.5.2 | Build password setup form for invited users | 1h | [ ] |
| T1.5.3 | Link accepted user to team and manager | 0.5h | [ ] |
| T1.5.4 | Handle expired/invalid invitation tokens | 0.5h | [ ] |

---

## Epic 2: Review Templates

### User Stories

**U2.1: Pre-built Templates** (P0, 8h)
- As a manager, I can choose from pre-built templates

**U2.2: Customize Templates** (P1, 6h)
- As a manager, I can customize template questions

**U2.3: Create Templates** (P2, 8h)
- As a manager, I can create a template from scratch

**U2.4: Template Previews** (P1, 3h)
- As a manager, I can preview templates before selecting

### Tasks

#### U2.1: Pre-built Templates (8h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T2.1.1 | Create template data model (sections, questions, rating scales) | 1.5h | [ ] |
| T2.1.2 | Build template library page | 1.5h | [ ] |
| T2.1.3 | Create Engineering template (Jr/Mid/Sr variants) | 1.5h | [ ] |
| T2.1.4 | Create Product Manager template | 1h | [ ] |
| T2.1.5 | Create Sales template | 1h | [ ] |
| T2.1.6 | Create General Manager template | 1h | [ ] |
| T2.1.7 | Add template selection to cycle creation flow | 0.5h | [ ] |

#### U2.2: Customize Templates (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T2.2.1 | Create template editor UI | 2h | [ ] |
| T2.2.2 | Allow adding/removing questions | 1.5h | [ ] |
| T2.2.3 | Allow editing question text and rating labels | 1h | [ ] |
| T2.2.4 | Save customized template as team's version | 1h | [ ] |
| T2.2.5 | Add question reordering (drag and drop) | 0.5h | [ ] |

#### U2.3: Create Templates from Scratch (8h) - P2

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T2.3.1 | Build blank template creation flow | 2h | [ ] |
| T2.3.2 | Create section management (add/edit/delete sections) | 2h | [ ] |
| T2.3.3 | Build question builder (type, required, rating scale) | 2h | [ ] |
| T2.3.4 | Add template sharing/export functionality | 2h | [ ] |

#### U2.4: Template Previews (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T2.4.1 | Create template preview modal | 1.5h | [ ] |
| T2.4.2 | Show all questions with sample responses | 1h | [ ] |
| T2.4.3 | Add "Use This Template" CTA in preview | 0.5h | [ ] |

---

## Epic 3: Review Cycles

### User Stories

**U3.1: Create Cycle** (P0, 6h)
- As a manager, I can create a review cycle

**U3.2: Select Components** (P0, 4h)
- As a manager, I can select review components (self, peer, manager)

**U3.3: Set Deadlines** (P0, 3h)
- As a manager, I can set deadlines for each review type

**U3.4: Launch Cycle** (P0, 4h)
- As a manager, I can launch a cycle which notifies participants

**U3.5: View Progress** (P0, 6h)
- As a manager, I can see cycle progress

### Tasks

#### U3.1: Create Cycle (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T3.1.1 | Create cycle data model (name, dates, status, participants) | 1h | [ ] |
| T3.1.2 | Build cycle creation wizard (multi-step form) | 2h | [ ] |
| T3.1.3 | Add participant selection (by team or individual) | 1.5h | [ ] |
| T3.1.4 | Create cycle draft saving | 1h | [ ] |
| T3.1.5 | Add cycle listing page with filters | 0.5h | [ ] |

#### U3.2: Select Components (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T3.2.1 | Add component checkboxes to cycle creation | 1h | [ ] |
| T3.2.2 | Handle conditional logic (peer requires employee count) | 1h | [ ] |
| T3.2.3 | Configure peer feedback settings (num peers, anonymization) | 1.5h | [ ] |
| T3.2.4 | Store component configuration in cycle model | 0.5h | [ ] |

#### U3.3: Set Deadlines (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T3.3.1 | Create date picker for each component type | 1h | [ ] |
| T3.3.2 | Add deadline validation (sequence must be logical) | 1h | [ ] |
| T3.3.3 | Configure reminder timing options | 1h | [ ] |

#### U3.4: Launch Cycle (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T3.4.1 | Create launch confirmation dialog | 0.5h | [ ] |
| T3.4.2 | Send launch notification emails to all participants | 1.5h | [ ] |
| T3.4.3 | Create review instances for each participant | 1h | [ ] |
| T3.4.4 | Update cycle status to "active" | 0.5h | [ ] |
| T3.4.5 | Schedule reminder jobs based on deadlines | 0.5h | [ ] |

#### U3.5: View Progress (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T3.5.1 | Create cycle detail page with progress overview | 2h | [ ] |
| T3.5.2 | Build participant list with status indicators | 1.5h | [ ] |
| T3.5.3 | Add completion percentages by component type | 1h | [ ] |
| T3.5.4 | Create progress timeline visualization | 1h | [ ] |
| T3.5.5 | Add filtering (completed, pending, overdue) | 0.5h | [ ] |

---

## Epic 4: Self-Reviews

### User Stories

**U4.1: Request Email** (P0, 2h)
- As an employee, I receive email when self-review requested

**U4.2: Complete Self-Review** (P0, 8h)
- As an employee, I can complete my self-review

**U4.3: Save Draft** (P1, 3h)
- As an employee, I can save review as draft

**U4.4: View Submission** (P0, 2h)
- As an employee, I can see my self-review after submitting

### Tasks

#### U4.1: Request Email (2h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T4.1.1 | Create self-review request email template | 0.5h | [ ] |
| T4.1.2 | Include direct link to review form in email | 0.5h | [ ] |
| T4.1.3 | Trigger email on cycle launch for each participant | 1h | [ ] |

#### U4.2: Complete Self-Review (8h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T4.2.1 | Create self-review form page | 2h | [ ] |
| T4.2.2 | Build rating input component (1-5 scale with labels) | 1.5h | [ ] |
| T4.2.3 | Build text response component | 1h | [ ] |
| T4.2.4 | Add section navigation (previous/next) | 1h | [ ] |
| T4.2.5 | Show progress indicator | 0.5h | [ ] |
| T4.2.6 | Implement form validation (required fields) | 1h | [ ] |
| T4.2.7 | Create submission confirmation | 1h | [ ] |

#### U4.3: Save Draft (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T4.3.1 | Auto-save form data every 30 seconds | 1h | [ ] |
| T4.3.2 | Add "Save Draft" button | 0.5h | [ ] |
| T4.3.3 | Restore draft on page reload | 1h | [ ] |
| T4.3.4 | Show "Draft saved" indicator | 0.5h | [ ] |

#### U4.4: View Submission (2h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T4.4.1 | Create read-only view of submitted self-review | 1h | [ ] |
| T4.4.2 | Show submission timestamp | 0.5h | [ ] |
| T4.4.3 | Add to employee dashboard | 0.5h | [ ] |

---

## Epic 5: Peer Feedback

### User Stories

**U5.1: Request Peer Feedback** (P0, 4h)
- As a manager, I can request peer feedback for my reports

**U5.2: Suggest Peers** (P1, 3h)
- As an employee, I can suggest peers who should review me

**U5.3: Feedback Request Email** (P0, 2h)
- As a peer, I receive email when feedback is requested

**U5.4: Submit Anonymous Feedback** (P0, 6h)
- As a peer, I can submit anonymous feedback

**U5.5: View Aggregated Feedback** (P0, 6h)
- As a manager, I can see aggregated peer feedback

### Tasks

#### U5.1: Request Peer Feedback (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T5.1.1 | Create peer selection interface (multi-select from team) | 1.5h | [ ] |
| T5.1.2 | Set number of required peer reviews per employee | 0.5h | [ ] |
| T5.1.3 | Validate peer selections (can't review self, managers) | 1h | [ ] |
| T5.1.4 | Store peer feedback requests in database | 1h | [ ] |

#### U5.2: Suggest Peers (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T5.2.1 | Add peer suggestion UI for employees | 1h | [ ] |
| T5.2.2 | Manager approval/rejection of suggestions | 1.5h | [ ] |
| T5.2.3 | Notify manager of pending suggestions | 0.5h | [ ] |

#### U5.3: Feedback Request Email (2h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T5.3.1 | Create peer feedback request email template | 0.5h | [ ] |
| T5.3.2 | Include link to feedback form with secure token | 1h | [ ] |
| T5.3.3 | Send emails when peer feedback is requested | 0.5h | [ ] |

#### U5.4: Submit Anonymous Feedback (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T5.4.1 | Create peer feedback form page | 2h | [ ] |
| T5.4.2 | Build peer-specific questions (strengths, growth areas) | 1h | [ ] |
| T5.4.3 | Implement anonymization layer (no reviewer tracking in responses) | 1.5h | [ ] |
| T5.4.4 | Show anonymity assurance UI elements | 0.5h | [ ] |
| T5.4.5 | Create submission confirmation | 1h | [ ] |

#### U5.5: View Aggregated Feedback (6h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T5.5.1 | Create peer feedback summary view | 2h | [ ] |
| T5.5.2 | Aggregate quantitative ratings (show averages) | 1h | [ ] |
| T5.5.3 | Display text responses without attribution | 1.5h | [ ] |
| T5.5.4 | Show response rate (X of Y peers responded) | 0.5h | [ ] |
| T5.5.5 | Generate insights/themes from responses | 1h | [ ] |

---

## Epic 6: Manager Reviews & Gap Analysis

### User Stories

**U6.1: Complete Manager Review** (P0, 8h)
- As a manager, I can complete my review of a direct report

**U6.2: Gap Analysis** (P0, 8h)
- As a manager, I can see gap analysis (self vs manager)

**U6.3: View Peer Feedback** (P0, 4h)
- As a manager, I can see peer feedback alongside my review

**U6.4: Share Review** (P0, 4h)
- As a manager, I can share completed review with employee

**U6.5: Employee View** (P0, 4h)
- As an employee, I can view my completed review

### Tasks

#### U6.1: Complete Manager Review (8h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T6.1.1 | Create manager review form (same structure as self-review) | 2h | [ ] |
| T6.1.2 | Pre-populate with employee's self-review responses (read-only) | 1.5h | [ ] |
| T6.1.3 | Add manager-specific questions (promotion readiness, etc.) | 1h | [ ] |
| T6.1.4 | Build overall rating/summary section | 1.5h | [ ] |
| T6.1.5 | Implement form validation and submission | 1h | [ ] |
| T6.1.6 | Update review status tracking | 1h | [ ] |

#### U6.2: Gap Analysis (8h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T6.2.1 | Create gap analysis view layout | 2h | [ ] |
| T6.2.2 | Build side-by-side rating comparison component | 2h | [ ] |
| T6.2.3 | Calculate and display gap scores per question | 1.5h | [ ] |
| T6.2.4 | Highlight significant gaps (>1 point difference) | 1h | [ ] |
| T6.2.5 | Generate coaching insights based on gaps | 1h | [ ] |
| T6.2.6 | Create overall gap summary statistics | 0.5h | [ ] |

#### U6.3: View Peer Feedback in Review (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T6.3.1 | Add peer feedback tab to manager review view | 1h | [ ] |
| T6.3.2 | Display aggregated peer ratings | 1h | [ ] |
| T6.3.3 | Show peer comments inline with anonymization | 1h | [ ] |
| T6.3.4 | Allow manager to reference peer feedback in their review | 1h | [ ] |

#### U6.4: Share Review (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T6.4.1 | Create "Share with Employee" action button | 0.5h | [ ] |
| T6.4.2 | Build review sharing confirmation dialog | 0.5h | [ ] |
| T6.4.3 | Send notification email to employee | 1h | [ ] |
| T6.4.4 | Update review status to "shared" | 0.5h | [ ] |
| T6.4.5 | Create PDF export of completed review | 1.5h | [ ] |

#### U6.5: Employee View (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T6.5.1 | Create employee review view page | 1.5h | [ ] |
| T6.5.2 | Show self-review and manager review together | 1h | [ ] |
| T6.5.3 | Display gap analysis from employee perspective | 1h | [ ] |
| T6.5.4 | Add to employee dashboard "My Reviews" section | 0.5h | [ ] |

---

## Epic 7: Notifications & Reminders

### User Stories

**U7.1: Deadline Reminders** (P0, 4h)
- As a participant, I receive reminder emails before deadlines

**U7.2: Manual Reminders** (P1, 3h)
- As a manager, I can manually send reminders

**U7.3: Completion Notifications** (P1, 2h)
- As a manager, I get notified when cycle is complete

### Tasks

#### U7.1: Deadline Reminders (4h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T7.1.1 | Create reminder email templates (3-day, 1-day, overdue) | 1h | [ ] |
| T7.1.2 | Build scheduled job to check deadlines daily | 1.5h | [ ] |
| T7.1.3 | Send appropriate reminder based on deadline proximity | 1h | [ ] |
| T7.1.4 | Track reminder sent status to prevent duplicates | 0.5h | [ ] |

#### U7.2: Manual Reminders (3h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T7.2.1 | Add "Send Reminder" button to pending participants | 1h | [ ] |
| T7.2.2 | Create manual reminder email with custom message option | 1h | [ ] |
| T7.2.3 | Log reminder history | 1h | [ ] |

#### U7.3: Completion Notifications (2h)

| Task | Description | Est. | Status |
|------|-------------|------|--------|
| T7.3.1 | Detect when all reviews in cycle are complete | 0.5h | [ ] |
| T7.3.2 | Send completion summary email to manager | 1h | [ ] |
| T7.3.3 | Update cycle status to "completed" | 0.5h | [ ] |

---

## Sprint Plan

### Sprint 1 (Week 1-2): Foundation

| Task | Est. | Priority |
|------|------|----------|
| T1.1.1-T1.1.4: Manager Signup | 4h | P0 |
| T1.2.1-T1.2.5: Invite Employees | 6h | P0 |
| T1.4.1-T1.4.4: Reporting Relationships | 4h | P0 |
| T1.5.1-T1.5.4: Accept Invitation | 3h | P0 |
| T2.1.1-T2.1.7: Pre-built Templates | 8h | P0 |
| **Sprint 1 Total** | **25h** | |

### Sprint 2 (Week 3-4): Review Cycles & Self-Reviews

| Task | Est. | Priority |
|------|------|----------|
| T3.1.1-T3.5.5: All Review Cycle Tasks | 23h | P0 |
| T4.1.1-T4.4.3: Self-Review Tasks | 15h | P0 |
| **Sprint 2 Total** | **38h** | |

### Sprint 3 (Week 5-6): Peer Feedback & Manager Reviews

| Task | Est. | Priority |
|------|------|----------|
| T5.1.1-T5.5.5: Peer Feedback Tasks | 21h | P0 |
| T6.1.1-T6.5.4: Manager Review & Gap Analysis | 28h | P0 |
| T7.1.1-T7.3.3: Notifications | 9h | P0 |
| **Sprint 3 Total** | **58h** | |

### Sprint 4 (Week 7-8): Polish & Beta

| Task | Est. | Priority |
|------|------|----------|
| T1.3.1-T1.3.4: CSV Import | 4h | P1 |
| T2.2.1-T2.2.5: Template Customization | 6h | P1 |
| T2.4.1-T2.4.3: Template Previews | 3h | P1 |
| Bug fixes and polish | 8h | P0 |
| **Sprint 4 Total** | **21h** | |

---

## Total Estimates

| Sprint | Hours | Weeks |
|--------|-------|-------|
| Sprint 1 | 25h | 1-2 |
| Sprint 2 | 38h | 3-4 |
| Sprint 3 | 58h | 5-6 |
| Sprint 4 | 21h | 7-8 |
| **Total** | **142h** | **8 weeks** |

At 20-25 hours/week development time: **6-8 weeks to MVP**

---

*Next artifact: 04-pricing-strategy.md*
