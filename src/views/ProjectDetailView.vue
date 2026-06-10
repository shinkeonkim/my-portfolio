<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ArrowLeft, ExternalLink, FileText, Github, Youtube, ZoomIn } from 'lucide-vue-next'
import type { Component } from 'vue'
import Tag from '@/components/common/Tag.vue'
import GitHubStatsCard from '@/components/common/GitHubStatsCard.vue'
import PresentationSlideViewer from '@/components/common/PresentationSlideViewer.vue'
import ProjectChallengeCard from '@/components/common/ProjectChallengeCard.vue'
import ProjectChallengeModal from '@/components/common/ProjectChallengeModal.vue'
import ImageLightbox from '@/components/common/ImageLightbox.vue'
import { getProjectBySlug, getProjectStats } from '@/data'
import type { ProjectMedia, ProjectLink, ProjectChallenge } from '@/types'

const selectedChallenge = ref<ProjectChallenge | null>(null)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function linkIcon(type: ProjectLink['type']): Component {
  switch (type) {
    case 'github':
      return Github
    case 'video':
      return Youtube
    case 'pdf':
      return FileText
    default:
      return ExternalLink
  }
}

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))

useHead(() => ({
  title: project.value ? `${project.value.name} / 김신건` : '프로젝트를 찾을 수 없습니다',
  meta: project.value
    ? [
        { name: 'description', content: project.value.oneLiner },
        { property: 'og:title', content: `${project.value.name} / 김신건` },
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
  if (p.hero) return { type: 'image', url: p.hero }
  if (p.media && p.media.length > 0) return p.media[0]
  return undefined
})

const galleryMedia = computed(() => {
  const list = project.value?.media ?? []
  if (!list.length) return []
  const heroUrl = project.value?.hero
  if (heroUrl) return list.filter((m) => m.url !== heroUrl)
  return list.slice(1)
})

const stats = computed(() => (project.value ? getProjectStats(project.value.slug) : undefined))

const lightboxImages = computed<string[]>(() => {
  const imgs: string[] = []
  const heroIsImage = heroMedia.value?.type === 'image'
  if (heroIsImage && heroMedia.value) imgs.push(heroMedia.value.url)
  for (const m of galleryMedia.value) {
    if (m.type === 'image') imgs.push(m.url)
  }
  return imgs
})

function openLightboxAt(url: string) {
  const i = lightboxImages.value.indexOf(url)
  if (i < 0) return
  lightboxIndex.value = i
  lightboxOpen.value = true
}
</script>

<template>
  <article v-if="project" class="container-page pt-12 pb-24">
    <RouterLink
      to="/#projects"
      class="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
    >
      <ArrowLeft :size="14" /> 프로젝트 목록으로
    </RouterLink>

    <header class="mt-8 space-y-4">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
        {{ project.scale.toUpperCase() }} · {{ formatPeriod(project.period) }}
      </p>
      <h1
        class="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
      >
        {{ project.displayName ?? project.name }}
      </h1>
      <p class="max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
        {{ project.subtitle }}
      </p>
      <p v-if="project.award" class="text-base font-medium text-[var(--color-accent)]">
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
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
          :title="heroMedia.caption ?? `${project.name} video`"
        />
        <button
          v-else
          type="button"
          class="group/hero relative block h-full w-full cursor-zoom-in overflow-hidden"
          :aria-label="`${project.name} 메인 이미지 확대`"
          @click="openLightboxAt(heroMedia.url)"
        >
          <img
            :src="heroMedia.url"
            :alt="heroMedia.caption ?? `${project.name} hero`"
            class="h-full w-full object-cover transition-transform duration-500 group-hover/hero:scale-[1.03]"
            loading="lazy"
          />
          <span
            class="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 opacity-0 transition group-hover/hero:opacity-100"
          >
            <span
              class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm"
            >
              <ZoomIn :size="13" />
              클릭하여 확대
            </span>
          </span>
        </button>
      </div>
    </section>

    <section
      class="mt-10 grid gap-6 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] p-6 md:grid-cols-3"
    >
      <div class="space-y-1.5">
        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Role
        </p>
        <p class="text-base font-medium text-[var(--color-text-primary)]">
          {{ project.roles.join(' · ') }}
        </p>
      </div>
      <div class="space-y-1.5">
        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Team
        </p>
        <p class="text-base font-medium text-[var(--color-text-primary)]">
          {{ project.team.size }}명 {{ project.team.lead ? '(팀리드)' : '' }}
        </p>
      </div>
      <div class="space-y-1.5">
        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Status
        </p>
        <p class="text-base font-medium text-[var(--color-text-primary)]">{{ project.status }}</p>
      </div>
    </section>

    <section class="mt-10">
      <div class="flex flex-wrap gap-1.5">
        <Tag v-for="tech in project.stack" :key="tech" :label="tech" variant="default" />
      </div>
    </section>

    <section v-if="stats" class="mt-8">
      <GitHubStatsCard :stats="stats" />
    </section>

    <section class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        Overview
      </h2>
      <div
        class="prose-body max-w-4xl text-base leading-8 text-[var(--color-text-secondary)] md:text-[17px] md:leading-9"
        v-html="project.description"
      />
    </section>

    <section class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        주요 기능
      </h2>
      <ul class="grid gap-4 lg:grid-cols-2">
        <li
          v-for="(f, i) in project.features"
          :key="i"
          class="flex flex-col gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] p-5 text-[15px] leading-7 text-[var(--color-text-secondary)]"
        >
          <h3
            class="flex items-start gap-2 text-base font-semibold text-[var(--color-text-primary)]"
          >
            <span
              class="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
            />
            <span>{{ f.title }}</span>
          </h3>
          <ul
            class="prose-body ml-3.5 list-disc space-y-1 pl-5 text-sm leading-7 text-[var(--color-text-secondary)]"
          >
            <li v-for="(c, ci) in f.content" :key="ci" v-html="c" />
          </ul>
        </li>
      </ul>
    </section>

    <section class="mt-14 space-y-5">
      <header class="space-y-2">
        <h2
          class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
        >
          고민과 해결
        </h2>
        <p class="text-sm text-[var(--color-text-muted)]">
          각 카드를 클릭하면 대안 비교 · 결정 근거 · 구현 · 배운 점을 자세히 볼 수 있습니다.
        </p>
      </header>
      <div class="grid gap-4 lg:grid-cols-2">
        <ProjectChallengeCard
          v-for="(c, i) in project.challenges"
          :key="i"
          :challenge="c"
          :index="i"
          @open="selectedChallenge = c"
        />
      </div>
    </section>

    <section class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        기여한 것
      </h2>
      <ul class="max-w-4xl space-y-3">
        <li
          v-for="(c, i) in project.contributions"
          :key="i"
          class="flex gap-3 text-[15px] leading-8 text-[var(--color-text-secondary)]"
        >
          <span
            class="mt-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
          />
          <div class="prose-body flex-1" v-html="c" />
        </li>
      </ul>
    </section>

    <section v-if="project.presentation" class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        발표 자료
      </h2>
      <PresentationSlideViewer :presentation="project.presentation" />
    </section>

    <section v-if="galleryMedia.length" class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        미디어 · 다이어그램
      </h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <figure v-for="(m, i) in galleryMedia" :key="i" class="surface-card overflow-hidden">
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
            <button
              v-else
              type="button"
              class="group/gallery relative block h-full w-full cursor-zoom-in overflow-hidden"
              :aria-label="`${m.caption ?? '이미지'} 확대`"
              @click="openLightboxAt(m.url)"
            >
              <img
                :src="m.url"
                :alt="m.caption ?? ''"
                class="h-full w-full object-contain transition-transform duration-500 group-hover/gallery:scale-[1.03]"
                loading="lazy"
              />
              <span
                class="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-3 opacity-0 transition group-hover/gallery:opacity-100"
              >
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm"
                >
                  <ZoomIn :size="12" />
                  확대
                </span>
              </span>
            </button>
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

    <section v-if="project.links.length" class="mt-14 space-y-4">
      <h2
        class="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-3xl"
      >
        Links
      </h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noreferrer noopener"
          class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <component :is="linkIcon(link.type)" :size="14" />
          {{ link.label }}
        </a>
      </div>
    </section>

    <ProjectChallengeModal :challenge="selectedChallenge" @close="selectedChallenge = null" />

    <ImageLightbox
      v-model:open="lightboxOpen"
      v-model:index="lightboxIndex"
      :images="lightboxImages"
      :alt="project.name"
    />
  </article>

  <div v-else class="container-page py-24 text-center">
    <p class="font-mono text-sm text-[var(--color-text-muted)]">404: Project not found</p>
    <RouterLink
      to="/#projects"
      class="mt-4 inline-block text-[var(--color-accent)] underline-offset-4 hover:underline"
    >
      프로젝트 목록으로 돌아가기
    </RouterLink>
  </div>
</template>

<style scoped>
.prose-body :deep(ul) {
  margin: 0.5rem 0;
  padding-left: 1.25rem;
  list-style: disc;
}
.prose-body :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  list-style: decimal;
}
.prose-body :deep(li) {
  margin: 0.25rem 0;
}
.prose-body :deep(li + li) {
  margin-top: 0.375rem;
}
.prose-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  padding: 0.1em 0.35em;
  background: var(--color-bg-overlay);
  border-radius: 4px;
}
.prose-body :deep(strong) {
  font-weight: 600;
  color: var(--color-text-primary);
}
.prose-body :deep(br) {
  display: block;
  content: '';
  margin-top: 0.5rem;
}
.prose-body :deep(p) {
  margin: 0;
}
.prose-body :deep(p + p) {
  margin-top: 0.75rem;
}
.prose-body :deep(p + ul),
.prose-body :deep(p + ol) {
  margin-top: 0.5rem;
}
.prose-body :deep(ul + p),
.prose-body :deep(ol + p) {
  margin-top: 0.75rem;
}
</style>
