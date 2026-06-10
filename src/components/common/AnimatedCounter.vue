<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
    suffix?: string
  }>(),
  { duration: 1100, suffix: '' },
)

const rootRef = useTemplateRef<HTMLSpanElement>('rootRef')
const display = ref(0)
let observer: IntersectionObserver | null = null
let rafId: number | null = null

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function startCount() {
  const start = performance.now()
  const target = props.value
  function step(now: number) {
    const elapsed = now - start
    const progress = Math.min(1, elapsed / props.duration)
    display.value = Math.round(easeOutCubic(progress) * target)
    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      display.value = target
      rafId = null
    }
  }
  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  if (typeof window === 'undefined' || !rootRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = props.value
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          startCount()
          observer?.disconnect()
          break
        }
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<template>
  <span ref="rootRef" class="pdf-counter">{{ display }}{{ suffix }}</span>
</template>
