<script setup lang="ts">
import type { AIExperiment } from '@/types'

defineProps<{ items: readonly AIExperiment[] }>()
</script>

<template>
  <section v-if="items.length" class="pdf-block">
    <h2>AI Experiments</h2>
    <div class="pdf-grid-2">
      <div v-for="ex in items" :key="ex.slug" class="pdf-card pdf-ai-item">
        <div class="pdf-ai-header">
          <span class="pdf-ai-emoji">{{ ex.emoji }}</span>
          <strong>{{ ex.title }}</strong>
          <span class="pdf-muted pdf-ai-category">{{ ex.category }}</span>
        </div>
        <p class="pdf-ai-tagline">{{ ex.tagline }}</p>
        <p class="pdf-ai-desc">{{ ex.description }}</p>
        <div v-if="ex.links" class="pdf-ai-links">
          <a v-if="ex.links.site" :href="ex.links.site">{{ ex.links.site }}</a>
          <a v-if="ex.links.github" :href="ex.links.github">GitHub</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-ai-item {
  padding: 5pt 7pt;
}
.pdf-ai-header {
  display: flex;
  align-items: baseline;
  gap: 3pt;
  font-size: 10pt;
}
.pdf-ai-emoji {
  font-size: 11pt;
}
.pdf-ai-category {
  font-size: 7.5pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.pdf-ai-tagline {
  font-size: 9pt;
  color: #334155;
  margin: 1pt 0;
}
.pdf-ai-desc {
  font-size: 8.5pt;
  color: #475569;
  margin: 1pt 0;
}
.pdf-ai-links {
  display: flex;
  gap: 6pt;
  font-size: 8pt;
  margin-top: 2pt;
}
.pdf-ai-links a {
  color: #1d4ed8;
}
</style>
