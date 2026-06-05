<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { skillsByCategory, getProjectBySlug } from '@/data'
import type { SkillLevel } from '@/types'

const activeCategory = ref<string>(skillsByCategory[0]?.category ?? 'language')

const activeGroup = computed(
  () => skillsByCategory.find((g) => g.category === activeCategory.value) ?? skillsByCategory[0],
)

const levelLabel: Record<SkillLevel, string> = {
  core: 'Core',
  proficient: 'Proficient',
  familiar: 'Familiar',
}

const levelOrder: Record<SkillLevel, number> = { core: 0, proficient: 1, familiar: 2 }

const orderedSkills = computed(() => {
  const list = activeGroup.value?.skills ?? []
  return [...list].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
})

function projectLabel(slug: string): string {
  const p = getProjectBySlug(slug)
  return p?.displayName ?? p?.name ?? slug
}
</script>

<template>
  <section id="skills" class="container-page py-24">
    <SectionTitle
      eyebrow="Skills"
      title="Stack & Experience"
      description="필요한 도구를 골라 쓰되, 깊이를 가진 영역과 빠르게 적응하는 영역을 구분해 표시합니다."
    />

    <div class="mt-10 flex flex-wrap gap-2">
      <button
        v-for="group in skillsByCategory"
        :key="group.category"
        type="button"
        class="rounded-full border px-3 py-1.5 text-xs font-medium transition"
        :class="
          activeCategory === group.category
            ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]/30 text-[var(--color-accent)]'
            : 'border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-muted)]'
        "
        @click="activeCategory = group.category"
      >
        {{ group.label }}
      </button>
    </div>

    <p v-if="activeGroup" class="mt-4 text-sm text-[var(--color-text-secondary)]">
      {{ activeGroup.description }}
    </p>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <article
        v-for="skill in orderedSkills"
        :key="skill.slug"
        class="surface-card p-5"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-base font-semibold text-[var(--color-text-primary)]">{{ skill.name }}</h3>
          <Tag
            :label="levelLabel[skill.level]"
            :variant="skill.level === 'core' ? 'accent' : 'default'"
          />
        </div>
        <p v-if="skill.experienceYears" class="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
          {{ skill.experienceYears }}년+ 경력
        </p>
        <p v-if="skill.description" class="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {{ skill.description }}
        </p>
        <div v-if="skill.projectSlugs.length" class="mt-3 flex flex-wrap gap-1.5">
          <RouterLink
            v-for="slug in skill.projectSlugs"
            :key="slug"
            :to="{ name: 'project-detail', params: { slug } }"
            class="inline-flex items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]/30 hover:text-[var(--color-accent)]"
          >
            {{ projectLabel(slug) }}
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>
