# Project Setup Guide

> **Purpose:** Bootstrap TeamPulse from zero to running locally. Follow once at project start.

## Prerequisites

- Node.js 20+ LTS
- pnpm 9+
- Git
- Supabase account (free tier works)
- VS Code with extensions:
  - ESLint
  - Tailwind CSS IntelliSense
  - Prettier

---

## Step 1: Create Next.js Project

```bash
pnpm create next-app@latest teampulse \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd teampulse
```

---

## Step 2: Install Dependencies

```bash
# Core dependencies
pnpm add @supabase/supabase-js @supabase/ssr zod date-fns
pnpm add -D supabase

# UI (shadcn/ui)
pnpm dlx shadcn@latest init

# When prompted, choose:
# - Style: Default
# - Base color: Neutral
# - CSS variables: Yes

# Add shadcn components
pnpm dlx shadcn@latest add \
  button input textarea select label \
  card dialog sheet \
  table data-table \
  form toast sonner \
  dropdown-menu avatar badge \
  tabs progress separator \
  skeleton tooltip popover \
  calendar date-picker \
  alert alert-dialog \
  sidebar

# Icons
pnpm add lucide-react

# Email (React Email + Resend)
pnpm add @react-email/components resend

# Analytics
pnpm add posthog-js

# Payments
pnpm add stripe @stripe/stripe-js

# PDF Generation (for gap analysis export)
pnpm add @react-pdf/renderer

# Development
pnpm add -D @types/node
```

---

## Step 3: Setup Supabase Project

### 3.1 Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose organization and name your project "teampulse"
4. Set a secure database password (save this!)
5. Select a region close to your users
6. Wait for project to be created (~2 minutes)

### 3.2 Get API Keys

1. Go to Project Settings > API
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## Step 4: Setup Supabase Client

**Create `src/lib/supabase/client.ts`:** (Browser client)

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Create `src/lib/supabase/server.ts`:** (Server client)

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

**Create `src/lib/supabase/middleware.ts`:**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated and accessing protected route
  if (!user &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/register') &&
      !request.nextUrl.pathname.startsWith('/api/webhooks') &&
      request.nextUrl.pathname !== '/' &&
      request.nextUrl.pathname !== '/pricing' &&
      request.nextUrl.pathname !== '/features') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

---

## Step 5: Setup Authentication Middleware

**Create `src/middleware.ts`:**

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Create `src/app/(auth)/callback/route.ts`:** (OAuth callback)

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_error`)
}
```

**Update `src/app/layout.tsx`:**

```typescript
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

## Step 6: Setup Stripe

### 6.1 Create Stripe Account

1. Go to https://stripe.com and create account
2. Switch to Test Mode
3. Create a Product with recurring pricing:
   - Name: "TeamPulse"
   - Pricing: $6/employee/month (metered)
4. Copy API keys and price ID

### 6.2 Create Stripe Webhook

In Stripe Dashboard:
1. Developers > Webhooks > Add Endpoint
2. URL: `https://your-domain.com/api/webhooks/stripe`
3. Events to listen:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`

---

## Step 7: Setup Resend (Email)

### 7.1 Create Resend Account

1. Go to https://resend.com and create account
2. Verify your domain
3. Create API key

### 7.2 Create Email Templates

**Create `emails/reminder.tsx`:**

```typescript
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface ReminderEmailProps {
  recipientName: string
  cycleName: string
  dueDate: string
  actionUrl: string
  actionType: 'self-review' | 'peer-feedback' | 'manager-review'
}

export default function ReminderEmail({
  recipientName,
  cycleName,
  dueDate,
  actionUrl,
  actionType,
}: ReminderEmailProps) {
  const actionText = {
    'self-review': 'Complete Your Self-Review',
    'peer-feedback': 'Submit Peer Feedback',
    'manager-review': 'Write Team Reviews',
  }

  return (
    <Html>
      <Head />
      <Preview>{`Reminder: ${actionText[actionType]} for ${cycleName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Review Reminder</Heading>
          <Text style={text}>Hi {recipientName},</Text>
          <Text style={text}>
            This is a friendly reminder that your {actionText[actionType].toLowerCase()}
            for <strong>{cycleName}</strong> is due on <strong>{dueDate}</strong>.
          </Text>
          <Button style={button} href={actionUrl}>
            {actionText[actionType]}
          </Button>
          <Text style={footer}>
            - The TeamPulse Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }
const container = { margin: '0 auto', padding: '20px', maxWidth: '600px' }
const h1 = { color: '#333', fontSize: '24px' }
const text = { color: '#555', fontSize: '16px', lineHeight: '24px' }
const button = {
  backgroundColor: '#000',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = { color: '#888', fontSize: '14px', marginTop: '32px' }
```

---

## Step 8: Setup PostHog (Analytics)

### 8.1 Create PostHog Account

1. Go to https://posthog.com and create account
2. Create new project
3. Copy Project API Key

### 8.2 Create Analytics Provider

**Create `src/components/providers/posthog.tsx`:**

```typescript
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        capture_pageview: false,
        capture_pageleave: true,
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

export function PostHogIdentify() {
  const posthog = usePostHog()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.user_metadata?.name,
      })
    } else {
      posthog.reset()
    }
  }, [posthog, user])

  return null
}
```

---

## Step 9: Environment Setup

```bash
cat > .env.local << 'EOF'
# Supabase (Database + Auth) - Replace with your keys
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Payments (Stripe) - Replace with your keys
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_PRICE_ID="price_xxx"

# Email (Resend) - Replace with your key
RESEND_API_KEY="re_xxx"
EMAIL_FROM="TeamPulse <reviews@teampulse.app>"

# Analytics (PostHog) - Replace with your key
NEXT_PUBLIC_POSTHOG_KEY="phc_xxx"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="TeamPulse"
NODE_ENV="development"
EOF
```

---

## Step 10: Initialize Database

### 10.1 Apply Database Schema

Go to Supabase Dashboard > SQL Editor and run the schema from `01-technical-requirements.md`.

Or use the Supabase CLI:

```bash
# Initialize Supabase locally (optional)
pnpm supabase init

# Link to your remote project
pnpm supabase link --project-ref your-project-ref

# Push migrations
pnpm supabase db push
```

### 10.2 Seed System Templates

Run this SQL in Supabase SQL Editor to create the 4 system templates:

```sql
-- Engineering IC Template
WITH eng_ic AS (
  INSERT INTO public.templates (name, description, is_system, role_type, level)
  VALUES ('Engineering IC - Mid-Level', 'Performance review template for mid-level software engineers', true, 'engineering', 'mid')
  RETURNING id
)
INSERT INTO public.competencies (template_id, name, description, sort_order)
SELECT id, name, description, sort_order FROM eng_ic,
(VALUES
  ('Technical Skills', 'Ability to write clean, maintainable, and efficient code. Demonstrates strong debugging and problem-solving abilities.', 1),
  ('Code Quality', 'Writes well-tested code. Follows coding standards and best practices. Participates actively in code reviews.', 2),
  ('Problem Solving', 'Breaks down complex problems into manageable pieces. Identifies root causes and proposes effective solutions.', 3),
  ('Communication', 'Clearly communicates technical concepts. Documents work appropriately. Keeps stakeholders informed of progress.', 4),
  ('Collaboration', 'Works effectively with teammates. Shares knowledge willingly. Mentors junior team members.', 5),
  ('Ownership', 'Takes responsibility for work end-to-end. Proactively identifies and addresses issues. Follows through on commitments.', 6)
) AS v(name, description, sort_order);

-- Engineering Manager Template
WITH eng_mgr AS (
  INSERT INTO public.templates (name, description, is_system, role_type, level)
  VALUES ('Engineering Manager', 'Performance review template for engineering managers', true, 'manager', 'manager')
  RETURNING id
)
INSERT INTO public.competencies (template_id, name, description, sort_order)
SELECT id, name, description, sort_order FROM eng_mgr,
(VALUES
  ('Team Leadership', 'Builds and maintains a high-performing team. Creates an inclusive environment where everyone can do their best work.', 1),
  ('Technical Strategy', 'Makes sound technical decisions. Balances short-term needs with long-term technical health.', 2),
  ('People Development', 'Provides regular, actionable feedback. Supports career growth. Identifies and develops future leaders.', 3),
  ('Execution', 'Delivers projects on time and within scope. Manages risks proactively. Removes blockers for the team.', 4),
  ('Communication', 'Communicates clearly up, down, and across the organization. Represents the team effectively.', 5),
  ('Strategic Thinking', 'Aligns team work with company goals. Anticipates future needs and plans accordingly.', 6)
) AS v(name, description, sort_order);

-- Product Manager Template
WITH pm AS (
  INSERT INTO public.templates (name, description, is_system, role_type, level)
  VALUES ('Product Manager', 'Performance review template for product managers', true, 'product', 'mid')
  RETURNING id
)
INSERT INTO public.competencies (template_id, name, description, sort_order)
SELECT id, name, description, sort_order FROM pm,
(VALUES
  ('Product Vision', 'Defines clear product vision and strategy. Identifies opportunities that align with business goals.', 1),
  ('Customer Focus', 'Deeply understands customer needs. Uses data and research to drive decisions.', 2),
  ('Execution', 'Delivers products that meet quality standards. Manages scope and priorities effectively.', 3),
  ('Stakeholder Management', 'Builds strong relationships across the organization. Manages expectations effectively.', 4),
  ('Data-Driven Decision Making', 'Uses metrics to measure success. Makes decisions based on evidence.', 5),
  ('Communication', 'Writes clear PRDs and documentation. Presents ideas persuasively.', 6)
) AS v(name, description, sort_order);

-- General IC Template
WITH general AS (
  INSERT INTO public.templates (name, description, is_system, role_type, level)
  VALUES ('Individual Contributor - General', 'General-purpose performance review template for individual contributors', true, 'general', 'mid')
  RETURNING id
)
INSERT INTO public.competencies (template_id, name, description, sort_order)
SELECT id, name, description, sort_order FROM general,
(VALUES
  ('Job Knowledge', 'Demonstrates expertise in core job responsibilities. Stays current with industry trends and best practices.', 1),
  ('Quality of Work', 'Produces accurate, thorough, and high-quality work. Pays attention to detail.', 2),
  ('Productivity', 'Manages time effectively. Meets deadlines consistently. Handles workload efficiently.', 3),
  ('Communication', 'Communicates clearly and professionally. Listens actively and responds appropriately.', 4),
  ('Teamwork', 'Collaborates effectively with others. Contributes positively to team dynamics.', 5),
  ('Initiative', 'Proactively identifies opportunities. Takes action without being asked. Suggests improvements.', 6)
) AS v(name, description, sort_order);
```

---

## Step 11: Setup Supabase Storage

### 11.1 Create Storage Buckets

In Supabase Dashboard > Storage, or run this SQL:

```sql
-- Create storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp']),
  ('exports', 'exports', false, 10485760, array['application/pdf']);

-- Avatars: Public read, user can upload/update their own
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Exports: Private, owner only
create policy "Users can access their own exports"
  on storage.objects for select
  using (
    bucket_id = 'exports'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can upload their own exports"
  on storage.objects for insert
  with check (
    bucket_id = 'exports'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 11.2 Verify Storage Setup

1. Go to Supabase Dashboard > Storage
2. Verify `avatars` bucket is public
3. Verify `exports` bucket is private
4. Test upload in browser console (after auth)

---

## Step 12: Setup Supabase Edge Functions (Optional)

Edge Functions are useful for cron jobs and heavy processing. Skip if using Vercel Cron.

### 12.1 Initialize Edge Functions

```bash
# Create functions directory
mkdir -p supabase/functions

# Create reminder function
mkdir -p supabase/functions/send-reminders
cat > supabase/functions/send-reminders/index.ts << 'EOF'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // Get active cycles with pending reviews
    const { data: cycles } = await supabase
      .from("review_cycles")
      .select("*, organization:organizations(*)")
      .eq("status", "ACTIVE")

    // Send reminders logic here...
    console.log(`Found ${cycles?.length ?? 0} active cycles`)

    return new Response(
      JSON.stringify({ success: true, cycles: cycles?.length ?? 0 }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
EOF
```

### 12.2 Deploy Edge Functions

```bash
# Login to Supabase
pnpm supabase login

# Link project
pnpm supabase link --project-ref your-project-ref

# Deploy function
pnpm supabase functions deploy send-reminders

# Set secrets
pnpm supabase secrets set RESEND_API_KEY=re_xxx
```

### 12.3 Setup Cron with pg_cron (Alternative to Vercel Cron)

In Supabase SQL Editor:

```sql
-- Enable pg_cron extension (if not enabled)
create extension if not exists pg_cron;

-- Schedule daily reminder at 9am UTC
select cron.schedule(
  'send-review-reminders',
  '0 9 * * *',
  $$
  select net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    )
  );
  $$
);
```

---

## Step 13: Enable Realtime (Optional)

For live notifications when reviews are shared:

```sql
-- Enable realtime for specific tables
alter publication supabase_realtime add table reviews;
alter publication supabase_realtime add table self_reviews;
alter publication supabase_realtime add table review_cycles;
```

---

## Step 14: Run Development

```bash
# Start development server
pnpm dev
```

**Verify setup:**
- Visit http://localhost:3000 - should see landing page
- Visit Supabase Dashboard > Table Editor - shows your tables
- Test auth by signing up at /register

---

## Step 15: Production Deployment (Vercel)

### 15.1 Supabase Production Setup

Your Supabase project is already production-ready! Just ensure:
1. Enable email confirmations in Auth Settings if desired
2. Configure OAuth providers (Google) with production redirect URLs
3. Review and test RLS policies

### 15.2 Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login and link
vercel login
vercel link

# Set environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - All Stripe keys
# - Resend API key
# - PostHog key

# Deploy
vercel --prod
```

### 15.3 Post-Deploy Checklist

- [ ] Update Supabase Auth redirect URLs to production domain
- [ ] Update Stripe webhook URLs to production
- [ ] Test signup flow end-to-end
- [ ] Test payment flow with Stripe test cards
- [ ] Verify email delivery
- [ ] Check RLS policies are working correctly

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Supabase client errors | Verify NEXT_PUBLIC_SUPABASE_URL and keys are correct |
| Auth redirect errors | Check Site URL in Supabase Auth settings matches your domain |
| RLS blocking queries | Verify RLS policies, check user is authenticated |
| OAuth not working | Ensure callback URL is configured: `your-domain.com/callback` |
| Stripe webhook failures | Verify STRIPE_WEBHOOK_SECRET, check endpoint URL |
| Email not sending | Verify RESEND_API_KEY, check domain verification |
| PostHog events missing | Check NEXT_PUBLIC_POSTHOG_KEY, verify client initialization |
| Build errors | Clear `.next` folder, run `pnpm install` again |

---

## Development Workflow

### Daily Commands

```bash
# Start dev server
pnpm dev

# Apply schema changes (run SQL in Supabase Dashboard or CLI)
pnpm supabase db push

# View database
# Use Supabase Dashboard > Table Editor

# Test emails locally
pnpm dlx email dev
```

### Before Commit

```bash
# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Build test
pnpm build
```
