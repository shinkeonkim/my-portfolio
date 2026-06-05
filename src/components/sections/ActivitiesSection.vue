<script setup lang="ts">
import { ref } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Card from '@/components/common/Card.vue'
import Tag from '@/components/common/Tag.vue'
import ActivityDetailModal from '@/components/common/ActivityDetailModal.vue'
import { activities } from '@/data'
import type { Activity, ActivityCategory } from '@/types'

const categoryLabel: Record<ActivityCategory, string> = {
  club: '동아리',
  helper: '학부 헬퍼',
  teaching: '강사 / 교육 봉사',
  community: '커뮤니티',
}

const selected = ref<Activity | null>(null)

function formatPeriod(p: { start: string; end: string | null }) {
  return p.end ? `${p.start} → ${p.end}` : `${p.start} → 현재`
}

function open(activity: Activity) {
  selected.value = activity
}

function close() {
  selected.value = null
}
</script>

<template>
  <section id="activities" class="container-page py-24">
    <SectionTitle
      eyebrow="Community & Teaching"
      title="함께 자라고, 함께 가르치며"
      description="동아리 운영진 · 강사 · 학부 헬퍼로서 100명 이상의 신입 부원·학생과 함께 자라며 정리한 활동과 자료들."
    />

    <div class="mt-12 grid gap-5 md:grid-cols-2">
      <Card v-for="activity in activities" :key="activity.slug">
        <div class="flex items-center justify-between gap-3">
          <span class="font-mono text-xs text-[var(--color-text-muted)]">
            {{ formatPeriod(activity.period) }}
          </span>
          <div class="flex items-center gap-1.5">
            <Tag v-if="activity.role" :label="activity.role" variant="accent" />
            <Tag :label="categoryLabel[activity.category]" />
          </div>
        </div>
        <h3 class="mt-3 text-base font-semibold text-[var(--color-text-primary)]">
          {{ activity.title }}
        </h3>
        <p class="mt-1 text-xs text-[var(--color-text-secondary)]">{{ activity.organization }}</p>
        <ul class="mt-3 space-y-1.5">
          <li
            v-for="(highlight, i) in activity.highlights"
            :key="i"
            class="flex gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
          >
            <span
              class="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
            />
            <span>{{ highlight }}</span>
          </li>
        </ul>

        <footer
          v-if="
            (activity.materials?.length ?? 0) > 0 ||
            (activity.details?.length ?? 0) > 0 ||
            (activity.timeline?.length ?? 0) > 0
          "
          class="mt-4 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-3"
        >
          <span class="flex items-center gap-3 font-mono text-[10px] text-[var(--color-text-muted)]">
            <span v-if="activity.timeline?.length">{{ activity.timeline.length }}개 기수</span>
            <span v-if="activity.materials?.length">{{ activity.materials.length }}개 자료</span>
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-subtle)] px-3 py-1 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            @click="open(activity)"
          >
            자세히 보기 →
          </button>
        </footer>
      </Card>
    </div>

    <ActivityDetailModal :activity="selected" @close="close" />
  </section>
</template>
