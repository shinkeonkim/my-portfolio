<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'

useHead({ title: '404: 페이지를 찾을 수 없습니다' })
</script>

<template>
  <section class="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
      404 · Not Found
    </p>
    <h1 class="text-3xl font-semibold text-[var(--color-text-primary)] md:text-4xl">
      페이지를 찾을 수 없습니다
    </h1>
    <p class="max-w-md text-sm text-[var(--color-text-secondary)]">
      입력하신 주소가 올바른지 다시 한 번 확인해 주세요.
    </p>
    <RouterLink
      to="/"
      class="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg-base)] transition hover:bg-[var(--color-accent-hover)]"
    >
      홈으로 돌아가기
    </RouterLink>
  </section>
</template>
