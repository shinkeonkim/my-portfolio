import type { Project } from '@/types'

const IMG = '/images/projects/peacepiece'

export const peacepiece: Project = {
  slug: 'peacepiece',
  name: 'PeacePiece',
  subtitle: '환경 보호 활동 기반 가상 공간 꾸미기 웹 플랫폼',
  period: { start: '2022-07', end: '2022-09' },
  scale: 'side',
  status: 'completed',
  roles: ['기획', '백엔드', '프론트엔드', '인프라', '디자인'],
  team: { size: 6, lead: true },
  stack: [
    'Django',
    'PostgreSQL',
    'Docker',
    'React',
    'TypeScript',
    'Netlify',
  ],
  oneLiner: '환경 보호 챌린지 참여로 포인트를 얻고, 나만의 섬을 꾸미는 게이미피케이션 환경 플랫폼.',
  description:
    '<p>환경 보호 활동을 게이미피케이션으로 지속하게 만드는 SNS 형 플랫폼입니다.</p>' +
    '<p>주요 흐름은 다음과 같습니다.</p>' +
    '<ol>' +
    '<li>일상에서 실천 가능한 환경 보호 챌린지를 제안 / 참여</li>' +
    '<li>인증 글을 작성하면 포인트 적립</li>' +
    '<li>포인트로 "나만의 섬" 을 꾸미거나 멸종 위기종을 입양</li>' +
    '</ol>' +
    '<p>6인 팀에서 도메인 설계부터 인프라까지 책임졌습니다. README 의 본인 역할은 "기획 / 백엔드 / 프론트엔드 / 프로젝트 전반의 개발 관리 · 진행" 으로 명시되어 있습니다.</p>',
  features: [
    {
      title: '환경 보호 챌린지',
      content: [
        '제안 / 참여 / 인증 흐름',
        '인증 글 작성 시 챌린지 인증 수가 자동 갱신',
      ],
    },
    {
      title: '포인트 기반 보상',
      content: [
        '게이미피케이션으로 환경 보호 지속성 강화',
        '"나의 섬" 확장',
        '아이템 구매',
        '멸종 위기종 입양',
      ],
    },
    {
      title: 'SNS 커뮤니티 "피스"',
      content: [
        '게시글 / 댓글 / 피드백',
        '환경 정보 공유',
      ],
    },
    {
      title: '인증 / 인가',
      content: [
        'dj-rest-auth + django-allauth 기반',
        'simplejwt 로 토큰 발급',
      ],
    },
    {
      title: '알림 시스템',
      content: [
        '읽지 않은 알림 우선 노출',
        '이메일 알림 설정',
        '추천 챌린지가 없으면 진행 중 챌린지로 fallback',
      ],
    },
    {
      title: '문서화 / 어드민',
      content: [
        'drf-yasg 로 Swagger 자동 문서화',
        'django-jazzmin 으로 운영자 어드민 UI',
      ],
    },
    {
      title: '협업 자동화',
      content: [
        'pre-commit + flake8',
        'GitHub Flow + branch protection',
        'PR template',
      ],
    },
  ],
  challenges: [
    {
      title: '게임 요소와 환경 콘텐츠를 도메인 분리',
      tags: ['Domain modeling', 'Django'],
      problem:
        '<p>환경 실천 콘텐츠와 게임 요소가 한 모델에 섞이면 규칙 변경이 서로 영향을 줄 수 있었습니다.</p>' +
        '<ul>' +
        '<li>챌린지 / 인증 / 포인트</li>' +
        '<li>섬 / 아이템 / 입양</li>' +
        '<li>알림</li>' +
        '</ul>',
      approach:
        '<ul>' +
        '<li>챌린지, 게임, 알림 영역을 별도 도메인 모델로 분리했습니다.</li>' +
        '<li>인증 글 작성과 챌린지 완료를 이벤트로 정의해 포인트 변동을 추적했습니다.</li>' +
        '</ul>',
      result:
        '<p>새 챌린지, 아이템, 알림을 추가할 때 다른 도메인의 규칙을 거의 수정하지 않고 확장했습니다.</p>',
    },
    {
      title: 'article feedback 집계 N+1 제거',
      tags: ['ORM', 'prefetch', 'annotate'],
      problem:
        '<p>글 목록에서 article마다 feedback을 다시 조회하고 집계해 N+1 쿼리가 발생했습니다.</p>',
      approach:
        '<p><code>prefetch_related</code>와 <code>annotate</code>로 feedback 조회와 집계를 한 번에 처리했습니다.</p>',
      result:
        '<p>article별 반복 쿼리를 제거해 글 목록 API의 응답 시간을 줄였습니다.</p>',
    },
    {
      title: 'nginx 튜닝과 health-check 트래픽 분리',
      tags: ['nginx', 'AWS ELB'],
      problem:
        '<p>기본 nginx 설정으로는 두 가지 문제가 있었습니다.</p>' +
        '<ul>' +
        '<li>정적 파일 / 미디어 응답이 일정치 않음</li>' +
        '<li>ELB 헬스 체크와 일반 트래픽이 섞임</li>' +
        '</ul>',
      approach:
        '<ul>' +
        '<li>nginx의 캐시와 gzip 설정을 조정하고 디렉터리 이름을 통일했습니다.</li>' +
        '<li>헬스 체크 엔드포인트를 일반 요청과 분리했습니다.</li>' +
        '</ul>',
      result:
        '<p>정적 파일 응답을 안정화하고, 헬스 체크를 분리해 운영 모니터링의 노이즈를 줄였습니다.</p>',
    },
    {
      title: '협업 품질을 자동화로 잡기',
      tags: ['pre-commit', 'GitHub Flow', 'PR template'],
      problem:
        '<p>6명이 짧은 주기로 개발하면서도 리뷰 누락과 코드 스타일 충돌을 막아야 했습니다.</p>',
      approach:
        '<ul>' +
        '<li>GitHub Flow와 branch protection으로 병합 절차를 통일했습니다.</li>' +
        '<li>PR template으로 리뷰에 필요한 맥락을 표준화했습니다.</li>' +
        '<li>pre-commit과 flake8로 스타일 검사를 자동화했습니다.</li>' +
        '</ul>',
      result:
        '<p>리뷰와 스타일 검사를 자동화해 짧은 개발 주기를 유지하면서 협업 충돌을 줄였습니다.</p>',
    },
  ],
  contributions: [
    {
      title: '프로젝트 전반',
      summary: '기획 / 디자인 / 백엔드 / 프론트엔드 전반의 개발 관리 · 진행.',
    },
    {
      title: 'API 설계',
      summary: 'Django + DRF 위에서 도메인을 설계.',
      items: ['포인트 / 아이템 / 알림', '챌린지 / 인증', '입양 / 섬'],
    },
    {
      title: '인증 / 문서화',
      summary:
        'dj-rest-auth + django-allauth + simplejwt 기반 인증 / 인가 + drf-yasg 자동 문서화.',
    },
    {
      title: '인프라',
      summary: 'docker-compose 빌드 구조 + nginx 튜닝 + health-check 트래픽 분리 + AWS EC2 / ELB.',
    },
    {
      title: '성능 개선',
      summary:
        'article feedback <code>prefetch_related</code> + <code>annotate</code> 리팩토링으로 글 목록 API N+1 제거.',
    },
    {
      title: '협업 자동화',
      summary: 'pre-commit / GitHub Flow / PR template.',
    },
  ],
  links: [
    {
      label: 'API repo',
      url: 'https://github.com/today-they-learned/peacepiece_api',
      type: 'github',
    },
    {
      label: 'Frontend repo',
      url: 'https://github.com/today-they-learned/peacepiece_front',
      type: 'github',
    },
    {
      label: '시연 영상',
      url: 'https://www.youtube.com/watch?v=8OakU0-HIYQ',
      type: 'video',
    },
  ],
  hero: `${IMG}/01.png`,
  media: [
    { type: 'youtube', url: 'https://www.youtube.com/embed/8OakU0-HIYQ', caption: '시연 영상' },
    { type: 'image', url: `${IMG}/01.png`, caption: '서비스 메인' },
    { type: 'image', url: `${IMG}/02.png`, caption: '챌린지 화면' },
    { type: 'image', url: `${IMG}/03.png`, caption: '인증 / 피드' },
    { type: 'image', url: `${IMG}/04.png`, caption: '나의 섬: 게이미피케이션' },
    { type: 'image', url: `${IMG}/05.png`, caption: '상점 / 아이템' },
    { type: 'image', url: `${IMG}/06.png`, caption: '입양: 멸종 위기종' },
  ],
}
