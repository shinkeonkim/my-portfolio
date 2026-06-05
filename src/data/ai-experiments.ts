import type { AIExperiment } from '@/types'

const IMG = '/my-portfolio/images/ai-experiments'

export const aiExperiments: readonly AIExperiment[] = [
  {
    slug: 'pattern-type',
    title: 'PatternType',
    tagline: '나의 디자인 패턴 성격 유형은?',
    description:
      '12개의 코딩 상황 질문으로 당신을 7가지 디자인 패턴 중 하나로 진단하는 개발자 심리테스트.',
    category: 'service',
    emoji: '🧩',
    image: `${IMG}/pattern-type.png`,
    links: {
      site: 'https://pattern-type.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/pattern-type',
    },
  },
  {
    slug: 'dev-tarot',
    title: 'DevTarot',
    tagline: '오늘의 코딩 운세 한 장',
    description:
      '22장의 메이저 아르카나에서 1장을 뽑아 오늘의 코딩 운세 · 조언 · 럭키 스택을 제공하는 개발자용 타로.',
    category: 'service',
    emoji: '🃏',
    image: `${IMG}/dev-tarot.png`,
    links: {
      site: 'https://dev-tarot.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/dev-tarot',
    },
  },
  {
    slug: 'review-slot',
    title: 'ReviewSlot',
    tagline: '슬롯머신으로 만드는 코드리뷰 코멘트',
    description:
      '톤 × 내용 × 액션을 슬롯으로 돌려 100가지 코드리뷰 코멘트를 생성하는 도구. PR에 바로 붙여넣기 가능.',
    category: 'tool',
    emoji: '🎰',
    image: `${IMG}/review-slot.png`,
    links: {
      site: 'https://review-slot.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/review-slot',
    },
  },
  {
    slug: 'term-card',
    title: 'TermCard',
    tagline: 'neofetch 감성의 ASCII 명함',
    description:
      '터미널 스타일 ASCII 명함 생성기. 4가지 스타일과 6가지 컬러 테마, PNG 다운로드와 Python CLI 지원.',
    category: 'tool',
    emoji: '💻',
    image: `${IMG}/term-card.png`,
    links: {
      site: 'https://term-card.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/term-card',
    },
  },
  {
    slug: 'please-delete-my-account',
    title: 'Please Delete My Account',
    tagline: '회원탈퇴 다크패턴 풍자 게임',
    description:
      '대한민국 서비스 회원탈퇴의 모든 다크패턴을 20개 스테이지 퍼즐로 풍자한 인터랙티브 게임.',
    category: 'service',
    emoji: '🗑️',
    image: `${IMG}/please-delete-my-account.png`,
    links: {
      site: 'https://please-delete-my-account.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/please-delete-my-account',
    },
  },
  {
    slug: 'cozy-hive',
    title: '나의 작은 양봉장',
    tagline: '방치형 양봉 시뮬레이터',
    description:
      '한국의 사계절을 따라 벌통을 관리하고 꿀을 수확하는 방치형 양봉 시뮬레이션 웹 게임.',
    category: 'service',
    emoji: '🐝',
    image: `${IMG}/cozy-hive.png`,
    links: {
      site: 'https://cozy-hive.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/cozy-hive',
    },
  },
  {
    slug: 'works-on-mine',
    title: 'Works on Mine',
    tagline: '"제 컴퓨터에선 되는데요" 공식 증명서',
    description:
      '개발자의 영원한 변명을 공식 증명서로 발급해 주는 유머 사이트. PNG로 저장해 PR에 첨부하세요.',
    category: 'service',
    emoji: '📜',
    image: `${IMG}/works-on-mine.png`,
    links: {
      site: 'https://works-on-mine.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/works-on-mine',
    },
  },
  {
    slug: 'cors-port',
    title: 'CORSport',
    tagline: 'CORS를 공항 출입국 심사로 배우기',
    description:
      'CORS 개념을 공항 출입국 심사 비유로 풀어낸 인터랙티브 튜토리얼. Preflight · Access-Control 헤더를 시뮬레이션.',
    category: 'educational',
    emoji: '✈️',
    image: `${IMG}/cors-port.png`,
    links: {
      site: 'https://cors-port.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/cors-port',
    },
  },
  {
    slug: 'npm-version-era',
    title: 'VersionEra',
    tagline: 'npm 버전 정책 시대극',
    description:
      'SemVer · caret · tilde · lockfile 등 npm 버전 관리의 시대별 변화를 비교 학습하는 시각화.',
    category: 'educational',
    emoji: '📦',
    image: `${IMG}/npm-version-era.png`,
    links: {
      site: 'https://npm-version-era.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/npm-version-era',
    },
  },
  {
    slug: 'cookie-bakery',
    title: 'CookieBakery',
    tagline: '브라우저 쿠키를 굽기로 배우자',
    description:
      '쿠키 발급 · 만료 · SameSite · Secure 등 브라우저 쿠키 개념을 실제 쿠키 굽기 메타포로 배우는 튜토리얼.',
    category: 'educational',
    emoji: '🍪',
    image: `${IMG}/cookie-bakery.png`,
    links: {
      site: 'https://cookie-bakery.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/cookie-bakery',
    },
  },
  {
    slug: 'cache-fridge',
    title: 'CacheFridge',
    tagline: '냉장고로 배우는 캐시 전략',
    description:
      '냉장고 안의 재료를 통해 LRU · LFU · TTL · 캐시 무효화 전략을 직관적으로 체험하는 학습 사이트.',
    category: 'educational',
    emoji: '🧊',
    image: `${IMG}/cache-fridge.png`,
    links: {
      site: 'https://cache-fridge.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/cache-fridge',
    },
  },
  {
    slug: 'gc-sweeper',
    title: 'GC Sweeper',
    tagline: '가비지 컬렉션 퍼즐 게임',
    description:
      '메모리 블록에서 도달 불가능한 객체를 찾아 수거하는 GC 알고리즘 학습 퍼즐 게임.',
    category: 'educational',
    emoji: '🗑️',
    image: `${IMG}/gc-sweeper.png`,
    links: {
      site: 'https://gc-sweeper.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/gc-sweeper',
    },
  },
  {
    slug: 'duck-therapy',
    title: 'DuckTherapy',
    tagline: '러버덕 디버깅 상담소',
    description:
      '고무 오리에게 버그를 설명하면 소크라테스식 질문으로 디버깅을 함께 풀어가는 AI 디버깅 도구.',
    category: 'tool',
    emoji: '🦆',
    image: `${IMG}/duck-therapy.png`,
    links: {
      site: 'https://duck-therapy.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/duck-therapy',
    },
  },
  {
    slug: 'stack-digger',
    title: 'StackDigger',
    tagline: '스택 트레이스 파헤치기',
    description:
      '복잡한 스택 트레이스를 시각화하고 인터랙티브하게 탐색하여 호출 흐름을 이해하기 쉽게 만든 도구.',
    category: 'tool',
    emoji: '⛏️',
    image: `${IMG}/stack-digger.png`,
    links: {
      site: 'https://stack-digger.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/stack-digger',
    },
  },
  {
    slug: 'commit-city',
    title: 'CommitCity',
    tagline: 'GitHub 컨트리뷰션 → 도시 스카이라인',
    description:
      'GitHub 컨트리뷰션 그래프를 도시 스카이라인으로 변환. 더 많은 커밋이 더 높은 빌딩으로 자랍니다.',
    category: 'service',
    emoji: '🏙️',
    image: `${IMG}/commit-city.png`,
    links: {
      site: 'https://commit-city.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/commit-city',
    },
  },
  {
    slug: 'dice-art',
    title: 'Dice Art',
    tagline: '주사위 모자이크 아트',
    description:
      '이미지를 1~6 눈금 주사위 수만 개로 매핑하여 모자이크 아트를 만들고 3D로 시각화하는 고성능 도구.',
    category: 'service',
    emoji: '🎲',
    image: `${IMG}/dice-art.png`,
    links: {
      site: 'https://dice-art.xn--hy1by51c.kr/',
      github: 'https://github.com/kokoa-lab/dice-art',
    },
  },
  {
    slug: 'hexagonal-grid-illumination-visualizer',
    title: 'Hexagonal Grid Visualizer',
    tagline: 'BOJ 5547 알고리즘 시각화',
    description:
      '백준 5547 일루미네이션 문제의 육각형 그리드를 직접 클릭하며 둘레 탐색을 시각화하는 알고리즘 학습 사이트.',
    category: 'educational',
    emoji: '⬡',
    image: `${IMG}/hexagonal-grid-illumination-visualizer.png`,
    links: {
      site: 'https://www.shinkeonkim.com/hexagonal-grid-illumination-visualizer/',
      github: 'https://github.com/shinkeonkim/hexagonal-grid-illumination-visualizer',
    },
  },
] as const
