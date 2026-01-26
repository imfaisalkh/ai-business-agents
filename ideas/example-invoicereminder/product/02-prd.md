# Product Requirements Document

*This is a FICTIONAL EXAMPLE showing what a completed PRD looks like.*

## Document Info
- **Product:** InvoiceReminder
- **Version:** 1.0 (MVP)
- **Author:** [Founder]
- **Last Updated:** 2024-01-15
- **Status:** Approved

---

## Executive Summary

### Problem Statement
Freelancers lose thousands annually to late payments. They spend hours per week on awkward manual follow-ups, or avoid following up entirely (damaging cash flow). Current invoicing tools treat reminders as an afterthought, not a core feature.

### Solution Overview
InvoiceReminder automates polite, tone-aware payment follow-ups that sound like the freelancer wrote them. It integrates with existing invoicing tools, sends personalized reminders at optimal times, and preserves client relationships while improving collection rates.

### Success Metrics
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Primary: Average days-to-payment | N/A (baseline) | Reduce by 5 days | 90 days post-launch |
| Secondary: Collection rate on overdue | N/A | >85% eventually collected | 90 days post-launch |

---

## User Stories

### Primary User Persona
**Name:** Alex the Freelance Designer
**Goal:** As a freelancer, I want invoices to get paid on time without me having to chase clients awkwardly.
**Context:** Uses FreshBooks/Stripe, sends 10-15 invoices/month, 40% get paid late, spends 2hrs/week on follow-ups.
**Pain today:** "I hate writing those 'just checking in' emails. It feels desperate and damages my relationship with clients."

### User Stories (Prioritized)

#### Must Have (MVP)
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-001 | As a user, I want to connect my Stripe account so invoices sync automatically | Given valid Stripe API key, when I connect, then all open invoices appear in dashboard within 60 seconds |
| US-002 | As a user, I want automatic reminder emails sent before/after due dates | Given an invoice is 3 days from due, when that day arrives, then a reminder email is sent to client |
| US-003 | As a user, I want to customize reminder message templates | Given I'm on settings, when I edit a template, then future emails use my custom text |
| US-004 | As a user, I want a dashboard showing all invoice statuses | Given I'm logged in, when I view dashboard, then I see paid/pending/overdue invoices with amounts |
| US-005 | As a user, I want to pause reminders for specific clients | Given a client has known payment delays, when I click pause, then no reminders send for that client |

#### Should Have (v1.1)
| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-006 | As a user, I want to connect PayPal invoicing | Same as US-001 but for PayPal |
| US-007 | As a user, I want email open/click tracking | Given an email was sent, when client opens it, then I see "opened" status in dashboard |
| US-008 | As a user, I want tone control (friendly → firm) | Given reminder #3, when escalation is enabled, then message tone is firmer than reminder #1 |

#### Nice to Have (Future)
| ID | Story | Notes |
|----|-------|-------|
| US-009 | SMS reminders | Higher open rates but adds complexity |
| US-010 | FreshBooks/QuickBooks integration | Broader market, but more dev work |
| US-011 | AI-generated personalized messages | Differentiated, but risky on quality |

---

## Functional Requirements

### Feature 1: Invoice Source Connection
**Description:** Connect to payment/invoicing platforms to pull invoice data
**User story:** US-001
**Priority:** Must Have

**Requirements:**
- [ ] FR-1.1: OAuth flow for Stripe connection
- [ ] FR-1.2: Fetch all invoices with status (draft, sent, paid, overdue)
- [ ] FR-1.3: Sync invoices every 15 minutes
- [ ] FR-1.4: Show connection status in settings
- [ ] FR-1.5: Handle API errors gracefully with user notification

**Out of scope:**
- Creating invoices (we only read, don't write)
- Payment processing (client pays through original invoice)

**UI/UX Notes:**
Simple "Connect Stripe" button. Show # of invoices synced after connection.

---

### Feature 2: Automated Reminder Sequence
**Description:** Send emails at configured times relative to invoice due date
**User story:** US-002
**Priority:** Must Have

**Requirements:**
- [ ] FR-2.1: Default sequence: 3 days before, day of, 3 days after, 7 days after, 14 days after
- [ ] FR-2.2: User can enable/disable each step
- [ ] FR-2.3: User can change timing (e.g., 5 days after instead of 3)
- [ ] FR-2.4: Emails stop automatically when invoice marked paid
- [ ] FR-2.5: Track which emails were sent per invoice

**Out of scope:**
- Multiple sequences for different client types (v2)
- Conditional logic based on invoice amount (v2)

**UI/UX Notes:**
Visual timeline showing which emails will send and when.

---

### Feature 3: Message Templates
**Description:** Customizable email templates for each reminder step
**User story:** US-003
**Priority:** Must Have

**Requirements:**
- [ ] FR-3.1: Default templates provided (professional, friendly)
- [ ] FR-3.2: Variables: {client_name}, {amount}, {due_date}, {invoice_number}, {days_overdue}
- [ ] FR-3.3: Preview before saving
- [ ] FR-3.4: Reset to default option
- [ ] FR-3.5: Subject line customization

**Out of scope:**
- Rich text/HTML editing (plain text only for v1)
- Attachments

---

### Feature 4: Invoice Dashboard
**Description:** Central view of all invoices and their status
**User story:** US-004
**Priority:** Must Have

**Requirements:**
- [ ] FR-4.1: Table view with columns: Client, Amount, Due Date, Status, Last Reminder, Actions
- [ ] FR-4.2: Filter by status (All, Pending, Overdue, Paid)
- [ ] FR-4.3: Sort by any column
- [ ] FR-4.4: Quick stats: Total outstanding, overdue count, amount collected this month
- [ ] FR-4.5: Click row to see invoice details + reminder history

---

### Feature 5: Client Pause
**Description:** Temporarily stop reminders for specific clients
**User story:** US-005
**Priority:** Must Have

**Requirements:**
- [ ] FR-5.1: Pause button per client/invoice
- [ ] FR-5.2: Optional: set resume date
- [ ] FR-5.3: Show paused status clearly in dashboard
- [ ] FR-5.4: Resume manually anytime

---

## Non-Functional Requirements

### Performance
- Page load time: <2 seconds
- API response time: <500ms
- Email delivery: <5 minutes from trigger time

### Security
- Authentication: Email magic link (no passwords for v1)
- Data encryption: TLS in transit, encrypted at rest
- Compliance: No PCI data stored (Stripe handles payments)

### Scalability
- Expected load: 500 users, 10k invoices
- Growth projection: 20% month-over-month

---

## Technical Constraints

- **Tech stack:** Nuxt 3 + Vue 3 + SQLite + Drizzle ORM
- **Hosting:** Vercel (edge functions for cron)
- **Third-party dependencies:**
  - Stripe API: Invoice data source
  - Resend: Email delivery
  - Vercel Cron: Scheduled reminder checks

---

## Scope & Timeline

### MVP Scope
**Release date target:** 4 weeks from start

**Features included:**
1. Stripe connection
2. Automated reminder sequence (5-step)
3. Template customization
4. Invoice dashboard
5. Client pause

**Explicitly NOT included:**
1. PayPal/FreshBooks integration
2. SMS reminders
3. Team/multi-user features
4. Mobile app

### Milestones
| Milestone | Features | Target Date |
|-----------|----------|-------------|
| Alpha | Stripe sync + dashboard works | Week 2 |
| Beta | Reminders send, templates work | Week 3 |
| Launch | All MVP features, bug-free | Week 4 |

---

## Open Questions

| Question | Owner | Due Date | Decision |
|----------|-------|----------|----------|
| Should we support invoice PDFs? | Product | Week 1 | No - link to original invoice only |
| Magic link vs password auth? | Engineering | Week 1 | Magic link (simpler for v1) |

---

## Appendix

### Wireframes
[To be created - simple dashboard mockup]

### User Research
- 5 interviews with freelancer contacts
- Key quote: "I literally have a sticky note reminding me to follow up on invoices every Friday. It's embarrassing."

### Competitor Screenshots
- FreshBooks reminder settings (buried 4 clicks deep)
- Wave reminder email (generic, robotic)
