import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/a-sports'

export const aSports: Project = {
  slug: 'a-sports',
  name: 'A-Sports (AlgoSports)',
  subtitle: '알고리즘을 게임처럼 즐기는 학습 플랫폼',
  period: { start: '2020-09', end: '2020-12' },
  scale: 'side',
  status: 'completed',
  roles: ['디자이너', '프론트엔드'],
  team: { size: 4, lead: false },
  stack: ['React.js', 'Canvas', 'AdobeXD'],
  oneLiner: '알고리즘 학습을 게임화하여 즐겁게 공부할 수 있도록 돕는 플랫폼.',
  description:
    '알고리즘 학습을 게임화하여 즐겁게 공부할 수 있도록 돕는 플랫폼입니다. 서비스 디자인과 프런트엔드 개발을 담당했습니다.',
  features: [
    'React.js 기반 SPA — 게임 매치/참여자 목록/실시간 렌더링',
    'Canvas로 게임 화면 구현 + 반응형 navbar',
    '코드 제출 / 코멘트 / 답글 / 토큰 자동 갱신',
    'AdobeXD로 화면 디자인',
    'Netlify 배포 (reload 404 이슈 해결)',
  ],
  challenges: [
    {
      problem: '디자인과 프런트엔드를 한 사람이 맡으면 우선순위 충돌이 잦음.',
      approach: '화면을 디자인 → 컴포넌트로 분해 → 구현 순으로 단계화하고, 각 단계의 완료 기준을 명확히 정함.',
      result: '디자인 변경이 구현 막바지에 일어나는 것을 막고, 기획 의도가 화면에 일관되게 반영.',
    },
    {
      problem: 'API fetch token error로 인해 Promise 객체가 그대로 렌더링되는 이슈.',
      approach: 'token refresh logic을 별도 훅으로 분리하고, fetch timing을 loading state로 가시화. 댓글 응답 조건도 함께 정리.',
      result: '에러 시점에 사용자에게 명확한 피드백 + 새로고침 없이도 정상 복구.',
    },
    {
      problem: 'Netlify에 SPA 배포 시 새로고침마다 404가 발생.',
      approach: '_redirects 파일로 모든 경로를 index.html로 fallback 처리.',
      result: '딥링크 / 새로고침 시에도 정상 동작.',
    },
  ],
  contributions: ['UI/UX 디자인', 'React.js 프런트엔드 구현 (게임 매치 · 코드 제출 · 토큰 갱신)', 'Netlify 배포 설정'],
  links: [
    {
      label: 'Frontend repo',
      url: 'https://github.com/Algo-Sports/algo-sports-front',
      type: 'github',
    },
    {
      label: 'API repo',
      url: 'https://github.com/Algo-Sports/Algo-sports-api',
      type: 'github',
    },
    { label: 'Organization', url: 'https://github.com/Algo-Sports', type: 'github' },
  ],
  hero: `${IMG}/avatar.png`,
  media: [{ type: 'image', url: `${IMG}/avatar.png`, caption: 'AlgoSports 팀 로고' }],
}
