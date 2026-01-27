# Product Requirements Document (PRD)

*Generated on January 28, 2026*

---

## PRD at a Glance

### One-Sentence MVP Promise
> "See all your jobs, know where your workers are, and get paid faster - from one app on your phone."

### MVP Feature Set (Ship in 3 weeks)

| # | Feature | Core Capability | Success Metric |
|---|---------|-----------------|----------------|
| 1 | **Job Scheduling** | Create jobs, assign workers, view calendar | Job created → assigned < 2 min |
| 2 | **Mobile Worker App** | Workers see jobs, navigate, mark complete | 80% of jobs marked complete in app |
| 3 | **Invoicing & Payments** | Generate invoice, send via email, accept payment | Invoice sent same day as job complete |
| 4 | **Customer Management** | Store customer info, view history | Customer lookup < 10 sec |
| 5 | **Two-Way Messaging** | Send SMS to customers, receive replies | 50% of customers receive job reminders |

### Riskiest Assumptions (Validate First)

| Assumption | Risk | Validation Method |
|------------|------|-------------------|
| Small service businesses will pay $79/mo | HIGH | 5 founding customers pay upfront |
| Workers will actually use the mobile app | HIGH | 3 businesses have workers using app in beta |
| Flat pricing is compelling vs. per-user | MEDIUM | A/B test in messaging, track conversion |
| Two-way SMS is a differentiator | MEDIUM | Ask in discovery calls if gated SMS is painful |

### MVP Funnel (Track These Events)

```
Signup → Onboarding Complete → First Job Created → First Worker Invited →
First Job Completed → First Invoice Sent → First Payment Received →
Day 7 Active → Converted to Paid
```

| Event | Target | Definition |
|-------|--------|------------|
| Signup | 100% | Account created |
| Onboarding Complete | 70% | Business info + first customer added |
| First Job Created | 60% | At least one job in system |
| First Worker Invited | 40% | At least one worker (besides owner) added |
| First Job Completed | 50% | Job marked complete |
| First Invoice Sent | 40% | Invoice generated and sent |
| First Payment Received | 20% | Customer pays via online payment |
| Day 7 Active | 50% | Logged in at least once in days 2-7 |
| Converted to Paid | 30% | Trial converts to subscription |

---

## Product Vision

### Problem Statement
Small home service businesses waste 8-10 hours per week on scheduling chaos, paper-based job tracking, and chasing invoices. When they try professional software, they find it's overpriced ($200+/month with per-user fees) and overbuilt for their needs.

### Solution Statement
A focused field service app that does 5 things extremely well: scheduling, worker coordination, invoicing, customer management, and communication. $79/month flat, unlimited users, no feature gating.

### Success Criteria (6 months)
- 40 paying customers ($3K MRR)
- <5% monthly churn
- NPS > 40
- 80% of workers at customer businesses actively using mobile app

---

## User Personas

### Primary: The Owner-Operator

**Name:** Mike
**Business:** 6-person house cleaning company, Austin TX
**Age:** 42
**Tech comfort:** Uses smartphone daily, not "techy"

**Day in the life:**
- 5:30 AM: Wake up, check texts from workers about today's jobs
- 6:00 AM: Spend 90 min coordinating who goes where via text/calls
- 8:00 AM: Head to first job (Mike does jobs too)
- 12:00 PM: Lunch while answering "where do I go next?" texts
- 5:00 PM: Back home, creates invoices for today's jobs (paper notes)
- 8:00 PM: Tries to plan tomorrow, gives up, will do it in morning

**Goals:**
- Stop being the "router" for his team
- Get paid faster (too many outstanding invoices)
- Have a life outside work

**Frustrations:**
- "I'm always on my phone but it's all chaos"
- "Jobber wants $300/month for my team size"
- "I just need the basics, not enterprise BS"

### Secondary: The Field Worker

**Name:** Maria
**Role:** Cleaner at Mike's company
**Age:** 28
**Tech comfort:** Very comfortable with smartphone (social media, maps)

**Day in the life:**
- 7:00 AM: Gets text from Mike with first job address
- 8:30 AM: Finishes first job, texts Mike asking where to go next
- 9:00 AM: Waits for Mike to respond (he's at his own job)
- 9:15 AM: Gets address for job #2
- Repeat throughout day

**Goals:**
- Know her schedule without asking Mike
- Navigate to jobs easily
- Not forget important customer notes

**Frustrations:**
- "Sometimes I show up and no one's home because I had wrong time"
- "I don't know if a customer has dogs or special instructions"
- "Mike is hard to reach when he's working"

### Tertiary: The Customer

**Name:** Jennifer
**Role:** Homeowner using Mike's cleaning service
**Age:** 38

**Wants:**
- Know when the cleaner is coming
- Easy way to pay
- Communication without endless calls

**Frustrations:**
- "I never know if they're coming today or not"
- "I have to write a check every time"
- "I can't get hold of them to reschedule"

---

## Feature Specifications

### Feature 1: Job Scheduling

**User story:** As an owner, I want to create and assign jobs to workers so that everyone knows what they're doing today.

**Requirements:**

| Requirement | Priority | Details |
|-------------|----------|---------|
| Create job | P0 | Customer, date/time, duration, worker assignment |
| Calendar view | P0 | Day/week view, see all workers' schedules |
| Drag-drop assign | P1 | Reassign jobs by dragging to different worker/time |
| Recurring jobs | P1 | Weekly, bi-weekly, monthly repeat |
| Job status | P0 | Scheduled, In Progress, Complete, Cancelled |
| Job notes | P1 | Internal notes (visible to workers) |
| Conflict detection | P2 | Warn if double-booking a worker |

**Text Wireframe: Calendar View (Desktop)**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  [< Jan 28, 2026 >]  [Day] [Week]         [+ New Job]                   │
├──────────────────────────────────────────────────────────────────────────┤
│  Time     │  Mike (Owner)    │  Maria           │  Jose              │  │
├───────────┼──────────────────┼──────────────────┼────────────────────┤  │
│  8:00 AM  │ ┌──────────────┐ │ ┌──────────────┐ │                    │  │
│           │ │ Johnson      │ │ │ Smith Home   │ │                    │  │
│  9:00 AM  │ │ Deep Clean   │ │ │ Regular      │ │                    │  │
│           │ │ 3hr $180     │ │ │ 2hr $120     │ │ ┌────────────────┐ │  │
│ 10:00 AM  │ └──────────────┘ │ └──────────────┘ │ │ Williams       │ │  │
│           │                  │                  │ │ Move-out Clean │ │  │
│ 11:00 AM  │                  │ ┌──────────────┐ │ │ 4hr $350       │ │  │
│           │ ┌──────────────┐ │ │ Park Condo   │ │ │                │ │  │
│ 12:00 PM  │ │ Lunch        │ │ │ Regular      │ │ │                │ │  │
│           │ └──────────────┘ │ │ 2hr $120     │ │ └────────────────┘ │  │
│  1:00 PM  │                  │ └──────────────┘ │                    │  │
│           │ ┌──────────────┐ │                  │                    │  │
│  2:00 PM  │ │ Taylor Home  │ │                  │ ┌────────────────┐ │  │
│           │ │ Regular      │ │                  │ │ Chen House     │ │  │
│  3:00 PM  │ │ 2hr $120     │ │                  │ │ Regular        │ │  │
│           │ └──────────────┘ │                  │ │ 2hr $120       │ │  │
│  4:00 PM  │                  │                  │ └────────────────┘ │  │
└──────────────────────────────────────────────────────────────────────────┘
│  Today: 6 jobs  │  Revenue: $1,010  │  2 unassigned jobs [View]         │
└──────────────────────────────────────────────────────────────────────────┘
```

**Text Wireframe: New Job Modal**
```
┌─────────────────────────────────────────────────┐
│  New Job                                   [X]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Customer *                                     │
│  [Search customers...          ▼] [+ New]       │
│                                                 │
│  Service Type *                                 │
│  [Regular Cleaning             ▼]               │
│                                                 │
│  Date *              Time *        Duration *   │
│  [Jan 28, 2026]      [9:00 AM]     [2 hours]   │
│                                                 │
│  Assigned Worker                                │
│  [Maria                        ▼]               │
│                                                 │
│  Price                                          │
│  [$120.00      ]                                │
│                                                 │
│  □ Recurring job                                │
│    Every [1] [week(s)  ▼]                      │
│                                                 │
│  Notes for worker                               │
│  [                                         ]    │
│  [Dogs in backyard. Use side entrance.    ]    │
│  [                                         ]    │
│                                                 │
│            [Cancel]  [Create Job]               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Feature 2: Mobile Worker App

**User story:** As a worker, I want to see my jobs for today on my phone so I can know where to go without asking the owner.

**Requirements:**

| Requirement | Priority | Details |
|-------------|----------|---------|
| Today's jobs list | P0 | Ordered by time, with customer name, address, time |
| Job details | P0 | Customer info, notes, service type, duration |
| Navigate button | P0 | One-tap open in Google Maps / Apple Maps |
| Start/complete job | P0 | Mark job in progress, then complete |
| Photo capture | P1 | Take before/after photos, attach to job |
| Time tracking | P2 | Auto-track time between start and complete |
| Push notifications | P1 | New job assigned, job rescheduled |

**Text Wireframe: Worker App - Today's Jobs**
```
┌─────────────────────────────────────┐
│  Today - Jan 28                     │
│  4 jobs · $480 in services          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 8:00 AM - 10:00 AM              ││
│  │ Smith Home                      ││
│  │ 123 Oak Street                  ││
│  │ Regular Cleaning · 2hr · $120   ││
│  │                    [Navigate →] ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 11:00 AM - 1:00 PM              ││
│  │ Park Condo                      ││
│  │ 456 Main St, Unit 302           ││
│  │ Regular Cleaning · 2hr · $120   ││
│  │                    [Navigate →] ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 2:00 PM - 4:00 PM    NEXT UP    ││
│  │ Johnson Residence               ││
│  │ 789 Elm Drive                   ││
│  │ Deep Clean · 2hr · $180         ││
│  │                    [Navigate →] ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 4:30 PM - 6:00 PM               ││
│  │ Chen House                      ││
│  │ 321 Pine Avenue                 ││
│  │ Regular Cleaning · 1.5hr · $60  ││
│  │                    [Navigate →] ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  [Jobs]    [Schedule]    [Profile] │
└─────────────────────────────────────┘
```

**Text Wireframe: Worker App - Job Detail**
```
┌─────────────────────────────────────┐
│  [← Back]          Johnson Residence│
├─────────────────────────────────────┤
│                                     │
│  Status: Scheduled                  │
│  [    Start Job    ]                │
│                                     │
├─────────────────────────────────────┤
│  📍 789 Elm Drive, Austin TX        │
│  [        Navigate        ]         │
├─────────────────────────────────────┤
│  📅 Jan 28, 2026                    │
│  🕐 2:00 PM - 4:00 PM (2 hours)     │
│  💰 $180 · Deep Clean               │
├─────────────────────────────────────┤
│  Customer: Sarah Johnson            │
│  📞 (512) 555-0123  [Call] [Text]   │
├─────────────────────────────────────┤
│  📝 Notes from Office:              │
│  • Dogs in backyard - use side gate │
│  • Extra attention on kitchen       │
│  • Key under mat if not home        │
├─────────────────────────────────────┤
│  📸 Photos (0)                      │
│  [+ Add Photo]                      │
│                                     │
└─────────────────────────────────────┘
```

---

### Feature 3: Invoicing & Payments

**User story:** As an owner, I want to send invoices immediately when jobs are done so I get paid faster.

**Requirements:**

| Requirement | Priority | Details |
|-------------|----------|---------|
| Generate from job | P0 | One-click invoice from completed job |
| Send via email | P0 | Professional invoice email to customer |
| Send via SMS | P1 | Text link to invoice for payment |
| Online payment | P0 | Customer pays with card via Stripe |
| Payment status | P0 | Unpaid, Paid, Overdue |
| Auto-reminders | P1 | Email reminder at 7, 14, 30 days overdue |
| Invoice list | P0 | View all invoices, filter by status |
| Mark as paid | P0 | Manually mark paid (cash/check) |

**Text Wireframe: Invoice Detail**
```
┌─────────────────────────────────────────────────┐
│  Invoice #1042                                  │
│  Status: [Sent - Unpaid]           [Send Reminder]│
├─────────────────────────────────────────────────┤
│                                                 │
│  Customer: Sarah Johnson                        │
│  sarah.johnson@email.com                        │
│  789 Elm Drive, Austin TX                       │
│                                                 │
├─────────────────────────────────────────────────┤
│  Service                      Date       Amount │
│  ─────────────────────────────────────────────  │
│  Deep Clean                   Jan 28     $180.00│
│                                                 │
│                               Subtotal   $180.00│
│                               Tax (0%)     $0.00│
│                               ─────────────────  │
│                               Total      $180.00│
│                                                 │
├─────────────────────────────────────────────────┤
│  Sent: Jan 28, 2026 at 4:15 PM                 │
│  Due: Feb 11, 2026 (Net 14)                    │
│                                                 │
│  [View Customer Page] [Send Reminder] [Mark Paid]│
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Feature 4: Customer Management

**User story:** As an owner, I want to keep all customer info in one place so I can find it quickly.

**Requirements:**

| Requirement | Priority | Details |
|-------------|----------|---------|
| Customer list | P0 | Searchable list of all customers |
| Customer profile | P0 | Name, address, phone, email |
| Service history | P0 | All past jobs for this customer |
| Invoice history | P0 | All invoices, paid/unpaid |
| Customer notes | P1 | Permanent notes (gate code, pets, etc.) |
| Quick actions | P1 | Schedule job, send invoice from profile |

**Text Wireframe: Customer Profile**
```
┌─────────────────────────────────────────────────────────────┐
│  Sarah Johnson                    [Edit] [+ Schedule Job]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📍 789 Elm Drive, Austin TX 78701                          │
│  📞 (512) 555-0123                                          │
│  ✉️  sarah.johnson@email.com                                 │
│                                                             │
│  Customer since: March 2024                                 │
│  Total spent: $2,340 (18 jobs)                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Notes                                                      │
│  • Key under mat if not home                               │
│  • Dogs in backyard - use side gate                        │
│  • Prefers Maria as cleaner                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Upcoming Jobs                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Feb 4, 2026 · Regular Clean · Maria · $120          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Recent History                                             │
│  Jan 28 · Deep Clean · $180 · [Invoice: Unpaid]            │
│  Jan 21 · Regular Clean · $120 · [Invoice: Paid]           │
│  Jan 14 · Regular Clean · $120 · [Invoice: Paid]           │
│  Jan 7 · Regular Clean · $120 · [Invoice: Paid]            │
│  [View All History]                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Feature 5: Two-Way Messaging

**User story:** As an owner, I want to send appointment reminders and receive customer replies in one place.

**Requirements:**

| Requirement | Priority | Details |
|-------------|----------|---------|
| Send SMS | P0 | Send text to customer from app |
| Receive SMS | P0 | Customer replies come into app |
| Conversation view | P0 | Chat-style thread per customer |
| Auto reminders | P1 | Send "Appointment tomorrow" automatically |
| On-my-way text | P1 | Worker can send "On my way" from app |
| Notification | P0 | Alert when customer replies |

**Text Wireframe: Conversation View**
```
┌─────────────────────────────────────────────────┐
│  [← Customers]        Sarah Johnson      [Call] │
├─────────────────────────────────────────────────┤
│                                                 │
│                        ┌───────────────────────┐│
│                        │ Hi Sarah! Just a      ││
│                        │ reminder that we have ││
│                        │ you scheduled for a   ││
│                        │ deep clean tomorrow   ││
│                        │ at 2 PM.              ││
│                        │            Jan 27 4pm ││
│                        └───────────────────────┘│
│                                                 │
│  ┌─────────────────────────┐                    │
│  │ Thanks! Can we move it  │                    │
│  │ to 3 PM instead?        │                    │
│  │ Jan 27 4:15pm           │                    │
│  └─────────────────────────┘                    │
│                                                 │
│                        ┌───────────────────────┐│
│                        │ Absolutely! I've      ││
│                        │ updated it to 3 PM.   ││
│                        │ See you then!         ││
│                        │            Jan 27 4:20││
│                        └───────────────────────┘│
│                                                 │
│  ┌─────────────────────────┐                    │
│  │ Perfect, thank you!     │                    │
│  │ Jan 27 4:22pm           │                    │
│  └─────────────────────────┘                    │
│                                                 │
├─────────────────────────────────────────────────┤
│  [Type a message...                    ] [Send] │
└─────────────────────────────────────────────────┘
```

---

## Non-Functional Requirements

### Performance
- Page load: < 2 seconds
- Calendar render: < 1 second for week view
- Search results: < 500ms
- Mobile app: Works on 3G connection

### Reliability
- Uptime: 99.5% (allows ~4 hours downtime/month)
- Data backups: Daily
- Error rate: < 0.1% of requests

### Security
- HTTPS everywhere
- Passwords hashed (bcrypt)
- Payment data: Never stored (Stripe handles)
- PII encryption at rest

### Scalability (Phase 1)
- Support 100 businesses
- Support 1,000 workers
- Support 10,000 jobs/day

---

## What We're NOT Building (MVP)

| Feature | Reason | When to Add |
|---------|--------|-------------|
| Estimates/quotes | Not core to daily operations | Phase 2 (Month 2-3) |
| Route optimization | Nice-to-have, complex | Phase 3 (Month 4+) |
| Inventory tracking | Industry-specific | Phase 3 (if validated) |
| Advanced reporting | Premature optimization | Phase 2 |
| API/integrations | No customer demand yet | When customers ask |
| White-label | Enterprise feature | Never (not our market) |
| Team chat | Separate tools exist | Never |
| Expense tracking | QuickBooks handles this | Never |

---

## Release Plan

### Week 1-2: Foundation
- Auth (signup, login, password reset)
- Business setup (name, address, logo)
- Customer CRUD (create, read, update, delete)
- Basic UI shell (navigation, layout)

### Week 3: Core Features
- Job scheduling (create, assign, view calendar)
- Mobile worker app (view jobs, mark complete)
- Invoicing (generate, send, track)

### Week 4: Polish + Launch
- Two-way SMS (send, receive, conversation view)
- Notifications (push, email)
- Onboarding flow
- Bug fixes, performance optimization

### Post-Launch (Month 2+)
- Recurring jobs
- Photo capture
- Auto-reminders
- Estimates (if validated)

---

## Success Metrics (30 days post-launch)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Trial signups | 50 | Analytics |
| Onboarding complete | 35 (70%) | Event tracking |
| First job created | 30 (60%) | Event tracking |
| Day 7 active | 25 (50%) | Event tracking |
| Converted to paid | 15 (30%) | Stripe |
| NPS | >30 | Survey |

---

*Next artifact: 03-tasks.md*
