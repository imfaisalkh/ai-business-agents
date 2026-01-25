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
├── agents/                      # Agent system prompts (shared)
│   ├── marketing-manager.md
│   ├── sales-manager.md
│   ├── product-manager.md
│   └── engineering-manager.md
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

### 1. Create a New Idea

```bash
# Copy the template folder
cp -r ideas/_template ideas/your-idea-name
```

### 2. Fill Out Business Context

Edit `ideas/your-idea-name/business-context.md` with your business idea. This is the foundation all agents use.

### 3. Run Agents in Order

| Order | Agent | Input | Output Location |
|-------|-------|-------|-----------------|
| 1 | Marketing Manager | `business-context.md` | `marketing/` |
| 2 | Product Manager | `business-context.md` + `marketing/01-icp-market-analysis.md` | `product/` |
| 3 | Sales Manager | `marketing/01-icp-market-analysis.md` + `marketing/02-positioning-messaging.md` | `sales/` |
| 4 | Engineering Manager | `product/02-prd.md` + `product/03-tasks.md` | `engineering/` |

### 4. Using an Agent

1. Open Claude (or your preferred AI)
2. Paste the agent's system prompt from `agents/[agent-name].md`
3. Provide the required input files as context
4. Request specific artifacts
5. Save outputs to the appropriate `ideas/[your-idea]/[function]/` folder

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

### Marketing Manager (`agents/marketing-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | ICP & Market Analysis | Define who you're selling to |
| 02 | Positioning & Messaging | What you say and how |
| 03 | GTM Strategy | How you'll reach them |
| 04 | LinkedIn Outreach | Templates and sequences |
| 05 | Landing Page Strategy | Copy and structure |
| 06 | Lead Validation | Test before scaling |
| 07 | Marketing Metrics | Track what matters |

### Sales Manager (`agents/sales-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Sales Process | Stage definitions and criteria |
| 02 | Discovery Call Framework | Questions and structure |
| 03 | Qualification Checklist | Go/no-go criteria |
| 04 | Objection Handling | Scripts for common objections |
| 05 | Follow-up System | Cadence and templates |
| 06 | Sales Metrics | Pipeline and conversion tracking |
| 07 | Scripts Library | Cold outreach, demos, closing |

### Product Manager (`agents/product-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Market Research | Competitor analysis, pricing |
| 02 | PRD | Requirements and scope |
| 03 | Tasks | Epics, stories, implementation tasks |
| 04 | Product Metrics | Usage and adoption tracking |
| 05 | Interview Template | Customer research structure |

### Engineering Manager (`agents/engineering-manager.md`)
| # | Artifact | Purpose |
|---|----------|---------|
| 01 | Architecture | Tech decisions, folder structure |
| 02 | Setup Guide | Bootstrap instructions |
| 03 | Implementation Tasks | Detailed coding tasks |
| 04 | Code Templates | Reusable patterns |
| 05 | Engineering Metrics | Ship velocity, quality |

---

## Key Metrics (Track Only These)

| Function | North Star | Secondary |
|----------|------------|-----------|
| Marketing | Qualified Leads/Week | Cost per Lead |
| Sales | Close Rate % | Average Deal Size |
| Product | Weekly Active Users | Feature Adoption |
| Engineering | Ship Velocity | Bug Escape Rate |

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
