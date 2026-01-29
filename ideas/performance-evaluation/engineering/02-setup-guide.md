# Project Setup Guide

> **Purpose:** Step-by-step instructions to bootstrap the TeamPulse development environment. From zero to running app in 30 minutes.
>
> **Fits in:** Run these commands before starting Implementation Tasks (03). Architecture decisions in (01).

## Prerequisites

Ensure you have installed:
- Node.js 20+ (`node -v`)
- pnpm 8+ (`pnpm -v`)
- Git (`git -v`)
- VS Code (recommended)

---

## Step 1: Create Next.js Project

```bash
# Create new Next.js 15 project with App Router
pnpm create next-app@latest teampulse --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd teampulse
```

---

## Step 2: Install Core Dependencies

```bash
# Prisma ORM
pnpm add prisma @prisma/client
pnpm add -D prisma

# shadcn/ui (will prompt for configuration)
pnpm dlx shadcn-ui@latest init

# Select these options:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes

# Add essential shadcn components
pnpm dlx shadcn-ui@latest add button card dialog dropdown-menu form input label select separator tabs textarea toast avatar badge calendar popover table

# Clerk authentication
pnpm add @clerk/nextjs

# Resend for email
pnpm add resend

# PostHog for analytics
pnpm add posthog-js posthog-node

# Date handling
pnpm add date-fns

# Form validation
pnpm add zod react-hook-form @hookform/resolvers

# Server actions
pnpm add next-safe-action

# PDF generation (for gap analysis export)
pnpm add @react-pdf/renderer

# Dev dependencies
pnpm add -D @types/node
```

---

## Step 3: Initialize Prisma

```bash
# Initialize Prisma with PostgreSQL
pnpm prisma init --datasource-provider postgresql
```

Update `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// === ENUMS ===

enum Role {
  ADMIN
  MANAGER
  EMPLOYEE
}

enum CycleStatus {
  DRAFT
  ACTIVE
  COMPLETED
  ARCHIVED
}

enum ReviewStatus {
  DRAFT
  SUBMITTED
  SHARED
}

// === MODELS ===

model Company {
  id          String        @id @default(uuid())
  clerkOrgId  String        @unique
  name        String
  plan        String        @default("trial")
  trialEndsAt DateTime?
  users       User[]
  cycles      ReviewCycle[]
  templates   Template[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model User {
  id             String         @id @default(uuid())
  clerkUserId    String         @unique
  email          String
  name           String
  role           Role           @default(EMPLOYEE)
  companyId      String
  company        Company        @relation(fields: [companyId], references: [id])
  managerId      String?
  manager        User?          @relation("ManagerRelation", fields: [managerId], references: [id])
  directReports  User[]         @relation("ManagerRelation")
  reviews        Review[]       @relation("ReviewsWritten")
  reviewsReceived Review[]      @relation("ReviewsReceived")
  selfReviews    SelfReview[]
  peerFeedbackGiven PeerFeedback[] @relation("FeedbackGiven")
  peerFeedbackReceived PeerFeedback[] @relation("FeedbackReceived")
  goals          Goal[]
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  @@index([companyId])
}

model Template {
  id           String         @id @default(uuid())
  name         String
  description  String?
  isDefault    Boolean        @default(false)
  companyId    String?
  company      Company?       @relation(fields: [companyId], references: [id])
  competencies Competency[]
  cycles       ReviewCycle[]
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  @@index([companyId])
}

model Competency {
  id          String   @id @default(uuid())
  templateId  String
  template    Template @relation(fields: [templateId], references: [id], onDelete: Cascade)
  name        String
  description String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ReviewCycle {
  id                  String        @id @default(uuid())
  name                String
  companyId           String
  company             Company       @relation(fields: [companyId], references: [id])
  templateId          String
  template            Template      @relation(fields: [templateId], references: [id])
  startDate           DateTime
  endDate             DateTime
  selfReviewDeadline  DateTime
  peerFeedbackDeadline DateTime
  managerReviewDeadline DateTime
  status              CycleStatus   @default(DRAFT)
  participants        Participant[]
  reviews             Review[]
  selfReviews         SelfReview[]
  peerFeedback        PeerFeedback[]
  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt

  @@index([companyId])
}

model Participant {
  id         String      @id @default(uuid())
  cycleId    String
  cycle      ReviewCycle @relation(fields: [cycleId], references: [id], onDelete: Cascade)
  userId     String
  peers      String[]    // Array of user IDs who give peer feedback
  createdAt  DateTime    @default(now())

  @@unique([cycleId, userId])
}

model Review {
  id              String       @id @default(uuid())
  cycleId         String
  cycle           ReviewCycle  @relation(fields: [cycleId], references: [id])
  revieweeId      String
  reviewee        User         @relation("ReviewsReceived", fields: [revieweeId], references: [id])
  reviewerId      String
  reviewer        User         @relation("ReviewsWritten", fields: [reviewerId], references: [id])
  ratings         Rating[]
  overallRating   Float?
  overallFeedback String?
  status          ReviewStatus @default(DRAFT)
  sharedAt        DateTime?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@unique([cycleId, revieweeId, reviewerId])
  @@index([cycleId])
  @@index([revieweeId])
}

model Rating {
  id             String   @id @default(uuid())
  reviewId       String
  review         Review   @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  competencyId   String
  competencyName String
  score          Int      // 1-5
  feedback       String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model SelfReview {
  id          String       @id @default(uuid())
  cycleId     String
  cycle       ReviewCycle  @relation(fields: [cycleId], references: [id])
  userId      String
  user        User         @relation(fields: [userId], references: [id])
  ratings     SelfRating[]
  highlights  String?
  nextGoals   String?
  status      ReviewStatus @default(DRAFT)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@unique([cycleId, userId])
  @@index([cycleId])
}

model SelfRating {
  id             String     @id @default(uuid())
  selfReviewId   String
  selfReview     SelfReview @relation(fields: [selfReviewId], references: [id], onDelete: Cascade)
  competencyId   String
  competencyName String
  score          Int        // 1-5
  feedback       String?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model PeerFeedback {
  id           String       @id @default(uuid())
  cycleId      String
  cycle        ReviewCycle  @relation(fields: [cycleId], references: [id])
  giverId      String
  giver        User         @relation("FeedbackGiven", fields: [giverId], references: [id])
  receiverId   String
  receiver     User         @relation("FeedbackReceived", fields: [receiverId], references: [id])
  strengths    String?
  areasForGrowth String?
  collaboration Int?        // 1-5
  additionalComments String?
  status       ReviewStatus @default(DRAFT)
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt

  @@unique([cycleId, giverId, receiverId])
  @@index([cycleId])
  @@index([receiverId])
}

model Goal {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  title       String
  description String?
  dueDate     DateTime?
  status      String   @default("NOT_STARTED") // NOT_STARTED, IN_PROGRESS, COMPLETED, MISSED
  progress    Int      @default(0) // 0-100
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
}
```

---

## Step 4: Set Up Environment Variables

Create `.env.local`:

```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Resend Email
RESEND_API_KEY=re_...

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Stripe (add later)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Create `.env.example` (for documentation):

```bash
# Database (Supabase)
DATABASE_URL=
DIRECT_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Resend Email
RESEND_API_KEY=

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 5: Configure Clerk

Create `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

Update `src/app/layout.tsx`:

```typescript
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TeamPulse - Performance Reviews for Small Teams",
  description: "360-degree performance reviews with gap analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

---

## Step 6: Set Up Database

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection strings to `.env.local`

### Run Migrations

```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# (Optional) Seed database with default templates
pnpm prisma db seed
```

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create default templates
  const engineeringIC = await prisma.template.create({
    data: {
      name: "Engineering IC - Mid Level",
      description: "Performance review template for mid-level software engineers",
      isDefault: true,
      competencies: {
        create: [
          {
            name: "Technical Skills",
            description: "Quality of code, debugging ability, system design",
            order: 1,
          },
          {
            name: "Communication",
            description: "Clear documentation, effective meetings, async communication",
            order: 2,
          },
          {
            name: "Problem Solving",
            description: "Breaking down problems, finding solutions, learning from failures",
            order: 3,
          },
          {
            name: "Collaboration",
            description: "Code reviews, helping teammates, cross-team work",
            order: 4,
          },
          {
            name: "Ownership",
            description: "Taking responsibility, following through, proactive improvement",
            order: 5,
          },
        ],
      },
    },
  });

  const managerTemplate = await prisma.template.create({
    data: {
      name: "Engineering Manager",
      description: "Performance review template for engineering managers",
      isDefault: true,
      competencies: {
        create: [
          {
            name: "Team Development",
            description: "Growing team members, providing feedback, career pathing",
            order: 1,
          },
          {
            name: "Execution",
            description: "Delivering on commitments, removing blockers, planning",
            order: 2,
          },
          {
            name: "Communication",
            description: "Upward, downward, and cross-functional communication",
            order: 3,
          },
          {
            name: "Technical Leadership",
            description: "Technical decisions, architecture guidance, code review",
            order: 4,
          },
          {
            name: "Strategic Thinking",
            description: "Long-term planning, prioritization, business alignment",
            order: 5,
          },
        ],
      },
    },
  });

  console.log("Seeded templates:", { engineeringIC, managerTemplate });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Update `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

```bash
pnpm add -D ts-node
pnpm prisma db seed
```

---

## Step 7: Set Up PostHog

Create `src/lib/posthog.ts`:

```typescript
import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // We'll capture manually
    });
  }
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    posthog.capture(eventName, properties);
  }
};
```

---

## Step 8: Create Base Layout

Create `src/app/(dashboard)/layout.tsx`:

```typescript
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Review Cycles", href: "/cycles" },
  { name: "Team", href: "/team" },
  { name: "Goals", href: "/goals" },
  { name: "Templates", href: "/templates" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/dashboard" className="text-xl font-bold">
            TeamPulse
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 rounded-md hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6">
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

---

## Step 9: Create Prisma Client

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## Step 10: Start Development Server

```bash
# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
teampulse/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages (sign-in, sign-up)
│   │   ├── (dashboard)/   # Dashboard pages
│   │   │   ├── dashboard/
│   │   │   ├── cycles/
│   │   │   ├── team/
│   │   │   ├── goals/
│   │   │   └── templates/
│   │   ├── (marketing)/   # Landing page
│   │   ├── api/           # API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/            # shadcn components
│   │   └── ...            # Custom components
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   ├── posthog.ts     # Analytics
│   │   └── utils.ts       # Utilities
│   └── middleware.ts      # Clerk middleware
├── .env.local             # Environment variables
├── .env.example           # Example env file
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Quick Commands Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm prisma studio          # Open Prisma Studio (DB GUI)
pnpm prisma generate        # Generate Prisma client
pnpm prisma db push         # Push schema changes
pnpm prisma migrate dev     # Create migration
pnpm prisma db seed         # Run seed script

# Linting
pnpm lint                   # Run ESLint
pnpm format                 # Run Prettier

# shadcn/ui
pnpm dlx shadcn-ui@latest add [component]  # Add component
```

---

## Next Steps

After setup, proceed to:
1. **Implementation Tasks (03)** - Start building features
2. **Code Templates (04)** - Copy-paste common patterns
3. **Engineering Metrics (05)** - Set up tracking
