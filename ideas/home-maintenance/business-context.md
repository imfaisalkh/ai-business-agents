# Business Context

*Fill this out before running any agents. This is the foundation for all agent outputs.*

## Project Identity

**Project Name:**
<!-- The name used throughout all artifacts (e.g., "FieldPulse", "InvoiceFlow", "BookingBuddy") -->

HomeCrew


**Tagline (optional):**
<!-- One-line description for marketing (e.g., "Simple scheduling for service businesses") -->

"Run your home service business without the chaos."

---

## The Problem

**What specific problem are you solving?**

Small home service businesses (1-10 employees) waste 8-10 hours/week on manual scheduling, paper-based job tracking, chasing invoices, and coordinating field workers via phone calls and texts. They lose approximately one full workday per week to low-value administrative tasks instead of billable work. When they try to adopt professional field service software like Jobber ($169-249/month) or ServiceTitan ($398+/month), they find these tools are overpriced for their team size, charge expensive per-user fees that penalize growth, and lock essential features like two-way client communication behind premium tiers.

**Who has this problem?**

- **Primary ICP:** Owner-operators of small home service businesses with 1-10 employees
- **Industries:** House cleaning, pest control, pool service, plumbing, HVAC, landscaping, home remodeling, handyman services, appliance repair
- **Business Profile:** $100K-$1M annual revenue, 50-500 jobs/month, mix of recurring and one-time customers
- **Demographics:** Often owner is the primary technician who also handles admin, non-technical, values simplicity over features

**How are they solving it today?**

1. **Spreadsheets + Calendar + Texts** (40%) - Google Sheets for customers, Google Calendar for scheduling, WhatsApp/text for team coordination, manual invoicing
2. **Jobber/Housecall Pro** (25%) - Paying $169-249/month, often on lowest tier with limited features, frustrated by costs
3. **Industry-specific legacy tools** (20%) - Old software like ServiceTitan, Service Autopilot that are complex and expensive
4. **Paper-based systems** (15%) - Literal paper job cards, carbon copy invoices, wall calendars

**Why is the current solution inadequate?**

- **Jobber costs ~$10,000/year** for a 10-person team - unsustainable for small service businesses
- **Per-user pricing punishes growth** - Adding a part-time helper costs $29/month even if they only clock in
- **Essential features locked behind expensive tiers** - Two-way client texting requires $249/month Grow plan
- **Overengineered for small teams** - Features designed for 50+ employee operations create complexity small teams don't need
- **Spreadsheet chaos** - No single source of truth, jobs fall through cracks, invoices get lost, no visibility into worker location
- **Seasonal businesses get burned** - Pay full price during slow months for tools they barely use

---

## Your Solution

**One-sentence description:**

We help small home service businesses (1-10 employees) manage jobs, workers, and invoices from one simple app so they can stop losing jobs to chaos and get paid faster.

**Key differentiator (pick ONE):**

**Price simplicity** - Flat $79/month for unlimited users (vs. $169-249+ with per-user fees from competitors). No feature gating, no surprises, no punishment for adding workers.

**Initial feature set (3-5 features max):**

1. **Job scheduling & dispatch** - Calendar view, drag-drop scheduling, worker assignment, real-time availability
2. **Customer portal** - Clients book services, view job status, see upcoming appointments, pay invoices online
3. **Mobile worker app** - Job details, navigation, job checklists, photo capture, time tracking, push notifications
4. **Invoicing & payments** - Generate invoices from completed jobs, send via email/SMS, accept online payments, automated reminders
5. **Two-way messaging** - SMS/email communication with customers (included at base price, not gated)

---

## Business Model

**How will you make money?**

Subscription (monthly/annual) with flat pricing - no per-user fees. Revenue enhancement through payment processing (2.9% + $0.30 per transaction).

**Target price point:**

- **Starter:** $49/month (up to 3 active workers, 100 jobs/month)
- **Professional:** $79/month (unlimited workers, unlimited jobs, all features)
- **Annual discount:** 2 months free (effectively $41-66/month)

**Why this price?**

- **50-70% cheaper than Jobber** for a 5-person team ($79 vs $169-249)
- **Undercuts Housecall Pro** ($79 vs $129 for Essential with 5 users)
- **Clear value:** If software saves 5 hours/week of owner time at $50/hour = $1,000/month value
- **Sustainable margin:** $79 x 1000 customers = $79K MRR, covers infrastructure + team of 2-3
- **Payment processing:** Additional 0.5-1% margin on payment volume adds revenue as customers grow

---

## Your Unfair Advantages

*Check all that apply and explain:*

- [x] **Domain expertise** - You've lived this problem
- [x] **Technical skills** - You can build it yourself
- [ ] **Existing audience** - You have distribution
- [x] **Unique insight** - You know something others don't
- [x] **Speed** - You can ship faster than incumbents

**Explanation:**

1. **Technical skills:** Full-stack development capability means building and iterating without contractor costs. Can ship MVP in weeks, not months.

2. **Unique insight:** Incumbents are stuck in per-user pricing models because that's how enterprise software works. Small service businesses operate differently - they have part-time workers, seasonal helpers, family members who help occasionally. Flat pricing removes the friction of "should I add this person to the system?"

3. **Speed:** Jobber, Housecall Pro, and ServiceTitan are large companies with slow release cycles. A focused indie product can ship features in days that take them quarters. Modern stack (Nuxt + Fastify + SQLite) means fast iteration.

4. **Domain exposure:** Understanding the home services market through research and direct conversations with service business owners reveals that most want "just enough" software - not enterprise feature bloat.

---

## Constraints & Preferences

**Budget for tools/marketing:** $500/month

**Time available:** 20 hours/week (nights/weekends, building while employed)

**Technical stack preference:**

Nuxt 4 (client-only SPA) + Fastify + SQLite/Drizzle + shadcn-vue. Monorepo structure. Mobile app via PWA initially (native later if validated). Deploy on Railway/Render for simplicity.

**Go-to-market preference:**

1. **Direct outreach via local directories** - Find service businesses on Yelp, Google Maps, Nextdoor and reach out
2. **Facebook/Reddit communities** - Home service business owner groups have 50K+ members
3. **Referral from early customers** - Service business owners talk to each other, network effects in local markets
4. **Content marketing** - "How to run a cleaning business" type SEO content that attracts target customers

---

## Success Criteria

**6-month goal:**

$3K MRR (40 paying customers at ~$75 average) with <5% monthly churn

**What does "validated" look like?**

- 10 customers paying full price ($79/month) without heavy discounts
- At least 3 customers who came via referral from other customers
- NPS > 40 from first 20 customers
- Customers actively using mobile app for field workers (not just admin portal)

---

*Last updated: January 28, 2026*
