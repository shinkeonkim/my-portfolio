<script setup lang="ts">
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { skillsByCategory } from '@/data'
</script>

<template>
  <section id="skills" class="container-page py-24">
    <SectionTitle eyebrow="Skills" title="Stack & Experience" />

    <div class="mt-12 space-y-6">
      <div
        v-for="group in skillsByCategory"
        :key="group.category"
        class="flex flex-col gap-3 border-b border-[var(--color-border-subtle)] pb-6 last:border-b-0 md:flex-row md:items-start md:gap-8"
      >
        <h3
          data-skill-category
          class="shrink-0 text-sm font-semibold text-[var(--color-accent)] md:w-40"
        >
          {{ group.label }}
        </h3>
        <div class="flex flex-wrap gap-1.5">
          <Tag
            v-for="skill in group.skills"
            :key="skill.slug"
            :data-skill-name="skill.name"
            :label="skill.name"
          />
        </div>
      </div>
    </div>
  </section>
</template>
