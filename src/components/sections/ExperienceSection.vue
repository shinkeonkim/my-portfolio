<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Tag from '@/components/common/Tag.vue'
import { experiences } from '@/data'

function formatPeriod(period: { start: string; end: string | null }): string {
  return period.end ? `${period.start} → ${period.end}` : `${period.start} → 현재`
}
</script>

<template>
  <section id="experience" class="container-page py-24">
    <SectionTitle
      eyebrow="Experience"
      title="Work History"
      description="그렙(프로그래머스)에서 채용서비스 · 교육솔루션 · 알고리즘 컨텐츠 전 영역을 거쳤습니다."
    />

    <div class="mt-12 space-y-12">
      <article
        v-for="exp in experiences"
        :key="exp.company"
        class="border-l border-[var(--color-border-subtle)] pl-6 md:pl-8"
      >
        <header class="space-y-1">
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)]">{{ exp.company }}</h3>
          <p class="font-mono text-xs text-[var(--color-text-muted)]">
            {{ exp.totalPeriod }}<span v-if="exp.developerPeriod"> · {{ exp.developerPeriod }}</span>
          </p>
        </header>

        <ol class="mt-6 space-y-8">
          <li v-for="role in exp.roles" :key="`${exp.company}-${role.position}-${role.period.start}`">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-base font-semibold text-[var(--color-text-primary)]">
                {{ role.team }}
              </span>
              <span class="text-sm text-[var(--color-text-secondary)]">{{ role.position }}</span>
              <span class="font-mono text-xs text-[var(--color-text-muted)]">
                {{ formatPeriod(role.period) }}
              </span>
            </div>
            <div v-if="role.stack.length" class="mt-2 flex flex-wrap gap-1.5">
              <Tag v-for="tech in role.stack" :key="tech" :label="tech" />
            </div>
            <ul class="mt-4 space-y-2">
              <li
                v-for="(d, di) in role.details"
                :key="di"
                class="text-base leading-relaxed text-[var(--color-text-secondary)]"
              >
                <details class="group">
                  <summary
                    class="-mx-2 flex cursor-pointer list-none items-start gap-2.5 rounded-md px-2 py-2 transition hover:bg-[var(--color-bg-overlay)]"
                  >
                    <ChevronRight
                      :size="16"
                      class="mt-1 shrink-0 text-[var(--color-accent)] transition-transform duration-200 group-open:rotate-90"
                    />
                    <span class="flex flex-1 flex-wrap items-baseline gap-x-2">
                      <span
                        class="text-base font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                      >
                        {{ d.title }}
                      </span>
                      <span
                        v-if="d.period"
                        class="font-mono text-xs text-[var(--color-text-muted)]"
                      >
                        · {{ d.period }}
                      </span>
                      <span
                        class="ml-auto font-mono text-xs text-[var(--color-text-muted)] opacity-0 transition group-hover:opacity-100 group-open:opacity-0"
                      >
                        펼치기
                      </span>
                    </span>
                  </summary>
                  <div class="mt-3 mb-4 ml-6 space-y-3 border-l border-[var(--color-border-subtle)] pl-5">
                    <div
                      v-if="d.images?.length"
                      class="grid gap-2"
                      :class="d.images.length > 1 ? 'sm:grid-cols-2' : ''"
                    >
                      <a
                        v-for="(img, ii) in d.images"
                        :key="ii"
                        :href="img"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="block overflow-hidden rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-overlay)]"
                      >
                        <img
                          :src="img"
                          :alt="`${d.title} 화면 ${ii + 1}`"
                          class="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <ul class="space-y-2">
                      <li
                        v-for="(b, bi) in d.bullets"
                        :key="bi"
                        class="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                      >
                        <span
                          class="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]"
                        />
                        <span>{{ b }}</span>
                      </li>
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
          </li>
        </ol>
      </article>
    </div>
  </section>
</template>
