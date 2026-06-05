import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/ttl'

export const ttl: Project = {
  slug: 'ttl',
  name: 'TTL — Today They Learned',
  subtitle: '여러 플랫폼의 TIL을 한 곳에 모아보는 서비스',
  period: { start: '2022-01', end: '2022-04' },
  scale: 'side',
  status: 'completed',
  roles: ['팀리드', '백엔드', '인프라', '기획', '디자이너'],
  team: { size: 4, lead: true },
  stack: ['Django', 'DRF', 'Python', 'Celery', 'Redis', 'RabbitMQ', 'Docker', 'React.js', 'pre-commit'],
  oneLiner: 'Github / Velog / Tistory에 흩어진 TIL을 한 피드에서 모아보는 서비스.',
  description:
    'TIL(Today I Learned)을 Github, Tistory, Velog 등 다양한 플랫폼에서 수집·동기화해 한 화면에서 모아 보여주는 서비스입니다. 팀리드로서 도메인/협업 구조를 설계하고 백엔드 + 인프라를 담당했으며, todaytheylearn.com 도메인에서 실제 운영되었습니다.',
  features: [
    'TIL 피드 / 작성 / 댓글 / 북마크 / 팔로우',
    'GitHub / Velog 외부 글 가져오기 + 주기 동기화 (Celery + django_celery_beat)',
    'TIL 이모지 리액션 + Sub API (한 API에서 글·피드백 동시 반환)',
    'Swagger / Redoc 기반 API 문서화',
    'pre-commit 강제 + 테스트 환경 세팅으로 협업 품질 확보',
    'docker-compose + restart: always 옵션으로 무중단 운영',
  ],
  challenges: [
    {
      problem: '외부 플랫폼의 RSS/HTML 구조가 자주 바뀌고, 호출 한도가 있음.',
      approach:
        'Celery + django_celery_beat로 주기 동기화. 플랫폼별 어댑터를 추상화. 실패 시 재시도/백오프 적용. RabbitMQ를 message broker로 채택해 신뢰성 확보.',
      result: '동기화 누락을 줄이고, 신규 플랫폼 추가 시 어댑터만 작성하면 되는 구조 확보.',
    },
    {
      problem: '프런트엔드 협업 인터페이스가 명확해야 함.',
      approach: 'drf-yasg로 Swagger 문서를 자동 생성하고, 모델/시리얼라이저 변경이 즉시 문서에 반영되도록 구성.',
      result: '프런트엔드 개발자와의 의사소통 비용 감소.',
    },
    {
      problem: 'CORS 설정이 환경별로 다르게 동작하고, 배포 시마다 오류 발생.',
      approach:
        '운영/개발/배포 환경별 CORS 설정을 환경변수로 분리. 정상 동작 검증을 위해 commit 단위로 디버깅 사이클을 짧게 가져감.',
      result: '최종 안정 settings 확보 (실제로 18회 fix commit 끝에 안정화).',
    },
    {
      problem: '글 상세 + 피드백을 별도 호출하면 화면 진입이 느림.',
      approach: 'article sub API를 만들어 feedback을 묶어서 반환.',
      result: '상세 페이지 진입 시 네트워크 왕복 1회 절감.',
    },
  ],
  contributions: [
    '팀리드 — 도메인 설계 및 협업 구조 수립',
    'Celery + django_celery_beat 기반 TIL 동기화 기능 개발',
    'Swagger/drf-yasg API 문서화 + sub API 설계',
    'docker-compose + restart 옵션 + 테스트 환경 세팅',
  ],
  links: [
    { label: '운영 사이트', url: 'https://todaytheylearn.com/', type: 'demo' },
    { label: 'Swagger', url: 'https://api.todaytheylearn.com/', type: 'article' },
    { label: 'API repo', url: 'https://github.com/today-they-learned/ttl_api', type: 'github' },
    { label: 'Frontend repo', url: 'https://github.com/today-they-learned/ttl_front', type: 'github' },
  ],
  hero: `${IMG}/main.png`,
  media: [
    { type: 'image', url: `${IMG}/main.png`, caption: '서비스 메인 화면 — 통합 TIL 피드' },
    { type: 'image', url: `${IMG}/demo.gif`, caption: '데모 GIF — 동기화 인터랙션' },
    { type: 'image', url: `${IMG}/docs/total-model.png`, caption: '전체 모델 스키마' },
    { type: 'image', url: `${IMG}/docs/db-schema.png`, caption: 'DB 스키마' },
    { type: 'image', url: `${IMG}/docs/swagger.png`, caption: 'Swagger API 문서' },
    { type: 'image', url: `${IMG}/docs/redoc.png`, caption: 'Redoc API 문서' },
  ],
}
