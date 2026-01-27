# Landing Page Strategy

*Generated for: Performance Evaluation Tool*

---

## Page Structure

### Hero Section

**Headline (Primary):**
> Performance Reviews That Don't Cost $11/Employee

**Subheadline:**
> Get self-reviews, peer feedback, and gap analysis at 50% less than Lattice. Built for teams of 15-50.

**CTA:** "Start Free Trial" (primary) | "Watch Demo" (secondary)

**Hero Visual:** Dashboard screenshot showing self-review vs manager review comparison (gap analysis)

**Social Proof Bar:**
> "Trusted by 25+ teams" | Star ratings | "Saves managers 30 min per review"

---

### Problem Section

**Header:** "Spreadsheets worked. Until they didn't."

**Pain Points (3 columns):**

| Icon | Pain | Description |
|------|------|-------------|
| Folder Chaos | **No structure** | Hunting for last quarter's feedback across 4 folders |
| Clock | **Hours wasted** | Chasing people for peer reviews, manual reminders |
| Blind Spot | **One-sided** | Managers review employees, but employees can't review themselves |

**Transition:** "Enterprise tools fix this. But at $11/employee, they're built for Fortune 500s, not your 25-person team."

---

### Solution Section

**Header:** "Enterprise features. Startup pricing."

**Feature Cards (4 columns):**

| Feature | Title | Description | Icon |
|---------|-------|-------------|------|
| Self-Review | **See how they see themselves** | Employees rate themselves. Compare to your ratings. Spot the gaps. | Mirror |
| Peer Feedback | **360-degree insights** | Automated peer requests. Anonymized feedback. No awkwardness. | Users |
| Goal Tracking | **Connect reviews to goals** | Set quarterly goals. Track progress. Reference in reviews. | Target |
| Templates | **Ready in 15 minutes** | Pre-built templates for Engineering, Product, Sales by level. | FileText |

---

### How It Works Section

**Header:** "Run your first review in 15 minutes"

**Steps:**

1. **Set up your team** (2 min)
   - Import from Slack, Google, or CSV
   - Assign managers and direct reports

2. **Choose a template** (3 min)
   - Pick from role-specific templates
   - Customize questions if needed

3. **Launch review cycle** (5 min)
   - Set timeline and deadlines
   - Auto-send invitations and reminders

4. **Analyze results** (5 min)
   - View gap analysis (self vs manager)
   - See aggregated peer feedback
   - Export for 1:1 conversations

**Visual:** 4-step horizontal flow with screenshots

---

### Social Proof Section

**Header:** "What managers are saying"

**Testimonial 1:**
> "We went from spreadsheet chaos to structured reviews in one afternoon. The gap analysis feature alone is worth it - I finally know where my reports and I see things differently."
>
> **- Sarah K., Engineering Manager at [Startup]** (25 employees)

**Testimonial 2:**
> "Lattice wanted $3,300/year for our 30-person team. This does everything we need for half the price."
>
> **- Michael R., Head of People at [Company]** (32 employees)

**Testimonial 3:**
> "My team actually fills out their self-reviews now because they know I'll see them. The peer feedback is anonymous so people are actually honest."
>
> **- David L., Product Manager at [Startup]** (18 employees)

**Logos:** Company logos of 5-6 customers (once available)

---

### Pricing Section

**Header:** "Simple pricing. No surprises."

**Pricing Card:**

```
┌─────────────────────────────────────────────┐
│              TEAM PLAN                       │
│                                             │
│         $7 / employee / month               │
│           (billed monthly)                  │
│                                             │
│         $6 / employee / month               │
│           (billed annually)                 │
│                                             │
├─────────────────────────────────────────────┤
│  Everything you need:                       │
│  ✓ Unlimited review cycles                  │
│  ✓ Self-review + Manager review             │
│  ✓ Peer feedback (360-degree)               │
│  ✓ Goal setting & tracking                  │
│  ✓ Pre-built templates by role/level        │
│  ✓ Gap analysis dashboard                   │
│  ✓ Historical review tracking               │
│  ✓ Export to PDF/CSV                        │
│  ✓ Email & Slack reminders                  │
│  ✓ Priority support                         │
├─────────────────────────────────────────────┤
│        [Start 14-Day Free Trial]            │
│         No credit card required             │
└─────────────────────────────────────────────┘
```

**Price Calculator:**
> Team size: [Slider: 10-100]
> Monthly cost: $XX | Annual cost: $XX (save 14%)

**Comparison Mini-Table:**

| Tool | Per Employee | 25-Person Team/Year |
|------|-------------|---------------------|
| Lattice | $11-16 | $3,300-4,800 |
| 15Five | $9-14 | $2,700-4,200 |
| **Us** | **$6-7** | **$1,800-2,100** |
| Small Improvements | $5-8 | $1,500-2,400* |

*\*Lacks self-review and peer feedback*

---

### FAQ Section

**Q: How is this different from Lattice?**
> Same core features (self-review, peer feedback, goals) at 50% lower cost. We don't have HRIS, engagement surveys, or enterprise compliance features - just what small teams actually use.

**Q: What if we already use spreadsheets?**
> You can import your existing team structure and historical reviews. Most teams are up and running in under an hour. We'll even help you migrate for free.

**Q: How does peer feedback stay anonymous?**
> Peer feedback is aggregated and anonymized. Employees see summary insights, not who said what. Managers can see patterns but not attribute specific feedback.

**Q: What templates are included?**
> We have templates for Engineering, Product, Sales, Customer Success, and Management - each with Junior, Mid, and Senior level variations. You can customize any template or build your own.

**Q: Can I try before I buy?**
> Yes! 14-day free trial, no credit card required. Run a real review cycle with your team before deciding.

**Q: What integrations do you support?**
> Slack (reminders), Google Workspace (SSO), and CSV import/export. HRIS integrations coming soon based on demand.

---

### Final CTA Section

**Header:** "Your team deserves better than spreadsheets"

**Subheader:** "Start your free trial and run your first review cycle today."

**CTA Button:** "Start Free Trial - No Credit Card"

**Trust Elements:**
- "14-day free trial"
- "No credit card required"
- "Cancel anytime"

---

## Technical Specifications

### Page Requirements

| Element | Specification |
|---------|--------------|
| Load time | <2 seconds |
| Mobile responsive | Required |
| Analytics | Plausible or GA4 |
| A/B testing | Built-in or Splitbee |
| Form handling | Native or Formspree |
| CMS | Optional (static fine for MVP) |

### Tracking Events

| Event | Description | Priority |
|-------|-------------|----------|
| `page_view` | Landing page loaded | High |
| `cta_click_hero` | Hero CTA clicked | High |
| `cta_click_pricing` | Pricing CTA clicked | High |
| `demo_video_play` | Demo video started | Medium |
| `pricing_calculator_used` | Slider moved | Medium |
| `faq_expanded` | FAQ question clicked | Low |
| `trial_started` | Trial signup completed | High |

### SEO Requirements

| Element | Content |
|---------|---------|
| Title | "Performance Reviews for Small Teams | [Product Name]" |
| Meta Description | "Run structured 360-degree reviews with self-review, peer feedback, and gap analysis. 50% cheaper than Lattice. Try free for 14 days." |
| H1 | "Performance Reviews That Don't Cost $11/Employee" |
| URL | /performance-review-software or / |
| Schema | SoftwareApplication, FAQPage |

---

## Wireframe (Text-Based)

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo]                              [Features] [Pricing] [Login]   │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   Performance Reviews That                    ┌─────────────────┐  │
│   Don't Cost $11/Employee                     │                 │  │
│                                               │   Dashboard     │  │
│   Get self-reviews, peer feedback,            │   Screenshot    │  │
│   and gap analysis at 50% less                │                 │  │
│   than Lattice.                               │                 │  │
│                                               └─────────────────┘  │
│   [Start Free Trial]  [Watch Demo]                                 │
│                                                                    │
│   ───────────────────────────────────────────────────────────────  │
│   "Trusted by 25+ teams" | ★★★★★ | "Saves 30 min per review"      │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│               Spreadsheets worked. Until they didn't.              │
│                                                                    │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│   │  No structure │  │ Hours wasted │  │  One-sided   │            │
│   │  Hunting for  │  │ Chasing peer │  │  No employee │            │
│   │  feedback     │  │ reviews      │  │  self-review │            │
│   └──────────────┘  └──────────────┘  └──────────────┘            │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│               Enterprise features. Startup pricing.                │
│                                                                    │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│   │Self-Review │ │   Peer     │ │   Goal     │ │ Templates  │     │
│   │Compare self│ │ Feedback   │ │ Tracking   │ │ Ready in   │     │
│   │vs manager  │ │ Anonymous  │ │ Quarterly  │ │ 15 minutes │     │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│            Run your first review in 15 minutes                     │
│                                                                    │
│   [1. Setup] ──> [2. Template] ──> [3. Launch] ──> [4. Analyze]   │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                   What managers are saying                         │
│                                                                    │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │ "We went from spreadsheet chaos to structured reviews..."   │  │
│   │ - Sarah K., Engineering Manager                             │  │
│   └────────────────────────────────────────────────────────────┘  │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                 Simple pricing. No surprises.                      │
│                                                                    │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │                     TEAM PLAN                               │  │
│   │               $7/employee/month                             │  │
│   │                                                             │  │
│   │  ✓ Self-review + Manager review                             │  │
│   │  ✓ Peer feedback (360-degree)                               │  │
│   │  ✓ Goal setting & tracking                                  │  │
│   │  ✓ Pre-built templates                                      │  │
│   │                                                             │  │
│   │              [Start Free Trial]                             │  │
│   └────────────────────────────────────────────────────────────┘  │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                    Frequently Asked Questions                      │
│                                                                    │
│   [+] How is this different from Lattice?                          │
│   [+] What if we already use spreadsheets?                         │
│   [+] How does peer feedback stay anonymous?                       │
│   [+] What templates are included?                                 │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│           Your team deserves better than spreadsheets              │
│                                                                    │
│                    [Start Free Trial]                              │
│              14-day free trial. No credit card.                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ [Logo]    [Features] [Pricing] [Blog] [Support]    [Twitter]       │
│           © 2026 [Company]. All rights reserved.   [LinkedIn]      │
└────────────────────────────────────────────────────────────────────┘
```

---

## A/B Tests to Run

### Test 1: Headline Variants

| Variant | Headline |
|---------|----------|
| A (Control) | "Performance Reviews That Don't Cost $11/Employee" |
| B | "Your Team Outgrew Spreadsheets. Your Budget Didn't Outgrow Itself." |
| C | "Run Your First 360-Degree Review in 15 Minutes" |

**Metric:** Trial signup rate

### Test 2: CTA Copy

| Variant | CTA |
|---------|-----|
| A (Control) | "Start Free Trial" |
| B | "Try Free for 14 Days" |
| C | "Get Started Free" |

**Metric:** CTA click rate

### Test 3: Social Proof Placement

| Variant | Placement |
|---------|-----------|
| A (Control) | Below hero |
| B | Above hero |
| C | Floating sidebar |

**Metric:** Scroll depth + trial signup rate

---

## Launch Checklist

- [ ] Domain purchased and configured
- [ ] SSL certificate active
- [ ] Analytics installed (Plausible/GA4)
- [ ] Meta tags and OG images set
- [ ] Mobile responsive tested
- [ ] Page speed <2 seconds
- [ ] Form submissions working
- [ ] Email notifications configured
- [ ] 404 page created
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] Cookie consent (if needed)
- [ ] Trial signup flow tested end-to-end

---

*Next artifact: 06-lead-validation.md*
