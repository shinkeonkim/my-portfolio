<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { X, Check, Minus } from 'lucide-vue-next'
import Tag from '@/components/common/Tag.vue'
import type { ProjectChallenge } from '@/types'

const props = defineProps<{ challenge: ProjectChallenge | null }>()
const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLDialogElement | null>(null)
const isOpen = computed(() => props.challenge !== null)

function close() {
  emit('close')
}

watch(isOpen, (next) => {
  const dialog = dialogRef.value
  if (!dialog) return
  if (next && !dialog.open) dialog.showModal()
  else if (!next && dialog.open) dialog.close()
})

function onCancel(e: Event) {
  e.preventDefault()
  close()
}

onBeforeUnmount(() => {
  if (dialogRef.value?.open) dialogRef.value.close()
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="w-full max-w-3xl rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-0 text-[var(--color-text-primary)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    @cancel="onCancel"
    @close="close"
  >
    <div v-if="challenge" class="max-h-[85vh] w-full overflow-y-auto">
      <header
        class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]/95 px-6 py-4 backdrop-blur md:px-8"
      >
        <div class="space-y-1">
          <p class="font-mono text-[11px] tracking-[0.15em] text-[var(--color-text-muted)]">
            CHALLENGE DETAIL
          </p>
          <h2 class="text-lg font-semibold leading-snug md:text-xl">
            {{ challenge.title ?? challenge.problem }}
          </h2>
        </div>
        <button
          type="button"
          aria-label="닫기"
          class="rounded p-1 text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
          @click="close"
        >
          <X :size="20" />
        </button>
      </header>

      <div class="space-y-8 px-6 py-6 md:px-8 md:py-8">
        <section v-if="challenge.tags?.length" class="flex flex-wrap gap-1.5">
          <Tag v-for="t in challenge.tags" :key="t" :label="t" variant="muted" />
        </section>

        <section v-if="challenge.detail?.background" class="space-y-2">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            배경
          </h3>
          <div
            class="prose-modal text-[15px] leading-8 text-[var(--color-text-secondary)]"
            v-html="challenge.detail.background"
          />
        </section>

        <section class="space-y-3 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] p-5">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            요약
          </h3>
          <div class="flex gap-2 text-[15px] font-medium leading-7 text-[var(--color-text-primary)]">
            <span aria-hidden="true">🧩</span>
            <div class="prose-modal flex-1" v-html="challenge.problem" />
          </div>
          <div class="flex gap-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            <span class="font-mono text-xs text-[var(--color-accent)]">→ 접근.</span>
            <div class="prose-modal flex-1" v-html="challenge.approach" />
          </div>
          <div class="flex gap-2 text-sm leading-7 text-[var(--color-text-secondary)]">
            <span class="font-mono text-xs text-emerald-500">→ 결과.</span>
            <div class="prose-modal flex-1" v-html="challenge.result" />
          </div>
        </section>

        <section v-if="challenge.detail?.options?.length" class="space-y-3">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            대안 비교
          </h3>
          <div class="grid gap-3 sm:grid-cols-2">
            <article
              v-for="(opt, i) in challenge.detail.options"
              :key="i"
              class="rounded-lg border p-4 transition"
              :class="
                opt.chosen
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]/15'
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)]'
              "
            >
              <header class="mb-3 flex items-start justify-between gap-2">
                <p class="text-sm font-semibold text-[var(--color-text-primary)]">
                  {{ opt.label }}
                </p>
                <span
                  v-if="opt.chosen"
                  class="shrink-0 rounded-full bg-[var(--color-accent)] px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--color-bg-base)]"
                >
                  CHOSEN
                </span>
              </header>
              <ul v-if="opt.pros?.length" class="mb-2 space-y-1">
                <li
                  v-for="p in opt.pros"
                  :key="p"
                  class="flex gap-2 text-xs leading-6 text-[var(--color-text-secondary)]"
                >
                  <Check :size="12" class="mt-1 shrink-0 text-emerald-500" />
                  <span>{{ p }}</span>
                </li>
              </ul>
              <ul v-if="opt.cons?.length" class="space-y-1">
                <li
                  v-for="c in opt.cons"
                  :key="c"
                  class="flex gap-2 text-xs leading-6 text-[var(--color-text-muted)]"
                >
                  <Minus :size="12" class="mt-1 shrink-0 text-rose-500" />
                  <span>{{ c }}</span>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section v-if="challenge.detail?.decision" class="space-y-2">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            결정
          </h3>
          <div
            class="prose-modal rounded border-l-2 border-[var(--color-accent)] bg-[var(--color-accent-muted)]/10 px-4 py-3 text-[15px] leading-8 text-[var(--color-text-primary)]"
            v-html="challenge.detail.decision"
          />
        </section>

        <section v-if="challenge.detail?.implementation?.length" class="space-y-2">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            구현
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(line, i) in challenge.detail.implementation"
              :key="i"
              class="flex gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
            >
              <span
                class="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
              />
              <div class="prose-modal flex-1" v-html="line" />
            </li>
          </ul>
        </section>

        <section v-if="challenge.detail?.learnings?.length" class="space-y-2">
          <h3 class="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            배운 점
          </h3>
          <ul class="space-y-2">
            <li
              v-for="(line, i) in challenge.detail.learnings"
              :key="i"
              class="flex gap-3 text-sm leading-7 text-[var(--color-text-secondary)]"
            >
              <span class="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <div class="prose-modal flex-1" v-html="line" />
            </li>
          </ul>
        </section>

        <section
          v-if="challenge.detail?.metrics?.length"
          class="rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] p-4"
        >
          <h3 class="mb-3 font-mono text-xs tracking-wider text-[var(--color-text-muted)]">
            정량 지표
          </h3>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="m in challenge.detail.metrics"
              :key="m"
              class="rounded-full border border-[var(--color-accent-muted)] bg-[var(--color-accent-muted)]/20 px-3 py-1 font-mono text-xs text-[var(--color-accent)]"
            >
              {{ m }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  border: none;
  padding: 0;
  margin: auto;
}
.prose-modal :deep(ul) {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
  list-style: disc;
}
.prose-modal :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  list-style: decimal;
}
.prose-modal :deep(li) {
  margin: 0.25rem 0;
}
.prose-modal :deep(li + li) {
  margin-top: 0.375rem;
}
.prose-modal :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  padding: 0.1em 0.35em;
  background: var(--color-bg-overlay);
  border-radius: 4px;
}
.prose-modal :deep(strong) {
  font-weight: 600;
  color: var(--color-text-primary);
}
.prose-modal :deep(p) {
  margin: 0;
}
.prose-modal :deep(p + p) {
  margin-top: 0.625rem;
}
.prose-modal :deep(p + ul),
.prose-modal :deep(p + ol) {
  margin-top: 0.375rem;
}
.prose-modal :deep(ul + p),
.prose-modal :deep(ol + p) {
  margin-top: 0.625rem;
}
</style>
