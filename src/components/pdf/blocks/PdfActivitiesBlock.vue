<script setup lang="ts">
import type { Activity } from '@/types'

defineProps<{ items: readonly Activity[] }>()
</script>

<template>
  <section v-if="items.length" class="pdf-block">
    <h2>Activities</h2>
    <div v-for="a in items" :key="a.slug" :data-activity-slug="a.slug" class="pdf-activity">
      <header class="pdf-activity-header">
        <h3>{{ a.title }}</h3>
        <span class="pdf-muted"> {{ a.period.start }} ~ {{ a.period.end ?? '진행 중' }} </span>
      </header>
      <p class="pdf-activity-meta">
        <strong>{{ a.organization }}</strong>
        <span v-if="a.role"> · {{ a.role }}</span>
      </p>
      <div
        v-if="a.pdfCompact?.length"
        data-activity-projection="compact"
        class="pdf-activity-compact"
      >
        <div
          v-for="row in a.pdfCompact"
          :key="row.key"
          :data-activity-row="row.key"
          class="pdf-activity-compact-row"
          v-html="row.html"
        />
      </div>
      <template v-else>
        <ul v-if="a.highlights.length" class="pdf-activity-list">
          <li v-for="(h, hi) in a.highlights" :key="hi">{{ h }}</li>
        </ul>
        <div v-if="a.timeline?.length" class="pdf-activity-timeline">
          <div v-for="(t, ti) in a.timeline" :key="ti" class="pdf-activity-timeline-row">
            <span
              class="pdf-activity-timeline-period"
              :class="{ 'pdf-activity-timeline-period--year': /^\d{4}$/.test(t.period) }"
            >
              {{ t.period }}
            </span>
            <div class="pdf-activity-timeline-content">
              <strong>{{ t.title }}</strong>
              <span v-if="t.role" class="pdf-muted"> · {{ t.role }}</span>
              <ul v-if="t.bullets.length">
                <li v-for="(b, bi) in t.bullets" :key="bi">{{ b }}</li>
              </ul>
            </div>
          </div>
        </div>
      </template>
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
  list-style: disc;
  padding-left: 16pt;
  font-size: 9.5pt;
  margin: 0;
}
.pdf-activity-compact {
  font-size: 9.5pt;
}
.pdf-activity-compact-row {
  margin: 0 0 2pt;
}
.pdf-activity-compact-row:last-child {
  margin-bottom: 0;
}
/* 기수/학기 이력이 세로로 길어지지 않도록 2열로 흘리고 항목은 한 줄로 유지한다. */
.pdf-activity-timeline {
  margin-top: 3pt;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2pt 12pt;
  align-items: start;
}
.pdf-activity-timeline-row {
  display: flex;
  gap: 4pt;
  margin: 0;
  padding-left: 4pt;
  border-left: 1pt solid #cbd5e1;
  font-size: 9pt;
  min-width: 0;
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-activity-timeline-period {
  flex: 0 0 auto;
  width: max-content;
  min-width: 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #64748b;
  font-size: 8.5pt;
  white-space: nowrap;
}
.pdf-activity-timeline-period--year {
  min-width: 3.5em;
}
.pdf-activity-timeline-content {
  flex: 1 1 auto;
  min-width: 0;
}
.pdf-activity-timeline ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  font-size: 9pt;
  margin: 0;
}
.pdf-activity-timeline ul > li {
  display: inline;
  margin: 0;
}
.pdf-activity-timeline ul > li + li::before {
  content: '·';
  color: #94a3b8;
  margin: 0 4pt;
}

@media screen and (max-width: 793px) {
  .pdf-activity-timeline {
    grid-template-columns: 1fr;
  }
}
</style>
