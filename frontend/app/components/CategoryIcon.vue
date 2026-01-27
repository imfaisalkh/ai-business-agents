<script setup lang="ts">
import { Megaphone, Package, DollarSign, Code, PiggyBank } from 'lucide-vue-next'

const props = defineProps<{
  category: string
  class?: string
}>()

const icons = {
  marketing: Megaphone,
  product: Package,
  sales: DollarSign,
  engineering: Code,
  finance: PiggyBank,
} as const

const icon = computed(() => icons[props.category as keyof typeof icons] || Package)
</script>

<template>
  <component :is="icon" :class="props.class" />
</template>
