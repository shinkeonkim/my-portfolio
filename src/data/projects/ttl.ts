import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/my-portfolio/images/projects/ttl'

export const ttl: Project = {
  slug: 'ttl',
  name: 'TTL: Today They Learned',
  subtitle: '여러 플랫폼의 TIL을 한 곳에 모아보는 서비스',
  period: { start: '2022-01', end: '2022-04' },
  scale: 'side',
  status: 'completed',
  roles: ['팀리드', '백엔드', '인프라', '기획', '디자이너'],
  team: { size: 4, lead: true },
  stack: [
    'Django',
    'DRF',
    'Python',
    'Celery',
    'django-celery-beat',
    'Redis',
    'RabbitMQ',
    'drf-yasg (Swagger / Redoc)',
    'Docker',
    'docker-compose',
    'React',
    'Redux',
    'styled-components',
    'Netlify',
    'pre-commit',
  ],
  oneLiner: 'Github · Tistory · velog 에 흩어진 TIL 을 한 피드에서 모아보는 서비스.',
  description:
    '<p>여러 플랫폼에 흩어진 TIL(Today I Learned, 개발자가 그날 배운 내용을 정리하는 글) 을 한 곳에 모아 보는 서비스입니다.</p>' +
    '<p>대상 플랫폼은 GitHub / Tistory / velog 입니다. TTL 안에서 직접 글을 쓸 수도 있고, 외부 플랫폼의 글을 가져오거나 주기적으로 동기화할 수도 있습니다.</p>' +
    '<p>팀리드로서 도메인과 협업 구조를 설계하고 백엔드 + 인프라를 담당했습니다. <code>todaytheylearn.com</code> 도메인에서 실제 운영했습니다.</p>',
  features: [
    {
      title: 'TIL 피드 기능',
      content: [
        '작성 / 댓글',
        '북마크 / 팔로우',
        '이모지 리액션',
      ],
    },
    {
      title: '외부 글 통합',
      content: [
        '대상 플랫폼: GitHub / velog',
        '외부 글 가져오기 + 주기 동기화',
        'Celery + django-celery-beat 기반',
      ],
    },
    {
      title: '플랫폼 어댑터 추상화',
      content: [
        '새 플랫폼 추가 시 어댑터만 작성',
        '재시도 / 백오프는 공통 인프라가 처리',
      ],
    },
    {
      title: 'article sub API',
      content: [
        '글 상세와 feedback 을 한 번에 반환',
        '네트워크 왕복 절감',
      ],
    },
    {
      title: '자동 문서화',
      content: [
        'drf-yasg 로 Swagger / Redoc 자동 생성',
        '모델 / 시리얼라이저 변경이 즉시 문서에 반영',
      ],
    },
    {
      title: '무중단 운영',
      content: [
        'docker-compose 기반',
        '<code>restart: always</code> 정책',
      ],
    },
    {
      title: '협업 자동화',
      content: [
        'pre-commit 으로 스타일 강제',
        'GitHub Flow 기반 브랜치 전략',
      ],
    },
  ],
  challenges: [
    {
      title: '외부 플랫폼 동기화: 어댑터 추상화 + 신뢰성 있는 메시지 브로커',
      tags: ['Celery', 'django-celery-beat', 'RabbitMQ', 'Adapter'],
      problem:
        '<p>외부 플랫폼 동기화는 다음 이유로 실패가 빈번할 수 있었습니다.</p>' +
        '<ul>' +
        '<li>RSS / HTML 구조가 자주 바뀜</li>' +
        '<li>호출 한도 존재</li>' +
        '</ul>',
      approach:
        '<ul>' +
        '<li>Celery + django-celery-beat 로 주기 동기화 스케줄</li>' +
        '<li>플랫폼별 어댑터 추상화</li>' +
        '<li>실패 시 재시도 / 백오프 적용</li>' +
        '<li>메시지 브로커는 신뢰성을 위해 RabbitMQ 채택</li>' +
        '</ul>',
      result:
        '<p>동기화 누락이 줄었습니다. 새 플랫폼을 추가할 때 어댑터 한 개만 구현하면 되는 구조가 정리됐습니다.</p>',
    },
    {
      title: 'article sub API: 글 상세 + feedback 묶음 반환',
      tags: ['API design'],
      problem:
        '<p>글 상세와 feedback 을 별도로 호출하면 상세 페이지 진입이 느렸습니다.</p>',
      approach:
        '<p>feedback 을 함께 반환하는 article sub API 를 별도 설계했습니다.</p>',
      result:
        '<p>네트워크 왕복이 줄어 상세 페이지 진입 속도가 체감 가능하게 빨라졌습니다.</p>',
    },
    {
      title: '환경별 CORS 설정 안정화',
      tags: ['CORS', 'Django settings'],
      problem:
        '<p>CORS 설정이 개발 / 배포 환경별로 다르게 동작해 배포마다 깨졌습니다.</p>',
      approach:
        '<ul>' +
        '<li>환경별 settings 를 환경 변수로 분리</li>' +
        '<li>commit 단위로 디버깅 사이클을 짧게 가져가며 정상 동작 검증</li>' +
        '</ul>',
      result:
        '<p>환경별 settings 가 최종적으로 안정된 형태로 자리잡았습니다.</p>',
    },
    {
      title: 'Swagger 자동화로 프론트엔드 협업 비용 절감',
      tags: ['drf-yasg', 'Swagger', 'Redoc'],
      problem:
        '<p>API 가 빠르게 늘면서 프론트엔드와의 인터페이스 명세 비용이 커졌습니다.</p>',
      approach:
        '<ul>' +
        '<li>drf-yasg 로 Swagger / Redoc 을 자동 생성</li>' +
        '<li>모델 / 시리얼라이저 변경이 즉시 문서에 반영되도록 구성</li>' +
        '</ul>',
      result:
        '<p>프론트엔드와의 의사소통 비용이 줄었습니다. 변경 이력이 문서에 자연스럽게 따라왔습니다.</p>',
    },
  ],
  contributions: [
    '<strong>팀리드</strong>. 도메인 설계 및 협업 구조 수립 (백엔드 김신건 / 진승희 / 최지현).',
    '<strong>외부 플랫폼 동기화</strong>. Celery + django-celery-beat 기반 + 어댑터 추상화.',
    '<strong>API / 문서화</strong>. drf-yasg Swagger · Redoc 자동 문서화 + article sub API 설계.',
    '<strong>인프라 / 협업</strong>. docker-compose + <code>restart: always</code> 운영 + 테스트 환경 세팅 + pre-commit 표준화.',
    '<strong>운영</strong>. <code>todaytheylearn.com</code> 도메인에서 실제 운영.',
  ],
  links: [
    { label: '운영 사이트', url: 'https://todaytheylearn.com/', type: 'demo' },
    { label: 'Swagger', url: 'https://api.todaytheylearn.com/', type: 'article' },
    { label: 'API repo', url: 'https://github.com/today-they-learned/ttl_api', type: 'github' },
    { label: 'Frontend repo', url: 'https://github.com/today-they-learned/ttl_front', type: 'github' },
  ],
  hero: `${IMG}/main.png`,
  media: [
    { type: 'image', url: `${IMG}/main.png`, caption: '서비스 메인 화면: 통합 TIL 피드' },
    { type: 'image', url: `${IMG}/demo.gif`, caption: '데모 GIF: 동기화 인터랙션' },
    { type: 'image', url: `${IMG}/docs/total-model.png`, caption: '전체 모델 스키마' },
    { type: 'image', url: `${IMG}/docs/db-schema.png`, caption: 'DB 스키마' },
    { type: 'image', url: `${IMG}/docs/swagger.png`, caption: 'Swagger API 문서' },
    { type: 'image', url: `${IMG}/docs/redoc.png`, caption: 'Redoc API 문서' },
  ],
  presentation: {
    title: 'TTL 발표 자료',
    caption: '8페이지',
    totalPages: 8,
    pdfUrl: '/my-portfolio/docs/ttl-presentation.pdf',
    pageImages: presentationPages('ttl', 8),
  },
}
