<script setup lang="ts">
import type { Education } from '@/types'

defineProps<{ educations: readonly Education[] }>()
</script>

<template>
  <section v-if="educations.length" class="pdf-block">
    <h2>Education</h2>
    <ul class="pdf-edu-list">
      <li v-for="(e, i) in educations" :key="i" class="pdf-edu-item">
        <div class="pdf-edu-header">
          <strong>{{ e.school }}</strong>
          <span v-if="e.major"> · {{ e.major }}</span>
          <span v-if="e.degree" class="pdf-muted"> · {{ e.degree }}</span>
        </div>
        <div class="pdf-edu-meta">
          <span>{{ e.period.start }} ~ {{ e.period.end ?? '재학 중' }}</span>
          <span> · {{ e.status }}</span>
          <span v-if="e.gpa">
            · GPA: {{ e.gpa.major }} (전공) / {{ e.gpa.total }} (전체) / {{ e.gpa.scale }}
          </span>
        </div>
        <ul v-if="e.notes?.length" class="pdf-edu-notes">
          <li v-for="(n, ni) in e.notes" :key="ni">{{ n }}</li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pdf-edu-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.pdf-edu-item {
  margin: 3pt 0;
}
.pdf-edu-item + .pdf-edu-item {
  margin-top: 6pt;
}
.pdf-edu-header {
  font-size: 10.5pt;
}
.pdf-edu-meta {
  font-size: 9pt;
  color: #475569;
  margin: 1pt 0;
}
.pdf-edu-notes {
  font-size: 9pt;
  margin: 2pt 0;
}
</style>
