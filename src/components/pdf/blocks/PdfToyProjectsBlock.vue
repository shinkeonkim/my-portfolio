<script setup lang="ts">
import { computed } from 'vue'
import type { ToyProject, ToyProjectCategory } from '@/types'

const props = defineProps<{ items: readonly ToyProject[] }>()

const CATEGORY_LABELS: Record<ToyProjectCategory, string> = {
  tool: 'Tools',
  game: 'Games',
  site: 'Sites',
  extension: 'Extensions',
  package: 'Packages',
  hardware: 'Hardware',
}

const grouped = computed(() => {
  const map = new Map<ToyProjectCategory, ToyProject[]>()
  for (const item of props.items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return Array.from(map.entries())
})
</script>

<template>
  <section v-if="items.length" class="pdf-block">
    <h2>Toy Projects</h2>
    <div v-for="[cat, list] in grouped" :key="cat" class="pdf-toy-group">
      <h3>{{ CATEGORY_LABELS[cat] }}</h3>
      <div class="pdf-toy-list">
        <span v-for="t in list" :key="t.slug" class="pdf-toy-item">
          <span class="pdf-toy-emoji">{{ t.emoji }}</span>
          <strong>{{ t.name }}</strong>
          <span class="pdf-muted">— {{ t.tagline }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-toy-group + .pdf-toy-group {
  margin-top: 5pt;
}
.pdf-toy-list {
  display: flex;
  flex-direction: column;
  gap: 1.5pt;
  font-size: 9pt;
}
.pdf-toy-item {
  display: flex;
  align-items: baseline;
  gap: 3pt;
}
.pdf-toy-emoji {
  font-size: 10pt;
}
</style>
