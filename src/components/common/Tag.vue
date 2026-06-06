<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'default' | 'accent' | 'muted' | 'gold' | 'silver' | 'bronze' | 'merit'
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
      'border-[var(--color-award-gold-border)] bg-[var(--color-award-gold-bg)] text-[var(--color-award-gold-text)]':
        variant === 'gold',
      'border-[var(--color-award-silver-border)] bg-[var(--color-award-silver-bg)] text-[var(--color-award-silver-text)]':
        variant === 'silver',
      'border-[var(--color-award-bronze-border)] bg-[var(--color-award-bronze-bg)] text-[var(--color-award-bronze-text)]':
        variant === 'bronze',
      'border-[var(--color-award-merit-border)] bg-[var(--color-award-merit-bg)] text-[var(--color-award-merit-text)]':
        variant === 'merit',
    }"
  >
    {{ label }}
  </span>
</template>
