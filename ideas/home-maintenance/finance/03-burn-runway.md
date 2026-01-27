# Burn Rate & Runway Tracker

*Generated on January 28, 2026*

---

## Current Financial Position

### Starting Position

| Item | Amount | Notes |
|------|--------|-------|
| Cash on hand | $0 | Bootstrapped start |
| Monthly budget | $500 | Tools and marketing |
| Founder time value | 20 hrs/week @ $50/hr | Opportunity cost |
| Founder salary | $0 | Not taking salary initially |

---

## Monthly Operating Costs

### Fixed Costs (Monthly)

| Category | Item | Cost | Notes |
|----------|------|------|-------|
| **Infrastructure** | Railway/Render hosting | $20 | Scales with usage |
| | Domain + DNS | $2 | Annual / 12 |
| | SSL | $0 | Included with host |
| **Tools** | GitHub | $0 | Free for small teams |
| | Sentry (error tracking) | $0 | Free tier |
| | UptimeRobot | $0 | Free tier |
| | Notion/Docs | $0 | Free tier |
| **Services** | Twilio (base) | $20 | Phone number + minimum |
| | Resend (email) | $0 | Free tier (3K/mo) |
| | Stripe | $0 | Pay per transaction |
| **Marketing** | Email tools | $30 | Apollo or similar |
| | Design tools | $15 | Figma/Canva |
| **Total Fixed** | | **$87/month** | |

### Variable Costs (Per Customer)

| Item | Cost/Customer/Month | Notes |
|------|---------------------|-------|
| Stripe subscription fee | $2.59 | 2.9% + $0.30 |
| Stripe processing | $3.10 | 2.9% + $0.30 on invoice payments |
| Twilio SMS | $3.00 | ~40 messages @ $0.0079 |
| Hosting (incremental) | $2.00 | Database, compute |
| **Total Variable** | **$10.69/customer** | |

---

## Burn Rate Calculation

### Pre-Revenue (Month 0-1)

```
Monthly Burn = Fixed Costs + One-Time Setup
             = $87 + $100 (domains, initial tools)
             = $187
```

### With Customers

```
Monthly Burn = Fixed Costs + (Variable Costs × Customers) - Revenue

Example at 20 customers:
Burn = $87 + ($10.69 × 20) - ($79 × 20)
     = $87 + $213.80 - $1,580
     = -$1,279.20 (positive cash flow!)
```

---

## Break-Even Analysis

### Cash Break-Even

```
Break-Even Customers = Fixed Costs / (Revenue - Variable Cost per Customer)
                     = $87 / ($79 - $10.69)
                     = $87 / $68.31
                     = 1.3 customers
```

**At just 2 paying customers, fixed costs are covered.**

### Full Break-Even (Including Founder Salary)

If targeting $5,000/month founder salary:

```
Full Break-Even = ($87 + $5,000) / $68.31
                = $5,087 / $68.31
                = 74.5 customers
                = ~$5,900 MRR
```

---

## Runway Projections

### Scenario: $500 Starting Cash

| Month | Revenue | Costs | Net | Cash Balance |
|-------|---------|-------|-----|--------------|
| M0 | $0 | $187 | -$187 | $313 |
| M1 | $790 | $194 | +$596 | $909 |
| M2 | $1,659 | $312 | +$1,347 | $2,256 |
| M3 | $2,765 | $461 | +$2,304 | $4,560 |
| M4 | $4,029 | $632 | +$3,397 | $7,957 |
| M5 | $5,372 | $814 | +$4,558 | $12,515 |
| M6 | $6,873 | $1,016 | +$5,857 | $18,372 |

**Cash positive from Month 1.**

### Scenario: No Starting Cash (Pure Bootstrap)

| Month | Revenue | Costs | Net | Running Total |
|-------|---------|-------|-----|---------------|
| M0 | $0 | $187 | -$187 | -$187 |
| M1 | $790 | $194 | +$596 | +$409 |
| M2 | $1,659 | $312 | +$1,347 | +$1,756 |

**Break-even in Month 1 if even 10 customers acquired.**

---

## Cash Flow Forecast (6 Months)

### Monthly Cash Flow (Target Scenario)

```
Month 1
├── Revenue
│   ├── Subscription: $1,185 (15 customers)
│   └── Processing: $150
│   └── Total: $1,335
├── Expenses
│   ├── Fixed: $87
│   └── Variable: $160 (15 × $10.69)
│   └── Total: $247
└── Net Cash Flow: +$1,088

Month 3
├── Revenue
│   ├── Subscription: $4,345 (55 customers)
│   └── Processing: $550
│   └── Total: $4,895
├── Expenses
│   ├── Fixed: $87
│   └── Variable: $588 (55 × $10.69)
│   └── Total: $675
└── Net Cash Flow: +$4,220

Month 6
├── Revenue
│   ├── Subscription: $11,692 (148 customers)
│   └── Processing: $1,480
│   └── Total: $13,172
├── Expenses
│   ├── Fixed: $87
│   └── Variable: $1,582 (148 × $10.69)
│   └── Total: $1,669
└── Net Cash Flow: +$11,503
```

---

## Burn Rate Scenarios

### Best Case

| Metric | Value |
|--------|-------|
| Monthly burn (pre-revenue) | $87 |
| Time to break-even | Month 1 |
| 6-month accumulated cash | $35,000+ |

### Base Case

| Metric | Value |
|--------|-------|
| Monthly burn (pre-revenue) | $150 |
| Time to break-even | Month 1 |
| 6-month accumulated cash | $18,000+ |

### Worst Case

| Metric | Value |
|--------|-------|
| Monthly burn (pre-revenue) | $300 |
| Time to break-even | Month 2 |
| 6-month accumulated cash | $8,000+ |
| Runway without revenue | 3-4 months |

---

## Budget Allocation

### Monthly $500 Budget

| Category | Allocation | Amount | Rationale |
|----------|------------|--------|-----------|
| Infrastructure | 20% | $100 | Hosting, tools |
| Marketing | 40% | $200 | Outreach tools, content |
| Emergency | 20% | $100 | Buffer |
| Learning | 10% | $50 | Books, courses |
| Misc | 10% | $50 | Unexpected |

### Budget Adjustment by Phase

| Phase | Infrastructure | Marketing | Emergency |
|-------|---------------|-----------|-----------|
| Build (M1) | 60% | 20% | 20% |
| Launch (M2) | 30% | 50% | 20% |
| Growth (M3+) | 20% | 60% | 20% |

---

## Expense Tracking

### Weekly Expense Log

| Week | Category | Item | Amount | Notes |
|------|----------|------|--------|-------|
| | | | | |

### Monthly Summary

```
Month: [X]

Fixed Expenses
├── Hosting: $XX
├── Tools: $XX
├── Services: $XX
└── Total Fixed: $XX

Variable Expenses (XX customers)
├── Stripe: $XX
├── Twilio: $XX
├── Hosting (incremental): $XX
└── Total Variable: $XX

Total Expenses: $XX
Revenue: $XX
Net: $XX

YTD Cash Flow: $XX
```

---

## Founder Salary Planning

### Path to Salary

| Milestone | MRR | Customers | Founder Salary |
|-----------|-----|-----------|----------------|
| Pre-revenue | $0 | 0 | $0 |
| Validation | $790 | 10 | $0 |
| Traction | $3,000 | 40 | $0 (optional $1K) |
| Growth | $6,000 | 75 | $2,000/month |
| Scale | $10,000 | 125 | $4,000/month |
| Sustainable | $15,000 | 190 | $6,000/month |

### Salary Calculation

```
Available for Salary = MRR - Fixed Costs - Variable Costs - Reinvestment

At $10,000 MRR (125 customers):
= $10,000 - $87 - $1,336 - $2,000 (reinvestment)
= $6,577 available

Conservative salary: 60% = $3,946/month
```

---

## Risk Mitigation

### Financial Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Slow sales | Medium | High | Keep day job until $3K MRR |
| High churn | Medium | High | Focus on onboarding |
| Unexpected costs | Low | Medium | 20% emergency buffer |
| Stripe/Twilio failure | Very Low | High | Alternative providers ready |

### Emergency Actions

| Cash Level | Action |
|------------|--------|
| < $500 | Cut all non-essential tools |
| < $200 | Pause marketing spend |
| < $100 | Consider pause/pivot |

---

## Key Burn Rate Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Gross Burn** | Total monthly expenses | < $1,000 |
| **Net Burn** | Expenses - Revenue | Negative (profit) |
| **Runway** | Cash / Net Burn | > 6 months |
| **Burn Multiple** | Net Burn / Net New ARR | < 1 (efficiency) |

---

## Tracking Template

### Weekly Cash Position

| Date | Cash In | Cash Out | Balance | Notes |
|------|---------|----------|---------|-------|
| | | | | |

### Monthly Review

```
┌─────────────────────────────────────────────────────────────────┐
│  BURN RATE - MONTH [X]                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Starting Cash:        $X,XXX                                   │
│  Revenue:              $X,XXX                                   │
│  Expenses:             $XXX                                     │
│  Net Cash Flow:        $X,XXX                                   │
│  Ending Cash:          $X,XXX                                   │
│                                                                 │
│  Burn Rate:            $XXX/month (or profitable!)              │
│  Runway:               XX months (if burning)                   │
│                                                                 │
│  Status: [HEALTHY / CAUTION / CRITICAL]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

*Next artifact: 04-financial-metrics.md*
