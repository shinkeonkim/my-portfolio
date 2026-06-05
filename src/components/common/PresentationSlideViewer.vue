<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  type LucideIcon,
} from 'lucide-vue-next'
import type { ProjectPresentation } from '@/types'

const props = defineProps<{ presentation: ProjectPresentation }>()

const current = ref(0)
const total = computed(() => props.presentation.pageImages.length)

function go(delta: number) {
  const next = current.value + delta
  if (next < 0 || next >= total.value) return
  current.value = next
}

function goTo(index: number) {
  if (index < 0 || index >= total.value) return
  current.value = index
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    go(-1)
    e.preventDefault()
  } else if (e.key === 'ArrowRight') {
    go(1)
    e.preventDefault()
  } else if (e.key === 'Home') {
    goTo(0)
    e.preventDefault()
  } else if (e.key === 'End') {
    goTo(total.value - 1)
    e.preventDefault()
  }
}

const rootEl = ref<HTMLElement | null>(null)
const hovered = ref(false)

onMounted(() => {
  rootEl.value?.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  rootEl.value?.removeEventListener('keydown', onKey)
})

interface NavBtn {
  icon: LucideIcon
  label: string
  onClick: () => void
  disabled: boolean
}
const navButtons = computed<readonly NavBtn[]>(() => [
  {
    icon: ChevronLeft,
    label: '이전 페이지',
    onClick: () => go(-1),
    disabled: current.value === 0,
  },
  {
    icon: ChevronRight,
    label: '다음 페이지',
    onClick: () => go(1),
    disabled: current.value >= total.value - 1,
  },
])
</script>

<template>
  <section
    ref="rootEl"
    tabindex="0"
    class="surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    :aria-label="`${presentation.title} 슬라이드 ${current + 1}/${total}`"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <header
      class="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--color-border-subtle)] px-5 py-3"
    >
      <div>
        <h3 class="text-base font-semibold text-[var(--color-text-primary)]">
          {{ presentation.title }}
        </h3>
        <p v-if="presentation.caption" class="mt-0.5 text-xs text-[var(--color-text-muted)]">
          {{ presentation.caption }}
        </p>
      </div>
      <a
        v-if="presentation.pdfUrl"
        :href="presentation.pdfUrl"
        target="_blank"
        rel="noreferrer noopener"
        class="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] px-3 py-1 font-mono text-[11px] text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Download :size="12" /> PDF 원본
      </a>
    </header>

    <div
      class="relative aspect-video w-full overflow-hidden bg-[var(--color-bg-overlay)]"
    >
      <img
        v-for="(src, i) in presentation.pageImages"
        v-show="i === current"
        :key="src"
        :src="src"
        :alt="`${presentation.title} - 페이지 ${i + 1}`"
        class="absolute inset-0 h-full w-full object-contain"
        :loading="Math.abs(i - current) <= 1 ? 'eager' : 'lazy'"
        decoding="async"
      />

      <button
        v-for="(btn, i) in navButtons"
        :key="i"
        type="button"
        :aria-label="btn.label"
        :disabled="btn.disabled"
        class="absolute top-1/2 -translate-y-1/2 rounded-full bg-[var(--color-bg-base)]/70 p-2 text-[var(--color-text-primary)] backdrop-blur transition hover:bg-[var(--color-bg-base)]/90 disabled:cursor-not-allowed disabled:opacity-30"
        :class="[i === 0 ? 'left-2' : 'right-2', hovered ? 'opacity-100' : 'opacity-0 md:opacity-60']"
        @click="btn.onClick"
      >
        <component :is="btn.icon" :size="20" />
      </button>

      <a
        :href="presentation.pageImages[current]"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="현재 페이지 원본 보기"
        class="absolute right-2 bottom-2 rounded-full bg-[var(--color-bg-base)]/70 p-1.5 text-[var(--color-text-secondary)] backdrop-blur transition hover:bg-[var(--color-bg-base)]/90 hover:text-[var(--color-accent)]"
      >
        <Maximize2 :size="14" />
      </a>

      <div
        class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-bg-base)]/80 px-3 py-0.5 font-mono text-[11px] text-[var(--color-text-secondary)] backdrop-blur"
      >
        {{ current + 1 }} / {{ total }}
      </div>
    </div>

    <div class="overflow-x-auto px-5 py-3">
      <ul class="flex gap-2">
        <li v-for="(src, i) in presentation.pageImages" :key="src">
          <button
            type="button"
            :aria-label="`페이지 ${i + 1}로 이동`"
            :aria-current="i === current ? 'true' : 'false'"
            class="block aspect-video w-20 shrink-0 overflow-hidden rounded border-2 transition"
            :class="
              i === current
                ? 'border-[var(--color-accent)] opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100'
            "
            @click="goTo(i)"
          >
            <img
              :src="src"
              :alt="`페이지 ${i + 1} 썸네일`"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
