import type { Project } from '@/types'

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
  stack: ['Django', 'Rust', 'Docker', 'docker-compose', 'gRPC', 'Celery', 'Redis', 'PostgreSQL', 'LLM', 'Flower'],
  oneLiner: 'LLM 코드 분석 피드백과 다중 언어 격리 실행 환경을 갖춘 인터랙티브 알고리즘 학습 플랫폼.',
  description:
    '문제 해결과 학습을 위한 인터랙티브 웹 플랫폼을 단독으로 기획·개발했습니다. 사용자가 코드를 제출하면 격리된 Docker 환경에서 실행되고, LLM이 분석 피드백을 제공합니다. 2025학년도 1학기 소프트웨어융합대학 크리에이터 경진대회 1등 수상.',
  features: [
    'LLM 코드 분석 피드백 시스템 (사용자 평가 정보 수집 → 프롬프트 개선)',
    'Docker 다중 언어(C++, Python, Ruby, Java) 격리 실행 환경',
    'Celery/Redis 활용 solved.ac API 및 웹 파싱 기반 문제 수집 자동화',
    'AI 에이전트 기반 상호작용 시스템',
    'MSA: Code Executor / Judger / Testcase Generator를 gRPC로 연동',
    '요금제 기반 LLM 호출 할당량 관리 (Free/Pro)',
    'GIN Index 기반 한국어 문제 검색 최적화',
  ],
  challenges: [
    {
      problem: '사용자 코드를 안전하게 실행하면서도 언어별 환경을 빠르게 띄워야 함.',
      approach:
        'Code Executor를 Rust로 구현해 빠른 부팅과 안전한 격리(Docker)를 동시에 확보. 언어별 베이스 이미지 분리. Judger / Executor / Generator 모두 별도 MSA로 gRPC 분리.',
      result: '신규 언어 추가가 이미지 추가만으로 가능하고, 한 컨테이너의 폭주가 전체에 영향을 주지 않음.',
    },
    {
      problem: '외부 사이트에서 문제를 수집할 때 API 한도·파싱 변동·잘못된 데이터가 자주 발생.',
      approach:
        'Celery 워커에서 API 우선 / 웹 파싱 fallback 전략을 두고, LLM을 이용한 검증 과정을 추가해 잘못된 수집 데이터를 자동 필터링. 실패 시 토큰 버킷으로 호출량 조절.',
      result: '대량 수집 중에도 실패 비율을 통제 가능한 수준으로 유지. 운영 중 직접 수동 보정 거의 없음.',
    },
    {
      problem: 'LLM 호출은 비용·실패율 변동이 큼. 사용자가 답변을 받지 못한 채 ticket(할당량)만 차감되는 사례 발생.',
      approach:
        'LLM 답변을 가져오다 오류 발생 시 ticket을 원복시키는 보상 트랜잭션을 추가. 추가로 요금제(Free/Pro)별 할당량 분리.',
      result: '사용자 신뢰 회복 + 비용 통제. 무료 사용자 남용 방지 + 유료 사용자 안정성 확보.',
    },
    {
      problem: '문제·질문 검색이 대량 데이터에서 느려짐.',
      approach: 'PostgreSQL GIN Index를 한국어 trigram에 적용. Dockerfile에서 확장 모듈을 빌드하도록 변경.',
      result: '문제 검색 응답 시간 대폭 단축, 유저 체감 속도 개선.',
    },
    {
      problem: 'LLM 피드백 품질을 어떻게 개선할지 알 수 없음.',
      approach:
        'LLM Feedback 답변에 대한 사용자 평가 정보(👍/👎)를 수집하는 기능을 추가하고, 수집된 게시글 정보를 다음 프롬프트에 주입하도록 개선.',
      result: '피드백 품질에 대한 정량 지표 확보 + 프롬프트 점진 개선 사이클.',
    },
  ],
  contributions: [
    '단독 기획 · 설계 · 구현 · 운영',
    'MSA 설계 및 gRPC 인터페이스 정의 (4개 repo: athena / code-executor / code-judger / code-testcase-generator)',
    'GIN Index · 보상 트랜잭션 · 요금제 기반 할당량 등 운영 디테일 직접 결정',
    '캡스톤 보고서 단독 작성 (PDF) + 발표 영상 직접 제작',
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
      caption: '메인 화면 — 문제 목록 + 검색',
    },
    {
      type: 'image',
      url: '/my-portfolio/images/projects/athena/question-page.png',
      caption: '문제 페이지 — LLM 피드백 + 코드 실행',
    },
    { type: 'video', url: `${IMG}/main.mp4`, caption: '메인 화면 인터랙션' },
    { type: 'video', url: `${IMG}/auth.mp4`, caption: '회원 기능 — 가입/로그인' },
    { type: 'video', url: `${IMG}/question-list.mp4`, caption: '질문 목록 — LLM 질의응답 기록' },
    { type: 'video', url: `${IMG}/llm-feedback.mp4`, caption: 'LLM 피드백 — 코드 분석 결과' },
    { type: 'video', url: `${IMG}/code-run.mp4`, caption: '코드 실행 — Docker 격리 환경 다언어 실행' },
  ],
}
