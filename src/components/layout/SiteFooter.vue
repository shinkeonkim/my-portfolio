<script setup lang="ts">
import { contactLinks } from '@/data'
import { profile } from '@/data'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-24 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]">
    <div class="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div class="space-y-2">
        <p class="font-mono text-sm text-[var(--color-text-secondary)]">
          <span class="text-[var(--color-accent)]">$</span> echo "Hello World! to Goodbye World!"
        </p>
        <p class="text-sm text-[var(--color-text-muted)]">
          © {{ year }} {{ profile.name }} · {{ profile.alias }} {{ profile.nameRoman }}. All rights reserved.
        </p>
      </div>
      <ul class="flex flex-wrap gap-4">
        <li v-for="link in contactLinks" :key="link.label">
          <a
            :href="link.href"
            target="_blank"
            rel="noreferrer noopener"
            class="text-xs text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
          >
            {{ link.label }} ↗
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
