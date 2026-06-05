<script setup lang="ts">
import { computed } from 'vue'
import { Mail, Github, Linkedin, Globe, type LucideIcon } from 'lucide-vue-next'
import SectionTitle from '@/components/common/SectionTitle.vue'
import { contactLinks } from '@/data'
import type { ContactChannel } from '@/types'

const iconMap: Record<ContactChannel, LucideIcon> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  blog: Globe,
  instagram: Globe,
  other: Globe,
}

const items = computed(() =>
  contactLinks.map((link) => ({ ...link, icon: iconMap[link.channel] ?? Globe })),
)
</script>

<template>
  <section id="contact" class="container-page py-24">
    <SectionTitle
      eyebrow="Contact"
      title="이야기를 시작해요"
      description="새로운 도전, 사이드 프로젝트, 기술 이야기 — 무엇이든 환영합니다."
    />

    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        v-for="item in items"
        :key="`${item.channel}-${item.value}`"
        :href="item.href"
        target="_blank"
        rel="noreferrer noopener"
        class="surface-card surface-card-hover flex items-center gap-4 p-5"
      >
        <span
          class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-overlay)] text-[var(--color-accent)]"
        >
          <component :is="item.icon" :size="20" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            {{ item.label }}
          </p>
          <p class="truncate text-sm font-medium text-[var(--color-text-primary)]">
            {{ item.value }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>
