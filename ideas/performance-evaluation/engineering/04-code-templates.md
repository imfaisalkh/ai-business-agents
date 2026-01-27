# Code Templates

*Generated for: Performance Evaluation Tool*

---

## Database Schema (Drizzle)

### Full Schema

```typescript
// apps/api/src/db/schema.ts

import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// Users
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Teams
export const teams = sqliteTable('teams', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Team Members
export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['admin', 'manager', 'employee'] }).notNull().default('employee'),
  managerId: text('manager_id').references(() => users.id),
  title: text('title'),
  department: text('department'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Templates
export const templates = sqliteTable('templates', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').references(() => teams.id), // null = system template
  name: text('name').notNull(),
  description: text('description'),
  roleType: text('role_type'), // 'engineering', 'product', 'sales', 'manager'
  level: text('level'), // 'junior', 'mid', 'senior'
  isSystem: integer('is_system', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Template Sections
export const templateSections = sqliteTable('template_sections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  templateId: text('template_id').notNull().references(() => templates.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
})

// Template Questions
export const templateQuestions = sqliteTable('template_questions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  sectionId: text('section_id').notNull().references(() => templateSections.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  type: text('type', { enum: ['rating', 'text', 'multiselect'] }).notNull(),
  required: integer('required', { mode: 'boolean' }).default(true),
  order: integer('order').notNull(),
  ratingLabels: text('rating_labels'), // JSON string: ["Needs Work", "Meets", "Exceeds"]
})

// Review Cycles
export const reviewCycles = sqliteTable('review_cycles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  templateId: text('template_id').notNull().references(() => templates.id),
  name: text('name').notNull(),
  status: text('status', { enum: ['draft', 'active', 'completed', 'cancelled'] }).notNull().default('draft'),
  periodStart: integer('period_start', { mode: 'timestamp' }),
  periodEnd: integer('period_end', { mode: 'timestamp' }),
  selfReviewDue: integer('self_review_due', { mode: 'timestamp' }),
  peerFeedbackDue: integer('peer_feedback_due', { mode: 'timestamp' }),
  managerReviewDue: integer('manager_review_due', { mode: 'timestamp' }),
  includeSelfReview: integer('include_self_review', { mode: 'boolean' }).default(true),
  includePeerFeedback: integer('include_peer_feedback', { mode: 'boolean' }).default(true),
  peerCount: integer('peer_count').default(3),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Reviews
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  cycleId: text('cycle_id').notNull().references(() => reviewCycles.id, { onDelete: 'cascade' }),
  employeeId: text('employee_id').notNull().references(() => users.id),
  managerId: text('manager_id').notNull().references(() => users.id),
  selfReviewStatus: text('self_review_status', { enum: ['pending', 'in_progress', 'completed'] }).default('pending'),
  managerReviewStatus: text('manager_review_status', { enum: ['pending', 'in_progress', 'completed'] }).default('pending'),
  isShared: integer('is_shared', { mode: 'boolean' }).default(false),
  sharedAt: integer('shared_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Review Responses
export const reviewResponses = sqliteTable('review_responses', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  questionId: text('question_id').notNull().references(() => templateQuestions.id),
  responseType: text('response_type', { enum: ['self', 'manager'] }).notNull(),
  ratingValue: integer('rating_value'),
  textValue: text('text_value'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Peer Feedback Requests
export const peerFeedbackRequests = sqliteTable('peer_feedback_requests', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  peerId: text('peer_id').notNull().references(() => users.id),
  status: text('status', { enum: ['pending', 'completed', 'declined'] }).default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Peer Feedback (anonymized)
export const peerFeedback = sqliteTable('peer_feedback', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
  // Note: NO peerId here - feedback is anonymized
  collaborationRating: integer('collaboration_rating'),
  communicationRating: integer('communication_rating'),
  strengths: text('strengths'),
  areasForGrowth: text('areas_for_growth'),
  additionalComments: text('additional_comments'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  teamMemberships: many(teamMembers),
  reviews: many(reviews, { relationName: 'employeeReviews' }),
  managedReviews: many(reviews, { relationName: 'managerReviews' }),
}))

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
  cycles: many(reviewCycles),
}))

export const reviewCyclesRelations = relations(reviewCycles, ({ one, many }) => ({
  team: one(teams, { fields: [reviewCycles.teamId], references: [teams.id] }),
  template: one(templates, { fields: [reviewCycles.templateId], references: [templates.id] }),
  reviews: many(reviews),
}))

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  cycle: one(reviewCycles, { fields: [reviews.cycleId], references: [reviewCycles.id] }),
  employee: one(users, { fields: [reviews.employeeId], references: [users.id], relationName: 'employeeReviews' }),
  manager: one(users, { fields: [reviews.managerId], references: [users.id], relationName: 'managerReviews' }),
  responses: many(reviewResponses),
  peerFeedback: many(peerFeedback),
}))
```

---

## API Routes (Fastify)

### Auth Routes

```typescript
// apps/api/src/routes/auth.ts

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword, verifyPassword } from '../utils/auth'
import { createSession, destroySession } from '../utils/session'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  teamName: z.string().min(2),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authRoutes(app: FastifyInstance) {
  // Signup
  app.post('/api/auth/signup', async (request, reply) => {
    const body = signupSchema.parse(request.body)

    // Check if user exists
    const existing = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })
    if (existing) {
      return reply.status(400).send({ error: 'Email already registered' })
    }

    // Create user
    const passwordHash = await hashPassword(body.password)
    const [user] = await db.insert(users).values({
      email: body.email,
      name: body.name,
      passwordHash,
    }).returning()

    // Create team
    const [team] = await db.insert(teams).values({
      name: body.teamName,
    }).returning()

    // Add user as admin
    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: user.id,
      role: 'admin',
    })

    // Create session
    const sessionId = await createSession(user.id)
    reply.setCookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { user: { id: user.id, email: user.email, name: user.name } }
  })

  // Login
  app.post('/api/auth/login', async (request, reply) => {
    const body = loginSchema.parse(request.body)

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    })
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }

    const valid = await verifyPassword(body.password, user.passwordHash)
    if (!valid) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }

    const sessionId = await createSession(user.id)
    reply.setCookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { user: { id: user.id, email: user.email, name: user.name } }
  })

  // Logout
  app.post('/api/auth/logout', async (request, reply) => {
    const sessionId = request.cookies.sessionId
    if (sessionId) {
      await destroySession(sessionId)
    }
    reply.clearCookie('sessionId')
    return { success: true }
  })

  // Get current user
  app.get('/api/auth/me', async (request, reply) => {
    if (!request.user) {
      return reply.status(401).send({ error: 'Not authenticated' })
    }
    return { user: request.user }
  })
}
```

### Review Cycle Routes

```typescript
// apps/api/src/routes/cycles.ts

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { db } from '../db'
import { reviewCycles, reviews, teamMembers } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import { requireAuth, requireTeamAccess } from '../middleware/auth'
import { sendReviewRequestEmail } from '../services/email'

const createCycleSchema = z.object({
  name: z.string().min(1),
  templateId: z.string(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  selfReviewDue: z.string().datetime(),
  peerFeedbackDue: z.string().datetime().optional(),
  managerReviewDue: z.string().datetime(),
  includeSelfReview: z.boolean().default(true),
  includePeerFeedback: z.boolean().default(true),
  peerCount: z.number().min(1).max(10).default(3),
  participantIds: z.array(z.string()),
})

export async function cycleRoutes(app: FastifyInstance) {
  // List cycles for team
  app.get('/api/teams/:teamId/cycles', {
    preHandler: [requireAuth, requireTeamAccess],
  }, async (request) => {
    const { teamId } = request.params as { teamId: string }

    const cycles = await db.query.reviewCycles.findMany({
      where: eq(reviewCycles.teamId, teamId),
      orderBy: (cycles, { desc }) => [desc(cycles.createdAt)],
      with: {
        template: true,
        reviews: {
          columns: {
            id: true,
            selfReviewStatus: true,
            managerReviewStatus: true,
          },
        },
      },
    })

    return { cycles }
  })

  // Create cycle
  app.post('/api/teams/:teamId/cycles', {
    preHandler: [requireAuth, requireTeamAccess],
  }, async (request, reply) => {
    const { teamId } = request.params as { teamId: string }
    const body = createCycleSchema.parse(request.body)

    // Create cycle
    const [cycle] = await db.insert(reviewCycles).values({
      teamId,
      templateId: body.templateId,
      name: body.name,
      status: 'draft',
      periodStart: new Date(body.periodStart),
      periodEnd: new Date(body.periodEnd),
      selfReviewDue: new Date(body.selfReviewDue),
      peerFeedbackDue: body.peerFeedbackDue ? new Date(body.peerFeedbackDue) : null,
      managerReviewDue: new Date(body.managerReviewDue),
      includeSelfReview: body.includeSelfReview,
      includePeerFeedback: body.includePeerFeedback,
      peerCount: body.peerCount,
    }).returning()

    // Create reviews for each participant
    for (const participantId of body.participantIds) {
      const member = await db.query.teamMembers.findFirst({
        where: and(
          eq(teamMembers.userId, participantId),
          eq(teamMembers.teamId, teamId)
        ),
      })

      if (member) {
        await db.insert(reviews).values({
          cycleId: cycle.id,
          employeeId: participantId,
          managerId: member.managerId || request.user.id,
        })
      }
    }

    return { cycle }
  })

  // Launch cycle
  app.post('/api/cycles/:cycleId/launch', {
    preHandler: [requireAuth],
  }, async (request, reply) => {
    const { cycleId } = request.params as { cycleId: string }

    const cycle = await db.query.reviewCycles.findFirst({
      where: eq(reviewCycles.id, cycleId),
      with: {
        reviews: {
          with: {
            employee: true,
          },
        },
      },
    })

    if (!cycle) {
      return reply.status(404).send({ error: 'Cycle not found' })
    }

    // Update status
    await db.update(reviewCycles)
      .set({ status: 'active' })
      .where(eq(reviewCycles.id, cycleId))

    // Send emails to all participants
    for (const review of cycle.reviews) {
      await sendReviewRequestEmail(review.employee.email, {
        cycleName: cycle.name,
        dueDate: cycle.selfReviewDue,
        reviewLink: `${process.env.FRONTEND_URL}/reviews/${review.id}/self`,
      })
    }

    return { success: true }
  })

  // Get cycle details
  app.get('/api/cycles/:cycleId', {
    preHandler: [requireAuth],
  }, async (request, reply) => {
    const { cycleId } = request.params as { cycleId: string }

    const cycle = await db.query.reviewCycles.findFirst({
      where: eq(reviewCycles.id, cycleId),
      with: {
        template: {
          with: {
            sections: {
              with: {
                questions: true,
              },
            },
          },
        },
        reviews: {
          with: {
            employee: {
              columns: { id: true, name: true, email: true },
            },
            manager: {
              columns: { id: true, name: true },
            },
          },
        },
      },
    })

    if (!cycle) {
      return reply.status(404).send({ error: 'Cycle not found' })
    }

    return { cycle }
  })
}
```

---

## Vue Components (shadcn-vue)

### Rating Input Component

```vue
<!-- apps/web/components/ui/RatingInput.vue -->

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number | null
  max?: number
  labels?: string[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  labels: () => ['Needs Work', 'Below', 'Meets', 'Above', 'Exceeds'],
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const selectedLabel = computed(() => {
  if (props.modelValue === null) return ''
  return props.labels[props.modelValue - 1] || ''
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex gap-2">
      <button
        v-for="value in max"
        :key="value"
        type="button"
        :disabled="disabled"
        :class="[
          'w-10 h-10 rounded-full border-2 font-medium transition-all',
          modelValue === value
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed'
        ]"
        @click="emit('update:modelValue', value)"
      >
        {{ value }}
      </button>
    </div>
    <p v-if="selectedLabel" class="text-sm text-muted-foreground">
      {{ selectedLabel }}
    </p>
  </div>
</template>
```

### Gap Analysis Component

```vue
<!-- apps/web/components/reviews/GapAnalysis.vue -->

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  question: {
    id: string
    text: string
  }
  selfRating: number | null
  managerRating: number | null
  selfComment?: string
  managerComment?: string
}

const props = defineProps<Props>()

const gap = computed(() => {
  if (props.selfRating === null || props.managerRating === null) return null
  return props.selfRating - props.managerRating
})

const gapClass = computed(() => {
  if (gap.value === null) return ''
  if (Math.abs(gap.value) >= 2) return 'text-red-600 bg-red-50'
  if (Math.abs(gap.value) === 1) return 'text-yellow-600 bg-yellow-50'
  return 'text-green-600 bg-green-50'
})

const gapLabel = computed(() => {
  if (gap.value === null) return ''
  if (gap.value === 0) return 'Aligned'
  if (gap.value > 0) return `Self rates +${gap.value} higher`
  return `Manager rates +${Math.abs(gap.value)} higher`
})
</script>

<template>
  <div class="border rounded-lg p-4 space-y-4">
    <h4 class="font-medium">{{ question.text }}</h4>

    <div class="grid grid-cols-2 gap-4">
      <!-- Self Rating -->
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Self Rating</p>
        <div class="flex items-center gap-2">
          <div class="w-full bg-muted rounded-full h-2">
            <div
              class="bg-blue-500 h-2 rounded-full"
              :style="{ width: `${(selfRating || 0) * 20}%` }"
            />
          </div>
          <span class="font-medium w-8">{{ selfRating || '-' }}/5</span>
        </div>
        <p v-if="selfComment" class="text-sm italic">
          "{{ selfComment }}"
        </p>
      </div>

      <!-- Manager Rating -->
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">Manager Rating</p>
        <div class="flex items-center gap-2">
          <div class="w-full bg-muted rounded-full h-2">
            <div
              class="bg-green-500 h-2 rounded-full"
              :style="{ width: `${(managerRating || 0) * 20}%` }"
            />
          </div>
          <span class="font-medium w-8">{{ managerRating || '-' }}/5</span>
        </div>
        <p v-if="managerComment" class="text-sm italic">
          "{{ managerComment }}"
        </p>
      </div>
    </div>

    <!-- Gap Indicator -->
    <div
      v-if="gap !== null"
      :class="['px-3 py-2 rounded-md text-sm font-medium', gapClass]"
    >
      <span v-if="Math.abs(gap) >= 2">Warning: </span>
      {{ gapLabel }}
    </div>
  </div>
</template>
```

### Review Form Page

```vue
<!-- apps/web/pages/reviews/[id]/self.vue -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import RatingInput from '@/components/ui/RatingInput.vue'

const route = useRoute()
const router = useRouter()
const reviewId = route.params.id as string

const review = ref(null)
const responses = ref<Record<string, { rating: number | null; text: string }>>({})
const currentSection = ref(0)
const isSaving = ref(false)
const isSubmitting = ref(false)

const sections = computed(() => review.value?.cycle?.template?.sections || [])
const currentQuestions = computed(() => sections.value[currentSection.value]?.questions || [])
const progress = computed(() => {
  const total = sections.value.reduce((acc, s) => acc + s.questions.length, 0)
  const answered = Object.values(responses.value).filter(r => r.rating !== null).length
  return Math.round((answered / total) * 100)
})

onMounted(async () => {
  const res = await $fetch(`/api/reviews/${reviewId}`)
  review.value = res.review

  // Initialize responses
  for (const section of sections.value) {
    for (const question of section.questions) {
      const existing = res.review.responses.find(
        r => r.questionId === question.id && r.responseType === 'self'
      )
      responses.value[question.id] = {
        rating: existing?.ratingValue || null,
        text: existing?.textValue || '',
      }
    }
  }
})

async function saveDraft() {
  isSaving.value = true
  try {
    await $fetch(`/api/reviews/${reviewId}/responses`, {
      method: 'PUT',
      body: { responses: responses.value, type: 'self' },
    })
  } finally {
    isSaving.value = false
  }
}

async function submit() {
  isSubmitting.value = true
  try {
    await saveDraft()
    await $fetch(`/api/reviews/${reviewId}/submit-self`, { method: 'POST' })
    router.push('/dashboard')
  } finally {
    isSubmitting.value = false
  }
}

// Auto-save every 30 seconds
let saveInterval: NodeJS.Timeout
onMounted(() => {
  saveInterval = setInterval(saveDraft, 30000)
})
onUnmounted(() => {
  clearInterval(saveInterval)
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold">Self Review</h1>
      <p class="text-muted-foreground">
        {{ review?.cycle?.name }} - Due {{ new Date(review?.cycle?.selfReviewDue).toLocaleDateString() }}
      </p>
    </div>

    <!-- Progress -->
    <div class="mb-8">
      <div class="flex justify-between text-sm mb-2">
        <span>Progress</span>
        <span>{{ progress }}%</span>
      </div>
      <div class="w-full bg-muted rounded-full h-2">
        <div
          class="bg-primary h-2 rounded-full transition-all"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <!-- Section Tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
          currentSection === index
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80'
        ]"
        @click="currentSection = index"
      >
        {{ section.name }}
      </button>
    </div>

    <!-- Questions -->
    <div class="space-y-8">
      <div
        v-for="question in currentQuestions"
        :key="question.id"
        class="border rounded-lg p-6"
      >
        <label class="block font-medium mb-4">
          {{ question.text }}
          <span v-if="question.required" class="text-red-500">*</span>
        </label>

        <RatingInput
          v-if="question.type === 'rating'"
          v-model="responses[question.id].rating"
          :labels="JSON.parse(question.ratingLabels || '[]')"
        />

        <Textarea
          v-model="responses[question.id].text"
          placeholder="Add comments (optional)"
          class="mt-4"
          rows="3"
        />
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-8 pt-6 border-t">
      <Button
        variant="outline"
        :disabled="currentSection === 0"
        @click="currentSection--"
      >
        Previous
      </Button>

      <div class="flex gap-2">
        <Button variant="outline" :disabled="isSaving" @click="saveDraft">
          {{ isSaving ? 'Saving...' : 'Save Draft' }}
        </Button>

        <Button
          v-if="currentSection < sections.length - 1"
          @click="currentSection++"
        >
          Next Section
        </Button>

        <Button
          v-else
          :disabled="isSubmitting"
          @click="submit"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
        </Button>
      </div>
    </div>
  </div>
</template>
```

---

## Email Templates

### Review Request Email

```typescript
// apps/api/src/services/email.ts

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ReviewRequestData {
  cycleName: string
  dueDate: Date
  reviewLink: string
}

export async function sendReviewRequestEmail(
  to: string,
  data: ReviewRequestData
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: `Action Required: Complete your ${data.cycleName} self-review`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: system-ui, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
            .footer { margin-top: 40px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Time for your self-review</h1>

            <p>Your manager has initiated the <strong>${data.cycleName}</strong> review cycle.</p>

            <p>Please complete your self-review by <strong>${data.dueDate.toLocaleDateString()}</strong>.</p>

            <p>Your self-review helps your manager understand your perspective on your performance. Take your time to reflect on your accomplishments and areas for growth.</p>

            <p style="margin: 30px 0;">
              <a href="${data.reviewLink}" class="button">Start Self-Review</a>
            </p>

            <div class="footer">
              <p>If you have questions, please reach out to your manager.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  })
}

export async function sendReminderEmail(to: string, data: ReviewRequestData) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: `Reminder: Your self-review is due in 3 days`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Friendly reminder</h1>

          <p>Your <strong>${data.cycleName}</strong> self-review is due in 3 days (${data.dueDate.toLocaleDateString()}).</p>

          <p>
            <a href="${data.reviewLink}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Complete Self-Review</a>
          </p>
        </body>
      </html>
    `,
  })
}
```

---

## Utility Functions

### Gap Calculation

```typescript
// apps/api/src/utils/gap-analysis.ts

interface GapResult {
  questionId: string
  selfRating: number | null
  managerRating: number | null
  gap: number | null
  severity: 'aligned' | 'minor' | 'significant'
}

export function calculateGapAnalysis(
  selfResponses: Array<{ questionId: string; ratingValue: number | null }>,
  managerResponses: Array<{ questionId: string; ratingValue: number | null }>
): GapResult[] {
  const results: GapResult[] = []

  const selfMap = new Map(selfResponses.map(r => [r.questionId, r.ratingValue]))
  const managerMap = new Map(managerResponses.map(r => [r.questionId, r.ratingValue]))

  const allQuestionIds = new Set([...selfMap.keys(), ...managerMap.keys()])

  for (const questionId of allQuestionIds) {
    const selfRating = selfMap.get(questionId) || null
    const managerRating = managerMap.get(questionId) || null

    let gap: number | null = null
    let severity: 'aligned' | 'minor' | 'significant' = 'aligned'

    if (selfRating !== null && managerRating !== null) {
      gap = selfRating - managerRating
      if (Math.abs(gap) === 0) {
        severity = 'aligned'
      } else if (Math.abs(gap) === 1) {
        severity = 'minor'
      } else {
        severity = 'significant'
      }
    }

    results.push({
      questionId,
      selfRating,
      managerRating,
      gap,
      severity,
    })
  }

  return results
}

export function calculateOverallGap(results: GapResult[]) {
  const validResults = results.filter(r => r.gap !== null)
  if (validResults.length === 0) return null

  const totalGap = validResults.reduce((sum, r) => sum + (r.gap || 0), 0)
  const avgSelfRating = validResults.reduce((sum, r) => sum + (r.selfRating || 0), 0) / validResults.length
  const avgManagerRating = validResults.reduce((sum, r) => sum + (r.managerRating || 0), 0) / validResults.length

  return {
    averageGap: totalGap / validResults.length,
    avgSelfRating: Math.round(avgSelfRating * 10) / 10,
    avgManagerRating: Math.round(avgManagerRating * 10) / 10,
    alignedCount: validResults.filter(r => r.severity === 'aligned').length,
    minorGapCount: validResults.filter(r => r.severity === 'minor').length,
    significantGapCount: validResults.filter(r => r.severity === 'significant').length,
  }
}
```

---

*Next artifact: 05-engineering-metrics.md*
