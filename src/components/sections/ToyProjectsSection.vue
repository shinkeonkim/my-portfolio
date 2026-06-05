<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Github, ExternalLink, Star, ChevronDown } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { toyProjects } from '@/data'
import type { ToyProjectCategory } from '@/types'

type Filter = 'all' | ToyProjectCategory
const filters: readonly { id: Filter; label: string; emoji: string }[] = [
  { id: 'all', label: '전체', emoji: '✨' },
  { id: 'tool', label: 'Tools', emoji: '🛠️' },
  { id: 'package', label: 'Packages', emoji: '📦' },
  { id: 'game', label: 'Games', emoji: '🎮' },
  { id: 'site', label: 'Sites', emoji: '🌐' },
  { id: 'extension', label: 'GitHub Tools', emoji: '🧩' },
  { id: 'hardware', label: 'Hardware', emoji: '🔌' },
]

const INITIAL_COUNT = 10
const STEP_COUNT = 12

const activeFilter = ref<Filter>('all')
const visibleCount = ref(INITIAL_COUNT)

const filtered = computed(() => {
  const base =
    activeFilter.value === 'all'
      ? toyProjects
      : toyProjects.filter((p) => p.category === activeFilter.value)
  return [...base].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
})

const visible = computed(() => filtered.value.slice(0, visibleCount.value))

const remaining = computed(() => Math.max(0, filtered.value.length - visible.value.length))

const countByCategory = computed<Record<Filter, number>>(() => {
  const counts: Record<Filter, number> = {
    all: toyProjects.length,
    tool: 0,
    game: 0,
    site: 0,
    extension: 0,
    hardware: 0,
    package: 0,
  }
  for (const p of toyProjects) counts[p.category] += 1
  return counts
})

watch(activeFilter, () => {
  visibleCount.value = INITIAL_COUNT
})

function loadMore() {
  visibleCount.value = Math.min(visibleCount.value + STEP_COUNT, filtered.value.length)
}

function linkIcon(type: string) {
  return type === 'github' ? Github : ExternalLink
}
</script>

<template>
  <section id="toys" class="container-page py-24">
    <SectionTitle
      eyebrow="Toy Projects & Tools"
      title="작게 쪼개서, 빠르게 만들어 본 것들"
      description="떠오른 순간 만들어 보고 싶어서 만들었거나, 손에 안 맞는 도구를 직접 깎아 쓰려고 만든 작은 프로젝트 모음."
    />

    <div class="mt-10 flex flex-wrap justify-center gap-2">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition"
        :class="
          activeFilter === f.id
            ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]/30 text-[var(--color-accent)]'
            : 'border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-muted)]'
        "
        @click="activeFilter = f.id"
      >
        <span>{{ f.emoji }}</span>
        <span>{{ f.label }}</span>
        <span class="font-mono text-[10px] text-[var(--color-text-muted)]">
          {{ countByCategory[f.id] ?? 0 }}
        </span>
      </button>
    </div>

    <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="project in visible"
        :key="project.slug"
        class="surface-card surface-card-hover flex h-full flex-col gap-3 p-4"
      >
        <header class="flex items-start gap-3">
          <span class="text-2xl leading-none" aria-hidden="true">{{ project.emoji }}</span>
          <div class="min-w-0 flex-1">
            <h3 class="truncate text-sm font-semibold text-[var(--color-text-primary)]">
              {{ project.name }}
            </h3>
            <p class="line-clamp-2 text-xs text-[var(--color-text-secondary)]">
              {{ project.tagline }}
            </p>
          </div>
          <span
            v-if="project.stars && project.stars > 0"
            class="inline-flex items-center gap-0.5 font-mono text-[10px] text-[var(--color-accent)]"
            :title="`${project.stars}★`"
          >
            <Star :size="10" />{{ project.stars }}
          </span>
        </header>

        <div class="flex flex-wrap gap-1">
          <Tag
            v-for="tech in project.stack.slice(0, 3)"
            :key="tech"
            :label="tech"
            variant="muted"
          />
          <span v-if="project.year" class="font-mono text-[10px] text-[var(--color-text-muted)]">
            · {{ project.year }}
          </span>
        </div>

        <footer class="mt-auto flex flex-wrap gap-1.5">
          <a
            v-for="link in project.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noreferrer noopener"
            class="inline-flex items-center gap-1 rounded-full border border-[var(--color-border-subtle)] px-2.5 py-1 text-[11px] text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <component :is="linkIcon(link.type)" :size="10" />
            <span>{{ link.label }}</span>
          </a>
        </footer>
      </article>
    </div>

    <div v-if="remaining > 0" class="mt-8 flex justify-center">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-5 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        @click="loadMore"
      >
        <ChevronDown :size="14" />
        더보기
        <span class="font-mono text-xs text-[var(--color-text-muted)]">
          ({{ remaining }}개 남음)
        </span>
      </button>
    </div>
  </section>
</template>
