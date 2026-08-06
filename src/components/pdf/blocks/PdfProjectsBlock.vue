<script setup lang="ts">
import type { PdfProjectField, Project } from '@/types'
import PdfProjectChallenge from './PdfProjectChallenge.vue'
import { formatProjectLink } from './pdf-project-link'

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
      <div class="pdf-project-header-group">
        <header class="pdf-project-header">
          <div>
            <span class="pdf-project-scale">{{ scaleLabel(p.scale) }}</span>
            <h3 class="pdf-project-name">{{ p.displayName ?? p.name }}</h3>
          </div>
          <span class="pdf-muted"> {{ p.period.start }} ~ {{ p.period.end ?? '진행 중' }} </span>
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
      </div>

      <div
        v-if="getField(p.slug, 'description')"
        class="pdf-project-body pdf-project-description"
        v-html="p.description"
      />

      <div v-if="getField(p.slug, 'features') && p.features.length" class="pdf-project-section">
        <h4>주요 기능</h4>
        <div class="pdf-project-features">
          <article v-for="(f, fi) in p.features" :key="fi" class="pdf-feature-card">
            <h5>{{ f.title }}</h5>
            <ul class="pdf-feature-list">
              <li v-for="(c, ci) in f.content" :key="ci" v-html="c" />
            </ul>
          </article>
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
        <div class="pdf-project-contrib">
          <article v-for="(c, ci) in p.contributions" :key="ci" class="pdf-contribution-group">
            <h5>{{ c.title }}</h5>
            <p class="pdf-contribution-summary" v-html="c.summary" />
            <ul v-if="c.items?.length" class="pdf-contribution-items">
              <li v-for="(item, ii) in c.items" :key="ii" v-html="item" />
            </ul>
          </article>
        </div>
      </div>

      <div v-if="getField(p.slug, 'links') && p.links.length" class="pdf-project-links">
        <span v-for="l in p.links" :key="l.url" class="pdf-project-link">
          <a :href="formatProjectLink(l).href">
            <span class="pdf-project-link-label">{{ formatProjectLink(l).label }}</span>
            <span v-if="formatProjectLink(l).hint" class="pdf-project-link-hint">
              ({{ formatProjectLink(l).hint }})
            </span>
          </a>
        </span>
      </div>
    </article>
  </section>
</template>

<style scoped>
.pdf-project {
  margin-bottom: 10pt;
  padding-bottom: 6pt;
  border-bottom: 0.5pt solid #e2e8f0;
  break-inside: auto;
  page-break-inside: auto;
}
.pdf-project:last-child {
  border-bottom: none;
}
.pdf-project-header-group {
  break-inside: avoid;
  page-break-inside: avoid;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-project-header {
  break-inside: avoid;
  page-break-inside: avoid;
  break-after: avoid;
  page-break-after: avoid;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 6pt;
  flex-wrap: wrap;
}
.pdf-project-scale {
  display: inline-block;
  font-size: 7.5pt;
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
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4pt 10pt;
  font-size: 9pt;
  color: #475569;
  margin: 0 0 3pt 0;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-project-stack {
  margin: 2pt 0 5pt 0;
}
.pdf-project-body {
  font-size: 9.5pt;
  color: #1f2937;
  margin: 3pt 0;
}
/* 설명 문단마다 불릿을 붙여 문장 단위 구분이 드러나게 한다. */
.pdf-project-description :deep(> p) {
  position: relative;
  padding-left: 9pt;
  margin: 0 0 2pt 0;
}
.pdf-project-description :deep(> p)::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: #94a3b8;
}
.pdf-project-description :deep(> ul) {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  list-style: none;
  margin: 3pt 0 4pt;
  padding-left: 9pt;
}
.pdf-project-description :deep(> ul > li) {
  display: inline;
  margin: 0;
}
.pdf-project-description :deep(> ul > li + li)::before {
  content: '·';
  color: #94a3b8;
  margin: 0 5pt;
}
.pdf-project-description :deep(> ol) {
  display: block;
  list-style: decimal;
  margin: 3pt 0 4pt;
  padding-left: 16pt;
}
.pdf-project-description :deep(> ol > li) {
  margin: 1pt 0;
}
.pdf-project-description :deep(> ul ul) {
  display: block;
  list-style: disc;
  margin: 1pt 0 2pt;
  padding-left: 14pt;
}
.pdf-project-section {
  margin-top: 6pt;
}
.pdf-project-section > h4 {
  break-inside: avoid;
  page-break-inside: avoid;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-project-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2pt 5pt;
  margin: 0;
}
.pdf-feature-card {
  border: 0.5pt solid #e2e8f0;
  border-radius: 3pt;
  padding: 2pt 4pt;
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
.pdf-feature-list {
  margin: 0;
  padding-left: 12pt;
  list-style-type: disc;
  font-size: 9pt;
  color: #334155;
}
.pdf-feature-list > li {
  margin: 0.5pt 0;
}
.pdf-project-contrib {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2pt 6pt;
}
.pdf-contribution-group {
  break-inside: avoid;
  page-break-inside: avoid;
  border-left: 1.5pt solid #cbd5e1;
  padding-left: 6pt;
}
.pdf-contribution-group h5 {
  margin: 0 0 1pt;
  font-size: 9.5pt;
  font-weight: 700;
  color: #0f172a;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-contribution-summary {
  margin: 0 0 1pt;
  font-size: 9.5pt;
  color: #334155;
}
.pdf-contribution-items {
  margin: 0;
  padding-left: 12pt;
  list-style-type: disc;
  font-size: 9pt;
  color: #334155;
}
.pdf-contribution-items > li {
  margin: 0.5pt 0;
}
.pdf-project-links {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  margin-top: 4pt;
  display: flex;
  flex-wrap: wrap;
  gap: 2pt 10pt;
  font-size: 9pt;
}
.pdf-project-link {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.pdf-project-link a {
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
  flex-wrap: wrap;
  gap: 0 3pt;
  color: #1d4ed8;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.pdf-project-link-label,
.pdf-project-link-hint {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.pdf-project-link-hint {
  color: #64748b;
  font-size: 8.5pt;
}

@media screen and (max-width: 793px) {
  .pdf-project-features,
  .pdf-project-contrib {
    grid-template-columns: 1fr;
  }
}
</style>
