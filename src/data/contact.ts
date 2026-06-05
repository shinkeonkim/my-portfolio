import type { ContactLink } from '@/types'

export const contactLinks: readonly ContactLink[] = [
  {
    channel: 'email',
    label: 'Email',
    value: 'dev.shinkeonkim@gmail.com',
    href: 'mailto:dev.shinkeonkim@gmail.com',
  },
  {
    channel: 'github',
    label: 'GitHub',
    value: 'github.com/shinkeonkim',
    href: 'https://github.com/shinkeonkim',
  },
  {
    channel: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/shinkeonkim',
    href: 'https://linkedin.com/in/shinkeonkim',
  },
  {
    channel: 'blog',
    label: 'Blog',
    value: 'shinkeonkim.com',
    href: 'https://shinkeonkim.com',
  },
  {
    channel: 'blog',
    label: 'Site',
    value: '코드.kr',
    href: 'https://코드.kr',
  },
] as const
