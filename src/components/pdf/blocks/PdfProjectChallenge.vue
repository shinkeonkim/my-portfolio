<script setup lang="ts">
import type { ProjectChallenge } from '@/types'

defineProps<{
  challenge: ProjectChallenge
  includeDetail: boolean
}>()
</script>

<template>
  <div class="pdf-challenge">
    <div class="pdf-challenge-header">
      <strong class="pdf-challenge-title">{{ challenge.title ?? '챌린지' }}</strong>
      <span v-if="challenge.tags?.length" class="pdf-challenge-tags">
        <span v-for="t in challenge.tags" :key="t" class="pdf-tag">{{ t }}</span>
      </span>
    </div>
    <div class="pdf-challenge-row">
      <span class="pdf-challenge-label">문제</span>
      <div class="pdf-challenge-body" v-html="challenge.problem" />
    </div>
    <div class="pdf-challenge-row">
      <span class="pdf-challenge-label pdf-label-accent">접근</span>
      <div class="pdf-challenge-body" v-html="challenge.approach" />
    </div>
    <div class="pdf-challenge-row">
      <span class="pdf-challenge-label pdf-label-result">결과</span>
      <div class="pdf-challenge-body" v-html="challenge.result" />
    </div>

    <div v-if="includeDetail && challenge.detail" class="pdf-challenge-detail">
      <div v-if="challenge.detail.background" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">배경</span>
        <div v-html="challenge.detail.background" />
      </div>

      <div v-if="challenge.detail.options?.length" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">대안 비교</span>
        <div class="pdf-options">
          <div
            v-for="(opt, oi) in challenge.detail.options"
            :key="oi"
            class="pdf-option"
            :data-chosen="opt.chosen ? 'true' : 'false'"
          >
            <p class="pdf-option-label">
              {{ opt.label }}
              <span v-if="opt.chosen" class="pdf-option-chosen">CHOSEN</span>
            </p>
            <ul v-if="opt.pros?.length" class="pdf-option-pros">
              <li v-for="(p, pi) in opt.pros" :key="pi">+ {{ p }}</li>
            </ul>
            <ul v-if="opt.cons?.length" class="pdf-option-cons">
              <li v-for="(c, ci) in opt.cons" :key="ci">− {{ c }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="challenge.detail.decision" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">결정</span>
        <div v-html="challenge.detail.decision" />
      </div>

      <div v-if="challenge.detail.implementation?.length" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">구현</span>
        <ul>
          <li v-for="(line, li) in challenge.detail.implementation" :key="li" v-html="line" />
        </ul>
      </div>

      <div v-if="challenge.detail.learnings?.length" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">배운 점</span>
        <ul>
          <li v-for="(line, li) in challenge.detail.learnings" :key="li" v-html="line" />
        </ul>
      </div>

      <div v-if="challenge.detail.metrics?.length" class="pdf-challenge-sub">
        <span class="pdf-challenge-sublabel">정량 지표</span>
        <div class="pdf-metrics">
          <span v-for="m in challenge.detail.metrics" :key="m" class="pdf-tag">{{ m }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-challenge {
  border: 0.5pt solid #cbd5e1;
  border-radius: 3pt;
  padding: 5pt 7pt;
  margin-bottom: 5pt;
  font-size: 9.5pt;
}
.pdf-challenge-header {
  margin-bottom: 3pt;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-challenge-title {
  font-size: 10pt;
  color: #0f172a;
}
.pdf-challenge-tags {
  margin-left: 4pt;
}
.pdf-challenge-row {
  display: flex;
  gap: 5pt;
  align-items: flex-start;
  margin: 1.5pt 0;
}
.pdf-challenge-label {
  display: inline-block;
  flex-shrink: 0;
  font-size: 8pt;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  background: #f1f5f9;
  color: #475569;
  padding: 1pt 4pt;
  border-radius: 2pt;
  margin-top: 1pt;
}
.pdf-label-accent {
  background: #fef3c7;
  color: #92400e;
}
.pdf-label-result {
  background: #dcfce7;
  color: #166534;
}
.pdf-challenge-body {
  flex: 1;
}
.pdf-challenge-detail {
  margin-top: 4pt;
  padding-top: 4pt;
  border-top: 0.5pt dashed #e2e8f0;
  font-size: 9pt;
}
.pdf-challenge-sub {
  margin-top: 3pt;
}
.pdf-challenge-sublabel {
  display: block;
  font-size: 8pt;
  color: #64748b;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1pt;
}
.pdf-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4pt;
}
.pdf-option {
  border: 0.5pt solid #e2e8f0;
  border-radius: 2pt;
  padding: 3pt 5pt;
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-option[data-chosen='true'] {
  border-color: #0f172a;
  background: #f8fafc;
}
.pdf-option-label {
  font-weight: 600;
  font-size: 9pt;
  margin: 0 0 1pt 0;
}
.pdf-option-chosen {
  font-size: 7.5pt;
  background: #0f172a;
  color: #ffffff;
  padding: 0.5pt 3pt;
  border-radius: 2pt;
  margin-left: 3pt;
}
.pdf-option-pros,
.pdf-option-cons {
  font-size: 8.5pt;
  padding-left: 0;
  list-style: none;
  margin: 1pt 0;
}
.pdf-option-pros li {
  color: #166534;
}
.pdf-option-cons li {
  color: #991b1b;
}
.pdf-metrics {
  margin-top: 1pt;
}
</style>
