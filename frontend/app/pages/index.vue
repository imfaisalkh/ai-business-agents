<script setup lang="ts">
import { Lightbulb, FolderOpen, RefreshCw } from 'lucide-vue-next'

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

const { data: ideas, status, refresh } = await useFetch<Idea[]>('/api/ideas')

// Artifact viewer state
const selectedArtifact = ref<Artifact | null>(null)
const artifactViewerOpen = ref(false)

// Business context viewer state
const selectedIdeaForContext = ref<Idea | null>(null)
const businessContextOpen = ref(false)

// Launch summary viewer state
const selectedIdeaForLaunch = ref<Idea | null>(null)
const launchSummaryOpen = ref(false)

function handleViewArtifact(artifact: Artifact) {
  selectedArtifact.value = artifact
  artifactViewerOpen.value = true
}

function handleViewBusinessContext(idea: Idea) {
  selectedIdeaForContext.value = idea
  businessContextOpen.value = true
}

function handleViewLaunchSummary(idea: Idea) {
  selectedIdeaForLaunch.value = idea
  launchSummaryOpen.value = true
}

const totalArtifacts = computed(() => {
  if (!ideas.value) return 0
  return ideas.value.reduce((sum, idea) => {
    return sum + idea.categories.reduce((catSum, cat) => catSum + cat.artifacts.length, 0)
  }, 0)
})
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Ideas Dashboard</h1>
        <p class="text-muted-foreground mt-1">
          Browse and manage your business ideas and artifacts
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" @click="refresh()">
          <RefreshCw class="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent class="flex items-center gap-4 p-6">
          <div class="rounded-lg bg-primary/10 p-3">
            <Lightbulb class="h-6 w-6 text-primary" />
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Total Ideas</p>
            <p class="text-2xl font-bold">{{ ideas?.length ?? 0 }}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="flex items-center gap-4 p-6">
          <div class="rounded-lg bg-green-100 dark:bg-green-900 p-3">
            <FolderOpen class="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Total Artifacts</p>
            <p class="text-2xl font-bold">{{ totalArtifacts }}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="flex items-center gap-4 p-6">
          <div class="rounded-lg bg-blue-100 dark:bg-blue-900 p-3">
            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Ready to Launch</p>
            <p class="text-2xl font-bold">{{ ideas?.filter(i => i.hasLaunchSummary).length ?? 0 }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-muted-foreground">Loading ideas...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="status === 'error'" class="text-center py-12">
      <div class="rounded-lg border border-destructive/50 bg-destructive/10 p-6 max-w-md mx-auto">
        <p class="text-destructive font-medium">Failed to load ideas</p>
        <Button variant="outline" size="sm" class="mt-4" @click="refresh()">
          Try Again
        </Button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!ideas || ideas.length === 0" class="text-center py-12">
      <div class="rounded-lg border border-dashed p-12 max-w-md mx-auto">
        <Lightbulb class="h-12 w-12 mx-auto text-muted-foreground/50" />
        <h3 class="mt-4 text-lg font-semibold">No ideas yet</h3>
        <p class="mt-2 text-muted-foreground">
          Create your first idea by running:
        </p>
        <code class="mt-2 inline-block bg-muted px-3 py-1 rounded text-sm">
          npm run new-idea my-idea-name
        </code>
      </div>
    </div>

    <!-- Ideas Grid -->
    <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <IdeaCard
        v-for="idea in ideas"
        :key="idea.name"
        :idea="idea"
        @view-artifact="handleViewArtifact"
        @view-business-context="handleViewBusinessContext"
        @view-launch-summary="handleViewLaunchSummary"
      />
    </div>

    <!-- Artifact Viewer -->
    <ArtifactViewer
      v-if="selectedArtifact"
      :path="selectedArtifact.path"
      :name="selectedArtifact.name"
      :category="selectedArtifact.category"
      :open="artifactViewerOpen"
      @update:open="artifactViewerOpen = $event"
    />

    <!-- Business Context Viewer -->
    <BusinessContextViewer
      v-if="selectedIdeaForContext"
      :idea-name="selectedIdeaForContext.name"
      :idea-display-name="selectedIdeaForContext.displayName"
      :open="businessContextOpen"
      @update:open="businessContextOpen = $event"
    />

    <!-- Launch Summary Viewer -->
    <LaunchSummaryViewer
      v-if="selectedIdeaForLaunch"
      :idea-name="selectedIdeaForLaunch.name"
      :idea-display-name="selectedIdeaForLaunch.displayName"
      :open="launchSummaryOpen"
      @update:open="launchSummaryOpen = $event"
    />
  </div>
</template>
