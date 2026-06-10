<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  { eyebrow: '', description: '', align: 'center' },
)
</script>

<template>
  <header
    class="flex flex-col gap-3"
    :class="align === 'center' ? 'mx-auto items-center text-center' : 'items-start'"
  >
    <p
      v-if="eyebrow"
      class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-4xl"
      :class="align === 'center' ? 'max-w-3xl' : ''"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg"
    >
      {{ description }}
    </p>
  </header>
</template>
