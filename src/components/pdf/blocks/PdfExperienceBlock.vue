<script setup lang="ts">
import type { Experience } from '@/types'

defineProps<{ experiences: readonly Experience[] }>()
</script>

<template>
  <section class="pdf-block pdf-exp">
    <h2>Experience</h2>
    <article v-for="exp in experiences" :key="exp.company" class="pdf-exp-company">
      <header class="pdf-exp-company-header">
        <div class="pdf-exp-company-title">
          <h3>{{ exp.company }}</h3>
          <p v-if="exp.developerPeriod" class="pdf-exp-dev">
            {{ exp.developerPeriod }}
          </p>
        </div>
        <span class="pdf-exp-company-period">{{ exp.totalPeriod }}</span>
      </header>

      <ol class="pdf-exp-roles">
        <li v-for="(role, ri) in exp.roles" :key="ri" class="pdf-exp-role">
          <header class="pdf-exp-role-header">
            <div class="pdf-exp-role-name">
              <strong class="pdf-exp-team">{{ role.team }}</strong>
              <span class="pdf-exp-position">{{ role.position }}</span>
            </div>
            <span class="pdf-exp-role-period">
              {{ role.period.start }} ~ {{ role.period.end ?? '현재' }}
            </span>
          </header>

          <div v-if="role.stack.length" class="pdf-exp-stack">
            <span v-for="s in role.stack" :key="s" class="pdf-tag">{{ s }}</span>
          </div>

          <ol v-if="role.details.length" class="pdf-exp-details">
            <li v-for="(d, di) in role.details" :key="di" class="pdf-exp-detail">
              <header class="pdf-exp-detail-header">
                <h4>{{ d.title }}</h4>
                <span v-if="d.period" class="pdf-exp-detail-period">{{ d.period }}</span>
              </header>
              <ul v-if="d.bullets.length" class="pdf-exp-bullets">
                <li v-for="(b, bi) in d.bullets" :key="bi">{{ b }}</li>
              </ul>
            </li>
          </ol>
        </li>
      </ol>
    </article>
  </section>
</template>

<style scoped>
.pdf-exp h2 {
  margin: 0 0 10pt 0;
  font-size: 16pt;
  font-weight: 700;
}

.pdf-exp-company {
  padding-left: 8pt;
  border-left: 2pt solid #0f172a;
  break-inside: avoid;
}
.pdf-exp-company + .pdf-exp-company {
  margin-top: 14pt;
}

.pdf-exp-company-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8pt;
  flex-wrap: wrap;
  margin-bottom: 2pt;
}
.pdf-exp-company-title {
  display: flex;
  align-items: baseline;
  gap: 6pt;
  flex-wrap: wrap;
}
.pdf-exp-company-title h3 {
  margin: 0;
  font-size: 13pt;
  font-weight: 700;
  color: #0f172a;
}
.pdf-exp-dev {
  margin: 0;
  font-size: 8.5pt;
  color: #64748b;
}
.pdf-exp-company-period {
  font-size: 9pt;
  color: #475569;
  font-variant-numeric: tabular-nums;
}

.pdf-exp-roles {
  list-style: none;
  padding: 0;
  margin: 6pt 0 0 0;
}
.pdf-exp-role {
  break-inside: avoid;
}
.pdf-exp-role + .pdf-exp-role {
  margin-top: 10pt;
  padding-top: 8pt;
  border-top: 0.5pt dashed #cbd5e1;
}

.pdf-exp-role-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8pt;
  flex-wrap: wrap;
  margin-bottom: 3pt;
}
.pdf-exp-role-name {
  display: flex;
  align-items: baseline;
  gap: 6pt;
  flex-wrap: wrap;
}
.pdf-exp-team {
  font-size: 11pt;
  font-weight: 600;
  color: #0f172a;
}
.pdf-exp-position {
  font-size: 9.5pt;
  color: #334155;
}
.pdf-exp-role-period {
  font-size: 8.5pt;
  color: #475569;
  font-variant-numeric: tabular-nums;
}

.pdf-exp-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 2pt 3pt;
  margin: 2pt 0 4pt 0;
}
.pdf-exp-stack .pdf-tag {
  font-size: 8pt;
  padding: 0.5pt 4pt;
  border: 0.5pt solid #cbd5e1;
  border-radius: 2pt;
  color: #334155;
  background: #f8fafc;
}

.pdf-exp-details {
  list-style: none;
  padding: 0;
  margin: 3pt 0 0 0;
}
.pdf-exp-detail {
  position: relative;
  padding: 2pt 0 2pt 8pt;
  break-inside: avoid;
}
.pdf-exp-detail::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4pt;
  bottom: 4pt;
  width: 1.5pt;
  background: #94a3b8;
  border-radius: 1pt;
}
.pdf-exp-detail + .pdf-exp-detail {
  margin-top: 5pt;
}

.pdf-exp-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8pt;
  flex-wrap: wrap;
  margin-bottom: 2pt;
}
.pdf-exp-detail-header h4 {
  margin: 0;
  font-size: 10pt;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.35;
}
.pdf-exp-detail-period {
  font-size: 8pt;
  color: #64748b;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.pdf-exp-bullets {
  list-style: none;
  padding: 0;
  margin: 2pt 0 0 0;
}
.pdf-exp-bullets li {
  position: relative;
  padding-left: 8pt;
  font-size: 9pt;
  line-height: 1.5;
  color: #334155;
}
.pdf-exp-bullets li + li {
  margin-top: 2pt;
}
.pdf-exp-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: #94a3b8;
}
</style>
