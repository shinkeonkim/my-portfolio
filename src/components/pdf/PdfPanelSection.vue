<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next'

defineProps<{
  title: string
  checked: boolean
}>()
defineEmits<{
  toggle: []
}>()
</script>

<template>
  <details open class="pdf-panel-section">
    <summary class="pdf-panel-summary">
      <span
        class="pdf-panel-drag-handle"
        aria-label="섹션 순서 변경"
        title="드래그하여 순서 변경"
        @click.stop.prevent
      >
        <GripVertical :size="14" />
      </span>
      <span class="pdf-panel-title">{{ title }}</span>
      <label class="pdf-panel-section-check" @click.stop>
        <input
          type="checkbox"
          :checked="checked"
          @change="$emit('toggle')"
          @click.stop
        />
      </label>
    </summary>
    <div v-if="checked" class="pdf-panel-body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.pdf-panel-section {
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 8px;
  background: var(--color-bg-elevated);
  transition:
    box-shadow 0.15s,
    border-color 0.15s,
    transform 0.15s;
}
.pdf-panel-summary {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 2px 0;
  letter-spacing: 0.02em;
  gap: 8px;
  list-style: none;
}
.pdf-panel-summary::-webkit-details-marker {
  display: none;
}
.pdf-panel-drag-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 3px;
  color: var(--color-text-muted);
  cursor: grab;
  flex-shrink: 0;
  touch-action: none;
}
.pdf-panel-drag-handle:hover {
  background: var(--color-bg-overlay);
  color: var(--color-accent);
}
.pdf-panel-drag-handle:active {
  cursor: grabbing;
}
.pdf-panel-title {
  flex: 1;
}
.pdf-panel-section-check {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.pdf-panel-section-check input {
  accent-color: var(--color-accent);
  cursor: pointer;
}
.pdf-panel-body {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--color-border-subtle);
}
</style>
