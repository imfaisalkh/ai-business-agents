<script setup lang="ts">
import { X, FileText, ExternalLink, Copy, Check } from 'lucide-vue-next'

interface Props {
  path: string
  name: string
  category: string
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const { data: artifact, status, refresh } = useFetch('/api/artifact', {
  query: { path: props.path },
  watch: false,
  immediate: false,
})

const copied = ref(false)

async function copyToClipboard() {
  if (artifact.value?.content) {
    await navigator.clipboard.writeText(artifact.value.content)
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

// Refetch when path changes while open
watch(() => props.path, async () => {
  if (props.open) {
    await refresh()
  }
})

const categoryColors = {
  marketing: 'bg-marketing/10 text-marketing border-marketing/20',
  product: 'bg-product/10 text-product border-product/20',
  sales: 'bg-sales/10 text-sales border-sales/20',
  engineering: 'bg-engineering/10 text-engineering border-engineering/20',
  finance: 'bg-finance/10 text-finance border-finance/20',
} as const
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <SheetContent side="right" class="w-full sm:max-w-2xl lg:max-w-4xl overflow-hidden flex flex-col">
      <SheetHeader class="flex-shrink-0">
        <div class="flex items-center gap-3">
          <div :class="['rounded-lg p-2 border', categoryColors[category as keyof typeof categoryColors]]">
            <CategoryIcon :category="category" class="h-5 w-5" />
          </div>
          <div class="flex-1 min-w-0">
            <SheetTitle class="text-xl truncate">{{ name }}</SheetTitle>
            <SheetDescription class="capitalize">{{ category }} Artifact</SheetDescription>
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
          <p>Failed to load artifact</p>
        </div>

        <div v-else-if="artifact" class="prose dark:prose-invert pb-6">
          <div v-html="renderMarkdown(artifact.content)" />
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>

<script lang="ts">
function renderMarkdown(content: string): string {
  // Simple markdown to HTML conversion
  let html = content
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr>')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim())
    if (cells.every((cell: string) => /^[-:]+$/.test(cell))) {
      return '' // Skip separator row
    }
    const isHeader = content.includes('---')
    const cellTag = isHeader ? 'th' : 'td'
    return `<tr>${cells.map((cell: string) => `<${cellTag}>${cell}</${cellTag}>`).join('')}</tr>`
  })

  // Wrap consecutive table rows
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, '<table>$1</table>')

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Ordered lists (simple handling)
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Paragraphs (lines that aren't already HTML)
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.trim().startsWith('<')) {
      return `<p>${para.trim()}</p>`
    }
    return para
  }).join('\n')

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}
</script>
