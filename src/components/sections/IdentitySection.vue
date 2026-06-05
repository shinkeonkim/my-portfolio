<script setup lang="ts">
import { computed } from 'vue'
import { Zap, Compass, Scale, Hammer, type LucideIcon } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import Card from '@/components/common/Card.vue'
import { identityValues } from '@/data'

const iconMap: Record<string, LucideIcon> = { Zap, Compass, Scale, Hammer }

const items = computed(() =>
  identityValues.map((value) => ({
    ...value,
    icon: iconMap[value.iconName] ?? Zap,
    // allow newline characters or <br /> in descriptions
    descriptionHtml: String(value.description).replace(/\n/g, '<br/>'),
  })),
)
</script>

<template>
  <section id="about" class="container-page py-24">
    <SectionTitle
      eyebrow="About"
      title="저는 이런 사람입니다"
      description="네 가지 신념이 제 일하는 방식을 만듭니다."
    />
    <div class="mt-12 grid gap-5 sm:grid-cols-2">
      <Card v-for="(item, idx) in items" :key="item.headline" class="space-y-3">
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-overlay)] text-[var(--color-accent)]"
          >
            <component :is="item.icon" :size="20" />
          </span>
          <span class="font-mono text-xs text-[var(--color-text-muted)]">0{{ idx + 1 }}</span>
        </div>
        <h3 class="text-lg font-semibold text-[var(--color-text-primary)]">{{ item.headline }}</h3>
        <p class="text-sm leading-relaxed text-[var(--color-text-secondary)]" v-html="item.descriptionHtml" />
      </Card>
    </div>
  </section>
</template>
