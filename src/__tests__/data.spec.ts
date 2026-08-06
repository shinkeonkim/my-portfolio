import { describe, expect, it } from 'vitest'
import {
  allSkills,
  projects,
  experiences,
  awards,
  certifications,
  activities,
  educations,
  contactLinks,
  profile,
  identityValues,
  getProjectBySlug,
  aiExperiments,
  toyProjects,
} from '@/data'
import type { ProjectContribution } from '@/types'

const contributionBaseline: Record<
  string,
  { groupCount: number; itemCounts: readonly number[] }
> = {
  mefit: { groupCount: 6, itemCounts: [2, 5, 6, 5, 4, 3] },
  kkambbaki: { groupCount: 4, itemCounts: [4, 3, 0, 0] },
  athena: { groupCount: 4, itemCounts: [4, 2, 3, 0] },
  sellon: { groupCount: 4, itemCounts: [2, 0, 0, 0] },
  peacepiece: { groupCount: 6, itemCounts: [0, 3, 0, 0, 0, 0] },
  ttl: { groupCount: 5, itemCounts: [0, 0, 0, 0, 0] },
  lotteng: { groupCount: 3, itemCounts: [0, 0, 0] },
  'daedong-mokjido': { groupCount: 4, itemCounts: [3, 0, 0, 0] },
  'a-sports': { groupCount: 3, itemCounts: [0, 0, 0] },
}

const invalidContributionFixtures: readonly { slug: string; value: unknown }[] = [
  { slug: 'fixture-missing-title', value: { summary: 'summary' } },
  { slug: 'fixture-empty-summary', value: { title: 'Title', summary: ' ' } },
  {
    slug: 'fixture-invalid-items',
    value: { title: 'Title', summary: 'summary', items: ['valid', 42] },
  },
]

function assertContributionShape(
  value: unknown,
  slug: string,
  index = 0,
): asserts value is ProjectContribution {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`[${slug}] contribution ${index} must be an object`)
  }

  const contribution = value as Record<string, unknown>
  if (typeof contribution.title !== 'string' || !contribution.title.trim()) {
    throw new Error(`[${slug}] contribution ${index} requires a title`)
  }
  if (typeof contribution.summary !== 'string' || !contribution.summary.trim()) {
    throw new Error(`[${slug}] contribution ${index} requires a summary`)
  }
  if (
    contribution.items !== undefined &&
    (!Array.isArray(contribution.items) ||
      contribution.items.some((item) => typeof item !== 'string' || !item.trim()))
  ) {
    throw new Error(`[${slug}] contribution ${index} items must be non-empty strings`)
  }
}

describe('portfolio data', () => {
  it('exposes profile with required fields', () => {
    expect(profile.name).toBe('김신건')
    expect(profile.summary.length).toBeGreaterThan(0)
  })

  it('lists the expected number of high-level entities', () => {
    expect(identityValues.length).toBe(4)
    expect(experiences.length).toBeGreaterThanOrEqual(2)
    expect(allSkills.length).toBeGreaterThan(10)
    expect(activities.length).toBeGreaterThanOrEqual(4)
    expect(awards.length).toBeGreaterThan(5)
    expect(certifications.length).toBeGreaterThan(5)
    expect(educations.length).toBeGreaterThanOrEqual(2)
    expect(contactLinks.length).toBeGreaterThan(3)
  })

  it('has unique project slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('looks up projects by slug', () => {
    expect(getProjectBySlug('athena')?.name).toBe('Athena')
    expect(getProjectBySlug('mefit')?.scale).toBe('major')
    expect(getProjectBySlug('non-existent')).toBeUndefined()
  })

  it('every project has at least one challenge and contribution', () => {
    for (const p of projects) {
      expect(p.challenges.length, `${p.slug} should have challenges`).toBeGreaterThan(0)
      expect(p.contributions.length, `${p.slug} should have contributions`).toBeGreaterThan(0)
    }
  })

  it('keeps every project contribution in the typed baseline shape', () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(Object.keys(contributionBaseline).sort())

    for (const project of projects) {
      const baseline = contributionBaseline[project.slug]
      if (baseline === undefined) {
        throw new Error(`${project.slug} should have a contribution baseline`)
      }
      expect(project.contributions.length, `${project.slug} contribution group count`).toBe(
        baseline.groupCount,
      )

      project.contributions.forEach((contribution, index) => {
        assertContributionShape(contribution, project.slug, index)
        expect(contribution.title, `${project.slug} contribution ${index} title`).not.toMatch(
          /<[^>]+>/,
        )
        expect(contribution.summary, `${project.slug} contribution ${index} summary`).not.toMatch(
          /<(?:ul|ol|li)(?:\s|>)/,
        )
        expect(
          contribution.items?.some((item) => /<(?:ul|ol|li)(?:\s|>)/.test(item)) ?? false,
          `${project.slug} contribution ${index} items should not contain a list container`,
        ).toBe(false)
        expect(
          contribution.items?.length ?? 0,
          `${project.slug} contribution ${index} item count`,
        ).toBe(baseline.itemCounts[index])
      })
    }
  })

  it('reports malformed contribution fixtures with their slugs', () => {
    for (const fixture of invalidContributionFixtures) {
      expect(() => assertContributionShape(fixture.value, fixture.slug)).toThrow(fixture.slug)
    }
  })

  it('skill project references point to existing project slugs', () => {
    const projectSlugSet = new Set(projects.map((p) => p.slug))
    for (const skill of allSkills) {
      for (const slug of skill.projectSlugs) {
        expect(
          projectSlugSet.has(slug),
          `Skill "${skill.name}" references unknown project "${slug}"`,
        ).toBe(true)
      }
    }
  })

  it('exposes ai experiments with unique slugs and links', () => {
    expect(aiExperiments.length).toBeGreaterThanOrEqual(17)
    const slugs = aiExperiments.map((e) => e.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const e of aiExperiments) {
      expect(e.links.site, `${e.slug} should have site link`).toMatch(/^https?:\/\//)
      expect(e.links.github, `${e.slug} should have github link`).toMatch(/^https?:\/\//)
      expect(e.image, `${e.slug} should have image path`).toContain('/images/ai-experiments/')
    }
  })

  it('exposes toy projects with unique slugs and at least one link', () => {
    expect(toyProjects.length).toBeGreaterThanOrEqual(30)
    const slugs = toyProjects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const p of toyProjects) {
      expect(p.links.length, `${p.slug} should have links`).toBeGreaterThan(0)
      for (const link of p.links) {
        expect(link.url).toMatch(/^https?:\/\//)
      }
    }
  })

  it('activities have unique slugs and may include teaching materials', () => {
    const slugs = activities.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    const likelion = activities.find((a) => a.slug === 'likelion-kookmin')
    expect(likelion, '멋사 통합 카드가 존재해야 함').toBeDefined()
    expect(likelion!.timeline?.length ?? 0, '5개 기수 timeline').toBeGreaterThanOrEqual(5)
    expect(likelion!.materials?.length ?? 0).toBeGreaterThanOrEqual(5)
    expect(likelion!.materials!.some((m) => m.type === 'repo' && m.url)).toBe(true)
  })

  it('projects can carry multiple links', () => {
    const mefit = projects.find((p) => p.slug === 'mefit')
    const athena = projects.find((p) => p.slug === 'athena')
    expect(mefit?.links.length, 'Mefit should expose multiple repos + demo').toBeGreaterThanOrEqual(3)
    expect(athena?.links.length, 'Athena should expose multiple repos').toBeGreaterThanOrEqual(4)
  })
})
