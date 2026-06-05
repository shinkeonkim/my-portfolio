import type { Project } from '@/types'

const IMG = '/my-portfolio/images/projects/mefit'

export const mefit: Project = {
  slug: 'mefit',
  name: 'meFit',
  displayName: '미핏 · meFit',
  subtitle: '이력서 기반 AI 면접부터 시선·발화 분석까지',
  period: { start: '2026-02', end: null },
  scale: 'major',
  status: 'in-progress',
  roles: ['PM', '백엔드', '인프라', 'AI'],
  team: { size: 4, lead: true },
  stack: [
    'Django 6',
    'DRF',
    'Celery',
    'Channels',
    'LangChain',
    'GPT-4o',
    'React 19',
    'Bun',
    'k3s',
    'AWS Lambda',
    'S3',
    'SNS/SQS',
    'PostgreSQL',
    'Redis',
  ],
  oneLiner:
    '"아직 핏이 맞지 않아도 괜찮아." — 이력서·채용공고 기반 AI 면접관 + Audio/Video/Transcript 분석 + 5개 영역 리포트를 한 플랫폼에서.',
  description:
    '면접 연습의 기회 비대칭(서류 수십 회 vs 모의면접 0~2회)을 해소하기 위해 만든 자기주도형 면접 트레이닝 플랫폼입니다. PM 겸 BE/Infra/AI 책임자로 도메인 모델링부터 LangChain 5종 워커, k3s 클러스터 운영, AWS Lambda 5종 영상 파이프라인까지 전 영역을 설계·운영하고 있습니다. 페르소나 3종(취준생·이직자·부트캠프 강사)에 맞춰 FOLLOWUP/FULL_PROCESS 두 모드 + 친근·일반·압박 3단계 면접관을 제공합니다.',
  features: [
    '이력서 PDF·DOCX 업로드 → 텍스트 추출 + 임베딩(pgvector) + LLM 파싱 병렬 처리',
    '채용공고 URL 입력 → Playwright + GPT 자동 추출, SSE 실시간 진행 표시',
    'AI 면접 (FOLLOWUP 꼬리질문 / FULL_PROCESS 전체 프로세스) · 친근/일반/압박 3단계 면접관',
    'MediaRecorder webm → S3 Presigned URL 직접 업로드 → SNS → SQS Fan-out → Lambda 5종 (converter/frame/audio/voice/face)',
    '표정 분석 (MediaPipe Face Landmarker, 긍정/부정/중립/미감지 4분류) · 발화 분석 (faster-whisper int8) 병렬 수행',
    '5단계 리포트 파이프라인 (Loader → VoiceAnalysisInvoker → AnalysisContext.build → LLMAnalyzer → Repository.save)',
    '5개 카테고리 점수(구체성·직무 적합성·논리성·신뢰도·면접태도) + 0~100 종합 + 5단계 등급 + 질문별 strengths/improvements/model_answer',
    '스트릭 캘린더 (GitHub 기여도 형태) · 4개 카테고리 업적 (Interview/Streak/Profile/Custom) · Free/Pro 티켓 시스템',
    'Edge TTS 14언어/322 voice 기반 voice-api 서브프로젝트 · LiteLLM Gateway로 OpenAI/Bedrock 추상화',
  ],
  challenges: [
    {
      problem: '여러 마이크로서비스(웹/분석/미디어)를 한 클러스터에서 안전하게 배포해야 함.',
      approach:
        'EC2 위 k3s 클러스터를 직접 프로비저닝하고, Traefik Ingress + 단일 Namespace에 backend/voice-api/4개 워커 + Redis + Flower를 통합 배포. GitHub Actions + deploy.sh로 무중단 배포.',
      result: '리포 단위 독립 배포로 변경 영향 범위를 좁히고, 인프라 리소스를 단일 클러스터로 집약.',
    },
    {
      problem: '면접 영상은 큰 파일이고, 분석은 오래 걸리며, 실패 재시도가 필요함.',
      approach:
        'S3 업로드 → SNS → SQS Fan-out → 5종 Lambda(converter/frame/audio/face/voice)가 병렬 처리. 결과는 step-complete 큐 통합, 실패는 DLQ로 격리.',
      result: '업로드/분석/저장을 비동기 분리해 사용자 응답성을 유지하고, 단계별 실패 격리로 운영 안정성 확보.',
    },
    {
      problem: 'LLM 호출이 비용·실패율·지연시간 면에서 변동이 큼.',
      approach:
        'LiteLLM Gateway로 OpenAI/Bedrock을 추상화하고, TokenUsage 추적 + LangChain 기반 5개 워커(scraping / analysis-resume / analysis-stt / interview-analysis-report / voice-api)로 책임 분리.',
      result: '모델 교체 비용 최소화 + 호출 비용·실패율을 일관된 메트릭으로 관측 가능.',
    },
    {
      problem: '프런트엔드가 빠르게 비대해질 수 있음.',
      approach:
        'React 19 + Vite + Bun에 Feature-Sliced Design 아키텍처와 useReducer 기반 면접 상태머신을 도입.',
      result: '신규 기능 추가 시에도 레이어 위반 최소화 + 면접 흐름의 명확한 상태 전이 유지.',
    },
  ],
  contributions: [
    'PM으로서 일정·범위 조율 및 전체 아키텍처 의사결정 주도',
    'k3s 클러스터 · CI/CD · AWS 영상 파이프라인 전 영역 설계 및 운영',
    'LangChain 기반 5종 LLM 워커 아키텍처 수립',
    'Grafana + Prometheus + Loki 관측 스택 구축',
  ],
  links: [
    { label: '서비스 (mefit.kr)', url: 'https://mefit.kr', type: 'demo' },
    {
      label: 'Capstone 랜딩',
      url: 'https://kookmin-sw.github.io/2026-capstone-54/',
      type: 'article',
    },
    {
      label: 'Capstone 메인 repo',
      url: 'https://github.com/kookmin-sw/2026-capstone-54',
      type: 'github',
    },
    {
      label: 'Backend repo',
      url: 'https://github.com/kmu-aws-capstone-team-4/backend',
      type: 'github',
    },
    {
      label: '시연 영상',
      url: 'https://www.youtube.com/watch?v=IRrJmqBDQqc',
      type: 'video',
    },
  ],
  award: '2026 국민대학교 캡스톤 디자인 금상',
  hero: `${IMG}/youtube-thumb.jpg`,
  media: [
    { type: 'youtube', url: 'https://www.youtube.com/embed/IRrJmqBDQqc', caption: '시연 영상' },
    { type: 'image', url: `${IMG}/full-infrastructure.png`, caption: '통합 인프라 — CloudFlare → k3s → AWS' },
    { type: 'image', url: `${IMG}/aws-infrastructure.png`, caption: 'AWS 영상 처리 파이프라인 (S3 → SNS → SQS → Lambda 5종)' },
    { type: 'image', url: `${IMG}/k3s-infrastructure.png`, caption: 'k3s 클러스터 배포 구조' },
    { type: 'image', url: `${IMG}/activity-01-auth.png`, caption: '인증 / 회원가입 / 온보딩 흐름' },
    { type: 'image', url: `${IMG}/activity-02-resume.png`, caption: '이력서 등록 → 분석' },
    { type: 'image', url: `${IMG}/activity-03-job.png`, caption: '채용공고 수집 (Playwright + GPT)' },
    { type: 'image', url: `${IMG}/activity-04-interview.png`, caption: '가상 면접 진행 (WebSocket + MediaRecorder)' },
    { type: 'image', url: `${IMG}/activity-05-report.png`, caption: '분석 리포트 생성 (LLM + 5개 카테고리)' },
  ],
}
