# Launch Summary: TeamPulse

*Generated on January 27, 2026*

---

## The Idea in One Sentence

**"Run structured 360-degree performance reviews with employee self-review, manager gap analysis, and peer feedback in 15 minutes—not 15 hours—for $6-8 PEPM (50% cheaper than Lattice)."**

---

## What Was Generated

### Marketing Strategy (7 artifacts)
- ICP & Market Analysis
- Positioning & Messaging
- GTM Strategy
- LinkedIn Outreach System
- Landing Page Strategy
- Lead Validation Tactics
- Marketing Metrics

**Key insight:** Engineering/product managers at 15-50 person tech companies are trapped between Google Docs chaos and $2K+/year enterprise tools. The $6-8 PEPM price point with gap analysis feature fills a massive market gap.

---

### Product Strategy (6 artifacts)
- Market Research & Competitor Analysis
- Product Requirements Document (with PRD at a Glance, MVP Funnel, Text Wireframes)
- Development Tasks (Epics, Stories, Tasks)
- Pricing Strategy
- Product Metrics Dashboard
- User Interview Template

**MVP scope:** 5 core features
1. Employee Self-Review with Manager Gap Analysis (side-by-side ratings comparison)
2. Anonymous Peer Feedback Aggregation (360-degree insights without manual work)
3. Role-Based Review Templates (Engineer, Manager, Sales Rep with Junior/Mid/Senior)
4. Goal Setting & Tracking (continuity between cycles)
5. Team Analytics Dashboard (completion rates, performance distribution, trends)

---

### Sales System (7 artifacts)
- Sales Process Design
- Discovery Call Framework
- Qualification Checklist (BANT+)
- Objection Handling Playbook
- Follow-Up System
- Sales Metrics
- Sales Scripts Library

**Close rate target:** 25%+ trial-to-paid conversion

**Sales cycle:** 7-14 days (discovery call → demo → trial → close)

---

### Engineering Plan (5 artifacts)
- Architecture Decision Record (Nuxt 4 + Vue 3 + PostgreSQL + Prisma)
- Project Setup Guide (15-minute bootstrap)
- Implementation Tasks (Phase 1-3 breakdown)
- Code Templates (API routes, components, utilities)
- Engineering Metrics

**Build timeline:** 20-24 weeks (5-6 months)
- Phase 1: Foundation (Weeks 1-6)
- Phase 2: Self-Review + Gap Analysis (Weeks 7-14)
- Phase 3: Peer Feedback + Analytics (Weeks 15-20)
- Phase 4: Polish + Beta (Weeks 21-24)

---

### Finance Strategy (5 artifacts)
- Revenue Model & Pricing
- Unit Economics (LTV, CAC, margins)
- Burn Rate & Runway
- Finance Metrics
- Fundraising Readiness

**Financial snapshot:**
- **Pricing:** $6-8 PEPM ($90-150/month for 15-person team)
- **Target Month 6:** $3-5K MRR (30-50 customers)
- **Target Month 12:** $7.5-10K MRR (50-70 customers, $90-120K ARR)
- **Unit economics:** $1,000 CAC, $2,040 LTV, 2.0x LTV:CAC (improve to 6.8x by Month 12)
- **Burn:** $82/month out-of-pocket (fully bootstrappable)
- **Path to profitability:** Cash flow positive by Month 3-4

---

## 21-Day Validation & Launch Plan

**IMPORTANT:** This is a validation-first approach. Don't start building until you've validated the market in Weeks 1-3.

### Week 1: Market Validation (0 Lines of Code)
**Goal:** Validate the problem exists and people will pay before building anything

**Monday-Wednesday: Research & Outreach Setup**
- [ ] Read `marketing/01-icp-market-analysis.md` completely (understand ICP deeply)
- [ ] Optimize LinkedIn profile (headline, about section, featured content)
- [ ] Identify 50 target ICPs on LinkedIn (Engineering/Product Managers, 15-50 employee companies)
- [ ] Join 2 communities (Rands Leadership Slack, Manager's Club)
- [ ] Draft 3 LinkedIn outreach message variations (from `marketing/04-outreach.md`)

**Thursday-Friday: First Conversations**
- [ ] Send 20 personalized LinkedIn connection requests
- [ ] Book 5 discovery calls with warm network or accepted connections
- [ ] Run discovery calls using `product/06-interview-template.md` questions
- [ ] Take detailed notes on pain points, willingness to pay, feature priorities

**Weekend: Synthesize Learnings**
- [ ] Review discovery call notes—do 3+ out of 5 confirm the pain?
- [ ] Price test: Did 3+ say "$6-8 PEPM is reasonable" when asked?
- [ ] Update positioning if messaging didn't resonate
- [ ] **Decision point:** If <3/5 showed buying intent, pivot ICP or problem before continuing

**Success criteria to proceed:**
- 3+ out of 5 calls confirmed painful problem
- 2+ said "I'd pay for this" or asked about pricing unprompted
- 1+ gave referrals to other managers

---

### Week 2: Build Demand (Still 0 Lines of Code)
**Goal:** Create waitlist demand and run more validation conversations

**Monday-Tuesday: Landing Page (No-Code)**
- [ ] Use Carrd, Webflow, or Vercel template to build 1-page landing site
- [ ] Copy headline, benefits, FAQ from `marketing/05-landing-page.md`
- [ ] Add email waitlist form (Mailchimp, ConvertKit free tier)
- [ ] Add demo booking link (Calendly free tier)
- [ ] Deploy to custom domain ($12/year) or subdomain

**Wednesday-Friday: Scale Outreach**
- [ ] Send 30 more LinkedIn connection requests (use winning message from Week 1)
- [ ] Follow up with Week 1 connections (Day 3 message: curiosity question)
- [ ] Post 3x on LinkedIn (behind-the-scenes, customer insight, contrarian take)
- [ ] Book 10 discovery calls for Week 3

**Weekend: Validate Pricing & Features**
- [ ] Run 5 discovery calls (total 10 by end of Week 2)
- [ ] Test pricing explicitly: "If this cost $6-8 per employee per month, gut reaction?"
- [ ] Validate top 3 features from PRD (gap analysis, peer feedback, templates)
- [ ] Collect 10+ email signups on waitlist

**Success criteria to proceed:**
- 10+ discovery calls completed (cumulative)
- 6+ out of 10 showed buying intent ("I'd pay" or "When can I buy?")
- 3+ committed to paid beta (even $1/user = strong signal)
- 10+ waitlist signups

---

### Week 3: Pre-Sell Before Building
**Goal:** Get paid commitments before writing code

**Monday-Wednesday: Pre-Sales Push**
- [ ] Email all warm leads: "Beta launching in 60 days—$1/user for 3 months, then $6-8. Interested?"
- [ ] Offer "Founding Customer" deal: $4 PEPM for life if they commit by Friday
- [ ] Run 10 more discovery calls with qualified leads
- [ ] Track commitments in Notion/Airtable (Name, Company, Employees, Commitment Level)

**Thursday-Friday: Decision Point**
- [ ] Review commitments: Do you have 3-5 paying customers lined up?
- [ ] If YES → Start building (proceed to Month 2-6 build phase)
- [ ] If NO → Pivot ICP, features, or pricing based on objections

**Weekend: Build Plan (If Validated)**
- [ ] Read `engineering/02-setup-guide.md` completely
- [ ] Set up development environment (Nuxt 4, PostgreSQL, Prisma)
- [ ] Create GitHub repo
- [ ] Run first `npm run dev` and see "Hello World"

**Success criteria to BUILD:**
- 3-5 customers committed to paid beta ($1-4 PEPM for 3 months)
- Clear understanding of MVP features (from 20+ discovery calls)
- Validated pricing ($6-8 PEPM doesn't scare people away)
- Waitlist of 20-30 additional prospects

---

## Months 2-6: Build & Launch Phase

*If Week 1-3 validation succeeded, proceed with this timeline:*

### Month 2-3: Phase 1 Foundation (Weeks 5-12)
- [ ] Follow `engineering/03-implementation-tasks.md` Phase 1
- [ ] Auth (email/password + Google OAuth)
- [ ] Team setup (Slack import OR CSV upload)
- [ ] Database schema + Prisma migrations
- [ ] **Parallel:** Continue outreach (25 connections/week, 5 calls/week)
- [ ] **Goal:** Foundation complete, 10 more customers committed

### Month 4-5: Phase 2 Self-Review + Gap Analysis (Weeks 13-20)
- [ ] Review cycle wizard (name, template, team, deadline, launch)
- [ ] Employee self-review form (star ratings + reflections)
- [ ] **Gap analysis view** (CORE DIFFERENTIATOR—side-by-side ratings)
- [ ] Manager review form (ratings, comments, goals)
- [ ] Email + Slack notifications
- [ ] **Parallel:** Nurture beta customers, share progress screenshots
- [ ] **Goal:** MVP usable for 1 review cycle end-to-end

### Month 6: Phase 3 Peer Feedback + Beta Launch (Weeks 21-24)
- [ ] Peer feedback request + form (anonymous)
- [ ] Aggregate peer responses (remove identifying info)
- [ ] Team analytics dashboard (completion, distribution, insights)
- [ ] Polish: empty states, error handling, mobile responsive
- [ ] **Beta launch:** Invite 5-10 beta customers to run first review cycle
- [ ] Walk them through setup (screen share if needed)
- [ ] Collect feedback, fix critical bugs

**Beta success criteria:**
- 80%+ employee self-review completion
- 70%+ peer feedback participation
- 3+ beta customers say "I'd pay full price for this"
- <5 P0 bugs identified

---

### Month 7: Public Launch
- [ ] Product Hunt launch (prepare screenshots, video, copy)
- [ ] Email waitlist (50-100 people): "We're live—start your 14-day trial"
- [ ] LinkedIn announcement post + 3 customer testimonials
- [ ] Activate sales process (convert beta → paid, new trials → demos)
- [ ] **Goal:** 30 paying customers, $3-5K MRR

---

## Success Metrics (Month 6 Checkpoints)

**If you hit these by Month 6, you have product-market fit:**

- [ ] **$3-5K MRR** (30-50 paying customers)
- [ ] **80%+ employee self-review completion rate** (product works)
- [ ] **70%+ peer feedback participation** (feature is valuable)
- [ ] **25%+ trial-to-paid conversion** (pricing is right)
- [ ] **<5% monthly churn** (customers see value)
- [ ] **NRR >100%** (team growth offsets churn)
- [ ] **20+ qualified leads in pipeline** (sales engine working)

**If you DON'T hit these:**
- **<$2K MRR:** Sales process broken, ICP wrong, or pricing too high
- **Self-review completion <70%:** UX is confusing or employees don't see value
- **Trial-to-paid <15%:** Product doesn't solve problem or price is wrong
- **Churn >7%:** Product-market fit not achieved, pause growth and fix product

**Decision framework:**
- **5+ green checkmarks:** Scale (hire, increase marketing spend, expand ICP)
- **3-4 green checkmarks:** Iterate (fix weak areas, don't scale yet)
- **<3 green checkmarks:** Pivot or kill (fundamental assumptions are wrong)

---

## Next Steps RIGHT NOW (Today)

**Don't read all 30 files today.** Start with these 4 actions:

### 1. Read the PRD (30 min)
**File:** `product/02-prd.md` (focus on "PRD at a Glance" and text wireframes)

**Why:** Understand what you're building and why. The gap analysis feature is your differentiator—internalize it.

### 2. Practice the Discovery Call (15 min)
**File:** `sales/02-discovery-call.md`

**Action:** Read the script out loud. Role-play with a friend. The discovery call is where you learn if this idea has legs.

### 3. Send 20 LinkedIn Connections (30 min)
**File:** `marketing/04-linkedin-outreach.md`

**Action:** Find 20 Engineering/Product Managers at 15-50 person companies. Send personalized connection requests using Template A or B.

### 4. Book 5 Discovery Calls This Week (15 min)
**Action:** Message warm network or accepted LinkedIn connections. Use Calendly link. Aim for 5 calls by Friday.

---

## All Generated Artifacts (30 Total)

### Marketing (`marketing/`)
1. `01-icp-market-analysis.md` - ICP: Engineering/Product Managers, 15-50 employees, tech startups
2. `02-positioning-messaging.md` - One-liner: "360-degree reviews for $6-8 PEPM, 50% cheaper than Lattice"
3. `03-gtm-strategy.md` - Primary channel: LinkedIn outreach (founder-led)
4. `04-linkedin-outreach.md` - 3-message sequence + connection request templates
5. `05-landing-page.md` - Headline, benefits, FAQ, CTA structure
6. `06-lead-validation.md` - 3 validation experiments (message-market fit, discovery calls, community)
7. `07-marketing-metrics.md` - North star: 3-5 qualified leads/week

### Product (`product/`)
1. `01-market-research.md` - Competitors: Lattice ($11-16), Small Improvements ($5-8), Google Docs (free)
2. `02-prd.md` - **START HERE** (MVP: 5 features, gap analysis is differentiator)
3. `03-tasks.md` - 24-week build timeline (Phase 1-3 + polish)
4. `04-pricing-strategy.md` - $6 PEPM (Starter), $7 PEPM (Growth), Custom (Enterprise)
5. `05-product-metrics.md` - North star: Weekly Active Teams (WATs)
6. `06-interview-template.md` - 13 discovery call questions (foundation + validation)

### Sales (`sales/`)
1. `01-sales-process.md` - 7-14 day sales cycle (outreach → discovery → demo → trial → close)
2. `02-discovery-call.md` - **PRACTICE THIS** (15-20 min call structure + qualification scorecard)
3. `03-qualification-checklist.md` - BANT+ framework (Budget, Authority, Need, Timeline, Fit)
4. `04-objection-handling.md` - Top 10 objections + responses ("Too expensive" → ROI framing)
5. `05-followup-system.md` - Email sequences (trial nurture: Day 0, 3, 7, 12, 14)
6. `06-sales-metrics.md` - North star: 2-3 closed-won deals/month by Month 6
7. `07-scripts-library.md` - Email templates, call scripts, one-liners

### Engineering (`engineering/`)
1. `01-architecture.md` - Stack: Nuxt 4 + Vue 3 + PostgreSQL + Prisma (database schema included)
2. `02-setup-guide.md` - **RUN THESE COMMANDS FIRST** (15-min bootstrap)
3. `03-implementation-tasks.md` - Phase 1-4 breakdown (103-130 days = 5-6 months)
4. `04-code-templates.md` - API routes, Vue components, utilities (copy-paste ready)
5. `05-engineering-metrics.md` - North star: 1-2 features shipped/week

### Finance (`finance/`)
1. `01-revenue-model.md` - $6-8 PEPM, 15% annual discount, Stripe payments
2. `02-unit-economics.md` - CAC $1,000, LTV $2,040, 2.0x ratio (improve to 6.8x)
3. `03-burn-runway.md` - Burn $82/month (out-of-pocket), cash flow positive Month 3
4. `04-finance-metrics.md` - North star: $7.5K MRR by Month 12 ($90K ARR)
5. `05-fundraising-readiness.md` - Recommendation: Bootstrap to $100K ARR, then decide

---

## Pro Tips for Execution

1. **Customer conversations every day:** 1 discovery call/day for first 30 days = 30 data points. You'll know if this idea works by Day 20.

2. **Ship ugly but working:** Week 20 launch with rough edges beats perfect Week 30 launch. Beta customers forgive bugs if the core value (gap analysis) works.

3. **Qualify ruthlessly:** 1 good-fit customer (has budget, urgency, authority) > 10 "interesting" leads. Use `sales/03-qualification-checklist.md` religiously.

4. **Track one metric per function:**
   - Marketing: Qualified leads/week (target: 3-5)
   - Product: Employee self-review completion rate (target: 80%+)
   - Sales: Trial-to-paid conversion (target: 25%+)
   - Engineering: Features shipped/week (target: 1-2)
   - Finance: MRR growth rate (target: 20-30%/month)

5. **Kill fast:** If <5 customers by Week 8 of validation, don't push to Week 16. Pivot ICP, problem, or features—or kill and move to next idea.

---

## What to Do When Stuck

**No one responds to outreach (Week 1-2):**
→ Your ICP or messaging is wrong. Re-read `marketing/01-icp-market-analysis.md` and tighten targeting. Try adjacent ICP (agencies instead of startups).

**People interested but don't buy (Week 3-6):**
→ Qualification is weak or pricing is wrong. Re-run `sales/03-qualification-checklist.md` on next 10 calls. Test $5 PEPM if $6-8 is too high.

**Customers sign up but don't use product (Month 7+):**
→ Onboarding or core feature is broken. Watch 3 customers onboard (screen share). Fix top friction point immediately.

**Too slow to build (Month 3-5):**
→ Cut scope. Re-read `product/02-prd.md` and cut to 3 features max (gap analysis, self-review, templates). Ship peer feedback in Month 7.

**Competitors seem better (anytime):**
→ Find your differentiation wedge. Review `product/01-market-research.md` Strategic Opportunities. You win on gap analysis + price, not feature breadth.

---

## Final Pep Talk

You now have 30 artifacts, a 21-day validation plan, and a 6-month build timeline. **The only thing left is execution.**

Most founders fail not because they picked the wrong idea, but because they:
1. **Built before validating** (Weeks 1-3 prevent this)
2. **Gave up too early** (20 conversations isn't enough—do 50)
3. **Didn't talk to customers** (1 call/day = 30 insights/month)
4. **Scaled before PMF** (Don't hire or run ads until Month 6 metrics hit)

**Your advantages:**
- Low burn ($82/month = can run for years)
- Clear ICP (managers at 15-50 person companies)
- Strong differentiation (gap analysis at $6-8 PEPM)
- Fast validation path (20 calls in 2 weeks tells you yes/no)

**Start today. Send 20 LinkedIn connections. Book 5 calls. Don't read another artifact until you've talked to 10 customers.**

Good luck!

---

*Generated by CEO Orchestrator on January 27, 2026*
