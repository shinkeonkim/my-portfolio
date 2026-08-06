// @vitest-environment jsdom

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { skillsByCategory } from '@/data'
import PdfSkillsBlock from '@/components/pdf/blocks/PdfSkillsBlock.vue'
import type { SkillCategoryGroup } from '@/types'

describe('PdfSkillsBlock', () => {
  it('renders source-ordered skill names as compact tags and omits empty group details', () => {
    const emptyGroup = {
      category: 'tool',
      label: 'Empty category',
      description: 'Should not render',
      skills: [],
    } satisfies SkillCategoryGroup
    const groups = [...skillsByCategory, emptyGroup]
    const expectedLabels = skillsByCategory.map((group) => group.label)
    const expectedNames = skillsByCategory.flatMap((group) =>
      group.skills.map((skill) => skill.name),
    )
    const wrapper = mount(PdfSkillsBlock, { props: { groups } })

    const categoryLabels = wrapper.findAll('.pdf-skill-group h3').map((node) => node.text())
    const tagTexts = wrapper.findAll('.pdf-tag').map((node) => node.text())

    expect(expectedNames).toHaveLength(19)
    expect(categoryLabels).toEqual(expectedLabels)
    expect(tagTexts).toEqual(expectedNames)
    expect(new Set(tagTexts)).toHaveLength(expectedNames.length)
    expect(wrapper.findAll('.pdf-skill-group')).toHaveLength(expectedLabels.length)
    expect(wrapper.find('.pdf-skill-list').exists()).toBe(true)
    expect(wrapper.findAll('.pdf-skill-mark')).toHaveLength(0)
    expect(wrapper.findAll('.pdf-skill-years')).toHaveLength(0)
    expect(wrapper.findAll('.pdf-skill-desc')).toHaveLength(0)
    expect(wrapper.findAll('[data-level]').length).toBe(0)

    for (const group of skillsByCategory) {
      expect(wrapper.text()).not.toContain(group.description)
    }
  })
})
