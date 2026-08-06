import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/images/projects/kkambbaki'

export const kkambbaki: Project = {
  slug: 'kkambbaki',
  name: '깜빡이',
  displayName: '깜빡이 💡',
  subtitle: '집중력 방범대: 만 5~10세 아동의 집중력을 깨우는 교육 게임',
  period: { start: '2025-10-12', end: '2025-11-14' },
  scale: 'major',
  status: 'completed',
  roles: ['백엔드', '인프라'],
  team: { size: 6, lead: false },
  stack: [
    'Django',
    'Celery',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'AWS',
  ],
  oneLiner:
    '"숨겨진 집중력의 불을 켜주는 아동 교육 서비스": 2025 멋쟁이사자처럼 13기 4호선톤 출품작.',
  description:
    '<p>만 5~10세 아동을 대상으로 한 에듀테크 플랫폼입니다.</p>' +
    '<p>연구 논문 기반 게임 두 종으로 집중력 / 기억력 / 문제해결력을 훈련합니다. ' +
    '<strong>뿅뿅 아기별</strong>(초등 저학년 · N-Back 류)은 별 깜빡임 순서를 기억해 따라 입력하고, ' +
    '<strong>꼬마 교통지킴이</strong>(미취학 후반 · Go / No-Go)는 신호 변화 시점에 정확히 반응하게 합니다.</p>' +
    '<p>라운드별 반응과 결과는 세션 단위로 누적되어 랭킹으로 환산되고, 같은 데이터가 LLM 분석을 거쳐 부모용 PDF 리포트로 발송됩니다.</p>' +
    '<p>Django 백엔드는 공통 인프라, 사용자, 게임, 리포트 네 도메인으로 나눴습니다. ' +
    'LLM 분석 · PDF 생성 · 이메일 발송이 Celery 로 이어지는 리포트 도메인이 가장 복잡한 영역이었습니다.</p>' +
    '<p>모델 · 뷰 · 예외 베이스 클래스를 먼저 세워 도메인마다 반복되는 boilerplate 를 없앴고, ' +
    'environments 디렉토리로 development / alpha / production Dockerfile 을 나눈 뒤 GitHub Actions 가 CI · 커버리지 · Swagger 를 자동화합니다.</p>' +
    '<p>인프라는 두 환경으로 분리해 운영합니다. ' +
    '<strong>alpha</strong> 는 홈랩 Kubernetes, <strong>production</strong> 은 AWS EC2 + RDS 입니다.</p>',
  features: [],
  challenges: [
    {
      title: 'alpha 는 홈랩 Kubernetes, production 은 AWS: 멀티 환경 전략',
      tags: ['Kubernetes', 'AWS', 'Multi-env'],
      problem:
        '<p>개발 환경에서는 비용 없이 실험하고 싶었지만, 물리적 접근성 부족과 홈 네트워크·전원 장애 가능성 때문에 발표 환경에서는 홈랩의 장애 위험을 감수할 수 없었습니다.</p>',
      approach:
        '<p>환경별 SLA에 맞춰 alpha와 production을 분리했습니다.</p>' +
        '<ul>' +
        '<li><strong>alpha</strong>: 홈랩 Kubernetes에서 비용 없이 실험했습니다.</li>' +
        '<li><strong>production</strong>: AWS EC2와 RDS로 시연 안정성을 확보했습니다.</li>' +
        '</ul>' +
        '<p>infra 저장소의 환경별 manifest가 두 환경의 차이를 담당하게 했습니다.</p>',
      result:
        '<p>alpha 환경에서는 자유롭게 실험하고, production 환경에서는 안정적으로 시연했습니다.</p>' +
        '<p>발표는 AWS에서 안정적으로 마쳤고, 이후에는 홈랩으로 옮겨 운영 비용을 낮출 수 있는 구조를 유지했습니다.</p>',
      detail: {
        background:
          '<p>홈랩 Kubernetes 는 무료 리소스, 확장성, 실제 인프라 운영 경험 면에서 매력적이었습니다.</p>' +
          '<p>다만 해커톤 발표 환경에서는 물리적 접근성, 하드웨어 안정성, 실시간 모니터링이 부족했기에 두 환경의 장점을 모두 가져가는 구조가 필요했습니다.</p>',
        options: [
          {
            label: 'Option A: production 도 홈랩 Kubernetes',
            pros: ['비용 0', '동일한 환경'],
            cons: [
              '발표 중 문제 발생 시 물리 접근 필요',
              '홈 네트워크 / 전원 장애 시 즉시 복구 불가',
              '현장에서 실시간 모니터링 제약',
            ],
          },
          {
            label: 'Option B: alpha = 홈랩, production = AWS',
            pros: ['홈랩의 비용·실험성 + AWS 의 안정성·확장성', '환경 차이를 manifest 로 흡수'],
            cons: ['두 환경 모두 운영해야 하는 부담'],
            chosen: true,
          },
        ],
        decision:
          '해커톤 발표라는 단발성 이벤트에서는 안정성을 양보할 수 없었고, 평소 개발은 홈랩이 가장 빠른 피드백 루프를 줬습니다.',
        implementation: [
          'alpha 환경: 홈랩 Kubernetes 클러스터',
          'production 환경: AWS EC2 + RDS',
          '백엔드 공통: Django + DRF 5.2 + Celery + Redis + PostgreSQL + uv',
          'environments/{development, alpha, production}/Dockerfile + commands 스크립트 분리',
          'GitHub Actions: CI 테스트 · 커버리지 레포트 · Swagger 문서 자동 생성',
        ],
        learnings: [
          '"개발 환경" 과 "발표 / 시연 환경" 의 SLA 가 다르다는 사실을 명시적으로 인정해야 함',
          '환경 차이를 코드가 아니라 manifest / Dockerfile 로 흡수하는 것이 가장 깔끔',
        ],
      },
    },
    {
      title: 'reports 도메인: LLM / PDF / 이메일을 한 도메인 안에 묶기',
      tags: ['Celery', 'LLM', 'PDF', 'Email'],
      problem:
        '<p>게임 결과 누적, LLM 분석, 부모용 조언 생성, PDF 렌더링, 이메일 발송으로 이어지는 긴 리포트 생성 흐름의 책임과 재시도 경계를 정해야 했습니다.</p>' +
        '<p>단계를 분리하되 하나의 도메인 안에서 전체 흐름을 추적할 수 있어야 했습니다.</p>',
      approach:
        '<p>reports 도메인 안에서 모델, 서비스, LLM 호출, Celery 태스크, 접근 인증을 각각의 모듈로 분리했습니다.</p>' +
        '<p>서비스 계층이 리포트 생성 흐름을 오케스트레이션하고, 프롬프트와 LLM 프로바이더는 따로 빼 교체 가능하게 두었습니다.</p>',
      result:
        '<p>각 단계는 독립된 서비스 클래스로 실행되지만 전체 흐름은 reports 도메인 안에서 추적됩니다.</p>' +
        '<p>Django management command도 같은 서비스를 호출해 운영 중 실패한 단계를 다시 실행할 수 있습니다.</p>',
      detail: {
        background:
          '<p>AI 리포트 생성은 LLM 호출, 통계 분석, PDF 렌더링, 이메일 발송처럼 외부 I/O 가 긴 작업입니다.</p>' +
          '<p>코드 위치 / 트랜잭션 경계 / 재시도 정책을 미리 정해두지 않으면 도메인 전체가 흐려지기 쉽습니다.</p>',
        implementation: [
          'reports/models: Report · GameReport · GameReportAdvice · ReportPin',
          'reports/services: report_generation_service.py 가 오케스트레이션, game_report_generation_service.py 가 게임별 생성',
          'reports/llm: generator.py · prompt.py · provider.py 로 LLM 호출과 프롬프트를 분리',
          'reports/tasks: report_task.py 와 report_email_task.py 가 Celery 태스크 진입점',
          'base_pdf_generator.py: PDF 베이스 클래스, 게임별 PDF 가 상속',
          'reports/authentication.py: 리포트 접근 인증',
        ],
        learnings: [
          'LLM · PDF · 이메일처럼 외부 I/O 가 긴 작업은 한 트랜잭션에 묶지 않고 단계 분리',
          '"한 도메인 안에서 단계 분리" 가 "여러 앱에 흩뿌리기" 보다 응집도가 높음',
        ],
      },
    },
    {
      title: '단순 정답률이 아닌 다차원 지표',
      tags: ['Game design', 'LLM prompt'],
      problem:
        '<p>단순 점수와 정답률만으로는 아이의 집중력과 회복탄력성이 어떻게 드러났는지 설명하기 어려웠습니다.</p>',
      approach:
        '<p>게임 라운드마다 최대·평균 도달 라운드, 반응 속도, 오답률, 제한시간 초과율을 GameResult에 저장하고 LLM 프롬프트의 근거로 사용했습니다.</p>',
      result:
        '<p>학부모에게 단일 점수 대신 강점과 보완 영역을 수치와 자연어 조언으로 함께 전달했습니다.</p>',
    },
  ],
  contributions: [
    {
      title: 'Backend',
      summary: 'Django 모델 / 서비스 / 태스크 구현.',
      items: [
        '공통 베이스 모델 · 뷰 · 예외를 먼저 세워 네 도메인이 같은 규약을 공유하게 했습니다.',
        '보호자-아동 계정 구조와 게임 세션 · 라운드 결과 · 랭킹 모델을 설계했습니다.',
        '리포트 생성부터 이메일 발송까지의 비동기 흐름을 서비스와 Celery 태스크로 구현했습니다.',
      ],
    },
    {
      title: 'Infra',
      summary:
        'alpha 는 홈랩 Kubernetes, production 은 AWS EC2 + RDS 로 나누고 ArgoCD GitOps 매니페스트를 작성.',
    },
    {
      title: 'CI / CD',
      summary: 'AWS production 환경 + GitHub Actions 로 CI / 커버리지 / Swagger 자동화.',
    },
    {
      title: '비동기 파이프라인',
      summary: 'reports 도메인의 LLM 호출 + PDF + 이메일 발송 흐름 설계.',
    },
  ],
  links: [
    { label: 'Backend repo', url: 'https://github.com/kkambbaki/backend', type: 'github' },
    { label: 'Frontend repo', url: 'https://github.com/kkambbaki/frontend', type: 'github' },
    { label: 'Infra repo', url: 'https://github.com/kkambbaki/infra', type: 'github' },
    { label: 'Org README', url: 'https://github.com/kkambbaki/.github', type: 'github' },
    { label: 'GitHub Org', url: 'https://github.com/kkambbaki', type: 'github' },
    {
      label: '발표 자료 (PDF)',
      url: '/docs/kkambbaki-presentation.pdf',
      type: 'pdf',
    },
  ],
  hero: `${IMG}/hero.jpg`,
  media: [
    { type: 'image', url: `${IMG}/star-game.png`, caption: '뿅뿅 아기별: 기억/입력 단계' },
    { type: 'image', url: `${IMG}/traffic-game.png`, caption: '꼬마 교통지킴이: Go/No-Go 반응 훈련' },
    { type: 'image', url: `${IMG}/ai-report.png`, caption: 'AI 기반 집중력 분석 레포트: 메인 화면' },
  ],
  presentation: {
    title: '4호선톤 발표 자료',
    caption: '2025 멋쟁이사자처럼 13기 4호선톤 출품 · 18페이지',
    totalPages: 18,
    pdfUrl: '/docs/kkambbaki-presentation.pdf',
    pageImages: presentationPages('kkambbaki', 18),
  },
}
