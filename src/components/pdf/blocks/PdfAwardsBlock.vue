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
</script>

<template>
  <section v-if="awards.length || certifications.length" class="pdf-block">
    <h2>{{ heading }}</h2>
    <div v-if="awards.length" class="pdf-awards-group">
      <h3 v-if="showBothHeaders">Awards</h3>
      <ul class="pdf-awards-list">
        <li v-for="(a, i) in awards" :key="i" class="pdf-award-item">
          <span class="pdf-award-date">{{ a.date }}</span>
          <div class="pdf-award-body">
            <strong>{{ a.title }}</strong>
            <span v-if="a.rank" class="pdf-award-rank">{{ a.rank }}</span>
            <p class="pdf-muted">{{ a.organization }}</p>
            <p v-if="a.detail" class="pdf-award-detail">{{ a.detail }}</p>
          </div>
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
.pdf-awards-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.pdf-award-item {
  display: flex;
  gap: 8pt;
  align-items: baseline;
  margin: 3pt 0;
  font-size: 9.5pt;
}
.pdf-award-date {
  flex-shrink: 0;
  width: 50pt;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #64748b;
  font-size: 8.5pt;
}
.pdf-award-body {
  flex: 1;
}
.pdf-award-rank {
  display: inline-block;
  margin-left: 4pt;
  padding: 0.5pt 4pt;
  font-size: 8pt;
  background: #0f172a;
  color: #ffffff;
  border-radius: 2pt;
}
.pdf-award-detail {
  font-size: 9pt;
  color: #334155;
  margin: 1pt 0 0 0;
}
.pdf-cert-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1pt 8pt;
  font-size: 9pt;
}
.pdf-cert-list li {
  display: flex;
  gap: 6pt;
  align-items: baseline;
}
</style>
