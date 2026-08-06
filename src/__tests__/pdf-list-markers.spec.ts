// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Project } from '@/types'
import PdfProjectChallenge from '@/components/pdf/blocks/PdfProjectChallenge.vue'
import PdfProjectsBlock from '@/components/pdf/blocks/PdfProjectsBlock.vue'

type MarkerClassification =
  | 'native'
  | 'custom'
  | 'structural markerless'
  | 'inline separator'
  | 'ordered'
  | 'literal +/-'

interface MarkerCase {
  readonly file: string
  readonly selector: string
  readonly classification: MarkerClassification
  readonly rules: readonly string[]
}

const markerMatrix = [
  {
    file: 'PdfProfileBlock.vue',
    selector: '.pdf-profile-summary',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfExperienceBlock.vue',
    selector: '.pdf-exp-roles',
    classification: 'structural markerless',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfExperienceBlock.vue',
    selector: '.pdf-exp-details',
    classification: 'structural markerless',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfExperienceBlock.vue',
    selector: '.pdf-exp-detail::before',
    classification: 'custom',
    rules: ["content: ''", 'position: absolute'],
  },
  {
    file: 'PdfExperienceBlock.vue',
    selector: '.pdf-exp-bullets li::before',
    classification: 'custom',
    rules: ["content: '•'"],
  },
  {
    file: 'PdfContactBlock.vue',
    selector: '.pdf-contact-list',
    classification: 'structural markerless',
    rules: ['list-style: none', 'display: grid'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-option-pros',
    classification: 'literal +/-',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-option-cons',
    classification: 'literal +/-',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-challenge-detail-list',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-challenge-body :deep(ul)',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-challenge-body :deep(ol)',
    classification: 'ordered',
    rules: ['list-style: decimal'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-challenge-decision :deep(ul)',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfProjectChallenge.vue',
    selector: '.pdf-challenge-decision :deep(ol)',
    classification: 'ordered',
    rules: ['list-style: decimal'],
  },
  {
    file: 'PdfEducationBlock.vue',
    selector: '.pdf-edu-list',
    classification: 'structural markerless',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfEducationBlock.vue',
    selector: '.pdf-edu-notes',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfAwardsBlock.vue',
    selector: '.pdf-awards-list',
    classification: 'structural markerless',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfAwardsBlock.vue',
    selector: '.pdf-cert-list',
    classification: 'structural markerless',
    rules: ['list-style: none'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-project-description :deep(> ul)',
    classification: 'inline separator',
    rules: ['display: flex', 'list-style: none'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-project-description :deep(> ul > li)',
    classification: 'inline separator',
    rules: ['display: inline'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-project-description :deep(> ul > li + li)::before',
    classification: 'inline separator',
    rules: ["content: '·'"],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-project-description :deep(> ol)',
    classification: 'ordered',
    rules: ['display: block', 'list-style: decimal'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-project-description :deep(> ul ul)',
    classification: 'native',
    rules: ['display: block', 'list-style: disc'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-feature-list',
    classification: 'native',
    rules: ['list-style-type: disc'],
  },
  {
    file: 'PdfProjectsBlock.vue',
    selector: '.pdf-contribution-items',
    classification: 'native',
    rules: ['list-style-type: disc'],
  },
  {
    file: 'PdfActivitiesBlock.vue',
    selector: '.pdf-activity-list',
    classification: 'native',
    rules: ['list-style: disc'],
  },
  {
    file: 'PdfActivitiesBlock.vue',
    selector: '.pdf-activity-timeline ul',
    classification: 'native',
    rules: ['list-style: disc'],
  },
] as const satisfies readonly MarkerCase[]

const project = {
  slug: 'marker-project',
  name: 'Marker Project',
  subtitle: 'Marker fixture',
  period: { start: '2026-01', end: '2026-02' },
  scale: 'side',
  status: 'completed',
  roles: ['Engineer'],
  team: { size: 1, lead: false },
  stack: ['Vue'],
  oneLiner: 'Marker fixture',
  description:
    '<p>Description</p><ul><li>Inline one</li><li>Inline two</li><li>Parent<ul><li>Nested native</li></ul></li></ul>' +
    '<ol><li>Ordered one</li></ol>',
  features: [{ title: 'Feature', content: ['Feature one'] }],
  challenges: [],
  contributions: [{ title: 'Contribution', summary: 'Summary', items: ['Contribution one'] }],
  links: [],
} satisfies Project

const challenge = {
  problem: '<p>Problem</p><ul><li>Problem list</li></ul>',
  approach: '<p>Approach</p><ol><li>Approach step</li></ol>',
  result: '<p>Result</p>',
  detail: {
    options: [{ label: 'Option', pros: ['Fast'], cons: ['Complex'] }],
    decision: '<ul><li>Decision list</li></ul>',
    implementation: ['Implementation one'],
    learnings: ['Learning one'],
    metrics: ['Metric one'],
  },
} satisfies NonNullable<Project['challenges']>[number]

function readBlockSource(file: string): string {
  return readFileSync(resolve(process.cwd(), 'src/components/pdf/blocks', file), 'utf8')
}

describe('printable PDF list marker matrix', () => {
  it('declares every runtime PDF list selector without touching panel UI', () => {
    const sources = new Map<string, string>()
    for (const markerCase of markerMatrix) {
      const source = sources.get(markerCase.file) ?? readBlockSource(markerCase.file)
      sources.set(markerCase.file, source)
      expect(source).toContain(markerCase.selector)
      for (const rule of markerCase.rules) expect(source).toContain(rule)
    }

    expect([...sources.values()].join('\n')).not.toContain('PdfSelectionPanel')
    expect(
      readFileSync(resolve(process.cwd(), 'src/components/pdf/PdfPanelSection.vue'), 'utf8'),
    ).not.toContain('#pdf-document')
  })

  it('preserves actual inline, ordered, nested, and contribution list structures', () => {
    const wrapper = mount(PdfProjectsBlock, {
      props: { projects: [project], getField: () => true },
    })
    const description = wrapper.find('.pdf-project-description')

    expect(description.find(':scope > ul').element.tagName).toBe('UL')
    expect(description.find(':scope > ul > li').element.tagName).toBe('LI')
    expect(description.find(':scope > ul > li > ul').element.tagName).toBe('UL')
    expect(description.find(':scope > ol').element.tagName).toBe('OL')
    expect(wrapper.find('.pdf-feature-list > li').text()).toBe('Feature one')
    expect(wrapper.find('.pdf-contribution-items > li').text()).toBe('Contribution one')
  })

  it('preserves v-html challenge lists and intentional literal comparison signs', () => {
    const wrapper = mount(PdfProjectChallenge, {
      props: { challenge, includeDetail: true },
    })

    expect(wrapper.find('.pdf-challenge-body-problem > ul > li').text()).toBe('Problem list')
    expect(wrapper.find('.pdf-challenge-body-approach > ol > li').text()).toBe('Approach step')
    expect(wrapper.find('.pdf-challenge-decision > ul > li').text()).toBe('Decision list')
    expect(wrapper.find('.pdf-challenge-detail-list').exists()).toBe(true)
    expect(wrapper.find('.pdf-option-pros > li').text()).toMatch(/^\+ /)
    expect(wrapper.find('.pdf-option-cons > li').text()).toMatch(/^− /)
    expect(wrapper.find('.pdf-challenge-metrics').findAll('span')).toHaveLength(1)
  })

  it('keeps custom rail and bullet mechanisms distinct from native markers', () => {
    const source = readBlockSource('PdfExperienceBlock.vue')

    expect(source).toMatch(/\.pdf-exp-detail\s*\{[^}]*position:\s*relative/s)
    expect(source).toMatch(/\.pdf-exp-detail::before\s*\{[^}]*content:\s*''/s)
    expect(source).toMatch(/\.pdf-exp-bullets\s*\{[^}]*list-style:\s*none/s)
    expect(source).toMatch(/\.pdf-exp-bullets li::before\s*\{[^}]*content:\s*'•'/s)
  })
})
