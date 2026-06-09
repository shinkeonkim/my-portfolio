import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/lotteng'

export const lotteng: Project = {
  slug: 'lotteng',
  name: 'Lotteng (롯땡)',
  subtitle: '롯데 계열사 마감 세일 통합 O2O 플랫폼',
  period: { start: '2020-09', end: '2020-10' },
  scale: 'hackathon',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 8, lead: false },
  stack: ['Django', 'JavaScript', 'AJAX', 'AWS EC2', 'Ubuntu 18.04 LTS', 'Nginx', 'Gunicorn'],
  oneLiner:
    'LOTTENG = LOTTE + N(&) + G(Great deal): 롯데 계열사의 마감 세일 정보를 통합하고, 오프라인 픽업과 환경 보호를 연계하는 O2O 플랫폼.',
  description:
    '<p>LOTTENG(롯땡, 롯데 + 땡처리) 은 롯데 계열사의 마감 세일 정보를 통합한 O2O 플랫폼입니다.</p>' +
    '<p>대상 계열사:</p>' +
    '<ul>' +
    '<li>롯데마트 / 롯데백화점</li>' +
    '<li>세븐일레븐 / 롭스</li>' +
    '<li>롯데호텔 / 롯데리아</li>' +
    '</ul>' +
    '<p>온라인 결제 + 오프라인 매장 픽업으로 연계됩니다.</p>' +
    '<p>코로나19 이후 두 가지 문제를 풀고자 했습니다.</p>' +
    '<ul>' +
    '<li>언택트 소비 급증으로 인한 오프라인 매출 감소</li>' +
    '<li>택배 일회용품 증가</li>' +
    '</ul>' +
    '<p>환경 세일 카테고리를 별도로 두어 소비자가 할인을 받으면서 환경 보호에 동참하도록 설계했습니다.</p>' +
    '<p>8인 팀의 백엔드 + 인프라를 담당했습니다. Lotte x Likelion 연계 해커톤(2020 멋쟁이사자처럼 8기) 동상 수상.</p>',
  features: [
    {
      title: '지도 기반 매장 표시',
      content: [
        '잠실 근처 롯데 계열사 위치 표시',
        '초기 상태: ALL',
        '계열사 다중 선택 + 토글 해제',
      ],
    },
    {
      title: '상품 카드',
      content: [
        '정가 / 할인가 / 할인율(자동 계산)',
        '마감 기한 / 재고',
        '환경 세일 배지',
        '검색 + 반응형(웹 4열 / 모바일 1열)',
      ],
    },
    {
      title: '정렬',
      content: [
        '추천: 최신순 (AI 맞춤 추천 도입 염두)',
        '저가 / 고가',
        '거리순(잠실역 기준)',
      ],
    },
    {
      title: '결제 흐름',
      content: [
        '장바구니 → AJAX 결제 → 인증번호 발급',
        '난수 + 매장 내 중복 검사',
        '충돌 시 재발급',
      ],
    },
    {
      title: '회원',
      content: [
        '일반 로그인 + 구글 소셜 로그인',
        '마이페이지 / 회원 정보 수정',
        '주문 내역 / 비밀번호 변경',
      ],
    },
    {
      title: 'AJAX 비동기',
      content: [
        '필터 / 장바구니 / 검색 / 인증번호가 새로고침 없이 동작',
      ],
    },
    {
      title: '반응형',
      content: [
        '모바일 side nav-bar',
        '비회원 일부 버튼 비활성화 UX',
      ],
    },
  ],
  challenges: [
    {
      title: '인증번호 중복 발급 방지: 난수 + 매장 내 중복 검사',
      tags: ['Order code', 'Idempotency'],
      problem:
        '<p>오프라인 픽업을 위한 인증번호가 같은 매장에서 중복 발급되면 안 됐습니다.</p>',
      approach:
        '<ol>' +
        '<li>난수로 인증번호 발급</li>' +
        '<li>같은 매장에 같은 번호가 이미 있는지 확인</li>' +
        '<li>중복이면 다시 난수 발급</li>' +
        '</ol>',
      result:
        '<p>운영 중 인증번호 충돌 사례 없이 시연을 완료했습니다.</p>',
    },
    {
      title: '해커톤 일정 안에서 데모 안정성 우선의 인프라',
      tags: ['AWS EC2', 'Nginx', 'Gunicorn'],
      problem:
        '<p>제한된 해커톤 시간 안에서 인프라까지 직접 운영해야 했습니다.</p>',
      approach:
        '<ul>' +
        '<li>AWS EC2(Ubuntu 18.04 LTS) + Nginx + Gunicorn 단일 인스턴스로 단순하게 시작</li>' +
        '<li>발표 안정성에 우선순위</li>' +
        '</ul>',
      result:
        '<p>시연 중 다운 없이 끝까지 운영했고, Lotte x Likelion 연계 해커톤 동상을 수상했습니다.</p>',
    },
    {
      title: '주요 인터랙션을 AJAX 로 비동기화',
      tags: ['AJAX', 'UX'],
      problem:
        '<p>주요 액션이 매번 페이지 새로고침을 일으켜 UX 가 어색했습니다.</p>' +
        '<ul>' +
        '<li>검색 / 필터</li>' +
        '<li>장바구니 추가 / 삭제</li>' +
        '<li>인증번호 발급</li>' +
        '</ul>',
      approach:
        '<ul>' +
        '<li>필터 / 장바구니 / 검색 / 인증번호 발급을 AJAX 비동기 처리로 전환</li>' +
        '<li>비회원 상태에서 일부 버튼만 비활성화하는 UX 추가</li>' +
        '</ul>',
      result:
        '<p>새로고침 없이 매끄럽게 동작합니다. 비회원 / 회원 상태 전환도 자연스러워졌습니다.</p>',
    },
  ],
  contributions: [
    '<strong>백엔드</strong>. Django + AJAX 인터랙션 + 인증번호 발급 로직.',
    '<strong>인프라</strong>. AWS EC2(Ubuntu 18.04 LTS) + Nginx + Gunicorn.',
    '<strong>도메인 로직</strong>. 롯데 계열사 통합 모델링 + 환경 세일 배지 + 거리순 정렬 (8인 팀 협업).',
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/hyeoneedyou/lotteng', type: 'github' },
    { label: 'Instagram', url: 'https://www.instagram.com/lotteng_official/', type: 'other' },
    {
      label: '해커톤 발표 게시물',
      url: 'https://www.instagram.com/p/CHwRaZRBxl5/',
      type: 'article',
    },
  ],
  award: 'Lotte x Likelion 연계 해커톤 동상 (2020)',
  hero: `${IMG}/01-logo.png`,
  media: [
    {
      type: 'image',
      url: `${IMG}/01-logo.png`,
      caption: '메인 화면: 서비스 로고 LOTTENG = Lotte + N(&) + G(Great deal) + 검색 + 지도 기반 잠실 근처 롯데 계열사 위치',
    },
    {
      type: 'image',
      url: `${IMG}/02-main.png`,
      caption: '추천 상품 목록: 정가/할인가/할인율(자동 계산)/마감 기한/재고 + 환경 세일 배지',
    },
    {
      type: 'image',
      url: `${IMG}/03.png`,
      caption: '상품 상세: LOTTE 호텔 객실 + 개수 조정 + 장바구니 담기',
    },
    {
      type: 'image',
      url: `${IMG}/04-map.png`,
      caption: '장바구니: 담은 상품 + 개수 조정 + 결제 예정 금액',
    },
    {
      type: 'image',
      url: `${IMG}/05.png`,
      caption: '결제: 결제 수단 선택 + 픽업장소 + 결제 금액 안내',
    },
    {
      type: 'image',
      url: `${IMG}/06-cart.png`,
      caption: '결제 완료 → 인증번호 발급 (난수 + 매장 내 중복 검사로 충돌 시 재발급)',
    },
    {
      type: 'image',
      url: `${IMG}/07-payment.png`,
      caption: '개발팀 소개: 2020 멋쟁이사자처럼 8기 8인 팀 (footer)',
    },
  ],
}
