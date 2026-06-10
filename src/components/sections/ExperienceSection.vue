<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, Calendar, Layers, ZoomIn } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import ImageLightbox from '@/components/common/ImageLightbox.vue'
import { experiences } from '@/data'

function formatPeriod(period: { start: string; end: string | null }): string {
  return period.end ? `${period.start} → ${period.end}` : `${period.start} → 현재`
}

const lightboxOpen = ref(false)
const lightboxImages = ref<readonly string[]>([])
const lightboxIndex = ref(0)
const lightboxAlt = ref('')

function openLightbox(images: readonly string[], index: number, alt: string) {
  lightboxImages.value = images
  lightboxIndex.value = index
  lightboxAlt.value = alt
  lightboxOpen.value = true
}
</script>

<template>
  <section id="experience" class="container-page py-24">
    <SectionTitle
      eyebrow="Experience"
      title="Work History"
      description="그렙(프로그래머스)에서 채용서비스 · 교육솔루션 · 알고리즘 컨텐츠 전 영역을 거쳤습니다."
    />

    <div class="mt-12 space-y-16">
      <article
        v-for="exp in experiences"
        :key="exp.company"
        class="border-l border-[var(--color-border-subtle)] pl-6 md:pl-8"
      >
        <header class="space-y-1">
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)]">{{ exp.company }}</h3>
          <p class="font-mono text-xs text-[var(--color-text-muted)]">
            {{ exp.totalPeriod
            }}<span v-if="exp.developerPeriod"> · {{ exp.developerPeriod }}</span>
          </p>
        </header>

        <ol class="mt-8 space-y-10">
          <li
            v-for="role in exp.roles"
            :key="`${exp.company}-${role.position}-${role.period.start}`"
            class="relative"
          >
            <div
              class="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-b border-[var(--color-border-subtle)] pb-3"
            >
              <span class="text-base font-semibold text-[var(--color-text-primary)]">
                {{ role.team }}
              </span>
              <span class="text-sm text-[var(--color-text-secondary)]">{{ role.position }}</span>
              <span
                class="ml-auto flex items-center gap-1 font-mono text-xs text-[var(--color-text-muted)]"
              >
                <Calendar :size="12" />
                {{ formatPeriod(role.period) }}
              </span>
            </div>

            <div v-if="role.stack.length" class="mt-3 flex flex-wrap items-center gap-1.5">
              <Layers :size="12" class="text-[var(--color-text-muted)]" />
              <Tag v-for="tech in role.stack" :key="tech" :label="tech" />
            </div>

            <ul class="mt-5 space-y-2.5">
              <li v-for="(d, di) in role.details" :key="di">
                <details
                  class="group rounded-lg border border-transparent transition-colors open:border-[var(--color-border-subtle)] open:bg-[var(--color-bg-overlay)] hover:border-[var(--color-border-subtle)]"
                >
                  <summary
                    class="flex cursor-pointer list-none items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-[var(--color-bg-overlay)] group-open:hover:bg-transparent"
                  >
                    <ChevronRight
                      :size="16"
                      class="mt-1 shrink-0 text-[var(--color-accent)] transition-transform duration-200 group-open:rotate-90"
                    />
                    <div class="flex flex-1 flex-col gap-1">
                      <span
                        class="text-base font-medium leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] group-open:text-[var(--color-accent)]"
                      >
                        {{ d.title }}
                      </span>
                      <span
                        v-if="d.period"
                        class="flex items-center gap-1 font-mono text-xs text-[var(--color-text-muted)]"
                      >
                        <Calendar :size="11" />
                        {{ d.period }}
                      </span>
                    </div>
                    <span
                      class="mt-1 hidden shrink-0 font-mono text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase opacity-60 transition group-hover:opacity-100 group-open:hidden md:inline"
                    >
                      펼치기
                    </span>
                  </summary>

                  <div class="border-t border-[var(--color-border-subtle)] px-3 pt-4 pb-5">
                    <ul class="space-y-2.5">
                      <li
                        v-for="(b, bi) in d.bullets"
                        :key="bi"
                        class="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                      >
                        <span
                          class="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)] opacity-80"
                        />
                        <span>{{ b }}</span>
                      </li>
                    </ul>
                    <div
                      v-if="d.images?.length"
                      class="mt-5 grid gap-2"
                      :class="d.images.length > 1 ? 'sm:grid-cols-2' : ''"
                    >
                      <button
                        v-for="(img, ii) in d.images"
                        :key="ii"
                        type="button"
                        class="group/img relative block w-full cursor-zoom-in overflow-hidden rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] text-left transition-colors hover:border-[var(--color-accent)]"
                        :class="d.images.length > 1 ? 'max-h-[320px]' : 'max-h-[400px]'"
                        :aria-label="`${d.title} 이미지 ${ii + 1} 확대`"
                        @click="openLightbox(d.images!, ii, d.title)"
                      >
                        <img
                          :src="img"
                          :alt="`${d.title} 화면 ${ii + 1}`"
                          class="w-full object-cover object-top transition-transform duration-300 group-hover/img:scale-105"
                          :class="d.images.length > 1 ? 'max-h-[320px]' : 'max-h-[400px]'"
                          loading="lazy"
                        />
                        <span
                          class="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-2.5 opacity-0 transition group-hover/img:opacity-100"
                        >
                          <span
                            class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm"
                          >
                            <ZoomIn :size="12" />
                            클릭하여 확대
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </details>
              </li>
            </ul>
          </li>
        </ol>
      </article>
    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      v-model:index="lightboxIndex"
      :images="lightboxImages"
      :alt="lightboxAlt"
    />
  </section>
</template>
