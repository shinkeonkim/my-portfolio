import { describe, expect, it } from 'vitest'
import type { ProjectLink } from '@/types'
import { formatProjectLink } from '@/components/pdf/blocks/pdf-project-link'

function link(overrides: Partial<ProjectLink>): ProjectLink {
  return {
    label: 'Project link',
    url: 'https://example.com',
    type: 'other',
    ...overrides,
  }
}

describe('formatProjectLink', () => {
  it('normalizes an HTTPS hostname and preserves the exact href', () => {
    const projectLink = link({
      label: 'Athena report',
      url: 'HTTPS://Example.COM/report/20191564.pdf?download=1#page=2',
    })

    expect(formatProjectLink(projectLink)).toEqual({
      href: projectLink.url,
      label: 'Athena report',
      hint: 'example.com',
    })
  })

  it('normalizes an HTTP hostname without exposing its path', () => {
    const projectLink = link({
      label: 'Legacy demo',
      url: 'http://WWW.Example.COM/a%2Fb/deep%20path?query=encoded%20value',
    })

    const formatted = formatProjectLink(projectLink)

    expect(formatted.href).toBe(projectLink.url)
    expect(formatted.label).toBe('Legacy demo')
    expect(formatted.hint).toBe('www.example.com')
    expect(`${formatted.label} ${formatted.hint}`).not.toContain('%20')
    expect(`${formatted.label} ${formatted.hint}`).not.toContain('/a%2Fb')
  })

  it('does not repeat a hostname already present in the label', () => {
    const projectLink = link({
      label: '서비스 (mefit.kr)',
      url: 'https://mefit.kr',
    })

    expect(formatProjectLink(projectLink)).toEqual({
      href: 'https://mefit.kr',
      label: '서비스 (mefit.kr)',
      hint: '',
    })
  })

  it('uses the internal-document hint for root-relative PDFs', () => {
    const projectLink = link({
      label: '발표 자료 (PDF)',
      url: '/docs/sellon-presentation.pdf',
      type: 'pdf',
    })

    expect(formatProjectLink(projectLink)).toEqual({
      href: '/docs/sellon-presentation.pdf',
      label: '발표 자료 (PDF)',
      hint: '내부 문서',
    })
  })

  it('keeps a 300-character URL out of printable text', () => {
    const longUrl = `https://example.com/${'x'.repeat(280)}`
    const projectLink = link({ label: 'Long path', url: longUrl })
    const formatted = formatProjectLink(projectLink)

    expect(longUrl).toHaveLength(300)
    expect(formatted.href).toBe(longUrl)
    expect(formatted.label).toBe('Long path')
    expect(formatted.hint).toBe('example.com')
    expect(`${formatted.label} (${formatted.hint})`).not.toContain(longUrl)
  })

  it('keeps malformed absolute links printable without throwing', () => {
    const projectLink = link({
      label: 'Broken external link',
      url: 'https://%',
    })

    expect(formatProjectLink(projectLink)).toEqual({
      href: projectLink.url,
      label: projectLink.label,
      hint: '외부 링크',
    })
  })
})
