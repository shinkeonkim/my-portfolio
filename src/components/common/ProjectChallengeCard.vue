<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import Tag from '@/components/common/Tag.vue'
import type { ProjectChallenge } from '@/types'

defineProps<{
  challenge: ProjectChallenge
  index: number
}>()

defineEmits<{
  open: [challenge: ProjectChallenge]
}>()
</script>

<template>
  <article class="surface-card group space-y-4 p-6 md:p-7">
    <header class="flex flex-wrap items-baseline justify-between gap-3">
      <p class="font-mono text-[11px] tracking-[0.15em] text-[var(--color-text-muted)]">
        CHALLENGE #{{ String(index + 1).padStart(2, '0') }}
      </p>
      <button
        v-if="challenge.detail"
        type="button"
        class="inline-flex items-center gap-1 rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        @click="$emit('open', challenge)"
      >
        자세히 보기 <ArrowUpRight :size="12" />
      </button>
    </header>

    <h3
      v-if="challenge.title"
      class="text-lg font-semibold leading-snug text-[var(--color-text-primary)] md:text-xl"
    >
      {{ challenge.title }}
    </h3>

    <div class="space-y-3">
      <div class="flex gap-3">
        <span
          class="mt-1 inline-flex h-5 shrink-0 items-center rounded bg-[var(--color-bg-overlay)] px-2 font-mono text-[10px] tracking-wider text-[var(--color-text-muted)]"
        >
          문제
        </span>
        <div
          class="prose-card text-[15px] font-medium leading-7 text-[var(--color-text-primary)]"
          v-html="challenge.problem"
        />
      </div>
      <div class="flex gap-3">
        <span
          class="mt-1 inline-flex h-5 shrink-0 items-center rounded bg-[var(--color-accent-muted)]/40 px-2 font-mono text-[10px] tracking-wider text-[var(--color-accent)]"
        >
          접근
        </span>
        <div
          class="prose-card text-sm leading-7 text-[var(--color-text-secondary)]"
          v-html="challenge.approach"
        />
      </div>
      <div class="flex gap-3">
        <span
          class="mt-1 inline-flex h-5 shrink-0 items-center rounded bg-[var(--color-bg-overlay)] px-2 font-mono text-[10px] tracking-wider text-emerald-500"
        >
          결과
        </span>
        <div
          class="prose-card text-sm leading-7 text-[var(--color-text-secondary)]"
          v-html="challenge.result"
        />
      </div>
    </div>

    <footer v-if="challenge.tags?.length" class="flex flex-wrap gap-1.5 pt-1">
      <Tag v-for="t in challenge.tags" :key="t" :label="t" variant="muted" />
    </footer>
  </article>
</template>

<style scoped>
.prose-card :deep(ul) {
  margin: 0.25rem 0;
  padding-left: 1rem;
  list-style: disc;
}
.prose-card :deep(ol) {
  margin: 0.25rem 0;
  padding-left: 1.25rem;
  list-style: decimal;
}
.prose-card :deep(li) {
  margin: 0.125rem 0;
}
.prose-card :deep(li + li) {
  margin-top: 0.25rem;
}
.prose-card :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  padding: 0.05em 0.3em;
  background: var(--color-bg-overlay);
  border-radius: 4px;
}
.prose-card :deep(strong) {
  font-weight: 600;
  color: var(--color-text-primary);
}
.prose-card :deep(p) {
  margin: 0;
}
.prose-card :deep(p + p) {
  margin-top: 0.5rem;
}
.prose-card :deep(p + ul),
.prose-card :deep(p + ol) {
  margin-top: 0.25rem;
}
.prose-card :deep(ul + p),
.prose-card :deep(ol + p) {
  margin-top: 0.5rem;
}
</style>
