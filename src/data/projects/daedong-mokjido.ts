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
  stack: [
    'Django',
    'DRF',
    'PostgreSQL',
    'Docker',
    'React',
    'Redux',
    'redux-saga',
    'KakaoMap API',
    'Heroku',
    'Netlify',
  ],
  oneLiner:
    '"델리만쥬 · 호떡 · 순대트럭" 같은 사소한 길거리 먹거리 정보를 함께 만드는 지도 서비스.',
  description:
    '<p>흔한 음식점 리뷰 사이트가 잘 다루지 않는 길거리 먹거리 정보를 모으는 서비스입니다.</p>' +
    '<p>다음 같은 정보를 사용자 제보로 수집합니다.</p>' +
    '<ul>' +
    '<li>어디 있는지</li>' +
    '<li>언제 여는지</li>' +
    '<li>맛은 있는지</li>' +
    '</ul>' +
    '<p>검수 후 지도에 노출됩니다. 제보 / 리뷰 / 신고에 리워드를 부여해 선순환을 만들었습니다.</p>' +
    '<p>기술 스택은 다음과 같습니다.</p>' +
    '<ul>' +
    '<li><strong>프런트엔드</strong>: React + Redux + redux-saga + KakaoMap</li>' +
    '<li><strong>백엔드</strong>: Django + DRF</li>' +
    '<li><strong>리포지토리</strong>: 같은 레포에서 두 코드를 분리 관리</li>' +
    '<li><strong>배포</strong>: 백엔드 Heroku(git subtree) + 프런트엔드 Netlify</li>' +
    '</ul>',
  features: [
    {
      title: '핵심 흐름',
      content: [
        '제보 / 지도',
        '검색',
        '리뷰 / 신고',
      ],
    },
    {
      title: '검수 후 지도 노출',
      content: [
        'published 상태 이후로는 patch 차단',
        '데이터 일관성 보호',
      ],
    },
    {
      title: '좌표 자동화',
      content: [
        '제보 시 주소 → 좌표 자동 변환',
        '주변 범위 임시 확장으로 검색 빈 결과 감소',
      ],
    },
    {
      title: '북마크',
      content: [
        '토글 + 카운트 자동 갱신',
        'Place serializer 에 <code>is_bookmarked</code> 포함',
      ],
    },
    {
      title: '평점 캐시',
      content: [
        '리뷰 저장 시 평점 평균이 자동 갱신',
        '목록 조회 시 매번 다시 계산하지 않음',
      ],
    },
    {
      title: '빈 검색어 허용',
      content: [
        '검색 초기화가 가능',
      ],
    },
    {
      title: '지도 연동',
      content: [
        'KakaoMap Web API 사용 (1일 30만 호출 무료 한도)',
        '지도 + 주변 매장 마커 표시',
      ],
    },
    {
      title: '자동 배포',
      content: [
        '백엔드: Heroku (git subtree)',
        '프런트엔드: Netlify',
      ],
    },
  ],
  challenges: [
    {
      title: '사용자 제보의 신뢰도와 데이터 일관성',
      tags: ['Curation', 'Data integrity'],
      problem:
        '<p>제보가 자유롭다 보니 신뢰도와 데이터 일관성을 지키기 어려웠습니다.</p>',
      approach:
        '<ul>' +
        '<li>관리자 검수 단계와 사용자 리뷰 / 신고 시스템을 결합</li>' +
        '<li>report 가 published 상태가 된 이후에는 patch 자체를 막아 데이터를 보호</li>' +
        '</ul>',
      result:
        '<p>신뢰 가능한 정보만 지도에 노출되도록 데이터 품질을 유지했습니다.</p>',
    },
    {
      title: 'KakaoMap 통합 + 좌표 자동화',
      tags: ['KakaoMap', 'Geocoding'],
      problem:
        '<p>두 가지 이슈가 잦았습니다.</p>' +
        '<ul>' +
        '<li>제보된 장소의 좌표 누락</li>' +
        '<li>현재 위치 주변 검색 결과가 비어버림</li>' +
        '</ul>',
      approach:
        '<ul>' +
        '<li>제보 시 주소 → 좌표 자동 변환 추가</li>' +
        '<li>주변 범위를 임시로 확장</li>' +
        '</ul>',
      result:
        '<p>검색 빈 결과 케이스가 줄고, 신규 제보의 좌표 누락이 사라졌습니다.</p>',
    },
    {
      title: '평점 평균을 매번 계산하지 않기',
      tags: ['Caching', 'review aggregation'],
      problem:
        '<p>리뷰가 추가 / 수정될 때마다 평균을 다시 계산하면 목록 조회가 느려졌습니다.</p>',
      approach:
        '<ul>' +
        '<li>review 저장 시 <code>total_score</code> 를 즉시 갱신</li>' +
        '<li>평균은 소수 단위로 정밀도 유지</li>' +
        '</ul>',
      result:
        '<p>목록 조회의 평균 계산 부담이 사라지고 화면에도 즉시 반영됐습니다.</p>',
    },
    {
      title: 'redux-saga 기반 비동기 흐름',
      tags: ['Redux', 'redux-saga'],
      problem:
        '<p>여러 비동기 액션을 컴포넌트가 직접 들고 있기에는 복잡했습니다.</p>' +
        '<ul>' +
        '<li>제보 등록 → 좌표 변환 → 지도 마커 갱신</li>' +
        '<li>검색 → 결과 표시</li>' +
        '</ul>',
      approach:
        '<p>redux-saga 로 각 흐름을 watcher / worker 단위로 분리했습니다. 컴포넌트는 dispatch 만 담당합니다.</p>',
      result:
        '<p>컴포넌트가 가벼워지고 비동기 흐름을 한 곳에서 추적할 수 있게 됐습니다.</p>',
    },
  ],
  contributions: [
    '<strong>API</strong>. Django + DRF.' +
      '<ul>' +
      '<li>제보 / 리뷰 / 북마크 / 신고</li>' +
      '<li>평점 자동 갱신</li>' +
      '<li>좌표 자동 변환</li>' +
      '</ul>',
    '<strong>지도 연동</strong>. KakaoMap Web API 로 지도 / 마커 / 주변 매장 표시.',
    '<strong>비동기 흐름</strong>. React + Redux + redux-saga watcher / worker 분리.',
    '<strong>자동 배포</strong>. 백엔드 Heroku(git subtree) + 프런트엔드 Netlify 파이프라인.',
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
    { type: 'image', url: `${IMG}/main.png`, caption: '지도 기반 길거리 먹거리 서비스: 메인 화면' },
  ],
}
