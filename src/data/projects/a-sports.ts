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
  stack: ['React', 'JavaScript', 'Canvas API', 'Netlify'],
  oneLiner:
    'AlgoSports: 알고리즘을 게임처럼 즐기면서 공부할 수 있도록 돕는 알고리즘 게임 플랫폼.',
  description:
    '<p>AlgoSports 는 알고리즘 학습을 게임화한 플랫폼입니다. (백엔드 README 원문)</p>' +
    '<p>프런트엔드(<code>algo-sports-front</code>) 를 담당했습니다.</p>' +
    '<p>구현 범위:</p>' +
    '<ul>' +
    '<li>게임 매치 / 참여자 목록</li>' +
    '<li>코드 제출 / 댓글 / 답글</li>' +
    '<li>토큰 갱신</li>' +
    '<li>Canvas 게임 화면</li>' +
    '</ul>' +
    '<p>React 로 작성하고 Netlify 에 배포했습니다.</p>',
  features: [
    {
      title: 'React SPA',
      content: [
        '게임 매치 / 참여자 목록',
        '게임 dummy 데이터 포맷',
        '게임 페이지 API 연결',
      ],
    },
    {
      title: 'Canvas API',
      content: [
        '게임 화면 렌더링',
      ],
    },
    {
      title: '댓글 흐름',
      content: [
        '코드 제출',
        '댓글 / 답글',
        '댓글 입력 (textArea UI)',
        '댓글 응답 조건 처리',
      ],
    },
    {
      title: '토큰 갱신',
      content: [
        'API fetch 토큰 자동 갱신',
        'fetch timing 을 loading state 로 가시화',
      ],
    },
    {
      title: 'SPA 배포',
      content: [
        'Netlify 사용',
        '<code>_redirects</code> 로 reload 시 404 우회',
      ],
    },
    {
      title: '데이터 렌더링',
      content: [
        'profile / game / post 데이터 표시',
      ],
    },
  ],
  challenges: [
    {
      title: 'API fetch token 오류 → Promise 객체가 그대로 렌더링되는 이슈',
      tags: ['React', 'Token refresh', 'Loading state'],
      problem:
        '<p>fetch 결과로 받은 Promise 가 토큰 만료 / 오류 상태에서 그대로 화면에 렌더링됐습니다.</p>' +
        '<p>사용자에게 의미 없는 출력이 노출되는 버그가 있었습니다.</p>',
      approach:
        '<ul>' +
        '<li>token refresh 로직을 별도로 분리</li>' +
        '<li>fetch timing 을 loading state 로 명시적으로 표현</li>' +
        '<li>댓글 응답 조건도 함께 정리</li>' +
        '</ul>',
      result:
        '<p>에러 시점에 사용자에게 명확한 피드백이 가고, 새로고침 없이도 자연스럽게 복구됩니다.</p>',
    },
    {
      title: 'Netlify SPA 배포 reload 404',
      tags: ['Netlify', 'SPA fallback'],
      problem:
        '<p>Netlify 에 SPA 를 그대로 올리면 새로고침마다 404 가 발생합니다.</p>',
      approach:
        '<p><code>_redirects</code> 파일로 모든 경로를 <code>index.html</code> 로 fallback 처리했습니다.</p>',
      result:
        '<p>딥링크 / 새로고침 시에도 정상 동작합니다.</p>',
    },
    {
      title: 'Canvas 게임 화면: 데이터 포맷과 렌더링 분리',
      tags: ['Canvas API', 'React state'],
      problem:
        '<p>게임 dummy 데이터 포맷과 실제 Canvas 렌더링이 섞이면서 변경 비용이 컸습니다.</p>',
      approach:
        '<ol>' +
        '<li>게임 dummy 데이터 포맷을 먼저 안정화</li>' +
        '<li>Canvas 렌더링을 그 위에 얹음</li>' +
        '<li>dummy 단계에서 UI 를 먼저 다듬고 API 를 나중에 붙임</li>' +
        '</ol>',
      result:
        '<p>API 가 늦게 붙어도 화면 작업이 멈추지 않습니다. 데이터 포맷 변경이 한 곳에서만 일어납니다.</p>',
    },
  ],
  contributions: [
    '<strong>React 프런트엔드</strong>(<code>algo-sports-front</code>). 게임 매치 / 코드 제출 / 댓글 / 답글 / 토큰 갱신 흐름 구현.',
    '<strong>Canvas API</strong>. 게임 화면 렌더링.',
    '<strong>배포</strong>. Netlify + <code>_redirects</code> SPA fallback.',
  ],
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
