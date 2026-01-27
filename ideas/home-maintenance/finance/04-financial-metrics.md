# Financial Metrics & KPIs

*Generated on January 28, 2026*

---

## Financial North Star

**Months of Runway**

Definition: How many months can the business operate at current burn rate before running out of cash.

```
Runway = Cash Balance / Monthly Net Burn
```

**Target:** Always maintain > 6 months runway (or be profitable).

---

## Primary Financial KPIs

### Revenue Metrics

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| **MRR** | Monthly Recurring Revenue | Growing 15%+ MoM | Weekly |
| **ARR** | Annual Recurring Revenue (MRR × 12) | $100K+ by Year 1 | Monthly |
| **Net Revenue Retention** | (MRR + Expansion - Churn) / Starting MRR | > 95% | Monthly |
| **Revenue Growth Rate** | (MRR this month - MRR last month) / MRR last month | > 15% | Monthly |

### Profitability Metrics

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| **Gross Margin** | (Revenue - COGS) / Revenue | > 85% | Monthly |
| **Net Margin** | (Revenue - All Costs) / Revenue | > 60% | Monthly |
| **Operating Cash Flow** | Cash from operations | Positive | Monthly |
| **EBITDA** | Earnings before interest, taxes, depreciation | Positive | Quarterly |

### Efficiency Metrics

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| **CAC Payback** | CAC / Monthly Contribution | < 3 months | Monthly |
| **LTV:CAC** | Customer Lifetime Value / CAC | > 10:1 | Monthly |
| **Burn Multiple** | Net Burn / Net New ARR | < 1 | Monthly |
| **Rule of 40** | Revenue Growth % + Profit Margin % | > 40 | Quarterly |

---

## Secondary Financial KPIs

### Customer Economics

| Metric | Definition | Target |
|--------|------------|--------|
| **ARPU** | Average Revenue Per User | $89 |
| **ARPPU** | Average Revenue Per Paying User | $89 |
| **Expansion Revenue** | Revenue from upsells | $0 (flat pricing) |
| **Contraction Revenue** | Revenue lost to downgrades | $0 |

### Churn Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Gross Revenue Churn** | Lost MRR / Starting MRR | < 5% |
| **Net Revenue Churn** | (Lost MRR - Expansion) / Starting MRR | < 3% |
| **Logo Churn** | Customers lost / Starting customers | < 5% |
| **Churn Rate (Annual)** | 1 - (1 - Monthly Churn)^12 | < 50% |

### Cash Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Cash Balance** | Total cash available | Growing |
| **Cash Flow** | Cash in - Cash out | Positive |
| **Days Cash on Hand** | Cash / Daily Expenses | > 180 days |
| **Collections Period** | Avg days to collect payment | < 3 days |

---

## Financial Dashboard

### Real-Time View

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FINANCIAL DASHBOARD                               Updated: [Date]      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │    MRR      │  │  Customers  │  │    Cash     │  │   Runway    │   │
│  │   $6,873    │  │     87      │  │  $18,372    │  │  Infinite   │   │
│  │   +18% ↑    │  │   +22 ↑     │  │  +$5,857 ↑  │  │ (Profitable)│   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  Revenue Breakdown                     Cost Breakdown                   │
│  ├── Subscription: $6,873 (90%)        ├── Fixed: $87 (8%)             │
│  └── Processing: $740 (10%)            └── Variable: $929 (92%)        │
│                                                                         │
│  Key Ratios                                                             │
│  ├── Gross Margin: 87%    [████████▓░] Target: 85%                     │
│  ├── LTV:CAC: 15:1        [██████████] Target: 10:1                    │
│  ├── Churn: 4.5%          [██████████] Target: <5%                     │
│  └── CAC Payback: 1.2mo   [██████████] Target: <3mo                    │
│                                                                         │
│  Monthly Trend                                                          │
│  $8K ┤                                      ╭──                        │
│      │                               ╭─────╯                           │
│  $4K ┤                        ╭─────╯                                  │
│      │                 ╭─────╯                                         │
│  $0K ┤─────────╭──────╯                                                │
│      └─────────────────────────────────────                            │
│        M1    M2    M3    M4    M5    M6                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Weekly Financial Review

### Checklist

- [ ] Check Stripe dashboard for MRR
- [ ] Count new trials and conversions
- [ ] Count churned customers
- [ ] Review expenses vs budget
- [ ] Update runway calculation
- [ ] Note any anomalies

### Weekly Metrics Log

| Week | MRR | New Cust | Churned | Cash In | Cash Out | Balance |
|------|-----|----------|---------|---------|----------|---------|
| W1 | | | | | | |
| W2 | | | | | | |
| W3 | | | | | | |
| W4 | | | | | | |

---

## Monthly Financial Review

### Report Template

```markdown
# Financial Review - Month [X]

## Summary
- MRR: $X,XXX (change from last month: X%)
- Customers: XX (change: +X/-X)
- Cash: $X,XXX (change: $X,XXX)
- Runway: XX months (or profitable)

## Revenue Analysis
| Stream | Amount | % of Total | vs Last Month |
|--------|--------|------------|---------------|
| Subscription | $X,XXX | XX% | +X% |
| Processing | $XXX | XX% | +X% |

## Cost Analysis
| Category | Amount | % of Revenue | vs Budget |
|----------|--------|--------------|-----------|
| Fixed | $XXX | XX% | On/Over/Under |
| Variable | $XXX | XX% | On/Over/Under |

## Key Metrics
| Metric | Actual | Target | Status |
|--------|--------|--------|--------|
| Gross Margin | XX% | 85% | ✓/✗ |
| Net Margin | XX% | 60% | ✓/✗ |
| LTV:CAC | XX:1 | 10:1 | ✓/✗ |
| Churn | X% | 5% | ✓/✗ |

## Cash Flow
| Item | Amount |
|------|--------|
| Starting Cash | $X,XXX |
| + Revenue | $X,XXX |
| - Expenses | $XXX |
| = Ending Cash | $X,XXX |

## Highlights
- [Notable win]
- [Notable win]

## Concerns
- [Issue to watch]

## Next Month Focus
- [Priority 1]
- [Priority 2]
```

---

## Quarterly Financial Review

### Metrics to Review

| Category | Metrics |
|----------|---------|
| Growth | QoQ revenue growth, customer growth |
| Profitability | Gross margin trend, net margin trend |
| Efficiency | CAC trend, LTV:CAC trend |
| Health | Churn trend, cash position |

### Quarterly Comparison

| Metric | Q1 | Q2 | Q3 | Q4 | YoY |
|--------|----|----|----|----|-----|
| MRR (end) | | | | | |
| Customers (end) | | | | | |
| Revenue (total) | | | | | |
| Expenses (total) | | | | | |
| Net Income | | | | | |
| Cash (end) | | | | | |

---

## Financial Alerts

### Thresholds

| Alert Level | Condition | Action |
|-------------|-----------|--------|
| **Critical** | Runway < 3 months | Cut costs immediately |
| **Warning** | Runway < 6 months | Review all expenses |
| **Caution** | Gross margin < 75% | Investigate COGS |
| **Watch** | Churn > 7% | Focus on retention |
| **Note** | Growth < 10% MoM | Review sales strategy |

### Alert Notifications

Set up alerts for:
- MRR drops > 10% week-over-week
- Churn spike > 2x normal
- Failed payment rate > 5%
- Unusual expense (> 2x normal)

---

## Financial Health Score

### Scoring Criteria

| Metric | Weight | Score Calculation |
|--------|--------|-------------------|
| MRR Growth | 25% | 15%+ = 100, 10% = 75, 5% = 50, <5% = 25 |
| Gross Margin | 20% | 85%+ = 100, 80% = 75, 75% = 50, <75% = 25 |
| LTV:CAC | 20% | 10:1+ = 100, 5:1 = 75, 3:1 = 50, <3:1 = 25 |
| Churn | 20% | <3% = 100, 5% = 75, 7% = 50, >7% = 25 |
| Runway | 15% | Profitable = 100, 12mo = 75, 6mo = 50, <6mo = 25 |

### Health Status

| Score | Status | Action |
|-------|--------|--------|
| 85-100 | Excellent | Scale aggressively |
| 70-84 | Good | Optimize and grow |
| 55-69 | Fair | Focus on weak areas |
| 40-54 | Concerning | Urgent improvements needed |
| <40 | Critical | Restructure or pivot |

---

## Benchmarks

### SaaS Benchmarks (SMB)

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| MRR Growth (monthly) | <5% | 5-10% | 10-15% | >15% |
| Gross Margin | <70% | 70-80% | 80-85% | >85% |
| Net Margin | <0% | 0-20% | 20-40% | >40% |
| Churn (monthly) | >10% | 5-10% | 3-5% | <3% |
| LTV:CAC | <3:1 | 3-5:1 | 5-10:1 | >10:1 |
| CAC Payback | >18mo | 12-18mo | 6-12mo | <6mo |

### Our Current Position

| Metric | Our Target | Benchmark Position |
|--------|------------|-------------------|
| MRR Growth | 15%+ | Excellent |
| Gross Margin | 85%+ | Excellent |
| Net Margin | 60%+ | Excellent |
| Churn | <5% | Good |
| LTV:CAC | 15:1 | Excellent |
| CAC Payback | 1.3mo | Excellent |

---

## Tools for Financial Tracking

### Recommended Stack

| Purpose | Tool | Cost |
|---------|------|------|
| Revenue tracking | Stripe Dashboard | Free |
| Expense tracking | Google Sheets | Free |
| Accounting | Wave | Free |
| Financial modeling | Google Sheets | Free |
| Metrics dashboard | Baremetrics (later) | $50/mo |

### Simple Tracking Setup

1. **Stripe** for all revenue data
2. **Google Sheets** for expenses and projections
3. **Wave** for bookkeeping (when needed)
4. **Monthly review** ritual (30 min)

---

*Next artifact: 05-fundraising-readiness.md*
