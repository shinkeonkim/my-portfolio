import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/my-portfolio/images/projects/kkambbaki'

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
    'DRF 5.2',
    'Celery',
    'Redis',
    'PostgreSQL',
    'uv',
    'Docker',
    'docker-compose',
    'Kubernetes (홈랩)',
    'AWS EC2',
    'AWS RDS',
    'GitHub Actions',
    'LLM',
  ],
  oneLiner:
    '"숨겨진 집중력의 불을 켜주는 아동 교육 서비스": 2025 멋쟁이사자처럼 13기 4호선톤 출품작.',
  description:
    '<p>만 5~10세 아동을 대상으로 한 에듀테크 플랫폼입니다.</p>' +
    '<p>연구 논문 기반 게임으로 집중력 / 기억력 / 문제해결력을 훈련합니다.</p>' +
    '<ul>' +
    '<li>뿅뿅 아기별: 별 깜빡임 순서를 기억하고 따라 입력</li>' +
    '<li>꼬마 교통지킴이: 신호 변화 시점에 정확히 반응</li>' +
    '</ul>' +
    '<p>게임 결과는 LLM 으로 분석되어 부모용 PDF 리포트로 발송됩니다.</p>' +
    '<p>Django 백엔드는 도메인으로 분리되어 있습니다.</p>' +
    '<ul>' +
    '<li><strong>common</strong>: BaseModel / BaseAPIView / BaseAPIException</li>' +
    '<li><strong>users</strong>: User / Child / BotToken</li>' +
    '<li><strong>games</strong>: Game / GameSession / GameResult / RankingEntry</li>' +
    '<li><strong>reports</strong>: Report / GameReport / GameReportAdvice / ReportPin. LLM · PDF · 이메일 · Celery 까지 포함되어 가장 복잡한 영역입니다.</li>' +
    '</ul>' +
    '<p>인프라는 두 환경으로 분리해 운영합니다.</p>' +
    '<ul>' +
    '<li><strong>alpha</strong>: 홈랩 Kubernetes, <code>alpha.singun11.wtf</code></li>' +
    '<li><strong>production</strong>: AWS EC2 + RDS, <code>kkambbaki.singun11.wtf</code></li>' +
    '</ul>',
  features: [
    {
      title: '뿅뿅 아기별',
      content: [
        'N-Back 류 게임',
        '별 깜빡임 순서를 기억하고 따라 입력',
        '대상: 초등 저학년',
      ],
    },
    {
      title: '꼬마 교통지킴이',
      content: [
        'Go / No-Go 과제',
        '신호 변화 시점에 정확히 반응',
        '대상: 미취학 후반',
      ],
    },
    {
      title: '랭킹 시스템',
      content: [
        'GameSession / GameResult 가 라운드별 반응과 결과를 누적',
        'RankingEntry 로 랭킹 표시',
      ],
    },
    {
      title: 'AI 분석 리포트',
      content: [
        'reports 도메인의 Celery 태스크가 게임 결과를 LLM 프롬프트로 분석',
        '<strong>GameReportAdvice</strong>: 부모용 조언 생성',
        '<strong>base_pdf_generator</strong>: PDF 리포트 생성',
        '<strong>report_email_service</strong>: 이메일 발송',
        '위 단계는 모두 Celery 비동기로 처리',
      ],
    },
    {
      title: '공통 인프라 코드',
      content: [
        'BaseModel / BaseAPIView / BaseAPIException',
        'ActiveUserPermission',
        'CamelCase ↔ snake_case 미들웨어',
      ],
    },
    {
      title: '환경 분리 + 자동화',
      content: [
        'environments 디렉토리로 development / alpha / production Dockerfile 분리',
        'GitHub Actions 가 CI / 커버리지 / Swagger 자동화',
      ],
    },
  ],
  challenges: [
    {
      title: 'alpha 는 홈랩 Kubernetes, production 은 AWS: 멀티 환경 전략',
      tags: ['Kubernetes', 'AWS', 'Multi-env'],
      problem:
        '<p>개발 / 테스트 환경에서는 비용 부담 없이 실험하고 싶었습니다.</p>' +
        '<p>하지만 4호선톤 발표 환경에서는 다음 리스크를 그대로 가져갈 수 없었습니다.</p>' +
        '<ul>' +
        '<li>홈랩의 물리적 접근성 부족</li>' +
        '<li>홈 네트워크 / 전원 장애 가능성</li>' +
        '</ul>',
      approach:
        '<p>두 환경의 장점을 모두 살리도록 분리했습니다.</p>' +
        '<ul>' +
        '<li><strong>alpha</strong>: 홈랩 Kubernetes 위에서 비용 0 으로 운영하면서 컨테이너 오케스트레이션 경험을 가져갑니다.</li>' +
        '<li><strong>production</strong>: AWS EC2 + RDS 로 안정성을 확보합니다.</li>' +
        '</ul>' +
        '<p>infra repo 에 환경별 manifest 를 분리해 차이를 명시적으로 흡수했습니다.</p>',
      result:
        '<ul>' +
        '<li><code>alpha.singun11.wtf</code>: 자유롭게 실험</li>' +
        '<li><code>kkambbaki.singun11.wtf</code>: 안정적으로 시연</li>' +
        '</ul>' +
        '<p>해커톤 이후에도 비용 측면에서 홈랩 production 운영이 가능한 구조를 유지했습니다.</p>',
      detail: {
        background:
          '<p>홈랩 Kubernetes 는 매력적이었습니다.</p>' +
          '<ul>' +
          '<li>무료 리소스 활용</li>' +
          '<li>확장성</li>' +
          '<li>실제 인프라 경험</li>' +
          '</ul>' +
          '<p>다만 해커톤 발표 환경에서는 다음이 부족했습니다.</p>' +
          '<ul>' +
          '<li>물리적 접근성</li>' +
          '<li>하드웨어 안정성</li>' +
          '<li>실시간 모니터링</li>' +
          '</ul>' +
          '<p>두 환경의 장점을 모두 가져가는 구조가 필요했습니다.</p>',
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
          'alpha 환경: 홈랩 Kubernetes 클러스터 + `alpha.singun11.wtf`',
          'production 환경: AWS EC2 + RDS + `kkambbaki.singun11.wtf`',
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
        '<p>AI 리포트 생성 흐름이 길게 이어집니다.</p>' +
        '<ol>' +
        '<li>게임 결과 누적</li>' +
        '<li>LLM 분석</li>' +
        '<li>부모용 조언 생성</li>' +
        '<li>PDF 렌더링</li>' +
        '<li>이메일 발송</li>' +
        '</ol>' +
        '<p>이 흐름을 어떻게 모듈화할지가 문제였습니다.</p>',
      approach:
        '<p>reports 도메인 안에서 책임을 나눴습니다.</p>' +
        '<ul>' +
        '<li><strong>models</strong>: Report / GameReport / GameReportAdvice / ReportPin</li>' +
        '<li><strong>services</strong>: report_generation_service / game_report_generation_service / report_email_service / base_pdf_generator</li>' +
        '<li><strong>llm</strong>: generator / prompt / provider</li>' +
        '<li><strong>tasks</strong>: report_task / report_email_task (Celery 진입점)</li>' +
        '<li><strong>authentication</strong>: 리포트 접근 인증</li>' +
        '</ul>',
      result:
        '<p>전체 흐름이 같은 도메인 안에서 단계별로 합성됩니다. 각 단계는 services 의 클래스 하나가 책임집니다.</p>' +
        '<p>Django management command 도 동일한 services 를 호출하므로, 운영 중 재실행이 가능합니다.</p>',
      detail: {
        background:
          '<p>AI 리포트 생성은 외부 I/O 가 긴 작업입니다.</p>' +
          '<ul>' +
          '<li>LLM 호출</li>' +
          '<li>통계 분석</li>' +
          '<li>PDF 렌더링</li>' +
          '<li>이메일 발송</li>' +
          '</ul>' +
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
        '<p>아이의 회복탄력성과 집중력을 보려면 단순 점수 / 정답률만으로는 부족했습니다.</p>',
      approach:
        '<p>게임 라운드마다 다차원 지표를 GameResult 에 저장하고, LLM 프롬프트에 그대로 주입했습니다.</p>' +
        '<ul>' +
        '<li>최대 도달 라운드</li>' +
        '<li>평균 도달 라운드</li>' +
        '<li>반응 속도</li>' +
        '<li>오답률</li>' +
        '<li>제한시간 초과율</li>' +
        '</ul>',
      result:
        '<p>학부모에게 "몇 점" 이 아니라 "어떤 영역이 강하고 어떤 영역이 약한지" 를 정량과 자연어 조언으로 함께 전달합니다.</p>',
    },
  ],
  contributions: [
    '<strong>Backend</strong>. Django 모델 / 서비스 / 태스크 구현.' +
      '<ul>' +
      '<li><strong>common</strong>: BaseModel / BaseAPIView / BaseAPIException 인프라</li>' +
      '<li><strong>users</strong>: User / Child / BotToken</li>' +
      '<li><strong>games</strong>: Game / GameSession / GameResult / RankingEntry</li>' +
      '<li><strong>reports</strong>: Report / GameReport / GameReportAdvice / ReportPin</li>' +
      '</ul>',
    '<strong>Infra</strong>. 환경 분리 + ArgoCD GitOps.' +
      '<ul>' +
      '<li>alpha: 홈랩 Kubernetes</li>' +
      '<li>production: AWS EC2 + RDS</li>' +
      '<li>ArgoCD GitOps 매니페스트 작성</li>' +
      '</ul>',
    '<strong>CI / CD</strong>. AWS production 환경 + GitHub Actions 로 CI / 커버리지 / Swagger 자동화.',
    '<strong>비동기 파이프라인</strong>. reports 도메인의 LLM 호출 + PDF + 이메일 발송 흐름 설계.',
  ],
  links: [
    { label: 'Backend repo', url: 'https://github.com/kkambbaki/backend', type: 'github' },
    { label: 'Frontend repo', url: 'https://github.com/kkambbaki/frontend', type: 'github' },
    { label: 'Infra repo', url: 'https://github.com/kkambbaki/infra', type: 'github' },
    { label: 'Org README', url: 'https://github.com/kkambbaki/.github', type: 'github' },
    { label: 'GitHub Org', url: 'https://github.com/kkambbaki', type: 'github' },
    {
      label: '발표 자료 (PDF)',
      url: '/my-portfolio/docs/kkambbaki-presentation.pdf',
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
    pdfUrl: '/my-portfolio/docs/kkambbaki-presentation.pdf',
    pageImages: presentationPages('kkambbaki', 18),
  },
}
