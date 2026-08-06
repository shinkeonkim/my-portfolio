// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { mefitChallenges } from '@/data/projects/mefit-challenges'
import type { ProjectChallenge } from '@/types'
import PdfProjectChallenge from '@/components/pdf/blocks/PdfProjectChallenge.vue'

const challenge: ProjectChallenge = {
  title: 'Challenge title',
  tags: ['Vue', 'PDF'],
  problem: '<p>Problem summary</p>',
  approach: '<p>Approach summary</p>',
  result: '<p>Result summary</p>',
  detail: {
    background: '<p>Repeated background must stay out of the PDF.</p>',
    options: [
      { label: 'Option A', pros: ['Fast'], cons: ['Complex'], chosen: true },
      { label: 'Option B', pros: ['Simple'], cons: ['Limited'] },
    ],
    decision: '<p>Decision detail</p>',
    implementation: ['Implementation one', 'Implementation two'],
    learnings: ['Learning one', 'Learning two'],
    metrics: ['Metric one', 'Metric two'],
  },
}

describe('PdfProjectChallenge', () => {
  it('renders only problem, approach, and result by default', () => {
    const wrapper = mount(PdfProjectChallenge, {
      props: { challenge, includeDetail: false },
    })

    expect(wrapper.findAll('.pdf-challenge-row')).toHaveLength(3)
    const rows = wrapper.findAll('.pdf-challenge-row')
    expect(rows.map((row) => row.attributes('data-challenge-variant'))).toEqual([
      'problem',
      'approach',
      'result',
    ])
    expect(rows.map((row) => row.find('[data-challenge-label]').text())).toEqual([
      '문제',
      '접근',
      '결과',
    ])
    expect(rows.map((row) => row.find('[data-challenge-body]').text())).toEqual([
      'Problem summary',
      'Approach summary',
      'Result summary',
    ])
    expect(rows.map((row) => row.find('[data-challenge-body]').classes())).toEqual([
      expect.arrayContaining(['pdf-challenge-body-problem']),
      expect.arrayContaining(['pdf-challenge-body-approach']),
      expect.arrayContaining(['pdf-challenge-body-result']),
    ])
    expect(wrapper.find('.pdf-challenge-detail').exists()).toBe(false)
    expect(wrapper.text()).toContain('Problem summary')
    expect(wrapper.text()).toContain('Approach summary')
    expect(wrapper.text()).toContain('Result summary')
    expect(wrapper.text()).not.toContain('Decision detail')
  })

  it('renders selected details without repeated background and with semantic compact groups', () => {
    const wrapper = mount(PdfProjectChallenge, {
      props: { challenge, includeDetail: true },
    })

    expect(wrapper.find('.pdf-challenge-detail').exists()).toBe(true)
    expect(wrapper.find('.pdf-challenge-sublabel').text()).toBe('대안 비교')
    expect(wrapper.findAll('.pdf-challenge-sublabel')).toHaveLength(5)
    expect(wrapper.findAll('.pdf-challenge-implementation-list')).toHaveLength(1)
    expect(wrapper.findAll('.pdf-challenge-learning-list')).toHaveLength(1)
    expect(wrapper.find('.pdf-challenge-list-groups').element.tagName).toBe('DIV')
    expect(wrapper.find('.pdf-challenge-implementation-list').element.tagName).toBe('UL')
    expect(wrapper.find('.pdf-challenge-learning-list').element.tagName).toBe('UL')
    expect(wrapper.find('.pdf-challenge-metrics').element.tagName).toBe('DIV')
    expect(wrapper.text()).not.toContain('Repeated background must stay out of the PDF.')
    expect(wrapper.text()).not.toContain('배경')
    expect(wrapper.findAll('.pdf-challenge-detail-list')).toHaveLength(2)
  })

  it('keeps retired low-signal challenges out and renders no raw module inventories', () => {
    const retired = [
      'React 19 + Feature-Sliced Design 으로 병렬 개발',
      'Django 도메인 모듈 분리 설계',
    ]
    for (const title of retired) {
      expect(mefitChallenges.map((item) => item.title)).not.toContain(title)
    }

    const text = mefitChallenges
      .map((challenge) =>
        mount(PdfProjectChallenge, { props: { challenge, includeDetail: true } }).text(),
      )
      .join('\n')

    for (const inventory of [
      'auth / resume / jd / user-job-description',
      'interview-setup / interview-precheck / interview-session',
      'achievements / streak / milestones / notifications',
      'home / onboarding / settings / subscription',
      'users / profiles / interviews / resumes',
    ]) {
      expect(text, `"${inventory}" 나열이 되살아났습니다`).not.toContain(inventory)
    }
  })

  it('keeps challenge summaries flowable while preserving internal subgroup integrity', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/pdf/blocks/PdfProjectChallenge.vue'),
      'utf8',
    )

    expect(source).toMatch(/\.pdf-challenge\s*\{[^}]*break-inside:\s*auto/s)
    expect(source).toMatch(/\.pdf-challenge-header\s*\{[^}]*break-inside:\s*avoid/s)
    // 행은 페이지 경계에서 이어지도록 두고(지면 손실 방지), 제목·하위 그룹만 묶어 둔다.
    expect(source).toMatch(/\.pdf-challenge-row\s*\{[^}]*break-inside:\s*auto/s)
    expect(source).toMatch(/\.pdf-challenge-sub\s*\{[^}]*break-inside:\s*avoid/s)
    expect(source).toMatch(/\.pdf-option\s*\{[^}]*break-inside:\s*avoid/s)
    expect(source).toMatch(
      /\.pdf-challenge-detail-list li\s*\{[^}]*break-inside:\s*avoid[^}]*page-break-inside:\s*avoid/s,
    )
    expect(source).toMatch(
      /@media screen and \(max-width: 793px\)[\s\S]*\.pdf-options[\s\S]*grid-template-columns:\s*1fr/s,
    )
  })
})
