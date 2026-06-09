import type { ToyProject } from '@/types'

export const toolProjects: readonly ToyProject[] = [
  {
    slug: 'randycolor',
    name: 'Randy Color',
    tagline: '랜덤 그라데이션 CSS 생성기',
    category: 'tool',
    emoji: '🎨',
    stack: ['Vue', 'Vite'],
    stars: 1,
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/randycolor', type: 'github' },
    ],
  },
  {
    slug: 'fuck-pdf',
    name: 'fuck-pdf',
    tagline: '유료에 지쳐서 만든 PDF 편집 GUI',
    category: 'tool',
    emoji: '📑',
    stack: ['Python', 'PyQt'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/fuck-pdf', type: 'github' },
    ],
  },
  {
    slug: 'pr-message-generator',
    name: 'PR Message Generator',
    tagline: 'LLM으로 만드는 PR 메시지 (Go)',
    category: 'tool',
    emoji: '🧾',
    stack: ['Go', 'LLM'],
    year: 2026,
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/pr-message-generator', type: 'github' },
    ],
  },
  {
    slug: 'commit-message-generator',
    name: 'Commit Message Generator',
    tagline: 'Claude Code · LLM API로 커밋 메시지 생성',
    category: 'tool',
    emoji: '✍️',
    stack: ['Go', 'Claude', 'LLM'],
    year: 2026,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/kokoa-tools/commit-message-generator',
        type: 'github',
      },
    ],
  },
  {
    slug: 'github-digging-actions',
    name: 'GitHub Digging Actions',
    tagline: '여러 org에 흩어진 contribution을 통합 분석',
    category: 'tool',
    emoji: '⛏️',
    stack: ['Ruby', 'GitHub Actions'],
    year: 2026,
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/kokoa-tools/github-digging-actions',
        type: 'github',
      },
    ],
  },
  {
    slug: 'pr-archiving',
    name: 'PR Archiving',
    tagline: '특정 유저 PR · diff 스크린샷 아카이빙',
    category: 'tool',
    emoji: '📦',
    stack: ['JavaScript', 'Puppeteer'],
    stars: 2,
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/pr-archiving', type: 'github' },
    ],
  },
  {
    slug: 'pdf-to-jpgs',
    name: 'PDF → JPG',
    tagline: 'PDF 페이지를 각각 JPG로 변환',
    category: 'tool',
    emoji: '🖼️',
    stack: ['Python'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/pdf-to-jpgs', type: 'github' },
    ],
  },
  {
    slug: 'pdf-to-png-plane',
    name: 'PDF → PNG Plane',
    tagline: '특정 레이아웃 PNG로 변환',
    category: 'tool',
    emoji: '🗺️',
    stack: ['Python'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/pdf-to-png-plane', type: 'github' },
    ],
  },
  {
    slug: 'boj-to-pdf',
    name: 'BOJ → PDF',
    tagline: '백준 문제를 iPad용 PDF로',
    category: 'tool',
    emoji: '📚',
    stack: ['Python'],
    stars: 2,
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/boj-to-pdf', type: 'github' },
    ],
  },
  {
    slug: 'slack-message-collector',
    name: 'Slack Message Collector',
    tagline: 'Slack 채널 메시지 수집기',
    category: 'tool',
    emoji: '💬',
    stack: ['Python'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/kokoa-tools/slack-message-collector',
        type: 'github',
      },
    ],
  },
  {
    slug: 'e-gonghun-mcp',
    name: '공훈전자기록부 MCP',
    tagline: '국가보훈처 e-공훈 MCP 서버',
    category: 'tool',
    emoji: '🎖️',
    stack: ['Python', 'MCP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kokoa-tools/e-gonghun-mcp', type: 'github' },
    ],
  },
  {
    slug: 'github-repo-start-date-checker',
    name: 'Hackathon Repo Date Checker',
    tagline: '해커톤 운영용: 시작일 이전 repo 검출',
    category: 'tool',
    emoji: '🕐',
    stack: ['Python'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/kokoa-tools/github-repository-start-date-checker',
        type: 'github',
      },
    ],
  },
  {
    slug: 'paeon',
    name: 'Paeon',
    tagline: '사업자등록번호 → 정확한 상호명 추출',
    category: 'tool',
    emoji: '🏢',
    stack: ['Python'],
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/paeon', type: 'github' },
    ],
  },
  {
    slug: 'drf-discord-handler',
    name: 'DRF Discord Handler',
    tagline: 'DRF 예외를 Discord 채널로 알림',
    category: 'tool',
    emoji: '🔔',
    stack: ['Python', 'DRF', 'Discord'],
    year: 2025,
    links: [
      { label: 'GitHub', url: 'https://github.com/shinkeonkim/drf-discord-handler', type: 'github' },
    ],
  },
  {
    slug: 'job-address-extractor',
    name: 'Job · Address Extractor',
    tagline: '비정형 텍스트에서 직군과 주소를 추출 (palette-team)',
    category: 'tool',
    emoji: '🧷',
    stack: ['Python'],
    year: 2025,
    links: [
      { label: 'job_extractor', url: 'https://github.com/palette-team/job_extractor', type: 'github' },
      {
        label: 'address_extractor',
        url: 'https://github.com/palette-team/address_extractor',
        type: 'github',
      },
    ],
  },
]
