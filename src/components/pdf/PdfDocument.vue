<script setup lang="ts">
import { profile, identityValues, skillsByCategory } from '@/data'
import { usePdfSelectionStore } from '@/stores/pdf-selection'
import PdfProfileBlock from './blocks/PdfProfileBlock.vue'
import PdfIdentityBlock from './blocks/PdfIdentityBlock.vue'
import PdfSkillsBlock from './blocks/PdfSkillsBlock.vue'
import PdfExperienceBlock from './blocks/PdfExperienceBlock.vue'
import PdfProjectsBlock from './blocks/PdfProjectsBlock.vue'
import PdfAiExperimentsBlock from './blocks/PdfAiExperimentsBlock.vue'
import PdfToyProjectsBlock from './blocks/PdfToyProjectsBlock.vue'
import PdfActivitiesBlock from './blocks/PdfActivitiesBlock.vue'
import PdfAwardsBlock from './blocks/PdfAwardsBlock.vue'
import PdfEducationBlock from './blocks/PdfEducationBlock.vue'
import PdfContactBlock from './blocks/PdfContactBlock.vue'

const store = usePdfSelectionStore()
</script>

<template>
  <div id="pdf-document" class="pdf-document">
    <template v-for="id in store.state.sectionOrder" :key="id">
      <PdfProfileBlock
        v-if="id === 'profile' && store.state.sections.profile"
        :profile="profile"
        :fields="store.state.profileFields"
      />
      <PdfIdentityBlock
        v-else-if="id === 'identity' && store.state.sections.identity"
        :items="identityValues"
      />
      <PdfContactBlock
        v-else-if="id === 'contact' && store.state.sections.contact"
        :links="store.includedContacts"
      />
      <PdfSkillsBlock
        v-else-if="id === 'skills' && store.state.sections.skills"
        :groups="skillsByCategory"
      />
      <PdfExperienceBlock
        v-else-if="id === 'experience' && store.state.sections.experience"
        :experiences="store.includedExperiences"
      />
      <PdfEducationBlock
        v-else-if="id === 'education' && store.state.sections.education"
        :educations="store.includedEducations"
      />
      <PdfAwardsBlock
        v-else-if="id === 'certifications' && store.state.sections.certifications"
        :awards="[]"
        :certifications="store.includedCertifications"
      />
      <PdfAwardsBlock
        v-else-if="id === 'awards' && store.state.sections.awards"
        :awards="store.includedAwards"
        :certifications="[]"
      />
      <PdfProjectsBlock
        v-else-if="id === 'projects' && store.state.sections.projects"
        :projects="store.includedProjects"
        :get-field="store.getProjectField"
      />
      <PdfActivitiesBlock
        v-else-if="id === 'activities' && store.state.sections.activities"
        :items="store.includedActivities"
      />
      <PdfAiExperimentsBlock
        v-else-if="id === 'aiExperiments' && store.state.sections.aiExperiments"
        :items="store.includedAiExperiments"
      />
      <PdfToyProjectsBlock
        v-else-if="id === 'toyProjects' && store.state.sections.toyProjects"
        :items="store.includedToyProjects"
      />
    </template>
  </div>
</template>

<style>
.pdf-document {
  background: #ffffff;
  color: #111111;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Apple SD Gothic Neo',
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: 11pt;
  line-height: 1.55;
  padding: 20mm 16mm;
  width: 210mm;
  margin: 0 auto;
  box-sizing: border-box;
}
.pdf-document * {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.pdf-block {
  margin-bottom: 14pt;
}
.pdf-block + .pdf-block {
  margin-top: 4pt;
}
.pdf-block h2 {
  font-size: 14pt;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8pt 0;
  padding-bottom: 4pt;
  border-bottom: 1.5pt solid #0f172a;
  letter-spacing: -0.01em;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-block h3 {
  font-size: 11.5pt;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 3pt 0;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-block h4 {
  font-size: 10.5pt;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 2pt 0;
  break-after: avoid;
  page-break-after: avoid;
}
.pdf-block p {
  margin: 0 0 4pt 0;
  color: #1f2937;
}
.pdf-block ul,
.pdf-block ol {
  margin: 2pt 0 4pt 0;
  padding-left: 16pt;
  color: #1f2937;
}
.pdf-block li {
  margin: 1pt 0;
}
.pdf-block strong {
  color: #0f172a;
  font-weight: 600;
}
.pdf-block code {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  font-size: 0.88em;
  background: #f1f5f9;
  border-radius: 3px;
  padding: 0.5pt 3pt;
}
.pdf-block a {
  color: #0f172a;
  text-decoration: underline;
  text-decoration-color: #94a3b8;
}
.pdf-muted {
  color: #64748b;
  font-size: 9.5pt;
}
.pdf-tag {
  display: inline-block;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  padding: 1pt 6pt;
  font-size: 8.5pt;
  color: #475569;
  margin: 1pt 2pt 1pt 0;
}
.pdf-row {
  display: flex;
  gap: 8pt;
  align-items: baseline;
  flex-wrap: wrap;
}
.pdf-card {
  border: 1px solid #e2e8f0;
  border-radius: 4pt;
  padding: 6pt 8pt;
  margin-bottom: 6pt;
  break-inside: avoid;
  page-break-inside: avoid;
}
.pdf-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6pt 12pt;
}
.pdf-block-break {
  break-before: page;
  page-break-before: always;
}
@page {
  size: A4;
  margin: 18mm 14mm 18mm 14mm;
}
@media print {
  html,
  body {
    background: #ffffff !important;
    margin: 0;
    padding: 0;
  }
  body * {
    visibility: hidden;
  }
  #pdf-document,
  #pdf-document * {
    visibility: visible;
  }
  #pdf-document {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: none;
    padding: 0;
    margin: 0;
  }
  a {
    color: #0f172a !important;
    text-decoration: underline !important;
  }
}
</style>
