# Code Templates

> **Purpose:** Copy-paste code patterns for common TeamPulse implementations. Saves time and ensures consistency.
>
> **Fits in:** Use during Implementation Tasks (03). Reference Architecture (01) for context.

## API Route Pattern

### Basic CRUD Route

```typescript
// src/app/api/[resource]/route.ts
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

// GET - List all
export async function GET() {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.resource.findMany({
      where: { companyId: orgId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("[RESOURCE_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new
export async function POST(request: Request) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createSchema.parse(body);

    const item = await prisma.resource.create({
      data: {
        ...validatedData,
        companyId: orgId,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("[RESOURCE_POST]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Single Item Route

```typescript
// src/app/api/[resource]/[id]/route.ts
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Single item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const item = await prisma.resource.findFirst({
      where: {
        id: params.id,
        companyId: orgId, // Tenant isolation
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("[RESOURCE_GET_ONE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.resource.findFirst({
      where: { id: params.id, companyId: orgId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const item = await prisma.resource.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("[RESOURCE_PATCH]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership
    const existing = await prisma.resource.findFirst({
      where: { id: params.id, companyId: orgId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.resource.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[RESOURCE_DELETE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Page Patterns

### List Page with Data Fetching

```typescript
// src/app/(dashboard)/resources/page.tsx
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResourceTable } from "@/components/resource-table";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ResourcesPage() {
  const { userId, orgId } = auth();
  if (!userId || !orgId) redirect("/sign-in");

  const resources = await prisma.resource.findMany({
    where: { companyId: orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground">
            Manage your resources here.
          </p>
        </div>
        <Link href="/resources/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Resource
          </Button>
        </Link>
      </div>

      {resources.length === 0 ? (
        <EmptyState
          title="No resources yet"
          description="Get started by creating your first resource."
          action={
            <Link href="/resources/new">
              <Button>Create Resource</Button>
            </Link>
          }
        />
      ) : (
        <ResourceTable resources={resources} />
      )}
    </div>
  );
}
```

### Detail Page

```typescript
// src/app/(dashboard)/resources/[id]/page.tsx
import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) redirect("/sign-in");

  const resource = await prisma.resource.findFirst({
    where: {
      id: params.id,
      companyId: orgId,
    },
  });

  if (!resource) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{resource.name}</h1>
      {/* Resource details */}
    </div>
  );
}
```

### Loading State

```typescript
// src/app/(dashboard)/resources/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
```

---

## Component Patterns

### Data Table

```typescript
// src/components/resource-table.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

interface Resource {
  id: string;
  name: string;
  createdAt: Date;
}

interface ResourceTableProps {
  resources: Resource[];
}

export function ResourceTable({ resources }: ResourceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell className="font-medium">{resource.name}</TableCell>
            <TableCell>
              {new Date(resource.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/resources/${resource.id}`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Empty State

```typescript
// src/components/empty-state.tsx
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
```

### Form with Validation

```typescript
// src/components/resource-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ResourceFormProps {
  initialData?: FormData;
  resourceId?: string;
}

export function ResourceForm({ initialData, resourceId }: ResourceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const url = resourceId
        ? `/api/resources/${resourceId}`
        : "/api/resources";
      const method = resourceId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success(resourceId ? "Updated!" : "Created!");
      router.push("/resources");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormDescription>Optional description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : resourceId ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

---

## Rating Input Component

```typescript
// src/components/rating-input.tsx
"use client";

import { cn } from "@/lib/utils";

interface RatingInputProps {
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ratingLabels = [
  { value: 1, label: "Needs Improvement" },
  { value: 2, label: "Below Expectations" },
  { value: 3, label: "Meets Expectations" },
  { value: 4, label: "Exceeds Expectations" },
  { value: 5, label: "Outstanding" },
];

export function RatingInput({ value, onChange, disabled }: RatingInputProps) {
  return (
    <div className="flex gap-2">
      {ratingLabels.map((rating) => (
        <button
          key={rating.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(rating.value)}
          className={cn(
            "flex flex-col items-center p-2 rounded-md border transition-colors",
            "hover:border-primary hover:bg-primary/5",
            value === rating.value && "border-primary bg-primary/10",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="text-lg font-bold">{rating.value}</span>
          <span className="text-xs text-muted-foreground text-center">
            {rating.label}
          </span>
        </button>
      ))}
    </div>
  );
}
```

---

## Auto-Save Hook

```typescript
// src/hooks/use-auto-save.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "./use-debounce";

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  debounceMs?: number;
}

export function useAutoSave<T>({
  data,
  onSave,
  debounceMs = 2000,
}: UseAutoSaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const debouncedData = useDebounce(data, debounceMs);
  const previousData = useRef<T>(data);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await onSave(debouncedData);
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsSaving(false);
    }
  }, [debouncedData, onSave]);

  useEffect(() => {
    // Don't save on initial mount
    if (JSON.stringify(debouncedData) === JSON.stringify(previousData.current)) {
      return;
    }
    previousData.current = debouncedData;
    save();
  }, [debouncedData, save]);

  return { isSaving, lastSaved };
}
```

```typescript
// src/hooks/use-debounce.ts
"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## Analytics Events

```typescript
// src/lib/analytics.ts
import posthog from "posthog-js";

// Initialize PostHog (call in layout)
export function initAnalytics() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }
}

// Track events
export function track(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window !== "undefined") {
    posthog.capture(eventName, properties);
  }
}

// Identify user
export function identify(userId: string, traits?: Record<string, any>) {
  if (typeof window !== "undefined") {
    posthog.identify(userId, traits);
  }
}

// Common events
export const Events = {
  // Signup funnel
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",

  // Activation
  TEAM_MEMBERS_ADDED: "team_members_added",
  FIRST_CYCLE_CREATED: "first_cycle_created",
  FIRST_REVIEW_WRITTEN: "first_review_written",

  // Engagement
  SELF_REVIEW_COMPLETED: "self_review_completed",
  GAP_ANALYSIS_VIEWED: "gap_analysis_viewed",
  GAP_ANALYSIS_PDF_EXPORTED: "gap_analysis_pdf_exported",
  REVIEW_SHARED: "review_shared_to_employee",

  // Conversion
  TRIAL_STARTED: "trial_started",
  PAYMENT_COMPLETED: "payment_completed",
} as const;
```

Usage:

```typescript
import { track, Events } from "@/lib/analytics";

// In a component
track(Events.FIRST_CYCLE_CREATED, {
  participantCount: participants.length,
  templateName: template.name,
});
```

---

## Gap Analysis Calculation

```typescript
// src/lib/gap-analysis.ts
import { Rating, SelfRating } from "@prisma/client";

export interface GapAnalysisItem {
  competencyId: string;
  competencyName: string;
  managerRating: number;
  selfRating: number;
  gap: number;
  absoluteGap: number;
  isSignificant: boolean;
  managerFeedback: string | null;
  selfFeedback: string | null;
}

export interface GapAnalysisResult {
  items: GapAnalysisItem[];
  overallManagerRating: number;
  overallSelfRating: number;
  overallGap: number;
  alignedCount: number;
  gapCount: number;
  significantGapCount: number;
}

export function calculateGapAnalysis(
  managerRatings: Rating[],
  selfRatings: SelfRating[]
): GapAnalysisResult {
  const selfRatingMap = new Map(
    selfRatings.map((r) => [r.competencyId, r])
  );

  const items: GapAnalysisItem[] = managerRatings.map((mr) => {
    const sr = selfRatingMap.get(mr.competencyId);
    const selfScore = sr?.score ?? 0;
    const gap = mr.score - selfScore;
    const absoluteGap = Math.abs(gap);

    return {
      competencyId: mr.competencyId,
      competencyName: mr.competencyName,
      managerRating: mr.score,
      selfRating: selfScore,
      gap,
      absoluteGap,
      isSignificant: absoluteGap >= 2,
      managerFeedback: mr.feedback,
      selfFeedback: sr?.feedback ?? null,
    };
  });

  // Sort by absolute gap (largest first)
  items.sort((a, b) => b.absoluteGap - a.absoluteGap);

  const overallManagerRating =
    items.reduce((sum, i) => sum + i.managerRating, 0) / items.length;
  const overallSelfRating =
    items.reduce((sum, i) => sum + i.selfRating, 0) / items.length;

  return {
    items,
    overallManagerRating: Math.round(overallManagerRating * 10) / 10,
    overallSelfRating: Math.round(overallSelfRating * 10) / 10,
    overallGap:
      Math.round((overallManagerRating - overallSelfRating) * 10) / 10,
    alignedCount: items.filter((i) => i.absoluteGap <= 0.5).length,
    gapCount: items.filter((i) => i.absoluteGap > 0.5).length,
    significantGapCount: items.filter((i) => i.isSignificant).length,
  };
}
```

---

## Email Template

```typescript
// src/emails/review-reminder.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface ReviewReminderProps {
  employeeName: string;
  cycleName: string;
  dueDate: string;
  reviewUrl: string;
}

export function ReviewReminderEmail({
  employeeName,
  cycleName,
  dueDate,
  reviewUrl,
}: ReviewReminderProps) {
  return (
    <Html>
      <Head />
      <Preview>Reminder: Your review for {cycleName} is due {dueDate}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Review Reminder</Heading>
          <Text style={text}>
            Hi {employeeName},
          </Text>
          <Text style={text}>
            This is a friendly reminder that your review for <strong>{cycleName}</strong> is due on <strong>{dueDate}</strong>.
          </Text>
          <Link href={reviewUrl} style={button}>
            Complete Your Review
          </Link>
          <Text style={text}>
            If you've already completed your review, you can ignore this email.
          </Text>
          <Text style={footer}>
            - The TeamPulse Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  borderRadius: "4px",
  maxWidth: "600px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 20px",
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "4px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  margin: "16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  margin: "32px 0 0",
};
```

---

## Sending Email

```typescript
// src/lib/email.ts
import { Resend } from "resend";
import { ReviewReminderEmail } from "@/emails/review-reminder";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReviewReminder({
  to,
  employeeName,
  cycleName,
  dueDate,
  reviewUrl,
}: {
  to: string;
  employeeName: string;
  cycleName: string;
  dueDate: string;
  reviewUrl: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "TeamPulse <reviews@teampulse.app>",
      to,
      subject: `Reminder: Your review for ${cycleName} is due ${dueDate}`,
      react: ReviewReminderEmail({
        employeeName,
        cycleName,
        dueDate,
        reviewUrl,
      }),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
```
