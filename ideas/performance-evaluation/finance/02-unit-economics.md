# Unit Economics Dashboard

> **Purpose:** Track customer-level profitability for TeamPulse. Ensures sustainable growth.
>
> **Fits in:** Uses data from Revenue Model (01). Informs decisions on CAC spending and pricing.

## Unit Economics Summary

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| LTV | - | $3,600 | Tracking |
| CAC | - | <$200 | Tracking |
| LTV:CAC Ratio | - | >15:1 | Tracking |
| Payback Period | - | <2 months | Tracking |
| Gross Margin | - | >85% | Tracking |

---

## Customer Lifetime Value (LTV)

### LTV Calculation

**Formula:**
```
LTV = ARPA × Gross Margin × (1 / Churn Rate)
```

**Or simplified:**
```
LTV = ARPA × Avg Customer Lifetime × Gross Margin
```

### LTV Scenarios

| Scenario | ARPA | Lifetime | Gross Margin | LTV |
|----------|------|----------|--------------|-----|
| Conservative | $100/mo | 24 months | 85% | $2,040 |
| Target | $120/mo | 30 months | 85% | $3,060 |
| Optimistic | $150/mo | 36 months | 85% | $4,590 |

**Current assumption:** $3,000-3,600 LTV

### LTV Components

| Component | Value | Notes |
|-----------|-------|-------|
| Average MRR | $100-120 | 15-20 employee teams |
| Gross margin | 85% | SaaS typical, low COGS |
| Avg customer lifetime | 30 months | 2.5 years, SMB typical |
| Monthly churn | 3-4% | Target range |

---

## Customer Acquisition Cost (CAC)

### CAC Calculation

**Formula:**
```
CAC = Total Sales & Marketing Spend / New Customers Acquired
```

### CAC Breakdown (Monthly)

| Category | Cost | Notes |
|----------|------|-------|
| **Tools** | | |
| LinkedIn Sales Navigator | $80 | Prospecting |
| Calendly | $12 | Scheduling |
| Landing page | $10 | Carrd/Framer |
| Email (Resend) | $0-20 | Nurture sequences |
| **Time Investment** | | |
| Outreach (6 hrs/week) | $600 | At $25/hr equivalent |
| Sales calls (4 hrs/week) | $400 | At $25/hr equivalent |
| Content (2 hrs/week) | $200 | At $25/hr equivalent |
| **Total Monthly** | **$1,300-1,500** | |

### CAC by Acquisition Method

| Method | Monthly Spend | Customers | CAC |
|--------|---------------|-----------|-----|
| LinkedIn outreach | $1,000 | 3-4 | $250-330 |
| Content/SEO | $200 | 1-2 | $100-200 |
| Referrals | $0 | 1-2 | $0 |
| **Blended** | **$1,200** | **5-8** | **$150-240** |

**Target CAC:** <$200 blended

---

## LTV:CAC Ratio

### Current Analysis

| Scenario | LTV | CAC | Ratio | Status |
|----------|-----|-----|-------|--------|
| Conservative | $2,040 | $250 | 8:1 | Good |
| Target | $3,060 | $200 | 15:1 | Excellent |
| Optimistic | $4,590 | $150 | 31:1 | Outstanding |

### Benchmarks

| Ratio | Interpretation | Action |
|-------|----------------|--------|
| <1:1 | Losing money | Stop spending |
| 1-3:1 | Unsustainable | Reduce CAC or increase LTV |
| 3-5:1 | Healthy | Maintain |
| 5-10:1 | Great | Consider spending more |
| >10:1 | Excellent | Invest aggressively |

**TeamPulse target:** 10-20:1 (common for founder-led sales with low CAC)

---

## Payback Period

### Calculation

**Formula:**
```
Payback Period = CAC / (ARPA × Gross Margin)
```

### Payback Scenarios

| Scenario | CAC | ARPA | Gross Margin | Payback |
|----------|-----|------|--------------|---------|
| Conservative | $250 | $100 | 85% | 2.9 months |
| Target | $200 | $120 | 85% | 2.0 months |
| Optimistic | $150 | $150 | 85% | 1.2 months |

**Target:** <3 months payback

### Why Payback Matters

- **<3 months:** Can fund growth from cash flow
- **3-12 months:** Need some capital but manageable
- **>12 months:** Need significant funding

---

## Gross Margin

### Cost Structure (Per Customer/Month)

| Cost | Amount | % of Revenue |
|------|--------|--------------|
| **Revenue (ARPA)** | $120 | 100% |
| **COGS** | | |
| Infrastructure (Vercel, DB) | $2-3 | 2% |
| Email sending | $0.50 | <1% |
| Payment processing (Stripe) | $3.50 | 3% |
| Support (prorated) | $5-10 | 5-8% |
| **Total COGS** | $12-17 | 10-14% |
| **Gross Profit** | $103-108 | **86-90%** |

**Target Gross Margin:** 85%+ (SaaS benchmark: 70-85%)

---

## Customer Profitability Analysis

### Profitability by Team Size

| Team Size | MRR | COGS | Gross Profit | Margin |
|-----------|-----|------|--------------|--------|
| 10 employees | $60 | $8 | $52 | 87% |
| 15 employees | $90 | $10 | $80 | 89% |
| 20 employees | $120 | $12 | $108 | 90% |
| 30 employees | $180 | $15 | $165 | 92% |
| 50 employees | $300 | $20 | $280 | 93% |

**Insight:** Larger teams have better unit economics (fixed costs spread)

### Profitability by Billing Type

| Billing | Avg MRR | CAC | LTV | LTV:CAC |
|---------|---------|-----|-----|---------|
| Annual | $90 | $180 | $2,300 | 13:1 |
| Monthly | $100 | $220 | $2,000 | 9:1 |

**Insight:** Push annual billing - lower CAC, better retention

---

## Contribution Margin

### Definition
Revenue remaining after variable costs (COGS + variable sales costs)

### Calculation

| Item | Amount | Notes |
|------|--------|-------|
| Revenue (ARPA) | $120 | |
| Less: COGS | ($15) | |
| Less: Variable sales cost | ($20) | Pro-rated CAC |
| **Contribution Margin** | **$85** | **71%** |

### Break-Even Analysis

| Fixed Costs/Month | Contribution Margin | Customers to Break-Even |
|-------------------|---------------------|-------------------------|
| $500 | $85 | 6 customers |
| $1,000 | $85 | 12 customers |
| $2,000 | $85 | 24 customers |
| $3,000 | $85 | 36 customers |

---

## Cohort Analysis Framework

### Monthly Cohort Retention

| Cohort | M0 | M1 | M2 | M3 | M6 | M12 |
|--------|----|----|----|----|----|----|
| Jan 26 | 100% | | | | | |
| Feb 26 | 100% | | | | | |
| Mar 26 | 100% | | | | | |
| Apr 26 | 100% | | | | | |
| May 26 | 100% | | | | | |
| Jun 26 | 100% | | | | | |

### Target Retention Curve

| Month | Retention Target |
|-------|------------------|
| M1 | 95% |
| M3 | 85% |
| M6 | 75% |
| M12 | 60% |

### Revenue Retention (Dollar Retention)

| Cohort | M0 Revenue | M3 Revenue | M6 Revenue | M12 Revenue |
|--------|------------|------------|------------|-------------|
| Jan 26 | $X | | | |
| Feb 26 | $X | | | |

**Target:** Net Revenue Retention >100% (expansion > churn)

---

## Unit Economics Improvement Levers

### To Improve LTV

| Lever | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Reduce churn | High | Medium | P0 |
| Upsell larger teams | Medium | Low | P1 |
| Price increase | Medium | Low | P2 |
| Add features worth paying for | Medium | High | P2 |

### To Reduce CAC

| Lever | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Improve conversion rates | High | Medium | P0 |
| Referral program | Medium | Low | P1 |
| Content/SEO | Medium | High | P2 |
| Product-led growth | High | High | P2 |

### To Improve Gross Margin

| Lever | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Optimize infrastructure | Low | Medium | P3 |
| Self-service support | Medium | Medium | P2 |
| Reduce Stripe fees (volume) | Low | Low | P3 |

---

## Unit Economics Targets by Stage

### Month 1-3 (Validation)

| Metric | Target | Acceptable |
|--------|--------|------------|
| LTV | $2,000+ | $1,500+ |
| CAC | <$300 | <$500 |
| LTV:CAC | 5:1+ | 3:1+ |
| Payback | <4 months | <6 months |

### Month 4-6 (Growth)

| Metric | Target | Acceptable |
|--------|--------|------------|
| LTV | $3,000+ | $2,500+ |
| CAC | <$200 | <$250 |
| LTV:CAC | 12:1+ | 8:1+ |
| Payback | <2 months | <3 months |

### Month 7-12 (Scale)

| Metric | Target | Acceptable |
|--------|--------|------------|
| LTV | $3,500+ | $3,000+ |
| CAC | <$150 | <$200 |
| LTV:CAC | 20:1+ | 15:1+ |
| Payback | <1.5 months | <2 months |

---

## Weekly Unit Economics Review

### Quick Metrics Check

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| New customers | | | |
| Churned customers | | | |
| Total CAC spend | | | |
| Blended CAC | | | |
| Avg deal size | | | |

### Monthly Deep Dive

- [ ] Calculate blended CAC
- [ ] Update cohort retention
- [ ] Review channel CAC efficiency
- [ ] Assess pricing impact
- [ ] Update LTV estimates
