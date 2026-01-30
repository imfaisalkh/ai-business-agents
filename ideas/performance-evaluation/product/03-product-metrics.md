# Product Metrics Dashboard

> **Purpose:** Track whether TeamPulse achieves SLC goals: Simple (easy to use), Lovable (users love it), Complete (nothing feels missing).
>
> **Fits in:** Set up in PostHog using Conversion Funnel from PRD (02). Review weekly.

## North Star Metric

**Weekly Active Users:** 0 (current) --> 100+ (target by Month 6)

**Definition:** A user who completed at least one of these actions in the past 7 days:
- Wrote or updated a manager review
- Completed a self-review
- Submitted peer feedback
- Viewed gap analysis
- Created or updated goals

**Why this metric:** It represents actual value delivery - users actively engaged in the review process, not just logged in.

---

## SLC Metrics (Simple, Lovable, Complete)

### SIMPLE Metrics
*Is the product easy to use?*

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Time to first review cycle created | - | <15 min | 🟡 |
| Time to complete one review (manager) | - | <20 min | 🟡 |
| Onboarding completion rate | - | >80% | 🟡 |
| Support tickets per 100 users | - | <3 | 🟡 |
| Error rate (user-facing) | - | <1% | 🟡 |
| Users who complete first action without help | - | >90% | 🟡 |

**Simple Score:** ___/100

### LOVABLE Metrics
*Do users love it?*

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| NPS score | - | >40 | 🟡 |
| Gap analysis feature adoption | - | >70% of reviews | 🟡 |
| PDF export usage | - | >30% of reviews | 🟡 |
| Organic referrals (users who invited others) | - | >15% | 🟡 |
| Unsolicited positive feedback | - | Weekly | 🟡 |
| "Wow" quotes captured | - | 3+ per month | 🟡 |

**Lovable Score:** ___/100

### COMPLETE Metrics
*Does it feel whole?*

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Review cycle completion rate | - | >80% | 🟡 |
| Self-review completion rate | - | >80% | 🟡 |
| Peer feedback response rate | - | >70% | 🟡 |
| Workflow abandonment rate | - | <15% | 🟡 |
| "Missing feature" complaints | - | <5% of feedback | 🟡 |
| Competitor switch-back rate | - | <5% | 🟡 |

**Complete Score:** ___/100

---

## Primary Metrics (Weekly)

### 1. Weekly Active Users (WAU)

- **Definition:** Unique users who performed a core action in past 7 days
- **Current:** 0
- **Target by Week 4:** 20
- **Target by Week 8:** 50
- **Target by Week 12:** 100
- **Trend:** → (tracking starts at launch)

| Week | WAU | Change | Notes |
|------|-----|--------|-------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

### 2. Review Cycle Completion Rate

- **Definition:** % of review cycles where all participants completed their reviews
- **Current:** 0%
- **Target:** >80%
- **Why 80%:** Industry benchmark is 60-70%. Our target shows we make reviews easy.

### 3. Gap Analysis Adoption (WOW Feature)

- **Definition:** % of completed reviews where manager viewed gap analysis
- **Current:** 0%
- **Target:** >70%
- **Why 70%:** This is our differentiator. If less than 70% use it, we're not delivering our core value.

### 4. Self-Review Completion Rate

- **Definition:** % of employees who complete self-review when requested
- **Current:** 0%
- **Target:** >80%
- **Industry benchmark:** 60% - we should beat this significantly

---

## Conversion Funnel

*From PRD Instrumentation Table*

```
Landing Page (100%)
    |
    v [Target: 15%]
Signup Started (15%)
    |
    v [Target: 67%]
Signup Completed (10%)
    |
    v [Target: 70%]
Team Members Added (7%)
    |
    v [Target: 85%]
First Cycle Created (6%)
    |
    v [Target: 85%]
First Review Written (5%)
    |
    v [Target: 60%]
Day 7 Active (3%)
    |
    v [Target: 50%]
Payment Completed (1.5-2%)
```

### Funnel Health Check

| Stage | Target Conversion | Actual | Status |
|-------|-------------------|--------|--------|
| Visit → Signup Started | 15% | - | 🟡 |
| Started → Completed | 67% | - | 🟡 |
| Completed → Team Added | 70% | - | 🟡 |
| Team Added → Cycle Created | 85% | - | 🟡 |
| Cycle Created → Review Written | 85% | - | 🟡 |
| Review Written → Day 7 Active | 60% | - | 🟡 |
| Day 7 Active → Paid | 50% | - | 🟡 |

**Biggest drop-off:** [TBD - track after launch]
**Hypothesis:** [TBD]
**Action:** [TBD]

---

## Health Metrics (Monitor Weekly)

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Activation rate (% who create first cycle) | - | >60% | 🟡 |
| Day 1 retention | - | >50% | 🟡 |
| Day 7 retention | - | >30% | 🟡 |
| Day 30 retention | - | >20% | 🟡 |
| Session duration | - | >5 min | 🟡 |
| Actions per session | - | >3 | 🟡 |

---

## Feature-Level Metrics

### Feature: Gap Analysis (WOW Feature)

- **Adoption:** % of completed reviews where gap analysis was viewed
- **Engagement:** % of gap analysis views that led to PDF export
- **Outcome:** Impact on review conversation quality (survey)

| Week | Adoption | PDF Exports | NPS of Gap Users |
|------|----------|-------------|------------------|
| W1 | - | - | - |
| W2 | - | - | - |
| W3 | - | - | - |
| W4 | - | - | - |

**Analysis:** [Update weekly - is gap analysis driving value?]

---

### Feature: Peer Feedback

- **Adoption:** % of review cycles with peer feedback enabled
- **Engagement:** Average peer responses per employee
- **Outcome:** Correlation with review completion rate

| Week | Cycles with Peers | Avg Responses | Response Rate |
|------|-------------------|---------------|---------------|
| W1 | - | - | - |
| W2 | - | - | - |
| W3 | - | - | - |
| W4 | - | - | - |

**Analysis:** [Update weekly]

---

### Feature: Goal Setting

- **Adoption:** % of users who create at least one goal
- **Engagement:** Goals per user, % updated quarterly
- **Outcome:** Correlation with review quality

| Week | Users with Goals | Goals per User | Update Rate |
|------|------------------|----------------|-------------|
| W1 | - | - | - |
| W2 | - | - | - |
| W3 | - | - | - |
| W4 | - | - | - |

**Analysis:** [Update weekly]

---

## Team-Level Metrics (For Customers)

*What we show customers in their dashboard*

| Metric | What It Shows | Why It Matters |
|--------|---------------|----------------|
| Cycle Completion Rate | % of participants who completed all required reviews | Measures process adoption |
| Self-Review Rate | % of employees who completed self-reviews | Measures employee engagement |
| Peer Feedback Rate | % of requested peer feedback submitted | Measures 360 coverage |
| Average Review Time | Time from cycle start to completion | Measures efficiency |
| Gap Analysis Usage | % of managers who viewed gap analysis | Measures coaching engagement |

---

## DO NOT TRACK (Vanity Metrics)

- Total registered users (use active users instead)
- Page views (use meaningful actions instead)
- Time on site without context (use time per task instead)
- Feature count shipped (use feature adoption instead)
- Total reviews written all-time (use reviews this week instead)
- "Engagement score" (too vague - track specific behaviors)

---

## Weekly Product Review

*Fill this out every Friday*

### Date: ___________

### SLC Health Check

| Dimension | This Week | Last Week | Trend | Action Needed |
|-----------|-----------|-----------|-------|---------------|
| **Simple** | 🟢/🟡/🔴 | - | ↑/→/↓ | |
| **Lovable** | 🟢/🟡/🔴 | - | ↑/→/↓ | |
| **Complete** | 🟢/🟡/🔴 | - | ↑/→/↓ | |

### Key Metrics This Week

| Metric | Target | Actual | vs Target |
|--------|--------|--------|-----------|
| WAU | | | |
| Review Completion | 80% | | |
| Gap Analysis Adoption | 70% | | |
| NPS | 40+ | | |

### This Week's Wins
- [ ] [Metric that improved]
- [ ] [User feedback highlight]
- [ ] ["Wow" moment observed]

### This Week's Concerns
- [ ] [Metric that declined or stalled]
- [ ] [User complaint theme]
- [ ] [SLC gap identified]

### Next Week's Focus
1. [One thing to improve the biggest drop-off]
2. [One experiment to run]
3. [One SLC improvement]

---

## Monthly Product Review

*Complete on the last day of each month*

### Month: ___________

### Key Results

| Metric | Start of Month | End of Month | Change |
|--------|----------------|--------------|--------|
| WAU | | | |
| Total Teams | | | |
| Paying Customers | | | |
| MRR | | | |
| NPS | | | |

### SLC Assessment

**Simple:**
- What's working: _______________
- What needs improvement: _______________
- Next month focus: _______________

**Lovable:**
- What's working: _______________
- What needs improvement: _______________
- Next month focus: _______________

**Complete:**
- What's working: _______________
- What needs improvement: _______________
- Next month focus: _______________

### Feature Performance

| Feature | Adoption % | Satisfaction | Keep/Improve/Remove |
|---------|------------|--------------|---------------------|
| Manager Reviews | | | |
| Self-Reviews | | | |
| Gap Analysis | | | |
| Peer Feedback | | | |
| Goal Setting | | | |
| Templates | | | |

### User Feedback Themes

**Top 3 praises:**
1. _______________
2. _______________
3. _______________

**Top 3 complaints:**
1. _______________
2. _______________
3. _______________

**Feature requests (count):**
1. _______________ (X requests)
2. _______________ (X requests)
3. _______________ (X requests)

### Decisions for Next Month

1. **Build:** _______________
2. **Improve:** _______________
3. **Stop:** _______________

---

## PostHog Dashboard Setup

### Dashboard 1: Conversion Funnel

**Charts to create:**
- Funnel: landing_page_view → signup_completed → first_cycle_created → first_review_written → payment_completed
- Trend: signup_completed over time
- Trend: payment_completed over time

### Dashboard 2: Engagement

**Charts to create:**
- WAU trend over time
- Feature adoption breakdown (pie chart)
- Session duration distribution
- Retention curve (Day 1, 7, 30)

### Dashboard 3: Feature Usage

**Charts to create:**
- gap_analysis_viewed count over time
- peer_feedback_submitted count over time
- goal_created count over time
- review_shared_to_employee count over time

### Dashboard 4: Quality

**Charts to create:**
- Error rate over time
- Page load times
- API response times
- NPS trend (if using surveys)

---

## Alerting Rules

Set up alerts in PostHog or monitoring tool:

| Alert | Condition | Notification |
|-------|-----------|--------------|
| Signup drop | <50% of last week signups | Slack #product |
| Error spike | >5% error rate | Slack #engineering |
| Activation drop | <50% activation rate | Slack #product |
| NPS below threshold | NPS <30 | Email founder |
