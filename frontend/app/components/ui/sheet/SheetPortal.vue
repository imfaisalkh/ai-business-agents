<script setup lang="ts">
import { DialogPortal, type DialogPortalProps, useForwardProps } from 'radix-vue'

const props = defineProps<DialogPortalProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <DialogPortal v-bind="forwardedProps">
    <slot />
  </DialogPortal>
</template>
