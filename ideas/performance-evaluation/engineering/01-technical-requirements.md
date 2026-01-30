# Technical Requirements Document

> **Purpose:** Defines technical architecture and standards for TeamPulse. Reference before making architecture changes.

## Document Info
- **Product:** TeamPulse
- **Version:** 1.0 (SLC Launch)
- **Last Updated:** January 2026

---

## Architecture Overview

**Next.js 15 Full-Stack Application with Supabase**

```
+------------------------------------------------------------------+
|                        Client Browsers                            |
|  (Managers, Employees accessing from desktop/mobile web)          |
+--------------------------------+---------------------------------+
                                 | HTTPS
                                 v
+------------------------------------------------------------------+
|                    Next.js 15 (App Router)                        |
|  +--------------------+  +--------------------+  +--------------+ |
|  | Pages (RSC)        |  | Server Actions     |  | API Routes   | |
|  | - Dashboard        |  | - createReview     |  | - webhooks   | |
|  | - Review Editor    |  | - submitSelfReview |  | - stripe     | |
|  | - Gap Analysis     |  | - addPeerFeedback  |  | - email      | |
|  | - Team Management  |  | - manageGoals      |  |              | |
|  +--------------------+  +--------------------+  +--------------+ |
|                                                                   |
|  +--------------------+  +--------------------+  +--------------+ |
|  | shadcn/ui          |  | Supabase Client    |  | Supabase     | |
|  | Components         |  | (PostgreSQL)       |  | Auth         | |
|  +--------------------+  +--------------------+  +--------------+ |
|                                 [Vercel]                          |
+--------------------------------+---------------------------------+
                                 | Supabase Client
                                 v
+------------------------------------------------------------------+
|                        Supabase                                   |
|  +--------------------+  +--------------------+  +--------------+ |
|  | PostgreSQL DB      |  | Auth (magic link,  |  | Row Level    | |
|  | Multi-tenant       |  | OAuth, email/pass) |  | Security     | |
|  +--------------------+  +--------------------+  +--------------+ |
+------------------------------------------------------------------+
                                 |
        +------------------------+------------------------+
        v                        v                        v
+---------------+      +------------------+      +---------------+
| Resend        |      | Stripe           |      | PostHog       |
| (Email)       |      | (Payments)       |      | (Analytics)   |
| - Reminders   |      | - Subscriptions  |      | - Funnel      |
| - Invites     |      | - PEPM billing   |      | - Events      |
+---------------+      +------------------+      +---------------+
```

---

## Project Structure

```
teampulse/
├── package.json
├── next.config.ts
├── .env.local
├── supabase/
│   ├── config.toml            # Supabase local config
│   └── migrations/            # SQL migration files
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── (marketing)/       # Public pages
│   │   │   ├── pricing/page.tsx
│   │   │   └── features/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── invite/[token]/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── cycles/
│   │   │   │   ├── page.tsx           # List cycles
│   │   │   │   ├── new/page.tsx       # Create cycle wizard
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx       # Cycle detail
│   │   │   │       └── reviews/[employeeId]/page.tsx
│   │   │   ├── reviews/
│   │   │   │   ├── page.tsx           # My reviews (employee view)
│   │   │   │   ├── self/[id]/page.tsx # Self-review form
│   │   │   │   ├── peer/[id]/page.tsx # Peer feedback form
│   │   │   │   └── write/[id]/page.tsx # Manager review form
│   │   │   ├── gap-analysis/
│   │   │   │   └── [reviewId]/page.tsx # WOW feature
│   │   │   ├── team/
│   │   │   │   ├── page.tsx           # Team members
│   │   │   │   └── [memberId]/page.tsx # Member profile + history
│   │   │   ├── goals/
│   │   │   │   ├── page.tsx           # Goal list
│   │   │   │   └── [id]/page.tsx      # Goal detail
│   │   │   ├── templates/
│   │   │   │   ├── page.tsx           # Template library
│   │   │   │   └── [id]/page.tsx      # Edit template
│   │   │   └── settings/
│   │   │       ├── page.tsx           # Org settings
│   │   │       ├── billing/page.tsx   # Stripe portal
│   │   │       └── team/page.tsx      # Team management
│   │   └── api/
│   │       ├── webhooks/
│   │       │   ├── stripe/route.ts
│   │       │   └── supabase/route.ts
│   │       └── cron/
│   │           └── reminders/route.ts
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── reviews/           # Review-specific components
│   │   │   ├── review-form.tsx
│   │   │   ├── rating-input.tsx
│   │   │   ├── feedback-editor.tsx
│   │   │   └── gap-analysis-chart.tsx
│   │   ├── cycles/            # Cycle management components
│   │   ├── goals/             # Goal tracking components
│   │   ├── team/              # Team management components
│   │   └── layout/            # Layout components
│   │       ├── sidebar.tsx
│   │       ├── header.tsx
│   │       └── mobile-nav.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser client
│   │   │   ├── server.ts      # Server client
│   │   │   └── middleware.ts  # Auth middleware
│   │   ├── utils.ts           # General utilities
│   │   └── analytics.ts       # PostHog wrapper
│   ├── actions/               # Server Actions
│   │   ├── cycles.ts          # Review cycle CRUD
│   │   ├── reviews.ts         # Manager reviews
│   │   ├── self-reviews.ts    # Employee self-reviews
│   │   ├── peer-feedback.ts   # Peer feedback
│   │   ├── goals.ts           # Goal management
│   │   ├── team.ts            # Team member management
│   │   └── templates.ts       # Template management
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-autosave.ts
│   │   └── use-analytics.ts
│   └── types/                 # TypeScript types
│       └── index.ts
├── emails/                    # React Email templates
│   ├── reminder.tsx
│   ├── review-shared.tsx
│   └── invite.tsx
└── public/
    └── images/
```

---

## Database Schema

```sql
-- supabase/migrations/001_initial_schema.sql
-- TeamPulse Database Schema for Supabase

-- ============================================
-- MULTI-TENANT CORE
-- ============================================

-- Organizations table
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  stripe_customer_id text,
  subscription_id text,
  subscription_status text default 'trialing' check (subscription_status in ('trialing', 'active', 'past_due', 'canceled')),
  trial_ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Users/Profiles table (extends auth.users)
create type user_role as enum ('OWNER', 'ADMIN', 'MANAGER', 'EMPLOYEE');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  role user_role default 'EMPLOYEE',
  organization_id uuid references public.organizations(id) on delete cascade,
  manager_id uuid references public.profiles(id),
  job_title text,
  level text, -- Junior, Mid, Senior, Staff, etc.
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index profiles_email_org_idx on public.profiles(email, organization_id);
create index profiles_org_idx on public.profiles(organization_id);
create index profiles_manager_idx on public.profiles(manager_id);

-- Trigger to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- REVIEW CYCLES
-- ============================================

create type cycle_status as enum ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELED');

create table public.review_cycles (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- "Q1 2026 Reviews"
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status cycle_status default 'DRAFT',
  start_date timestamptz not null,
  end_date timestamptz not null,
  self_review_due timestamptz not null,
  peer_feedback_due timestamptz not null,
  manager_review_due timestamptz not null,
  template_id uuid references public.templates(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index review_cycles_org_idx on public.review_cycles(organization_id);
create index review_cycles_status_idx on public.review_cycles(status);

create table public.cycle_participants (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.review_cycles(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  created_at timestamptz default now(),
  unique(cycle_id, user_id)
);

-- ============================================
-- TEMPLATES
-- ============================================

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- "Engineering IC - Mid-Level"
  description text,
  organization_id uuid references public.organizations(id) on delete cascade, -- null = system template
  is_system boolean default false,
  role_type text, -- engineering, product, sales, manager, general
  level text, -- junior, mid, senior, staff
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index templates_org_idx on public.templates(organization_id);
create index templates_system_idx on public.templates(is_system);

create table public.competencies (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.templates(id) on delete cascade,
  name text not null, -- "Technical Skills"
  description text not null, -- "Ability to write clean, maintainable code..."
  sort_order int default 0,
  created_at timestamptz default now()
);

create index competencies_template_idx on public.competencies(template_id);

-- ============================================
-- REVIEWS (Manager Reviews)
-- ============================================

create type review_status as enum ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'SHARED');

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.review_cycles(id) on delete cascade,
  author_id uuid not null references public.profiles(id), -- Manager writing the review
  subject_id uuid not null references public.profiles(id), -- Employee being reviewed
  status review_status default 'NOT_STARTED',
  overall_rating decimal(2,1), -- 1-5
  overall_feedback text,
  shared_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(cycle_id, subject_id)
);

create index reviews_cycle_idx on public.reviews(cycle_id);
create index reviews_author_idx on public.reviews(author_id);
create index reviews_subject_idx on public.reviews(subject_id);

create table public.review_ratings (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  competency_id uuid not null references public.competencies(id),
  rating decimal(2,1) not null, -- 1-5
  feedback text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(review_id, competency_id)
);

-- ============================================
-- SELF-REVIEWS
-- ============================================

create table public.self_reviews (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.review_cycles(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  status review_status default 'NOT_STARTED',
  overall_rating decimal(2,1),
  overall_feedback text,
  accomplishments text, -- Highlights section
  next_period_goals text, -- Goals for next period
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(cycle_id, user_id)
);

create index self_reviews_cycle_idx on public.self_reviews(cycle_id);
create index self_reviews_user_idx on public.self_reviews(user_id);

create table public.self_review_ratings (
  id uuid primary key default gen_random_uuid(),
  self_review_id uuid not null references public.self_reviews(id) on delete cascade,
  competency_id uuid not null references public.competencies(id),
  rating decimal(2,1) not null, -- 1-5
  feedback text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(self_review_id, competency_id)
);

-- ============================================
-- PEER FEEDBACK
-- ============================================

create table public.peer_feedback_requests (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.review_cycles(id) on delete cascade,
  subject_id uuid not null references public.profiles(id), -- Who is being reviewed
  reviewer_id uuid not null references public.profiles(id), -- Who should give feedback
  status text default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz default now(),
  unique(cycle_id, subject_id, reviewer_id)
);

create index peer_feedback_requests_cycle_idx on public.peer_feedback_requests(cycle_id);
create index peer_feedback_requests_reviewer_idx on public.peer_feedback_requests(reviewer_id);

create table public.peer_feedback (
  id uuid primary key default gen_random_uuid(),
  request_id uuid unique not null references public.peer_feedback_requests(id) on delete cascade,
  author_id uuid not null references public.profiles(id), -- Anonymous to subject
  subject_id uuid not null references public.profiles(id),
  strengths text,
  areas_for_growth text,
  collaboration_rating decimal(2,1), -- 1-5
  additional_comments text,
  submitted_at timestamptz default now(),
  created_at timestamptz default now()
);

create index peer_feedback_subject_idx on public.peer_feedback(subject_id);

-- ============================================
-- GOALS
-- ============================================

create type goal_status as enum ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'MISSED');

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  due_date timestamptz,
  status goal_status default 'NOT_STARTED',
  progress int default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index goals_user_idx on public.goals(user_id);
create index goals_status_idx on public.goals(status);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.review_cycles enable row level security;
alter table public.templates enable row level security;
alter table public.reviews enable row level security;
alter table public.self_reviews enable row level security;
alter table public.goals enable row level security;

-- Profiles: Users can view members of their organization
create policy "Users can view org members"
  on public.profiles for select
  using (organization_id in (
    select organization_id from public.profiles where id = auth.uid()
  ));

-- Reviews: Only author can edit, subject can view when shared
create policy "Authors can manage their reviews"
  on public.reviews for all
  using (author_id = auth.uid());

create policy "Subjects can view shared reviews"
  on public.reviews for select
  using (subject_id = auth.uid() and status = 'SHARED');

-- Self-reviews: Users can only access their own
create policy "Users manage own self-reviews"
  on public.self_reviews for all
  using (user_id = auth.uid());

-- Goals: Users can only access their own
create policy "Users manage own goals"
  on public.goals for all
  using (user_id = auth.uid());
```

---

## API Standards

### Server Actions Pattern

Server Actions are the primary mutation mechanism. Located in `src/actions/`.

**Request/Response Format:**
```typescript
// Success response
{ success: true, data: T }

// Error response
{ success: false, error: { code: string, message: string } }
```

**Error Codes:**
- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - No permission for this action
- `NOT_FOUND` - Resource doesn't exist
- `VALIDATION_ERROR` - Input validation failed
- `CONFLICT` - Resource already exists

### API Routes

Only used for webhooks and external integrations:
- `POST /api/webhooks/stripe` - Stripe subscription events
- `POST /api/webhooks/supabase` - Auth events (optional)
- `POST /api/cron/reminders` - Scheduled reminder job

---

## Security Requirements

### Authentication
- [x] Supabase Auth (magic link, Google OAuth, email/password)
- [x] Session management via Supabase
- [x] Email verification supported

### Authorization
- [x] Role-based access control (OWNER, ADMIN, MANAGER, EMPLOYEE)
- [x] Organization-level isolation via Row Level Security (RLS)
- [x] Manager can only review direct reports
- [x] Peer feedback anonymity enforced at RLS policy level

### Data Protection
- [x] All data encrypted at rest (Supabase PostgreSQL)
- [x] TLS 1.3 in transit
- [x] CSRF protection (built into Server Actions)
- [x] Input validation with Zod on all actions
- [x] Rate limiting via Supabase

### Anonymity Rules (Peer Feedback)
- Individual peer feedback is never shown to subjects
- Aggregated themes shown only when 3+ peers respond
- Managers see response count, not individual names

---

## Environment Variables

```bash
# .env.local (development)

# Supabase (Database + Auth)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Payments (Stripe)
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"

# Email (Resend)
RESEND_API_KEY="re_xxx"
EMAIL_FROM="TeamPulse <reviews@teampulse.app>"

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY="phc_xxx"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="TeamPulse"
```

---

## Deployment Architecture

| Layer | Platform | Configuration |
|-------|----------|---------------|
| Frontend + Backend | Vercel | Edge + Serverless Functions |
| Database + Auth | Supabase | Managed PostgreSQL + Auth + RLS |
| Payments | Stripe | Subscription billing |
| Email | Resend | Transactional + reminders |
| Analytics | PostHog | Cloud hosted |
| Cron Jobs | Vercel Cron | Reminder emails |

### Database Scaling Notes
- Start with Supabase Free tier (500MB, generous limits)
- Connection pooling built into Supabase (Supavisor)
- Spike handling: Review deadline days have 10x normal load
- RLS policies ensure data isolation at database level

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load (LCP) | <2.0s | Vercel Analytics |
| API Response (P95) | <500ms | PostHog |
| Time to Interactive | <3.0s | Lighthouse |
| Auto-save Latency | <1s | Client-side |
| Database Query | <100ms | Supabase metrics |

### Optimization Strategies
- React Server Components for data-heavy pages
- Streaming for large lists
- Optimistic updates for forms
- Auto-save debounced at 1 second
- Skeleton loaders for perceived performance

---

## Integrations

### Stripe (Billing)
- **Pricing Model:** Per-employee-per-month (PEPM)
- **Plan:** Single tier at $6-8/employee/month
- **Trial:** 14-day free trial
- **Metered Billing:** Count active users monthly
- **Portal:** Stripe Customer Portal for self-service

### Resend (Email)
- **Templates:** React Email for type-safe templates
- **Types:**
  - Invitation emails (new team member)
  - Reminder emails (deadline approaching)
  - Notification emails (review shared)
- **Scheduling:** Reminders at 3 days, 1 day, and on due date

### PostHog (Analytics)
- **Funnel Events:** See PRD Conversion Funnel
- **Feature Flags:** Control rollout of new features
- **Session Replay:** Debug user issues

---

## Error Handling

### Client-Side
- Global error boundary with friendly UI
- Toast notifications for action feedback
- Form validation errors inline

### Server-Side
- Structured error responses
- Error logging to PostHog
- Graceful degradation for third-party failures

### Error Pages
- `/not-found` - 404 page
- `/error` - 500 error boundary
- Custom error for expired sessions

---

## Accessibility

- WCAG 2.1 AA compliance target
- Keyboard navigation for all forms
- ARIA labels on interactive elements
- Color contrast ratios met
- Screen reader testing on core flows

---

## Mobile Considerations

- Mobile web only (no native app for SLC)
- Responsive design (Tailwind breakpoints)
- Touch-friendly form inputs
- Collapsible sidebar on mobile
- Native date pickers

---

## Future Migration Notes

### Scaling Considerations (Post-Launch)
1. **Database:** If write contention becomes issue, consider read replicas
2. **Caching:** Add Redis for session data and frequently accessed templates
3. **Search:** If needed, add PostgreSQL full-text search before considering Elasticsearch
4. **CDN:** Static assets already on Vercel Edge

### Feature Extensibility
1. **HRIS Integration:** Add OAuth connections to BambooHR, Gusto, etc.
2. **SSO/SAML:** Upgrade Supabase plan for enterprise auth or add custom SSO
3. **AI Writing:** Add OpenAI for feedback suggestions
4. **Calibration:** Team-wide rating distribution analysis
