import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/peacepiece'

export const peacepiece: Project = {
  slug: 'peacepiece',
  name: 'PeacePiece',
  subtitle: '환경 보호 활동 기반 가상 공간 꾸미기 웹 플랫폼',
  period: { start: '2022-07', end: '2022-09' },
  scale: 'side',
  status: 'completed',
  roles: ['팀리드', '백엔드', '인프라', '디자이너', '기획'],
  team: { size: 5, lead: true },
  stack: ['Django', 'DRF', 'Python', 'Docker', 'PostgreSQL', 'AWS EC2', 'AWS ELB', 'Nginx'],
  oneLiner: '환경 보호 챌린지 참여로 포인트를 얻고, 나만의 섬을 꾸미는 게이미피케이션 환경 플랫폼.',
  description:
    '사용자들이 일상에서 실천 가능한 환경 보호 활동을 챌린지 형태로 제안하고 참여하면, 포인트를 모아 "나만의 섬"을 확장·장식할 수 있는 SNS형 플랫폼입니다. 멸종 위기종 입양 등 게이미피케이션 요소를 통해 환경 보호 활동의 지속성을 유도합니다.',
  features: [
    '환경 보호 챌린지 제안·참여·인증 (인증 글 작성 시 챌린지 인증 수 자동 갱신)',
    '포인트 기반 가상 섬 꾸미기 및 멸종 위기종 입양',
    '환경 SNS 커뮤니티 "피스" — 게시글 · 댓글 · 피드백',
    '아이템 구매 / 상점 시스템 · 종류별 보유 개수 API',
    '유저 활동 알림 (읽지 않은 알림 우선 노출 + 이메일 알림 설정)',
    '추천 챌린지 (없을 때 진행중 챌린지 fallback)',
    'pre-commit · flake8 기반 코드 스타일 통일 및 PR 템플릿/리뷰 프로세스',
  ],
  challenges: [
    {
      problem: '5인 팀에서 협업 품질과 속도를 동시에 잡아야 함.',
      approach: 'Github Flow + branch protection rule + PR template + pre-commit(flake8)을 도입.',
      result: '리뷰 누락과 스타일 충돌 없이 7주간 안정적으로 협업.',
    },
    {
      problem: '게임 요소와 환경 콘텐츠가 섞여 도메인이 복잡해짐.',
      approach: '챌린지 / 포인트 / 섬 / 아이템 / 입양 / 알림을 별도 도메인 모델로 분리. 인증 글 작성 등 액션 단위 이벤트로 포인트 변동을 추적.',
      result: '신규 챌린지 유형 추가 시에도 기존 도메인을 거의 건드리지 않고 확장.',
    },
    {
      problem: 'article feedback 집계 쿼리가 글 목록 API에서 N+1로 느려짐.',
      approach: 'feedback 뽑는 로직을 한 번의 prefetch + annotate 쿼리로 리팩토링.',
      result: '글 목록 API 응답 시간 단축, 추가 쿼리 다수 제거.',
    },
    {
      problem: 'nginx 기본 설정으로는 정적 파일·미디어 응답 시간이 일정치 않음.',
      approach: 'nginx config 튜닝 (캐시·gzip), static/media 디렉터리 명명 통일, 별도 health-check 서버 분리.',
      result: '정적 응답 안정화 + 헬스체크와 일반 트래픽 분리로 모니터링 명확.',
    },
  ],
  contributions: [
    '팀리드 — 일정 조율 및 기술 의사결정',
    'Django/DRF API 설계 및 구현 (포인트 · 아이템 · 알림 · 챌린지 · 인증)',
    'Docker(docker-compose) 활용 서버 이미지 빌드 구조 구축',
    'nginx 튜닝 + health-check 서버 분리 + AWS EC2/ELB 인프라',
    'article feedback 쿼리 최적화',
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
    { type: 'image', url: `${IMG}/04.png`, caption: '나의 섬 — 게이미피케이션' },
    { type: 'image', url: `${IMG}/05.png`, caption: '상점 / 아이템' },
    { type: 'image', url: `${IMG}/06.png`, caption: '입양 — 멸종 위기종' },
  ],
}
