# Pricing Strategy & Model

> **Purpose:** Defines pricing tiers, positioning, and revenue model for TeamPulse. Balances customer value with business sustainability.
>
> **Fits in:** Informs sales scripts and landing page. Bootstrap Finance (finance/) uses this for revenue projections.

## Pricing Philosophy

**Core principle:** Simple, transparent, value-based pricing that makes enterprise-grade reviews accessible to small teams

**Positioning:** Value tier - Enterprise features at SMB pricing (undercuts Lattice/15Five by 50%, premium over basic tools)

---

## Pricing Model Analysis

### Model Selection

**Chosen model:** Per-Employee-Per-Month (PEPM) with all features included

**Why this model:**
1. **Aligns with value:** More employees = more reviews needed = more value delivered
2. **Predictable for buyers:** Easy to calculate total cost ("$6 x 20 employees = $120/month")
3. **Matches market expectations:** Lattice, 15Five, Small Improvements all use PEPM
4. **Natural expansion:** Revenue grows automatically as customer teams grow
5. **Simple to communicate:** No feature gating complexity

**Models considered but rejected:**
- **Flat rate tiers:** Rejected because value scales with team size; flat rate undercharges large teams
- **Per-seat (active users only):** Rejected because it penalizes usage and complicates forecasting
- **Per-review:** Rejected because usage-based pricing creates friction and unpredictable bills
- **Freemium:** Rejected because support burden doesn't justify free tier for B2B product

---

## Pricing Tiers

### Single Tier: Team

**Price:**
- **$6 per employee/month** (billed annually) - *Early bird / Year 1*
- **$8 per employee/month** (billed annually) - *Standard pricing*
- **$10 per employee/month** (billed monthly)

**Why single tier:**
- Simplicity (no confusion about what's included)
- No artificial feature gating (all features for all customers)
- Reduces sales friction (no upselling needed)
- Matches positioning ("all the features you need at a fair price")

**Everything included:**
- Unlimited review cycles
- Manager reviews with ratings + written feedback
- Employee self-reviews
- Gap analysis dashboard (WOW feature)
- Anonymous peer feedback (360)
- Goal setting and tracking
- 6 pre-built role templates + custom templates
- Automated email reminders
- Review history and reporting
- PDF export for 1:1 meetings
- Email support (response within 24 hours)

**Pricing examples by team size:**

| Team Size | Monthly (billed annually @ $6) | Annual Total | Monthly (billed monthly @ $10) |
|-----------|--------------------------------|--------------|--------------------------------|
| 10 employees | $60/mo | $720/yr | $100/mo |
| 15 employees | $90/mo | $1,080/yr | $150/mo |
| 20 employees | $120/mo | $1,440/yr | $200/mo |
| 30 employees | $180/mo | $2,160/yr | $300/mo |
| 50 employees | $300/mo | $3,600/yr | $500/mo |

### Future Tier: Enterprise (Post-Launch)

**Price:** Custom ($10-15 PEPM based on volume)
**Trigger:** When demand emerges from 100+ employee companies
**Features to add:**
- SSO/SAML authentication
- API access for integrations
- Advanced analytics and calibration
- Dedicated support (Slack channel)
- Custom branding
- SLA guarantees

---

## Competitive Pricing Analysis

| Competitor | Entry Price | Mid-Tier | What's Included | Notes |
|------------|-------------|----------|-----------------|-------|
| Lattice | $11 PEPM | $14-17 PEPM | Reviews + OKRs | 50 employee minimum |
| 15Five | $9 PEPM | $14-16 PEPM | Reviews + Check-ins | Annual only |
| Small Improvements | $5 PEPM | $7-8 PEPM | Basic reviews | Missing gap analysis |
| Leapsome | $8 PEPM | $10-12 PEPM | Reviews + Learning | European focus |
| **TeamPulse** | **$6 PEPM** | **$8 PEPM** | **Full reviews + gap analysis** | **No minimum** |

**Pricing position:** 45% below Lattice, 33% below 15Five, 20% above Small Improvements
**Justification:** We include the enterprise features (gap analysis, proper 360) that justify premium over basic tools, but strip out the bloat (OKRs, engagement surveys, weekly check-ins) that inflates enterprise pricing.

---

## Value Metrics & Anchoring

### Primary Value Metric

**Metric:** Number of employees who receive reviews
**Why:** This is what customers are buying - structured feedback for their team. More employees = more value.

**Counting rules:**
- Count all employees who are assigned to at least one review cycle
- Don't count admins who never receive reviews
- Don't count archived/inactive employees

### Price Anchoring Strategy

1. **Anchor to competitors:** Always compare to Lattice ($11+) before showing our price
   - "Lattice charges $11 per employee. We charge $6."

2. **Anchor to time saved:** Position against cost of manager time
   - "Gap analysis saves 30 min per review. At $50/hr manager cost, that's $25 saved per review. For 10 reviews, you've paid for 2 months of TeamPulse."

3. **Anchor to outcomes:** Position against cost of bad reviews
   - "One surprise resignation from a top performer costs $50K+ to replace. Proper reviews and feedback cost $1,000/year."

---

## Pricing Psychology Tactics

### Tactics Applied

- [x] **Charm pricing:** $6 and $8 (not $7 or $9) - feels like a deal
- [x] **Annual discount:** 40% off for annual commitment ($6 vs $10/month)
- [x] **Simplicity:** Single tier, no feature comparison needed
- [x] **Social proof:** "Join 50+ small teams already running better reviews"
- [x] **Risk reversal:** 14-day free trial, 30-day money-back guarantee

### Tactics to Avoid

- No hidden fees or surprise charges
- No forced annual contracts (monthly option available)
- No per-seat counting games (simple employee count)
- No enterprise-only features in the core tier

---

## Free Trial Strategy

**Approach:** 14-Day Free Trial (Full Features, No Credit Card)

**Why this approach:**
1. **No credit card:** Reduces signup friction, encourages trial starts
2. **Full features:** Let them experience the full value including gap analysis
3. **14 days:** Long enough to run a mini review cycle, short enough to create urgency
4. **No feature limits:** Don't handicap the trial experience

**Trial experience:**
- Day 0: Signup, add team, start onboarding
- Day 1-3: Create first review cycle, explore templates
- Day 4-7: Complete first reviews, see gap analysis
- Day 8-10: Share reviews with employees, get feedback
- Day 11-14: Conversion window (upgrade prompts appear)

**Conversion nudges:**
- Day 7: Email - "You've completed your first reviews! Here's what's possible with TeamPulse..."
- Day 10: In-app - "4 days left in trial. Your team loved it - keep the momentum going."
- Day 13: Email - "Last day of trial. Lock in early bird pricing before it's gone."
- Day 14: Account enters read-only mode (can view but not create new cycles)

**Post-trial:**
- 30 days: Data retained in read-only mode
- 60 days: Reminder email before deletion
- 90 days: Data deleted (GDPR compliance)

---

## Discounting Strategy

### Allowed Discounts

| Discount | Amount | Criteria | Duration |
|----------|--------|----------|----------|
| Early bird | 25% off | First 50 customers | Lifetime |
| Annual commitment | 40% off | Pay annually vs monthly | Annual |
| Startup discount | 50% off | <2 years old, <$1M revenue | 1 year |
| Non-profit | 30% off | Registered 501(c)(3) | Ongoing |

### Discount Stacking

- Early bird + Annual: Yes (applies both, max 50% off)
- Startup + Annual: Yes (max 60% off)
- No triple stacking

### Prohibited Discounts

- No ad-hoc discounts without approval
- No discounts below $3 PEPM (unit economics floor)
- No "special pricing" that creates inequality
- No discounts for payment promises (cash upfront only)

---

## Expansion & Retention Pricing

### Expansion Triggers

1. **Team growth:** Automatic - new employees added to count
   - Customer adds 5 employees → bill increases by $30-50/month
   - Notify customer when count changes ("You've grown! We've updated your team count.")

2. **Annual renewal:** Opportunity to capture growth
   - If team grew 20% during year, renewal reflects new count
   - Offer to lock in current rate if they renew early

### Retention Tactics

1. **Grandfathering:** Existing customers keep their rate for 12 months after price increases
   - Early bird customers ($6) keep $6 rate even when standard becomes $8

2. **Win-back offer:** 50% off for 3 months if they return within 6 months
   - "We miss you! Come back at half price."

3. **Pause option:** Can pause account (and billing) for up to 3 months instead of canceling
   - Data retained, billing stops, account reactivates automatically

4. **Annual loyalty:** 10% additional discount after 2 years as customer

### Churn Prevention

- Day 7 after last activity: "We noticed you haven't logged in..."
- Before billing cycle: Check engagement, reach out if low
- Cancellation flow: Offer pause, discount, or feedback collection

---

## Unit Economics Target

### Key Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| **ARPA (Avg Revenue Per Account)** | $120/mo | ~20 employees x $6 |
| **ACV (Annual Contract Value)** | $1,440/yr | ARPA x 12 months |
| **CAC (Customer Acquisition Cost)** | <$200 | LinkedIn outreach is cheap |
| **Gross Margin** | >80% | SaaS standard, low COGS |
| **Payback Period** | <3 months | $200 CAC / $120 ARPA |
| **LTV (Lifetime Value)** | $4,320 | 3 year avg lifetime x $1,440 |
| **LTV/CAC Ratio** | >20:1 | Target >3:1, we should crush this |

### Break-Even Analysis

**Monthly costs (estimated):**
- Hosting/infrastructure: $100-200/mo
- Email service (Resend): $20/mo
- Analytics (PostHog): $0 (free tier)
- Domain/misc: $30/mo
- **Total fixed costs:** ~$250/mo

**Break-even customers:**
- At $120 ARPA: ~3 customers to cover fixed costs
- At 80% gross margin: ~3 customers

**Path to $3-5K MRR:**
- $3K MRR: 25 customers at $120 ARPA
- $5K MRR: 42 customers at $120 ARPA
- Timeline: 6 months (target from business context)

---

## Pricing Rollout Plan

### Phase 1: Beta Pricing (Month 1-2)

**Price:** $0 (free beta) for first 10 customers
**Purpose:** Validate product, gather feedback, build case studies
**Terms:**
- Full features forever (early adopter benefit)
- In exchange: Must give feedback, testimonials, case study
- Duration: Until product stabilizes

### Phase 2: Early Bird Pricing (Month 3-4)

**Price:** $6 PEPM (annual) or $8 PEPM (monthly)
**Purpose:** First paying customers, validate willingness to pay
**Terms:**
- First 50 customers get this rate locked forever
- "Founding member" badge in product
- Direct access to founder for feedback

### Phase 3: Standard Pricing (Month 5+)

**Price:** $8 PEPM (annual) or $10 PEPM (monthly)
**Purpose:** Sustainable pricing for growth
**Terms:**
- All features included
- 14-day free trial
- 30-day money-back guarantee

### Phase 4: Price Optimization (Month 9+)

**Activities:**
- A/B test $8 vs $9 vs $10 annual price
- Test annual-only vs monthly option
- Analyze conversion by price point
- Adjust based on data

---

## Pricing Page Copy

### Headline
> "Enterprise-grade reviews at startup-friendly pricing"

### Subheadline
> "Everything your team needs for 360-degree feedback. One simple price."

### Price Display
```
$6
per employee/month
billed annually

OR

$10/month billed monthly
```

### Value Proposition
> "TeamPulse costs less than 1 hour of manager time per month - and saves 30+ minutes per review."

### Social Proof
> "Join 50+ small teams running better performance reviews"

### Feature List
- Unlimited review cycles
- Employee self-reviews with gap analysis
- Anonymous peer feedback (360)
- Goal setting and tracking
- 6 role templates included
- Automated reminders
- PDF exports for 1:1s
- Email support

### Comparison Callout
> "That's 50% less than Lattice - with all the features you actually need."

### FAQ Section

**1. How do you count employees?**
We count employees who are assigned to at least one review cycle. Admins who don't receive reviews aren't counted.

**2. Can I pay monthly?**
Yes! Monthly billing is $10 per employee/month. Annual billing saves you 40% at $6 per employee/month.

**3. What happens after the free trial?**
After 14 days, your account becomes read-only. Upgrade anytime to continue creating review cycles. Your data is saved for 90 days.

**4. Can I cancel anytime?**
Yes, cancel anytime. Monthly customers can cancel before their next billing cycle. Annual customers can cancel before renewal.

**5. Do you offer discounts for startups or non-profits?**
Yes! Startups under 2 years old get 50% off for the first year. Non-profits get 30% off ongoing. Contact us to apply.

**6. What if we grow during the year?**
We'll automatically adjust your employee count. You'll be notified when your bill changes so there are no surprises.

---

## Price Testing Framework

### Tests to Run (Priority Order)

| Test | Hypothesis | Metric | Duration |
|------|------------|--------|----------|
| $6 vs $8 annual | $6 drives more trials, similar conversion | Trial-to-paid rate | 4 weeks |
| Annual-only vs monthly option | Monthly option increases signups | Signup rate, LTV | 4 weeks |
| "50% off Lattice" vs "$6/employee" | Anchor pricing increases perceived value | Click-to-trial rate | 2 weeks |
| 14-day vs 7-day trial | 14 days allows full cycle, higher conversion | Trial-to-paid rate | 4 weeks |

### Success Metrics

- **Trial-to-paid conversion:** Target >25%
- **ACV:** Target $1,200-1,800
- **Churn rate:** Target <5% monthly
- **Expansion revenue:** Target >110% net revenue retention
