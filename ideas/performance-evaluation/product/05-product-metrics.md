# Product Metrics Dashboard

## North Star Metric

**Weekly Active Teams (WATs):** Teams who complete at least 1 review action per week

**Why this metric:**
- Measures actual usage (not just logins)
- Predicts retention (active teams renew)
- Grows with product adoption

**Target:**
- Month 1-3 (Beta): 5-10 WATs
- Month 4-6 (Launch): 20-30 WATs
- Month 7-12 (Growth): 50-70 WATs

---

## Primary Metrics (Track Weekly)

### 1. Review Completion Rate
**Definition:** % of launched reviews that reach "shared with employee" status

**Target:** >80%

**Calculation:** (Reviews shared / Reviews launched) × 100

**Why it matters:** Core product loop. If <70%, onboarding or UX is broken.

---

### 2. Employee Self-Review Completion Rate
**Definition:** % of employees who submit self-reviews after request sent

**Target:** >80%

**Calculation:** (Self-reviews submitted / Self-review requests sent) × 100

**Why it matters:** Employee engagement. If <70%, notifications are broken or employees don't see value.

---

### 3. Peer Feedback Participation Rate
**Definition:** % of peer feedback requests that get responses

**Target:** >70%

**Calculation:** (Peer feedback submitted / Peer requests sent) × 100

**Why it matters:** Differentiation feature. If <50%, peer feedback is too burdensome or poorly designed.

---

### 4. Trial-to-Paid Conversion Rate
**Definition:** % of trial signups who become paying customers

**Target:** >25%

**Calculation:** (Paid customers / Trial signups) × 100

**Why it matters:** Validates willingness to pay. If <15%, pricing or value prop is wrong.

---

### 5. Net Revenue Retention (NRR)
**Definition:** Revenue from existing customers (including expansions, minus churn)

**Target:** >100%

**Calculation:** ((Starting MRR + Expansion MRR - Churned MRR) / Starting MRR) × 100

**Why it matters:** Measures product stickiness and growth. >100% means product pays for itself via expansions.

---

## Secondary Metrics (Monitor, Don't Obsess)

### Onboarding Funnel (First 7 Days)
- `signup_started` → `account_created`: >80%
- `account_created` → `team_imported`: >70%
- `team_imported` → `first_review_launched`: >60%
- **Overall onboarding completion:** >40%

### Engagement Metrics
- **Avg time in gap analysis view:** 3-5 minutes (shows managers are using it)
- **Peer feedback avg response time:** <3 days (shows urgency)
- **Goals set per review:** 3-5 goals (shows thoroughness)

### Retention Metrics
- **Day 7 retention:** >60% (users return within first week)
- **Day 30 retention:** >40% (users return before trial ends)
- **Second cycle start rate:** >80% (strongest retention signal)

---

## Product-Market Fit Scorecard

*Answer these questions monthly to gauge PMF health:*

| Metric | Strong PMF (GO) | Weak PMF (Iterate) | No PMF (Pivot) |
|--------|-----------------|---------------------|----------------|
| **Review completion rate** | >85% | 70-85% | <70% |
| **Employee self-review completion** | >85% | 70-85% | <70% |
| **Peer feedback participation** | >75% | 60-75% | <60% |
| **Trial-to-paid conversion** | >30% | 20-30% | <20% |
| **NPS (customer satisfaction)** | >40 | 20-40 | <20 |
| **Churn rate (monthly)** | <3% | 3-7% | >7% |
| **"Would you be disappointed if this product disappeared?"** | >40% say "very" | 20-40% | <20% |

**Decision framework:**
- **5+ Strong PMF signals:** Scale growth (increase marketing spend, hire)
- **3-4 Strong PMF signals:** Optimize product (improve weak areas)
- **<3 Strong PMF signals:** Pivot or kill (product isn't working)

---

## Feature Usage Tracking

*Which features drive retention?*

| Feature | Usage Target | Retention Impact |
|---------|--------------|------------------|
| **Gap analysis view** | >80% of managers use | High (core differentiator) |
| **Peer feedback** | >60% of reviews include peer feedback | High (validates 360-degree value) |
| **Goal setting** | >70% of reviews include goals | Medium (continuity for next cycle) |
| **Historical reviews** | >30% of managers access past reviews | Medium (signals long-term value) |
| **Team analytics** | >40% of managers view analytics | Low (nice-to-have, not core) |
| **Custom templates** | >20% of Growth plan customers create custom | Medium (power user signal) |

**Product roadmap prioritization:**
- **High retention impact** → Double down, improve UX
- **Low retention impact** → Deprioritize or remove

---

## Weekly Metrics Dashboard (Track in Notion/Airtable)

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Target |
|--------|--------|--------|--------|--------|--------|
| **Weekly Active Teams** | 3 | 5 | 7 | 10 | 10+ |
| **Review Completion Rate** | 75% | 80% | 85% | 85% | >80% |
| **Self-Review Completion** | 70% | 75% | 80% | 85% | >80% |
| **Peer Participation** | 60% | 65% | 70% | 75% | >70% |
| **Trial-to-Paid Conversion** | 20% | 22% | 25% | 28% | >25% |
| **NRR** | N/A | N/A | 95% | 100% | >100% |

---

## Red Flags (When to Investigate)

- [ ] **Review completion rate <70%** → UX issue or managers don't see value
- [ ] **Self-review completion <70%** → Employee experience is broken (too long, unclear)
- [ ] **Peer participation <50%** → Peer feedback is too burdensome or feels risky (anonymity concerns)
- [ ] **Trial-to-paid <15%** → Pricing is wrong or product doesn't deliver promised value
- [ ] **Churn >7%/month** → Product isn't sticky, customers aren't seeing ROI
- [ ] **Gap analysis usage <60%** → Core differentiator isn't resonating (positioning problem)

---

## Customer Feedback Collection

*How to gather qualitative insights:*

### In-App Surveys (Trigger at Key Moments)
- **After first review completed:** "How was your experience? (1-5 stars + open text)"
- **After trial ends:** "What would make you upgrade?" (if they don't convert)
- **After second cycle starts:** "What keeps you using TeamPulse?" (retention insight)

### Monthly Customer Interviews (5-10 per month)
- **Power users (high engagement):** "What would make this a 10/10 product?"
- **Churned customers:** "Why did you stop using us?"
- **Free trial non-converters:** "What stopped you from paying?"

### NPS Survey (Quarterly)
- **Question:** "How likely are you to recommend TeamPulse to another manager? (0-10)"
- **Follow-up:** "What's the main reason for your score?"
- **Target:** NPS >40 (Strong PMF), NPS 20-40 (Iterate), NPS <20 (Pivot)

---

## Product Analytics Stack

### Must-Have (Free/Cheap)
- **PostHog (self-hosted or cloud):** Event tracking, funnels, cohort analysis ($0-50/month for <10K events)
- **Google Analytics:** Traffic sources, page views (free)
- **Mailgun/SendGrid:** Email delivery rates, open rates (free tier: 1,000 emails/month)

### Nice-to-Have (Post-Launch)
- **Hotjar or FullStory:** Session recordings, heatmaps ($50-100/month)
- **Chameleon or Appcues:** In-app tours and tooltips ($100-200/month)

---

*Last updated: January 27, 2026*
