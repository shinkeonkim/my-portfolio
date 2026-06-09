<script setup lang="ts">
import type { ContactLink } from '@/types'

defineProps<{ links: readonly ContactLink[] }>()
</script>

<template>
  <section v-if="links.length" class="pdf-block pdf-contact-section">
    <h2>Contact</h2>
    <ul class="pdf-contact-list">
      <li v-for="c in links" :key="c.href">
        <strong>{{ c.label }}</strong>
        <span>:</span>
        <a :href="c.href">{{ c.value }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pdf-contact-section {
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-contact-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1pt 12pt;
  font-size: 10pt;
}
.pdf-contact-list li {
  display: flex;
  gap: 4pt;
  align-items: baseline;
}
.pdf-contact-list a {
  color: #1d4ed8;
}
</style>
