<script setup lang="ts">
import type { PdfProjectField, Project } from '@/types'
import PdfProjectChallenge from './PdfProjectChallenge.vue'

defineProps<{
  projects: readonly Project[]
  getField: (slug: string, field: PdfProjectField) => boolean
}>()

function scaleLabel(s: Project['scale']): string {
  if (s === 'major') return 'Major'
  if (s === 'hackathon') return 'Hackathon'
  return 'Side'
}
</script>

<template>
  <section class="pdf-block">
    <h2>Projects</h2>
    <article v-for="p in projects" :key="p.slug" class="pdf-project">
      <header class="pdf-project-header">
        <div>
          <span class="pdf-project-scale">{{ scaleLabel(p.scale) }}</span>
          <h3 class="pdf-project-name">{{ p.displayName ?? p.name }}</h3>
        </div>
        <span class="pdf-muted">
          {{ p.period.start }} ~ {{ p.period.end ?? '진행 중' }}
        </span>
      </header>
      <p class="pdf-project-subtitle">{{ p.subtitle }}</p>
      <div class="pdf-project-meta">
        <span><strong>역할</strong>: {{ p.roles.join(' / ') }}</span>
        <span><strong>팀</strong>: {{ p.team.size }}인{{ p.team.lead ? ' (리드)' : '' }}</span>
        <span v-if="p.award"><strong>수상</strong>: {{ p.award }}</span>
      </div>
      <div class="pdf-project-stack">
        <span v-for="s in p.stack" :key="s" class="pdf-tag">{{ s }}</span>
      </div>

      <div v-if="getField(p.slug, 'description')" class="pdf-project-body" v-html="p.description" />

      <div v-if="getField(p.slug, 'features') && p.features.length" class="pdf-project-section">
        <h4>주요 기능</h4>
        <div class="pdf-project-features">
          <div v-for="(f, fi) in p.features" :key="fi" class="pdf-feature-card">
            <h5>{{ f.title }}</h5>
            <ul>
              <li v-for="(c, ci) in f.content" :key="ci" v-html="c" />
            </ul>
          </div>
        </div>
      </div>

      <div v-if="getField(p.slug, 'challenges') && p.challenges.length" class="pdf-project-section">
        <h4>고민과 해결</h4>
        <PdfProjectChallenge
          v-for="(c, ci) in p.challenges"
          :key="ci"
          :challenge="c"
          :include-detail="getField(p.slug, 'challengeDetail')"
        />
      </div>

      <div
        v-if="getField(p.slug, 'contributions') && p.contributions.length"
        class="pdf-project-section"
      >
        <h4>기여한 것</h4>
        <ul class="pdf-project-contrib">
          <li v-for="(c, ci) in p.contributions" :key="ci" v-html="c" />
        </ul>
      </div>

      <div v-if="getField(p.slug, 'links') && p.links.length" class="pdf-project-links">
        <span v-for="l in p.links" :key="l.url" class="pdf-project-link">
          <strong>{{ l.label }}</strong>: <a :href="l.url">{{ l.url }}</a>
        </span>
      </div>
    </article>
  </section>
</template>

<style scoped>
.pdf-project {
  margin-bottom: 12pt;
  padding-bottom: 8pt;
  border-bottom: 0.5pt solid #e2e8f0;
}
.pdf-project:last-child {
  border-bottom: none;
}
.pdf-project-header {
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-project-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6pt;
  flex-wrap: wrap;
}
.pdf-project-scale {
  display: inline-block;
  font-size: 8pt;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: #64748b;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-right: 4pt;
}
.pdf-project-name {
  display: inline;
  font-size: 12pt;
  font-weight: 700;
  color: #0f172a;
}
.pdf-project-subtitle {
  font-size: 10pt;
  color: #334155;
  margin: 2pt 0 3pt 0;
}
.pdf-project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4pt 10pt;
  font-size: 9pt;
  color: #475569;
  margin: 0 0 3pt 0;
}
.pdf-project-stack {
  margin: 2pt 0 5pt 0;
}
.pdf-project-body {
  font-size: 9.5pt;
  color: #1f2937;
  margin: 3pt 0;
}
.pdf-project-section {
  margin-top: 6pt;
}
.pdf-project-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4pt 6pt;
  margin: 0;
}
.pdf-feature-card {
  border: 0.5pt solid #e2e8f0;
  border-radius: 3pt;
  padding: 4pt 6pt;
  break-inside: avoid;
  page-break-inside: avoid;
  background: #f8fafc;
}
.pdf-feature-card h5 {
  margin: 0 0 2pt 0;
  font-size: 9.5pt;
  font-weight: 700;
  color: #0f172a;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-feature-card ul {
  margin: 0;
  padding-left: 12pt;
  font-size: 9pt;
  color: #334155;
}
.pdf-feature-card li {
  margin: 0.5pt 0;
}
.pdf-project-contrib {
  font-size: 9.5pt;
  margin: 0;
  padding-left: 14pt;
}
.pdf-project-contrib li {
  margin: 1.5pt 0;
}
.pdf-project-links {
  margin-top: 4pt;
  display: flex;
  flex-wrap: wrap;
  gap: 2pt 10pt;
  font-size: 9pt;
}
.pdf-project-link a {
  color: #1d4ed8;
}
</style>
