import type { ToyProject } from '@/types'

export const siteProjects: readonly ToyProject[] = [
  {
    slug: 'hanalum-web',
    name: '한민고 동문 웹',
    tagline: '한민고 동문 커뮤니티 + 폴 (Django)',
    category: 'site',
    emoji: '🎓',
    stack: ['Django', 'Python', 'JavaScript'],
    links: [
      { label: 'Main web', url: 'https://github.com/hanalum-dev/hanalum_web', type: 'github' },
      { label: 'Poll service', url: 'https://github.com/hanalum-dev/hanalum_poll', type: 'github' },
      {
        label: 'GitHub blog',
        url: 'https://github.com/hanalum-dev/hanalum-dev.github.io',
        type: 'github',
      },
    ],
  },
  {
    slug: 'twin-ai',
    name: 'Twin AI',
    tagline: 'SIPE 4기 미션 본인 구현: AI가 나를 소개해줘요',
    category: 'site',
    emoji: '👯',
    stack: ['Python', 'LLM'],
    year: 2025,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/twin-ai', type: 'github' },
    ],
  },
  {
    slug: 'drawing',
    name: 'Drawing',
    tagline: '심플 웹 그림판',
    category: 'site',
    emoji: '🖌️',
    stack: ['JavaScript', 'Canvas'],
    year: 2025,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/drawing', type: 'github' },
    ],
  },
  {
    slug: 'youtube-comment-viewer',
    name: 'YouTube Comment Viewer',
    tagline: 'YouTube 댓글을 한눈에 볼 수 있는 뷰어',
    category: 'site',
    emoji: '▶️',
    stack: ['JavaScript', 'YouTube API'],
    year: 2021,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/shinkeonkim/youtube-comment-viewer',
        type: 'github',
      },
    ],
  },
  {
    slug: 'umjunsik-lang-server',
    name: '엄랭 Lang Server',
    tagline: '엄랭(밈 한국어 언어) 인터프리터 HTTP 서버',
    category: 'site',
    emoji: '🐦',
    stack: ['Python'],
    year: 2025,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/shinkeonkim/umjunsik-lang-server',
        type: 'github',
      },
    ],
  },
  {
    slug: 'my-projects',
    name: 'My Projects Index',
    tagline: '진행했던 프로젝트들을 한 곳에 모아 정리',
    category: 'site',
    emoji: '🗂️',
    stack: ['Markdown'],
    stars: 4,
    year: 2025,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/my-projects', type: 'github' },
    ],
  },
]
