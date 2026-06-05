import type { ToyProject } from '@/types'

export const gameProjects: readonly ToyProject[] = [
  {
    slug: 'snake-game',
    name: 'Snake Game (C++)',
    tagline: 'KMU SW C++ 수업 작품 — 콘솔 스네이크',
    category: 'game',
    emoji: '🐍',
    stack: ['C++'],
    year: 2020,
    links: [
      { label: 'GitHub', url: 'https://github.com/kmu-shinkeonkim/snake-game', type: 'github' },
    ],
  },
  {
    slug: 'find-dog-game',
    name: 'Find the Dog',
    tagline: '강아지 찾기 미니 게임',
    category: 'game',
    emoji: '🐕',
    stack: ['JavaScript', 'HTML'],
    year: 2020,
    links: [
      { label: 'GitHub', url: 'https://github.com/kmu-shinkeonkim/find-dog-game', type: 'github' },
    ],
  },
  {
    slug: 'can-you-catch-circle',
    name: 'Can You Catch Circle?',
    tagline: '원을 잡으세요 — Vue 미니 게임',
    category: 'game',
    emoji: '⭕',
    stack: ['Vue'],
    year: 2021,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/shinkeonkim/can-you-catch-circle',
        type: 'github',
      },
    ],
  },
  {
    slug: 'move-it',
    name: 'Move It',
    tagline: '초록 박스 움직이고 빨간 점 피하기',
    category: 'game',
    emoji: '🟩',
    stack: ['JavaScript'],
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/move-it', type: 'github' },
    ],
  },
  {
    slug: 'mooyaho',
    name: '무야호~',
    tagline: '무야호~ 클릭하면 무야호',
    category: 'game',
    emoji: '🙌',
    stack: ['HTML', 'JavaScript'],
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/mooyaho', type: 'github' },
    ],
  },
  {
    slug: 'khonshu',
    name: 'Khonshu',
    tagline: 'God of Mooooon — 미니 인터랙션',
    category: 'game',
    emoji: '🌙',
    stack: ['JavaScript'],
    year: 2022,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/khonshu', type: 'github' },
    ],
  },
]
