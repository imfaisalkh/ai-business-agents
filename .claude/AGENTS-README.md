# Claude Native Agents

This directory contains automated Claude native agents for generating complete SaaS business strategies.

## Recent Changes (v2.1)

### Major Update
- **CEO Orchestrator** (renamed from Launch Orchestrator) - Now reflects its true role as CEO-level coordinator of all 5 departments

### New Features
- **Bootstrap Finance Agent** - Complete financial planning with revenue projections, unit economics, burn rate tracking
- **Pricing Strategy Module** - Added to Product Manager (artifact #6) with comprehensive pricing model, tiers, and psychology
- **Unified Customer Conversation Framework** - Shared foundation questions across Marketing, Product, and Sales agents

### Improvements
- **Eliminated Overlaps** - Removed competitor analysis duplication (now only in Product)
- **Unified Task Management** - Engineering now references Product's tasks instead of recreating them
- **Better Dependencies** - Finance agent leverages pricing and marketing metrics for accurate modeling

### Stats
- Total artifacts: 30 (up from 24)
- Agents: 6 (added Bootstrap Finance)
- Reduced duplication: ~40% less overlap between agents

## Quick Start

### Step 1: Create New Idea
```bash
npm run new-idea my-saas-idea
```

### Step 2: Fill Business Context
Edit `ideas/my-saas-idea/business-context.md` with your business details.

### Step 3: Generate Strategy
```
@ceo-orchestrator generate complete business strategy for my-saas-idea
```

This runs all 5 specialist agents in sequence and generates:
- 7 marketing artifacts
- 6 product artifacts (including new Pricing Strategy)
- 7 sales artifacts
- 5 engineering artifacts
- 5 financial artifacts (new Bootstrap Finance agent)
- 1 launch summary

**Total:** 30 artifacts + actionable 21-day launch plan

---

## Available Agents

### 1. `ceo-orchestrator.md` (CEO-Level Master Agent)
**Use when:** Need comprehensive strategy across all business functions

**What it does:**
- Acts as CEO coordinating all 5 department managers in sequence
- Marketing → Product → Sales → Engineering → Finance
- Handles all dependencies automatically
- Creates 30 artifacts across all functions
- Generates executive summary with 21-day execution plan

**Example:**
```
@ceo-orchestrator generate complete business strategy for invoicing-saas
@ceo-orchestrator run quarterly strategic planning for my-saas
```

**Output:**
- `ideas/[idea]/marketing/` - 7 artifacts
- `ideas/[idea]/product/` - 6 artifacts (includes Pricing Strategy)
- `ideas/[idea]/sales/` - 7 artifacts
- `ideas/[idea]/engineering/` - 5 artifacts
- `ideas/[idea]/finance/` - 5 artifacts (new!)
- `ideas/[idea]/00-LAUNCH-SUMMARY.md` - Master playbook

---

### 2. `marketing-manager.md`
**Use when:** Need marketing strategy, ICP analysis, GTM planning

**What it generates (7 artifacts):**
1. ICP & Market Analysis
2. Positioning & Messaging
3. GTM Strategy
4. LinkedIn Outreach System
5. Landing Page Strategy
6. Lead Validation Tactics
7. Marketing Metrics

**Dependencies:**
- Required: `business-context.md`
- Auto-generated: None

**Example:**
```
@marketing-manager generate all artifacts for invoicing-saas
```

---

### 3. `product-manager.md`
**Use when:** Need PRD, feature planning, MVP definition, pricing strategy

**What it generates (6 artifacts):**
1. Market Research & Competitor Analysis
2. Product Requirements Document
   - PRD at a Glance (forces crisp choices)
   - MVP Funnel with instrumentation
   - Text-based wireframes
3. Development Tasks (Epics, Stories, Tasks)
4. Product Metrics Dashboard
5. User Interview Template
6. Pricing Strategy & Model (NEW)

**Dependencies:**
- Required: `business-context.md`
- Recommended: `marketing/01-icp-market-analysis.md`
- Auto-generated: Will generate marketing/01 if missing

**Example:**
```
@product-manager generate PRD and tasks for invoicing-saas
```

---

### 4. `sales-manager.md`
**Use when:** Need sales process, discovery frameworks, objection handling

**What it generates (7 artifacts):**
1. Sales Process Design (with BANT+ qualification)
2. Discovery Call Framework (25-min structured script)
3. Qualification Checklist (green/yellow/red flags)
4. Objection Handling Playbook (ARC framework)
5. Follow-Up System (no "checking in" emails)
6. Sales Metrics (close rate, deal size, pipeline)
7. Sales Scripts Library (copy-paste ready)

**Dependencies:**
- Required: `business-context.md`
- Recommended: `marketing/01-icp-market-analysis.md` + `marketing/02-positioning-messaging.md`
- Auto-generated: Will generate marketing/01 and 02 if missing

**Example:**
```
@sales-manager generate discovery call and objection handling for invoicing-saas
```

---

### 5. `engineering-manager.md`
**Use when:** Ready to build, need architecture and code templates

**What it generates (5 artifacts):**
1. Architecture Decision Record (Nuxt 3 + SQLite stack)
2. Project Setup Guide (step-by-step commands)
3. Implementation Tasks (Phase 1-3 breakdown)
4. Code Templates (auth, CRUD, UI patterns)
5. Engineering Metrics (ship velocity tracking)

**Tech stack:** Next.js 15 + shadcn/ui + Supabase (DB, Auth, Storage, Edge Functions)

**Dependencies:**
- Required: `business-context.md`
- Recommended: `product/02-prd.md`
- Auto-generated: Will generate product/02-prd if missing

**Example:**
```
@engineering-manager generate setup guide and code templates for invoicing-saas
```

---

### 6. `bootstrap-finance.md` (NEW!)
**Use when:** Need financial planning, unit economics, revenue projections

**What it generates (5 artifacts):**
1. Revenue Model & Projections (24-month forecast)
2. Unit Economics Dashboard (CAC, LTV, payback)
3. Burn Rate & Runway Tracker (cash management)
4. Financial Metrics & KPIs (SaaS metrics)
5. Fundraising Readiness Checklist (even if bootstrapping)

**Dependencies:**
- Required: `business-context.md`
- Recommended: `product/05-pricing-strategy.md` + `marketing/07-marketing-metrics.md`
- Auto-generated: Will generate pricing and metrics if missing

**Example:**
```
@bootstrap-finance generate all financial artifacts for invoicing-saas
```

---

## Usage Patterns

### Pattern 1: Complete Strategy (CEO Mode)
```
@ceo-orchestrator generate complete business strategy for my-idea
```
**Time:** ~15-20 minutes
**Output:** 30 artifacts + executive summary

---

### Pattern 2: Function-Specific (Update Strategy)
```
@marketing-manager generate all artifacts for my-idea
@product-manager generate PRD for my-idea
```
**Time:** ~3-5 minutes per agent
**Output:** 5-7 artifacts per agent

---

### Pattern 3: Specific Artifacts (Quick Updates)
```
@product-manager generate PRD and tasks for my-idea
@sales-manager generate discovery call framework for my-idea
```
**Time:** ~2-3 minutes
**Output:** 1-2 specific artifacts

---

## Agent Chaining (Auto-Handled)

Native agents automatically check for and generate missing dependencies:

```
Product Manager needs marketing/01-icp
  ↓
  Detects it's missing
  ↓
  Invokes marketing-manager to generate it
  ↓
  Proceeds with product artifacts
```

**Dependency chain:**
```
marketing-manager (no dependencies)
    ↓
product-manager (needs marketing/01)
    ↓
sales-manager (needs marketing/01, 02)
    ↓
engineering-manager (needs product/02)
    ↓
bootstrap-finance (needs product/05, marketing/07)
```

---

## Best Practices

### 1. Start with CEO Orchestrator
For comprehensive strategy, use `ceo-orchestrator` first. It ensures:
- CEO-level coordination across all departments
- Optimal execution order
- No missing dependencies
- Complete business strategy in one run
- Executive summary with action plan

### 2. Fill Out Business Context Completely
Before running ANY agent, ensure `ideas/[idea]/business-context.md` is complete:
- Problem statement
- Target customer
- Solution
- Differentiator
- Business model
- Success criteria

### 3. Use Specific Artifact Requests for Updates
When iterating on strategy:
```
@product-manager update PRD for my-idea based on customer feedback
@sales-manager regenerate objection handling playbook for my-idea
```

### 4. Review Generated Artifacts Before Building
- Read `product/02-prd.md` PRD at a Glance section first
- Review MVP scope (should be 3-5 features max)
- Check assumptions in each artifact
- Validate with customer conversations before building

---

## Available Commands

Before running agents, use these npm commands:

```bash
npm run new-idea <name>     # Create new idea from template
npm run list-ideas          # List all existing ideas
npm run list-agents         # List all available agents
npm run help                # Show help with all commands
```

---

## Troubleshooting

### "business-context.md not found"
**Solution:** Create idea folder and fill out business context:
```bash
npm run new-idea my-idea
# Fill out ideas/my-idea/business-context.md
```

### "Agent chain failed"
**Solution:** Run agents individually to isolate issue:
1. Run `@marketing-manager` first
2. Then `@product-manager`
3. Then `@sales-manager`
4. Then `@engineering-manager`

### "Generated artifacts are too generic"
**Solution:** Provide more specific details in business-context.md:
- Name specific competitors
- Define exact ICP (job title, company size, industry)
- Describe concrete pain points with examples
- Include pricing research if available

---

## Files in This Directory

- `marketing-manager.md` - Marketing strategy agent
- `product-manager.md` - Product strategy agent (with pricing)
- `sales-manager.md` - Sales process agent
- `engineering-manager.md` - Engineering architecture agent
- `bootstrap-finance.md` - Financial planning agent (NEW)
- `ceo-orchestrator.md` - CEO-level master agent (coordinates all 5 departments)
- `AGENTS-README.md` - This file

---

## Agent Benefits

- ✅ **Automatic file management** - Writes artifacts to correct locations
- ✅ **Dependency checking** - Ensures required files exist before proceeding
- ✅ **Agent chaining** - Agents can invoke other agents when needed
- ✅ **Progress tracking** - Status updates as agents work
- ✅ **Error handling** - Built-in retry logic and graceful failures
- ✅ **No manual work** - No copy/paste, no file navigation

---

For more details, see `/CLAUDE.md` in the repository root.
