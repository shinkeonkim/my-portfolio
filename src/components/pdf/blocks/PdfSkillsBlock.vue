<script setup lang="ts">
import type { SkillCategoryGroup } from '@/types'

defineProps<{ groups: readonly SkillCategoryGroup[] }>()

function levelMark(level: string): string {
  if (level === 'core') return '★'
  if (level === 'proficient') return '◆'
  return '·'
}
</script>

<template>
  <section class="pdf-block">
    <h2>Skills</h2>
    <div v-for="g in groups" :key="g.category" class="pdf-skill-group">
      <h3>{{ g.label }}</h3>
      <p v-if="g.description" class="pdf-skill-desc">{{ g.description }}</p>
      <div class="pdf-skill-list">
        <span v-for="s in g.skills" :key="s.slug" class="pdf-skill-item">
          <span class="pdf-skill-mark" :data-level="s.level">{{ levelMark(s.level) }}</span>
          <span class="pdf-skill-name">{{ s.name }}</span>
          <span v-if="s.experienceYears" class="pdf-skill-years">
            {{ s.experienceYears }}y
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-skill-group + .pdf-skill-group {
  margin-top: 6pt;
}
.pdf-skill-desc {
  font-size: 9pt;
  color: #64748b;
  margin: 0 0 3pt 0;
}
.pdf-skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3pt 8pt;
}
.pdf-skill-item {
  display: inline-flex;
  align-items: baseline;
  gap: 2pt;
  font-size: 9.5pt;
  color: #1f2937;
}
.pdf-skill-mark {
  font-size: 8pt;
  color: #94a3b8;
}
.pdf-skill-mark[data-level='core'] {
  color: #0f172a;
}
.pdf-skill-mark[data-level='proficient'] {
  color: #475569;
}
.pdf-skill-name {
  font-weight: 500;
}
.pdf-skill-years {
  font-size: 8.5pt;
  color: #94a3b8;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
</style>
