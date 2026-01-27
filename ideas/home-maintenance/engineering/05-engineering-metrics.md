# Engineering Metrics

*Generated on January 28, 2026*

---

## North Star Metric

**Ship Velocity: Features Shipped per Week**

Definition: Number of user-facing features or significant improvements deployed to production per week.

**Why this metric?**
- Directly measures value delivered to users
- Focuses on outcomes, not activity
- Encourages small, frequent releases

**Targets:**
| Phase | Target | Notes |
|-------|--------|-------|
| Build (Weeks 1-4) | 5-7 features/week | Heavy development |
| Post-Launch (Month 2-3) | 2-3 features/week | Bug fixes + improvements |
| Steady State (Month 4+) | 1-2 features/week | Maintenance + new features |

---

## Development Velocity Metrics

### Sprint Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Tasks completed/week** | Tasks moved to "done" | 15-20 |
| **Story points/week** | Estimated effort delivered | Track trend |
| **Cycle time** | Time from start to done | < 2 days |
| **Lead time** | Time from backlog to done | < 1 week |

### Code Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Commits/day** | Number of commits | 5-10 |
| **PR merge time** | Time to merge after PR opened | < 4 hours (self-merge) |
| **Code review turnaround** | Time to review (if applicable) | < 24 hours |

### Time Tracking

| Category | Target Allocation |
|----------|-------------------|
| Feature development | 60% |
| Bug fixes | 15% |
| Refactoring/Tech debt | 10% |
| Learning/Research | 10% |
| Meetings/Planning | 5% |

---

## Quality Metrics

### Bug Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Bugs created/week** | New bugs reported | < 5 |
| **Bug fix rate** | Bugs fixed / Bugs created | > 100% |
| **Critical bug age** | Time to fix P0 bugs | < 24 hours |
| **Bug escape rate** | Bugs found in production | < 2/week |

### Test Coverage (When Added)

| Metric | Definition | Target |
|--------|------------|--------|
| **Unit test coverage** | % of code covered | > 60% |
| **Integration test coverage** | Critical paths tested | 100% |
| **E2E test coverage** | User flows tested | Top 5 flows |

### Code Health

| Metric | Tool | Target |
|--------|------|--------|
| **TypeScript errors** | tsc | 0 |
| **ESLint errors** | eslint | 0 |
| **Duplicate code** | Manual review | < 5% |
| **Dead code** | Manual review | 0 |

---

## Performance Metrics

### Frontend Performance

| Metric | Tool | Target | Alert |
|--------|------|--------|-------|
| **Lighthouse Performance** | Lighthouse | > 80 | < 60 |
| **First Contentful Paint** | Lighthouse | < 1.5s | > 3s |
| **Largest Contentful Paint** | Lighthouse | < 2.5s | > 4s |
| **Time to Interactive** | Lighthouse | < 3s | > 5s |
| **Bundle size (JS)** | Build output | < 300KB | > 500KB |

### Backend Performance

| Metric | Tool | Target | Alert |
|--------|------|--------|-------|
| **API response time (P50)** | Logs | < 100ms | > 300ms |
| **API response time (P95)** | Logs | < 300ms | > 1s |
| **Database query time (P50)** | Logs | < 20ms | > 100ms |
| **Database query time (P95)** | Logs | < 100ms | > 500ms |

### Mobile (PWA) Performance

| Metric | Tool | Target | Alert |
|--------|------|--------|-------|
| **3G load time** | Lighthouse | < 5s | > 10s |
| **Offline capability** | Manual test | Works | Broken |
| **Install prompt** | Manual test | Shows | Missing |

---

## Reliability Metrics

### Uptime & Availability

| Metric | Definition | Target | Alert |
|--------|------------|--------|-------|
| **Uptime** | % time service available | 99.5% | < 99% |
| **Downtime/month** | Minutes offline | < 22 min | > 60 min |
| **Error rate** | % of requests returning 5xx | < 0.1% | > 1% |
| **Failed deployments** | Deploys that rolled back | 0 | > 0 |

### Incident Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **MTTR** | Mean time to recovery | < 30 min |
| **MTBF** | Mean time between failures | > 7 days |
| **Incidents/month** | User-impacting incidents | < 2 |

---

## Infrastructure Metrics

### Resource Usage

| Metric | Tool | Target | Alert |
|--------|------|--------|-------|
| **CPU usage** | Railway/Render | < 60% avg | > 80% |
| **Memory usage** | Railway/Render | < 70% | > 85% |
| **Database size** | Railway/Render | Track growth | Approaching limit |
| **Storage usage** | Railway/Render | < 50% | > 80% |

### Cost Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Infrastructure cost/month** | Total hosting costs | < $50 initially |
| **Cost per customer** | Total cost / Customers | < $2/customer |
| **Cost trend** | Month-over-month change | Stable or decreasing |

---

## External Service Metrics

### Stripe

| Metric | Definition | Target |
|--------|------------|--------|
| **Payment success rate** | Successful payments / Attempts | > 95% |
| **Webhook delivery rate** | Webhooks received / Sent | 100% |
| **Refund rate** | Refunds / Payments | < 2% |

### Twilio (SMS)

| Metric | Definition | Target |
|--------|------------|--------|
| **SMS delivery rate** | Delivered / Sent | > 97% |
| **SMS cost/customer/month** | Total SMS cost / Customers | < $2 |
| **Failed message rate** | Failed / Sent | < 3% |

### Resend (Email)

| Metric | Definition | Target |
|--------|------------|--------|
| **Email delivery rate** | Delivered / Sent | > 98% |
| **Bounce rate** | Bounces / Sent | < 2% |
| **Spam complaint rate** | Complaints / Delivered | < 0.1% |

---

## Tracking & Monitoring Setup

### Phase 1: Manual (Week 1-4)

Track in a simple spreadsheet:

| Date | Tasks Done | Bugs Fixed | Bugs Created | Deploy Count | Downtime |
|------|------------|------------|--------------|--------------|----------|

### Phase 2: Basic Monitoring (Post-Launch)

**Tools:**
- **UptimeRobot** (Free) - Uptime monitoring, alerts
- **Sentry** (Free tier) - Error tracking
- **Railway/Render dashboards** - Resource usage

### Phase 3: Advanced (Month 3+)

**Add when justified:**
- **LogTail/Better Stack** - Log aggregation
- **Grafana Cloud** (Free tier) - Dashboards
- **PostHog** (Free tier) - Product analytics

---

## Weekly Engineering Report Template

```markdown
## Engineering Weekly Report - Week of [Date]

### Summary
- Tasks completed: X / Y planned
- Features shipped: X
- Bugs fixed: X
- Bugs created: X
- Deploys: X
- Incidents: X

### Shipped This Week
1. [Feature/Fix 1] - [Brief description]
2. [Feature/Fix 2] - [Brief description]
3. [Feature/Fix 3] - [Brief description]

### Performance
- API P50: Xms (target: <100ms)
- Lighthouse Score: X (target: >80)
- Error rate: X% (target: <0.1%)

### Infrastructure
- CPU: X% avg
- Memory: X%
- Cost MTD: $X

### Blockers
- [Blocker 1]
- [Blocker 2]

### Next Week Focus
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

### Tech Debt Notes
- [Item needing attention]
```

---

## Alert Thresholds

### Critical (Wake Up)

| Condition | Action |
|-----------|--------|
| Service down > 5 min | Investigate immediately |
| Error rate > 5% | Investigate immediately |
| Database connection failed | Investigate immediately |
| Payment webhook failing | Investigate within 1 hour |

### Warning (Next Business Day)

| Condition | Action |
|-----------|--------|
| Error rate > 1% | Investigate cause |
| API P95 > 1s | Profile slow endpoints |
| CPU > 70% sustained | Consider scaling |
| Lighthouse < 70 | Performance audit |

### Info (Weekly Review)

| Condition | Action |
|-----------|--------|
| Bug count increasing | Review quality practices |
| Cycle time increasing | Review process |
| Bundle size increasing | Consider optimization |

---

## Definition of Done (Engineering)

A task is "done" when:

- [ ] Code works as intended
- [ ] No TypeScript/lint errors
- [ ] Error states handled
- [ ] Loading states present
- [ ] Mobile responsive (if UI)
- [ ] Tested manually
- [ ] Deployed to production
- [ ] Monitored for errors post-deploy

---

## Key Engineering Principles

1. **Ship small, ship often.** Daily deploys beat weekly releases.

2. **Fix bugs before features.** Broken product = no trust.

3. **Measure what matters.** Track ship velocity, not lines of code.

4. **Automate the boring stuff.** Deploy scripts, not manual processes.

5. **Build for the 90%.** Perfect is the enemy of shipped.

---

## Metrics Dashboard (What to Build)

### Simple Terminal Dashboard

```bash
#!/bin/bash
# Simple daily check script

echo "=== Engineering Health Check ==="
echo ""
echo "API Status: $(curl -s https://api.yourapp.com/health | jq -r .status)"
echo "Last Deploy: $(git log -1 --format='%ci')"
echo "Open Bugs: $(wc -l < bugs.txt)"
echo "Pending Tasks: $(wc -l < tasks.txt)"
echo ""
echo "Lighthouse Score: Run 'npx lighthouse https://app.yourapp.com --output=json | jq .categories.performance.score'"
```

### Notion/Sheet Tracker

| Week | Features | Bugs Fixed | Bugs Created | Deploys | Uptime | Notes |
|------|----------|------------|--------------|---------|--------|-------|
| W1 | 5 | 2 | 3 | 7 | 100% | Setup week |
| W2 | 7 | 4 | 2 | 10 | 100% | Core features |
| W3 | 4 | 3 | 1 | 8 | 99.9% | 5 min outage |
| W4 | 3 | 2 | 0 | 5 | 100% | Launch prep |

---

*End of Engineering artifacts*
