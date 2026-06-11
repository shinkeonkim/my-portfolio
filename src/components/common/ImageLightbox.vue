<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-vue-next'
import { getSmoothScroll } from '@/composables/useSmoothScroll'

const props = defineProps<{
  open: boolean
  images: readonly string[]
  index: number
  alt?: string
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:index', value: number): void
}>()

const fit = ref<'contain' | 'cover'>('contain')

const total = computed(() => props.images.length)
const currentSrc = computed(() => props.images[props.index] ?? '')
const hasPrev = computed(() => props.index > 0)
const hasNext = computed(() => props.index < total.value - 1)

function close() {
  emit('update:open', false)
}

function prev() {
  if (hasPrev.value) emit('update:index', props.index - 1)
}

function next() {
  if (hasNext.value) emit('update:index', props.index + 1)
}

function toggleFit() {
  fit.value = fit.value === 'contain' ? 'cover' : 'contain'
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'f' || e.key === 'F') toggleFit()
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      document.body.style.overflow = 'hidden'
      getSmoothScroll()?.stop()
      window.addEventListener('keydown', handleKeydown)
    } else {
      document.body.style.overflow = ''
      getSmoothScroll()?.start()
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  getSmoothScroll()?.start()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        @click.self="close"
      >
        <button
          type="button"
          class="absolute top-4 right-4 z-10 inline-flex items-center justify-center rounded-full bg-white/10 p-2.5 text-white/90 transition hover:bg-white/20 hover:text-white"
          aria-label="닫기"
          @click="close"
        >
          <X :size="22" />
        </button>

        <button
          type="button"
          class="absolute top-4 right-16 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 font-mono text-xs text-white/90 transition hover:bg-white/20 hover:text-white"
          :title="fit === 'contain' ? '폭에 맞춰 전체 보기 (F)' : '전체 화면에 맞추기 (F)'"
          @click="toggleFit"
        >
          <component :is="fit === 'contain' ? Maximize2 : Minimize2" :size="14" />
          <span>{{ fit === 'contain' ? '전체 보기' : '맞춤' }}</span>
        </button>

        <button
          v-if="hasPrev"
          type="button"
          class="absolute top-1/2 left-3 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white/90 transition hover:bg-white/20 hover:text-white md:left-6"
          aria-label="이전 이미지"
          @click="prev"
        >
          <ChevronLeft :size="24" />
        </button>

        <button
          v-if="hasNext"
          type="button"
          class="absolute top-1/2 right-3 z-10 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white/90 transition hover:bg-white/20 hover:text-white md:right-6"
          aria-label="다음 이미지"
          @click="next"
        >
          <ChevronRight :size="24" />
        </button>

        <div
          v-if="total > 1"
          class="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/80"
        >
          {{ index + 1 }} / {{ total }}
        </div>

        <div
          class="flex max-h-[92vh] w-full max-w-[92vw] items-start justify-center"
          :class="fit === 'contain' ? 'overflow-hidden' : 'overflow-auto'"
          @click.self="close"
        >
          <img
            :key="currentSrc"
            :src="currentSrc"
            :alt="alt ?? '이미지'"
            class="block rounded-md"
            :class="
              fit === 'contain'
                ? 'max-h-[92vh] max-w-[92vw] object-contain'
                : 'h-auto w-full max-w-[92vw]'
            "
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 200ms ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
