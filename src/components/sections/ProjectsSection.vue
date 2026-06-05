<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { projects } from '@/data'
import type { Project, ProjectScale } from '@/types'

type Filter = 'all' | ProjectScale
const filters: readonly { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'major', label: 'Major' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'side', label: 'Side' },
]
const activeFilter = ref<Filter>('all')

const visibleProjects = computed<readonly Project[]>(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((p) => p.scale === activeFilter.value),
)

function formatPeriod(p: Project): string {
  return p.period.end ? `${p.period.start} → ${p.period.end}` : `${p.period.start} → 현재`
}

function shortAward(award: string): string {
  const head = award.split('(')[0]?.trim()
  return head && head.length > 0 ? head : award
}
</script>

<template>
  <section id="projects" class="container-page py-24">
    <SectionTitle
      eyebrow="Projects"
      title="프로젝트로 말하는 성장과 도전"
      description="기획·설계부터 배포·운영까지 참여한 프로젝트들입니다."
    />

    <div class="mt-10 flex flex-wrap gap-2">
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
        @click="activeFilter = f.id"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <RouterLink
        v-for="project in visibleProjects"
        :key="project.slug"
        :to="{ name: 'project-detail', params: { slug: project.slug } }"
        class="group surface-card surface-card-hover flex flex-col overflow-hidden"
      >
        <div
          v-if="project.hero"
          class="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-overlay)]"
        >
          <img
            :src="project.hero"
            :alt="`${project.name} hero`"
            class="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
          <span
            v-if="project.award"
            class="absolute top-3 left-3 rounded-full bg-[var(--color-bg-base)]/85 px-2.5 py-1 font-mono text-[10px] text-[var(--color-accent)] backdrop-blur"
          >
            🏆 {{ shortAward(project.award) }}
          </span>
        </div>
        <div class="flex flex-1 flex-col gap-3 p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <h3
                class="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
              >
                {{ project.displayName ?? project.name }}
              </h3>
              <p class="text-sm text-[var(--color-text-secondary)]">{{ project.subtitle }}</p>
            </div>
            <ArrowRight
              :size="18"
              class="mt-1 shrink-0 text-[var(--color-text-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
            />
          </div>
          <p class="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {{ project.oneLiner }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <Tag v-for="tech in project.stack.slice(0, 6)" :key="tech" :label="tech" />
            <Tag
              v-if="project.stack.length > 6"
              :label="`+${project.stack.length - 6}`"
              variant="muted"
            />
          </div>
          <footer
            class="mt-auto flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-3 font-mono text-xs"
          >
            <span class="text-[var(--color-text-muted)]">{{ formatPeriod(project) }}</span>
            <span v-if="project.award && !project.hero" class="text-[var(--color-accent)]">
              🏆 {{ shortAward(project.award) }}
            </span>
            <span v-else class="text-[var(--color-text-muted)]">{{ project.roles.join(' · ') }}</span>
          </footer>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
