import type { Project } from '@/types'

const IMG = '/images/projects/a-sports'

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
    '<p>AlgoSports 는 알고리즘 학습을 게임화한 플랫폼입니다. </p>' +
    '<p>프론트엔드(<code>algo-sports-front</code>) 를 담당했습니다.</p>' +
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
        '<p>토큰이 만료되거나 요청이 실패하면, 처리되지 않은 Promise가 화면에 그대로 노출됐습니다.</p>',
      approach:
        '<ul>' +
        '<li>토큰 갱신 로직을 요청 흐름에서 분리했습니다.</li>' +
        '<li>요청 상태를 loading state로 명시했습니다.</li>' +
        '<li>댓글 응답의 렌더링 조건을 함께 정리했습니다.</li>' +
        '</ul>',
      result:
        '<p>오류 상태를 명확히 안내하고, 토큰 갱신 뒤에는 새로고침 없이 화면을 복구했습니다.</p>',
    },
    {
      title: 'Netlify SPA 배포 reload 404',
      tags: ['Netlify', 'SPA fallback'],
      problem:
        '<p>SPA의 하위 경로를 직접 열거나 새로고침하면 Netlify가 해당 파일을 찾지 못해 404를 반환했습니다.</p>',
      approach:
        '<p><code>_redirects</code> 파일로 모든 경로를 <code>index.html</code> 로 fallback 처리했습니다.</p>',
      result:
        '<p>딥링크로 접근하거나 새로고침해도 SPA 라우트가 정상적으로 열렸습니다.</p>',
    },
    {
      title: 'Canvas 게임 화면: 데이터 포맷과 렌더링 분리',
      tags: ['Canvas API', 'React state'],
      problem:
        '<p>게임의 임시 데이터 형식과 Canvas 렌더링 로직이 섞여 있어 한쪽 변경이 다른 쪽까지 번졌습니다.</p>',
      approach:
        '<ol>' +
        '<li>게임 데이터 형식을 먼저 확정했습니다.</li>' +
        '<li>확정된 형식 위에 Canvas 렌더링을 구현했습니다.</li>' +
        '<li>임시 데이터로 UI를 완성한 뒤 API를 연결했습니다.</li>' +
        '</ol>',
      result:
        '<p>API 일정과 관계없이 화면 개발을 이어갔고, 데이터 형식의 변경 지점도 한 곳으로 모았습니다.</p>',
    },
  ],
  contributions: [
    '<strong>React 프론트엔드</strong>(<code>algo-sports-front</code>). 게임 매치 / 코드 제출 / 댓글 / 답글 / 토큰 갱신 흐름 구현.',
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
