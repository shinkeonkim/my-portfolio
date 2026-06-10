<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HeroLaptop from '@/components/sections/HeroLaptop.vue'
import IdentitySection from '@/components/sections/IdentitySection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AIExperimentsSection from '@/components/sections/AIExperimentsSection.vue'
import ToyProjectsSection from '@/components/sections/ToyProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ActivitiesSection from '@/components/sections/ActivitiesSection.vue'
import AwardsSection from '@/components/sections/AwardsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { profile } from '@/data'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

useHead({
  title: `${profile.name} / ${profile.title}`,
  meta: [
    { name: 'description', content: profile.summary[0] ?? profile.tagline },
    { property: 'og:title', content: `${profile.name} / ${profile.title}` },
    { property: 'og:description', content: profile.summary[0] ?? profile.tagline },
    { property: 'og:type', content: 'profile' },
  ],
})
</script>

<template>
  <div>
    <HeroLaptop />
    <div data-reveal><IdentitySection /></div>
    <div data-reveal><SkillsSection /></div>
    <div data-reveal><ExperienceSection /></div>
    <div data-reveal><ProjectsSection /></div>
    <div data-reveal><AIExperimentsSection /></div>
    <div data-reveal><ToyProjectsSection /></div>
    <div data-reveal><ActivitiesSection /></div>
    <div data-reveal><AwardsSection /></div>
    <div data-reveal><ContactSection /></div>
  </div>
</template>
