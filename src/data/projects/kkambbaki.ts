import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/kkambbaki'

export const kkambbaki: Project = {
  slug: 'kkambbaki',
  name: '깜빡이',
  displayName: '깜빡이 💡',
  subtitle: '집중력 방범대 — 만 5~10세 아동의 집중력을 깨우는 교육 게임',
  period: { start: '2025-10-12', end: '2025-11-14' },
  scale: 'major',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 6, lead: false },
  stack: [
    'Django',
    'Celery',
    'Redis',
    'K3s',
    'ArgoCD',
    'PostgreSQL',
    'AWS RDS',
    'AWS EC2',
    'GitHub Actions',
    'docker-compose',
    'LLM',
  ],
  oneLiner:
    '"숨겨진 집중력의 불을 켜주는 아동 교육 서비스" — 2025 멋쟁이사자처럼 13기 4호선톤 출품작.',
  description:
    "만 5~10세 아동을 대상으로 연구 논문 기반 게임 '뿅뿅 아기별'·'꼬마 교통지킴이'를 통해 집중력·기억력·문제해결력을 훈련하고, 부모를 위한 AI 분석 레포트를 자동 생성하는 에듀테크 플랫폼입니다.",
  features: [
    '뿅뿅 아기별 — 별 깜빡임 순서 기억 게임 (N-Back 기반, 초등 저학년)',
    '꼬마 교통지킴이 — 신호등 색상 변화 시점에 정확히 반응 (Go/No-Go 과제, 미취학 후반)',
    'AI 기반 집중력 분석 레포트 — 집중력 지수 / 충동 조절 / 주의력 정량 분석',
    'Celery + Redis 비동기 LLM 분석 파이프라인 (게임 결과 → AI 종합 분석)',
    '홈랩 K3s + ArgoCD GitOps + AWS RDS-EC2 프로덕션 환경',
  ],
  challenges: [
    {
      problem: 'AI 리포트 생성 시간이 길고, LLM 호출이 가끔 실패함.',
      approach: 'Celery 워커에서 LLM 호출/통계 분석/저장을 단계화하고, 단계별 재시도 정책과 백오프를 적용.',
      result: '리포트 실패율을 낮추고, 사용자 응답을 200ms 이내로 유지.',
    },
    {
      problem: '여러 환경(홈랩 K3s, AWS)에 동일한 워크로드를 배포해야 함.',
      approach: 'ArgoCD GitOps로 환경별 매니페스트를 분리. AWS는 RDS + EC2 워커 + S3 미디어로 구성.',
      result: '환경 차이를 매니페스트로 흡수하고, 배포 변경은 PR로 추적 가능.',
    },
    {
      problem: '아이의 회복탄력성을 위해 단순 정답률 외 다양한 평가 지표가 필요.',
      approach:
        '최대 라운드 도달률 · 평균 도달 라운드 · 반응속도 · 오답률 · 제한시간 초과율 등 다차원 지표를 LLM 프롬프트에 주입.',
      result: '학부모에게 단순 점수가 아닌 영역별 강점·약점을 정량적으로 전달.',
    },
  ],
  contributions: [
    'Celery 비동기 LLM 분석 파이프라인 설계 및 구현',
    '홈랩 K3s + ArgoCD GitOps 환경 구축',
    'AWS RDS-EC2 프로덕션 환경 + GitHub Actions CI/CD',
  ],
  links: [
    { label: 'Backend repo', url: 'https://github.com/kkambbaki/backend', type: 'github' },
    { label: 'Frontend repo', url: 'https://github.com/kkambbaki/frontend', type: 'github' },
    { label: 'Infra repo', url: 'https://github.com/kkambbaki/infra', type: 'github' },
    { label: 'Org README', url: 'https://github.com/kkambbaki/.github', type: 'github' },
    { label: 'GitHub Org', url: 'https://github.com/kkambbaki', type: 'github' },
  ],
  hero: `${IMG}/ai-report.png`,
  media: [
    { type: 'image', url: `${IMG}/star-game.png`, caption: '뿅뿅 아기별 — 기억/입력 단계' },
    { type: 'image', url: `${IMG}/traffic-game.png`, caption: '꼬마 교통지킴이 — Go/No-Go 반응 훈련' },
    { type: 'image', url: `${IMG}/ai-report.png`, caption: 'AI 기반 집중력 분석 레포트 — 메인 화면' },
  ],
}
