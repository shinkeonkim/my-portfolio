<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'default' | 'accent' | 'muted'
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
    :class="{
      'border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)]':
        !variant || variant === 'default',
      'border-[var(--color-accent-muted)] bg-[var(--color-accent-muted)]/30 text-[var(--color-accent)]':
        variant === 'accent',
      'border-transparent bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]':
        variant === 'muted',
    }"
  >
    {{ label }}
  </span>
</template>
