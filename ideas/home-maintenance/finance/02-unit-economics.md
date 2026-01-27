# Unit Economics Dashboard

*Generated on January 28, 2026*

---

## Key Unit Economics

### Summary Card

```
┌─────────────────────────────────────────────────────────────────┐
│  UNIT ECONOMICS SUMMARY                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LTV (Customer Lifetime Value)          $1,513                 │
│  CAC (Customer Acquisition Cost)        $50-100                │
│  LTV:CAC Ratio                          15-30x                 │
│  Payback Period                         1-2 months             │
│  Gross Margin                           85%                     │
│  Monthly Churn                          5% (target)            │
│                                                                 │
│  Status: HEALTHY                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Customer Lifetime Value (LTV)

### LTV Calculation

```
LTV = ARPU × Gross Margin × Customer Lifetime (months)

Where:
- ARPU = Average Revenue Per User = $89/month ($79 sub + $10 processing)
- Gross Margin = 85% (after Stripe, Twilio, hosting)
- Customer Lifetime = 1 / Churn Rate = 1 / 0.05 = 20 months

LTV = $89 × 0.85 × 20 = $1,513
```

### LTV by Churn Rate

| Monthly Churn | Lifetime (months) | LTV |
|---------------|-------------------|-----|
| 3% | 33 | $2,497 |
| 5% | 20 | $1,513 |
| 7% | 14 | $1,059 |
| 10% | 10 | $757 |

**Insight:** Every 1% reduction in churn adds ~$300 to LTV.

### LTV by Plan Type

| Plan | ARPU | Gross Margin | Lifetime | LTV |
|------|------|--------------|----------|-----|
| Monthly | $89 | 85% | 18 mo | $1,361 |
| Annual | $89 | 85% | 24 mo | $1,815 |

**Insight:** Annual customers have ~33% higher LTV due to longer retention.

---

## Customer Acquisition Cost (CAC)

### CAC Breakdown by Channel

| Channel | Time/Customer | Effective Cost | CAC |
|---------|---------------|----------------|-----|
| **Outbound (cold)** | 4 hours | $50/hr | $200 |
| **Community (warm)** | 2 hours | $50/hr | $100 |
| **Referral** | 0.5 hours + $79 credit | $50/hr + $79 | $104 |
| **Organic/Inbound** | 0.5 hours | $50/hr | $25 |

**Blended CAC (estimated mix):**
- 40% Outbound ($200) = $80
- 20% Community ($100) = $20
- 20% Referral ($104) = $21
- 20% Organic ($25) = $5

**Blended CAC = $126** (early stage)

### Target CAC by Phase

| Phase | Channel Mix | Target CAC |
|-------|-------------|------------|
| Validation (M1-2) | 70% outbound, 30% community | $150 |
| Traction (M3-4) | 40% outbound, 30% referral, 30% community | $100 |
| Growth (M5-6) | 30% outbound, 40% referral, 30% organic | $75 |
| Scale (M7+) | 20% outbound, 40% referral, 40% organic | $50 |

---

## LTV:CAC Ratio

### Current State

```
LTV:CAC = $1,513 / $126 = 12:1
```

**Interpretation:**
- > 3:1 = Healthy (can invest more in growth)
- > 5:1 = Very healthy (consider scaling faster)
- > 10:1 = Excellent (potentially underinvesting in growth)

### LTV:CAC by Scenario

| Scenario | LTV | CAC | Ratio | Health |
|----------|-----|-----|-------|--------|
| Conservative | $1,059 | $150 | 7:1 | Healthy |
| Target | $1,513 | $100 | 15:1 | Excellent |
| Optimistic | $1,815 | $75 | 24:1 | Very High |

**Insight:** Even in worst case, unit economics are healthy.

---

## Payback Period

### Calculation

```
Payback Period = CAC / (Monthly Revenue × Gross Margin)
               = $100 / ($89 × 0.85)
               = $100 / $75.65
               = 1.3 months
```

### Payback by Scenario

| Scenario | CAC | Monthly Contribution | Payback |
|----------|-----|---------------------|---------|
| High CAC | $200 | $75.65 | 2.6 months |
| Target | $100 | $75.65 | 1.3 months |
| Low CAC | $50 | $75.65 | 0.7 months |

**Insight:** Even with high CAC, payback is under 3 months. SaaS benchmark is 12-18 months.

---

## Gross Margin Analysis

### Revenue Breakdown

| Component | Monthly | % of Revenue |
|-----------|---------|--------------|
| Subscription | $79.00 | 89% |
| Payment Processing | $10.00 | 11% |
| **Total Revenue** | **$89.00** | 100% |

### Cost of Goods Sold (COGS)

| Component | Monthly | % of Revenue |
|-----------|---------|--------------|
| Stripe fees (subscription) | $2.59 | 2.9% |
| Stripe fees (processing) | $3.10 | 3.5% |
| Twilio (SMS) | $3.00 | 3.4% |
| Hosting (per customer) | $2.00 | 2.2% |
| Email (Resend) | $0.50 | 0.6% |
| **Total COGS** | **$11.19** | 12.6% |

### Gross Margin

```
Gross Margin = (Revenue - COGS) / Revenue
             = ($89.00 - $11.19) / $89.00
             = 87.4%
```

**SaaS Benchmark:** 70-85% gross margin. We're above benchmark.

---

## Contribution Margin

### Per Customer

| Metric | Amount |
|--------|--------|
| Revenue | $89.00 |
| COGS | $11.19 |
| Gross Profit | $77.81 |
| Variable Sales Cost | $5.00 (support time) |
| **Contribution Margin** | **$72.81** |

### Contribution Margin Ratio

```
Contribution Margin % = $72.81 / $89.00 = 81.8%
```

---

## Unit Economics by Customer Segment

### By Industry

| Segment | ARPU | Churn | LTV | Notes |
|---------|------|-------|-----|-------|
| House Cleaning | $89 | 4% | $1,891 | Highest retention |
| Pool Service | $89 | 5% | $1,513 | Seasonal variation |
| Pest Control | $89 | 6% | $1,260 | Good retention |
| Landscaping | $89 | 7% | $1,081 | Most seasonal |
| Handyman | $89 | 8% | $946 | Most variable |

### By Team Size

| Team Size | ARPU | Churn | LTV | Notes |
|-----------|------|-------|-----|-------|
| 1-2 | $89 | 8% | $946 | May not need software |
| 3-5 | $89 | 4% | $1,891 | Sweet spot |
| 6-10 | $89 | 5% | $1,513 | Strong fit |
| 11-15 | $89 | 6% | $1,260 | May outgrow |

---

## Break-Even Analysis

### Monthly Break-Even

| Cost Type | Monthly Amount |
|-----------|----------------|
| Hosting (base) | $50 |
| Tools (Sentry, etc.) | $50 |
| Twilio (base) | $30 |
| Email (base) | $20 |
| Marketing tools | $50 |
| **Total Fixed Costs** | **$200** |

```
Break-Even Customers = Fixed Costs / Contribution Margin
                     = $200 / $72.81
                     = 3 customers
```

### Including Founder Time

If founder time is valued at $5,000/month:

```
Break-Even = ($200 + $5,000) / $72.81 = 71 customers
```

**At 71 customers ($5,609 MRR), the business covers all costs including founder salary.**

---

## Sensitivity Analysis

### What Moves the Needle?

| Variable | Change | LTV Impact | Business Impact |
|----------|--------|------------|-----------------|
| Churn -1% | 5% → 4% | +$378 (+25%) | Most impactful |
| ARPU +$10 | $89 → $99 | +$170 (+11%) | Significant |
| Gross Margin +5% | 85% → 90% | +$89 (+6%) | Moderate |
| CAC -$25 | $100 → $75 | N/A (ratio improves) | Good for scale |

### Worst Case Scenario

| Metric | Worst Case | Normal | Best Case |
|--------|------------|--------|-----------|
| ARPU | $79 | $89 | $99 |
| Churn | 10% | 5% | 3% |
| Gross Margin | 75% | 85% | 90% |
| LTV | $593 | $1,513 | $2,673 |
| CAC | $200 | $100 | $50 |
| LTV:CAC | 3:1 | 15:1 | 53:1 |

**Even worst case is viable (3:1 LTV:CAC).**

---

## Key Metrics Dashboard

### Weekly Tracking

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Target |
|--------|--------|--------|--------|--------|--------|
| New MRR | | | | | $2,000 |
| Churned MRR | | | | | < $500 |
| ARPU | | | | | $89 |
| Gross Margin | | | | | > 85% |
| CAC | | | | | < $100 |
| LTV:CAC | | | | | > 10:1 |

### Monthly Review

```
┌─────────────────────────────────────────────────────────────────┐
│  UNIT ECONOMICS - MONTH [X]                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Revenue                                                        │
│  ├── Subscription MRR:    $X,XXX                               │
│  ├── Processing Revenue:  $XXX                                  │
│  └── Total Revenue:       $X,XXX                               │
│                                                                 │
│  Costs                                                          │
│  ├── COGS:               $XXX                                   │
│  ├── Fixed Costs:        $XXX                                   │
│  └── CAC (blended):      $XXX                                   │
│                                                                 │
│  Key Ratios                                                     │
│  ├── Gross Margin:       XX%                                    │
│  ├── LTV:                $X,XXX                                 │
│  ├── LTV:CAC:            XX:1                                   │
│  └── Payback Period:     X.X months                             │
│                                                                 │
│  Trend: [↑ Improving / → Stable / ↓ Declining]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Action Items Based on Unit Economics

| Metric State | Action |
|--------------|--------|
| LTV:CAC < 3:1 | Reduce CAC or improve retention |
| LTV:CAC > 10:1 | Invest more in growth |
| Payback > 12 mo | Reduce CAC or increase ARPU |
| Churn > 7% | Focus on product/onboarding |
| Gross Margin < 70% | Review COGS, negotiate rates |

---

*Next artifact: 03-burn-runway.md*
