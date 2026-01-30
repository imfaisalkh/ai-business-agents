# Engineering Metrics Dashboard

> **Purpose:** Track shipping velocity and technical health for TeamPulse. Update weekly.

## North Star: Ship Velocity

**Definition:** Features shipped per week that reach production
**Target:** 2-3 features/week (solo dev with 20h/week)

---

## Health Metrics

### Shipping Velocity (Primary)

| Metric | Target | How to Measure | Current |
|--------|--------|----------------|---------|
| Features shipped/week | 2-3 | Completed tasks deployed to prod | - |
| Phase completion | On schedule | Actual vs planned milestone dates | - |
| Deploy frequency | Daily | Production deploys per week | - |

### Quality Metrics

| Metric | Target | How to Measure | Current |
|--------|--------|----------------|---------|
| Bug escape rate | <10% | Bugs found in prod / features shipped | - |
| Rollback rate | <5% | Rollbacks / total deploys | - |
| P0 incidents | 0/month | Critical prod issues requiring immediate fix | - |

### Performance Metrics (SLC Targets from PRD)

| Metric | Target | How to Measure | Current |
|--------|--------|----------------|---------|
| LCP (Largest Contentful Paint) | <2.0s | Lighthouse / Vercel Analytics | - |
| API Response P95 | <500ms | PostHog / Vercel Functions | - |
| Time to Interactive | <3.0s | Lighthouse | - |
| Auto-save latency | <1s | Client-side timing | - |
| Database query P95 | <100ms | Supabase metrics | - |

### SLC-Specific Metrics (from PRD)

| Dimension | Metric | Target | Timeline |
|-----------|--------|--------|----------|
| **Simple** | Time to first review cycle | <15 min | Week 2 |
| **Simple** | Time to complete one review | <20 min | Week 2 |
| **Lovable** | Gap analysis adoption | >70% of reviews | Week 4 |
| **Complete** | Review cycle completion rate | >80% | Week 4 |

---

## Weekly Tracking Template

### Week of: [DATE]

**Shipped:**
- [ ] Feature 1: [description]
- [ ] Feature 2: [description]
- [ ] Feature 3: [description]

**Velocity:** [X] features (Target: 2-3)

**Blockers:**
- None / [description]

**Performance Check:**
- LCP: [X.X]s (Target: <2.0s)
- API P95: [X]ms (Target: <500ms)

**Bugs Fixed:** [X]
**Bugs Escaped to Prod:** [X]

---

## Phase Progress Tracker

### Phase 1: Foundation (Weeks 1-2)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Project setup complete | Week 1 | - | [ ] |
| Auth working | Week 1 | - | [ ] |
| Schema deployed | Week 1 | - | [ ] |
| Multi-tenant foundation | Week 2 | - | [ ] |
| Staging deployed | Week 2 | - | [ ] |

### Phase 2: Cycle Management (Weeks 3-4)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Cycle CRUD | Week 3 | - | [ ] |
| Template system | Week 3 | - | [ ] |
| Team management | Week 4 | - | [ ] |
| Wizard complete | Week 4 | - | [ ] |

### Phase 3: Review Workflow (Weeks 5-7)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Manager review form | Week 5 | - | [ ] |
| Auto-save working | Week 5 | - | [ ] |
| Self-review form | Week 6 | - | [ ] |
| Peer feedback system | Week 6 | - | [ ] |
| Share review flow | Week 7 | - | [ ] |

### Phase 4: Gap Analysis (Week 8)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Gap calculation | Week 8 | - | [ ] |
| Visual comparison | Week 8 | - | [ ] |
| PDF export | Week 8 | - | [ ] |

### Phase 5: Goals (Week 9)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Goal CRUD | Week 9 | - | [ ] |
| Goal progress tracking | Week 9 | - | [ ] |
| Goals in review sidebar | Week 9 | - | [ ] |

### Phase 6: Notifications (Week 10)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Email templates | Week 10 | - | [ ] |
| Reminder cron job | Week 10 | - | [ ] |
| In-app notifications | Week 10 | - | [ ] |

### Phase 7: Analytics & Billing (Week 11)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| PostHog integration | Week 11 | - | [ ] |
| Stripe billing | Week 11 | - | [ ] |
| Dashboard stats | Week 11 | - | [ ] |

### Phase 8: Polish & Launch (Week 12)
| Milestone | Planned | Actual | Status |
|-----------|---------|--------|--------|
| Error handling | Week 12 | - | [ ] |
| Landing page | Week 12 | - | [ ] |
| Production launch | Week 12 | - | [ ] |

---

## Technical Debt Register

Track only when it blocks shipping. Fix High impact immediately, schedule Medium for next phase, ignore Low until it causes problems.

| Issue | Impact | Discovered | Fix When | Status |
|-------|--------|------------|----------|--------|
| - | - | - | - | - |

**Impact Definitions:**
- **High:** Blocks feature development or causes user-facing issues
- **Medium:** Slows development or causes minor UX issues
- **Low:** Code smell, minor inefficiency, nice-to-have cleanup

---

## Performance Budget

### Bundle Size
| Chunk | Budget | Current |
|-------|--------|---------|
| Initial JS | <150KB gzip | - |
| Route chunks | <50KB each | - |
| Total page weight | <500KB | - |

### Database
| Query Type | Budget | Current |
|------------|--------|---------|
| List queries | <50ms | - |
| Single record | <20ms | - |
| Complex joins | <100ms | - |

---

## Infrastructure Costs

Track monthly to ensure sustainable unit economics.

| Service | Budget | Current | Notes |
|---------|--------|---------|-------|
| Vercel | $20/mo | - | Pro plan for cron |
| Supabase (DB + Auth) | $0-25/mo | - | Free tier generous, Pro at $25 |
| Resend | $20/mo | - | 50k emails |
| PostHog | $0/mo | - | Free tier sufficient |
| **Total** | **~$40-65/mo** | - | |

**Break-even:** ~7-10 users at $6 PEPM (conservative)

---

## What NOT to Track

These metrics add overhead without driving shipping:

- Lines of code written/deleted
- Number of commits
- Test coverage percentage (focus on critical paths only)
- Cyclomatic complexity scores
- Code review turnaround time (solo dev)
- Sprint velocity points

**Focus on:** Shipped features, user-facing quality, and performance.

---

## Alerts & Monitoring (Post-Launch)

### Critical Alerts (Wake me up)
- [ ] API error rate > 5% for 5 minutes
- [ ] P95 latency > 2s for 5 minutes
- [ ] Database connection failures
- [ ] Stripe webhook failures

### Warning Alerts (Check next morning)
- [ ] Error rate > 1%
- [ ] P95 latency > 1s
- [ ] Email delivery failures
- [ ] Low disk space

### Daily Dashboard Check
- [ ] Vercel deployment status
- [ ] PostHog funnel conversion
- [ ] Error logs review (first 10 min of day)

---

## Post-Launch Iteration Metrics

After SLC launch, focus on:

| Metric | Week 13 | Week 14 | Week 15 | Week 16 |
|--------|---------|---------|---------|---------|
| WAU | - | - | - | - |
| Review cycles created | - | - | - | - |
| Gap analysis views | - | - | - | - |
| Trial signups | - | - | - | - |
| Trial -> Paid conversion | - | - | - | - |
| Churn rate | - | - | - | - |
| NPS score | - | - | - | - |

---

## Engineering Principles Checklist

Before each release, verify:

- [ ] **Simple:** Feature can be explained in one sentence
- [ ] **Lovable:** Tested the flow myself, it feels good
- [ ] **Complete:** User can complete their task end-to-end
- [ ] **Fast:** Loads in <2s on 3G connection
- [ ] **Reliable:** Error states handled gracefully
- [ ] **Secure:** Auth checks on all mutations, data isolation verified

---

*Last updated: [DATE]*
