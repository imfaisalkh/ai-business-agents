# Code Templates

## API Route: Get Gap Analysis

**File:** `server/api/reviews/[id]/gap.get.ts`

```typescript
import { getServerSession } from '#auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const reviewId = getRouterParam(event, 'id')

  // Fetch review with self-review and manager preliminary ratings
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      employee: true,
      manager: true,
      selfReview: true,
      managerReview: true,
      peerFeedback: {
        select: {
          responses: true, // Don't include peerId (anonymity)
        },
      },
    },
  })

  if (!review) throw createError({ statusCode: 404, message: 'Review not found' })

  // Authorization: Only manager can view gap analysis
  if (review.managerId !== session.user.id) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  // Calculate gaps
  const selfRatings = review.selfReview?.ratings as Record<string, number> || {}
  const managerRatings = review.managerReview?.ratings as Record<string, number> || {}

  const gaps = Object.keys(selfRatings).map((competency) => ({
    competency,
    selfRating: selfRatings[competency],
    managerRating: managerRatings[competency] || 0,
    gap: (managerRatings[competency] || 0) - selfRatings[competency],
  }))

  return {
    review,
    gaps,
    coachingInsights: gaps
      .filter((g) => Math.abs(g.gap) > 2)
      .map((g) =>
        g.gap > 2
          ? `${g.competency}: Employee underrates themselves (confidence issue)`
          : `${g.competency}: Employee overrates themselves (blind spot)`
      ),
  }
})
```

---

## Component: Gap Analysis Table

**File:** `app/components/GapAnalysisTable.vue`

```vue
<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold">Gap Analysis</h2>
    <p class="text-muted-foreground">
      Side-by-side comparison of {{ employeeName }}'s self-ratings vs your ratings.
    </p>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Competency</TableHead>
          <TableHead>{{ employeeName }}'s Rating</TableHead>
          <TableHead>Your Rating</TableHead>
          <TableHead>Gap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="gap in gaps" :key="gap.competency">
          <TableCell class="font-medium">{{ gap.competency }}</TableCell>
          <TableCell>{{ gap.selfRating }}/5</TableCell>
          <TableCell>{{ gap.managerRating }}/5</TableCell>
          <TableCell>
            <Badge :variant="getGapVariant(gap.gap)">
              {{ gap.gap > 0 ? `+${gap.gap}` : gap.gap }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div v-if="coachingInsights.length > 0" class="bg-muted p-4 rounded-md">
      <h3 class="font-semibold mb-2">💡 Coaching Insights</h3>
      <ul class="list-disc list-inside space-y-1">
        <li v-for="insight in coachingInsights" :key="insight">{{ insight }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '~/components/ui'

const props = defineProps<{
  employeeName: string
  gaps: Array<{
    competency: string
    selfRating: number
    managerRating: number
    gap: number
  }>
  coachingInsights: string[]
}>()

const getGapVariant = (gap: number) => {
  if (Math.abs(gap) > 2) return 'destructive' // Large gap
  if (Math.abs(gap) === 0) return 'default' // No gap
  return 'secondary' // Small gap
}
</script>
```

---

## Utility: Send Email

**File:** `server/utils/email.ts`

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSelfReviewRequest(to: string, reviewLink: string, employeeName: string, deadline: string) {
  await resend.emails.send({
    from: 'TeamPulse <noreply@TeamPulse.com>',
    to,
    subject: `Your Q1 2026 self-review is ready`,
    html: `
      <p>Hi ${employeeName},</p>
      <p>Your manager has requested your self-review. Please complete it by <strong>${deadline}</strong>.</p>
      <p><a href="${reviewLink}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Self-Review</a></p>
      <p>This should take 10-15 minutes. Your feedback helps your manager prepare for a better 1:1 conversation.</p>
      <p>Thanks,<br>TeamPulse</p>
    `,
  })
}

export async function sendPeerFeedbackRequest(to: string, feedbackLink: string, employeeName: string) {
  await resend.emails.send({
    from: 'TeamPulse <noreply@TeamPulse.com>',
    to,
    subject: `${employeeName} has requested your feedback`,
    html: `
      <p>Hi,</p>
      <p>${employeeName} has requested your feedback for their performance review. Your responses are <strong>anonymous</strong> and will be aggregated with other feedback.</p>
      <p><a href="${feedbackLink}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Give Feedback</a></p>
      <p>This should take 5-10 minutes. Thanks for helping your teammate grow!</p>
      <p>TeamPulse</p>
    `,
  })
}
```

---

## Middleware: Auth Check

**File:** `server/middleware/auth.ts`

```typescript
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  // Skip auth for public routes
  if (event.path.startsWith('/api/auth') || event.path.startsWith('/api/public')) {
    return
  }

  // Require auth for all other API routes
  if (event.path.startsWith('/api')) {
    const session = await getServerSession(event)
    if (!session) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    // Attach user to event context
    event.context.user = session.user
  }
})
```

---

## Component: Self-Review Form

**File:** `app/pages/self-review/[id].vue`

```vue
<template>
  <div class="max-w-2xl mx-auto py-8 space-y-6">
    <h1 class="text-3xl font-bold">Q1 2026 Self-Review</h1>
    <p class="text-muted-foreground">
      Your manager will see your ratings and reflections. Be honest—this helps them coach you better.
    </p>

    <form @submit.prevent="submitReview" class="space-y-8">
      <div v-for="(competency, index) in competencies" :key="index" class="border p-4 rounded-md">
        <h3 class="font-semibold mb-2">{{ index + 1 }}. {{ competency.name }}</h3>
        <p class="text-sm text-muted-foreground mb-4">{{ competency.description }}</p>

        <Label>Rate yourself:</Label>
        <StarRating v-model="ratings[competency.name]" />

        <Label class="mt-4">What went well:</Label>
        <Textarea v-model="reflections[competency.name + '_well']" rows="3" />

        <Label class="mt-4">What to improve:</Label>
        <Textarea v-model="reflections[competency.name + '_improve']" rows="3" />
      </div>

      <div class="border p-4 rounded-md">
        <Label>📌 Request Peer Feedback (Optional)</Label>
        <p class="text-sm text-muted-foreground mb-2">Select 2-3 teammates to give you feedback:</p>
        <div class="space-y-2">
          <Checkbox v-for="peer in availablePeers" :key="peer.id" v-model="selectedPeers" :value="peer.id">
            {{ peer.name }}
          </Checkbox>
        </div>
      </div>

      <div class="flex gap-4">
        <Button type="button" variant="outline" @click="saveDraft">Save Draft</Button>
        <Button type="submit">Submit Self-Review</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const reviewId = useRoute().params.id
const { data: review } = await useFetch(`/api/reviews/${reviewId}`)

const competencies = ref(review.value.template.competencies)
const ratings = ref({})
const reflections = ref({})
const selectedPeers = ref([])

async function submitReview() {
  await $fetch(`/api/reviews/${reviewId}/self-review`, {
    method: 'POST',
    body: { ratings: ratings.value, reflections: reflections.value, peerIds: selectedPeers.value },
  })
  navigateTo('/dashboard')
}

async function saveDraft() {
  await $fetch(`/api/reviews/${reviewId}/self-review/draft`, {
    method: 'POST',
    body: { ratings: ratings.value, reflections: reflections.value },
  })
}
</script>
```

---

*Last updated: January 27, 2026*
