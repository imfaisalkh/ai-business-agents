# Product Metrics Dashboard

*Generated on January 28, 2026*

---

## North Star Metric

**Weekly Active Users (WAU)**

Definition: Unique users who performed at least one meaningful action in the past 7 days.

Meaningful actions:
- Created or edited a job
- Marked a job complete (workers)
- Sent an invoice
- Sent a message

**Why WAU?**
- Reflects actual product usage, not just signups
- Captures both owners and workers
- Weekly cadence matches small business work rhythm

**Targets:**
| Phase | WAU Target | Notes |
|-------|------------|-------|
| Launch (Week 1-4) | 50 | 10 businesses × 5 users avg |
| Traction (Month 2-3) | 200 | 40 businesses × 5 users avg |
| Growth (Month 4-6) | 500 | 100 businesses × 5 users avg |

---

## Activation Metrics

### Activation Definition
A user is "activated" when they complete the core value loop:
**Create job → Worker completes job → Send invoice**

### Activation Funnel

```
Signup
   │
   ▼  (Target: 70%)
Onboarding Complete
   │
   ▼  (Target: 60%)
First Job Created
   │
   ▼  (Target: 50%)
First Worker Invited
   │
   ▼  (Target: 40%)
First Job Completed
   │
   ▼  (Target: 35%)
First Invoice Sent
   │
   ▼  (Target: 30%)
Trial → Paid
```

### Activation Events to Track

| Event | Trigger | Target % of signups |
|-------|---------|---------------------|
| `signup_completed` | Account created | 100% |
| `onboarding_started` | Clicked "Set up business" | 90% |
| `business_created` | Business profile saved | 80% |
| `first_customer_added` | Customer created | 70% |
| `onboarding_completed` | All setup steps done | 70% |
| `first_job_created` | Job created | 60% |
| `first_worker_invited` | Worker invite sent | 40% |
| `worker_accepted_invite` | Worker created account | 35% |
| `first_job_started` | Job status → In Progress | 45% |
| `first_job_completed` | Job status → Complete | 40% |
| `first_invoice_created` | Invoice generated | 38% |
| `first_invoice_sent` | Invoice sent via email/SMS | 35% |
| `first_payment_received` | Stripe payment success | 20% |
| `trial_converted` | Subscription started | 30% |

### Time to Value Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Signup → First job | < 30 min | Time between events |
| Signup → First invoice | < 24 hours | Time between events |
| Signup → First payment | < 7 days | Time between events |
| Trial start → Activation | < 3 days | Time to complete value loop |

---

## Engagement Metrics

### Daily/Weekly Activity

| Metric | Definition | Target |
|--------|------------|--------|
| DAU | Daily Active Users | 30% of WAU |
| WAU | Weekly Active Users | North star |
| DAU/WAU | Stickiness | > 30% |
| Sessions/user/week | Avg sessions per active user | > 5 |

### Feature Usage

| Feature | Key Action | Target (of active users) |
|---------|------------|--------------------------|
| Scheduling | Jobs created/week | 10+ jobs/business/week |
| Mobile app | Worker app sessions/day | 3+ sessions/worker/day |
| Invoicing | Invoices sent/week | 5+ invoices/business/week |
| Messaging | Messages sent/week | 10+ messages/business/week |
| Calendar | Calendar views/week | 20+ views/owner/week |

### Power User Definition

A "power user" uses 3+ features regularly:
- Scheduling (5+ jobs/week)
- Invoicing (3+ invoices/week)
- Messaging (5+ messages/week)
- Mobile app (worker completes 5+ jobs/week)

**Target:** 30% of active businesses are power users

---

## Retention Metrics

### Cohort Retention

| Timeframe | Target Retention | Healthy SaaS Benchmark |
|-----------|-----------------|------------------------|
| Day 1 | 60% | 50-70% |
| Day 7 | 40% | 30-50% |
| Day 14 | 35% | 25-40% |
| Day 30 | 30% | 20-35% |
| Month 2 | 80% of paid | 75-85% |
| Month 3 | 75% of paid | 70-80% |
| Month 6 | 90% of paid | 85-95% |

### Retention Curve Shape

```
Retention
100% │
     │\
 60% │ \
     │  \____
 40% │       \_____
     │             \______
 30% │                    \_____________
     │
     └────────────────────────────────────
        D1   D7   D14  D30    M2    M3
```

**Goal:** Flatten the curve after Day 14 (users who survive 2 weeks tend to stick)

### Churn Analysis

| Segment | Expected Churn | Action if Higher |
|---------|----------------|------------------|
| Trial (never activated) | 70% | Improve onboarding |
| Trial (activated) | 50% | Improve value delivery |
| Paid Month 1 | 10% | Investigate: support issues? |
| Paid Month 2+ | 5% | Check: competitor? outgrew us? |

---

## Revenue Metrics

### Subscription Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| MRR | Monthly Recurring Revenue | $3K (Month 3) |
| ARR | Annual Recurring Revenue | $36K (Year 1) |
| ARPU | Avg Revenue Per User (business) | $79 |
| Expansion MRR | Upgrades + add-ons | $0 (flat pricing) |

### Trial Conversion

| Metric | Target | Calculation |
|--------|--------|-------------|
| Trial-to-paid rate | 30% | Paid conversions / Trial signups |
| Trial-to-paid (activated) | 60% | Paid / Activated trials |
| Avg trial length | 10 days | Median days to convert |

### Payment Metrics (Stripe Processing)

| Metric | Target | Notes |
|--------|--------|-------|
| Payment volume/customer/month | $2,000 | Avg invoices processed |
| Payment processing revenue | $0.50/customer/month | 2.9% + $0.30 (0.5% margin) |
| Payment adoption | 50% of invoices | % paid online vs cash/check |

---

## Product Health Metrics

### Performance

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Page load time (P50) | < 1.5s | > 3s |
| Page load time (P95) | < 3s | > 5s |
| API response time (P50) | < 200ms | > 500ms |
| API response time (P95) | < 500ms | > 1s |
| Mobile app load time | < 2s | > 4s |

### Reliability

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Uptime | 99.5% | < 99% |
| Error rate | < 0.1% | > 1% |
| Failed jobs (background) | < 0.5% | > 2% |
| Payment failures | < 2% | > 5% |

### Quality

| Metric | Target | Source |
|--------|--------|--------|
| NPS | > 40 | In-app survey (Day 30) |
| CSAT | > 4.0/5.0 | Post-support ticket survey |
| Bug reports/week | < 5 | Support tickets |
| Feature requests/week | 10+ | Shows engagement |

---

## Metrics Dashboard (What to Build)

### Phase 1: Launch (Manual tracking acceptable)

**Track in spreadsheet:**
- Signups (daily)
- Activations (weekly)
- Conversions (weekly)
- Active users (weekly)

**Track in Stripe:**
- MRR
- Churn
- Payment volume

### Phase 2: Basic Dashboard (Week 4+)

**Build simple internal dashboard:**
```
┌─────────────────────────────────────────────────────────────┐
│  Product Dashboard                            Jan 28, 2026  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    MRR      │  │    WAU      │  │  Trial CVR  │         │
│  │   $2,370    │  │    156      │  │    28%      │         │
│  │   +12% ↑    │  │   +8% ↑     │  │   +3% ↑     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  Activation Funnel (This Week)                              │
│  ──────────────────────────────────────────────────────     │
│  Signups:        32  ████████████████████████████████ 100%  │
│  Onboarding:     24  ████████████████████████         75%   │
│  First Job:      19  ███████████████████              59%   │
│  First Invoice:  11  ███████████████                  34%   │
│  Converted:       8  █████████                        25%   │
│                                                             │
│  Feature Usage (Active Businesses)                          │
│  ──────────────────────────────────────────────────────     │
│  Scheduling:     28/30  ██████████████████████████████ 93%  │
│  Invoicing:      25/30  █████████████████████████      83%  │
│  Mobile App:     22/30  ████████████████████████       73%  │
│  Messaging:      18/30  ████████████████████           60%  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3: Advanced Analytics (Month 3+)

**Integrate proper analytics:**
- Mixpanel or Amplitude for product analytics
- Metabase or Preset for SQL dashboards
- Customer.io for lifecycle tracking

---

## Instrumentation Plan

### Events to Track (Minimum)

```javascript
// User events
track('signup_completed', { source, referrer });
track('login', { method });
track('onboarding_step_completed', { step });

// Business events
track('business_created', { industry });
track('customer_added', { source: 'manual' | 'import' });
track('worker_invited', { role });

// Job events
track('job_created', { recurring, has_worker });
track('job_started', { user_type: 'owner' | 'worker' });
track('job_completed', { duration_minutes, has_photos });

// Invoice events
track('invoice_created', { amount, from_job: boolean });
track('invoice_sent', { method: 'email' | 'sms' });
track('payment_received', { amount, method });

// Messaging events
track('message_sent', { type: 'manual' | 'auto_reminder' });
track('message_received', {});

// Subscription events
track('trial_started', {});
track('subscription_started', { plan, annual: boolean });
track('subscription_cancelled', { reason });
```

### User Properties to Track

```javascript
identify(userId, {
  // Demographics
  business_type: 'cleaning' | 'pool' | 'pest' | ...,
  team_size: number,

  // Lifecycle
  signup_date: date,
  trial_end_date: date,
  subscription_status: 'trial' | 'active' | 'cancelled',

  // Engagement
  jobs_created_total: number,
  invoices_sent_total: number,
  workers_count: number,
  last_active_date: date,

  // Value
  mrr: number,
  lifetime_value: number
});
```

---

## Weekly Metrics Review Checklist

Every Monday, review:

- [ ] New signups this week
- [ ] Trial conversions this week
- [ ] MRR change
- [ ] WAU vs last week
- [ ] Activation funnel drop-offs
- [ ] Feature usage changes
- [ ] Support ticket themes
- [ ] Any churned customers (why?)

---

## Alerts to Set Up

| Alert | Threshold | Action |
|-------|-----------|--------|
| Signup spike | > 2x average | Check traffic source, prepare for support load |
| Signup drop | < 50% average | Check landing page, ad campaigns |
| Error rate spike | > 1% | Deploy fix immediately |
| Payment failures | > 5% | Check Stripe status, webhook issues |
| Churn spike | > 10% month | Customer interviews, urgent |
| NPS drop | < 30 | Customer interviews, feature review |

---

*Next artifact: 05-interview-template.md*
