<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Experiments', hash: '#experiments' },
  { label: 'Toys', hash: '#toys' },
  { label: 'Community', hash: '#activities' },
  { label: 'Contact', hash: '#contact' },
] as const

function close() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/85 backdrop-blur-md"
  >
    <div class="container-page flex h-16 items-center justify-between">
      <RouterLink
        to="/"
        class="font-mono text-sm font-semibold tracking-tight text-[var(--color-text-primary)]"
        @click="close"
      >
        <span class="text-[var(--color-accent)]">$</span> koa
        <span class="text-[var(--color-text-muted)]">/portfolio</span>
      </RouterLink>

      <nav class="hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="`/${item.hash}`"
          class="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
          :class="{ 'text-[var(--color-accent)]': route.hash === item.hash }"
        >
          {{ item.label }}
        </RouterLink>
        <ThemeToggle />
      </nav>

      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
          :aria-label="mobileOpen ? '메뉴 닫기' : '메뉴 열기'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="18" />
          <Menu v-else :size="18" />
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] md:hidden"
    >
      <nav class="container-page flex flex-col py-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="`/${item.hash}`"
          class="py-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
          @click="close"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
