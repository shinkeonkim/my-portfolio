// @vitest-environment jsdom
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { projects } from '@/data'
import type { Project } from '@/types'
import PdfProjectsBlock from '@/components/pdf/blocks/PdfProjectsBlock.vue'

const project = {
  slug: 'semantic-project',
  name: 'Semantic Project',
  displayName: 'Semantic Project',
  subtitle: 'A project fixture for PDF hierarchy tests',
  period: { start: '2026-01', end: '2026-02' },
  scale: 'side',
  status: 'completed',
  roles: ['Engineer'],
  team: { size: 1, lead: true },
  stack: ['Vue', 'TypeScript'],
  oneLiner: 'A typed project fixture.',
  description:
    '<p>Authored project description.</p>' +
    '<ul><li>Direct group one</li><li>Direct group two</li></ul>' +
    '<ol><li>Ordered step one</li><li>Ordered step two</li></ol>' +
    '<ul><li>Nested parent<ul><li>Nested child</li></ul></li></ul>',
  features: [
    {
      title: 'Feature card',
      content: ['Feature item one', 'Feature item two'],
    },
  ],
  challenges: [],
  contributions: [
    {
      title: 'Contribution group',
      summary: 'Authored <strong>summary</strong>.',
      items: ['Nested contribution item one', 'Nested contribution item two'],
    },
    {
      title: 'Summary-only group',
      summary: 'A summary without nested items.',
    },
  ],
  links: [
    { label: 'Repository', url: 'https://example.com/repository', type: 'github' },
    { label: 'Internal document', url: '/docs/project.pdf', type: 'pdf' },
  ],
} satisfies Project

const malformedProject = {
  ...project,
  slug: 'malformed-project',
  links: [{ label: 'Broken project link', url: 'https://%', type: 'other' }],
} satisfies Project

describe('PdfProjectsBlock', () => {
  it('renders project content as distinct semantic list and link groups', () => {
    const wrapper = mount(PdfProjectsBlock, {
      props: {
        projects: [project],
        getField: () => true,
      },
    })

    const description = wrapper.find('.pdf-project-description')
    expect(description.element.tagName).toBe('DIV')
    expect(description.find(':scope > ul').exists()).toBe(true)
    expect(description.find(':scope > ol').exists()).toBe(true)
    expect(description.find(':scope > ul > li > ul').exists()).toBe(true)

    const featureCard = wrapper.find('.pdf-feature-card')
    expect(featureCard.find('.pdf-feature-list').element.tagName).toBe('UL')
    expect(featureCard.findAll('.pdf-feature-list > li')).toHaveLength(2)

    const contributionGroups = wrapper.findAll('.pdf-contribution-group')
    expect(contributionGroups).toHaveLength(2)
    expect(contributionGroups[0]?.find('h5').text()).toBe('Contribution group')
    expect(contributionGroups[0]?.find('.pdf-contribution-summary strong').text()).toBe('summary')
    expect(contributionGroups[0]?.find('.pdf-contribution-items').element.tagName).toBe('UL')
    expect(contributionGroups[0]?.findAll('.pdf-contribution-items > li')).toHaveLength(2)
    expect(contributionGroups[1]?.find('.pdf-contribution-items').exists()).toBe(false)
    expect(wrapper.find('.pdf-project-contrib > li').exists()).toBe(false)

    const links = wrapper.findAll('.pdf-project-link a')
    expect(links).toHaveLength(2)
    expect(links[0]?.attributes('href')).toBe(project.links[0]?.url)
    expect(links[0]?.find('.pdf-project-link-hint').text()).toBe('(example.com)')
    expect(links[1]?.attributes('href')).toBe(project.links[1]?.url)
    expect(links[1]?.find('.pdf-project-link-hint').text()).toBe('(내부 문서)')
  })

  it('keeps all projects flowable while guarding headings and grouped content', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/pdf/blocks/PdfProjectsBlock.vue'),
      'utf8',
    )
    const wrapper = mount(PdfProjectsBlock, {
      props: {
        projects,
        getField: () => true,
      },
    })

    expect(wrapper.findAll('.pdf-project')).toHaveLength(9)
    expect(source).toMatch(/\.pdf-project\s*\{[^}]*break-inside:\s*auto/s)
    expect(source).toMatch(/\.pdf-project-header-group\s*\{[^}]*break-inside:\s*avoid/s)
    expect(source).toMatch(/\.pdf-project-section > h4\s*\{[^}]*break-after:\s*avoid/s)
    expect(source).toMatch(/\.pdf-feature-card\s*\{[^}]*break-inside:\s*avoid/s)
    expect(source).toMatch(/\.pdf-contribution-group\s*\{[^}]*break-inside:\s*avoid/s)
  })

  it('renders malformed absolute links with a printable fallback without throwing', () => {
    const wrapper = mount(PdfProjectsBlock, {
      props: {
        projects: [malformedProject],
        getField: () => true,
      },
    })

    const link = wrapper.find('.pdf-project-link a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://%')
    expect(link.text()).toContain('Broken project link')
    expect(link.find('.pdf-project-link-hint').text()).toBe('(외부 링크)')
  })

  it('keeps external and root-relative destinations out of printable link text', () => {
    const longUrl = `https://example.com/${'x'.repeat(280)}`
    const linkProject = {
      ...project,
      links: [
        {
          label: 'External report',
          url: 'HTTPS://Example.COM/reports/deep%20path?download=1#summary',
          type: 'article',
        },
        { label: 'Internal presentation', url: '/docs/project.pdf', type: 'pdf' },
        { label: 'Long project link', url: longUrl, type: 'other' },
      ],
    } satisfies Project

    const wrapper = mount(PdfProjectsBlock, {
      props: {
        projects: [linkProject],
        getField: () => true,
      },
    })
    const links = wrapper.findAll('.pdf-project-link a')

    expect(links).toHaveLength(3)
    expect(links[0]?.attributes('href')).toBe(linkProject.links[0]?.url)
    expect(links[0]?.find('.pdf-project-link-label').text()).toBe('External report')
    expect(links[0]?.find('.pdf-project-link-hint').text()).toBe('(example.com)')
    expect(links[1]?.attributes('href')).toBe(linkProject.links[1]?.url)
    expect(links[1]?.find('.pdf-project-link-label').text()).toBe('Internal presentation')
    expect(links[1]?.find('.pdf-project-link-hint').text()).toBe('(내부 문서)')
    expect(longUrl).toHaveLength(300)
    expect(links[2]?.attributes('href')).toBe(longUrl)
    expect(links[2]?.find('.pdf-project-link-label').text()).toBe('Long project link')
    expect(links[2]?.find('.pdf-project-link-hint').text()).toBe('(example.com)')
    expect(wrapper.text()).not.toContain(longUrl)
  })

  it('collapses feature grids only below the fixed A4 screen preview width', () => {
    const source = readFileSync(
      resolve(process.cwd(), 'src/components/pdf/blocks/PdfProjectsBlock.vue'),
      'utf8',
    )

    expect(source).toContain('@media screen and (max-width: 793px)')
    expect(source).toMatch(/\.pdf-project-features\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s)
    expect(source).toMatch(/\.pdf-project-contrib\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr/s)
    expect(source).toMatch(/@media screen and \(max-width: 793px\)[\s\S]*\.pdf-project-features/s)
    expect(source).toMatch(
      /@media screen and \(max-width: 793px\)[\s\S]*\.pdf-project-contrib[\s\S]*grid-template-columns:\s*1fr/s,
    )
    expect(source).not.toContain('@media print')
  })
})
