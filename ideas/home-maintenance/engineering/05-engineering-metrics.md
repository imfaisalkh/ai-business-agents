# Engineering Metrics Dashboard

> **Purpose:** Track ship velocity and technical health. Update weekly every Friday.

---

## North Star Metric

**Ship Velocity:** Features shipped per week

| Week | Features | Target | Status |
|------|----------|--------|--------|
| Week 1 | - | 3-5 | - |
| Week 2 | - | 3-5 | - |
| Week 3 | - | 3-5 | - |
| Week 4 | - | 3-5 | - |

**Definition:** Number of completed features deployed to production (or staging before production exists)

**Why this metric:** For bootstrapped products, speed to market > perfection. Ship velocity directly measures execution.

---

## Weekly Dashboard

### Ship Velocity
| Week | Tasks Done | Features Shipped | Bug Escape Rate | Notes |
|------|------------|------------------|-----------------|-------|
| W1 | 0/34h | - | - | Foundation |
| W2 | 0/25h | - | - | Core Features |
| W3 | 0/25h | - | - | Core Features |
| W4 | 0/28h | - | - | Polish & Launch |

### Phase Progress
| Phase | Hours | Done | Remaining | % Complete |
|-------|-------|------|-----------|------------|
| 1: Foundation | 34h | 0h | 34h | 0% |
| 2: Core Features | 50h | 0h | 50h | 0% |
| 3: Polish & Launch | 28h | 0h | 28h | 0% |
| **Total** | **112h** | **0h** | **112h** | **0%** |

---

## Performance Benchmarks

### Frontend (Target: Core Web Vitals "Good")

| Page | LCP | FID | CLS | Status |
|------|-----|-----|-----|--------|
| Landing | - | - | - | Not measured |
| Login | - | - | - | Not measured |
| Dashboard | - | - | - | Not measured |
| Job Calendar | - | - | - | Not measured |
| Customer List | - | - | - | Not measured |
| Invoice List | - | - | - | Not measured |
| Worker Today | - | - | - | Not measured |

**Targets:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**How to measure:** Run Lighthouse audit in Chrome DevTools or PageSpeed Insights

### Backend (Target: P95 <500ms)

| Endpoint | P50 | P95 | Status |
|----------|-----|-----|--------|
| GET /api/auth/me | - | - | Not measured |
| GET /api/customers | - | - | Not measured |
| GET /api/jobs/calendar | - | - | Not measured |
| GET /api/invoices | - | - | Not measured |
| POST /api/jobs | - | - | Not measured |

**How to measure:** Add timing middleware or use Railway metrics

---

## Technical Debt Backlog

| ID | Item | Impact | Effort | Priority |
|----|------|--------|--------|----------|
| TD-001 | Add auth flow tests | High | Medium | High |
| TD-002 | Add E2E tests (Playwright) | Medium | Medium | Medium |
| TD-003 | Set up CI/CD pipeline | Medium | Small | Medium |
| TD-004 | Database backup strategy | High | Small | High |
| TD-005 | Implement recurring jobs | Medium | Large | Phase 2 |
| TD-006 | Add push notifications | Low | Medium | Phase 2 |
| TD-007 | Performance optimization audit | Low | Medium | After launch |
| TD-008 | Error monitoring (Sentry) | Medium | Small | Launch |

### Debt Rules
- **High impact + Small effort:** Do immediately
- **High impact + Large effort:** Schedule for next sprint
- **Low impact:** Track but don't prioritize

---

## Uptime & Reliability

### Target: 99.5% uptime (allows ~3.6 hours downtime/month)

| Month | Uptime | Incidents | Notes |
|-------|--------|-----------|-------|
| Launch Month | - | - | - |
| Month 2 | - | - | - |
| Month 3 | - | - | - |

### Error Tracking

| Week | 4xx Errors | 5xx Errors | Unhandled Errors | Notes |
|------|------------|------------|------------------|-------|
| W1 | - | - | - | - |
| W2 | - | - | - | - |
| W3 | - | - | - | - |
| W4 | - | - | - | - |

**Target:** <1% of requests result in errors

---

## Incident Log

| Date | Severity | Description | Resolution | Prevention |
|------|----------|-------------|------------|------------|
| - | - | - | - | - |

**Severity Levels:**
- **P0 (Critical):** Service down, data loss, security breach
- **P1 (High):** Major feature broken
- **P2 (Medium):** Minor feature broken, workaround exists
- **P3 (Low):** Cosmetic issue, no user impact

---

## What NOT to Track (Vanity Metrics)

- Lines of code written (more is not better)
- Number of commits (activity is not progress)
- 100% test coverage (diminishing returns)
- Code complexity scores (unless problematic)
- GitHub stars (means nothing for B2B)

---

## Weekly Engineering Review

**Complete every Friday before end of day**

### Week of: ___________

**1. What shipped this week?**
- [ ] Feature/fix 1
- [ ] Feature/fix 2
- [ ] Feature/fix 3

**2. What blocked progress?**
- Blocker 1: _____ | Resolution: _____
- Blocker 2: _____ | Resolution: _____

**3. Technical debt status**
- New debt introduced? [ ] Yes [ ] No
- Debt paid down? [ ] Yes [ ] No
- Critical debt to address next week? _____

**4. Performance check**
- Any performance degradation? [ ] Yes [ ] No
- Action items: _____

**5. Next week's priorities (top 3)**
1. _____
2. _____
3. _____

**6. Hours logged vs planned**
- Planned: _____ hours
- Actual: _____ hours
- Variance: _____ (explain if >20%)

---

## Monthly Engineering Review

### Month: ___________

**Velocity Trend**
| Week | Features | Bugs Escaped | Notes |
|------|----------|--------------|-------|
| W1 | - | - | - |
| W2 | - | - | - |
| W3 | - | - | - |
| W4 | - | - | - |
| **Total** | **-** | **-** | - |

**Infrastructure Review**
- [ ] Dependencies up to date?
- [ ] Security patches applied?
- [ ] Database backups verified?
- [ ] Monitoring alerting correctly?
- [ ] SSL certificates valid?

**Architecture Review**
- [ ] Any scaling concerns emerging?
- [ ] Any refactoring needed?
- [ ] Any tech debt becoming critical?

**Cost Review**
| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| Vercel (Frontend) | $0 | Hobby plan |
| Railway (Backend) | ~$5-20 | Usage-based |
| Stripe | 2.9% + $0.30/txn | Per payment |
| Twilio | ~$0.0079/SMS | Per message |
| Resend | $0 | Free tier |
| PostHog | $0 | Free tier |
| **Total** | ~$25/mo | Before revenue |

---

## Pre-Launch Checklist

### Technical Readiness
- [ ] All Phase 1-3 tasks complete
- [ ] Auth flow tested end-to-end
- [ ] Payment flow tested with Stripe test mode
- [ ] SMS sending/receiving tested
- [ ] Mobile PWA tested on real devices
- [ ] All form validations working
- [ ] Error pages (404, 500) in place
- [ ] Loading states on all pages

### Security Checklist
- [ ] Passwords hashed with bcrypt
- [ ] JWT secrets in environment variables
- [ ] CORS configured correctly
- [ ] Rate limiting on auth endpoints
- [ ] No secrets in git repository
- [ ] HTTPS enforced
- [ ] SQL injection prevented (using Drizzle ORM)

### Deployment Checklist
- [ ] Production environment variables set
- [ ] Domain configured with SSL
- [ ] Database backup configured
- [ ] Error monitoring (Sentry) configured
- [ ] Uptime monitoring configured
- [ ] PostHog events firing correctly

---

## Key Contact Points

| Service | Dashboard | Support |
|---------|-----------|---------|
| Vercel | vercel.com/dashboard | support@vercel.com |
| Railway | railway.app/dashboard | support@railway.app |
| Stripe | dashboard.stripe.com | stripe.com/support |
| Twilio | console.twilio.com | twilio.com/help |
| Resend | resend.com/dashboard | support@resend.com |
| PostHog | app.posthog.com | support@posthog.com |

---

*Last updated: January 29, 2026*
