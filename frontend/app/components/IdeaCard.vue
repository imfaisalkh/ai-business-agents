<script setup lang="ts">
import { FileText, Rocket, ChevronRight, Folder } from 'lucide-vue-next'

interface Artifact {
  name: string
  filename: string
  path: string
  category: string
}

interface Category {
  name: string
  artifacts: Artifact[]
}

interface Idea {
  name: string
  displayName: string
  categories: Category[]
  hasBusinessContext: boolean
  hasLaunchSummary: boolean
}

const props = defineProps<{
  idea: Idea
}>()

const emit = defineEmits<{
  (e: 'view-artifact', artifact: Artifact): void
  (e: 'view-business-context', idea: Idea): void
  (e: 'view-launch-summary', idea: Idea): void
}>()

const totalArtifacts = computed(() => {
  return props.idea.categories.reduce((sum, cat) => sum + cat.artifacts.length, 0)
})

const categoryColors = {
  marketing: 'marketing',
  product: 'product',
  sales: 'sales',
  engineering: 'engineering',
  finance: 'finance',
} as const

const categoryBgColors = {
  marketing: 'bg-marketing/10 hover:bg-marketing/20 border-marketing/20',
  product: 'bg-product/10 hover:bg-product/20 border-product/20',
  sales: 'bg-sales/10 hover:bg-sales/20 border-sales/20',
  engineering: 'bg-engineering/10 hover:bg-engineering/20 border-engineering/20',
  finance: 'bg-finance/10 hover:bg-finance/20 border-finance/20',
} as const
</script>

<template>
  <Card class="group hover:shadow-lg transition-all duration-200">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <div class="rounded-lg bg-primary/10 p-2.5 flex-shrink-0">
            <Folder class="h-5 w-5 text-primary" />
          </div>
          <div class="min-w-0">
            <CardTitle class="text-xl truncate">{{ idea.displayName }}</CardTitle>
            <CardDescription class="flex items-center gap-2 mt-1">
              <span>{{ totalArtifacts }} artifacts</span>
              <span v-if="idea.hasLaunchSummary" class="text-green-600 dark:text-green-400">
                Ready to launch
              </span>
            </CardDescription>
          </div>
        </div>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">
      <!-- Quick Actions -->
      <div class="flex flex-wrap gap-2">
        <Button
          v-if="idea.hasBusinessContext"
          variant="outline"
          size="sm"
          class="text-xs"
          @click="emit('view-business-context', idea)"
        >
          <FileText class="h-3.5 w-3.5 mr-1.5" />
          Business Context
        </Button>
        <Button
          v-if="idea.hasLaunchSummary"
          variant="outline"
          size="sm"
          class="text-xs bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900"
          @click="emit('view-launch-summary', idea)"
        >
          <Rocket class="h-3.5 w-3.5 mr-1.5" />
          Launch Summary
        </Button>
      </div>

      <!-- Categories Accordion -->
      <Accordion type="multiple" class="w-full" collapsible>
        <AccordionItem
          v-for="category in idea.categories"
          :key="category.name"
          :value="category.name"
          :class="['border rounded-lg mb-2 last:mb-0', category.artifacts.length === 0 ? 'opacity-50' : '']"
        >
          <AccordionTrigger
            :disabled="category.artifacts.length === 0"
            class="px-3 py-2 hover:no-underline [&[data-state=open]]:rounded-b-none rounded-lg"
            :class="categoryBgColors[category.name as keyof typeof categoryBgColors]"
          >
            <div class="flex items-center gap-2">
              <CategoryIcon :category="category.name" class="h-4 w-4" />
              <span class="font-medium capitalize">{{ category.name }}</span>
              <Badge
                :variant="categoryColors[category.name as keyof typeof categoryColors]"
                class="ml-1 text-[10px] px-1.5 py-0"
              >
                {{ category.artifacts.length }}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent class="px-3 pb-3 pt-1">
            <div class="space-y-1">
              <button
                v-for="artifact in category.artifacts"
                :key="artifact.filename"
                class="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-muted text-left transition-colors group/item"
                @click="emit('view-artifact', artifact)"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <FileText class="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span class="text-sm truncate">{{ artifact.name }}</span>
                </div>
                <ChevronRight class="h-4 w-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>
</template>
