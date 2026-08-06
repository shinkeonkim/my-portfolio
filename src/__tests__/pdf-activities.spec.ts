// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { activities } from '@/data'
import type { Activity } from '@/types'
import PdfActivitiesBlock from '@/components/pdf/blocks/PdfActivitiesBlock.vue'

const likelion = activities.find((activity) => activity.slug === 'likelion-kookmin')
const helper = activities.find((activity) => activity.slug === 'kmu-helper')

if (!likelion || !helper) {
  throw new Error('Expected activity fixtures to include LikeliLion and the helper activity')
}

const emptyActivity: Activity = {
  slug: 'empty-activity',
  title: 'Empty activity',
  organization: 'Test organization',
  period: { start: '2026', end: null },
  category: 'community',
  highlights: [],
  timeline: [],
}

const yearTimelineActivity: Activity = {
  ...emptyActivity,
  slug: 'year-timeline-activity',
  title: 'Year timeline activity',
  highlights: [],
  timeline: [
    {
      period: '2025',
      title: '2025 cohort',
      bullets: [],
    },
  ],
}

describe('PdfActivitiesBlock', () => {
  it('renders LikeliLion as exactly two compact detail rows', () => {
    const wrapper = mount(PdfActivitiesBlock, { props: { items: [likelion] } })
    const activity = wrapper.find('[data-activity-slug="likelion-kookmin"]')
    const projection = activity.find('[data-activity-projection="likelion-compact"]')

    expect(activity.find('h3').text()).toBe('국민대 멋쟁이사자처럼 8 ~ 13기')
    expect(activity.text()).toContain('2020-03 ~ 2025-12')
    expect(projection.findAll('[data-activity-row]')).toHaveLength(2)
    expect(projection.find('[data-activity-row="staff-history"]').text()).toBe(
      '운영진 이력: 2025 (13기) · 2024 (12기) · 2022 (10기) · 2021 (9기 대표) · 2020 (8기 아기사자)',
    )
    expect(projection.find('[data-activity-row="ninth-generation-highlights"]').text()).toBe(
      '9기 운영진 대표 주요 활동: Git/GitHub 심화 강의 · Algorithm 스터디 운영 · 12개 대학 연합 해커톤 배포 담당 (배포 119 부서)',
    )
    expect(activity.find('.pdf-activity-list').exists()).toBe(false)
    expect(activity.find('.pdf-activity-timeline').exists()).toBe(false)
    expect(activity.findAll('ul')).toHaveLength(0)
    expect(activity.text()).not.toContain('Django · DRF · GitHub Flow 백엔드 세션')
    expect(activity.text()).not.toContain('동아리 노션 페이지 자동화 도구')
  })

  it('keeps generic activity highlights and expanded timeline rendering unchanged', () => {
    const wrapper = mount(PdfActivitiesBlock, { props: { items: [helper] } })
    const activity = wrapper.find('[data-activity-slug="kmu-helper"]')

    expect(activity.find('.pdf-activity-list').exists()).toBe(true)
    expect(activity.findAll('.pdf-activity-list > li')).toHaveLength(3)
    expect(activity.find('.pdf-activity-timeline').exists()).toBe(true)
    expect(activity.findAll('.pdf-activity-timeline-row')).toHaveLength(4)
    expect(activity.findAll('.pdf-activity-timeline-row ul')).toHaveLength(4)
  })

  it('marks year-only cohorts compactly while preserving long timeline periods', () => {
    const wrapper = mount(PdfActivitiesBlock, { props: { items: [yearTimelineActivity, helper] } })
    const compactPeriods = wrapper
      .find('[data-activity-slug="year-timeline-activity"]')
      .findAll('.pdf-activity-timeline-period')
    const helperPeriods = wrapper
      .find('[data-activity-slug="kmu-helper"]')
      .findAll('.pdf-activity-timeline-period')

    expect(compactPeriods.map((period) => period.text())).toEqual(['2025'])
    expect(compactPeriods.every((period) => period.classes('pdf-activity-timeline-period--year'))).toBe(
      true,
    )
    expect(helperPeriods[0]?.text()).toBe('2025-09 ~ 2025-12')
    expect(helperPeriods[0]?.classes('pdf-activity-timeline-period--year')).toBe(false)
    expect(wrapper.findAll('.pdf-activity-timeline-content')).toHaveLength(5)
  })

  it('does not render empty lists for empty highlights and timeline collections', () => {
    const wrapper = mount(PdfActivitiesBlock, { props: { items: [emptyActivity] } })

    expect(wrapper.find('.pdf-activity-list').exists()).toBe(false)
    expect(wrapper.find('.pdf-activity-timeline').exists()).toBe(false)
    expect(wrapper.findAll('ul')).toHaveLength(0)
  })

  it('retains all five LikeliLion source timeline records', () => {
    expect(likelion.timeline).toHaveLength(5)
  })
})
