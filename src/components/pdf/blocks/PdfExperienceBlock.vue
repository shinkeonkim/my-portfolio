<script setup lang="ts">
import type { Experience } from '@/types'

defineProps<{ experiences: readonly Experience[] }>()
</script>

<template>
  <section class="pdf-block">
    <h2>Experience</h2>
    <div v-for="exp in experiences" :key="exp.company" class="pdf-exp-company">
      <div class="pdf-exp-header">
        <h3>{{ exp.company }}</h3>
        <span class="pdf-muted">{{ exp.totalPeriod }}</span>
      </div>
      <p v-if="exp.developerPeriod" class="pdf-exp-dev">{{ exp.developerPeriod }}</p>
      <div v-for="(role, ri) in exp.roles" :key="ri" class="pdf-exp-role">
        <div class="pdf-exp-role-header">
          <strong>{{ role.team }}</strong>
          <span> · </span>
          <span>{{ role.position }}</span>
          <span class="pdf-muted">
            {{ role.period.start }} ~ {{ role.period.end ?? '현재' }}
          </span>
        </div>
        <div v-if="role.stack.length" class="pdf-exp-stack">
          <span v-for="s in role.stack" :key="s" class="pdf-tag">{{ s }}</span>
        </div>
        <div v-for="(d, di) in role.details" :key="di" class="pdf-exp-detail">
          <h4>{{ d.title }}</h4>
          <p v-if="d.period" class="pdf-muted">{{ d.period }}</p>
          <ul>
            <li v-for="(b, bi) in d.bullets" :key="bi">{{ b }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-exp-company + .pdf-exp-company {
  margin-top: 10pt;
  padding-top: 6pt;
  border-top: 0.5pt solid #e2e8f0;
}
.pdf-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4pt;
}
.pdf-exp-dev {
  font-size: 9pt;
  color: #475569;
  margin: 0 0 4pt 0;
}
.pdf-exp-role {
  margin-top: 6pt;
}
.pdf-exp-role + .pdf-exp-role {
  margin-top: 8pt;
}
.pdf-exp-role-header {
  font-size: 10.5pt;
}
.pdf-exp-role-header .pdf-muted {
  margin-left: 6pt;
  font-size: 9pt;
}
.pdf-exp-stack {
  margin: 2pt 0 3pt 0;
}
.pdf-exp-detail {
  margin-top: 4pt;
}
.pdf-exp-detail ul {
  font-size: 9.5pt;
}
</style>
