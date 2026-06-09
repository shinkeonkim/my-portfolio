<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'

useHead({
  title: '프로젝트 / 김신건',
  meta: [
    {
      name: 'description',
      content: '기획부터 운영까지 직접 만든 프로젝트 모음: Mefit, 깜빡이, Athena, PeacePiece, TTL 등.',
    },
  ],
})
</script>

<template>
  <div class="pt-12">
    <ProjectsSection />
  </div>
</template>
