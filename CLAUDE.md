# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an artifact-driven AI agent system for solo founders building bootstrapped B2B SaaS businesses. The system uses markdown-based agents that generate specific artifacts following the 80/20 principle: focus on high-leverage activities only.

### Core Philosophy
- **Artifact-First**: All outputs are markdown files that feed into other agents
- **Multi-Idea Support**: Test multiple business ideas in parallel with isolated artifact storage
- **Bootstrap-Friendly**: No enterprise overhead, no vanity metrics, focus on revenue
- **80/20 Rule**: Each agent focuses only on the 20% of activities that drive 80% of results

## Architecture

### Agent System Flow
```
business-context.md (foundation)
    ├─> Marketing Manager  → marketing/*.md
    ├─> Product Manager    → product/*.md  (needs marketing/01-icp-market-analysis.md)
    ├─> Sales Manager      → sales/*.md    (needs marketing/01, 02)
    └─> Engineering Manager → engineering/*.md (needs product/02-prd.md, 03-tasks.md)
```

### Directory Structure
- `agents/` - Shared agent system prompts (4 agents: marketing, product, sales, engineering)
- `ideas/` - Business idea workspaces, each with isolated artifact folders
- `ideas/_template/` - Template structure for new ideas
- `scripts/` - Utility scripts (currently just new-idea.sh)

### Idea Folder Structure
Each idea in `ideas/[idea-name]/` follows this structure:
```
[idea-name]/
├── README.md              # Idea status tracker
├── business-context.md    # Foundation document (fill this first)
├── marketing/             # 7 marketing artifacts
├── product/               # 5 product artifacts
├── sales/                 # 7 sales artifacts
└── engineering/           # 5 engineering artifacts
```

## Common Commands

### Creating a New Idea
```bash
./scripts/new-idea.sh my-idea-name
```
This copies `ideas/_template/` to `ideas/my-idea-name/` and updates the README.

Alternative manual approach:
```bash
cp -r ideas/_template ideas/my-idea-name
```

### Working with Agents
Agents are not executed directly - they are system prompts to be used with Claude or other LLMs:

1. Read the agent prompt from `agents/[agent-name].md`
2. Provide required input files as context (specified in each agent's documentation)
3. Request specific artifacts by number (e.g., "generate artifact 01")
4. Save outputs to `ideas/[idea-name]/[function]/[artifact-name].md`

**Agent Execution Order:**
1. Marketing Manager (requires: business-context.md)
2. Product Manager (requires: business-context.md + marketing/01-icp-market-analysis.md)
3. Sales Manager (requires: marketing/01-icp-market-analysis.md + marketing/02-positioning-messaging.md)
4. Engineering Manager (requires: product/02-prd.md + product/03-tasks.md)

## Key Concepts

### Artifact Numbering
Each agent generates numbered artifacts (e.g., `01-icp-market-analysis.md`). Generate them in order as each builds on the previous.

### Business Context Template
`ideas/[name]/business-context.md` is the foundation. It must be filled out before running any agents. It includes:
- Problem definition and target customer
- Solution and differentiator
- Business model and pricing
- Unfair advantages
- Constraints and success criteria

### Agent Types
1. **Marketing Manager** (`agents/marketing-manager.md`)
   - Generates 7 artifacts: ICP analysis, positioning, GTM strategy, LinkedIn outreach, landing page, validation tactics, metrics
   - Focus: Distribution channels and customer messaging

2. **Product Manager** (`agents/product-manager.md`)
   - Generates 5 artifacts: Market research, PRD, tasks, metrics, interview templates
   - Focus: What to build and why (validate before building)

3. **Sales Manager** (`agents/sales-manager.md`)
   - Generates 7 artifacts: Sales process, discovery framework, qualification, objection handling, follow-up, metrics, scripts
   - Focus: Converting prospects to customers

4. **Engineering Manager** (`agents/engineering-manager.md`)
   - Generates 5 artifacts: Architecture, setup guide, implementation tasks, code templates, metrics
   - Focus: Ship velocity and quality

### When to Re-run Agents
Don't update artifacts randomly. Triggers include:
- New competitor discovered → Update market research + positioning (Product + Marketing)
- ICP assumptions wrong → Update ICP + qualification (Marketing + Sales)
- Positioning not resonating → Update messaging + landing page (Marketing)
- Feature scope changes → Update PRD + tasks (Product + Engineering)

## Workflow Patterns

### Starting a New Idea (21-Day Launch Playbook)
**Week 1: Discovery**
1. Fill out business-context.md
2. Run Product Manager for competitor research
3. Run Marketing Manager for ICP analysis
4. Generate PRD and positioning

**Week 2: Strategy**
1. Complete GTM strategy
2. Design sales process
3. Set up LinkedIn outreach
4. Create landing page strategy

**Week 3: Execution**
1. Generate development tasks
2. Define architecture
3. Set up metrics dashboards
4. **Start outreach**

### Managing Multiple Ideas
- Each idea is completely isolated in its own folder
- Use the scorecard in README.md to compare ideas
- Kill criteria: <5% response rate after 20 outreach attempts, 0 buying intent after 10 calls

## Important Conventions

### Artifact Files
- All artifacts are markdown files
- File names follow pattern: `NN-descriptive-name.md` where NN is 01-07
- Each artifact is standalone and actionable
- No theoretical fluff - everything must be implementable

### Metrics Philosophy
Track only these north stars per function:
- Marketing: Qualified Leads/Week
- Sales: Close Rate %
- Product: Weekly Active Users
- Engineering: Ship Velocity

### Voice and Tone
Agents are opinionated and direct:
- No enterprise overhead
- No vanity metrics
- Focus on revenue and customer outcomes
- "Ship something" beats "plan everything"

## File Modification Guidelines

When editing agent prompts (`agents/*.md`):
- Keep the artifact templates intact (they're markdown code blocks)
- Don't add enterprise-y fluff
- Maintain focus on bootstrapped, solo founder context
- Agent outputs should be immediately actionable

When creating new ideas:
- Always start from `ideas/_template/`
- Fill `business-context.md` completely before any agent work
- Don't skip the template structure - all agents expect these folders

## Development Notes

This is a documentation-based system, not a code project:
- No build process, no dependencies
- No tests (it's all markdown and bash)
- The "code" is the agent prompts and templates
- Git is used for version control of artifacts and agent evolution
