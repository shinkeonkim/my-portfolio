<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  X,
  Github,
  Youtube,
  FileText,
  Presentation,
  StickyNote,
  Globe,
  Mic,
  Clock,
  type LucideIcon,
} from 'lucide-vue-next'
import type { Activity, LessonType } from '@/types'
import PresentationSlideViewer from '@/components/common/PresentationSlideViewer.vue'

const props = defineProps<{ activity: Activity | null }>()
const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const iconMap: Record<LessonType, LucideIcon> = {
  repo: Github,
  youtube: Youtube,
  pdf: FileText,
  slide: Presentation,
  notion: StickyNote,
  blog: Globe,
  live: Mic,
}
const typeLabel: Record<LessonType, string> = {
  repo: 'Repo',
  youtube: 'YouTube',
  pdf: 'PDF',
  slide: 'Slide',
  notion: 'Notion',
  blog: 'Blog',
  live: 'Live',
}

const isOpen = computed(() => props.activity !== null)

function close() {
  emit('close')
}

watch(isOpen, (next) => {
  const dialog = dialogRef.value
  if (!dialog) return
  if (next && !dialog.open) dialog.showModal()
  if (!next && dialog.open) dialog.close()
})

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) close()
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <dialog
    ref="dialogRef"
    class="bg-transparent text-inherit backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    @cancel.prevent="close"
    @close="close"
    @click.self="close"
  >
    <div
      v-if="activity"
      class="surface-card relative max-h-[85vh] w-[min(90vw,640px)] overflow-y-auto p-6 md:p-8"
      @click.stop
    >
      <button
        type="button"
        class="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        aria-label="닫기"
        @click="close"
      >
        <X :size="16" />
      </button>

      <header class="space-y-1 pr-10">
        <p class="font-mono text-xs text-[var(--color-text-muted)]">
          {{ activity.period.start }} → {{ activity.period.end ?? '현재' }}
        </p>
        <h3 class="text-xl font-semibold text-[var(--color-text-primary)]">{{ activity.title }}</h3>
        <p class="text-xs text-[var(--color-text-secondary)]">
          {{ activity.organization }}<span v-if="activity.role"> · {{ activity.role }}</span>
        </p>
      </header>

      <section class="mt-5 space-y-2">
        <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Highlights
        </h4>
        <ul class="space-y-1.5">
          <li
            v-for="(h, i) in activity.highlights"
            :key="i"
            class="flex gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
          >
            <span class="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            <span>{{ h }}</span>
          </li>
        </ul>
      </section>

      <section v-if="activity.details?.length" class="mt-5 space-y-2">
        <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Details
        </h4>
        <p
          v-for="(d, i) in activity.details"
          :key="i"
          class="text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          {{ d }}
        </p>
      </section>

      <section v-if="activity.timeline?.length" class="mt-5 space-y-3">
        <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          Timeline
        </h4>
        <ol class="space-y-4 border-l border-[var(--color-border-subtle)] pl-4">
          <li v-for="(entry, i) in activity.timeline" :key="i" class="relative">
            <span
              class="absolute -left-[21px] top-1.5 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]"
            />
            <header class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span class="font-mono text-xs text-[var(--color-accent)]">{{ entry.period }}</span>
              <h5 class="text-sm font-semibold text-[var(--color-text-primary)]">
                {{ entry.title }}
              </h5>
              <span v-if="entry.role" class="font-mono text-[10px] text-[var(--color-text-muted)]">
                · {{ entry.role }}
              </span>
            </header>
            <ul class="mt-1.5 space-y-1">
              <li
                v-for="(b, bi) in entry.bullets"
                :key="bi"
                class="flex gap-2 text-xs leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span
                  class="mt-1.5 inline-block h-0.5 w-2 shrink-0 rounded-full bg-[var(--color-text-muted)]"
                />
                <span>{{ b }}</span>
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section v-if="activity.presentation" class="mt-5 space-y-2">
        <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          발표 자료
        </h4>
        <PresentationSlideViewer :presentation="activity.presentation" />
      </section>

      <section v-if="activity.materials?.length" class="mt-5 space-y-2">
        <h4 class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          자료
        </h4>
        <div class="grid gap-2">
          <component
            :is="m.url ? 'a' : 'div'"
            v-for="(m, i) in activity.materials"
            :key="i"
            :href="m.url"
            :target="m.url ? '_blank' : undefined"
            :rel="m.url ? 'noreferrer noopener' : undefined"
            class="flex items-start gap-3 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] p-3"
            :class="m.url ? 'transition hover:border-[var(--color-accent)]' : 'opacity-70'"
          >
            <span
              class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-accent)]"
            >
              <component :is="m.url ? iconMap[m.type] : Clock" :size="14" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-[var(--color-text-primary)]">
                {{ m.title }}
                <span class="ml-1 font-mono text-[10px] text-[var(--color-text-muted)]">
                  · {{ typeLabel[m.type] }}
                </span>
              </p>
              <p
                v-if="m.description"
                class="mt-0.5 text-xs text-[var(--color-text-secondary)]"
              >
                {{ m.description }}
              </p>
            </div>
          </component>
        </div>
      </section>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  border: none;
  padding: 0;
  margin: auto;
}
</style>
