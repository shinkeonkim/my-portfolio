<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ArrowLeft, ExternalLink } from 'lucide-vue-next'
import Tag from '@/components/common/Tag.vue'
import GitHubStatsCard from '@/components/common/GitHubStatsCard.vue'
import { getProjectBySlug, getProjectStats } from '@/data'
import type { ProjectMedia } from '@/types'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))

useHead(() => ({
  title: project.value ? `${project.value.name} — 김신건` : '프로젝트를 찾을 수 없습니다',
  meta: project.value
    ? [
        { name: 'description', content: project.value.oneLiner },
        { property: 'og:title', content: `${project.value.name} — 김신건` },
        { property: 'og:description', content: project.value.oneLiner },
      ]
    : [],
}))

function formatPeriod(p: { start: string; end: string | null }): string {
  return p.end ? `${p.start} → ${p.end}` : `${p.start} → 현재`
}

const heroMedia = computed<ProjectMedia | undefined>(() => {
  const p = project.value
  if (!p) return undefined
  if (p.media && p.media.length > 0) return p.media[0]
  if (p.hero) return { type: 'image', url: p.hero }
  return undefined
})

const galleryMedia = computed(() => {
  const list = project.value?.media ?? []
  return list.length > 1 ? list.slice(1) : []
})

const stats = computed(() => (project.value ? getProjectStats(project.value.slug) : undefined))
</script>

<template>
  <article v-if="project" class="container-page pt-12 pb-24">
    <RouterLink
      to="/#projects"
      class="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
    >
      <ArrowLeft :size="14" /> 프로젝트 목록으로
    </RouterLink>

    <header class="mt-6 space-y-3">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
        {{ project.scale.toUpperCase() }} · {{ formatPeriod(project.period) }}
      </p>
      <h1 class="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
        {{ project.displayName ?? project.name }}
      </h1>
      <p class="text-lg text-[var(--color-text-secondary)]">{{ project.subtitle }}</p>
      <p v-if="project.award" class="text-sm font-medium text-[var(--color-accent)]">
        🏆 {{ project.award }}
      </p>
    </header>

    <section
      v-if="heroMedia"
      class="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)]"
    >
      <div class="aspect-video w-full">
        <iframe
          v-if="heroMedia.type === 'youtube'"
          :src="heroMedia.url"
          class="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          :title="heroMedia.caption ?? `${project.name} video`"
        />
        <img
          v-else
          :src="heroMedia.url"
          :alt="heroMedia.caption ?? `${project.name} hero`"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </section>

    <section class="mt-8 grid gap-6 md:grid-cols-3">
      <div class="space-y-1">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">Role</p>
        <p class="text-sm text-[var(--color-text-primary)]">{{ project.roles.join(' · ') }}</p>
      </div>
      <div class="space-y-1">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">Team</p>
        <p class="text-sm text-[var(--color-text-primary)]">
          {{ project.team.size }}명 {{ project.team.lead ? '(팀리드)' : '' }}
        </p>
      </div>
      <div class="space-y-1">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">Status</p>
        <p class="text-sm text-[var(--color-text-primary)]">{{ project.status }}</p>
      </div>
    </section>

    <section class="mt-8">
      <div class="flex flex-wrap gap-1.5">
        <Tag v-for="tech in project.stack" :key="tech" :label="tech" variant="default" />
      </div>
    </section>

    <section v-if="stats" class="mt-8">
      <GitHubStatsCard :stats="stats" />
    </section>

    <section class="mt-10 space-y-3">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">Overview</h2>
      <p class="text-base leading-relaxed text-[var(--color-text-secondary)]">
        {{ project.description }}
      </p>
    </section>

    <section class="mt-10 space-y-3">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">주요 기능</h2>
      <ul class="space-y-2">
        <li
          v-for="(f, i) in project.features"
          :key="i"
          class="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          <span class="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
          <span>{{ f }}</span>
        </li>
      </ul>
    </section>

    <section class="mt-10 space-y-4">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">고민과 해결</h2>
      <article
        v-for="(c, i) in project.challenges"
        :key="i"
        class="surface-card space-y-3 p-5"
      >
        <p class="font-mono text-xs text-[var(--color-text-muted)]">CHALLENGE #{{ i + 1 }}</p>
        <p class="text-sm font-medium text-[var(--color-text-primary)]">🧩 {{ c.problem }}</p>
        <p class="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <span class="font-mono text-xs text-[var(--color-accent)]">→ Approach.</span> {{ c.approach }}
        </p>
        <p class="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          <span class="font-mono text-xs text-[var(--color-accent)]">→ Result.</span> {{ c.result }}
        </p>
      </article>
    </section>

    <section class="mt-10 space-y-3">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">기여한 것</h2>
      <ul class="space-y-2">
        <li
          v-for="(c, i) in project.contributions"
          :key="i"
          class="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          <span class="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
          <span>{{ c }}</span>
        </li>
      </ul>
    </section>

    <section v-if="galleryMedia.length" class="mt-10 space-y-4">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">미디어 · 다이어그램</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <figure
          v-for="(m, i) in galleryMedia"
          :key="i"
          class="surface-card overflow-hidden"
        >
          <div class="aspect-video w-full bg-[var(--color-bg-overlay)]">
            <iframe
              v-if="m.type === 'youtube'"
              :src="m.url"
              class="h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
              :title="m.caption ?? 'video'"
            />
            <video
              v-else-if="m.type === 'video'"
              :src="m.url"
              controls
              class="h-full w-full object-contain"
            />
            <img
              v-else
              :src="m.url"
              :alt="m.caption ?? ''"
              class="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
          <figcaption
            v-if="m.caption"
            class="border-t border-[var(--color-border-subtle)] p-3 text-xs text-[var(--color-text-secondary)]"
          >
            {{ m.caption }}
          </figcaption>
        </figure>
      </div>
    </section>

    <section v-if="project.links.length" class="mt-10 space-y-3">
      <h2 class="text-xl font-semibold text-[var(--color-text-primary)]">Links</h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noreferrer noopener"
          class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          {{ link.label }} <ExternalLink :size="12" />
        </a>
      </div>
    </section>
  </article>

  <div v-else class="container-page py-24 text-center">
    <p class="font-mono text-sm text-[var(--color-text-muted)]">404 — Project not found</p>
    <RouterLink
      to="/#projects"
      class="mt-4 inline-block text-[var(--color-accent)] underline-offset-4 hover:underline"
    >
      프로젝트 목록으로 돌아가기
    </RouterLink>
  </div>
</template>
