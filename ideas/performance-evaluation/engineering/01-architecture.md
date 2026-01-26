# Architecture Decision Record (ADR)

## Tech Stack

**Frontend:** Nuxt 4 + Vue 3 + shadcn-vue
**Backend:** Nuxt Server API Routes (full-stack framework)
**Database:** PostgreSQL (production) / SQLite (local dev)
**ORM:** Prisma
**Auth:** Nuxt Auth (email/password + Google OAuth)
**Hosting:** Vercel (frontend + serverless functions) or Railway (full-stack)
**File Storage:** Cloudinary or AWS S3 (for avatars, exports)
**Email:** Resend or SendGrid
**Analytics:** PostHog (self-hosted or cloud)

---

## Why This Stack?

### Nuxt 4 + Vue 3
- **Full-stack framework:** API routes + frontend in one codebase
- **SSR/SSG:** Better SEO, faster initial load
- **File-based routing:** Fast development
- **Built-in state management:** Pinia integrated
- **TypeScript support:** Type safety across stack

### shadcn-vue
- **Unstyled components:** Full design control
- **Accessible by default:** WCAG compliance
- **Copy-paste components:** No package bloat
- **Tailwind-based:** Fast styling

### PostgreSQL
- **Relational data:** Reviews, goals, peer feedback have complex relationships
- **JSON support:** Flexible for template storage (competencies vary by role)
- **Scalability:** Can handle 100K+ employees without redesign
- **Free tier:** Neon, Supabase, Railway all offer free PostgreSQL

### Prisma ORM
- **Type-safe queries:** Autocomplete + compile-time errors
- **Migrations:** Version-controlled schema changes
- **Introspection:** Generate types from existing database
- **Dev experience:** Best-in-class TypeScript ORM

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Nuxt 4 + Vue 3)             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Dashboard  │  │ Gap Analysis│  │  Analytics  │        │
│  │  (Manager)  │  │    View     │  │  Dashboard  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         ↓                  ↓                  ↓              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Nuxt Server API Routes (Backend)           │    │
│  │  /api/auth  /api/reviews  /api/teams  /api/goals  │    │
│  └────────────────────────────────────────────────────┘    │
│                            ↓                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Prisma ORM (Data Layer)               │    │
│  └────────────────────────────────────────────────────┘    │
│                            ↓                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │         PostgreSQL Database (Production)           │    │
│  │   Tables: Users, Teams, Reviews, Goals, Feedback   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
         ↓                  ↓                  ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Email       │  │  Analytics   │  │  File        │
│  (Resend)    │  │  (PostHog)   │  │  Storage(S3) │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## Database Schema (Core Tables)

### Users
```prisma
model User {
  id          String   @id @default(uuid())
  email       String   @unique
  name        String
  avatar      String?
  role        String   // "manager", "employee"
  teamId      String
  team        Team     @relation(fields: [teamId], references: [id])
  createdAt   DateTime @default(now())

  managedReviews     Review[]  @relation("ManagerReviews")
  employeeReviews    Review[]  @relation("EmployeeReviews")
  peerFeedbackGiven  PeerFeedback[]
}
```

### Teams
```prisma
model Team {
  id          String   @id @default(uuid())
  name        String
  companyName String
  plan        String   // "starter", "growth", "enterprise"
  stripeId    String?
  createdAt   DateTime @default(now())

  users        User[]
  reviewCycles ReviewCycle[]
}
```

### ReviewCycles
```prisma
model ReviewCycle {
  id         String   @id @default(uuid())
  name       String   // "Q1 2026"
  teamId     String
  team       Team     @relation(fields: [teamId], references: [id])
  startDate  DateTime
  endDate    DateTime
  status     String   // "active", "completed"
  templateId String

  reviews    Review[]
}
```

### Reviews
```prisma
model Review {
  id          String   @id @default(uuid())
  cycleId     String
  cycle       ReviewCycle  @relation(fields: [cycleId], references: [id])
  employeeId  String
  employee    User     @relation("EmployeeReviews", fields: [employeeId], references: [id])
  managerId   String
  manager     User     @relation("ManagerReviews", fields: [managerId], references: [id])
  status      String   // "pending", "self_review_done", "manager_review_done", "shared"

  selfReview      SelfReview?
  managerReview   ManagerReview?
  peerFeedback    PeerFeedback[]
  goals           Goal[]
}
```

### SelfReviews
```prisma
model SelfReview {
  id          String   @id @default(uuid())
  reviewId    String   @unique
  review      Review   @relation(fields: [reviewId], references: [id])
  ratings     Json     // {"code_quality": 4, "impact": 2, ...}
  reflections Json     // {"code_quality": "Shipped dashboard...", ...}
  submittedAt DateTime @default(now())
}
```

### ManagerReviews
```prisma
model ManagerReview {
  id          String   @id @default(uuid())
  reviewId    String   @unique
  review      Review   @relation(fields: [reviewId], references: [id])
  ratings     Json     // {"code_quality": 5, "impact": 5, ...}
  comments    String
  submittedAt DateTime @default(now())
}
```

### PeerFeedback
```prisma
model PeerFeedback {
  id          String   @id @default(uuid())
  reviewId    String
  review      Review   @relation(fields: [reviewId], references: [id])
  peerId      String
  peer        User     @relation(fields: [peerId], references: [id])
  responses   Json     // {"strengths": "...", "improvements": "...", ...}
  submittedAt DateTime @default(now())
}
```

### Goals
```prisma
model Goal {
  id          String   @id @default(uuid())
  reviewId    String
  review      Review   @relation(fields: [reviewId], references: [id])
  description String
  status      String   // "not_started", "in_progress", "completed"
  dueDate     DateTime
  createdAt   DateTime @default(now())
}
```

---

## Security Considerations

### Authentication
- **Nuxt Auth** with session-based auth (httpOnly cookies)
- **Password hashing:** bcrypt (cost factor 12)
- **OAuth:** Google OAuth for faster signup

### Authorization
- **Row-level security:** Users can only access their team's data
- **Middleware:** Check `user.teamId === resource.teamId` on every API call
- **Role-based access:** Managers can view all team reviews, employees only see their own

### Data Privacy
- **Peer feedback anonymization:** Never expose `peerId` to manager or employee
- **Encryption at rest:** PostgreSQL supports TDE (Transparent Data Encryption)
- **HTTPS only:** Enforce SSL in production
- **GDPR compliance:** Users can export all data as CSV/PDF, request deletion

---

## Performance Considerations

### Database Indexing
```sql
CREATE INDEX idx_reviews_employee ON reviews(employee_id);
CREATE INDEX idx_reviews_manager ON reviews(manager_id);
CREATE INDEX idx_reviews_cycle ON reviews(cycle_id);
CREATE INDEX idx_peer_feedback_review ON peer_feedback(review_id);
```

### Caching
- **API response caching:** Use Nitro (Nuxt server) caching for slow queries
- **Static generation:** Pre-render marketing pages (landing, pricing) at build time
- **CDN:** Vercel Edge Network caches static assets

### Lazy Loading
- **Code splitting:** Nuxt auto-splits routes
- **Lazy components:** Load heavy components (charts, tables) only when visible
- **Pagination:** Limit reviews list to 20 per page

---

## Deployment Strategy

### Phase 1: MVP (Vercel)
- **Frontend + API:** Vercel serverless functions
- **Database:** Neon PostgreSQL (free tier: 500MB, 100 hours compute)
- **Cost:** $0/month for <1K users

### Phase 2: Growth (Railway or Render)
- **Full-stack:** Railway (Nuxt app + PostgreSQL in one platform)
- **Database:** Railway PostgreSQL (starts at $5/month)
- **Cost:** $20-50/month for 1K-10K users

### Phase 3: Scale (AWS or GCP)
- **Frontend:** Vercel or Cloudflare Pages
- **Backend:** AWS Lambda or GCP Cloud Run
- **Database:** AWS RDS or GCP Cloud SQL
- **Cost:** $200-500/month for 10K-100K users

---

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - run: npx prisma migrate deploy
      - uses: vercel/actions/deploy@v2
```

### Pre-Deployment Checks
- [ ] Run tests (`npm run test`)
- [ ] Run linter (`npm run lint`)
- [ ] Run Prisma migrations (`npx prisma migrate deploy`)
- [ ] Check bundle size (<500KB initial load)

---

## Monitoring & Observability

### Error Tracking
- **Sentry:** Catch frontend + backend errors
- **Slack alerts:** Notify #tech channel on critical errors

### Performance Monitoring
- **Vercel Analytics:** Core Web Vitals (LCP, FID, CLS)
- **PostHog:** Page load times, API response times

### Logging
- **Structured logging:** Use `console.log` with JSON format
- **Log retention:** 30 days (free tier) or 90 days (paid)

---

*Last updated: January 27, 2026*
