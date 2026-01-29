# Launch Summary: TeamPulse

*Generated on January 30, 2026 by CEO Orchestrator*

---

## The Idea in One Sentence

**TeamPulse delivers enterprise-grade 360-degree performance reviews - employee self-review, peer feedback, and gap analysis - to small teams (10-50 employees) at half the price of Lattice, with 15-minute setup.**

---

## What Was Generated

### Marketing Strategy (7 artifacts)

| # | Artifact | Key Insight |
|---|----------|-------------|
| 01 | ICP & Market Analysis | Engineering managers at 10-50 person tech companies, first-time managers |
| 02 | Positioning & Messaging | "Lattice features. Spreadsheet pricing. 15-minute setup." |
| 03 | GTM Strategy | LinkedIn outbound primary (50 connections/week), Content/SEO secondary |
| 04 | LinkedIn Outreach System | Complete sequences with 4 follow-up templates |
| 05 | Landing Page Strategy | Full copy with gap analysis as hero feature |
| 06 | Lead Validation Tactics | 3 experiments with pass/fail criteria |
| 07 | Marketing Metrics | North star: 5-10 qualified leads/week by Month 3 |

**Key insight:** The $5-11 pricing gap between basic tools (Small Improvements) and enterprise (Lattice) is our opportunity. Gap analysis is the "wow" feature that justifies premium over basic.

---

### Product Strategy (6 artifacts)

| # | Artifact | Key Insight |
|---|----------|-------------|
| 01 | Market Research | Small Improvements lacks gap analysis; Lattice is overkill for SMBs |
| 02 | PRD | SLC product with gap analysis as differentiator, 13 user stories |
| 03 | Development Tasks | 31 stories, 220 hours, 9 epics across 6 phases |
| 04 | Product Metrics | SLC metrics: Simple (15-min setup), Lovable (NPS>40), Complete (80% completion) |
| 05 | Interview Template | 30-minute script with qualification scoring |
| 06 | Pricing Strategy | $6-8 PEPM, single tier, 14-day free trial |

**MVP scope (5 core features):**
1. Manager reviews with ratings + feedback
2. Employee self-review on same criteria
3. Gap analysis dashboard (WOW feature)
4. Anonymous peer feedback (360)
5. Goal setting connected to reviews

**Build timeline:** 10-12 weeks (220 hours)

---

### Sales System (7 artifacts)

| # | Artifact | Key Insight |
|---|----------|-------------|
| 01 | Sales Process | 6-stage pipeline: Lead -> Discovery -> Demo -> Trial -> Close -> Won |
| 02 | Discovery Call Framework | 30-min script, BANT+ qualification, scoring 1-15 |
| 03 | Qualification Checklist | Score 12+ = HOT, 8-11 = WARM, <8 = Nurture |
| 04 | Objection Handling | 15+ objections with LAER responses |
| 05 | Follow-Up System | 4 sequences: Post-demo, Trial engaged, Trial inactive, Long-term nurture |
| 06 | Sales Metrics | Close rate target: 25-35%, sales cycle: 21 days |
| 07 | Scripts Library | Demo scripts, cold outreach, closing templates |

**Close rate target:** 25-35% trial-to-paid
**Average sales cycle:** 21 days

---

### Engineering Plan (5 artifacts)

| # | Artifact | Key Insight |
|---|----------|-------------|
| 01 | Architecture | Next.js 15 + Prisma + PostgreSQL + Clerk + shadcn/ui |
| 02 | Setup Guide | Complete bootstrap in 30 minutes |
| 03 | Implementation Tasks | 6 phases, 232 hours total |
| 04 | Code Templates | Copy-paste patterns for APIs, forms, analytics |
| 05 | Engineering Metrics | Ship velocity: 3-5 features/week target |

**Tech stack:**
- Frontend: Next.js 15 (App Router), React, Tailwind, shadcn/ui
- Backend: Next.js API routes, Prisma ORM
- Database: PostgreSQL (Supabase)
- Auth: Clerk
- Email: Resend
- Analytics: PostHog
- Payments: Stripe
- Hosting: Vercel

**Build timeline:** 10-12 weeks for SLC product

---

### Financial Plan (5 artifacts)

| # | Artifact | Key Insight |
|---|----------|-------------|
| 01 | Revenue Model | Target: $3-5K MRR by Month 6 (25-40 customers) |
| 02 | Unit Economics | LTV: $3,000+, CAC: <$200, LTV:CAC: 15:1+ |
| 03 | Burn & Runway | ~$200-400/month burn, break-even by Month 3-4 |
| 04 | Financial Metrics | Full KPI dashboard with MRR tracking |
| 05 | Fundraising Readiness | Recommendation: Bootstrap to profitability |

**Path to profitability:**
- Monthly burn: $200-400
- Break-even: 3-5 customers
- Target MRR: $3,000-5,000 by Month 6
- Recommendation: Bootstrap (can reach profitability without raising)

---

## 21-Day Launch Plan

### Week 1: Discovery & Validation
**Goal:** Validate the problem and ICP before building anything

**Monday-Wednesday: Market Research**
- [ ] Read `marketing/01-icp-market-analysis.md` completely
- [ ] Identify 50 people matching your ICP (engineering managers, 10-50 person companies)
- [ ] Research top 3 competitors deeply (Lattice, 15Five, Small Improvements)
- [ ] Screenshot their onboarding flows

**Thursday-Friday: Customer Conversations**
- [ ] Reach out to 20 ICPs using `marketing/04-linkedin-outreach.md` templates
- [ ] Book 5 discovery calls using `product/05-interview-template.md`
- [ ] Run calls, take notes, validate: Is gap analysis valuable? Will they pay $6-8 PEPM?

**Weekend: Refine Strategy**
- [ ] Update `marketing/02-positioning-messaging.md` based on learnings
- [ ] Adjust PRD features if assumptions were wrong
- [ ] Decision: Proceed with build or pivot?

---

### Week 2: Build Foundation + Outreach Ramp
**Goal:** Core technical foundation working + continuous customer conversations

**Monday-Tuesday: Project Setup**
- [ ] Follow `engineering/02-setup-guide.md` to bootstrap project
- [ ] Complete Phase 1 Foundation: Next.js + Prisma + Clerk auth
- [ ] Deploy to Vercel staging environment

**Wednesday-Friday: Core Database + Auth**
- [ ] Complete database schema (all models)
- [ ] Build authentication flow (sign-in, sign-up, onboarding)
- [ ] Create app shell with sidebar navigation
- [ ] Set up PostHog analytics

**Parallel: Outreach Every Day**
- [ ] Send 25 LinkedIn connection requests daily (from `marketing/04-outreach`)
- [ ] Follow up with Week 1 connections (value-first messages)
- [ ] Book 5 more discovery calls for Week 3
- [ ] Practice discovery call script with a friend

**Weekend: Landing Page**
- [ ] Build landing page following `marketing/05-landing-page.md`
- [ ] Deploy and test on mobile
- [ ] Set up waitlist capture (email signup)

---

### Week 3: Core Features + First Sales Conversations
**Goal:** Review cycle creation and manager reviews working

**Monday-Wednesday: Team + Review Cycles**
- [ ] Build Team management (add/edit team members)
- [ ] Build Review Cycle creation wizard (3 steps)
- [ ] Create review cycle API routes

**Thursday-Friday: Manager Reviews**
- [ ] Build review form with rating inputs
- [ ] Implement auto-save functionality
- [ ] Create review API routes

**Parallel: Sales Conversations**
- [ ] Send 25 LinkedIn connections daily
- [ ] Run 5-7 discovery calls
- [ ] Qualify prospects using `sales/03-qualification-checklist.md`
- [ ] Practice demo flow (even without full product)

**Weekend: Self-Reviews**
- [ ] Build employee self-review form
- [ ] Add employee dashboard view

---

### Week 4: Gap Analysis + Beta Launch
**Goal:** WOW feature complete + close first beta users

**Monday-Wednesday: Gap Analysis (THE WOW FEATURE)**
- [ ] Build gap calculation engine
- [ ] Create gap analysis dashboard (side-by-side ratings)
- [ ] Add color coding for gap severity
- [ ] Add coaching tips for large gaps

**Thursday-Friday: Peer Feedback + Polish**
- [ ] Build basic peer feedback form
- [ ] Add review sharing functionality
- [ ] Polish: empty states, error handling, loading states

**Parallel: Beta Launch**
- [ ] Invite 10 people from discovery calls to free beta
- [ ] Walk them through onboarding (screen share if possible)
- [ ] Watch them use it, take notes, fix major bugs

**Weekend: Production Prep**
- [ ] Fix critical bugs from beta feedback
- [ ] Update landing page with beta signup CTA
- [ ] Prepare for Week 5 paid launch

---

### Beyond Week 4: Launch & Scale

**Week 5-6: Complete Features**
- [ ] Add goal setting
- [ ] Create 6 pre-built templates
- [ ] Build email reminders (Resend)
- [ ] Add PDF export for gap analysis

**Week 7-8: Payments + First Customers**
- [ ] Integrate Stripe payments
- [ ] Convert beta users to paid ($6 early bird)
- [ ] Close first 5-10 paying customers

**Week 9-12: Growth**
- [ ] Scale LinkedIn outreach to 50/day
- [ ] Launch content/SEO strategy
- [ ] Target 25-30 customers ($3K MRR)

---

## Success Criteria

**By End of Week 4, you should have:**
- [ ] 10+ discovery calls completed
- [ ] MVP deployed with gap analysis working
- [ ] 5-10 beta users testing the product
- [ ] Landing page live with waitlist
- [ ] Clear understanding of ICP and positioning

**By End of Month 3, you should have:**
- [ ] 5+ paying customers
- [ ] $500+ MRR
- [ ] 25%+ trial-to-paid conversion
- [ ] Clear winning outreach message

**By End of Month 6, you should have:**
- [ ] 30-50 paying customers
- [ ] $3-5K MRR
- [ ] 80%+ review completion rate
- [ ] Cash-flow positive (or very close)

**Decision point after Month 6:**
- If >$5K MRR: Scale what's working (more outreach, content, maybe hire)
- If $3-5K MRR: Iterate on conversion and retention
- If <$3K MRR: Pivot or kill (re-examine ICP, problem, or solution)

---

## All Generated Artifacts

### Marketing (`ideas/performance-evaluation/marketing/`)
1. `01-icp-market-analysis.md` - ICP: Engineering managers at 10-50 person companies
2. `02-positioning-messaging.md` - "Lattice features. Spreadsheet pricing."
3. `03-gtm-strategy.md` - Primary: LinkedIn outreach (5-6 hrs/week)
4. `04-linkedin-outreach.md` - Complete sequences and templates
5. `05-landing-page.md` - Full page structure with copy
6. `06-lead-validation.md` - 3 experiments with pass/fail criteria
7. `07-marketing-metrics.md` - North star: Qualified leads/week

### Product (`ideas/performance-evaluation/product/`)
1. `01-market-research.md` - Competitor analysis, feature matrix
2. `02-prd.md` - **START HERE** - PRD at a Glance, wireframes, funnel
3. `03-tasks.md` - 220 hours across 31 stories
4. `04-product-metrics.md` - SLC metrics (Simple, Lovable, Complete)
5. `05-interview-template.md` - 30-min script with scoring
6. `06-pricing-strategy.md` - $6-8 PEPM, single tier

### Sales (`ideas/performance-evaluation/sales/`)
1. `01-sales-process.md` - 6-stage pipeline design
2. `02-discovery-call.md` - **PRACTICE THIS** - Full script with probes
3. `03-qualification-checklist.md` - BANT+ scoring system
4. `04-objection-handling.md` - 15+ objection responses
5. `05-followup-system.md` - 4 follow-up sequences
6. `06-sales-metrics.md` - Close rate, pipeline tracking
7. `07-scripts-library.md` - Demo, cold outreach, closing scripts

### Engineering (`ideas/performance-evaluation/engineering/`)
1. `01-architecture.md` - ADRs for tech stack decisions
2. `02-setup-guide.md` - **RUN THESE COMMANDS FIRST**
3. `03-implementation-tasks.md` - 6-phase implementation plan
4. `04-code-templates.md` - Copy-paste patterns
5. `05-engineering-metrics.md` - Ship velocity tracking

### Finance (`ideas/performance-evaluation/finance/`)
1. `01-revenue-model.md` - $3-5K MRR by Month 6
2. `02-unit-economics.md` - LTV:CAC 15:1+
3. `03-burn-runway.md` - ~$200-400/month burn
4. `04-financial-metrics.md` - Full KPI dashboard
5. `05-fundraising-readiness.md` - Recommendation: Bootstrap

---

## Pro Tips

1. **Don't build in isolation:** Have 1 customer call every day for first 30 days. Calls > code early on.

2. **Ship ugly but working:** Week 4 launch with rough edges beats perfect Week 12 launch. You can polish later.

3. **Gap analysis is your wedge:** Every demo, every call, every piece of content should mention gap analysis. It's what makes you different.

4. **Qualify ruthlessly:** 1 good-fit customer (15+ employees, budget, urgent timeline) > 10 "interesting but not now" leads.

5. **Track one metric per function:**
   - Marketing: Qualified leads/week
   - Product: Review completion rate
   - Sales: Close rate %
   - Engineering: Features shipped/week
   - Finance: MRR

6. **Kill fast:** If <5 customers by Week 8, don't push to Week 16. Pivot or kill.

---

## What to Do When Stuck

| Problem | Likely Cause | Solution |
|---------|--------------|----------|
| No one responds to outreach | ICP or messaging wrong | Re-run marketing artifacts, test new angles |
| People interested but don't buy | Qualification is weak | Focus on `sales/02-discovery-call` and `sales/03-qualification` |
| Customers sign up but don't use | Onboarding or core feature broken | User interviews, update PRD |
| Too slow to build | Scope too big | Cut to 3 core features max |
| Competitors seem better | Positioning unclear | Double down on gap analysis differentiation |

---

## Next Steps RIGHT NOW

1. **Read `product/02-prd.md`** - Understand the PRD at a Glance section (15 min)

2. **Read `sales/02-discovery-call.md`** - Practice the call script with a friend (30 min)

3. **Run `engineering/02-setup-guide.md`** - Bootstrap the project (1-2 hours)

4. **Send first 20 LinkedIn connections** using `marketing/04-outreach.md` templates (30 min)

**Total time investment today:** 2.5-3 hours
**What you'll have:** Project bootstrapped + first outreach sent + sales process internalized

---

## Key Numbers to Remember

| Metric | Target |
|--------|--------|
| Price | $6-8 per employee/month |
| ICP team size | 10-50 employees (sweet spot: 15-30) |
| Target customers | 30-50 by Month 6 |
| Target MRR | $3-5K by Month 6 |
| Build time | 10-12 weeks |
| Monthly burn | $200-400 |
| LTV:CAC ratio | 15:1+ |
| Trial-to-paid | 25-35% |
| Sales cycle | 21 days |

---

Good luck! You now have a complete business strategy across Marketing, Product, Sales, Engineering, and Finance - 30 artifacts total. The only thing left is execution.

**Your competitive advantage:** Gap analysis that transforms review meetings from monologues into coaching conversations. Every interaction with a prospect should reinforce this.

**Remember:** First 10 customers in 4 weeks, not perfect product in 6 months. Ship, learn, iterate.
