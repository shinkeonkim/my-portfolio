import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/lotteng'

export const lotteng: Project = {
  slug: 'lotteng',
  name: 'Lotteng (롯땡)',
  subtitle: '롯데 계열사 마감 세일 통합 플랫폼',
  period: { start: '2020-09', end: '2020-10' },
  scale: 'hackathon',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 5, lead: false },
  stack: ['Django', 'AWS EC2', 'Ubuntu 18.04', 'Nginx', 'Gunicorn', 'AJAX'],
  oneLiner: '롯데 계열사 마감 세일 정보를 통합하고, 오프라인 픽업과 연계하는 O2O 플랫폼.',
  description:
    'LOTTENG(롯땡)은 롯데마트/롯데백화점/세븐일레븐/롭스/롯데호텔/롯데리아 등의 마감 세일 정보를 통합하고, 온라인 결제 후 오프라인 매장 픽업을 연계해 환경 부담을 줄이는 O2O 플랫폼입니다. Lotte x Likelion 연계 해커톤 동상 수상.',
  features: [
    '지도 기반 매장 위치/필터링 (다중 선택 + 초기 ALL)',
    '상품 정렬(추천/저가/고가/거리) · 환경 세일 배지',
    '장바구니 · AJAX 결제 · 인증번호 기반 오프라인 픽업',
    '일반 / 구글 소셜 로그인',
    'reload filter + 비회원 일부 버튼 비활성화 UX',
    '주문 내역 badge / 결제 프로세스 (장바구니 → 결제 → 인증번호 발급)',
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
    '프로젝트 전반 설계·개발',
    'AWS EC2 / Nginx / Gunicorn 인프라 구성',
    'AJAX 인터랙션 + 인증번호 발급 로직 구현',
  ],
  links: [
    { label: 'GitHub', url: 'https://github.com/hyeoneedyou/lotteng', type: 'github' },
  ],
  award: 'Lotte x Likelion 연계 해커톤 동상 (2020)',
  hero: `${IMG}/02-main.png`,
  media: [
    { type: 'image', url: `${IMG}/02-main.png`, caption: '메인 화면 — 매장 지도 + 상품 목록' },
    { type: 'image', url: `${IMG}/04-map.png`, caption: '지도 기반 매장 필터링' },
    { type: 'image', url: `${IMG}/01-logo.png`, caption: '서비스 로고 — LOTTENG (Lotte + N + Good)' },
    { type: 'image', url: `${IMG}/03.png`, caption: '상품 상세' },
    { type: 'image', url: `${IMG}/05.png`, caption: '상품 정렬 · 필터' },
    { type: 'image', url: `${IMG}/06-cart.png`, caption: '장바구니' },
    { type: 'image', url: `${IMG}/07-payment.png`, caption: '결제 · 인증번호 발급' },
  ],
}
