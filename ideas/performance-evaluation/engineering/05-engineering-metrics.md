# Engineering Metrics Dashboard

> **Purpose:** Track development velocity, quality, and system health for TeamPulse. Focus on ship speed, not vanity metrics.
>
> **Fits in:** Review weekly to ensure healthy development pace. Product Manager uses these in standups.

## North Star Metric

**Features Shipped per Week:** 0 (current) --> 3-5 (target)

**Definition:** A feature is "shipped" when it's deployed to production and usable by customers
**Why this metric:** Shipping is the only thing that matters for a startup

---

## Primary Metrics

### 1. Ship Velocity

**Definition:** Features/fixes deployed to production per week

| Week | Features | Bug Fixes | Total | Notes |
|------|----------|-----------|-------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

**Target:** 3-5 items/week during build phase
**Action if below:** Identify blockers, reduce scope, parallelize

---

### 2. Time to Deploy

**Definition:** Time from code complete to production

| Metric | Current | Target |
|--------|---------|--------|
| Avg deploy time | - | <15 min |
| Hotfix deploy time | - | <5 min |
| Rollback time | - | <2 min |

**Target:** <15 minutes from merge to production
**Action if above:** Optimize CI/CD, reduce build size

---

### 3. Build Success Rate

**Definition:** % of CI builds that pass

| Week | Total Builds | Passed | Success Rate |
|------|--------------|--------|--------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Target:** >95%
**Action if below:** Fix flaky tests, improve error messages

---

### 4. Code Review Turnaround

**Definition:** Time from PR opened to merged

| Week | PRs Opened | Avg Time to Merge | >24h PRs |
|------|------------|-------------------|----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

**Target:** <4 hours average
**Action if above:** Async review, smaller PRs, pair programming

---

## System Health Metrics

### Uptime

| Metric | Current | Target |
|--------|---------|--------|
| Uptime (30 day) | - | 99.9% |
| Downtime incidents | - | 0/month |
| P1 incidents | - | 0/month |

---

### Performance

| Metric | Current | Target | Action Threshold |
|--------|---------|--------|------------------|
| Avg page load (FCP) | - | <1.5s | >3s = P1 |
| Avg API response | - | <200ms | >500ms = investigate |
| P95 API response | - | <500ms | >1s = P1 |
| Database query time | - | <50ms | >200ms = optimize |

---

### Error Rates

| Metric | Current | Target | Action Threshold |
|--------|---------|--------|------------------|
| Error rate (5xx) | - | <0.1% | >1% = P1 |
| Error rate (4xx) | - | <5% | >10% = investigate |
| Unhandled exceptions | - | 0/day | >5/day = fix |

---

## Quality Metrics

### Test Coverage

| Area | Current | Target |
|------|---------|--------|
| Unit tests | - | >80% |
| API tests | - | >90% |
| E2E tests (critical paths) | - | 100% |

**Critical paths to test:**
- [ ] User signup/login
- [ ] Create review cycle
- [ ] Write and submit review
- [ ] View gap analysis
- [ ] Payment flow

---

### Bug Metrics

| Week | New Bugs | Fixed | Open | Backlog Age |
|------|----------|-------|------|-------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

**Target:** Fix rate > creation rate
**Backlog age target:** <2 weeks oldest bug

---

## Technical Debt Tracking

### Current Tech Debt Items

| Item | Impact | Effort | Priority |
|------|--------|--------|----------|
| Add proper error boundaries | Medium | Low | P1 |
| Optimize database queries | High | Medium | P1 |
| Add comprehensive logging | Medium | Medium | P2 |
| Improve test coverage | Medium | High | P2 |
| Refactor [specific area] | Low | Low | P3 |

**Tech debt budget:** 20% of sprint capacity

---

## Infrastructure Costs

### Monthly Costs

| Service | Current | Projected (6 mo) | Notes |
|---------|---------|------------------|-------|
| Vercel | $20 | $20 | Pro plan |
| Supabase | $25 | $25 | Pro plan |
| Clerk | $0 | $25 | Free tier now |
| Resend | $0 | $20 | Free tier now |
| PostHog | $0 | $0 | Free tier |
| Domain/SSL | $15 | $15 | Annual |
| **Total** | **~$60** | **~$105** | |

**Cost per customer:** $60 / X customers = $Y

---

## Development Environment Health

### Setup Time

| Task | Current | Target |
|------|---------|--------|
| Clone to running locally | - | <15 min |
| New dev onboarding | - | <2 hours |
| Database seed | - | <1 min |

---

### Developer Experience

| Metric | Current | Target |
|--------|---------|--------|
| Hot reload time | - | <1s |
| Full build time | - | <2 min |
| Test run time | - | <2 min |
| Linting time | - | <10s |

---

## Weekly Engineering Review

*Complete every Friday - 15 minutes*

### This Week's Numbers

| Metric | Target | Actual | Trend |
|--------|--------|--------|-------|
| Features shipped | 3-5 | | ↑↓→ |
| Bugs fixed | | | |
| Build success rate | 95% | | |
| Error rate (5xx) | <0.1% | | |
| Avg page load | <1.5s | | |

### What Shipped This Week?
- [ ] Feature: _______________
- [ ] Feature: _______________
- [ ] Bug fix: _______________

### What Got Blocked?
- Blocker: _______________ | Resolution: _______________

### Tech Debt Addressed?
- [ ] Item: _______________

### Next Week's Focus
1. _______________
2. _______________
3. _______________

---

## Incident Tracking

### Incident Template

```markdown
## Incident #[number]: [Brief title]

**Severity:** P1 / P2 / P3
**Status:** Open / Resolved
**Duration:** [start time] - [end time]

### What Happened
[Brief description of the issue]

### Impact
- Users affected: [number]
- Revenue impact: [if any]
- Data impact: [if any]

### Timeline
- [time]: Issue detected
- [time]: Investigation started
- [time]: Root cause identified
- [time]: Fix deployed
- [time]: Verified resolved

### Root Cause
[What caused the issue]

### Resolution
[How it was fixed]

### Action Items
- [ ] [Preventive measure 1]
- [ ] [Preventive measure 2]
```

---

## Deployment Checklist

### Pre-Deploy
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Migrations tested (if any)
- [ ] Feature flags configured (if needed)
- [ ] Monitoring alerts configured

### Deploy
- [ ] Deploy to staging
- [ ] Smoke test staging
- [ ] Deploy to production
- [ ] Verify production works

### Post-Deploy
- [ ] Monitor error rates (15 min)
- [ ] Check key flows work
- [ ] Update changelog
- [ ] Notify team in Slack

---

## Alerts Configuration

### Critical Alerts (Wake Up)

| Alert | Condition | Action |
|-------|-----------|--------|
| Error spike | >5% 5xx in 5 min | Page on-call |
| Database down | Connection failures | Page on-call |
| Payment failures | >10% failure rate | Page on-call |
| Auth down | Clerk errors | Page on-call |

### Warning Alerts (Check Next Day)

| Alert | Condition | Action |
|-------|-----------|--------|
| Slow API | P95 >1s | Investigate |
| High error rate | >1% 4xx | Investigate |
| Low disk space | >80% | Scale up |
| High memory | >85% | Investigate |

---

## DO NOT TRACK (Vanity Metrics)

- Lines of code (more isn't better)
- Number of commits (meaningless)
- GitHub stars (doesn't pay bills)
- Framework version updates (update when needed)
- Test count (coverage % matters more)

---

## Quick Commands for Metrics

```bash
# Check build times
time pnpm build

# Check test times
time pnpm test

# Check bundle size
pnpm build && ls -la .next/static/chunks

# Check dependencies
pnpm outdated

# Check for security issues
pnpm audit
```

---

## Monitoring Dashboard Links

- **Vercel Dashboard:** [Link to Vercel project]
- **Supabase Dashboard:** [Link to Supabase project]
- **PostHog:** [Link to PostHog dashboard]
- **Sentry:** [Link to Sentry project]
- **Clerk Dashboard:** [Link to Clerk project]
