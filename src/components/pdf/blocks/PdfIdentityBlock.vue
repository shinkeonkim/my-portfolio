<script setup lang="ts">
import type { IdentityValue } from '@/types'

defineProps<{ items: readonly IdentityValue[] }>()
</script>

<template>
  <section v-if="items.length" class="pdf-block">
    <h2>Identity / 일하는 방식</h2>
    <div class="pdf-grid-2">
      <div v-for="(item, i) in items" :key="i" class="pdf-card">
        <h3>{{ item.headline }}</h3>
        <p class="pdf-identity-desc">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pdf-identity-desc {
  font-size: 9.5pt;
  color: #334155;
  margin-top: 2pt;
}
</style>
