<script setup lang="ts">
defineProps<{
  interactive?: boolean
  as?: 'div' | 'article' | 'section'
}>()
</script>

<template>
  <component
    :is="as ?? 'div'"
    class="surface-card p-5 md:p-6"
    :class="{ 'surface-card-hover cursor-pointer': interactive }"
  >
    <slot />
  </component>
</template>
