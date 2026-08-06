import type { Project } from '@/types'
import { presentationPages } from './_helpers'

const IMG = '/images/projects/athena/media'

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
  stack: ['Django', 'Rust', 'gRPC', 'Docker', 'Celery', 'PostgreSQL'],
  oneLiner: 'LLM 코드 피드백과 격리 실행 환경을 갖춘 인터랙티브 알고리즘 학습 플랫폼: 단독 기획·개발.',
  description:
    '<p>문제 해결과 학습을 위한 인터랙티브 웹 플랫폼입니다. 기획 / 설계 / 구현 / 운영을 단독으로 진행했습니다.</p>' +
    '<p>Django 위 도메인은 사용자·콘텐츠, 문제 데이터, LLM 상호작용, 외부 인터페이스로 책임을 나눴습니다.</p>' +
    '<p>사용자가 제출한 코드는 별도 gRPC 마이크로서비스의 Docker 샌드박스에서 timeout · 메모리 제한과 함께 격리 실행되고, ' +
    '채점과 테스트케이스 생성도 각각 독립 서비스가 맡습니다. LLM 이 결과를 분석해 피드백을 돌려주며, ' +
    '답변마다 남기는 👍 / 👎 평가가 다음 프롬프트 개선에 반영됩니다.</p>' +
    '<p>문제 데이터는 Celery 로 주기 수집하고, 요금제별 ticket 으로 LLM 호출량을 통제합니다. ' +
    'docker-compose 로 웹앱 · 운영/테스트 DB · Redis · Celery worker·beat·flower 를 한 번에 띄워 단독 개발 속도를 유지했습니다.</p>' +
    '<p>2025학년도 1학기 국민대학교 소프트웨어융합대학 크리에이터 경진대회 1등 수상.</p>',
  features: [],
  challenges: [
    {
      title: 'Code 실행을 별도 gRPC 마이크로서비스로 분리',
      tags: ['Rust', 'gRPC', 'Docker sandbox'],
      problem:
        '<p>사용자 코드를 Django 프로세스에서 직접 실행하면 서비스 전체가 실행 리소스와 보안 위험을 함께 떠안게 됩니다.</p>' +
        '<ul>' +
        '<li>한 실행 컨테이너의 폭주가 전체 서비스에 영향을 줍니다.</li>' +
        '<li>언어를 추가할수록 메인 애플리케이션이 무거워집니다.</li>' +
        '</ul>',
      approach:
        '<p>실행, 채점, 테스트 생성을 별도 저장소와 컨테이너로 분리하고 proto로 인터페이스를 고정했습니다.</p>' +
        '<ul>' +
        '<li><strong>code-executor</strong>: Rust + gRPC + Docker 샌드박스</li>' +
        '<li><strong>code-judger</strong>: Rust + gRPC. code-executor 호출.</li>' +
        '<li><strong>code-testcase-generator</strong>: Python + gRPC + LLM</li>' +
        '</ul>',
      result:
        '<ul>' +
        '<li>한 마이크로서비스의 폭주가 다른 영역에 영향을 주지 않습니다.</li>' +
        '<li>언어, 채점 정책, 테스트 생성 전략을 서로 독립적으로 변경할 수 있습니다.</li>' +
        '<li>proto가 서비스 간 계약의 단일 진실 공급원 역할을 합니다.</li>' +
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
        '<p>외부 문제를 대량 수집할 때 API 호출 한도 초과, 파싱 규격 변동, 잘못된 데이터 유입을 함께 다뤄야 했습니다.</p>',
      approach:
        '<p>Celery 워커에서 다음 흐름으로 수집하도록 설계했습니다.</p>' +
        '<ol>' +
        '<li>solved.ac API를 우선 호출했습니다.</li>' +
        '<li>API가 실패하면 웹 파싱으로 전환했습니다.</li>' +
        '<li>LLM 검증으로 비정상 데이터를 걸러냈습니다.</li>' +
        '<li>토큰 버킷으로 호출량을 조절했습니다.</li>' +
        '</ol>',
      result:
        '<p>대량 수집의 실패를 자동으로 복구하고 검증해 수동 개입이 거의 필요 없는 흐름을 만들었습니다.</p>',
    },
  ],
  contributions: [
    {
      title: '4개 repo 단독 운영',
      summary: '웹앱과 실행 · 채점 · 테스트케이스 생성 마이크로서비스 4개 저장소의 기획 / 설계 / 구현 / 운영을 모두 직접 담당.',
    },
    {
      title: '아키텍처 설계',
      summary:
        'Django 를 6개 도메인으로 나누고, 코드 실행·채점·테스트케이스 생성은 Rust 2종 + Python 1종 gRPC 마이크로서비스로 분리.',
    },
    {
      title: '운영 디테일',
      summary:
        '한국어 trigram GIN Index, ticket 원복 보상 트랜잭션, 요금제 기반 LLM 할당량 정책을 직접 결정.',
    },
    {
      title: '문서 / 발표',
      summary: '캡스톤 보고서 단독 작성 + 발표 영상 직접 제작.',
    },
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
  hero: '/images/projects/athena/main-page.png',
  media: [
    {
      type: 'image',
      url: '/images/projects/athena/main-page.png',
      caption: '메인 화면: 문제 목록 + 검색',
    },
    {
      type: 'image',
      url: '/images/projects/athena/question-page.png',
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
    pdfUrl: '/docs/athena-presentation.pdf',
    pageImages: presentationPages('athena', 34),
  },
}
