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
    'LOTTENG = LOTTE + N(&) + G(Great deal) — 롯데 계열사의 마감 세일 정보를 통합하고, 오프라인 픽업과 환경 보호를 연계하는 O2O 플랫폼.',
  description:
    'LOTTENG(롯땡, 롯데 + 땡처리)은 롯데마트·롯데백화점·세븐일레븐·롭스·롯데호텔·롯데리아 등 롯데 계열사의 마감 세일 정보를 통합해, 온라인 결제 + 오프라인 매장 픽업으로 연계하는 O2O 플랫폼입니다. 코로나19 이후 급증한 언택트 소비로 인한 오프라인 매출 감소 · 택배 일회용품 증가 문제를 해결하고자, 환경 세일 제품 카테고리를 별도로 두어 소비자가 할인을 받으면서 환경 보호에 동참할 수 있도록 설계했습니다. 8인 팀의 백엔드 + 인프라를 담당했고, Lotte x Likelion 연계 해커톤(2020 멋쟁이사자처럼 8기) 동상 수상.',
  features: [
    '지도 기반 잠실 근처 롯데 계열사 위치 표시 — ALL 초기 + 다중 선택 + 토글 해제 가능',
    '상품 카드: 정가/할인가/할인율(자동 계산)/마감 기한/재고 · 환경 세일 배지 · 검색 + 반응형(웹 4열/모바일 1열)',
    '정렬: 추천(최신순, AI 맞춤 추천 도입 염두) / 저가 / 고가 / 거리(잠실역 기준)',
    '장바구니 → AJAX 결제 → 인증번호 발급 (난수 + 매장 내 중복 검사로 충돌 시 재발급)',
    '일반 로그인 + 구글 소셜 로그인 · 마이페이지 · 회원 정보 수정 · 주문 내역 · 비밀번호 변경',
    'AJAX 비동기 처리 — 필터·장바구니·검색·인증번호 새로고침 없이 동작',
    '모바일 side nav-bar 반응형 + 비회원 일부 버튼 비활성화 UX',
  ],
  challenges: [
    {
      problem: '인증번호 중복 발급 위험.',
      approach: '난수 발급 + 매장 내 중복 검사로 충돌 시 재발급.',
      result: '운영 중 인증번호 충돌 0건.',
    },
    {
      problem: '한정된 해커톤 시간에서 인프라까지 직접 운영.',
      approach: 'AWS EC2 + Nginx + Gunicorn으로 단순한 단일 인스턴스 배포로 시작, 데모 안정성에 집중.',
      result: '데모 중 다운 없이 시연 완료, 동상 수상.',
    },
    {
      problem: '검색/필터/장바구니 등 사용자 액션이 페이지 새로고침을 일으켜 UX가 어색.',
      approach: '주요 인터랙션(필터 / 장바구니 추가·제거 / 검색 / 인증번호)을 AJAX로 비동기 처리하도록 전환.',
      result: '새로고침 없이 매끄럽게 동작 + 비회원 상태 시 일부 버튼만 비활성화하는 UX도 안정.',
    },
  ],
  contributions: [
    '프로젝트 전반 백엔드 설계·개발 (Django + AJAX 인터랙션 + 인증번호 발급 로직)',
    'AWS EC2 (Ubuntu 18.04 LTS) + Nginx + Gunicorn 인프라 구성',
    '8인 팀 협업 — 롯데 계열사 통합 모델링 + 환경 세일 배지 + 거리순 정렬 등 도메인 로직 구현',
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
      caption: '메인 화면 — 서비스 로고 LOTTENG = Lotte + N(&) + G(Great deal) + 검색 + 지도 기반 잠실 근처 롯데 계열사 위치',
    },
    {
      type: 'image',
      url: `${IMG}/02-main.png`,
      caption: '추천 상품 목록 — 정가/할인가/할인율(자동 계산)/마감 기한/재고 + 환경 세일 배지',
    },
    {
      type: 'image',
      url: `${IMG}/03.png`,
      caption: '상품 상세 — LOTTE 호텔 객실 + 개수 조정 + 장바구니 담기',
    },
    {
      type: 'image',
      url: `${IMG}/04-map.png`,
      caption: '장바구니 — 담은 상품 + 개수 조정 + 결제 예정 금액',
    },
    {
      type: 'image',
      url: `${IMG}/05.png`,
      caption: '결제 — 결제 수단 선택 + 픽업장소 + 결제 금액 안내',
    },
    {
      type: 'image',
      url: `${IMG}/06-cart.png`,
      caption: '결제 완료 → 인증번호 발급 (난수 + 매장 내 중복 검사로 충돌 시 재발급)',
    },
    {
      type: 'image',
      url: `${IMG}/07-payment.png`,
      caption: '개발팀 소개 — 2020 멋쟁이사자처럼 8기 8인 팀 (footer)',
    },
  ],
}
