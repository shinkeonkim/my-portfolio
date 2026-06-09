<script setup lang="ts">
import type { PdfProfileField } from '@/types'
import type { Profile } from '@/types'

defineProps<{
  profile: Profile
  fields: Record<PdfProfileField, boolean>
}>()
</script>

<template>
  <section class="pdf-block pdf-profile">
    <div class="pdf-profile-header">
      <h1 v-if="fields.name" class="pdf-profile-name">{{ profile.name }}</h1>
      <div v-if="fields.alias || fields.nameRoman" class="pdf-profile-alias">
        <span v-if="fields.alias">{{ profile.alias }}</span>
        <span v-if="fields.alias && fields.nameRoman"> · </span>
        <span v-if="fields.nameRoman">{{ profile.nameRoman }}</span>
      </div>
      <p v-if="fields.title" class="pdf-profile-title">{{ profile.title }}</p>
      <p v-if="fields.tagline" class="pdf-profile-tagline">{{ profile.tagline }}</p>
    </div>
    <div v-if="fields.location || fields.yearsOfExperience" class="pdf-profile-meta">
      <span v-if="fields.location">{{ profile.location }}</span>
      <span v-if="fields.location && fields.yearsOfExperience"> · </span>
      <span v-if="fields.yearsOfExperience">{{ profile.yearsOfExperience }}년차</span>
    </div>
    <ul v-if="fields.summary && profile.summary.length" class="pdf-profile-summary">
      <li v-for="(s, i) in profile.summary" :key="i">{{ s }}</li>
    </ul>
  </section>
</template>

<style scoped>
.pdf-profile {
  border-bottom: 0.75pt solid #cbd5e1;
  padding-bottom: 10pt;
  margin-bottom: 10pt;
}
.pdf-profile-header {
  margin-bottom: 4pt;
}
.pdf-profile-name {
  font-size: 22pt;
  font-weight: 800;
  margin: 0 0 2pt 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.pdf-profile-alias {
  font-size: 9.5pt;
  color: #64748b;
  letter-spacing: 0.08em;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
.pdf-profile-title {
  font-size: 12pt;
  color: #0f172a;
  font-weight: 600;
  margin: 4pt 0 2pt 0;
}
.pdf-profile-tagline {
  font-size: 10.5pt;
  color: #475569;
  font-style: italic;
  margin: 0;
}
.pdf-profile-meta {
  font-size: 9.5pt;
  color: #64748b;
  margin: 4pt 0 6pt 0;
}
.pdf-profile-summary {
  list-style: disc;
  padding-left: 14pt;
  font-size: 10pt;
  color: #1f2937;
}
.pdf-profile-summary li {
  margin: 2pt 0;
}
</style>
