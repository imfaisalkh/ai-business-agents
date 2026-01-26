# Development Tasks (Epics, Stories, Tasks)

## Implementation Phases

### Phase 1: Foundation (Weeks 1-6)

#### Epic 1.1: Authentication & User Management
**Goal:** Users can sign up, log in, and manage their account

- [ ] **Task 1.1.1:** Set up Nuxt Auth (email/password + Google OAuth)
  - Implement sign up, login, logout flows
  - Email verification workflow
  - Password reset via email
  - Session management (30-day expiry)
  - **Estimate:** 1 week

- [ ] **Task 1.1.2:** User profile management
  - Edit profile (name, email, role)
  - Upload avatar (optional)
  - Account settings page
  - **Estimate:** 3 days

#### Epic 1.2: Team Setup & Management
**Goal:** Managers can import and manage their team

- [ ] **Task 1.2.1:** Slack integration for team import
  - OAuth connection to Slack workspace
  - Fetch team members from Slack
  - Map Slack users to app users (email match)
  - **Estimate:** 1 week

- [ ] **Task 1.2.2:** CSV import for team setup
  - Upload CSV (Name, Email, Role, Level)
  - Validate format, show preview
  - Bulk invite team members via email
  - **Estimate:** 3 days

- [ ] **Task 1.2.3:** Manual team member management
  - Add individual team member form
  - Edit team member details (role, level, manager)
  - Deactivate/remove team members
  - **Estimate:** 2 days

#### Epic 1.3: Database Schema & Core Models
**Goal:** Database supports reviews, goals, peer feedback

- [ ] **Task 1.3.1:** Define core tables
  - Users (id, email, name, role, team_id)
  - Teams (id, name, company_name, plan)
  - ReviewCycles (id, name, start_date, end_date, status)
  - Reviews (id, employee_id, manager_id, cycle_id, status)
  - SelfReviews (id, review_id, competency_ratings, reflections)
  - ManagerReviews (id, review_id, competency_ratings, comments, goals)
  - PeerFeedback (id, review_id, peer_id, responses, is_anonymous)
  - Goals (id, review_id, description, status, due_date)
  - **Estimate:** 1 week

- [ ] **Task 1.3.2:** Set up Prisma ORM + migrations
  - Define Prisma schema
  - Create initial migration
  - Seed database with test data (templates)
  - **Estimate:** 3 days

**Phase 1 Total: 6 weeks**

---

### Phase 2: Self-Review + Gap Analysis MVP (Weeks 7-14)

#### Epic 2.1: Review Templates
**Goal:** Managers can select pre-built role templates

- [ ] **Task 2.1.1:** Create template library
  - Software Engineer (Junior/Mid/Senior) - 6 competencies each
  - Manager (Team Lead/Senior Manager) - 7 competencies
  - Sales Rep (SDR/AE/Manager) - 6 competencies
  - Store templates in database
  - **Estimate:** 1 week

- [ ] **Task 2.1.2:** Template selection UI
  - Browse templates by role
  - Preview competencies and questions
  - Select template → Create review cycle
  - **Estimate:** 3 days

#### Epic 2.2: Review Cycle Management
**Goal:** Managers can launch and track review cycles

- [ ] **Task 2.2.1:** Create review cycle wizard
  - Step 1: Name the cycle (Q1 2026)
  - Step 2: Select template
  - Step 3: Choose team members to review
  - Step 4: Set deadline for self-reviews
  - Step 5: Launch (send notifications)
  - **Estimate:** 1 week

- [ ] **Task 2.2.2:** Manager dashboard
  - Show active review cycles
  - Progress bar (X/Y reviews completed)
  - Action items (pending self-reviews, gap analyses to review)
  - **Estimate:** 1 week

#### Epic 2.3: Employee Self-Review
**Goal:** Employees can complete self-reviews

- [ ] **Task 2.3.1:** Self-review form (employee view)
  - Display competencies from template
  - Star rating input (1-5 scale)
  - Text area for reflections (What went well? What to improve?)
  - Save draft functionality
  - Submit button (triggers notification to manager)
  - **Estimate:** 1 week

- [ ] **Task 2.3.2:** Email & Slack notifications
  - Send "Self-review request" email to employee
  - Send Slack DM (if Slack connected)
  - Send "Self-review submitted" notification to manager
  - Reminder emails (3 days before deadline, 1 day before)
  - **Estimate:** 3 days

#### Epic 2.4: Manager Gap Analysis View (Differentiator!)
**Goal:** Managers see side-by-side comparison of ratings

- [ ] **Task 2.4.1:** Gap analysis screen (Screen 2 wireframe)
  - Fetch employee self-ratings and manager preliminary ratings
  - Display side-by-side table (Employee | Manager | Gap)
  - Highlight large gaps (>2 points) with warning icon
  - Show coaching insight ("This suggests confidence issue")
  - Display employee's text reflections
  - **Estimate:** 1.5 weeks

- [ ] **Task 2.4.2:** Manager rating form
  - Rate each competency (1-5 stars)
  - Add overall comments
  - Set 3-5 goals for next quarter (with due dates)
  - Save draft or finalize review
  - **Estimate:** 1 week

- [ ] **Task 2.4.3:** Share review with employee
  - Manager clicks "Share Review"
  - Employee receives email + Slack notification
  - Employee can view final review (read-only)
  - **Estimate:** 3 days

**Phase 2 Total: 8 weeks**

---

### Phase 3: Peer Feedback + Analytics (Weeks 15-20)

#### Epic 3.1: Peer Feedback System
**Goal:** Employees can request and submit anonymous peer feedback

- [ ] **Task 3.1.1:** Peer feedback request (employee view)
  - Select 2-3 teammates from dropdown
  - Send peer feedback requests
  - Track status (pending, submitted)
  - **Estimate:** 3 days

- [ ] **Task 3.1.2:** Peer feedback form (Screen 4 wireframe)
  - 3 open-ended questions (strengths, growth areas, start/stop/continue)
  - Anonymous submission (no attribution)
  - Skip or decline option
  - **Estimate:** 1 week

- [ ] **Task 3.1.3:** Peer feedback aggregation logic
  - Aggregate responses (remove identifying info)
  - Extract common themes (keyword matching or simple NLP)
  - Display in manager gap analysis view
  - **Estimate:** 1 week

#### Epic 3.2: Team Analytics Dashboard
**Goal:** Managers see team-wide trends (Screen 5 wireframe)

- [ ] **Task 3.2.1:** Completion metrics
  - Calculate review completion rate (X/Y completed)
  - Calculate peer feedback participation rate
  - Display progress bars
  - **Estimate:** 3 days

- [ ] **Task 3.2.2:** Performance distribution chart
  - Aggregate ratings across team
  - Group by performance level (1-2, 3-4, 5)
  - Display bar chart
  - **Estimate:** 3 days

- [ ] **Task 3.2.3:** Competency insights
  - Calculate average rating per competency
  - Show top competencies (team strengths)
  - Show growth areas (lowest avg ratings)
  - **Estimate:** 3 days

#### Epic 3.3: Goal Tracking
**Goal:** Goals from previous cycle carry over to next cycle

- [ ] **Task 3.3.1:** Goals in review form
  - Manager sets 3-5 goals with descriptions
  - Mark goals with due dates
  - **Estimate:** 2 days

- [ ] **Task 3.3.2:** Goal status tracking
  - In next cycle, show previous goals with checkboxes (Completed? In Progress? Not Started?)
  - Carry incomplete goals forward
  - **Estimate:** 3 days

#### Epic 3.4: Historical Reviews
**Goal:** Managers can access past reviews

- [ ] **Task 3.4.1:** Review history page
  - List all past reviews for an employee
  - Click to view full review (read-only)
  - Export as PDF
  - **Estimate:** 1 week

**Phase 3 Total: 6 weeks**

---

## Polish & Beta Prep (Weeks 21-24)

- [ ] **Empty states:** "No reviews yet" screens with helpful CTAs
- [ ] **Error handling:** User-friendly error messages, retry logic
- [ ] **Loading states:** Skeleton screens while data loads
- [ ] **Mobile responsiveness:** Test on 375px, 768px, 1024px viewports
- [ ] **Onboarding tooltips:** Guide new users through first review cycle
- [ ] **Data export:** Export reviews as CSV/PDF (GDPR requirement)
- [ ] **Beta testing:** Invite 5 beta customers, collect feedback
- [ ] **Bug fixes:** Address top 10 issues from beta

**Polish Total: 4 weeks**

---

## Total Timeline: 24 Weeks (5-6 Months)

- **Phase 1 Foundation:** Weeks 1-6
- **Phase 2 Self-Review + Gap Analysis:** Weeks 7-14
- **Phase 3 Peer Feedback + Analytics:** Weeks 15-20
- **Polish + Beta:** Weeks 21-24

**Public Launch Target:** Week 24 (Month 6)

---

## Post-MVP Roadmap (Months 7-12)

### Quarter 2 (Months 7-9)
- [ ] Custom template builder (managers create their own competencies)
- [ ] BambooHR/Rippling integration (auto-import team data)
- [ ] Email digest (weekly summary of pending actions)
- [ ] Employee review history page (employees see their own past reviews)

### Quarter 3 (Months 10-12)
- [ ] Advanced analytics (trend tracking over multiple cycles)
- [ ] Review calibration (compare ratings across managers to reduce bias)
- [ ] Performance improvement plans (PIP templates for underperformers)
- [ ] API for custom integrations

---

*Last updated: January 27, 2026*
