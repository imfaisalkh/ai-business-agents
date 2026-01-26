# Engineering Metrics

## North Star Metric

**Ship Velocity:** Features shipped per week

**Target:** 1-2 features/week (Weeks 1-12), 0.5-1 feature/week (Weeks 13-24 polish phase)

---

## Primary Metrics

### 1. Sprint Velocity (Story Points per Week)
**Target:** 20-30 story points/week (solo founder), 40-60 (with 1 engineer)

**Tracking:** Use GitHub Projects or Linear to track story points

---

### 2. Code Quality
- **Test coverage:** >70% (unit tests for API routes, component tests for UI)
- **TypeScript strict mode:** Enabled (no `any` types)
- **Linter errors:** 0 (ESLint + Prettier)

---

### 3. Performance
- **Initial page load:** <2 seconds on 4G
- **API response time:** <500ms for 95th percentile
- **Lighthouse score:** >90 (Performance, Accessibility, Best Practices, SEO)

---

### 4. Deployment Frequency
- **Target:** 3-5 deploys/week (fast iteration)
- **Zero-downtime deploys:** 100% (Vercel handles this automatically)
- **Rollback time:** <5 minutes if critical bug

---

### 5. Bug Density
- **Target:** <5 open bugs at any time
- **P0 (critical):** Fix within 24 hours
- **P1 (high):** Fix within 3 days
- **P2 (medium):** Fix within 1 week

---

## Weekly Engineering Review (Every Friday)

### 1. What shipped this week?
- [Feature 1]
- [Feature 2]
- [Bug fixes: X]

### 2. What's blocked?
- [Blocker 1 + how to unblock]

### 3. Technical debt incurred?
- [Shortcuts taken that need cleanup]

### 4. Performance issues?
- [Slow API routes, large bundle size]

### 5. Next week priorities
- [Top 3 tasks]

---

## Red Flags

- [ ] **No deploys in 7 days** → Lost momentum, re-prioritize
- [ ] **>10 open bugs** → Quality is slipping, stop new features and fix bugs
- [ ] **Page load >3 seconds** → Performance degradation, investigate immediately
- [ ] **Test coverage <50%** → Technical debt accumulating, write tests

---

*Last updated: January 27, 2026*
