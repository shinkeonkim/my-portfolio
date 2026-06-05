import type { ToyProject } from '@/types'

export const packageProjects: readonly ToyProject[] = [
  {
    slug: 'is-likelion',
    name: 'is-likelion',
    tagline: '멋쟁이사자처럼 멤버 여부를 판별하는 오픈소스 Python 패키지',
    category: 'package',
    emoji: '🦁',
    stack: ['Python', 'pip'],
    stars: 1,
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/is_likelion', type: 'github' },
    ],
  },
  {
    slug: 'xaskify',
    name: 'Xaskify',
    tagline: 'HTML DOM 요소·페이지를 마스킹하는 오픈소스 JS 라이브러리',
    category: 'package',
    emoji: '🫥',
    stack: ['JavaScript', 'npm'],
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/xaskify', type: 'github' },
    ],
  },
]
