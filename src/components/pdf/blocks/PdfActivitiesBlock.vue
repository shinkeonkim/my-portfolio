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
        v-if="a.slug === 'likelion-kookmin'"
        data-activity-projection="likelion-compact"
        class="pdf-activity-compact"
      >
        <div data-activity-row="staff-history" class="pdf-activity-compact-row">
          <strong>운영진 이력</strong>: 2025 (13기) · 2024 (12기) · 2022 (10기) ·
          <strong>2021 (9기 대표)</strong> · 2020 (8기 아기사자)
        </div>
        <div data-activity-row="ninth-generation-highlights" class="pdf-activity-compact-row">
          <strong>9기 운영진 대표</strong> 주요 활동: Git/GitHub 심화 강의 · Algorithm 스터디 운영 ·
          12개 대학 연합 해커톤 배포 담당 (배포 119 부서)
        </div>
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
.pdf-activity-timeline {
  margin-top: 3pt;
  padding-left: 4pt;
  border-left: 1pt solid #cbd5e1;
  min-width: 0;
}
.pdf-activity-timeline-row {
  display: flex;
  gap: 4pt;
  margin: 2pt 0;
  font-size: 9pt;
  min-width: 0;
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
  list-style: disc;
  padding-left: 16pt;
  font-size: 9pt;
  margin: 1pt 0;
}
</style>
