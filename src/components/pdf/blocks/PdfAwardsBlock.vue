<script setup lang="ts">
import { computed } from 'vue'
import type { Award, Certification } from '@/types'

const props = defineProps<{
  awards: readonly Award[]
  certifications: readonly Certification[]
}>()

const heading = computed(() => {
  const hasAwards = props.awards.length > 0
  const hasCerts = props.certifications.length > 0
  if (hasAwards && hasCerts) return 'Awards / Certifications'
  if (hasAwards) return 'Awards'
  if (hasCerts) return 'Certifications'
  return ''
})

const showBothHeaders = computed(
  () => props.awards.length > 0 && props.certifications.length > 0,
)

/** 기관과 부연 설명을 한 줄로 합쳐 자격증 목록과 같은 밀도를 유지한다. */
function awardMeta(award: Award): string {
  return [award.organization, award.detail].filter(Boolean).join(' · ')
}
</script>

<template>
  <section v-if="awards.length || certifications.length" class="pdf-block">
    <h2>{{ heading }}</h2>
    <div v-if="awards.length" class="pdf-awards-group">
      <h3 v-if="showBothHeaders">Awards</h3>
      <ul class="pdf-awards-list">
        <li v-for="(a, i) in awards" :key="i" class="pdf-award-item">
          <span class="pdf-award-date">{{ a.date }}</span>
          <span class="pdf-award-body">
            <strong>{{ a.title }}</strong>
            <span v-if="a.rank" class="pdf-award-rank">{{ a.rank }}</span>
            <span class="pdf-award-meta">{{ awardMeta(a) }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div v-if="certifications.length" class="pdf-awards-group">
      <h3 v-if="showBothHeaders">Certifications</h3>
      <ul class="pdf-cert-list">
        <li v-for="(c, i) in certifications" :key="i">
          <span class="pdf-award-date">{{ c.date }}</span>
          <span>{{ c.title }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pdf-awards-group + .pdf-awards-group {
  margin-top: 6pt;
}
/* 수상과 자격증은 같은 2열 · 날짜 선행 구조를 공유한다. */
.pdf-awards-list,
.pdf-cert-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2pt 12pt;
  align-items: start;
  font-size: 9pt;
}
.pdf-award-item,
.pdf-cert-list li {
  display: flex;
  gap: 6pt;
  align-items: baseline;
  margin: 0;
  min-width: 0;
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-award-date {
  flex-shrink: 0;
  width: 38pt;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #64748b;
  font-size: 8.5pt;
}
.pdf-award-body {
  flex: 1 1 auto;
  min-width: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}
.pdf-award-rank {
  color: #475569;
}
.pdf-award-rank::before {
  content: '·';
  color: #94a3b8;
  margin: 0 3pt;
}
.pdf-award-meta {
  display: block;
  color: #64748b;
  font-size: 8.5pt;
}

@media screen and (max-width: 793px) {
  .pdf-awards-list,
  .pdf-cert-list {
    grid-template-columns: 1fr;
  }
}
</style>
