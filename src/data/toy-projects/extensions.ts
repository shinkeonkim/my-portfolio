import type { ToyProject } from '@/types'

export const extensionProjects: readonly ToyProject[] = [
  {
    slug: 'army-tiger',
    name: 'Army Tiger',
    tagline: '군대 일정을 GitHub 프로필에 표시하는 Actions',
    category: 'extension',
    emoji: '🪖',
    stack: ['JavaScript', 'GitHub Actions'],
    stars: 9,
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/army-tiger', type: 'github' },
    ],
  },
  {
    slug: 'likelion-badge',
    name: 'Likelion Badge',
    tagline: '대학생 멋쟁이사자처럼 프로필 뱃지 생성',
    category: 'extension',
    emoji: '🦁',
    stack: ['Python'],
    stars: 9,
    year: 2021,
    links: [
      { label: 'GitHub', url: 'https://github.com/kmu-shinkeonkim/likelion-badge', type: 'github' },
    ],
  },
]
