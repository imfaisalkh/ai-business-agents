# Project Setup Guide

## Prerequisites
- Node.js 20+ and npm/pnpm
- PostgreSQL 15+ (local or Neon cloud)
- Git
- VS Code (recommended)

---

## Setup (15 Minutes)

### 1. Create Nuxt 4 Project
```bash
npx nuxi@latest init performance-kit
cd performance-kit
npm install
```

### 2. Install Dependencies
```bash
# Core dependencies
npm install @prisma/client
npm install -D prisma
npm install @sidebase/nuxt-auth
npm install @vueuse/core
npm install zod  # Validation

# shadcn-vue components
npx shadcn-vue@latest init
npm install radix-vue class-variance-authority clsx tailwind-merge lucide-vue-next

# Email
npm install resend

# Analytics
npm install posthog-js
```

### 3. Setup Prisma
```bash
npx prisma init
```

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Paste models from engineering/01-architecture.md
```

Create `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/TeamPulse"
NUXT_AUTH_SECRET="your-secret-key-32-chars-min"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-secret"
RESEND_API_KEY="re_your_api_key"
```

Run migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Configure Nuxt Auth
Create `server/api/auth/[...].ts`:
```typescript
import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Implement user lookup + password verification
        return { id: '1', email: credentials.email }
      },
    }),
  ],
})
```

### 5. Folder Structure
```
performance-kit/
├── app/
│   ├── pages/
│   │   ├── index.vue              # Landing page
│   │   ├── login.vue              # Login page
│   │   ├── dashboard.vue          # Manager dashboard
│   │   ├── reviews/
│   │   │   ├── [id]/gap.vue       # Gap analysis view
│   │   │   └── [id]/finalize.vue  # Manager rating form
│   │   └── self-review/[id].vue   # Employee self-review
│   ├── components/
│   │   ├── ui/                    # shadcn-vue components
│   │   ├── ReviewCard.vue
│   │   ├── GapAnalysisTable.vue
│   │   └── PeerFeedbackForm.vue
│   └── layouts/
│       ├── default.vue
│       └── auth.vue
├── server/
│   ├── api/
│   │   ├── auth/[...].ts
│   │   ├── teams/
│   │   │   ├── import.post.ts     # Slack/CSV import
│   │   │   └── members.get.ts
│   │   ├── reviews/
│   │   │   ├── create.post.ts
│   │   │   ├── [id].get.ts
│   │   │   └── [id]/gap.get.ts
│   │   └── goals/
│   │       ├── create.post.ts
│   │       └── [id].patch.ts
│   └── utils/
│       ├── prisma.ts              # Prisma client singleton
│       └── email.ts               # Resend email helpers
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── logo.svg
├── .env
├── nuxt.config.ts
└── package.json
```

### 6. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Key Commands

### Development
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

### Database
```bash
npx prisma migrate dev           # Create + apply migration
npx prisma migrate deploy        # Apply migrations (production)
npx prisma generate              # Regenerate Prisma client
npx prisma studio                # Open Prisma Studio (DB GUI)
npx prisma db seed               # Seed database with templates
```

### Deployment
```bash
vercel                           # Deploy to Vercel
vercel --prod                    # Deploy to production
```

---

## Environment Variables (Production)

Add these to Vercel/Railway:
```
DATABASE_URL=postgresql://...
NUXT_AUTH_SECRET=your-prod-secret-32-chars
GOOGLE_CLIENT_ID=prod-client-id
GOOGLE_CLIENT_SECRET=prod-secret
RESEND_API_KEY=re_prod_key
POSTHOG_KEY=phc_your_posthog_key
```

---

## Seed Data (Templates)

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default templates
  await prisma.template.createMany({
    data: [
      {
        name: 'Mid-Level Software Engineer',
        competencies: JSON.stringify([
          { name: 'Code Quality', description: 'Writes clean, testable code' },
          { name: 'Impact', description: 'Delivers features that move metrics' },
          { name: 'Communication', description: 'Communicates effectively with team' },
          { name: 'Collaboration', description: 'Works well with cross-functional teams' },
          { name: 'Initiative', description: 'Identifies and solves problems proactively' },
        ]),
      },
      // Add more templates
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run: `npx prisma db seed`

---

## Testing Setup (Optional)

```bash
npm install -D vitest @vue/test-utils @nuxt/test-utils
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'nuxt',
  },
})
```

Run tests: `npm run test`

---

*Last updated: January 27, 2026*
