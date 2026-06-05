import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/daedong-mokjido'

export const daedongMokjido: Project = {
  slug: 'daedong-mokjido',
  name: '대동먹지도',
  subtitle: '소소한 길거리 먹거리 지도 서비스',
  period: { start: '2021-08', end: '2021-08' },
  scale: 'side',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 4, lead: false },
  stack: ['Django', 'DRF', 'React.js', 'Docker', 'PostgreSQL'],
  oneLiner: '델리만쥬·호떡·순대트럭 등 일반 리뷰 사이트가 다루지 않는 먹거리 정보를 모은 지도 서비스.',
  description:
    '음식점 리뷰 사이트가 잘 다루지 않는 길거리 먹거리(델리만쥬, 호떡, 순대트럭 등)의 위치·영업시간·맛 정보를 사용자 제보로 수집하고, 관리자 검수 후 지도에 노출하는 서비스입니다. 사용자 제보·리뷰·신고에 리워드를 제공해 선순환을 유도했습니다.',
  features: [
    '제보 · 지도 · 검색 · 리뷰 · 신고 5가지 핵심 기능',
    '관리자 검수 후 지도 노출 (report published 후엔 수정 불가)',
    '북마크 토글 + 카운트 갱신 (Placeserializer에 is_bookmarked 포함)',
    '평점 자동 갱신 (review total_score, 평균 점수 소수 계산)',
    '제보 시 좌표 자동 추가 + 주변 범위 임시 확장',
    '빈 검색어 허용 (검색 초기화 가능)',
    'CORS settings + 로그인/회원가입 통합',
    'React 프런트엔드 + Django DRF 백엔드 분리 구조',
  ],
  challenges: [
    {
      problem: '사용자 제보의 신뢰도 확보가 어려움.',
      approach: '관리자 검수 단계 + 신고/리뷰 시스템을 결합. report published 상태 이후엔 patch도 막아 데이터 일관성 보호.',
      result: '신뢰 가능한 정보만 지도에 노출되도록 데이터 품질을 유지.',
    },
    {
      problem: '리뷰가 추가/수정될 때마다 평점 평균을 매번 계산하면 비효율.',
      approach: 'review 저장 시 total_score를 즉시 갱신하는 로직을 추가하고, 평균은 소수로 계산해 정밀도 유지.',
      result: '목록 조회 시 평균 계산 부담 제거 + 화면에 즉시 반영.',
    },
    {
      problem: '제보된 장소의 좌표가 누락되거나, 사용자 현재 위치 주변 검색 결과가 비어버림.',
      approach: '제보 시 주소 → 좌표 자동 변환을 추가하고, 주변 범위를 임시로 확장.',
      result: '검색 결과 비어있는 케이스 감소 + 신규 제보의 좌표 누락 0건.',
    },
  ],
  contributions: [
    'Django/DRF API 서버 구현 (제보 · 리뷰 · 북마크 · 신고)',
    'PostgreSQL 도메인 모델 설계 + 좌표 자동화 + 평점 갱신 로직',
    'CORS / 로그인 · 회원가입 통합 settings',
  ],
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/likelion-kookmin/daedong-food-map',
      type: 'github',
    },
  ],
  hero: `${IMG}/main.png`,
  media: [
    { type: 'image', url: `${IMG}/main.png`, caption: '지도 기반 길거리 먹거리 서비스 — 메인 화면' },
  ],
}
