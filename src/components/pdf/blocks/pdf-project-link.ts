import type { ProjectLink } from '@/types'

export interface PrintableProjectLink {
  href: ProjectLink['url']
  label: ProjectLink['label']
  hint: string
}

export function formatProjectLink(link: ProjectLink): PrintableProjectLink {
  if (/^https?:\/\//i.test(link.url)) {
    try {
      const hostname = new URL(link.url).hostname

      return {
        href: link.url,
        label: link.label,
        hint: link.label.toLowerCase().includes(hostname.toLowerCase()) ? '' : hostname,
      }
    } catch {
      return {
        href: link.url,
        label: link.label,
        hint: '외부 링크',
      }
    }
  }

  return {
    href: link.url,
    label: link.label,
    hint: '내부 문서',
  }
}
