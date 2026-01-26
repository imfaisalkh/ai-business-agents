# AI Business Agents - Solo Founder System

A lean, artifact-driven AI agent system for building bootstrapped $1M businesses. Supports multiple ideas with isolated artifact storage.

## Philosophy

- **80/20 Rule**: Each agent focuses only on high-leverage activities
- **Artifact-First**: All outputs are markdown files that feed into other agents
- **Multi-Idea Support**: Test multiple ideas in parallel with clean separation
- **Bootstrap-Friendly**: No fluff, no enterprise overhead

---

## Folder Structure

```
ai-business-agents/
├── README.md                    # This file
├── .claude/
│   └── agents/                  # Claude native agents (automated)
│       ├── marketing-manager.md
│       ├── product-manager.md
│       ├── sales-manager.md
│       ├── engineering-manager.md
│       └── launch-orchestrator.md
├── scripts/                     # Utility scripts
│   └── new-idea.sh
└── ideas/                       # Your business ideas
    ├── _template/               # Copy this for new ideas
    │   ├── README.md
    │   ├── business-context.md
    │   ├── marketing/
    │   ├── sales/
    │   ├── product/
    │   └── engineering/
    ├── [idea-1]/                # Your first idea
    ├── [idea-2]/                # Your second idea
    └── ...
```

---

## Quick Start

### Option A: Complete Launch Strategy (Recommended)

```bash
# 1. Create new idea
./scripts/new-idea.sh your-idea-name

# 2. Fill out business context
# Edit ideas/your-idea-name/business-context.md

# 3. Generate everything
@launch-orchestrator generate complete launch strategy for your-idea-name
```

**Output:** 24 artifacts + comprehensive launch summary in ~15 minutes

---

### Option B: Individual Agents

```bash
# 1. Create new idea
./scripts/new-idea.sh your-idea-name

# 2. Fill out business context
# Edit ideas/your-idea-name/business-context.md

# 3. Run agents one by one
@marketing-manager generate all artifacts for your-idea-name
@product-manager generate all artifacts for your-idea-name
@sales-manager generate all artifacts for your-idea-name
@engineering-manager generate all artifacts for your-idea-name
```

**Agent execution order:**
1. Marketing Manager → 7 marketing artifacts
2. Product Manager → 5 product artifacts (needs marketing/01-icp)
3. Sales Manager → 7 sales artifacts (needs marketing/01, 02)
4. Engineering Manager → 5 engineering artifacts (needs product/02-prd, 03-tasks)

**Note:** Agents automatically check for and generate missing dependencies

---

## Agent Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BUSINESS CONTEXT                            │
│               (ideas/[name]/business-context.md)                │
└─────────────────────────────────────────────────────────────────┘
                                │
         ┌──────────────────────┼──────────────────────┐
         ▼                      ▼                      ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│    MARKETING    │   │     PRODUCT     │   │      SALES      │
│     MANAGER     │──▶│     MANAGER     │──▶│     MANAGER     │
│                 │   │                 │   │                 │
│ • ICP & Market  │   │ • Research      │   │ • Process       │
│ • Positioning   │   │ • PRD           │   │ • Scripts       │
│ • GTM Strategy  │   │ • Tasks         │   │ • Qualification │
└─────────────────┘   └─────────────────┘   └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   ENGINEERING   │
                    │     MANAGER     │
                    │                 │
                    │ • Architecture  │
                    │ • Code          │
                    │ • Ship          │
                    └─────────────────┘
```

---

## Artifacts Generated

### Marketing Manager (`.claude/agents/marketing-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | ICP & Market Analysis | Define who you're selling to |
| 02 | Positioning & Messaging | What you say and how |
| 03 | GTM Strategy | How you'll reach them |
| 04 | LinkedIn Outreach | Templates and sequences |
| 05 | Landing Page Strategy | Copy and structure |
| 06 | Lead Validation | Test before scaling |
| 07 | Marketing Metrics | Track what matters |

### Product Manager (`.claude/agents/product-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Market Research | Competitor analysis, pricing |
| 02 | PRD | Requirements, MVP Funnel, Wireframes |
| 03 | Tasks | Epics, stories, implementation tasks |
| 04 | Product Metrics | Usage and adoption tracking |
| 05 | Interview Template | Customer research structure |

### Sales Manager (`.claude/agents/sales-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Sales Process | Stage definitions and criteria |
| 02 | Discovery Call Framework | Questions and structure |
| 03 | Qualification Checklist | Go/no-go criteria |
| 04 | Objection Handling | Scripts for common objections |
| 05 | Follow-up System | Cadence and templates |
| 06 | Sales Metrics | Pipeline and conversion tracking |
| 07 | Scripts Library | Cold outreach, demos, closing |

### Engineering Manager (`.claude/agents/engineering-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Architecture | Tech decisions (Nuxt 3 + SQLite) |
| 02 | Setup Guide | Bootstrap instructions |
| 03 | Implementation Tasks | Phase-based coding tasks |
| 04 | Code Templates | Reusable patterns (auth, CRUD, UI) |
| 05 | Engineering Metrics | Ship velocity, quality |

### Launch Orchestrator (`.claude/agents/launch-orchestrator.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 00 | Launch Summary | Complete 21-day launch plan + all artifacts |

---

## Key Metrics (Track Only These)

| Function | North Star | Secondary |
|----------|------------|-----------|
| Marketing | Qualified Leads/Week | Cost per Lead |
| Sales | Close Rate % | Average Deal Size |
| Product | Weekly Active Users | Feature Adoption |
| Engineering | Ship Velocity | Bug Escape Rate |

---

## 21-Day Launch Playbook

A concrete timeline from idea to first 10 customers.

### Day 1: Strategy Generation (1 day)

| Time | Task | Tool | Output |
|------|------|------|--------|
| 30 min | Fill business context | You | `business-context.md` |
| 15 min | Generate all artifacts | `@launch-orchestrator` | 24 artifacts + launch summary |
| 30 min | Review PRD at a Glance | You | Understand MVP scope |
| 15 min | Practice discovery call script | You | Sales readiness |

**Total:** 90 minutes. You now have complete strategy.

### Week 1: Discovery & Validation (Days 2-7)

| Day | Task | Action |
|-----|------|--------|
| 2-3 | Research 50 ICPs | Use marketing/01-icp to find prospects on LinkedIn |
| 3-4 | Send 20 connection requests/day | Use marketing/04-outreach templates |
| 4-5 | Book 5 discovery calls | Use sales/02-discovery-call framework |
| 6-7 | Run calls, validate problem | Take notes, validate pain points |

**Goal:** Validate ICP and problem before building anything.

### Week 2: Build Foundation + Outreach (Days 8-14)

| Day | Task | Action |
|-----|------|--------|
| 8-9 | Bootstrap project | Follow engineering/02-setup-guide |
| 9-10 | Build auth + database | Complete Phase 1 from engineering/03-tasks |
| 11-13 | Build Feature 1 | Use engineering/04-code-templates |
| 14 | Deploy to staging | Test core flow end-to-end |
| **Daily** | Send 25 connections + follow-ups | Continuous outreach |

**Goal:** Core flow working + 10+ discovery calls booked.

### Week 3: Feature Complete + First Sales (Days 15-21)

| Day | Task | Action |
|-----|------|--------|
| 15-17 | Build Features 2 & 3 | Complete MVP from PRD |
| 17-18 | Beta test with 10 users | Screen share onboarding |
| 19-20 | Fix critical bugs, polish | Empty states, error handling |
| 21 | Public launch + close first 3 customers | Use sales/05-followup system |

**Goal:** MVP live + first 3 paying customers.

### Week 4: Scale to 10 Customers (Days 22-28)

| Day | Task | Action |
|-----|------|--------|
| 22 | Launch announcement | LinkedIn, Twitter, communities |
| 23-28 | 50 connections/day + discovery calls | Scale what's working |
| 28 | Review metrics | Check marketing/sales/product metrics |

**Goal:** 10 paying customers by end of Week 4.

**Note:** This playbook assumes you run `@launch-orchestrator` on Day 1. See `ideas/[your-idea]/00-LAUNCH-SUMMARY.md` for detailed daily tasks.

---

## When to Re-run Agents

Don't update artifacts randomly. Use these triggers:

| Trigger Event | Which Artifacts to Update | Agent |
|---------------|---------------------------|-------|
| New competitor discovered | Market research, Positioning | Product + Marketing |
| ICP assumptions wrong | ICP, Qualification, Discovery | Marketing + Sales |
| Positioning not resonating | Messaging, Landing page, GTM | Marketing |
| Conversion rate drops | Landing page, Channel plan | Marketing |
| Consistent deal losses | Objection handling, Qualification | Sales |
| Feature scope changes | PRD, Tasks, Architecture | Product + Engineering |
| New channel opportunity | GTM, Channel plan | Marketing |
| Price feedback from prospects | Market research, Sales process | Product + Sales |

### Weekly Review (15 min)

Every Monday, ask:
1. What metric improved most?
2. What metric is stuck?
3. Which artifact is the bottleneck?
4. What did I learn from customer conversations?

### Monthly Deep Dive (1 hour)

End of each month:
1. Re-validate ICP with actual data
2. Update positioning if needed
3. Review win/loss patterns
4. Adjust roadmap based on learnings

---

## Managing Multiple Ideas

### Idea Lifecycle

```
💡 Idea → 📋 Context → 🎯 Marketing → 📦 Product → 💰 Sales → ⚙️ Engineering → 🚀 Launch
```

### Comparing Ideas

Create a simple scorecard:

| Criteria | Idea A | Idea B | Idea C |
|----------|--------|--------|--------|
| Problem clarity (1-5) | | | |
| ICP accessibility (1-5) | | | |
| Competitive advantage (1-5) | | | |
| Revenue potential (1-5) | | | |
| Build complexity (1-5) | | | |
| **Total** | | | |

### When to Kill an Idea

- After 20 outreach attempts, <5% response rate
- After 10 discovery calls, 0 showed buying intent
- After 2 weeks, can't articulate clear ICP
- Competitors have 10x your resources and same positioning

---

## Tips for Solo Founders

1. **Don't over-plan** — Run agents, ship, learn, repeat
2. **Talk to humans** — Artifacts are hypotheses until validated
3. **One idea at a time** — Use this system to decide, then focus
4. **Time-box research** — Max 1 week on marketing/product before building MVP
5. **Ship something** — A live product teaches more than 10 PRDs

---

*Built for solo founders who ship, not plan.*
