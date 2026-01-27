# Lead Validation Tactics

*Generated on January 28, 2026*

---

## Purpose

Validate demand BEFORE building extensive features. This artifact covers experiments to run in the first 4 weeks to confirm:
1. The problem is real and urgent
2. People will pay $79/month to solve it
3. The ICP is accurately defined
4. The messaging resonates

---

## Validation Experiments

### Experiment 1: Landing Page Smoke Test

**Goal:** Measure intent to buy before product exists

**Setup:**
1. Create landing page with full messaging
2. Add "Start Free Trial" button that leads to:
   - A: Email capture form ("We're in private beta. Enter email for early access.")
   - B: Calendly link ("Book a demo to get early access")

**Success metrics:**
| Metric | Minimum | Good | Great |
|--------|---------|------|-------|
| Page → Email/Demo | 3% | 5% | 10% |
| Email → Demo booked | 20% | 30% | 50% |

**Duration:** 2 weeks

**Traffic source:**
- Facebook group posts (100-200 visitors)
- Reddit posts (100-200 visitors)
- Direct outreach with landing page link (50-100 visitors)

**Decision point:**
- If <3% signup: Messaging or ICP is wrong. Interview more people.
- If 3-5% signup: Proceed with caution. More validation needed.
- If >5% signup: Green light to build MVP.

---

### Experiment 2: Fake Door Test

**Goal:** Measure demand for specific features

**Setup:**
1. On landing page, add feature preview cards with "Learn More" or "Get Notified"
2. Track clicks per feature
3. Show "Coming soon - enter email" modal when clicked

**Features to test:**
- Scheduling & dispatch
- Invoicing & payments
- Mobile worker app
- Customer portal
- Two-way SMS messaging
- Route optimization
- Inventory tracking

**Success metrics:**
- Most-clicked feature = highest priority for MVP
- Feature with <5% of clicks = consider cutting

**Duration:** 2 weeks (concurrent with Experiment 1)

**Decision point:**
- Top 3 clicked features become MVP scope
- Features with <10% interest get deprioritized

---

### Experiment 3: Price Sensitivity Test

**Goal:** Find optimal price point

**Setup:**
1. A/B test pricing on landing page:
   - A: $49/month (lower anchor)
   - B: $79/month (target)
   - C: $99/month (higher anchor)
2. Measure signup rate at each price point

**Success metrics:**
| Price | Expected signup rate |
|-------|---------------------|
| $49 | Baseline |
| $79 | 10-20% lower than $49 |
| $99 | 30-40% lower than $49 |

**Duration:** 2 weeks (need 100+ visitors per variant)

**Decision point:**
- If $79 converts within 20% of $49: Keep $79
- If $79 converts >30% worse: Consider $59 tier
- If $99 converts well: Consider raising prices later

---

### Experiment 4: Problem Interview Sprint

**Goal:** Validate problem severity and willingness to pay

**Setup:**
1. Book 15 discovery calls with ICP (from outreach)
2. Use interview script (see product/05-interview-template.md)
3. Do NOT pitch or demo - just learn

**Questions to answer:**
1. How do they currently manage scheduling? (Current solution)
2. What breaks most often? (Pain severity)
3. How much time/money does this cost them? (Pain quantification)
4. Have they tried software before? What happened? (Buying history)
5. If I had a magic wand, what would you want it to do? (Desired outcome)
6. What would you pay for that? (WTP signal)

**Success metrics:**
| Signal | Count needed |
|--------|--------------|
| "This is a real problem" | 12/15 (80%) |
| "I'm actively looking for a solution" | 8/15 (53%) |
| Willing to pay $79/month | 10/15 (67%) |
| Would pay more than $79/month | 5/15 (33%) |

**Duration:** 2 weeks

**Decision point:**
- If <60% say it's a real problem: Wrong ICP or wrong problem
- If <40% willing to pay $79: Price too high or value prop unclear
- If >67% willing to pay: Proceed with confidence

---

### Experiment 5: Competitor Switching Intent

**Goal:** Validate willingness to switch from current tools

**Setup:**
1. In discovery calls, ask specifically about current tools
2. For Jobber/Housecall Pro users, probe switching barriers

**Questions:**
1. What do you currently pay for [tool]?
2. What do you love about it?
3. What frustrates you?
4. Have you ever considered switching?
5. What would make you switch?

**Success metrics:**
| Segment | Target |
|---------|--------|
| "Actively looking to switch" | 30% of tool users |
| "Would switch for 50%+ savings" | 60% of tool users |
| "Locked in by data/contracts" | <20% of tool users |

**Duration:** Concurrent with Experiment 4

**Decision point:**
- If >30% actively looking: Competitor users are valid target
- If <30% looking but >50% would switch for savings: Lead with price comparison
- If >20% feel locked in: Emphasize data migration support

---

### Experiment 6: Founding Customer Commitment

**Goal:** Get 5-10 people to commit to paying before building

**Setup:**
1. Offer "founding customer" deal to validated prospects
2. Deal: 50% off for 12 months ($39/month) in exchange for:
   - Commit to annual prepay ($468 upfront)
   - Provide feedback weekly for first 2 months
   - Give a testimonial if satisfied

**Pitch script:**
> "I'm building this specifically for businesses like yours. I have 5 founding customer spots at 50% off for the first year - $39/month instead of $79. In exchange, I need you to prepay for the year and give me feedback weekly. You'll help shape what gets built. Interested?"

**Success metrics:**
| Metric | Target |
|--------|--------|
| Offers made | 20 |
| Verbal commits | 10 (50%) |
| Actually paid | 5 (25% of offers) |
| Revenue collected | $2,340 (5 x $468) |

**Duration:** 2 weeks (after experiments 1-4)

**Decision point:**
- If 5+ paid: Build the product
- If 3-4 paid: Proceed but validate more
- If <3 paid: Serious validation problem - revisit everything

---

## Validation Tracking Dashboard

### Weekly Scorecard

| Experiment | Week 1 | Week 2 | Week 3 | Week 4 | Target |
|------------|--------|--------|--------|--------|--------|
| Landing page visitors | | | | | 500+ |
| Email signups | | | | | 25+ (5%+) |
| Discovery calls completed | | | | | 15 |
| "Real problem" responses | | | | | 12+ |
| "Would pay $79" responses | | | | | 10+ |
| Founding customer commits | | | | | 5+ |
| Revenue collected | | | | | $2,340+ |

### Decision Framework

After 4 weeks, answer these questions:

**Green Light (Build MVP):**
- [ ] 5%+ landing page conversion
- [ ] 10+ people said they'd pay $79/month
- [ ] 5+ founding customers paid
- [ ] Clear top 3 features from fake door test

**Yellow Light (More Validation):**
- [ ] 3-5% landing page conversion
- [ ] 6-9 people said they'd pay $79/month
- [ ] 3-4 founding customers paid
- [ ] Feature priorities unclear

**Red Light (Pivot or Kill):**
- [ ] <3% landing page conversion
- [ ] <6 people willing to pay
- [ ] <3 founding customers paid
- [ ] Problem doesn't feel urgent to prospects

---

## Validation Interview Script

### Opening (2 min)
> "Thanks for taking the time. I'm building software for service businesses and want to make sure I'm solving real problems. This isn't a sales call - I just want to learn from your experience. Is it okay if I ask some questions and take notes?"

### Current State (5 min)
1. "Walk me through how you manage your day-to-day scheduling right now."
2. "How do you know where your workers are and what they're working on?"
3. "What about invoicing - how does that work?"

### Problem Exploration (5 min)
4. "What breaks most often in that process?"
5. "Can you tell me about the last time [problem] happened?"
6. "How much time would you say you spend on admin work each week?"

### Solution Attempts (3 min)
7. "Have you tried any software to help with this?"
8. "What happened with that? Why did/didn't it work?"
9. "What would you need to see in a tool to make it worth paying for?"

### Willingness to Pay (3 min)
10. "If I could wave a magic wand and fix [problem], what would that be worth to you?"
11. "What's your budget for software like this - monthly?"
12. "At $79/month for unlimited users, would that be a no-brainer, worth considering, or too expensive?"

### Closing (2 min)
> "This has been really helpful. I'm building something that might help with [problem]. Would you be interested in being a beta tester when it's ready? I'll give you a significant discount in exchange for feedback."

---

## Anti-Patterns to Avoid

1. **Don't validate with friends and family.** They'll tell you it's a great idea because they like you.

2. **Don't count "that's interesting" as validation.** Only count "I would pay for that" or actual payment.

3. **Don't ask "would you use this?"** Ask "would you pay $79/month for this?"

4. **Don't build features based on 1-2 requests.** Look for patterns across 10+ conversations.

5. **Don't spend more than 4 weeks validating.** At some point you need to ship and see if people buy.

---

## Key Insight

**The best validation is a credit card.** Everything else is a proxy.

If you can get 5 people to pay $468 upfront for something that doesn't exist yet, you have real validation. Everything else is just research.

---

*Next artifact: 07-marketing-metrics.md*
