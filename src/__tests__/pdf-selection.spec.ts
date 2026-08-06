import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { createPinia, setActivePinia } from 'pinia'
import { projects } from '@/data'
import {
  migratePdfSelectionState,
  usePdfSelectionStore,
} from '@/stores/pdf-selection'

function createStorage(): Storage {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
  }
}

function firstProjectSlug(): string {
  const firstProject = projects[0]
  if (!firstProject) throw new Error('Expected at least one project fixture')
  return firstProject.slug
}

describe('pdf selection persistence', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createStorage() })
    setActivePinia(createPinia())
  })

  it('defaults fresh project selections to concise challenge content', () => {
    const state = migratePdfSelectionState(undefined, undefined)

    expect(state.projectFields[firstProjectSlug()]?.challengeDetail).toBe(false)
    expect(state.projectFields[firstProjectSlug()]?.description).toBe(true)
  })

  it('migrates v1 state while preserving unrelated selections and nested fields', () => {
    const state = migratePdfSelectionState(
      {
        sections: { projects: false },
        sectionOrder: ['projects', 'profile'],
        profileFields: { summary: false },
        excludedContacts: { 'mailto:test@example.com': true },
        excludedProjectSlugs: { athena: true },
        projectFields: {
          mefit: { description: false, challengeDetail: true, media: true },
        },
      },
      undefined,
    )

    expect(state.sections.projects).toBe(false)
    expect(state.sectionOrder.slice(0, 2)).toEqual(['projects', 'profile'])
    expect(state.profileFields.summary).toBe(false)
    expect(state.excludedContacts['mailto:test@example.com']).toBe(true)
    expect(state.excludedProjectSlugs.athena).toBe(true)
    expect(state.projectFields.mefit?.description).toBe(false)
    expect(state.projectFields.mefit?.media).toBe(true)
    expect(state.projectFields.mefit?.features).toBe(true)
    expect(state.projectFields.mefit?.challengeDetail).toBe(false)
  })

  it('adds defaults for every current project slug during migration', () => {
    const state = migratePdfSelectionState({ projectFields: {} }, undefined)

    for (const project of projects) {
      expect(state.projectFields[project.slug]).toEqual({
        description: true,
        features: true,
        challenges: true,
        challengeDetail: false,
        contributions: true,
        links: true,
        media: false,
      })
    }
  })

  it('prefers a valid v2 state over v1 and preserves opted-in detail', () => {
    const state = migratePdfSelectionState(
      { sections: { projects: false }, projectFields: { mefit: { challengeDetail: false } } },
      { sections: { projects: true }, projectFields: { mefit: { challengeDetail: true } } },
    )

    expect(state.sections.projects).toBe(true)
    expect(state.projectFields.mefit?.challengeDetail).toBe(true)
  })

  it('safely resets malformed storage and persists the v2 baseline', () => {
    const storage = window.localStorage
    storage.setItem('pdf-selection:v2', '{malformed')

    const store = usePdfSelectionStore()

    expect(store.state.sections.projects).toBe(true)
    expect(store.state.projectFields[firstProjectSlug()]?.challengeDetail).toBe(false)
    expect(() => JSON.parse(storage.getItem('pdf-selection:v2') ?? '')).not.toThrow()
  })

  it('labels challenge detail as an opt-in project field', () => {
    const panelSource = readFileSync(
      new URL('../components/pdf/PdfSelectionPanel.vue', import.meta.url),
      'utf8',
    )

    expect(panelSource).toContain('상세 (선택 사항 · 대안 / 결정 / 구현 / 배운 점)')
  })
})
