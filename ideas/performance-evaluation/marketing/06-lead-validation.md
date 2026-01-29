# Lead Validation Tactics

> **Purpose:** Tests whether your ICP and messaging are right before scaling. Fail fast, learn fast.
>
> **Fits in:** Validates ICP (01) and Positioning (02) assumptions. Feeds learnings back to update all artifacts.

## Validation Goals

### Hypothesis to Test

**Primary Hypothesis:**
Engineering managers and HR leaders at 10-50 person companies will pay $6-8 per employee/month for performance review software that includes self-review, peer feedback, and gap analysis - features currently only available at $11+ PEPM enterprise tools.

**Secondary Hypotheses:**
1. First-time managers feel more pain than experienced managers (ICP refinement)
2. Q4/Q1 review season creates urgency that drives faster purchase decisions
3. "Self-review with gap analysis" resonates more than "360-degree feedback" as positioning
4. Engineering managers are easier to convert than HR generalists (channel efficiency)

### Success Criteria

| Signal | Pass Threshold | What It Means |
|--------|----------------|---------------|
| LinkedIn reply rate | >20% | Messaging resonates with ICP |
| Discovery call booking | >25% of conversations | Problem is real and urgent |
| "I'd pay for this" | 6+ out of 10 calls | Willingness to pay validated |
| Unprompted referrals | 2+ names given per 10 calls | Strong word-of-mouth potential |
| Trial signups | 10+ in first month | Product-channel fit |
| Trial-to-paid | 25%+ conversion | Value prop validated |

### Fail Criteria

| Signal | Fail Threshold | Action |
|--------|----------------|--------|
| LinkedIn reply rate | <10% after 50 messages | Pivot messaging or ICP |
| Discovery calls | <3 booked after 30 conversations | ICP isn't urgent enough |
| "Interesting, but..." | 7+ out of 10 calls | Problem isn't painful enough |
| No referrals | 0 names after 10 calls | Not a "must-have" product |
| Trial signups | <3 in first month | Landing page or channel broken |
| Trial-to-paid | <15% conversion | Pricing or product issue |

## Unified Customer Conversation Framework

*Core questions used across Marketing validation, Product interviews, and Sales discovery*

### Foundation Questions (All Conversations)

**1. Current State:**
"Walk me through the last time you ran performance reviews. What did that process look like?"

*Listen for:* Tools used, time spent, frustrations mentioned, who was involved

**2. Pain Quantification:**
"How much time does review season cost you and your team? And what's the cost when reviews don't happen or go poorly?"

*Listen for:* Specific hours/days mentioned, downstream impacts (retention, legal, morale)

**3. Failed Solutions:**
"What have you tried to solve this? Spreadsheets, other tools, templates? Why didn't they stick?"

*Listen for:* Past purchases, reasons for abandonment, feature gaps, price sensitivity signals

**4. Trigger Events:**
"When did reviews become a problem for you? What triggered you to start thinking about this?"

*Listen for:* Team growth, bad experience, compliance pressure, employee feedback

**5. Decision Process:**
"If you found a solution today, who else would need to be involved in the decision? What would the process look like?"

*Listen for:* Buying authority, stakeholders, budget approval process, timeline

### Marketing Lens (Validation Focus)

**Emphasis:** Problem validation and willingness to pay

**Additional Probes:**
- "When I say 'performance review software,' what comes to mind? What category does this fall into for you?"
- "What would you Google if you were looking for a solution?"
- "How much do you think a tool like this should cost?"
- "If I could solve [their main pain] for $X/month, would that be interesting?"

**Success Signal:** Unprompted request for pricing, demo, or "when can I try it?"

### Product Lens (Workflow Understanding)

*See `product/05-interview-template.md` for detailed workflow questions*

**Emphasis:** User journey, feature priorities, integration needs

**Additional Probes:**
- "Walk me through exactly how you'd use this on a typical review cycle day"
- "What tools would this need to connect with?"
- "Which feature matters most: self-review, peer feedback, or goal tracking?"

### Sales Lens (Qualification & Closing)

*See `sales/02-discovery-call.md` for qualification scorecard*

**Emphasis:** Budget, authority, timeline, success criteria

**Additional Probes:**
- "What's your budget for people/HR tools?"
- "When's your next review cycle? What needs to happen before then?"
- "What would success look like 6 months after implementing this?"

## Validation Experiments

### Experiment 1: Message-Market Fit (Week 1-2)

**Method:** Send 50 personalized LinkedIn messages to ICP using 3 different message variations

**Sample size:** 50 messages (split A/B/C)

**Time to run:** 2 weeks

**Message Variations:**
- A: Problem-focused ("Struggling with review chaos?")
- B: Solution-focused ("360-reviews without enterprise pricing")
- C: Social proof ("How 20-person teams run better reviews")

**Tracking:**

| Variation | Sent | Accepts | Accept Rate | Replies | Reply Rate | Calls Booked |
|-----------|------|---------|-------------|---------|------------|--------------|
| A | 17 | | | | | |
| B | 17 | | | | | |
| C | 16 | | | | | |

**Pass criteria:**
- 30%+ accept rate overall
- 20%+ reply rate on winning variation
- 50%+ positive sentiment (vs "not interested" or "we're fine")
- 3+ calls booked

**Fail criteria:**
- <15% accept rate (ICP wrong or targeting too broad)
- <10% reply rate on best variation (messaging doesn't resonate)
- Majority responses: "we don't have this problem" (problem not painful)

**Actions based on results:**
- If A wins: Lead with pain in all messaging
- If B wins: Feature/price positioning is strongest
- If C wins: Build social proof before scaling
- If all fail: Interview 5 rejectors to understand why

### Experiment 2: Value Proposition Resonance (Week 2-4)

**Method:** 10 x 30-minute customer discovery calls

**Sample size:** 10 calls with qualified ICP

**Time to run:** 2-3 weeks

**Call Structure:**
1. Background (5 min): Role, team size, review history
2. Current process (10 min): Foundation questions above
3. Feature prioritization (10 min): Which features matter most
4. Pricing reaction (5 min): Willingness to pay test

**Feature Prioritization Exercise:**
"I'm going to list 5 features. Rank them 1-5 based on what would make the biggest difference for you."
- Employee self-review with gap analysis
- Anonymous peer feedback aggregation
- Goal setting and tracking tied to reviews
- Pre-built role-specific templates
- Team analytics dashboard

**Pricing Test:**
"A tool with [their top 3 features] for $6 per employee per month - is that something you'd consider? Why or why not?"

**Scoring Each Call:**

| Signal | Score |
|--------|-------|
| "I'd pay for this" or asks about pricing | +2 |
| Offers referral names unprompted | +2 |
| Books follow-up meeting | +2 |
| "Interesting but not now" | +1 |
| "Let me think about it" | 0 |
| "We're fine with spreadsheets" | -1 |
| "Not really a problem for us" | -2 |

**Pass criteria:**
- Average score > +1 across 10 calls
- 6+ say "I'd pay for this" or ask about pricing
- 2+ offer referral names
- Clear feature priority emerges (one feature ranked #1 by 5+ people)

**Fail criteria:**
- Average score < 0
- 0 people offer referrals
- No clear feature priority (all features equally "nice to have")
- Majority say "not really a problem"

### Experiment 3: Landing Page Conversion (Week 3-5)

**Method:** Drive 200 visitors to landing page from LinkedIn outreach and measure conversion

**Sample size:** 200 unique visitors

**Time to run:** 3 weeks

**Traffic sources:**
- LinkedIn profile link clicks
- Direct shares in conversations
- Content post links

**Funnel tracking:**

| Stage | Target | Actual |
|-------|--------|--------|
| Visitors | 200 | |
| Scroll to pricing | 60% | |
| Click CTA | 15% | |
| Start trial/signup | 5% | |
| Complete onboarding | 3% | |

**Pass criteria:**
- 5%+ visitor-to-signup conversion (10+ signups from 200 visitors)
- 60%+ scroll to pricing (message keeps them reading)
- Qualitative feedback: "this is exactly what I need"

**Fail criteria:**
- <2% conversion (landing page broken or messaging off)
- <30% scroll to pricing (above-fold not compelling)
- High bounce rate with short time on page (<30 seconds average)

## Signal Tracking

### Strong Signals (Act On These)

| Signal | Meaning | Action |
|--------|---------|--------|
| "When can I buy?" asked unprompted | High urgency, ready buyer | Fast-track to trial, close quickly |
| Referral names offered | Strong advocate potential | Ask for intro, prioritize relationship |
| Specific budget mentioned | Qualified buyer | Move to pricing discussion |
| "We were just talking about this" | Perfect timing | Strike while hot, book next step same call |
| Email sent to boss during call | Internal champion | Arm them with info to sell internally |

### Weak Signals (Monitor, Don't Celebrate)

| Signal | Meaning | Action |
|--------|---------|--------|
| "This is interesting" | Polite, not urgent | Probe for urgency: "What would make this a priority?" |
| "Send me more info" | Dodge, likely dead | Send info, add to nurture, don't count as qualified |
| "Let me think about it" | No urgency | Set specific follow-up: "Can we reconnect Tuesday?" |
| High open/click rates | Curiosity, not intent | Focus on converting clicks to conversations |

### Red Signals (Investigate or Pivot)

| Signal | Meaning | Action |
|--------|---------|--------|
| "We already solved this" | Problem not universal | Ask how, understand what "solved" means to them |
| "Not a priority" consistently | Problem not painful | Consider different ICP or different problem |
| Ghost after positive call | No real intent | Test with smaller asks, assume no until proven |
| Price objections at $6/employee | Too expensive for segment | Test lower price or different ICP with more budget |

## Red Flags (Kill Signals)

When to seriously consider killing/pivoting the idea:

- [ ] No one responds after 50+ outreach attempts (message AND ICP failure)
- [ ] People say "interesting" but won't commit 15 min for call (no urgency)
- [ ] 8+ out of 10 calls: "we're fine with spreadsheets" (problem not painful enough)
- [ ] No budget even from "qualified" leads (market can't pay)
- [ ] Can't explain value in <30 seconds without confusion (positioning broken)
- [ ] Competitors mentioned as "good enough" in majority of calls (no differentiation)
- [ ] 0 referrals offered after 15+ calls (not word-of-mouth worthy)
- [ ] Every call requires heavy education on why reviews matter (market not ready)

### Kill Decision Framework

After 4 weeks of validation, answer these honestly:

| Question | Yes | No |
|----------|-----|-----|
| Did 5+ people say "I'd pay for this"? | Continue | Investigate |
| Did anyone ask "when can I start"? | Continue | Investigate |
| Did you get 2+ referrals unprompted? | Continue | Investigate |
| Is reply rate >15%? | Continue | Pivot messaging |
| Is call booking rate >20%? | Continue | Pivot ICP |

**Scoring:**
- 5 Yes: Full speed ahead
- 3-4 Yes: Continue with iterations
- 1-2 Yes: Serious pivot needed
- 0 Yes: Kill or major pivot

## Weekly Validation Review

### Questions to Answer Every Friday

1. **What's our reply rate this week?** ___% (Target: >20%)

2. **How many discovery calls did we have?** ___ (Target: 5+/week)

3. **How many "I'd pay for this" responses?** ___ out of ___ calls

4. **What's the #1 objection we're hearing?**
   _________________________________

5. **What feature do people ask about most?**
   _________________________________

6. **Did anyone offer referrals this week?** Yes / No
   If yes, did we follow up? Yes / No

7. **Based on this week, should we:**
   - [ ] Stay the course
   - [ ] Iterate messaging
   - [ ] Iterate ICP targeting
   - [ ] Iterate feature priority
   - [ ] Consider pivot

8. **One thing to test next week:**
   _________________________________
