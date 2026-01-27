# Product Metrics Dashboard

*Generated for: Performance Evaluation Tool*

---

## North Star Metric

### Primary: Review Cycles Completed per Month

**Definition:** Number of review cycles where all participants have completed their reviews (self-review, peer feedback, manager review)

**Why This Metric:**
1. Indicates real product usage (not just signups)
2. Correlates with customer value delivery
3. Predicts retention (customers who complete cycles stay)
4. Represents the core JTBD (job to be done)

**Targets:**

| Phase | Target | Notes |
|-------|--------|-------|
| Beta | 5 cycles/month | 5 customers, 1 cycle each |
| Launch | 20 cycles/month | Mix of quarterly cycles |
| Growth | 50+ cycles/month | Scaling customers |

---

## Funnel Metrics

### Acquisition Funnel

```
Website Visitors
    │
    ▼ (5% conversion)
Trial Signups
    │
    ▼ (70% activation)
Team Setup Complete
    │
    ▼ (60% engagement)
First Review Cycle Created
    │
    ▼ (50% value delivery)
First Cycle Completed
    │
    ▼ (25% conversion)
Paid Subscription
    │
    ▼ (90% retention)
Month 3 Retained
```

### Funnel Metrics Table

| Stage | Metric | Target | Red Flag |
|-------|--------|--------|----------|
| **Acquisition** | Website → Trial | 5% | <2% |
| **Activation** | Trial → Team Setup | 70% | <50% |
| **Engagement** | Setup → First Cycle | 60% | <40% |
| **Value** | Cycle → Completed | 50% | <30% |
| **Revenue** | Trial → Paid | 25% | <15% |
| **Retention** | M1 → M3 | 90% | <80% |

---

## Activation Metrics

### Definition of Activated User

A trial is "activated" when:
1. Added 3+ team members
2. Created a review cycle
3. At least 1 self-review completed

### Activation Tracking

| Event | Target % of Trials | Day Target |
|-------|-------------------|------------|
| Signup completed | 100% | Day 0 |
| First employee added | 85% | Day 1 |
| 3+ employees added | 70% | Day 3 |
| Template selected | 65% | Day 3 |
| Review cycle created | 60% | Day 5 |
| First self-review completed | 40% | Day 7 |
| **Activated** | 35% | Day 7 |

### Activation Insights

**If activation is low (<35%):**
1. Check onboarding friction (where do users drop?)
2. Add in-app guidance
3. Offer onboarding call
4. Simplify team import

---

## Engagement Metrics

### Core Engagement

| Metric | Definition | Target |
|--------|------------|--------|
| Weekly Active Users (WAU) | Users with activity in past 7 days | 40% of total users |
| Monthly Active Users (MAU) | Users with activity in past 30 days | 80% of total users |
| WAU/MAU Ratio | Engagement stickiness | 50%+ |

### Feature Engagement

| Feature | Metric | Target |
|---------|--------|--------|
| Self-Reviews | Completion rate | 80%+ |
| Peer Feedback | Response rate | 70%+ |
| Gap Analysis | View rate (% of completed reviews) | 90%+ |
| Templates | % using pre-built vs custom | Track (no target) |
| Reminders | Email open rate | 40%+ |
| PDF Export | Export rate per completed review | 30%+ |

### Usage Depth

| Metric | Definition | Target |
|--------|------------|--------|
| Reviews per employee/year | Total reviews / employees | 2-4 |
| Peer reviews per employee | Peers submitted per review cycle | 3+ |
| Average cycle completion time | Days from launch to all complete | <21 days |
| Template customization rate | % who modify templates | 20-40% |

---

## Retention Metrics

### Cohort Retention

| Cohort Week | W1 | W2 | W4 | W8 | W12 |
|-------------|-----|-----|-----|-----|------|
| Target | 85% | 80% | 75% | 70% | 65% |
| Red Flag | <70% | <65% | <55% | <50% | <45% |

### Monthly Retention (Logo)

| Month | M1 | M3 | M6 | M12 |
|-------|-----|-----|-----|------|
| Target | 95% | 88% | 80% | 70% |

### Revenue Retention (NRR)

| Period | Target | Red Flag |
|--------|--------|----------|
| Monthly NRR | 100%+ | <95% |
| Annual NRR | 105%+ | <100% |

### Churn Analysis

| Churn Reason | % of Churns | Action |
|--------------|-------------|--------|
| Never activated | 35% | Improve onboarding |
| Used once, didn't return | 25% | Add reminders, value education |
| Switched to competitor | 15% | Feature parity, win-back campaign |
| Outgrew our features | 10% | Upmarket expansion (V2) |
| Budget cuts | 10% | Annual prepay incentives |
| Other | 5% | Exit interviews |

---

## Product Quality Metrics

### Performance

| Metric | Target | Red Flag |
|--------|--------|----------|
| Page load time | <2 sec | >3 sec |
| API response time (p95) | <500ms | >1 sec |
| Uptime | 99.9% | <99.5% |

### Reliability

| Metric | Target | Red Flag |
|--------|--------|----------|
| Error rate (5xx) | <0.1% | >0.5% |
| Failed email deliveries | <1% | >3% |
| Data sync issues | 0 | Any |

### Support Load

| Metric | Target | Red Flag |
|--------|--------|----------|
| Support tickets/100 MAU | <5 | >10 |
| Time to first response | <4 hours | >24 hours |
| Resolution time | <24 hours | >72 hours |
| CSAT score | >4.5/5 | <4.0/5 |

---

## Feature-Specific Metrics

### Self-Review Performance

| Metric | Target | What It Tells Us |
|--------|--------|------------------|
| Completion rate | 80%+ | Employee engagement |
| Average completion time | <15 min | Form friction |
| Draft save rate | 30%+ | Complex enough to need saves |
| Completion by deadline | 70%+ | Reminder effectiveness |

### Peer Feedback Performance

| Metric | Target | What It Tells Us |
|--------|--------|------------------|
| Response rate | 70%+ | Peer willingness |
| Avg responses per employee | 3+ | 360 coverage |
| Average completion time | <8 min | Form simplicity |
| Feedback quality (avg length) | >50 chars | Meaningful input |

### Gap Analysis Performance

| Metric | Target | What It Tells Us |
|--------|--------|------------------|
| View rate | 90%+ | Feature discovered |
| Time on gap analysis page | >30 sec | Actually reviewing |
| Coaching action taken | 50%+ | Actionable insights |
| Average gap score | Track | Calibration needs |

---

## Business Metrics

### Revenue Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| MRR | Monthly recurring revenue | $5K by M6 |
| ARR | Annual recurring revenue | $60K by M12 |
| ARPA | Average revenue per account | $120/month |
| LTV | Lifetime value | $1,440 (12 months) |
| CAC | Customer acquisition cost | <$150 |
| LTV:CAC | Ratio | >8:1 |

### Growth Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| MoM Growth | Month-over-month MRR growth | 20%+ |
| Customer Growth | New customers/month | 8-10 |
| Net Promoter Score | NPS | 40+ |

### Unit Economics

| Metric | Target |
|--------|--------|
| Payback period | <6 months |
| Gross margin | >80% |
| Monthly burn | <$1,000 |

---

## Dashboard Layout

### Executive Summary (Weekly)

```
┌────────────────────────────────────────────────────────────────────┐
│ WEEKLY DASHBOARD - Week of [Date]                                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  NORTH STAR                          REVENUE                       │
│  ───────────────                     ─────────                     │
│  Review Cycles: 12/20 target         MRR: $2,450                   │
│  ████████████░░░░ 60%                vs Last Week: +$180 (+7.9%)   │
│                                                                    │
│  FUNNEL THIS WEEK                    RETENTION                     │
│  ─────────────────                   ──────────                    │
│  Trials: 15 → Paid: 3 (20%)          M1: 94% | M3: 88%             │
│  Activation rate: 40%                Churn: 1 customer             │
│                                                                    │
│  ENGAGEMENT                          QUALITY                       │
│  ──────────                          ───────                       │
│  WAU: 120 (45% of users)             Uptime: 99.97%                │
│  Self-review completion: 82%         Support tickets: 8            │
│  Peer feedback rate: 71%             Avg response: 2.3 hrs         │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Detailed Metrics (Monthly)

```
┌────────────────────────────────────────────────────────────────────┐
│ MONTHLY METRICS - [Month]                                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ACQUISITION                                                       │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Website visits:      2,400                                   │  │
│  │ Trial signups:       120 (5.0% conv)                         │  │
│  │ Source breakdown:                                            │  │
│  │   LinkedIn: 45% | SEO: 30% | Direct: 15% | Other: 10%        │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ACTIVATION (Trial → Activated)                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Trials:              120                                     │  │
│  │ Team setup:          84 (70%)                                │  │
│  │ Cycle created:       72 (60%)                                │  │
│  │ Self-review done:    48 (40%)                                │  │
│  │ ACTIVATED:           42 (35%)                                │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ENGAGEMENT                                                        │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ MAU:                 180                                     │  │
│  │ WAU/MAU:             52%                                     │  │
│  │ Reviews completed:   145                                     │  │
│  │ Peer feedback rate:  73%                                     │  │
│  │ Gap analysis views:  91%                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  RETENTION & REVENUE                                               │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Trial → Paid:        28%                                     │  │
│  │ Logo retention:      92%                                     │  │
│  │ NRR:                 103%                                    │  │
│  │ MRR:                 $3,200                                  │  │
│  │ ARPA:                $115                                    │  │
│  │ New MRR:             $480                                    │  │
│  │ Churned MRR:         $120                                    │  │
│  │ Expansion MRR:       $85                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Alerts & Thresholds

### Immediate Alerts (Check Same Day)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Uptime | <99% | Investigate outage |
| Error rate | >1% | Deploy fix |
| Support spike | >20 tickets/day | Identify root cause |
| Payment failures | >5% | Check billing provider |

### Weekly Alerts

| Metric | Threshold | Action |
|--------|-----------|--------|
| Trial-to-paid | <15% | Review onboarding |
| Self-review completion | <70% | Improve reminders |
| Churn | >10% of customers | Exit interviews |
| NPS | <30 | Customer outreach |

### Monthly Reviews

| Metric | Threshold | Action |
|--------|-----------|--------|
| MRR growth | <10% | Marketing push |
| Feature adoption | <50% any feature | In-app education |
| Support load | >10 tickets/100 MAU | UX improvement |

---

## Tracking Implementation

### Required Analytics Events

```javascript
// Core funnel events
track('signup_started');
track('signup_completed', { source, company_size });
track('team_setup_completed', { employee_count });
track('template_selected', { template_name });
track('review_cycle_created', { cycle_type, participant_count });
track('self_review_completed', { time_to_complete });
track('peer_feedback_completed', { time_to_complete });
track('manager_review_completed', { time_to_complete });
track('gap_analysis_viewed', { gap_score });
track('review_shared', { export_type });
track('subscription_started', { plan, billing_cycle });
track('subscription_cancelled', { reason });

// Engagement events
track('dashboard_viewed');
track('reminder_sent', { type, manual_or_auto });
track('reminder_clicked');
track('pdf_exported');
track('template_customized');
```

### Recommended Tools

| Function | Tool | Cost |
|----------|------|------|
| Product analytics | Mixpanel or Amplitude | Free tier |
| Website analytics | Plausible | $9/month |
| Error tracking | Sentry | Free tier |
| Uptime monitoring | BetterUptime | Free tier |
| Customer feedback | Canny or Notion | Free |

---

*Next artifact: 06-interview-template.md*
