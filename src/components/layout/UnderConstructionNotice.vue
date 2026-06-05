<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { HardHat, X } from 'lucide-vue-next'

const STORAGE_KEY = 'mp:under-construction:dismissed-at'
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000

const visible = ref(false)

function isStillDismissed(): boolean {
  if (typeof window === 'undefined') return false
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return false
  const ts = Number(raw)
  if (!Number.isFinite(ts)) return false
  return Date.now() - ts < DISMISS_TTL_MS
}

function dismiss() {
  visible.value = false
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // ignore quota / private mode
  }
}

onMounted(() => {
  if (!isStillDismissed()) visible.value = true
})
</script>

<template>
  <transition name="construction">
    <aside
      v-if="visible"
      role="status"
      aria-live="polite"
      class="fixed right-4 bottom-4 z-50 max-w-xs rounded-xl border border-[var(--color-accent-muted)] bg-[var(--color-bg-base)]/95 p-4 shadow-lg backdrop-blur"
    >
      <button
        type="button"
        aria-label="공지 닫기"
        class="absolute top-2 right-2 rounded p-1 text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
        @click="dismiss"
      >
        <X :size="14" />
      </button>
      <div class="flex items-start gap-3">
        <span
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-muted)]/30 text-[var(--color-accent)]"
        >
          <HardHat :size="18" />
        </span>
        <div class="space-y-1">
          <p class="font-mono text-[10px] tracking-wider text-[var(--color-accent)] uppercase">
            공사중
          </p>
          <p class="text-sm leading-relaxed text-[var(--color-text-primary)]">
            미리 찾아와주셔서 감사합니다.
          </p>
          <p class="text-xs leading-relaxed text-[var(--color-text-secondary)]">
            2026.06.10 까지 내용을 보강하고 있는 중이에요.
          </p>
        </div>
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.construction-enter-active,
.construction-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}
.construction-enter-from,
.construction-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
