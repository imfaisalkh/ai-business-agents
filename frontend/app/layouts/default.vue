<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 items-center px-4 md:px-6">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span class="text-sm font-bold">AI</span>
          </div>
          <span class="text-lg font-semibold">Business Agents</span>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" @click="toggleColorMode">
            <Sun v-if="colorMode.value === 'dark'" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container px-4 py-6 md:px-6 md:py-8">
      <slot />
    </main>
  </div>
</template>
