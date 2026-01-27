# Burn Rate & Runway Tracker

*Generated for: Performance Evaluation Tool*

---

## Burn Rate Overview

### Bootstrap Context

| Factor | Status |
|--------|--------|
| **Funding Type** | Bootstrapped (self-funded) |
| **Founder Salary** | $0 (not taking salary initially) |
| **Runway Goal** | Reach profitability before running out |
| **Burn Target** | <$500/month until profitable |

---

## Monthly Burn Breakdown

### Fixed Costs

| Category | Item | Monthly Cost | Notes |
|----------|------|--------------|-------|
| **Infrastructure** | | | |
| | Railway hosting | $20 | Scales with usage |
| | Domain & DNS | $3 | Annual/12 |
| | SSL | $0 | Free via Railway |
| **Tools** | | | |
| | LinkedIn Navigator | $100 | Critical for sales |
| | Resend (email) | $0 | Free tier |
| | Analytics (Plausible) | $9 | |
| | Design (Canva Pro) | $15 | |
| | Error tracking (Sentry) | $0 | Free tier |
| **Operations** | | | |
| | Bank account | $0 | Mercury free |
| | Accounting software | $15 | Wave or similar |
| | Legal entity | $8 | State fees/12 |
| **Marketing** | | | |
| | Content tools | $75 | Jasper, Surfer, etc. |
| **Total Fixed** | | **$245** | |

### Variable Costs

| Category | Item | Cost Basis | Est. Monthly |
|----------|------|------------|--------------|
| Payment processing | Stripe | 2.9% + $0.30/txn | $50-100 |
| Email overages | Resend | $0.001/email | $0-20 |
| Support tools | Intercom/Crisp | Per seat | $0-30 |
| **Total Variable** | | | **$50-150** |

### Total Monthly Burn

| Scenario | Fixed | Variable | Total Burn |
|----------|-------|----------|------------|
| **Minimum** | $245 | $50 | $295 |
| **Expected** | $245 | $100 | $345 |
| **Maximum** | $245 | $150 | $395 |

---

## Runway Calculation

### Starting Position

| Item | Amount |
|------|--------|
| **Initial Cash** | $3,000 (assumed bootstrap fund) |
| **Monthly Burn** | $345 |
| **Revenue Month 1** | $270 |
| **Net Burn Month 1** | $75 |

### Runway Projection

| Month | Starting Cash | Revenue | Burn | Net | Ending Cash |
|-------|--------------|---------|------|-----|-------------|
| 1 | $3,000 | $270 | $345 | -$75 | $2,925 |
| 2 | $2,925 | $665 | $345 | +$320 | $3,245 |
| 3 | $3,245 | $1,200 | $400 | +$800 | $4,045 |
| 4 | $4,045 | $1,785 | $400 | +$1,385 | $5,430 |
| 5 | $5,430 | $2,530 | $450 | +$2,080 | $7,510 |
| 6 | $7,510 | $3,450 | $450 | +$3,000 | $10,510 |

### Break-Even Point

```
Break-even revenue = Fixed costs / Gross margin
Break-even = $345 / 0.81 = $426 MRR

At $115 ARPA: 4 customers to break even
```

**Expected break-even: Month 2 (with 4+ customers)**

---

## Runway Scenarios

### Scenario 1: Conservative Growth

| Assumption | Value |
|------------|-------|
| Monthly customer growth | 3-4 |
| Churn | 5% |
| ARPA | $100 |
| Burn | $350 |

| Month | Customers | MRR | Burn | Net | Cumulative |
|-------|-----------|-----|------|-----|------------|
| 3 | 10 | $1,000 | $350 | +$650 | $4,650 |
| 6 | 22 | $2,200 | $400 | +$1,800 | $8,850 |
| 9 | 35 | $3,500 | $450 | +$3,050 | $15,450 |
| 12 | 50 | $5,000 | $500 | +$4,500 | $25,950 |

**Runway: Infinite (cash flow positive by Month 2)**

### Scenario 2: Target Growth

| Assumption | Value |
|------------|-------|
| Monthly customer growth | 5-8 |
| Churn | 5% |
| ARPA | $115 |
| Burn | $400 |

| Month | Customers | MRR | Burn | Net | Cumulative |
|-------|-----------|-----|------|-----|------------|
| 3 | 12 | $1,380 | $400 | +$980 | $5,980 |
| 6 | 30 | $3,450 | $450 | +$3,000 | $14,480 |
| 9 | 55 | $6,325 | $500 | +$5,825 | $30,305 |
| 12 | 90 | $10,350 | $600 | +$9,750 | $58,055 |

**Runway: Infinite (building cash reserves)**

### Scenario 3: Slow Start

| Assumption | Value |
|------------|-------|
| Monthly customer growth | 1-2 |
| Churn | 8% |
| ARPA | $90 |
| Burn | $350 |

| Month | Customers | MRR | Burn | Net | Cash |
|-------|-----------|-----|------|-----|------|
| 1 | 1 | $90 | $350 | -$260 | $2,740 |
| 2 | 2 | $180 | $350 | -$170 | $2,570 |
| 3 | 4 | $360 | $350 | +$10 | $2,580 |
| 6 | 8 | $720 | $400 | +$320 | $3,550 |

**Runway: 10+ months (slower but still viable)**

### Scenario 4: Worst Case

| Assumption | Value |
|------------|-------|
| Monthly customer growth | 0-1 |
| Churn | 15% |
| ARPA | $80 |
| Burn | $350 |

| Month | Customers | MRR | Burn | Net | Cash |
|-------|-----------|-----|------|-----|------|
| 1 | 1 | $80 | $350 | -$270 | $2,730 |
| 2 | 1 | $80 | $350 | -$270 | $2,460 |
| 3 | 2 | $160 | $350 | -$190 | $2,270 |
| 6 | 3 | $240 | $350 | -$110 | $1,740 |

**Runway: ~15 months - Need to pivot by Month 4 if this happens**

---

## Cash Flow Monitoring

### Weekly Cash Position

| Week | Starting | Inflows | Outflows | Ending |
|------|----------|---------|----------|--------|
| 1 | $3,000 | $0 | $50 | $2,950 |
| 2 | $2,950 | $90 | $50 | $2,990 |
| 3 | $2,990 | $90 | $100 | $2,980 |
| 4 | $2,980 | $90 | $145 | $2,925 |

### Monthly Cash Flow Summary

```
┌────────────────────────────────────────────────────────────────────┐
│ CASH FLOW - MONTH [X]                                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  STARTING CASH:                                      $3,000        │
│                                                                    │
│  INFLOWS                                                           │
│  ────────                                                          │
│  Subscription revenue                                $270          │
│  Annual prepays                                      $0            │
│  Other                                               $0            │
│  ─────────────────────────────────────────────────────────         │
│  Total Inflows                                       $270          │
│                                                                    │
│  OUTFLOWS                                                          │
│  ────────                                                          │
│  Infrastructure                                      $23           │
│  Tools & software                                    $199          │
│  Marketing                                           $75           │
│  Variable costs                                      $48           │
│  ─────────────────────────────────────────────────────────         │
│  Total Outflows                                      $345          │
│                                                                    │
│  NET CASH FLOW:                                      -$75          │
│  ENDING CASH:                                        $2,925        │
│                                                                    │
│  Runway at current burn: 8.5 months                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Burn Reduction Strategies

### If Runway Gets Tight

| Strategy | Monthly Savings | Impact |
|----------|-----------------|--------|
| Pause LinkedIn Navigator | $100 | Slower lead gen |
| Reduce content tools | $50 | Slower SEO growth |
| Downgrade analytics | $9 | Less visibility |
| DIY accounting | $15 | More time spent |
| **Total Possible** | **$174** | |

**Minimum burn possible: ~$170/month**

### Emergency Measures

1. **Cut to essentials only:** Hosting + domain = $23/month
2. **Pause all marketing spend:** Focus on existing pipeline
3. **Accelerate annual prepays:** Offer steep discounts for cash
4. **Invoice net-15:** Get paid faster

---

## Revenue Triggers for Investment

### When to Increase Spend

| Milestone | Action | New Budget |
|-----------|--------|------------|
| $1,500 MRR | Add contractor help | +$500/month |
| $3,000 MRR | Increase marketing | +$200/month |
| $5,000 MRR | Consider part-time hire | +$2,000/month |
| $10,000 MRR | Full-time salary possible | +$5,000/month |

### Investment Priorities (in order)

1. **First $500 available:** More marketing tools
2. **Next $1,000:** Part-time support help
3. **Next $2,000:** Part-time sales help
4. **$5,000+:** First full-time hire

---

## Runway Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ RUNWAY DASHBOARD - [Date]                                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  CURRENT POSITION                                                  │
│  ────────────────                                                  │
│  Cash on hand:            $2,925                                   │
│  Monthly burn:            $345                                     │
│  Monthly revenue:         $270                                     │
│  Net burn:                $75                                      │
│  Runway:                  39 months  ✓                             │
│                                                                    │
│  RUNWAY PROJECTION                                                 │
│  ─────────────────                                                 │
│  ████████████████████████████████████████ 39 months               │
│  └─────────────────────────────────────────────────── Infinite    │
│                  ▲                                                 │
│           You are here                                             │
│                                                                    │
│  MILESTONES                                                        │
│  ──────────                                                        │
│  [x] Break-even (Month 2)                                          │
│  [ ] $1,500 MRR (Month 3-4)                                        │
│  [ ] $3,000 MRR (Month 5-6)                                        │
│  [ ] $5,000 MRR (Month 8-10)                                       │
│                                                                    │
│  ALERTS                                                            │
│  ──────                                                            │
│  ✓ No alerts - runway healthy                                      │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Runway Alerts

### Warning Thresholds

| Alert Level | Condition | Action |
|-------------|-----------|--------|
| **Green** | Runway >6 months | Continue as planned |
| **Yellow** | Runway 3-6 months | Reduce discretionary spend |
| **Orange** | Runway 2-3 months | Cut all non-essential costs |
| **Red** | Runway <2 months | Emergency mode |

### Emergency Protocol

If runway <2 months:
1. Cut all non-essential expenses immediately
2. Push hard for annual prepays
3. Consider bridge funding (friends, family)
4. Evaluate pivot or shutdown

---

*Next artifact: 04-finance-metrics.md*
