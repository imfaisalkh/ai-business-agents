# Burn Rate & Runway Tracker

> **Purpose:** Track cash burn and calculate runway for TeamPulse. Ensures you don't run out of money.
>
> **Fits in:** Uses costs from architecture decisions. Informs fundraising decisions (05).

## Current Financial Position

### Starting Capital

| Source | Amount | Notes |
|--------|--------|-------|
| Personal savings | $[X] | |
| Initial revenue | $0 | Pre-launch |
| **Total Starting Cash** | **$[X]** | |

### Monthly Runway Calculation

```
Runway (months) = Current Cash / Monthly Burn Rate
```

---

## Monthly Expenses Breakdown

### Fixed Costs (Occur Every Month)

| Category | Item | Cost | Notes |
|----------|------|------|-------|
| **Infrastructure** | | | |
| | Vercel Pro | $20 | Hosting |
| | Supabase Pro | $25 | Database |
| | Domain + DNS | $2 | teampulse.app |
| | **Subtotal** | **$47** | |
| **Tools** | | | |
| | Clerk (free tier) | $0 | Auth (free <5K MAU) |
| | Resend (free tier) | $0 | Email (free <3K/mo) |
| | PostHog (free tier) | $0 | Analytics |
| | Stripe | % of revenue | ~3% fees |
| | **Subtotal** | **$0** | Until volume |
| **Business** | | | |
| | LinkedIn Premium | $60 | Or Sales Nav $80 |
| | Calendly | $12 | Scheduling |
| | Banking/accounting | $20 | Mercury, etc |
| | **Subtotal** | **$92** | |
| **Total Fixed** | | **$139** | |

### Variable Costs (Scale with Activity)

| Category | Item | Unit Cost | Est. Monthly | Notes |
|----------|------|-----------|--------------|-------|
| **Marketing** | | | | |
| | Content tools | - | $0-50 | If using AI writing |
| | Ads (if testing) | - | $0-100 | Optional |
| **Sales** | | | | |
| | Stripe fees | 2.9% + $0.30 | ~$50-150 | Per transaction |
| | Call recording | - | $0-30 | If using |
| **Support** | | | | |
| | Help desk | - | $0 | Use email initially |
| **Total Variable** | | | **$50-330** | |

### Total Monthly Burn

| Phase | Fixed | Variable | Total Burn |
|-------|-------|----------|------------|
| Pre-launch | $139 | $50 | **$189** |
| Launch (Month 3-4) | $139 | $150 | **$289** |
| Growth (Month 5-6) | $164* | $250 | **$414** |

*Assumes Clerk upgrade at 5K MAU

---

## Burn Rate Scenarios

### Scenario 1: Lean Bootstrap

**Monthly burn:** ~$200
**6-month total:** $1,200

| Item | Cost |
|------|------|
| Infrastructure | $47 |
| Tools (free tiers) | $0 |
| LinkedIn Premium | $60 |
| Calendly | $12 |
| Banking | $20 |
| Buffer | $61 |
| **Total** | **$200** |

**Cash needed to launch:** $2,000-3,000 (6-month runway)

### Scenario 2: Moderate Investment

**Monthly burn:** ~$400
**6-month total:** $2,400

| Item | Cost |
|------|------|
| Infrastructure | $47 |
| Tools (some paid) | $50 |
| LinkedIn Sales Nav | $80 |
| Calendly | $12 |
| Banking | $20 |
| Marketing tools | $50 |
| Stripe fees | $50 |
| Buffer | $91 |
| **Total** | **$400** |

**Cash needed to launch:** $4,000-5,000 (6-month runway)

### Scenario 3: Accelerated Growth

**Monthly burn:** ~$800
**6-month total:** $4,800

| Item | Cost |
|------|------|
| Infrastructure | $70 |
| Tools (all paid) | $100 |
| LinkedIn Sales Nav | $80 |
| Marketing/ads | $200 |
| Contractor help | $200 |
| Stripe fees | $100 |
| Banking/legal | $50 |
| **Total** | **$800** |

**Cash needed to launch:** $8,000-10,000 (6-month runway)

---

## Runway Projections

### Cash Flow Forecast (Target Scenario)

| Month | Revenue | Expenses | Net | Cash Balance |
|-------|---------|----------|-----|--------------|
| 1 | $0 | $200 | -$200 | $4,800 |
| 2 | $0 | $250 | -$250 | $4,550 |
| 3 | $600 | $300 | +$300 | $4,850 |
| 4 | $1,320 | $350 | +$970 | $5,820 |
| 5 | $2,280 | $400 | +$1,880 | $7,700 |
| 6 | $3,480 | $450 | +$3,030 | $10,730 |

*Assumes $5,000 starting cash*

**Key insight:** Cash-flow positive by Month 3 with target scenario

### Break-Even Analysis

**Fixed costs to cover:** ~$200-400/month
**At 85% gross margin:** Need $235-470 MRR to break even
**At $100 ARPA:** Need 3-5 customers to cover fixed costs

**Break-even timeline:** Month 3-4

---

## Runway Calculator

### Current Runway

```
Current Cash:         $________
Monthly Burn:         $________
Monthly Revenue:      $________
Net Burn:             $________ (Burn - Revenue)
Runway:               ________ months
```

### Runway with Growth

| Month | Burn | Revenue | Net Burn | Cumulative | Runway |
|-------|------|---------|----------|------------|--------|
| M1 | $300 | $0 | -$300 | -$300 | |
| M2 | $300 | $0 | -$300 | -$600 | |
| M3 | $350 | $600 | +$250 | -$350 | |
| M4 | $350 | $1,200 | +$850 | +$500 | |
| M5 | $400 | $2,000 | +$1,600 | +$2,100 | |
| M6 | $450 | $3,000 | +$2,550 | +$4,650 | Profitable |

---

## Cash Preservation Tactics

### If Runway Gets Short

| Tactic | Monthly Savings | Impact |
|--------|-----------------|--------|
| Downgrade Vercel to Hobby | $20 | Lower, but works for MVP |
| Drop LinkedIn Premium | $60-80 | Use free + more effort |
| Cut non-essential tools | $50-100 | Manage manually |
| Pause paid marketing | $100-200 | Slower growth |

### Minimum Viable Burn

| Item | Cost | Justification |
|------|------|---------------|
| Vercel Hobby | $0 | Free tier works for MVP |
| Supabase Free | $0 | Limited but works |
| LinkedIn Free | $0 | Manual prospecting |
| Gmail | $0 | Personal email |
| **Total** | **$0** | Pure sweat equity |

**Minimum burn possible:** $0-50/month (just domain + minimal tools)

---

## Revenue Impact on Runway

### How Revenue Extends Runway

| MRR | Monthly Burn | Net Burn | Runway Multiplier |
|-----|--------------|----------|-------------------|
| $0 | $300 | -$300 | 1x |
| $300 | $300 | $0 | Infinite (break-even) |
| $600 | $350 | +$250 | Growing cash |
| $1,000 | $400 | +$600 | Growing faster |

### Revenue Milestones

| Milestone | MRR | Effect |
|-----------|-----|--------|
| Cover infrastructure | $50 | Extends runway 15-20% |
| Cover all fixed | $200 | Extends runway 60-70% |
| Break-even | $350 | Infinite runway |
| Profitable | $500+ | Building cash reserve |

---

## Monthly Financial Review

### Template

**Month: ________**

| Category | Budgeted | Actual | Variance |
|----------|----------|--------|----------|
| Infrastructure | | | |
| Tools | | | |
| Marketing | | | |
| Sales | | | |
| Other | | | |
| **Total Expenses** | | | |
| **Revenue** | | | |
| **Net Cash Flow** | | | |
| **Ending Cash** | | | |
| **Runway (months)** | | | |

### Questions to Answer

1. Did we stay within budget? If not, why?
2. Is revenue growing as projected?
3. Do we need to cut costs?
4. When will we break even?
5. Do we need to consider funding?

---

## Warning Thresholds

### Runway Alerts

| Runway | Status | Action |
|--------|--------|--------|
| >6 months | Green | Continue as planned |
| 4-6 months | Yellow | Review costs, accelerate revenue |
| 2-4 months | Orange | Cut non-essential, focus on revenue |
| <2 months | Red | Emergency cost cuts, consider funding |

### Cash Reserve Target

**Minimum cash reserve:** 3 months of expenses
**Target cash reserve:** 6 months of expenses

---

## Funding Decision Framework

### When to Consider Funding

- [ ] Proven unit economics (LTV:CAC >3:1)
- [ ] Clear path to $10K+ MRR
- [ ] Need capital to accelerate (not survive)
- [ ] Market opportunity is time-sensitive

### When NOT to Raise

- [ ] Can reach profitability in <6 months
- [ ] No clear use for additional capital
- [ ] Haven't validated product-market fit
- [ ] Would give up too much equity

### Bootstrap vs Raise Decision Tree

```
Can you survive 6+ months on current cash?
├── Yes → Bootstrap unless growth opportunity is huge
└── No →
    ├── Can you cut costs to extend runway? → Try that first
    └── Is the business working (customers, revenue)?
        ├── Yes → Raise if needed
        └── No → Pivot or shutdown, don't raise
```

---

## Emergency Budget

### If You Need to Survive on $100/month

| Item | Cost | Notes |
|------|------|-------|
| Domain | $1 | Keep the domain |
| Vercel Hobby | $0 | Free tier |
| Supabase Free | $0 | Free tier |
| Everything else | $0 | Pure hustle |
| Stripe fees | ~$10 | On minimal revenue |
| Buffer | $89 | For emergencies |
| **Total** | **$100** | |

**What you give up:**
- LinkedIn prospecting tools (use free)
- Premium features of any tool
- Comfort and convenience

**What you keep:**
- Working product
- Ability to acquire customers
- Time to figure it out
