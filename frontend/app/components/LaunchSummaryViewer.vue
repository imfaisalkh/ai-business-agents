<script setup lang="ts">
import { FileText, Copy, Check, Rocket } from 'lucide-vue-next'

interface Props {
  ideaName: string
  ideaDisplayName: string
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const { data: launchSummary, status, refresh } = useFetch('/api/launch-summary', {
  query: { idea: props.ideaName },
  watch: false,
  immediate: false,
})

const copied = ref(false)

async function copyToClipboard() {
  if (launchSummary.value?.content) {
    await navigator.clipboard.writeText(launchSummary.value.content)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Fetch content when sheet opens
watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    await refresh()
  }
}, { immediate: true })

// Refetch when idea changes while open
watch(() => props.ideaName, async () => {
  if (props.open) {
    await refresh()
  }
})
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <SheetContent side="right" class="w-full sm:max-w-2xl lg:max-w-4xl overflow-hidden flex flex-col">
      <SheetHeader class="flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="rounded-lg p-2 border bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
            <Rocket class="h-5 w-5" />
          </div>
          <div class="flex-1 min-w-0">
            <SheetTitle class="text-xl truncate">Launch Summary</SheetTitle>
            <SheetDescription>{{ ideaDisplayName }}</SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <div class="flex items-center gap-2 mt-4 flex-shrink-0">
        <Button variant="outline" size="sm" @click="copyToClipboard">
          <Check v-if="copied" class="h-4 w-4 mr-1" />
          <Copy v-else class="h-4 w-4 mr-1" />
          {{ copied ? 'Copied!' : 'Copy' }}
        </Button>
      </div>

      <Separator class="my-4" />

      <ScrollArea class="flex-1 -mx-6 px-6">
        <div v-if="status === 'pending'" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="status === 'error'" class="text-center py-12 text-muted-foreground">
          <FileText class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Failed to load launch summary</p>
        </div>

        <div v-else-if="launchSummary" class="prose dark:prose-invert pb-6">
          <div v-html="renderMarkdown(launchSummary.content)" />
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>

<script lang="ts">
function renderMarkdown(content: string): string {
  let html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`
  })

  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  html = html.replace(/^---+$/gm, '<hr>')
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim())
    if (cells.every((cell: string) => /^[-:]+$/.test(cell))) {
      return ''
    }
    const cellTag = 'td'
    return `<tr>${cells.map((cell: string) => `<${cellTag}>${cell}</${cellTag}>`).join('')}</tr>`
  })
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, '<table>$1</table>')
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.trim().startsWith('<')) {
      return `<p>${para.trim()}</p>`
    }
    return para
  }).join('\n')
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}
</script>
