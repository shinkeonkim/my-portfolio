// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { awards, certifications, projects, skillsByCategory } from '@/data'
import PdfAwardsBlock from '@/components/pdf/blocks/PdfAwardsBlock.vue'
import PdfSkillsBlock from '@/components/pdf/blocks/PdfSkillsBlock.vue'

function readBlockSource(file: string): string {
  return readFileSync(resolve(process.cwd(), 'src/components/pdf/blocks', file), 'utf8')
}

/** 셀렉터가 속한 CSS 규칙 본문을 돌려준다 (`a, b { … }` 처럼 묶인 규칙도 처리). */
function readRuleBody(source: string, selector: string): string {
  const at = source.indexOf(selector)
  if (at < 0) throw new Error(`${selector} not found`)
  const open = source.indexOf('{', at)
  const close = source.indexOf('}', open)
  if (open < 0 || close < 0) throw new Error(`${selector} has no rule body`)
  return source.slice(open + 1, close)
}

/** A4 인쇄 시 세로 공간을 아끼기 위해 2열 그리드로 흘려야 하는 블록들. */
const twoColumnCases = [
  { file: 'PdfAwardsBlock.vue', selector: '.pdf-awards-list' },
  { file: 'PdfActivitiesBlock.vue', selector: '.pdf-activity-timeline' },
] as const

/** 나열식으로 되돌아가면 안 되는, 삭제된 식별자 덤프들. */
const removedEnumerations = [
  'analysis-resume / analysis-stt',
  'job_descriptions / achievements',
  'BaseModel / BaseAPIView / BaseAPIException',
  'Game / GameSession / GameResult / RankingEntry',
  'file_manager',
] as const

describe('printable PDF density', () => {
  it('keeps the preview geometry identical to the printed page box', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/pdf/PdfDocument.vue'),
      'utf8',
    )
    const page = readRuleBody(source, '@page {')
    const margin = /margin:\s*(\d+)mm\s+(\d+)mm/.exec(page)
    if (!margin) throw new Error('@page margin is missing')

    const [, vertical, horizontal] = margin
    // 미리보기 padding 이 @page margin 과 같아야 화면 폭이 인쇄 폭과 일치한다.
    expect(readRuleBody(source, '.pdf-document {')).toContain(
      `padding: ${vertical}mm ${horizontal}mm`,
    )
  })

  it('lays Skills out as one row per category', () => {
    const source = readBlockSource('PdfSkillsBlock.vue')

    expect(readRuleBody(source, '.pdf-skill-group {')).toContain('display: flex')
    expect(source).toContain('.pdf-skill-group h3')

    const wrapper = mount(PdfSkillsBlock, { props: { groups: skillsByCategory } })
    expect(wrapper.findAll('.pdf-skill-group')).toHaveLength(skillsByCategory.length)
    for (const group of wrapper.findAll('.pdf-skill-group')) {
      expect(group.findAll('.pdf-skill-list')).toHaveLength(1)
    }
  })

  it('flows awards and activity timelines into two columns', () => {
    for (const { file, selector } of twoColumnCases) {
      const rules = readRuleBody(readBlockSource(file), selector)

      expect(rules, `${file} ${selector}`).toContain('display: grid')
      expect(rules, `${file} ${selector}`).toContain('grid-template-columns: 1fr 1fr')
    }
  })

  it('renders awards with the same plain layout as certifications', () => {
    const wrapper = mount(PdfAwardsBlock, { props: { awards, certifications } })
    const source = readBlockSource('PdfAwardsBlock.vue')

    expect(wrapper.findAll('.pdf-awards-list > .pdf-award-item')).toHaveLength(awards.length)
    expect(wrapper.findAll('.pdf-cert-list > li')).toHaveLength(certifications.length)
    // 수상 등급은 배지가 아니라 자격증 목록과 같은 평문으로 둔다.
    expect(readRuleBody(source, '.pdf-award-rank')).not.toContain('background')
    // 기관과 부연 설명은 별도 문단이 아니라 한 줄로 합친다.
    expect(wrapper.findAll('.pdf-award-item p')).toHaveLength(0)
    expect(wrapper.findAll('.pdf-award-meta')).toHaveLength(awards.length)
  })

  it('keeps identifier dumps out of project copy', () => {
    const copy = projects
      .flatMap((project) => [
        project.description,
        ...project.features.flatMap((feature) => feature.content),
        ...project.contributions.flatMap((c) => [c.summary, ...(c.items ?? [])]),
        ...project.challenges.flatMap((c) => [c.problem, c.approach, c.result]),
      ])
      .join('\n')

    for (const enumeration of removedEnumerations) {
      expect(copy, `"${enumeration}" 나열이 되살아났습니다`).not.toContain(enumeration)
    }
  })

  it('drops the retired mefit sections and familiar-only languages', () => {
    const mefit = projects.find((project) => project.slug === 'mefit')
    if (!mefit) throw new Error('mefit project fixture is missing')

    expect(mefit.challenges.map((challenge) => challenge.title)).not.toContain(
      'Django 도메인 모듈 분리 설계',
    )

    const languages = skillsByCategory.find((group) => group.category === 'language')
    expect(languages?.skills.map((skill) => skill.slug)).not.toContain('java')
    expect(languages?.skills.map((skill) => skill.slug)).not.toContain('rust')
  })

  it('replaces the feature list with an enriched summary on printed projects', () => {
    // 주요 기능 섹션을 걷어낸 프로젝트는 설명이 그 내용을 흡수해야 한다.
    for (const slug of ['mefit', 'athena', 'kkambbaki']) {
      const project = projects.find((p) => p.slug === slug)
      if (!project) throw new Error(`${slug} project fixture is missing`)

      expect(project.features, `${slug} 주요 기능`).toHaveLength(0)
      expect(project.description.length, `${slug} 설명 보강`).toBeGreaterThan(400)
    }
  })

  it('keeps mefit contributions free of content already told by its challenges', () => {
    const mefit = projects.find((project) => project.slug === 'mefit')
    if (!mefit) throw new Error('mefit project fixture is missing')

    const contributions = mefit.contributions
      .flatMap((c) => [c.title, c.summary, ...(c.items ?? [])])
      .join('\n')

    // 아래 사실들은 "고민과 해결" 챌린지가 이미 서술한다.
    for (const duplicated of [
      'LiteLLM Gateway 도입',
      'iptables NAT',
      'RDS 커넥션 풀 고갈',
      'STT silent failure',
      'EKS 대신 K3s',
      '이중 임베딩',
    ]) {
      expect(contributions, `"${duplicated}" 가 기여 항목에서 중복됩니다`).not.toContain(duplicated)
    }
  })
})
