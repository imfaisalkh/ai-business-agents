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
    ├─> Marketing Manager   → marketing/*.md
    ├─> Product Manager     → product/*.md  (needs marketing/01-icp-market-analysis.md)
    ├─> Sales Manager       → sales/*.md    (needs marketing/01, 02)
    ├─> Engineering Manager → engineering/*.md (needs product/02-prd.md, 03-tasks.md)
    └─> Bootstrap Finance   → finance/*.md  (needs product/06-pricing, marketing/07-metrics)
```

### Directory Structure
- `.claude/agents/` - **Claude native agents** - Automated, chainable agents
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
├── product/               # 6 product artifacts (includes pricing strategy)
├── sales/                 # 7 sales artifacts
├── engineering/           # 5 engineering artifacts
└── finance/               # 5 financial artifacts
```

## Common Commands

### Creating a New Idea
```bash
npm run new-idea my-idea-name
```
This copies `ideas/_template/` to `ideas/my-idea-name/` and updates the README.

### Other Useful Commands
```bash
npm run list-ideas          # List all existing ideas
npm run list-agents         # List all available agents
npm run help                # Show all available commands
```

Alternative manual approach:
```bash
cp -r ideas/_template ideas/my-idea-name
```

### Working with Native Agents

**Claude native agents (in `.claude/agents/`) are automated and self-contained.** They handle dependencies automatically, chain together, and generate all artifacts with proper file management.

#### Available Native Agents

1. **`ceo-orchestrator`** - CEO-level master agent that coordinates ALL 5 departments
   - Generates complete business strategy (30 artifacts)
   - Acts as strategic CEO coordinating all functions
   - Handles all dependencies automatically
   - Creates executive summary with 21-day action plan
   - **Best for:** Comprehensive strategy, quarterly planning, new ideas

2. **`marketing-manager`** - Generates 7 marketing artifacts
   - ICP analysis, positioning, GTM, LinkedIn outreach, landing page, validation, metrics
   - **Best for:** Marketing strategy, customer research, go-to-market planning

3. **`product-manager`** - Generates 6 product artifacts
   - Market research, PRD (with MVP Funnel & Wireframes), tasks, metrics, interview template, pricing strategy
   - Auto-generates marketing dependencies if missing
   - **Best for:** Product strategy, feature planning, PRD creation, pricing

4. **`sales-manager`** - Generates 7 sales artifacts
   - Sales process, discovery calls, qualification, objections, follow-up, metrics, scripts
   - Auto-generates marketing dependencies if missing
   - **Best for:** Sales process design, founder-led sales systems

5. **`engineering-manager`** - Generates 5 engineering artifacts
   - Architecture, setup guide, implementation tasks, code templates, metrics
   - Auto-generates product dependencies if missing
   - **Best for:** Technical architecture, development planning, code scaffolding

6. **`bootstrap-finance`** - Generates 5 financial artifacts
   - Revenue model, unit economics, burn rate/runway, financial metrics, fundraising readiness
   - Auto-generates pricing and marketing metrics dependencies if missing
   - **Best for:** Financial planning, unit economics, runway tracking

#### How to Use Native Agents

**Method 1: CEO Strategy (Recommended for comprehensive planning)**
```
@ceo-orchestrator generate complete business strategy for [idea-name]
```
This coordinates all 5 departments and generates 30 artifacts + executive summary.

**Method 2: Individual Agents**
```
@marketing-manager generate all artifacts for [idea-name]
@product-manager generate all artifacts for [idea-name]
@sales-manager generate all artifacts for [idea-name]
@engineering-manager generate all artifacts for [idea-name]
@bootstrap-finance generate all artifacts for [idea-name]
```

**Method 3: Specific Artifacts**
```
@product-manager generate PRD and tasks for [idea-name]
@sales-manager generate discovery call framework and objection handling
```

#### Agent Dependencies (Auto-Handled)

Native agents automatically check for and generate missing dependencies:
- **Product Manager** → Auto-generates marketing/01-icp if missing
- **Sales Manager** → Auto-generates marketing/01-icp and 02-positioning if missing
- **Engineering Manager** → Auto-generates product/02-prd and 03-tasks if missing
- **Bootstrap Finance** → Auto-generates product/06-pricing and marketing/07-metrics if missing
- **CEO Orchestrator** → Coordinates all 5 departments in optimal order

**Manual Execution Order** (if not using orchestrator):
1. Marketing Manager (requires: business-context.md)
2. Product Manager (requires: business-context.md + marketing/01-icp-market-analysis.md)
3. Sales Manager (requires: marketing/01-icp-market-analysis.md + marketing/02-positioning-messaging.md)
4. Engineering Manager (requires: product/02-prd.md + product/03-tasks.md)
5. Bootstrap Finance (requires: product/06-pricing-strategy.md + marketing/07-marketing-metrics.md)

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
1. **Marketing Manager** (`.claude/agents/marketing-manager.md`)
   - Generates 7 artifacts: ICP analysis, positioning, GTM strategy, LinkedIn outreach, landing page, validation tactics, metrics
   - Focus: Distribution channels and customer messaging

2. **Product Manager** (`.claude/agents/product-manager.md`)
   - Generates 6 artifacts: Market research, PRD (with MVP Funnel & Wireframes), tasks, metrics, interview templates, pricing strategy
   - Focus: What to build and why (validate before building)

3. **Sales Manager** (`.claude/agents/sales-manager.md`)
   - Generates 7 artifacts: Sales process, discovery framework, qualification, objection handling, follow-up, metrics, scripts
   - Focus: Converting prospects to customers

4. **Engineering Manager** (`.claude/agents/engineering-manager.md`)
   - Generates 5 artifacts: Architecture, setup guide, implementation tasks, code templates, metrics
   - Focus: Ship velocity and quality (Nuxt 3 + Vue 3 + SQLite stack)

5. **CEO Orchestrator** (`.claude/agents/ceo-orchestrator.md`)
   - Chains all 5 department agents to generate complete 21-day launch strategy
   - Creates comprehensive launch summary with 30 artifacts
   - Focus: Complete strategy generation from idea to launch

6. **Bootstrap Finance** (`.claude/agents/bootstrap-finance.md`)
   - Generates 5 artifacts: Revenue model, unit economics, burn/runway, financial metrics, fundraising readiness
   - Focus: Financial sustainability and path to profitability

### When to Re-run Agents
Don't update artifacts randomly. Triggers include:
- New competitor discovered → Update market research + positioning (Product + Marketing)
- ICP assumptions wrong → Update ICP + qualification (Marketing + Sales)
- Positioning not resonating → Update messaging + landing page (Marketing)
- Feature scope changes → Update PRD + tasks (Product + Engineering)

## Workflow Patterns

### Starting a New Idea (21-Day Launch Playbook)

#### Option A: CEO-Orchestrated (Recommended)
1. Create new idea: `npm run new-idea my-saas-idea`
2. Fill out `ideas/my-saas-idea/business-context.md` completely
3. Run: `@ceo-orchestrator generate complete business strategy for my-saas-idea`
4. Review `ideas/my-saas-idea/00-LAUNCH-SUMMARY.md` for executive action plan
5. Execute the 21-Day Launch Plan from the summary

**Total time:** 30 min setup + 15 min for agent to generate all artifacts

#### Option B: Manual (Step-by-Step)
**Week 1: Discovery**
1. Create idea + fill out business-context.md
2. Run `@marketing-manager generate all artifacts for [idea]`
3. Run `@product-manager generate all artifacts for [idea]`
4. Review ICP, positioning, and PRD

**Week 2: Strategy**
1. Run `@sales-manager generate all artifacts for [idea]`
2. Practice discovery call framework
3. Prepare LinkedIn outreach templates
4. Start customer conversations

**Week 3: Execution**
1. Run `@engineering-manager generate all artifacts for [idea]`
2. Bootstrap project using setup guide
3. Start Phase 1 implementation (auth + foundation)
4. Deploy MVP features and continue outreach

**Week 4: Launch**
1. Complete MVP build
2. Beta test with first users
3. Public launch
4. Track metrics and iterate

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
- Finance: Months of Runway

### Voice and Tone
Agents are opinionated and direct:
- No enterprise overhead
- No vanity metrics
- Focus on revenue and customer outcomes
- "Ship something" beats "plan everything"

## File Modification Guidelines

When editing agent prompts (`.claude/agents/*.md`):
- Keep the artifact templates intact (they're markdown code blocks)
- Don't add enterprise-y fluff
- Maintain focus on bootstrapped, solo founder context
- Agent outputs should be immediately actionable
- Test changes by running the agent on a test idea

When creating new ideas:
- Always start from `ideas/_template/`
- Fill `business-context.md` completely before any agent work
- Don't skip the template structure - all agents expect these folders

## Development Notes

This is an AI-native agent system:
- Agents are Claude native agents (markdown format with YAML frontmatter)
- No build process, no dependencies (beyond Claude Code CLI)
- Agents handle all file operations automatically
- Git is used for version control of artifacts and agent evolution
- All agent logic is in `.claude/agents/` directory
