# Unit Economics Dashboard

*Generated for: Performance Evaluation Tool*

---

## Core Unit Economics

### The Key Metrics

| Metric | Formula | Target | Status |
|--------|---------|--------|--------|
| **LTV** | ARPA x Gross Margin x Customer Lifetime | $1,380+ | - |
| **CAC** | Total Acquisition Cost / New Customers | <$200 | - |
| **LTV:CAC** | LTV / CAC | >5:1 | - |
| **Payback Period** | CAC / (ARPA x Gross Margin) | <6 months | - |
| **Gross Margin** | (Revenue - COGS) / Revenue | >80% | - |

---

## Customer Lifetime Value (LTV)

### LTV Calculation

```
LTV = ARPA x Gross Margin x Customer Lifetime

Where:
- ARPA = $115/month
- Gross Margin = 85%
- Customer Lifetime = 1 / Churn Rate = 1 / 0.05 = 20 months

LTV = $115 x 0.85 x 20 = $1,955
```

### LTV by Segment

| Segment | ARPA | Churn | Lifetime | LTV |
|---------|------|-------|----------|-----|
| Small (15-20) | $95 | 6% | 17 months | $1,371 |
| Medium (21-35) | $125 | 4% | 25 months | $2,656 |
| Large (36-50) | $175 | 3% | 33 months | $4,909 |
| **Blended** | **$115** | **5%** | **20 months** | **$1,955** |

### LTV Improvement Levers

| Lever | Current | Target | LTV Impact |
|-------|---------|--------|------------|
| Reduce churn 5% to 3% | 20 mo | 33 mo | +65% ($1,273) |
| Increase ARPA $115 to $135 | $115 | $135 | +17% ($340) |
| Improve margin 85% to 90% | 85% | 90% | +6% ($115) |

---

## Customer Acquisition Cost (CAC)

### CAC Calculation

**Founder-Led Sales Model:**

| Cost Component | Monthly | Notes |
|----------------|---------|-------|
| LinkedIn Navigator | $100 | Prospecting tool |
| Content tools | $75 | Writing, SEO |
| Email tools | $25 | Outreach |
| **Total Spend** | **$200** | |
| Founder time (10 hrs @ $50/hr) | $500 | Opportunity cost |
| **Total CAC Investment** | **$700** | |

**With 5 customers/month:**
```
CAC = $700 / 5 = $140 per customer
```

### CAC by Channel

| Channel | Monthly Spend | Customers | CAC |
|---------|--------------|-----------|-----|
| LinkedIn Outbound | $100 + $300 time | 3 | $133 |
| SEO/Content | $75 + $100 time | 1 | $175 |
| Referrals | $0 | 1 | $0 |
| **Blended** | **$700** | **5** | **$140** |

### CAC Trends

| Month | Spend | Customers | CAC | Trend |
|-------|-------|-----------|-----|-------|
| 1 | $700 | 3 | $233 | - |
| 2 | $700 | 4 | $175 | Better |
| 3 | $700 | 5 | $140 | Better |
| 4 | $700 | 6 | $117 | Better |
| 5 | $700 | 7 | $100 | Better |
| 6 | $700 | 8 | $88 | Better |

**CAC improves as brand awareness and referrals increase**

---

## LTV:CAC Ratio

### Current Ratio

```
LTV:CAC = $1,955 / $140 = 13.9:1
```

### Benchmarks

| Ratio | Status | Interpretation |
|-------|--------|----------------|
| <1:1 | Critical | Losing money on every customer |
| 1-3:1 | Poor | Unsustainable, need improvement |
| 3-5:1 | Good | Healthy SaaS business |
| 5-10:1 | Excellent | Strong unit economics |
| >10:1 | Outstanding | Could invest more in growth |

**Our ratio of 13.9:1 is excellent - we could afford to invest more in acquisition**

### LTV:CAC by Segment

| Segment | LTV | CAC | Ratio | Action |
|---------|-----|-----|-------|--------|
| Small | $1,371 | $140 | 9.8:1 | Acceptable |
| Medium | $2,656 | $140 | 19.0:1 | Focus here |
| Large | $4,909 | $175* | 28.1:1 | Invest more |

*Larger teams require more sales effort

---

## Payback Period

### Payback Calculation

```
Payback Period = CAC / (ARPA x Gross Margin)
Payback Period = $140 / ($115 x 0.85)
Payback Period = $140 / $97.75
Payback Period = 1.4 months
```

### Payback by Scenario

| Scenario | CAC | ARPA | Margin | Payback |
|----------|-----|------|--------|---------|
| Best case | $100 | $130 | 85% | 0.9 months |
| Target | $140 | $115 | 85% | 1.4 months |
| Conservative | $200 | $100 | 80% | 2.5 months |
| Warning | $300 | $90 | 80% | 4.2 months |

**1.4 months payback is excellent for B2B SaaS (typical is 12-18 months)**

---

## Gross Margin Analysis

### Gross Margin Calculation

| Revenue/Cost | Amount | % of Revenue |
|--------------|--------|--------------|
| Monthly Revenue (per customer) | $115 | 100% |
| **COGS:** | | |
| Hosting (Railway) | $2 | 1.7% |
| Email (Resend) | $1 | 0.9% |
| Payment processing (Stripe 2.9%) | $3.34 | 2.9% |
| Support time (0.5 hrs @ $30) | $15 | 13.0% |
| **Total COGS** | **$21.34** | **18.6%** |
| **Gross Profit** | **$93.66** | **81.4%** |

### Gross Margin Targets

| Phase | Target | Current |
|-------|--------|---------|
| MVP | >70% | 81.4% |
| Growth | >80% | On track |
| Scale | >85% | Achievable with automation |

### Gross Margin Improvement

| Improvement | Impact |
|-------------|--------|
| Reduce support time (self-serve) | +5-8% |
| Negotiate Stripe rates | +0.5% |
| Scale hosting costs | +1-2% |

---

## Unit Economics Summary Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│ UNIT ECONOMICS DASHBOARD                                           │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  CUSTOMER VALUE                     ACQUISITION                    │
│  ──────────────                     ───────────                    │
│  ARPA:          $115/month          CAC:         $140              │
│  Gross Margin:  81.4%               Payback:     1.4 months        │
│  Avg Lifetime:  20 months           LTV:CAC:     13.9:1  ✓         │
│  LTV:           $1,955                                             │
│                                                                    │
│  ECONOMICS PER CUSTOMER                                            │
│  ─────────────────────────                                         │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                                                             │  │
│  │  Acquire ($140) ─> Payback (Month 2) ─> Profit (Months 3+) │  │
│  │                                                             │  │
│  │  Month 1:  -$22 (CAC - GP)                                  │  │
│  │  Month 2:  +$72                                             │  │
│  │  Month 12: +$1,030                                          │  │
│  │  Lifetime: +$1,815 profit                                   │  │
│  │                                                             │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  BENCHMARKS                         STATUS                         │
│  ──────────                         ──────                         │
│  LTV:CAC > 3:1                      13.9:1  ✓ Excellent            │
│  Payback < 12 months                1.4 mo  ✓ Excellent            │
│  Gross Margin > 70%                 81.4%   ✓ Excellent            │
│  Churn < 5%                         5.0%    ✓ Good                 │
│                                                                    │
│  IMPROVEMENT PRIORITIES                                            │
│  ──────────────────────                                            │
│  1. Reduce churn to 3% → LTV +65%                                  │
│  2. Increase ARPA to $130 → +13% revenue                           │
│  3. Automate support → +5% gross margin                            │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Unit Economics Scenarios

### Best Case

| Metric | Value |
|--------|-------|
| ARPA | $135 |
| CAC | $100 |
| Churn | 3% |
| LTV | $3,825 |
| LTV:CAC | 38:1 |
| Payback | 0.9 months |

### Target Case

| Metric | Value |
|--------|-------|
| ARPA | $115 |
| CAC | $140 |
| Churn | 5% |
| LTV | $1,955 |
| LTV:CAC | 14:1 |
| Payback | 1.4 months |

### Worst Case

| Metric | Value |
|--------|-------|
| ARPA | $90 |
| CAC | $250 |
| Churn | 10% |
| LTV | $765 |
| LTV:CAC | 3:1 |
| Payback | 3.3 months |

---

## Cohort Economics

### Tracking Template

| Cohort | Customers | Start ARPA | M3 ARPA | M6 ARPA | M3 Retention | M6 Retention |
|--------|-----------|------------|---------|---------|--------------|--------------|
| M1 | 3 | $95 | - | - | - | - |
| M2 | 4 | $100 | - | - | - | - |
| M3 | 5 | $110 | - | - | - | - |

### Cohort LTV Tracking

```
LTV by cohort month:

M1 Cohort: $95 → M2: $190 → M3: $285 → ...
M2 Cohort: $100 → M2: $200 → M3: $300 → ...
M3 Cohort: $110 → M2: $220 → M3: $330 → ...

Expected LTV at M12: $1,140 - $1,320
Expected LTV at M20: $1,900 - $2,200
```

---

## When to Worry

### Red Flags

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| LTV:CAC | <5:1 | <3:1 | Reduce CAC or improve retention |
| Payback | >6 months | >12 months | Lower CAC or raise prices |
| Gross Margin | <70% | <60% | Reduce COGS |
| Churn | >7% | >10% | Focus on retention |
| CAC | >$250 | >$400 | Improve sales efficiency |

### Early Warning Signs

- CAC increasing month over month
- Churn rate creeping up
- Support costs increasing per customer
- Lower-ARPA customers converting more than high-ARPA

---

*Next artifact: 03-burn-runway.md*
