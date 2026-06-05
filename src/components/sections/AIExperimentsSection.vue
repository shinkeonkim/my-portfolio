<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, Github, ExternalLink, Pause, Play } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { aiExperiments } from '@/data'
import type { AIExperimentCategory } from '@/types'

type Filter = 'all' | AIExperimentCategory
const filters: readonly { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'service', label: '서비스' },
  { id: 'educational', label: '학습/시각화' },
  { id: 'tool', label: '도구' },
]
const categoryLabel: Record<AIExperimentCategory, string> = {
  service: '서비스',
  educational: '학습/시각화',
  tool: '도구',
}

const activeFilter = ref<Filter>('all')
const currentIndex = ref(0)
const isPlaying = ref(true)
const AUTOPLAY_MS = 6000

const visibleItems = computed(() =>
  activeFilter.value === 'all'
    ? aiExperiments
    : aiExperiments.filter((e) => e.category === activeFilter.value),
)

const current = computed(() => visibleItems.value[currentIndex.value] ?? visibleItems.value[0])

function setFilter(filter: Filter) {
  activeFilter.value = filter
  currentIndex.value = 0
}
function go(offset: number) {
  const len = visibleItems.value.length
  if (len === 0) return
  currentIndex.value = (currentIndex.value + offset + len) % len
}
function goTo(index: number) {
  currentIndex.value = index
}

let timer: number | null = null
function startAutoplay() {
  stopAutoplay()
  if (!isPlaying.value) return
  timer = window.setInterval(() => go(1), AUTOPLAY_MS)
}
function stopAutoplay() {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}
function toggleAutoplay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) startAutoplay()
  else stopAutoplay()
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKey)
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') go(-1)
  if (e.key === 'ArrowRight') go(1)
}
</script>

<template>
  <section id="experiments" class="container-page py-24">
    <SectionTitle
      eyebrow="Experiments"
      title="떠오른 아이디어, 바로 만들어보기"
      description="AI를 활용해 머릿속에 떠오른 아이디어를 24시간 안에 검증·배포하는 작은 실험들."
    />

    <div class="mt-10 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="f in filters"
          :key="f.id"
          type="button"
          class="rounded-full border px-3 py-1.5 text-xs font-medium transition"
          :class="
            activeFilter === f.id
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]/30 text-[var(--color-accent)]'
              : 'border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-muted)]'
          "
          @click="setFilter(f.id)"
        >
          {{ f.label }}
        </button>
      </div>
      <p class="font-mono text-xs text-[var(--color-text-muted)]">
        {{ currentIndex + 1 }} / {{ visibleItems.length }}
      </p>
    </div>

    <article
      v-if="current"
      class="surface-card mt-6 grid gap-0 overflow-hidden md:grid-cols-[1.2fr_1fr]"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-overlay)] md:aspect-auto">
        <transition name="slide-fade" mode="out-in">
          <img
            :key="current.slug"
            :src="current.image"
            :alt="`${current.title} 스크린샷`"
            class="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </transition>
        <div class="absolute top-3 left-3 flex items-center gap-2">
          <Tag :label="categoryLabel[current.category]" variant="accent" />
        </div>
        <button
          type="button"
          class="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-base)]/70 text-[var(--color-text-secondary)] backdrop-blur transition hover:text-[var(--color-accent)]"
          :aria-label="isPlaying ? '자동 재생 멈춤' : '자동 재생 시작'"
          @click="toggleAutoplay"
        >
          <Pause v-if="isPlaying" :size="16" />
          <Play v-else :size="16" />
        </button>
      </div>

      <div class="flex flex-col gap-4 p-6 md:p-8">
        <div class="space-y-2">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            {{ current.emoji }} · {{ current.slug }}
          </p>
          <h3 class="text-2xl font-semibold text-[var(--color-text-primary)]">{{ current.title }}</h3>
          <p class="text-base text-[var(--color-accent)]">{{ current.tagline }}</p>
        </div>
        <p class="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {{ current.description }}
        </p>
        <div class="mt-auto flex flex-wrap items-center gap-2">
          <a
            :href="current.links.site"
            target="_blank"
            rel="noreferrer noopener"
            class="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-xs font-semibold text-[var(--color-bg-base)] transition hover:bg-[var(--color-accent-hover)]"
          >
            <ExternalLink :size="12" /> 사이트 열기
          </a>
          <a
            :href="current.links.github"
            target="_blank"
            rel="noreferrer noopener"
            class="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-default)] px-4 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <Github :size="12" /> GitHub
          </a>
        </div>
      </div>
    </article>

    <div class="mt-4 flex items-center justify-between gap-3">
      <button
        type="button"
        class="inline-flex h-10 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] px-4 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        aria-label="이전 실험"
        @click="go(-1)"
      >
        <ChevronLeft :size="14" /> 이전
      </button>
      <div class="flex flex-1 flex-wrap justify-center gap-1.5">
        <button
          v-for="(item, idx) in visibleItems"
          :key="item.slug"
          type="button"
          class="h-2.5 rounded-full transition"
          :class="
            idx === currentIndex
              ? 'w-8 bg-[var(--color-accent)]'
              : 'w-2.5 bg-[var(--color-border-default)] hover:bg-[var(--color-text-muted)]'
          "
          :aria-label="`${item.title} 슬라이드로 이동`"
          @click="goTo(idx)"
        />
      </div>
      <button
        type="button"
        class="inline-flex h-10 items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] px-4 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        aria-label="다음 실험"
        @click="go(1)"
      >
        다음 <ChevronRight :size="14" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 360ms ease,
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.02);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
