import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/my-portfolio/images/projects/athena/media'

export const athena: Project = {
  slug: 'athena',
  name: 'Athena',
  displayName: 'Athena',
  subtitle: '인터랙티브 AI 알고리즘 학습 플랫폼',
  period: { start: '2025-04', end: '2025-06' },
  scale: 'major',
  status: 'completed',
  roles: ['기획', '단독 개발'],
  team: { size: 1, lead: true },
  stack: ['Django', 'DRF', 'Python', 'Rust', 'gRPC', 'Docker', 'docker-compose', 'Celery', 'Redis', 'PostgreSQL', 'LLM', 'Flower'],
  oneLiner: 'LLM 코드 피드백과 격리 실행 환경을 갖춘 인터랙티브 알고리즘 학습 플랫폼: 단독 기획·개발.',
  description:
    '<p>문제 해결과 학습을 위한 인터랙티브 웹 플랫폼입니다. 기획 / 설계 / 구현 / 운영을 단독으로 진행했습니다.</p>' +
    '<p>Django 위 도메인은 책임별로 분리되어 있습니다.</p>' +
    '<ul>' +
    '<li><strong>main / user / article</strong>: 사용자 / 콘텐츠</li>' +
    '<li><strong>problem</strong>: 문제 데이터</li>' +
    '<li><strong>agent</strong>: LLM 기반 상호작용</li>' +
    '<li><strong>api</strong>: 외부 인터페이스</li>' +
    '</ul>' +
    '<p>사용자가 제출한 코드는 별도 gRPC 마이크로서비스의 Docker 샌드박스에서 격리 실행됩니다. LLM 이 결과를 분석해 피드백을 돌려줍니다.</p>' +
    '<p>2025학년도 1학기 국민대학교 소프트웨어융합대학 크리에이터 경진대회 1등 수상.</p>',
  features: [
    {
      title: 'Django 도메인 + docker-compose',
      content: [
        '백엔드 도메인: agent / article / problem / user / api / main',
        '<strong>웹앱 / DB</strong>: athena_webapp / athena_db / athena_test_db',
        '<strong>비동기</strong>: redis / celery-worker / celery-beat / flower',
      ],
    },
    {
      title: 'code-executor 마이크로서비스',
      content: [
        'Rust + gRPC(:50051)',
        'Docker 샌드박스에서 Python / Ruby 등을 격리 실행',
        'timeout / memory limit 강제',
        'stdin / stdout / stderr 입출력',
        '메모리 / 실행 시간 / status 반환',
      ],
    },
    {
      title: 'code-judger 마이크로서비스',
      content: [
        'Rust + gRPC(:50052)',
        'code-executor 와 연동해 채점',
        '출력 비교: 끝 공백 / 개행은 무시, 앞과 중간은 모두 고려',
      ],
    },
    {
      title: 'code-testcase-generator 마이크로서비스',
      content: [
        'Python + gRPC(:50053)',
        'LLM(Gemini / ChatGPT) 으로 validation_code / solution_code 자동 생성',
        '테스트케이스 자동 생성',
      ],
    },
    {
      title: 'LLM 피드백 루프',
      content: [
        '답변마다 사용자가 👍 / 👎 평가를 남김',
        '평가 데이터를 다음 프롬프트에 반영',
      ],
    },
    {
      title: '문제 자동 수집',
      content: [
        'Celery + Redis 로 주기 수집',
        '1순위: solved.ac API 호출',
        '실패 시: 웹 파싱으로 fallback',
        '수집된 데이터를 LLM 으로 검증',
      ],
    },
    {
      title: '요금제 기반 LLM 할당량',
      content: [
        'Free / Pro 별 ticket 분리',
        '호출 실패 시 ticket 원복 보상 트랜잭션 적용',
      ],
    },
    {
      title: '한국어 검색 최적화',
      content: [
        'PostgreSQL <code>pg_trgm</code> 확장 도입',
        'GIN Index 를 trigram 에 적용',
        'Dockerfile 에서 확장 모듈 빌드',
      ],
    },
  ],
  challenges: [
    {
      title: 'Code 실행을 별도 gRPC 마이크로서비스로 분리',
      tags: ['Rust', 'gRPC', 'Docker sandbox'],
      problem:
        '<p>사용자 코드를 안전하게 실행해야 했습니다.</p>' +
        '<p>같은 Django 프로세스에서 돌리면 다음 리스크가 있습니다.</p>' +
        '<ul>' +
        '<li>한 컨테이너의 폭주가 전체 서비스에 영향</li>' +
        '<li>언어 추가 시 메인 앱이 무거워짐</li>' +
        '</ul>',
      approach:
        '<p>실행 / 채점 / 테스트 생성을 별도 repo + 별도 컨테이너로 분리했습니다. 모두 proto 로 인터페이스를 명시했습니다.</p>' +
        '<ul>' +
        '<li><strong>code-executor</strong>: Rust + gRPC + Docker 샌드박스</li>' +
        '<li><strong>code-judger</strong>: Rust + gRPC. code-executor 호출.</li>' +
        '<li><strong>code-testcase-generator</strong>: Python + gRPC + LLM</li>' +
        '</ul>',
      result:
        '<ul>' +
        '<li>한 마이크로서비스의 폭주가 다른 영역에 영향을 주지 않습니다.</li>' +
        '<li>신규 언어 / 채점 정책 / 테스트 생성 전략을 각자 독립적으로 변경할 수 있습니다.</li>' +
        '<li>proto 가 단일 진실 공급원(SSOT) 역할을 합니다.</li>' +
        '</ul>',
      detail: {
        background:
          '<p>사용자가 임의의 코드를 실행하는 시스템은 보안과 안정성이 가장 중요했습니다.</p>' +
          '<p>다음 조건을 모두 만족해야 했습니다.</p>' +
          '<ul>' +
          '<li>한 컨테이너가 메모리 / CPU 를 점유하더라도 전체 서비스에 영향을 주지 않음</li>' +
          '<li>언어별 환경 추가가 쉬움</li>' +
          '</ul>',
        implementation: [
          '<strong>code-executor</strong> (Rust, :50051):' +
            '<ul>' +
            '<li>요청: <code>ExecuteCodeRequest(code, language, version, timeout_seconds, memory_limit_mb, input)</code></li>' +
            '<li>응답: <code>ExecuteCodeResponse(status, stdout, stderr, memory_used_kb, execution_time_ms)</code></li>' +
            '</ul>',
          '<strong>code-judger</strong> (Rust, :50052):' +
            '<ul>' +
            '<li>요청: <code>JudgeRequest(..., expected_output)</code></li>' +
            '<li>응답: <code>JudgeResponse(status, correct, actual_output, ...)</code></li>' +
            '</ul>',
          '<strong>code-testcase-generator</strong> (Python, :50053): LLM 으로 validation_code / solution_code 생성. code-executor 로 검증.',
          '<strong>출력 비교 정책</strong>: 끝의 공백 / 개행은 무시. 앞과 중간은 모두 고려.',
          '<strong>Django 메인 앱</strong>: gRPC 클라이언트로 위 서비스들을 호출.',
        ],
        learnings: [
          'proto 인터페이스를 먼저 정하면 4개 repo 가 동시에 진행되더라도 충돌이 거의 없습니다.',
          '"실행 / 채점 / 테스트 생성" 처럼 책임이 다른 작업은 처음부터 마이크로서비스로 나누는 편이 학습 가치가 큽니다.',
        ],
      },
    },
    {
      title: '문제 자동 수집: API 우선 + 웹 파싱 fallback + LLM 검증',
      tags: ['Celery', 'BeautifulSoup', 'LLM validation'],
      problem:
        '<p>외부 사이트에서 문제를 수집할 때 다음 이슈가 자주 발생했습니다.</p>' +
        '<ul>' +
        '<li>API 호출 한도 초과</li>' +
        '<li>파싱 규격 변동</li>' +
        '<li>잘못된 데이터 유입</li>' +
        '</ul>',
      approach:
        '<p>Celery 워커에서 다음 흐름으로 수집하도록 설계했습니다.</p>' +
        '<ol>' +
        '<li>solved.ac API 호출을 우선</li>' +
        '<li>실패 시 웹 파싱으로 fallback</li>' +
        '<li>LLM 으로 한 번 더 검증해 비정상 데이터를 걸러냄</li>' +
        '<li>토큰 버킷으로 호출량을 조절</li>' +
        '</ol>',
      result:
        '<p>대량 수집 중에도 실패 비율을 통제 가능한 수준으로 유지했습니다. 운영 중 직접 손대는 일이 거의 없었습니다.</p>',
    },
    {
      title: 'LLM 호출 실패 시 ticket 원복 보상 트랜잭션',
      tags: ['Compensation transaction', 'Billing'],
      problem:
        '<p>LLM 호출은 비용과 실패율 변동이 큽니다.</p>' +
        '<p>사용자가 답변을 받지 못한 채 ticket(할당량) 만 차감되는 사례가 발생했습니다.</p>',
      approach:
        '<ul>' +
        '<li>LLM 호출이 오류로 끝나면 차감된 ticket 을 원복하는 보상 트랜잭션을 추가</li>' +
        '<li>Free / Pro 별로 할당량을 분리해 무료 남용을 막고 유료 안정성을 확보</li>' +
        '</ul>',
      result:
        '<p>사용자 신뢰가 회복되고 비용도 통제됐습니다. 환불 정책 없이도 사용자 불만이 사라졌습니다.</p>',
    },
    {
      title: 'GIN Index 한국어 trigram 적용',
      tags: ['PostgreSQL', 'pg_trgm', 'GIN'],
      problem:
        '<p>문제 / 질문 검색이 데이터가 늘어나면서 느려졌습니다.</p>',
      approach:
        '<ul>' +
        '<li>PostgreSQL <code>pg_trgm</code> 확장을 도입</li>' +
        '<li>GIN Index 를 trigram 에 적용</li>' +
        '<li>Dockerfile 에서 해당 확장 모듈을 빌드하도록 변경</li>' +
        '</ul>',
      result:
        '<p>문제 검색 응답 시간이 체감 가능한 수준으로 단축됐습니다.</p>',
    },
    {
      title: 'LLM 피드백 품질을 어떻게 측정하고 개선할 것인가',
      tags: ['Prompt engineering', 'User feedback'],
      problem:
        '<p>LLM 피드백이 좋은지 나쁜지 정량으로 알 길이 없었습니다.</p>',
      approach:
        '<ul>' +
        '<li>LLM 답변마다 사용자가 👍 / 👎 평가를 남길 수 있도록 추가</li>' +
        '<li>수집된 평가 데이터를 다음 프롬프트에 반영</li>' +
        '</ul>',
      result:
        '<p>피드백 품질에 대한 정량 지표를 확보했습니다. 프롬프트를 점진적으로 다듬는 사이클이 확립됐습니다.</p>',
    },
  ],
  contributions: [
    '<strong>4개 repo 단독 운영</strong>. 기획 / 설계 / 구현 / 운영을 모두 직접.' +
      '<ul>' +
      '<li>Athena</li>' +
      '<li>code-executor</li>' +
      '<li>code-judger</li>' +
      '<li>code-testcase-generator</li>' +
      '</ul>',
    '<strong>아키텍처 설계</strong>.' +
      '<ul>' +
      '<li>Django 도메인 분리: main / user / article / problem / agent / api</li>' +
      '<li>gRPC 마이크로서비스: Rust 2종 + Python 1종</li>' +
      '</ul>',
    '<strong>운영 디테일</strong>. 다음 정책을 직접 결정.' +
      '<ul>' +
      '<li>GIN Index 한국어 trigram</li>' +
      '<li>ticket 원복 보상 트랜잭션</li>' +
      '<li>요금제 기반 LLM 할당량</li>' +
      '</ul>',
    '<strong>문서 / 발표</strong>. 캡스톤 보고서 단독 작성 + 발표 영상 직접 제작.',
  ],
  links: [
    {
      label: 'Main repo',
      url: 'https://github.com/shinkeonkim/AD_project_athena',
      type: 'github',
    },
    {
      label: 'Code Executor (Rust)',
      url: 'https://github.com/shinkeonkim/code-executor',
      type: 'github',
    },
    {
      label: 'Code Judger (Rust)',
      url: 'https://github.com/shinkeonkim/code-judger',
      type: 'github',
    },
    {
      label: 'Testcase Generator (LLM)',
      url: 'https://github.com/shinkeonkim/code-testcase-generator',
      type: 'github',
    },
    {
      label: '캡스톤 보고서 (PDF)',
      url: 'https://github.com/shinkeonkim/AD_project_athena/blob/main/report/20191564.pdf',
      type: 'article',
    },
    {
      label: '발표 영상 (93MB)',
      url: 'https://github.com/shinkeonkim/AD_project_athena/blob/main/video/Athena%20%EB%B0%9C%ED%91%9C%EC%98%81%EC%83%81.mp4',
      type: 'video',
    },
  ],
  award: '2025 소프트웨어융합대학 크리에이터 경진대회 1등',
  hero: '/my-portfolio/images/projects/athena/main-page.png',
  media: [
    {
      type: 'image',
      url: '/my-portfolio/images/projects/athena/main-page.png',
      caption: '메인 화면: 문제 목록 + 검색',
    },
    {
      type: 'image',
      url: '/my-portfolio/images/projects/athena/question-page.png',
      caption: '문제 페이지: LLM 피드백 + 코드 실행',
    },
    { type: 'video', url: `${IMG}/main.mp4`, caption: '메인 화면 인터랙션' },
    { type: 'video', url: `${IMG}/auth.mp4`, caption: '회원 기능: 가입/로그인' },
    { type: 'video', url: `${IMG}/question-list.mp4`, caption: '질문 목록: LLM 질의응답 기록' },
    { type: 'video', url: `${IMG}/llm-feedback.mp4`, caption: 'LLM 피드백: 코드 분석 결과' },
    { type: 'video', url: `${IMG}/code-run.mp4`, caption: '코드 실행: Docker 격리 환경 다언어 실행' },
  ],
  presentation: {
    title: 'Athena 발표 자료',
    caption: '34페이지',
    totalPages: 34,
    pdfUrl: '/my-portfolio/docs/athena-presentation.pdf',
    pageImages: presentationPages('athena', 34),
  },
}
