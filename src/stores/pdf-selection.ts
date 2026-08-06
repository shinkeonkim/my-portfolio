import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type {
  PdfProfileField,
  PdfProjectField,
  PdfSectionId,
  PdfSelectionState,
} from '@/types'
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
  DEFAULT_PROFILE_FIELDS,
  DEFAULT_PROJECT_FIELDS,
  PDF_SELECTION_STORAGE_KEY_V2,
  createInitialState,
  loadFromStorage,
} from './pdf-selection-persistence'
export {
  PDF_SELECTION_STORAGE_KEY_V1,
  PDF_SELECTION_STORAGE_KEY_V2,
  migratePdfSelectionState,
} from './pdf-selection-persistence'

export function awardKey(a: { title: string; date: string }): string {
  return `${a.date}::${a.title}`
}

export function experienceKey(e: { company: string }): string {
  return e.company
}

export function educationKey(e: { school: string }): string {
  return e.school
}

export function contactKey(c: { href: string }): string {
  return c.href
}

export const usePdfSelectionStore = defineStore('pdf-selection', () => {
  const state = ref<PdfSelectionState>(loadFromStorage())

  watch(
    state,
    (val) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PDF_SELECTION_STORAGE_KEY_V2, JSON.stringify(val))
      }
    },
    { deep: true, immediate: true },
  )

  function isItemIncluded(map: Record<string, boolean>, key: string): boolean {
    return !map[key]
  }

  const includedProjects = computed(() =>
    projects.filter((p) => isItemIncluded(state.value.excludedProjectSlugs, p.slug)),
  )
  const includedAiExperiments = computed(() =>
    aiExperiments.filter((a) => isItemIncluded(state.value.excludedAiSlugs, a.slug)),
  )
  const includedToyProjects = computed(() =>
    toyProjects.filter((t) => isItemIncluded(state.value.excludedToyCategories, t.category)),
  )
  const includedActivities = computed(() =>
    activities.filter((a) => isItemIncluded(state.value.excludedActivitySlugs, a.slug)),
  )
  const includedAwards = computed(() =>
    awards.filter((a) => isItemIncluded(state.value.excludedAwardKeys, awardKey(a))),
  )
  const includedCertifications = computed(() =>
    certifications.filter((c) =>
      isItemIncluded(state.value.excludedCertificationKeys, awardKey(c)),
    ),
  )
  const includedEducations = computed(() =>
    educations.filter((e) => isItemIncluded(state.value.excludedEducationKeys, educationKey(e))),
  )
  const includedExperiences = computed(() =>
    experiences.filter((e) =>
      isItemIncluded(state.value.excludedExperienceKeys, experienceKey(e)),
    ),
  )
  const includedContacts = computed(() =>
    contactLinks.filter((c) => isItemIncluded(state.value.excludedContacts, contactKey(c))),
  )

  function toggleSection(id: PdfSectionId) {
    state.value.sections[id] = !state.value.sections[id]
  }
  function setSection(id: PdfSectionId, value: boolean) {
    state.value.sections[id] = value
  }
  function toggleProfileField(field: PdfProfileField) {
    state.value.profileFields[field] = !state.value.profileFields[field]
  }
  function toggleExcluded(map: Record<string, boolean>, key: string) {
    if (map[key]) delete map[key]
    else map[key] = true
  }
  function toggleProjectSlug(slug: string) {
    toggleExcluded(state.value.excludedProjectSlugs, slug)
  }
  function toggleAiSlug(slug: string) {
    toggleExcluded(state.value.excludedAiSlugs, slug)
  }
  function toggleToyCategory(category: string) {
    toggleExcluded(state.value.excludedToyCategories, category)
  }
  function toggleActivitySlug(slug: string) {
    toggleExcluded(state.value.excludedActivitySlugs, slug)
  }
  function toggleAwardKey(key: string) {
    toggleExcluded(state.value.excludedAwardKeys, key)
  }
  function toggleCertificationKey(key: string) {
    toggleExcluded(state.value.excludedCertificationKeys, key)
  }
  function toggleEducationKey(key: string) {
    toggleExcluded(state.value.excludedEducationKeys, key)
  }
  function toggleExperienceKey(key: string) {
    toggleExcluded(state.value.excludedExperienceKeys, key)
  }
  function toggleContactKey(key: string) {
    toggleExcluded(state.value.excludedContacts, key)
  }
  function toggleProjectField(slug: string, field: PdfProjectField) {
    if (!state.value.projectFields[slug]) {
      state.value.projectFields[slug] = { ...DEFAULT_PROJECT_FIELDS }
    }
    state.value.projectFields[slug][field] = !state.value.projectFields[slug][field]
  }
  function getProjectField(slug: string, field: PdfProjectField): boolean {
    return state.value.projectFields[slug]?.[field] ?? DEFAULT_PROJECT_FIELDS[field]
  }

  function moveSection(id: PdfSectionId, direction: -1 | 1) {
    const order = state.value.sectionOrder
    const idx = order.indexOf(id)
    if (idx < 0) return
    const newIdx = idx + direction
    if (newIdx < 0 || newIdx >= order.length) return
    const next = [...order]
    const [removed] = next.splice(idx, 1)
    if (removed) next.splice(newIdx, 0, removed)
    state.value.sectionOrder = next
  }

  function resetAll() {
    state.value = createInitialState()
  }
  function selectAll() {
    const allSections = createInitialState().sections
    state.value.sections = Object.fromEntries(
      Object.keys(allSections).map((k) => [k, true]),
    ) as Record<PdfSectionId, boolean>
    state.value.profileFields = { ...DEFAULT_PROFILE_FIELDS }
    state.value.excludedContacts = {}
    state.value.excludedProjectSlugs = {}
    state.value.excludedAiSlugs = {}
    state.value.excludedToyCategories = {}
    state.value.excludedActivitySlugs = {}
    state.value.excludedAwardKeys = {}
    state.value.excludedCertificationKeys = {}
    state.value.excludedEducationKeys = {}
    state.value.excludedExperienceKeys = {}
    for (const slug of Object.keys(state.value.projectFields)) {
      state.value.projectFields[slug] = { ...DEFAULT_PROJECT_FIELDS }
    }
  }
  function deselectAll() {
    state.value.sections = Object.fromEntries(
      Object.keys(state.value.sections).map((k) => [k, false]),
    ) as Record<PdfSectionId, boolean>
  }

  return {
    state,
    includedProjects,
    includedAiExperiments,
    includedToyProjects,
    includedActivities,
    includedAwards,
    includedCertifications,
    includedEducations,
    includedExperiences,
    includedContacts,
    toggleSection,
    setSection,
    toggleProfileField,
    toggleProjectSlug,
    toggleAiSlug,
    toggleToyCategory,
    toggleActivitySlug,
    toggleAwardKey,
    toggleCertificationKey,
    toggleEducationKey,
    toggleExperienceKey,
    toggleContactKey,
    toggleProjectField,
    getProjectField,
    moveSection,
    resetAll,
    selectAll,
    deselectAll,
  }
})
