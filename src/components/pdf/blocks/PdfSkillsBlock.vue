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
/* 카테고리 라벨과 태그를 한 줄에 배치해 A4 에서 세로 공간을 최소화한다. */
.pdf-skill-group {
  display: flex;
  align-items: baseline;
  gap: 6pt;
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-skill-group + .pdf-skill-group {
  margin-top: 1pt;
}
.pdf-skill-group h3 {
  flex: 0 0 70pt;
  margin: 0;
  font-size: 9.5pt;
}
.pdf-skill-list {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1pt 5pt;
}
.pdf-skill-list .pdf-tag {
  margin: 0;
  padding: 0 5pt;
}
</style>
