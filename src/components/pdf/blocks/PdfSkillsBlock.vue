<script setup lang="ts">
import type { SkillCategoryGroup } from '@/types'

defineProps<{ groups: readonly SkillCategoryGroup[] }>()
</script>

<template>
  <section class="pdf-block">
    <h2>Skills</h2>
    <template v-for="g in groups" :key="g.category">
      <div v-if="g.skills.length" class="pdf-skill-group">
        <h3>{{ g.label }}</h3>
        <div class="pdf-skill-list">
          <span v-for="s in g.skills" :key="s.slug" class="pdf-tag">{{ s.name }}</span>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.pdf-skill-group + .pdf-skill-group {
  margin-top: 6pt;
}
.pdf-skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3pt 8pt;
}
</style>
