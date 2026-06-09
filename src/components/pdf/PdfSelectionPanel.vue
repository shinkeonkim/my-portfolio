<script setup lang="ts">
import { computed } from 'vue'
import {
  activities,
  aiExperiments,
  awards,
  certifications,
  contactLinks,
  educations,
  experiences,
  projects,
  toyProjects,
} from '@/data'
import {
  awardKey,
  contactKey,
  educationKey,
  experienceKey,
  usePdfSelectionStore,
} from '@/stores/pdf-selection'
import type { PdfProjectField, PdfSectionId } from '@/types'
import { VueDraggable } from 'vue-draggable-plus'
import PdfPanelSection from './PdfPanelSection.vue'

const store = usePdfSelectionStore()

const SECTION_LABELS: Record<PdfSectionId, string> = {
  profile: '프로필',
  identity: 'Identity (일하는 방식)',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  aiExperiments: 'AI Experiments',
  toyProjects: 'Toy Projects',
  activities: 'Activities',
  awards: 'Awards',
  certifications: 'Certifications',
  education: 'Education',
  contact: 'Contact',
}

const PROFILE_FIELD_LABELS: Record<string, string> = {
  name: '이름',
  alias: '별명 (KOA)',
  nameRoman: '영문 이름',
  title: '직함',
  tagline: '한 줄 소개',
  summary: '요약',
  location: '거주지',
  yearsOfExperience: '연차',
}

const PROJECT_FIELD_LABELS: Record<PdfProjectField, string> = {
  description: '개요',
  features: '주요 기능',
  challenges: '고민과 해결',
  challengeDetail: '상세 (대안 / 결정 / 구현 / 배운 점)',
  contributions: '기여한 것',
  links: '링크',
  media: '미디어',
}

const PROJECT_FIELDS = Object.keys(PROJECT_FIELD_LABELS) as PdfProjectField[]

const toyCategories = computed(() => {
  const set = new Set<string>()
  for (const t of toyProjects) set.add(t.category)
  return Array.from(set)
})

function isIncluded(map: Record<string, boolean>, key: string): boolean {
  return !map[key]
}
</script>

<template>
  <aside class="pdf-panel">
    <header class="pdf-panel-header">
      <h2>포함할 항목 · 순서</h2>
      <div class="pdf-panel-header-actions">
        <button type="button" @click="store.selectAll">전체 선택</button>
        <button type="button" @click="store.deselectAll">전체 해제</button>
        <button type="button" @click="store.resetAll">초기화</button>
      </div>
    </header>

    <p class="pdf-panel-hint">
      <span class="pdf-panel-hint-icon">⠿</span>
      손잡이를 잡고 끌어 순서를 바꾸고, 체크박스로 포함 여부를 선택합니다.
    </p>

    <VueDraggable
      v-model="store.state.sectionOrder"
      handle=".pdf-panel-drag-handle"
      :animation="180"
      ghost-class="pdf-panel-ghost"
      chosen-class="pdf-panel-chosen"
      drag-class="pdf-panel-dragging"
    >
      <PdfPanelSection
        v-for="id in store.state.sectionOrder"
        :key="id"
        :title="SECTION_LABELS[id]"
        :checked="store.state.sections[id]"
        @toggle="store.toggleSection(id)"
      >
        <div v-if="id === 'profile'" class="pdf-panel-children">
          <label v-for="(label, field) in PROFILE_FIELD_LABELS" :key="field">
            <input
              type="checkbox"
              :checked="store.state.profileFields[field as keyof typeof store.state.profileFields]"
              @change="store.toggleProfileField(field as keyof typeof store.state.profileFields)"
            />
            {{ label }}
          </label>
        </div>

        <div v-else-if="id === 'experience'" class="pdf-panel-children">
          <label v-for="e in experiences" :key="e.company">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedExperienceKeys, experienceKey(e))"
              @change="store.toggleExperienceKey(experienceKey(e))"
            />
            {{ e.company }}
          </label>
        </div>

        <div v-else-if="id === 'projects'" class="pdf-panel-children">
          <details v-for="p in projects" :key="p.slug" class="pdf-panel-project">
            <summary>
              <input
                type="checkbox"
                :checked="isIncluded(store.state.excludedProjectSlugs, p.slug)"
                @change="store.toggleProjectSlug(p.slug)"
                @click.stop
              />
              {{ p.displayName ?? p.name }}
            </summary>
            <div
              v-if="isIncluded(store.state.excludedProjectSlugs, p.slug)"
              class="pdf-panel-children pdf-panel-nested"
            >
              <label v-for="field in PROJECT_FIELDS" :key="field">
                <input
                  type="checkbox"
                  :checked="store.getProjectField(p.slug, field)"
                  @change="store.toggleProjectField(p.slug, field)"
                />
                {{ PROJECT_FIELD_LABELS[field] }}
              </label>
            </div>
          </details>
        </div>

        <div v-else-if="id === 'aiExperiments'" class="pdf-panel-children">
          <label v-for="a in aiExperiments" :key="a.slug">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedAiSlugs, a.slug)"
              @change="store.toggleAiSlug(a.slug)"
            />
            {{ a.emoji }} {{ a.title }}
          </label>
        </div>

        <div v-else-if="id === 'toyProjects'" class="pdf-panel-children">
          <label v-for="cat in toyCategories" :key="cat">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedToyCategories, cat)"
              @change="store.toggleToyCategory(cat)"
            />
            {{ cat }}
          </label>
        </div>

        <div v-else-if="id === 'activities'" class="pdf-panel-children">
          <label v-for="a in activities" :key="a.slug">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedActivitySlugs, a.slug)"
              @change="store.toggleActivitySlug(a.slug)"
            />
            {{ a.title }}
          </label>
        </div>

        <div v-else-if="id === 'awards'" class="pdf-panel-children">
          <label v-for="(a, i) in awards" :key="i">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedAwardKeys, awardKey(a))"
              @change="store.toggleAwardKey(awardKey(a))"
            />
            {{ a.title }} ({{ a.date }})
          </label>
        </div>

        <div v-else-if="id === 'certifications'" class="pdf-panel-children">
          <label v-for="(c, i) in certifications" :key="i">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedCertificationKeys, awardKey(c))"
              @change="store.toggleCertificationKey(awardKey(c))"
            />
            {{ c.title }}
          </label>
        </div>

        <div v-else-if="id === 'education'" class="pdf-panel-children">
          <label v-for="e in educations" :key="e.school">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedEducationKeys, educationKey(e))"
              @change="store.toggleEducationKey(educationKey(e))"
            />
            {{ e.school }}
          </label>
        </div>

        <div v-else-if="id === 'contact'" class="pdf-panel-children">
          <label v-for="c in contactLinks" :key="c.href">
            <input
              type="checkbox"
              :checked="isIncluded(store.state.excludedContacts, contactKey(c))"
              @change="store.toggleContactKey(contactKey(c))"
            />
            {{ c.label }} ({{ c.value }})
          </label>
        </div>
      </PdfPanelSection>
    </VueDraggable>
  </aside>
</template>

<style scoped>
.pdf-panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: 8px;
  padding: 16px;
  font-size: 13px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  position: sticky;
  top: 80px;
}
.pdf-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border-subtle);
}
.pdf-panel-header h2 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary);
}
.pdf-panel-header-actions {
  display: flex;
  gap: 4px;
}
.pdf-panel-header-actions button {
  font-size: 11px;
  padding: 4px 8px;
  border: 1px solid var(--color-border-subtle);
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
}
.pdf-panel-header-actions button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
.pdf-panel-hint {
  margin: 0 0 12px 0;
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}
.pdf-panel-hint-icon {
  font-family: var(--font-mono);
  color: var(--color-accent);
  font-size: 12px;
  line-height: 1.3;
}
:deep(.pdf-panel-ghost) {
  opacity: 0.4;
  border-color: var(--color-accent) !important;
  background: var(--color-accent-muted, rgba(0, 0, 0, 0.04));
}
:deep(.pdf-panel-chosen) {
  border-color: var(--color-accent) !important;
}
:deep(.pdf-panel-dragging) {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transform: rotate(-1deg);
}
.pdf-panel-children {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.pdf-panel-children label {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}
.pdf-panel-children input[type='checkbox'] {
  margin: 0;
  cursor: pointer;
  accent-color: var(--color-accent);
}
.pdf-panel-project {
  margin: 2px 0;
}
.pdf-panel-project > summary {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-primary);
  cursor: pointer;
  list-style: revert;
}
.pdf-panel-nested {
  margin-left: 18px;
  margin-top: 4px;
  font-size: 11px;
}
</style>
