<script setup lang="ts">
import type { Activity } from '@/types'

defineProps<{ items: readonly Activity[] }>()
</script>

<template>
  <section v-if="items.length" class="pdf-block">
    <h2>Activities</h2>
    <div v-for="a in items" :key="a.slug" class="pdf-activity">
      <header class="pdf-activity-header">
        <h3>{{ a.title }}</h3>
        <span class="pdf-muted">
          {{ a.period.start }} ~ {{ a.period.end ?? '진행 중' }}
        </span>
      </header>
      <p class="pdf-activity-meta">
        <strong>{{ a.organization }}</strong>
        <span v-if="a.role"> · {{ a.role }}</span>
      </p>
      <ul v-if="a.highlights.length" class="pdf-activity-list">
        <li v-for="(h, hi) in a.highlights" :key="hi">{{ h }}</li>
      </ul>
      <div v-if="a.timeline?.length" class="pdf-activity-timeline">
        <div v-for="(t, ti) in a.timeline" :key="ti" class="pdf-activity-timeline-row">
          <span class="pdf-activity-timeline-period">{{ t.period }}</span>
          <div>
            <strong>{{ t.title }}</strong>
            <span v-if="t.role" class="pdf-muted"> · {{ t.role }}</span>
            <ul>
              <li v-for="(b, bi) in t.bullets" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-activity + .pdf-activity {
  margin-top: 8pt;
  padding-top: 5pt;
  border-top: 0.5pt solid #e2e8f0;
}
.pdf-activity-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6pt;
  flex-wrap: wrap;
}
.pdf-activity-meta {
  font-size: 9.5pt;
  color: #475569;
  margin: 0 0 3pt 0;
}
.pdf-activity-list {
  font-size: 9.5pt;
  margin: 0;
}
.pdf-activity-timeline {
  margin-top: 4pt;
  padding-left: 4pt;
  border-left: 1pt solid #cbd5e1;
}
.pdf-activity-timeline-row {
  display: flex;
  gap: 6pt;
  margin: 3pt 0;
  font-size: 9pt;
}
.pdf-activity-timeline-period {
  flex-shrink: 0;
  min-width: 90pt;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #64748b;
  font-size: 8.5pt;
  white-space: nowrap;
}
.pdf-activity-timeline ul {
  font-size: 9pt;
  margin: 1pt 0;
}
</style>
