// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import { skillsByCategory } from '@/data'

function mountSkillsSection() {
  return mount(SkillsSection, {
    global: { stubs: { RouterLink: true } },
  })
}

describe('SkillsSection', () => {
  it('renders every source category and skill exactly once in source order', () => {
    // Given: the section renderer receives the production skill category fixture.
    const sourceSnapshot = JSON.stringify(skillsByCategory)
    const wrapper = mountSkillsSection()

    // When: the compact category rows are rendered.
    const categoryLabels = wrapper.findAll('[data-skill-category]').map((row) => row.text())
    const skillNames = wrapper.findAll('[data-skill-name]').map((tag) => tag.text())
    const expectedNames = skillsByCategory.flatMap((group) =>
      group.skills.map((skill) => skill.name),
    )

    // Then: categories, tags, and source objects preserve their exact source ordering and values.
    expect(categoryLabels).toEqual(skillsByCategory.map((group) => group.label))
    expect(skillNames).toEqual(expectedNames)
    expect(new Set(skillNames).size).toBe(expectedNames.length)
    expect(JSON.stringify(skillsByCategory)).toBe(sourceSnapshot)
  })

  it('renders no legacy controls, cards, metadata, prose, or project links', () => {
    // Given: the compact renderer is mounted with all source categories visible.
    const wrapper = mountSkillsSection()

    // When: the compact DOM is inspected.
    // Then: only category labels and skill names remain from the skill source.
    expect(wrapper.findAll('button')).toHaveLength(0)
    expect(wrapper.findAll('article')).toHaveLength(0)
    expect(wrapper.findAll('a')).toHaveLength(0)
    expect(wrapper.findAll('[data-skill-description]')).toHaveLength(0)
    expect(wrapper.text()).not.toMatch(/Core|Proficient|Familiar|년\+ 경력|undefined|null|NaN/)
    expect(wrapper.text()).not.toContain('필요한 도구를 상황에 맞게 골라씁니다.')
    expect(wrapper.text()).not.toContain(
      '서비스의 전체 흐름을 설계하고 구현하며 사용하는 기술 스택입니다.',
    )
    for (const group of skillsByCategory) {
      expect(wrapper.text()).not.toContain(group.description)
      for (const skill of group.skills) {
        if (skill.description) expect(wrapper.text()).not.toContain(skill.description)
      }
    }
  })

  it('renders a skill with missing optional metadata as its name only', () => {
    // Given: Terraform has no experience years or project links in the source fixture.
    const terraform = skillsByCategory
      .flatMap((group) => group.skills)
      .find((skill) => skill.slug === 'terraform')
    expect(terraform?.experienceYears).toBeUndefined()
    expect(terraform?.projectSlugs).toEqual([])

    const wrapper = mountSkillsSection()

    // When: Terraform is rendered in its source category row.
    const terraformTag = wrapper
      .findAll('[data-skill-name]')
      .find((tag) => tag.text() === 'Terraform')

    // Then: optional fields do not create placeholders or additional content.
    expect(terraformTag?.exists()).toBe(true)
    expect(terraformTag?.text()).toBe(terraform?.name)
  })
})
