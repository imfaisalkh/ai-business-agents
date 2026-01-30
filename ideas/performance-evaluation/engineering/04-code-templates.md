# Code Templates

> **Purpose:** Production-ready code patterns for TeamPulse. Copy-paste and customize.

---

## Table of Contents

1. [Server Actions: CRUD Pattern](#server-actions-crud-pattern)
2. [Server Actions: Review System](#server-actions-review-system)
3. [Components: Dashboard Layout](#components-dashboard-layout)
4. [Components: Review Form](#components-review-form)
5. [Components: Gap Analysis](#components-gap-analysis)
6. [Hooks: Auto-Save](#hooks-auto-save)
7. [Analytics: PostHog](#analytics-posthog)
8. [Email: Reminder Templates](#email-reminder-templates)
9. [API Routes: Webhooks](#api-routes-webhooks)
10. [Supabase Storage](#supabase-storage)
11. [Supabase Edge Functions](#supabase-edge-functions)
12. [Supabase Realtime](#supabase-realtime)

---

## Server Actions: CRUD Pattern

### Base Action Pattern (`src/actions/base.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Standard response types
export type ActionSuccess<T> = { success: true; data: T }
export type ActionError = { success: false; error: { code: string; message: string } }
export type ActionResult<T> = ActionSuccess<T> | ActionError

// Get current user with organization context
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) throw new Error("Unauthorized")

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, organization:organizations(*)")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) throw new Error("User not found")
  return { ...profile, auth_user: user }
}

// Authorization helper
export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser()
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden")
  }
  return user
}
```

### Review Cycles CRUD (`src/actions/cycles.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { getCurrentUser, requireRole, type ActionResult } from "./base"

const createCycleSchema = z.object({
  name: z.string().min(1).max(100),
  templateId: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  selfReviewDue: z.coerce.date(),
  peerFeedbackDue: z.coerce.date(),
  managerReviewDue: z.coerce.date(),
  participantIds: z.array(z.string()).min(1),
}).refine(data => data.selfReviewDue < data.peerFeedbackDue, {
  message: "Self-review must be due before peer feedback",
}).refine(data => data.peerFeedbackDue < data.managerReviewDue, {
  message: "Peer feedback must be due before manager review",
})

// List cycles
export async function getCycles(
  status?: string
): Promise<ActionResult<any[]>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    let query = supabase
      .from("review_cycles")
      .select(`
        *,
        template:templates(*),
        participants:cycle_participants(*, user:profiles(*))
      `)
      .eq("organization_id", user.organization_id)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: cycles, error } = await query

    if (error) throw error

    return { success: true, data: cycles || [] }
  } catch (error) {
    return { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch cycles" } }
  }
}

// Create cycle
export async function createCycle(
  formData: FormData
): Promise<ActionResult<any>> {
  try {
    const user = await requireRole(["OWNER", "ADMIN", "MANAGER"])
    const supabase = await createClient()

    const parsed = createCycleSchema.safeParse({
      name: formData.get("name"),
      templateId: formData.get("templateId"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      selfReviewDue: formData.get("selfReviewDue"),
      peerFeedbackDue: formData.get("peerFeedbackDue"),
      managerReviewDue: formData.get("managerReviewDue"),
      participantIds: formData.getAll("participantIds"),
    })

    if (!parsed.success) {
      return { success: false, error: { code: "VALIDATION_ERROR", message: parsed.error.message } }
    }

    // Create the cycle
    const { data: cycle, error: cycleError } = await supabase
      .from("review_cycles")
      .insert({
        name: parsed.data.name,
        organization_id: user.organization_id,
        template_id: parsed.data.templateId,
        start_date: parsed.data.startDate.toISOString(),
        end_date: parsed.data.endDate.toISOString(),
        self_review_due: parsed.data.selfReviewDue.toISOString(),
        peer_feedback_due: parsed.data.peerFeedbackDue.toISOString(),
        manager_review_due: parsed.data.managerReviewDue.toISOString(),
      })
      .select()
      .single()

    if (cycleError) throw cycleError

    // Add participants
    const participants = parsed.data.participantIds.map(userId => ({
      cycle_id: cycle.id,
      user_id: userId,
    }))

    const { error: participantsError } = await supabase
      .from("cycle_participants")
      .insert(participants)

    if (participantsError) throw participantsError

    revalidatePath("/cycles")
    return { success: true, data: cycle }
  } catch (error) {
    return { success: false, error: { code: "CREATE_ERROR", message: "Failed to create cycle" } }
  }
}

// Get single cycle with full details
export async function getCycle(id: string): Promise<ActionResult<ReviewCycle & {
  participants: any[];
  reviews: any[];
  selfReviews: any[];
}>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: cycle, error } = await supabase
      .from("review_cycles")
      .select(`
        *,
        template:templates(*, competencies(*)),
        participants:cycle_participants(
          *,
          user:profiles(id, name, email, job_title, level)
        ),
        reviews(
          *,
          ratings:review_ratings(*),
          author:profiles!reviewer_id(id, name),
          subject:profiles!reviewee_id(id, name)
        ),
        self_reviews(
          *,
          ratings:self_review_ratings(*),
          user:profiles(id, name)
        )
      `)
      .eq("id", id)
      .eq("organization_id", user.organization_id)
      .single()

    if (error || !cycle) {
      return { success: false, error: { code: "NOT_FOUND", message: "Cycle not found" } }
    }

    return { success: true, data: cycle }
  } catch (error) {
    return { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch cycle" } }
  }
}

// Activate cycle
export async function activateCycle(id: string): Promise<ActionResult<ReviewCycle>> {
  try {
    const user = await requireRole(["OWNER", "ADMIN", "MANAGER"])
    const supabase = await createClient()

    const { data: cycle, error: cycleError } = await supabase
      .from("review_cycles")
      .select("*, participants:cycle_participants(*)")
      .eq("id", id)
      .eq("organization_id", user.organization_id)
      .single()

    if (cycleError || !cycle) {
      return { success: false, error: { code: "NOT_FOUND", message: "Cycle not found" } }
    }

    if (cycle.status !== "DRAFT") {
      return { success: false, error: { code: "ALREADY_ACTIVE", message: "Cycle is not in draft status" } }
    }

    if (!cycle.participants || cycle.participants.length === 0) {
      return { success: false, error: { code: "NO_PARTICIPANTS", message: "Add participants before activating" } }
    }

    // Create self-reviews and manager reviews for each participant
    for (const participant of cycle.participants) {
      const { data: participantUser } = await supabase
        .from("profiles")
        .select("manager_id")
        .eq("id", participant.user_id)
        .single()

      // Create self-review
      await supabase.from("self_reviews").insert({
        cycle_id: id,
        user_id: participant.user_id,
      })

      // Create manager review if participant has a manager
      if (participantUser?.manager_id) {
        await supabase.from("reviews").insert({
          cycle_id: id,
          reviewer_id: participantUser.manager_id,
          reviewee_id: participant.user_id,
        })
      }
    }

    const { data: updatedCycle, error: updateError } = await supabase
      .from("review_cycles")
      .update({ status: "ACTIVE" })
      .eq("id", id)
      .select()
      .single()

    if (updateError) throw updateError

    revalidatePath("/cycles")
    revalidatePath(`/cycles/${id}`)
    return { success: true, data: updatedCycle }
  } catch (error) {
    return { success: false, error: { code: "ACTIVATE_ERROR", message: "Failed to activate cycle" } }
  }
}
```

---

## Server Actions: Review System

### Manager Reviews (`src/actions/reviews.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { getCurrentUser, type ActionResult } from "./base"

const ratingSchema = z.object({
  competencyId: z.string(),
  rating: z.number().min(1).max(5),
  feedback: z.string().optional(),
})

const updateReviewSchema = z.object({
  ratings: z.array(ratingSchema),
  overallRating: z.number().min(1).max(5).optional(),
  overallFeedback: z.string().optional(),
})

// Get review for writing
export async function getReviewForWriting(
  cycleId: string,
  subjectId: string
): Promise<ActionResult<any>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: review, error } = await supabase
      .from("reviews")
      .select(`
        *,
        ratings:review_ratings(*, competency:competencies(*)),
        subject:profiles!reviewee_id(
          id, name, email, job_title, level,
          goals(*)
        ),
        cycle:review_cycles(
          *,
          template:templates(*, competencies(*))
        )
      `)
      .eq("cycle_id", cycleId)
      .eq("reviewee_id", subjectId)
      .eq("reviewer_id", user.id)
      .single()

    if (error || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found" } }
    }

    // Get aggregated peer feedback
    const { data: peerFeedback } = await supabase
      .from("peer_feedback")
      .select("*, request:peer_feedback_requests!inner(*)")
      .eq("subject_id", subjectId)
      .eq("request.cycle_id", cycleId)

    return {
      success: true,
      data: {
        ...review,
        peerFeedback: (peerFeedback?.length ?? 0) >= 3 ? aggregatePeerFeedback(peerFeedback!) : null,
        peerFeedbackCount: peerFeedback?.length ?? 0,
      },
    }
  } catch (error) {
    return { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch review" } }
  }
}

// Aggregate peer feedback (anonymize)
function aggregatePeerFeedback(feedback: any[]) {
  return {
    count: feedback.length,
    avgCollaborationRating: feedback.reduce((sum, f) => sum + (f.collaboration_rating || 0), 0) / feedback.length,
    strengths: feedback.map(f => f.strengths).filter(Boolean),
    areasForGrowth: feedback.map(f => f.areas_for_growth).filter(Boolean),
  }
}

// Update review (auto-save)
export async function updateReview(
  reviewId: string,
  data: z.infer<typeof updateReviewSchema>
): Promise<ActionResult<Review>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: review, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", reviewId)
      .eq("reviewer_id", user.id)
      .single()

    if (error || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found" } }
    }

    if (review.status === "SHARED") {
      return { success: false, error: { code: "ALREADY_SHARED", message: "Cannot edit shared review" } }
    }

    // Update ratings with upsert
    for (const rating of data.ratings) {
      await supabase
        .from("review_ratings")
        .upsert({
          review_id: reviewId,
          competency_id: rating.competencyId,
          rating: rating.rating,
          feedback: rating.feedback,
        }, {
          onConflict: "review_id,competency_id"
        })
    }

    // Update overall
    const { data: updated, error: updateError } = await supabase
      .from("reviews")
      .update({
        overall_rating: data.overallRating,
        overall_feedback: data.overallFeedback,
        status: "IN_PROGRESS",
      })
      .eq("id", reviewId)
      .select()
      .single()

    if (updateError) throw updateError
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: { code: "UPDATE_ERROR", message: "Failed to update review" } }
  }
}

// Submit review
export async function submitReview(reviewId: string): Promise<ActionResult<Review>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: review, error } = await supabase
      .from("reviews")
      .select(`
        *,
        ratings:review_ratings(*),
        cycle:review_cycles(*, template:templates(*, competencies(*)))
      `)
      .eq("id", reviewId)
      .eq("reviewer_id", user.id)
      .single()

    if (error || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found" } }
    }

    // Check all competencies have ratings
    const requiredCompetencies = review.cycle?.template?.competencies?.length || 0
    if ((review.ratings?.length || 0) < requiredCompetencies) {
      return { success: false, error: { code: "INCOMPLETE", message: "All competencies must be rated" } }
    }

    if (!review.overall_rating) {
      return { success: false, error: { code: "INCOMPLETE", message: "Overall rating is required" } }
    }

    const { data: updated, error: updateError } = await supabase
      .from("reviews")
      .update({
        status: "SUBMITTED",
        submitted_at: new Date().toISOString(),
      })
      .eq("id", reviewId)
      .select()
      .single()

    if (updateError) throw updateError

    revalidatePath(`/cycles/${review.cycle_id}`)
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: { code: "SUBMIT_ERROR", message: "Failed to submit review" } }
  }
}

// Share review with employee
export async function shareReview(reviewId: string): Promise<ActionResult<Review>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: review, error } = await supabase
      .from("reviews")
      .select("*, subject:profiles!reviewee_id(*)")
      .eq("id", reviewId)
      .eq("reviewer_id", user.id)
      .eq("status", "SUBMITTED")
      .single()

    if (error || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found or not ready to share" } }
    }

    const { data: updated, error: updateError } = await supabase
      .from("reviews")
      .update({
        status: "SHARED",
        shared_at: new Date().toISOString(),
      })
      .eq("id", reviewId)
      .select()
      .single()

    if (updateError) throw updateError

    // TODO: Send notification email
    // await sendReviewSharedEmail(review.subject.email, ...)

    revalidatePath(`/cycles/${review.cycle_id}`)
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: { code: "SHARE_ERROR", message: "Failed to share review" } }
  }
}
```

### Self-Reviews (`src/actions/self-reviews.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { getCurrentUser, type ActionResult } from "./base"

const updateSelfReviewSchema = z.object({
  ratings: z.array(z.object({
    competencyId: z.string(),
    rating: z.number().min(1).max(5),
    feedback: z.string().optional(),
  })),
  overallRating: z.number().min(1).max(5).optional(),
  overallFeedback: z.string().optional(),
  accomplishments: z.string().optional(),
  nextPeriodGoals: z.string().optional(),
})

// Get my self-review for a cycle
export async function getSelfReview(cycleId: string): Promise<ActionResult<any>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: selfReview, error } = await supabase
      .from("self_reviews")
      .select(`
        *,
        ratings:self_review_ratings(*, competency:competencies(*)),
        cycle:review_cycles(
          *,
          template:templates(*, competencies(*))
        )
      `)
      .eq("cycle_id", cycleId)
      .eq("user_id", user.id)
      .single()

    if (error || !selfReview) {
      return { success: false, error: { code: "NOT_FOUND", message: "Self-review not found" } }
    }

    return { success: true, data: selfReview }
  } catch (error) {
    return { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch self-review" } }
  }
}

// Update self-review (auto-save)
export async function updateSelfReview(
  selfReviewId: string,
  data: z.infer<typeof updateSelfReviewSchema>
): Promise<ActionResult<SelfReview>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: selfReview, error } = await supabase
      .from("self_reviews")
      .select("*")
      .eq("id", selfReviewId)
      .eq("user_id", user.id)
      .single()

    if (error || !selfReview) {
      return { success: false, error: { code: "NOT_FOUND", message: "Self-review not found" } }
    }

    if (selfReview.status === "SUBMITTED") {
      return { success: false, error: { code: "ALREADY_SUBMITTED", message: "Cannot edit submitted self-review" } }
    }

    // Update ratings with upsert
    for (const rating of data.ratings) {
      await supabase
        .from("self_review_ratings")
        .upsert({
          self_review_id: selfReviewId,
          competency_id: rating.competencyId,
          rating: rating.rating,
          feedback: rating.feedback,
        }, {
          onConflict: "self_review_id,competency_id"
        })
    }

    const { data: updated, error: updateError } = await supabase
      .from("self_reviews")
      .update({
        overall_rating: data.overallRating,
        overall_feedback: data.overallFeedback,
        accomplishments: data.accomplishments,
        next_period_goals: data.nextPeriodGoals,
        status: "IN_PROGRESS",
      })
      .eq("id", selfReviewId)
      .select()
      .single()

    if (updateError) throw updateError
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: { code: "UPDATE_ERROR", message: "Failed to update self-review" } }
  }
}

// Submit self-review
export async function submitSelfReview(selfReviewId: string): Promise<ActionResult<SelfReview>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: selfReview, error } = await supabase
      .from("self_reviews")
      .select(`
        *,
        ratings:self_review_ratings(*),
        cycle:review_cycles(*, template:templates(*, competencies(*)))
      `)
      .eq("id", selfReviewId)
      .eq("user_id", user.id)
      .single()

    if (error || !selfReview) {
      return { success: false, error: { code: "NOT_FOUND", message: "Self-review not found" } }
    }

    // Check deadline
    if (new Date() > new Date(selfReview.cycle.self_review_due)) {
      return { success: false, error: { code: "PAST_DEADLINE", message: "Self-review deadline has passed" } }
    }

    // Check completeness
    const requiredCompetencies = selfReview.cycle?.template?.competencies?.length || 0
    if ((selfReview.ratings?.length || 0) < requiredCompetencies) {
      return { success: false, error: { code: "INCOMPLETE", message: "All competencies must be rated" } }
    }

    const { data: updated, error: updateError } = await supabase
      .from("self_reviews")
      .update({
        status: "SUBMITTED",
        submitted_at: new Date().toISOString(),
      })
      .eq("id", selfReviewId)
      .select()
      .single()

    if (updateError) throw updateError

    revalidatePath(`/reviews/self/${selfReviewId}`)
    return { success: true, data: updated }
  } catch (error) {
    return { success: false, error: { code: "SUBMIT_ERROR", message: "Failed to submit self-review" } }
  }
}
```

### Gap Analysis (`src/actions/gap-analysis.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser, type ActionResult } from "./base"

export interface GapAnalysisData {
  review: any
  selfReview: any
  gaps: {
    competencyId: string
    competencyName: string
    managerRating: number
    selfRating: number
    gap: number
    managerFeedback: string | null
    selfFeedback: string | null
    isSignificant: boolean
  }[]
  overallGap: number
}

export async function getGapAnalysis(reviewId: string): Promise<ActionResult<GapAnalysisData>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    // Get manager review
    const { data: review, error: reviewError } = await supabase
      .from("reviews")
      .select(`
        *,
        ratings:review_ratings(*, competency:competencies(*)),
        subject:profiles!reviewee_id(id, name, email),
        cycle:review_cycles(*, template:templates(*, competencies(*)))
      `)
      .eq("id", reviewId)
      .eq("reviewer_id", user.id)
      .in("status", ["SUBMITTED", "SHARED"])
      .single()

    if (reviewError || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found" } }
    }

    // Get self-review
    const { data: selfReview, error: selfReviewError } = await supabase
      .from("self_reviews")
      .select(`
        *,
        ratings:self_review_ratings(*, competency:competencies(*))
      `)
      .eq("cycle_id", review.cycle_id)
      .eq("user_id", review.reviewee_id)
      .eq("status", "SUBMITTED")
      .single()

    if (selfReviewError || !selfReview) {
      return { success: false, error: { code: "SELF_REVIEW_NOT_SUBMITTED", message: "Employee has not submitted self-review yet" } }
    }

    // Calculate gaps
    const gaps = review.cycle?.template?.competencies?.map((competency: any) => {
      const managerRating = review.ratings?.find((r: any) => r.competency_id === competency.id)
      const selfRating = selfReview.ratings?.find((r: any) => r.competency_id === competency.id)

      const managerValue = managerRating?.rating || 0
      const selfValue = selfRating?.rating || 0
      const gap = selfValue - managerValue

      return {
        competencyId: competency.id,
        competencyName: competency.name,
        managerRating: managerValue,
        selfRating: selfValue,
        gap: Math.abs(gap),
        managerFeedback: managerRating?.feedback || null,
        selfFeedback: selfRating?.feedback || null,
        isSignificant: Math.abs(gap) >= 1.5,
      }
    }) || []

    // Sort by gap size (largest first)
    gaps.sort((a: any, b: any) => b.gap - a.gap)

    const overallGap = Math.abs(
      (selfReview.overall_rating || 0) - (review.overall_rating || 0)
    )

    return {
      success: true,
      data: {
        review,
        selfReview,
        gaps,
        overallGap,
      },
    }
  } catch (error) {
    return { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch gap analysis" } }
  }
}
```

---

## Components: Dashboard Layout

### Sidebar (`src/components/layout/sidebar.tsx`)

```typescript
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  RefreshCw,
  Users,
  Target,
  FileText,
  Settings,
  ChevronsLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cycles", label: "Review Cycles", icon: RefreshCw },
  { href: "/team", label: "Team", icon: Users },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-muted/40 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href="/dashboard" className="font-semibold text-lg">
            TeamPulse
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(collapsed && "mx-auto")}
        >
          <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground font-medium",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
```

### Header (`src/components/layout/header.tsx`)

```typescript
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/actions/auth"
import type { User } from "@supabase/supabase-js"

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <div className="md:hidden font-semibold">TeamPulse</div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuItem>
              <div>
                <p className="font-medium">Self-review due soon</p>
                <p className="text-sm text-muted-foreground">Q1 2026 Reviews - 2 days left</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user.user_metadata?.name?.[0] || user.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">
                {user.user_metadata?.name || user.email}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <form action={signOut}>
                <button type="submit" className="w-full text-left">
                  Sign out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

### Dashboard Layout (`src/app/(dashboard)/layout.tsx`)

```typescript
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
```

---

## Components: Review Form

### Rating Input (`src/components/reviews/rating-input.tsx`)

```typescript
"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface RatingInputProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const labels = ["", "Poor", "Below Average", "Average", "Above Average", "Excellent"]

export function RatingInput({ value, onChange, disabled }: RatingInputProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            disabled={disabled}
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHovered(rating)}
            onMouseLeave={() => setHovered(0)}
            className={cn(
              "w-8 h-8 rounded-md border-2 transition-colors text-sm font-medium",
              rating <= (hovered || value)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/25 hover:border-primary/50",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {rating}
          </button>
        ))}
      </div>
      <span className="text-sm text-muted-foreground min-w-[100px]">
        {labels[hovered || value] || "Select rating"}
      </span>
    </div>
  )
}
```

### Review Form (`src/components/reviews/review-form.tsx`)

```typescript
"use client"

import { useState, useTransition } from "react"
import { useAutoSave } from "@/hooks/use-autosave"
import { updateReview, submitReview } from "@/actions/reviews"
import { RatingInput } from "./rating-input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

interface ReviewFormProps {
  review: any
  competencies: any[]
  peerFeedback: any
  goals: any[]
}

export function ReviewForm({ review, competencies, peerFeedback, goals }: ReviewFormProps) {
  const [isPending, startTransition] = useTransition()
  const [ratings, setRatings] = useState<Record<string, { rating: number; feedback: string }>>(
    review.ratings.reduce((acc: any, r: any) => ({
      ...acc,
      [r.competencyId]: { rating: r.rating, feedback: r.feedback || "" },
    }), {})
  )
  const [overallRating, setOverallRating] = useState(review.overallRating || 0)
  const [overallFeedback, setOverallFeedback] = useState(review.overallFeedback || "")

  const completedCount = Object.values(ratings).filter(r => r.rating > 0).length
  const progress = (completedCount / competencies.length) * 100

  // Auto-save
  const { isSaving, lastSaved } = useAutoSave({
    data: { ratings: Object.entries(ratings).map(([id, r]) => ({ competencyId: id, ...r })), overallRating, overallFeedback },
    onSave: async (data) => {
      const result = await updateReview(review.id, data)
      if (!result.success) throw new Error(result.error.message)
    },
    debounceMs: 1000,
  })

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await submitReview(review.id)
      if (result.success) {
        toast.success("Review submitted successfully")
      } else {
        toast.error(result.error.message)
      }
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Review for {review.subject.name}</h1>
            <p className="text-muted-foreground">{review.subject.jobTitle} - {review.subject.level}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {lastSaved && <span>Saved {lastSaved}</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm text-muted-foreground">
            {completedCount}/{competencies.length} rated
          </span>
        </div>

        {competencies.map((competency, index) => (
          <Card key={competency.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {index + 1}. {competency.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{competency.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <RatingInput
                value={ratings[competency.id]?.rating || 0}
                onChange={(rating) => setRatings(prev => ({
                  ...prev,
                  [competency.id]: { ...prev[competency.id], rating },
                }))}
              />
              <Textarea
                placeholder="Provide specific feedback for this competency..."
                value={ratings[competency.id]?.feedback || ""}
                onChange={(e) => setRatings(prev => ({
                  ...prev,
                  [competency.id]: { ...prev[competency.id], feedback: e.target.value },
                }))}
                rows={3}
              />
            </CardContent>
          </Card>
        ))}

        {/* Overall section */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Overall Rating</label>
              <RatingInput value={overallRating} onChange={setOverallRating} />
            </div>
            <div>
              <label className="text-sm font-medium">Summary Feedback</label>
              <Textarea
                placeholder="Summarize this employee's performance..."
                value={overallFeedback}
                onChange={(e) => setOverallFeedback(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || completedCount < competencies.length}>
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Submit Review
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {peerFeedback && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Peer Feedback ({peerFeedback.count} responses)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm">Strengths</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  {peerFeedback.strengths.slice(0, 3).map((s: string, i: number) => (
                    <li key={i}>"{s}"</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm">Areas for Growth</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  {peerFeedback.areasForGrowth.slice(0, 3).map((s: string, i: number) => (
                    <li key={i}>"{s}"</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{review.subject.name}'s Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active goals</p>
            ) : (
              <ul className="space-y-2">
                {goals.map((goal: any) => (
                  <li key={goal.id} className="text-sm flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      goal.status === "COMPLETED" && "bg-green-500",
                      goal.status === "IN_PROGRESS" && "bg-yellow-500",
                      goal.status === "NOT_STARTED" && "bg-gray-300",
                    )} />
                    <span>{goal.title}</span>
                    {goal.progress > 0 && <span className="text-muted-foreground">({goal.progress}%)</span>}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

---

## Components: Gap Analysis

### Gap Analysis Chart (`src/components/reviews/gap-analysis-chart.tsx`)

```typescript
"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface GapItem {
  competencyId: string
  competencyName: string
  managerRating: number
  selfRating: number
  gap: number
  managerFeedback: string | null
  selfFeedback: string | null
  isSignificant: boolean
}

interface GapAnalysisChartProps {
  gaps: GapItem[]
  overallManagerRating: number
  overallSelfRating: number
}

function RatingBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  const percentage = (value / max) * 100
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-10">{value.toFixed(1)}</span>
    </div>
  )
}

export function GapAnalysisChart({ gaps, overallManagerRating, overallSelfRating }: GapAnalysisChartProps) {
  const overallGap = Math.abs(overallSelfRating - overallManagerRating)

  return (
    <div className="space-y-6">
      {/* Overall comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Rating Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-20 text-sm font-medium">Manager</span>
              <RatingBar value={overallManagerRating} color="bg-blue-500" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-sm font-medium">Self</span>
              <RatingBar value={overallSelfRating} color="bg-purple-500" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm">Gap</span>
              <span className={cn(
                "font-medium",
                overallGap >= 1.5 ? "text-red-500" : overallGap >= 0.5 ? "text-yellow-500" : "text-green-500"
              )}>
                {overallGap.toFixed(1)} points
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competency gaps */}
      <div className="space-y-4">
        <h3 className="font-semibold">Competencies (sorted by gap size)</h3>
        {gaps.map((gap) => (
          <Card key={gap.competencyId} className={cn(gap.isSignificant && "border-red-200")}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{gap.competencyName}</CardTitle>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  gap.isSignificant ? "text-red-500" : gap.gap >= 0.5 ? "text-yellow-500" : "text-green-500"
                )}>
                  {gap.isSignificant ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : gap.gap === 0 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : null}
                  GAP: {gap.gap.toFixed(1)} points
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Manager Rating</p>
                  <RatingBar value={gap.managerRating} color="bg-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Self Rating</p>
                  <RatingBar value={gap.selfRating} color="bg-purple-500" />
                </div>
              </div>

              {(gap.managerFeedback || gap.selfFeedback) && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs font-medium mb-1">Manager said:</p>
                    <p className="text-sm text-muted-foreground">
                      {gap.managerFeedback || "No feedback provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1">Self said:</p>
                    <p className="text-sm text-muted-foreground">
                      {gap.selfFeedback || "No feedback provided"}
                    </p>
                  </div>
                </div>
              )}

              {gap.isSignificant && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                  <strong>Coaching tip:</strong> This competency has a significant gap.
                  Discuss specific examples and clarify expectations vs self-perception.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## Hooks: Auto-Save

### useAutoSave (`src/hooks/use-autosave.ts`)

```typescript
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface UseAutoSaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<void>
  debounceMs?: number
}

export function useAutoSave<T>({ data, onSave, debounceMs = 1000 }: UseAutoSaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout>()
  const dataRef = useRef(data)

  // Keep data ref updated
  useEffect(() => {
    dataRef.current = data
  }, [data])

  const save = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      await onSave(dataRef.current)
      setLastSaved(formatDistanceToNow(new Date(), { addSuffix: true }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Save failed"))
    } finally {
      setIsSaving(false)
    }
  }, [onSave])

  // Debounced auto-save on data change
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      save()
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, debounceMs, save])

  // Update "last saved" display every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaved) {
        setLastSaved(formatDistanceToNow(new Date(), { addSuffix: true }))
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [lastSaved])

  return { isSaving, lastSaved, error, saveNow: save }
}
```

---

## Analytics: PostHog

### Analytics Hook (`src/hooks/use-analytics.ts`)

```typescript
"use client"

import { usePostHog } from "posthog-js/react"
import { useCallback, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

// Typed events from PRD Conversion Funnel
type AnalyticsEvent =
  | "landing_page_view"
  | "pricing_page_view"
  | "signup_started"
  | "signup_completed"
  | "onboarding_started"
  | "team_members_added"
  | "first_cycle_created"
  | "first_review_written"
  | "self_review_completed"
  | "gap_analysis_viewed"
  | "gap_analysis_pdf_exported"
  | "day_7_active"
  | "second_cycle_created"
  | "trial_upgrade_clicked"
  | "payment_completed"
  | "review_shared_to_employee"
  | "review_cycle_completed"

type EventProperties = Record<string, string | number | boolean>

export function useAnalytics() {
  const posthog = usePostHog()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const identify = useCallback(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.user_metadata?.name,
      })
    }
  }, [posthog, user])

  const reset = useCallback(() => {
    posthog.reset()
  }, [posthog])

  const track = useCallback(
    (event: AnalyticsEvent, properties?: EventProperties) => {
      posthog.capture(event, properties)
    },
    [posthog]
  )

  const trackPageView = useCallback(
    (pageName: string) => {
      posthog.capture("$pageview", { page_name: pageName })
    },
    [posthog]
  )

  return { identify, reset, track, trackPageView }
}
```

### Usage Example

```typescript
"use client"

import { useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

export function GapAnalysisPage({ reviewId }: { reviewId: string }) {
  const { track } = useAnalytics()

  useEffect(() => {
    // Track WOW feature view
    track("gap_analysis_viewed", { review_id: reviewId })
  }, [track, reviewId])

  const handleExportPDF = async () => {
    // Export logic...
    track("gap_analysis_pdf_exported", { review_id: reviewId })
  }

  return (
    // ... component
  )
}
```

---

## Email: Reminder Templates

### Reminder Email (`emails/reminder.tsx`)

```typescript
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ReminderEmailProps {
  recipientName: string
  cycleName: string
  dueDate: string
  daysRemaining: number
  actionUrl: string
  actionType: "self-review" | "peer-feedback" | "manager-review"
}

const actionConfig = {
  "self-review": {
    title: "Complete Your Self-Review",
    description: "Share your perspective on your performance this quarter.",
    buttonText: "Start Self-Review",
  },
  "peer-feedback": {
    title: "Submit Peer Feedback",
    description: "Your colleagues are counting on your input.",
    buttonText: "Give Feedback",
  },
  "manager-review": {
    title: "Write Team Reviews",
    description: "Your direct reports are waiting for their performance feedback.",
    buttonText: "Write Reviews",
  },
}

export default function ReminderEmail({
  recipientName,
  cycleName,
  dueDate,
  daysRemaining,
  actionUrl,
  actionType,
}: ReminderEmailProps) {
  const config = actionConfig[actionType]
  const urgencyText = daysRemaining === 0 ? "Due today!" : daysRemaining === 1 ? "Due tomorrow!" : `${daysRemaining} days left`

  return (
    <Html>
      <Head />
      <Preview>
        {config.title} - {urgencyText}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>TeamPulse</Heading>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              {config.title}
            </Heading>

            <Text style={text}>Hi {recipientName},</Text>

            <Text style={text}>{config.description}</Text>

            <Section style={infoBox}>
              <Text style={infoText}>
                <strong>Cycle:</strong> {cycleName}
              </Text>
              <Text style={infoText}>
                <strong>Due:</strong> {dueDate}
              </Text>
              <Text
                style={{
                  ...infoText,
                  color: daysRemaining <= 1 ? "#dc2626" : "#ca8a04",
                  fontWeight: "bold",
                }}
              >
                {urgencyText}
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={actionUrl}>
                {config.buttonText}
              </Button>
            </Section>
          </Section>

          <Text style={footer}>
            This is an automated reminder from TeamPulse.
            <br />
            <Link href={`${actionUrl}/settings/notifications`} style={footerLink}>
              Manage notification preferences
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
}

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  marginBottom: "30px",
}

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 20px",
}

const section = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
}

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
}

const infoBox = {
  backgroundColor: "#f3f4f6",
  borderRadius: "6px",
  padding: "16px",
  margin: "20px 0",
}

const infoText = {
  color: "#4a4a4a",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "4px 0",
}

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
}

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
}

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center" as const,
  marginTop: "30px",
}

const footerLink = {
  color: "#8c8c8c",
  textDecoration: "underline",
}
```

### Send Email Helper (`src/lib/email.ts`)

```typescript
import { Resend } from "resend"
import ReminderEmail from "@/emails/reminder"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendReminderParams {
  to: string
  recipientName: string
  cycleName: string
  dueDate: string
  daysRemaining: number
  actionUrl: string
  actionType: "self-review" | "peer-feedback" | "manager-review"
}

export async function sendReminderEmail(params: SendReminderParams) {
  const { to, ...emailProps } = params

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject: `Reminder: ${emailProps.actionType.replace("-", " ")} due ${
        emailProps.daysRemaining === 0 ? "today" : `in ${emailProps.daysRemaining} days`
      }`,
      react: ReminderEmail(emailProps),
    })

    if (error) {
      console.error("Failed to send email:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Email send error:", error)
    throw error
  }
}
```

---

## API Routes: Webhooks

### Stripe Webhook (`src/app/api/webhooks/stripe/route.ts`)

```typescript
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const supabase = await createClient()
        await supabase
          .from("organizations")
          .update({
            subscription_id: subscription.id,
            subscription_status: subscription.status,
          })
          .eq("stripe_customer_id", subscription.customer as string)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const supabase = await createClient()
        await supabase
          .from("organizations")
          .update({ subscription_status: "canceled" })
          .eq("stripe_customer_id", subscription.customer as string)
        break
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        console.log("Invoice paid:", invoice.id)
        // Could track billing events here
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        console.error("Payment failed for:", invoice.customer)
        // TODO: Send notification to org admins
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
```

### Cron: Send Reminders (`src/app/api/cron/reminders/route.ts`)

```typescript
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendReminderEmail } from "@/lib/email"
import { addDays, isWithinInterval, startOfDay } from "date-fns"

// Verify cron secret to prevent unauthorized access
const CRON_SECRET = process.env.CRON_SECRET

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = startOfDay(new Date())
  const reminderDays = [0, 1, 3] // Due today, 1 day before, 3 days before

  try {
    const supabase = await createClient()

    // Find active cycles with upcoming deadlines
    const { data: activeCycles } = await supabase
      .from("review_cycles")
      .select(`
        *,
        participants:cycle_participants(
          *,
          user:profiles(*)
        )
      `)
      .eq("status", "ACTIVE")

    let sentCount = 0
    const errors: string[] = []

    for (const cycle of activeCycles ?? []) {
      for (const reminderDay of reminderDays) {
        const checkDate = addDays(today, reminderDay)

        // Self-review reminders
        if (startOfDay(new Date(cycle.self_review_due)).getTime() === checkDate.getTime()) {
          const { data: pendingSelfReviews } = await supabase
            .from("self_reviews")
            .select("*, user:profiles(*)")
            .eq("cycle_id", cycle.id)
            .neq("status", "SUBMITTED")

          for (const selfReview of pendingSelfReviews ?? []) {
            try {
              await sendReminderEmail({
                to: selfReview.user.email,
                recipientName: selfReview.user.name || "Team Member",
                cycleName: cycle.name,
                dueDate: new Date(cycle.self_review_due).toLocaleDateString(),
                daysRemaining: reminderDay,
                actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reviews/self/${selfReview.id}`,
                actionType: "self-review",
              })
              sentCount++
            } catch (err) {
              errors.push(`Failed to send self-review reminder to ${selfReview.user.email}`)
            }
          }
        }

        // Peer feedback reminders
        if (startOfDay(new Date(cycle.peer_feedback_due)).getTime() === checkDate.getTime()) {
          const { data: pendingPeerRequests } = await supabase
            .from("peer_feedback_requests")
            .select("*, reviewer:profiles(*)")
            .eq("cycle_id", cycle.id)
            .eq("status", "pending")

          for (const request of pendingPeerRequests ?? []) {
            try {
              await sendReminderEmail({
                to: request.reviewer.email,
                recipientName: request.reviewer.name || "Team Member",
                cycleName: cycle.name,
                dueDate: new Date(cycle.peer_feedback_due).toLocaleDateString(),
                daysRemaining: reminderDay,
                actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reviews/peer/${request.id}`,
                actionType: "peer-feedback",
              })
              sentCount++
            } catch (err) {
              errors.push(`Failed to send peer feedback reminder to ${request.reviewer.email}`)
            }
          }
        }

        // Manager review reminders
        if (startOfDay(new Date(cycle.manager_review_due)).getTime() === checkDate.getTime()) {
          const { data: pendingReviews } = await supabase
            .from("reviews")
            .select("*, author:profiles!reviewer_id(*)")
            .eq("cycle_id", cycle.id)
            .neq("status", "SUBMITTED")

          // Group by manager
          const managerReviews = (pendingReviews ?? []).reduce((acc, review) => {
            if (!acc[review.reviewer_id]) acc[review.reviewer_id] = { manager: review.author, count: 0 }
            acc[review.reviewer_id].count++
            return acc
          }, {} as Record<string, { manager: any; count: number }>)

          for (const { manager, count } of Object.values(managerReviews)) {
            try {
              await sendReminderEmail({
                to: manager.email,
                recipientName: manager.name || "Manager",
                cycleName: cycle.name,
                dueDate: new Date(cycle.manager_review_due).toLocaleDateString(),
                daysRemaining: reminderDay,
                actionUrl: `${process.env.NEXT_PUBLIC_APP_URL}/cycles/${cycle.id}`,
                actionType: "manager-review",
              })
              sentCount++
            } catch (err) {
              errors.push(`Failed to send manager reminder to ${manager.email}`)
            }
          }
        }
      }
    }

    return NextResponse.json({ sent: sentCount, errors })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 })
  }
}
```

### Vercel Cron Config (`vercel.json`)

```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

---

## Supabase Storage

### Avatar Upload Hook (`src/hooks/use-avatar-upload.ts`)

```typescript
"use client"

import { useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

interface UseAvatarUploadOptions {
  userId: string
  onSuccess?: (publicUrl: string) => void
  onError?: (error: Error) => void
}

export function useAvatarUpload({ userId, onSuccess, onError }: UseAvatarUploadOptions) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = useCallback(async (file: File) => {
    setIsUploading(true)
    setProgress(0)

    try {
      const supabase = createClient()

      // Validate file
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image")
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File must be less than 2MB")
      }

      // Generate unique filename
      const ext = file.name.split(".").pop()
      const fileName = `${userId}/avatar.${ext}`

      // Upload to storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName)

      // Update profile
      await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId)

      setProgress(100)
      onSuccess?.(publicUrl)
      return publicUrl
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed")
      onError?.(error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }, [userId, onSuccess, onError])

  return { upload, isUploading, progress }
}
```

### PDF Export Action (`src/actions/exports.ts`)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser, type ActionResult } from "./base"

export async function exportReviewPDF(reviewId: string): Promise<ActionResult<{ downloadUrl: string }>> {
  try {
    const user = await getCurrentUser()
    const supabase = await createClient()

    // Get review data
    const { data: review, error } = await supabase
      .from("reviews")
      .select(`
        *,
        reviewee:profiles!reviewee_id(name, email),
        reviewer:profiles!reviewer_id(name),
        ratings:review_ratings(*, competency:competencies(*)),
        cycle:review_cycles(name)
      `)
      .eq("id", reviewId)
      .eq("reviewer_id", user.id)
      .single()

    if (error || !review) {
      return { success: false, error: { code: "NOT_FOUND", message: "Review not found" } }
    }

    // Call Edge Function to generate PDF
    const { data: pdfData, error: fnError } = await supabase.functions.invoke("generate-pdf", {
      body: { review }
    })

    if (fnError) {
      return { success: false, error: { code: "PDF_GENERATION_FAILED", message: "Failed to generate PDF" } }
    }

    // Upload to storage
    const fileName = `${user.id}/review-${reviewId}-${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from("exports")
      .upload(fileName, pdfData, {
        contentType: "application/pdf",
      })

    if (uploadError) {
      return { success: false, error: { code: "UPLOAD_FAILED", message: "Failed to save PDF" } }
    }

    // Get signed URL (expires in 1 hour)
    const { data: signedUrl } = await supabase.storage
      .from("exports")
      .createSignedUrl(fileName, 3600)

    return {
      success: true,
      data: { downloadUrl: signedUrl?.signedUrl || "" }
    }
  } catch (error) {
    return { success: false, error: { code: "EXPORT_ERROR", message: "Failed to export review" } }
  }
}
```

### Storage Bucket Setup (`supabase/migrations/XX_storage_buckets.sql`)

```sql
-- Create storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp']),
  ('exports', 'exports', false, 10485760, array['application/pdf']);

-- Avatars: Public read, user can upload their own
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

---

## Supabase Edge Functions

### PDF Generation (`supabase/functions/generate-pdf/index.ts`)

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { review } = await req.json()

    // Generate PDF using html-to-pdf library or similar
    // For production, use a library like @react-pdf/renderer
    const html = generateReviewHTML(review)
    const pdf = await htmlToPdf(html)

    return new Response(pdf, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})

function generateReviewHTML(review: any): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #1a1a1a; border-bottom: 2px solid #000; }
          .section { margin: 20px 0; }
          .rating { display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <h1>Performance Review</h1>
        <div class="section">
          <strong>Employee:</strong> ${review.reviewee.name}<br/>
          <strong>Review Cycle:</strong> ${review.cycle.name}<br/>
          <strong>Reviewer:</strong> ${review.reviewer.name}
        </div>
        ${review.ratings.map((r: any) => `
          <div class="section">
            <div class="rating">
              <strong>${r.competency.name}</strong>
              <span>${r.rating}/5</span>
            </div>
            <p>${r.feedback || "No feedback provided"}</p>
          </div>
        `).join("")}
        <div class="section">
          <strong>Overall Rating:</strong> ${review.overall_rating}/5
        </div>
      </body>
    </html>
  `
}

async function htmlToPdf(html: string): Promise<Uint8Array> {
  // Use Puppeteer or similar for actual PDF generation
  // This is a placeholder - in production use @react-pdf/renderer or Puppeteer
  const encoder = new TextEncoder()
  return encoder.encode(html) // Placeholder - returns HTML as bytes
}
```

### Reminder Cron (`supabase/functions/send-reminders/index.ts`)

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    // Verify authorization
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const today = new Date()
    const reminderDays = [0, 1, 3] // Due today, 1 day, 3 days before

    // Get active cycles
    const { data: cycles } = await supabase
      .from("review_cycles")
      .select("*")
      .eq("status", "ACTIVE")

    let sentCount = 0

    for (const cycle of cycles ?? []) {
      for (const daysBefore of reminderDays) {
        const checkDate = new Date(today)
        checkDate.setDate(checkDate.getDate() + daysBefore)

        const selfReviewDue = new Date(cycle.self_review_due)
        if (isSameDay(selfReviewDue, checkDate)) {
          // Get incomplete self-reviews
          const { data: pending } = await supabase
            .from("self_reviews")
            .select("*, user:profiles(*)")
            .eq("cycle_id", cycle.id)
            .neq("status", "SUBMITTED")

          for (const sr of pending ?? []) {
            await sendEmail({
              to: sr.user.email,
              subject: `Reminder: Self-review due ${daysBefore === 0 ? "today" : `in ${daysBefore} days`}`,
              template: "reminder",
              data: {
                name: sr.user.name,
                cycleName: cycle.name,
                dueDate: cycle.self_review_due,
                actionType: "self-review",
              }
            })
            sentCount++
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ sent: sentCount }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Reminder error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toDateString() === d2.toDateString()
}

async function sendEmail(params: any) {
  const resendKey = Deno.env.get("RESEND_API_KEY")!
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "TeamPulse <noreply@teampulse.app>",
      to: params.to,
      subject: params.subject,
      html: renderEmailTemplate(params.template, params.data),
    }),
  })
}

function renderEmailTemplate(template: string, data: any): string {
  // Simple template rendering - use React Email in production
  return `
    <h1>Hello ${data.name},</h1>
    <p>Your ${data.actionType} for "${data.cycleName}" is due on ${data.dueDate}.</p>
    <a href="${Deno.env.get("APP_URL")}/reviews">Complete Now</a>
  `
}
```

### Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Deploy all functions
supabase functions deploy generate-pdf
supabase functions deploy send-reminders

# Set secrets
supabase secrets set RESEND_API_KEY=re_xxx
supabase secrets set APP_URL=https://teampulse.app
```

---

## Supabase Realtime

### Review Notification Hook (`src/hooks/use-review-notifications.ts`)

```typescript
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface UseReviewNotificationsOptions {
  userId: string
  enabled?: boolean
}

export function useReviewNotifications({ userId, enabled = true }: UseReviewNotificationsOptions) {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (!enabled || !userId) return

    const supabase = createClient()

    // Subscribe to reviews where user is the reviewee
    const channel = supabase
      .channel(`reviews-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "reviews",
          filter: `reviewee_id=eq.${userId}`,
        },
        (payload) => {
          const newStatus = payload.new.status
          const oldStatus = payload.old.status

          // Notify when review is shared
          if (newStatus === "SHARED" && oldStatus !== "SHARED") {
            toast.success("Your performance review is ready to view!", {
              action: {
                label: "View",
                onClick: () => window.location.href = `/reviews/${payload.new.id}`,
              },
            })
            setNotifications((prev) => [...prev, payload.new])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, enabled])

  return { notifications }
}
```

### Cycle Progress Subscription (`src/hooks/use-cycle-progress.ts`)

```typescript
"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

interface CycleProgress {
  total: number
  completed: number
  inProgress: number
  notStarted: number
}

export function useCycleProgress(cycleId: string) {
  const [progress, setProgress] = useState<CycleProgress>({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    const supabase = createClient()

    const { data: reviews } = await supabase
      .from("reviews")
      .select("status")
      .eq("cycle_id", cycleId)

    if (reviews) {
      const stats = reviews.reduce(
        (acc, r) => {
          acc.total++
          if (r.status === "COMPLETED" || r.status === "SHARED") acc.completed++
          else if (r.status === "IN_PROGRESS") acc.inProgress++
          else acc.notStarted++
          return acc
        },
        { total: 0, completed: 0, inProgress: 0, notStarted: 0 }
      )
      setProgress(stats)
    }
    setLoading(false)
  }, [cycleId])

  useEffect(() => {
    fetchProgress()

    const supabase = createClient()

    // Subscribe to any changes in reviews for this cycle
    const channel = supabase
      .channel(`cycle-progress-${cycleId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
          filter: `cycle_id=eq.${cycleId}`,
        },
        () => {
          // Refetch progress when any review changes
          fetchProgress()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [cycleId, fetchProgress])

  return { progress, loading, refetch: fetchProgress }
}
```

### Enable Realtime (`supabase/migrations/XX_enable_realtime.sql`)

```sql
-- Enable realtime for reviews table
alter publication supabase_realtime add table reviews;

-- Enable realtime for self_reviews table
alter publication supabase_realtime add table self_reviews;

-- Enable realtime for review_cycles table
alter publication supabase_realtime add table review_cycles;
```

### Realtime Provider Setup (`src/components/providers/realtime-provider.tsx`)

```typescript
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RealtimeChannel } from "@supabase/supabase-js"

interface RealtimeContextType {
  isConnected: boolean
  subscribe: (channel: string, callback: (payload: any) => void) => RealtimeChannel
  unsubscribe: (channel: RealtimeChannel) => void
}

const RealtimeContext = createContext<RealtimeContextType | null>(null)

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Test connection
    const channel = supabase.channel("connection-test")
    channel.subscribe((status) => {
      setIsConnected(status === "SUBSCRIBED")
    })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const subscribe = (channelName: string, callback: (payload: any) => void) => {
    return supabase
      .channel(channelName)
      .on("postgres_changes", { event: "*", schema: "public" }, callback)
      .subscribe()
  }

  const unsubscribe = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel)
  }

  return (
    <RealtimeContext.Provider value={{ isConnected, subscribe, unsubscribe }}>
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (!context) {
    throw new Error("useRealtime must be used within a RealtimeProvider")
  }
  return context
}
```

---

*Last updated: [DATE]*
