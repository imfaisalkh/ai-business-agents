# Engineering Metrics Dashboard

*Generated for: Performance Evaluation Tool*

---

## North Star Metric

### Primary: Ship Velocity (Features per Week)

**Definition:** Number of user-facing features or significant improvements shipped to production per week

**Why This Metric:**
- Directly measures progress toward MVP
- Encourages small, incremental releases
- Forces focus on what matters (shipping)

**Targets:**

| Phase | Target | Notes |
|-------|--------|-------|
| Setup (Week 1-2) | 0-1 features | Infrastructure focus |
| Build (Week 3-6) | 2-3 features | Core functionality |
| Polish (Week 7-8) | 1-2 features | Bug fixes, refinement |

---

## Build Metrics

### Weekly Development Tracking

| Week | Planned Hours | Actual Hours | Features Shipped | Notes |
|------|---------------|--------------|------------------|-------|
| 1 | 20 | | | Setup |
| 2 | 20 | | | Auth, Teams |
| 3 | 20 | | | Templates |
| 4 | 20 | | | Cycles |
| 5 | 20 | | | Self-Review |
| 6 | 20 | | | Peer Feedback |
| 7 | 20 | | | Manager Review |
| 8 | 20 | | | Polish |

### Sprint Burndown

```
Story Points / Hours Remaining

80 |████
70 |████
60 |████
50 |████
40 |████
30 |████
20 |████
10 |████
0  |────────────────────────────
    W1  W2  W3  W4  W5  W6  W7  W8
```

### Task Completion Rate

| Metric | Target | Actual |
|--------|--------|--------|
| Tasks completed / planned | 90%+ | |
| On-time completion | 80%+ | |
| Scope changes | <20% | |
| Blocked tasks | <5% | |

---

## Code Quality Metrics

### Code Health

| Metric | Target | Tool | Red Flag |
|--------|--------|------|----------|
| TypeScript errors | 0 | `tsc --noEmit` | Any errors |
| ESLint warnings | <10 | ESLint | >25 warnings |
| Test coverage | 60%+ | Vitest | <40% |
| Duplicated code | <5% | Manual review | >10% |

### Build Performance

| Metric | Target | Red Flag |
|--------|--------|----------|
| Dev server start | <5 sec | >15 sec |
| Hot reload | <1 sec | >3 sec |
| Production build | <60 sec | >120 sec |
| Bundle size (JS) | <500KB | >1MB |

### API Performance

| Metric | Target | Red Flag |
|--------|--------|----------|
| Response time (p50) | <100ms | >200ms |
| Response time (p95) | <500ms | >1 sec |
| Error rate | <0.1% | >1% |
| Database queries/request | <5 | >10 |

---

## Technical Debt Tracking

### Debt Register

| ID | Description | Impact | Effort | Priority |
|----|-------------|--------|--------|----------|
| TD1 | No unit tests for API routes | High | Medium | P1 |
| TD2 | Hardcoded email templates | Low | Low | P3 |
| TD3 | No error boundary in frontend | Medium | Low | P2 |
| TD4 | Missing database indexes | High | Low | P1 |
| TD5 | No rate limiting on auth | High | Low | P1 |

### Debt Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| New debt items / week | <2 | |
| Debt items resolved / sprint | 1-2 | |
| Total open debt items | <10 | |
| Critical debt items | 0 | |

---

## Infrastructure Metrics

### Uptime & Reliability

| Metric | Target | Red Flag |
|--------|--------|----------|
| Uptime | 99.9% | <99.5% |
| Successful deploys | 95%+ | <80% |
| Rollback rate | <10% | >25% |
| MTTR (mean time to recover) | <30 min | >2 hours |

### Cost Tracking

| Service | Monthly Budget | Actual | Notes |
|---------|---------------|--------|-------|
| Railway (hosting) | $0-10 | | Free tier to start |
| Railway (database) | $0-5 | | PostgreSQL addon |
| Resend (email) | $0 | | 3K free emails |
| Domain | $1 | | Annual/12 |
| **Total** | **<$20** | | |

### Resource Usage

| Resource | Limit | Usage | Alert At |
|----------|-------|-------|----------|
| API memory | 512MB | | 400MB |
| Database size | 1GB | | 750MB |
| Email sends/month | 3,000 | | 2,500 |

---

## Development Workflow Metrics

### PR/Commit Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Commits / week | 10-20 | Consistent progress |
| Commit size | <200 lines | Small, focused commits |
| Deploy frequency | Daily | Continuous delivery |
| Lead time (commit to deploy) | <1 hour | Fast feedback |

### Time Distribution

| Activity | Target % | Actual |
|----------|---------|--------|
| Feature development | 70% | |
| Bug fixes | 15% | |
| Technical debt | 10% | |
| Meetings/Planning | 5% | |

---

## Quality Gates

### Pre-Commit Checks

```bash
# .husky/pre-commit (or manual checklist)
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] No console.logs in production code
```

### Pre-Deploy Checks

```bash
# Before every deploy
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Manually tested key flows
- [ ] Database migrations applied
```

### Release Checklist

```bash
# Before each feature release
- [ ] Feature works end-to-end
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] Mobile responsive
- [ ] Accessible (keyboard nav, screen readers)
```

---

## Incident Tracking

### Severity Levels

| Level | Definition | Response Time | Example |
|-------|------------|---------------|---------|
| P0 | System down | Immediate | API 500 errors, auth broken |
| P1 | Major feature broken | <2 hours | Reviews can't be submitted |
| P2 | Minor feature broken | <24 hours | Export not working |
| P3 | Cosmetic / minor | Next sprint | Typo, styling issue |

### Incident Log

| Date | Severity | Issue | Resolution | Time to Fix |
|------|----------|-------|------------|-------------|
| | | | | |

### Post-Incident Metrics

| Metric | Target |
|--------|--------|
| Incidents / month | <2 P0/P1 |
| MTTR (P0/P1) | <1 hour |
| Root cause identified | 100% |
| Prevention action taken | 90%+ |

---

## Dashboard Template

### Weekly Engineering Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ ENGINEERING DASHBOARD - Week [X]                                   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  VELOCITY                           BUILD HEALTH                   │
│  ────────                           ────────────                   │
│  Features shipped: 2/3              TypeScript errors: 0  ✓        │
│  Tasks completed: 8/10 (80%)        ESLint warnings: 3  ✓          │
│  Hours logged: 18/20                Test coverage: 52%             │
│                                     Bundle size: 412KB  ✓          │
│                                                                    │
│  PROGRESS                           TECH DEBT                      │
│  ────────                           ─────────                      │
│  Phase 2: ████████░░ 80%            Open items: 5                  │
│  Overall: ████░░░░░░ 40%            Critical: 0  ✓                 │
│                                     Added this week: 1             │
│                                     Resolved: 2  ✓                 │
│                                                                    │
│  INFRA                              QUALITY                        │
│  ─────                              ───────                        │
│  Uptime: 100%  ✓                    P0/P1 incidents: 0  ✓          │
│  Deploys: 5 (all success)           Bug reports: 2                 │
│  Costs: $0 (free tier)              Code review coverage: 100%     │
│                                                                    │
│  BLOCKERS                                                          │
│  ────────                                                          │
│  None this week  ✓                                                 │
│                                                                    │
│  NEXT WEEK FOCUS                                                   │
│  ─────────────────                                                 │
│  1. Complete peer feedback feature                                 │
│  2. Add email notifications                                        │
│  3. Resolve TD1 (API tests)                                        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Monitoring Setup

### Recommended Tools

| Purpose | Tool | Cost |
|---------|------|------|
| Error tracking | Sentry | Free tier |
| Uptime monitoring | BetterUptime | Free |
| Performance | Built-in Fastify logging | Free |
| Analytics | Plausible | $9/month |

### Key Alerts to Configure

| Alert | Trigger | Channel |
|-------|---------|---------|
| API error rate >1% | Sentry | Email |
| Site down | BetterUptime | Email + SMS |
| Database >80% capacity | Railway | Email |
| Deploy failed | Railway | Email |

### Logging Strategy

```typescript
// Log levels
app.log.error() // P0: System errors, exceptions
app.log.warn()  // P1: Unexpected behavior, recoverable
app.log.info()  // Normal operations (sparse)
app.log.debug() // Development only

// What to log
- All API errors with request context
- Authentication failures
- Database query failures
- External service failures (email, etc.)

// What NOT to log
- Successful requests (use analytics instead)
- User PII
- Passwords or tokens
```

---

## Definition of Done

### For Each Feature

- [ ] Code complete and compiles
- [ ] Works in local development
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Mobile responsive
- [ ] Tested manually end-to-end
- [ ] No console errors
- [ ] Deployed to production

### For MVP Launch

- [ ] All P0 features complete
- [ ] <5 known bugs (no P0/P1)
- [ ] Error tracking in place
- [ ] Basic monitoring active
- [ ] Can handle 50 concurrent users
- [ ] Data backup configured
- [ ] Recovery tested

---

## Red Flags

### Stop and Address Immediately

| Red Flag | Action |
|----------|--------|
| TypeScript errors in main branch | Fix before merging anything else |
| API error rate >5% | Roll back, investigate |
| Feature >50% over estimate | Re-scope or break down |
| 3+ days no commits | Identify blocker |
| Build time >5 minutes | Optimize build |

### Weekly Review Triggers

| Metric | Threshold | Investigation |
|--------|-----------|---------------|
| Velocity <50% target | 2 weeks | Scope or process issue |
| Tech debt growing | 3+ items/week | Allocate debt time |
| Test coverage dropping | <50% | Add tests |
| Bundle size growing | >100KB/month | Optimize imports |

---

*Engineering artifacts complete. Next: Bootstrap Finance artifacts.*
