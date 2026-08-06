import type {
  PdfProfileField,
  PdfProjectField,
  PdfSectionId,
  PdfSelectionState,
} from '@/types'
import { projects } from '@/data'

export const PDF_SELECTION_STORAGE_KEY_V1 = 'pdf-selection:v1'
export const PDF_SELECTION_STORAGE_KEY_V2 = 'pdf-selection:v2'

export const DEFAULT_SECTION_ORDER: PdfSectionId[] = [
  'profile',
  'contact',
  'identity',
  'skills',
  'experience',
  'education',
  'certifications',
  'awards',
  'projects',
  'activities',
  'aiExperiments',
  'toyProjects',
]

export const DEFAULT_SECTIONS: Record<PdfSectionId, boolean> = {
  profile: true,
  identity: true,
  skills: true,
  experience: true,
  projects: true,
  aiExperiments: false,
  toyProjects: false,
  activities: true,
  awards: true,
  certifications: true,
  education: true,
  contact: true,
}

export const DEFAULT_PROFILE_FIELDS: Record<PdfProfileField, boolean> = {
  name: true,
  alias: true,
  nameRoman: true,
  title: true,
  tagline: true,
  summary: true,
  location: true,
  yearsOfExperience: true,
}

export const DEFAULT_PROJECT_FIELDS: Record<PdfProjectField, boolean> = {
  description: true,
  features: true,
  challenges: true,
  challengeDetail: false,
  contributions: true,
  links: true,
  media: false,
}

const PROJECT_FIELD_IDS = Object.keys(DEFAULT_PROJECT_FIELDS)

export function createInitialState(): PdfSelectionState {
  const projectFields: Record<string, Record<PdfProjectField, boolean>> = {}
  for (const project of projects) {
    projectFields[project.slug] = { ...DEFAULT_PROJECT_FIELDS }
  }
  return {
    sections: { ...DEFAULT_SECTIONS },
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    profileFields: { ...DEFAULT_PROFILE_FIELDS },
    excludedContacts: {},
    excludedProjectSlugs: {},
    excludedAiSlugs: {},
    excludedToyCategories: {},
    excludedActivitySlugs: {},
    excludedAwardKeys: {},
    excludedCertificationKeys: {},
    excludedEducationKeys: {},
    excludedExperienceKeys: {},
    projectFields,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isBooleanRecord(value: unknown): value is Record<string, boolean> {
  return isRecord(value) && Object.values(value).every((entry) => typeof entry === 'boolean')
}

function isPdfSectionId(value: unknown): value is PdfSectionId {
  return typeof value === 'string' && DEFAULT_SECTION_ORDER.some((id) => id === value)
}

function isPdfProjectField(value: string): value is PdfProjectField {
  return PROJECT_FIELD_IDS.some((field) => field === value)
}

type ProjectFieldOverrides = Partial<Record<PdfProjectField, boolean>>

function readProjectFieldOverrides(
  value: unknown,
): Record<string, ProjectFieldOverrides> | undefined {
  if (!isRecord(value)) return undefined
  const result: Record<string, ProjectFieldOverrides> = {}
  for (const [slug, fields] of Object.entries(value)) {
    if (!isRecord(fields)) return undefined
    const overrides: ProjectFieldOverrides = {}
    for (const [field, enabled] of Object.entries(fields)) {
      if (!isPdfProjectField(field)) continue
      if (typeof enabled !== 'boolean') return undefined
      overrides[field] = enabled
    }
    result[slug] = overrides
  }
  return result
}

function isPersistedSelection(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false
  const booleanMapKeys = [
    'sections',
    'profileFields',
    'excludedContacts',
    'excludedProjectSlugs',
    'excludedAiSlugs',
    'excludedToyCategories',
    'excludedActivitySlugs',
    'excludedAwardKeys',
    'excludedCertificationKeys',
    'excludedEducationKeys',
    'excludedExperienceKeys',
  ]
  for (const key of booleanMapKeys) {
    if (key in value && value[key] !== undefined && !isBooleanRecord(value[key])) return false
  }
  if ('sectionOrder' in value && value.sectionOrder !== undefined && !Array.isArray(value.sectionOrder)) {
    return false
  }
  if (
    'projectFields' in value &&
    value.projectFields !== undefined &&
    readProjectFieldOverrides(value.projectFields) === undefined
  ) {
    return false
  }
  return true
}

function mergeBooleanMap<TKey extends string>(
  defaults: Record<TKey, boolean>,
  value: unknown,
): Record<TKey, boolean> {
  const result = { ...defaults }
  if (isBooleanRecord(value)) Object.assign(result, value)
  return result
}

function ensureValidSectionOrder(order: unknown): PdfSectionId[] {
  const seen = new Set<PdfSectionId>()
  const result: PdfSectionId[] = []
  for (const id of Array.isArray(order) ? order : []) {
    if (isPdfSectionId(id) && !seen.has(id)) {
      result.push(id)
      seen.add(id)
    }
  }
  for (const id of DEFAULT_SECTION_ORDER) {
    if (!seen.has(id)) result.push(id)
  }
  return result
}

function mergeSelectionState(
  initial: PdfSelectionState,
  source: Record<string, unknown>,
  forceConciseChallengeDetail: boolean,
): PdfSelectionState {
  const persistedProjectFields = readProjectFieldOverrides(source.projectFields) ?? {}
  const projectFields: Record<string, Record<PdfProjectField, boolean>> = {}
  const slugs = new Set([...Object.keys(initial.projectFields), ...Object.keys(persistedProjectFields)])
  for (const slug of slugs) {
    projectFields[slug] = {
      ...DEFAULT_PROJECT_FIELDS,
      ...(persistedProjectFields[slug] ?? {}),
      ...(forceConciseChallengeDetail ? { challengeDetail: false } : {}),
    }
  }
  return {
    sections: mergeBooleanMap(initial.sections, source.sections),
    sectionOrder: ensureValidSectionOrder(source.sectionOrder),
    profileFields: mergeBooleanMap(initial.profileFields, source.profileFields),
    excludedContacts: mergeBooleanMap({}, source.excludedContacts),
    excludedProjectSlugs: mergeBooleanMap({}, source.excludedProjectSlugs),
    excludedAiSlugs: mergeBooleanMap({}, source.excludedAiSlugs),
    excludedToyCategories: mergeBooleanMap({}, source.excludedToyCategories),
    excludedActivitySlugs: mergeBooleanMap({}, source.excludedActivitySlugs),
    excludedAwardKeys: mergeBooleanMap({}, source.excludedAwardKeys),
    excludedCertificationKeys: mergeBooleanMap({}, source.excludedCertificationKeys),
    excludedEducationKeys: mergeBooleanMap({}, source.excludedEducationKeys),
    excludedExperienceKeys: mergeBooleanMap({}, source.excludedExperienceKeys),
    projectFields,
  }
}

export function migratePdfSelectionState(v1: unknown, v2: unknown): PdfSelectionState {
  const initial = createInitialState()
  if (isPersistedSelection(v2)) return mergeSelectionState(initial, v2, false)
  if (isPersistedSelection(v1)) return mergeSelectionState(initial, v1, true)
  return initial
}

function parseStoredState(raw: string | null): unknown {
  if (!raw) return undefined
  try {
    return JSON.parse(raw)
  } catch (error) {
    if (error instanceof SyntaxError) return undefined
    throw error
  }
}

export function loadFromStorage(): PdfSelectionState {
  if (typeof window === 'undefined') return createInitialState()
  return migratePdfSelectionState(
    parseStoredState(window.localStorage.getItem(PDF_SELECTION_STORAGE_KEY_V1)),
    parseStoredState(window.localStorage.getItem(PDF_SELECTION_STORAGE_KEY_V2)),
  )
}
