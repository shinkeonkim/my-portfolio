import type { Project } from '@/types'
import { presentationPages } from './_helpers'
import { mefitChallenges } from './mefit-challenges'

const IMG = '/images/projects/mefit'

export const mefit: Project = {
  slug: 'mefit',
  name: 'meFit',
  displayName: '미핏 · meFit',
  subtitle: '이력서 기반 AI 면접부터 시선·발화 분석까지',
  period: { start: '2026-02', end: '2026-06' },
  scale: 'major',
  status: 'completed',
  roles: ['PM', '백엔드', '인프라', 'AI'],
  team: { size: 4, lead: true },
  stack: [
    'Django',
    'Celery',
    'PostgreSQL',
    'pgvector',
    'React',
    'TypeScript',
    'K3s',
    'AWS',
  ],
  oneLiner:
    '"아직 핏이 맞지 않아도 괜찮아." 이력서·채용공고 기반 AI 면접관 / Audio·Video·Transcript 분석 리포트.',
  description:
    '<p>면접 연습의 기회 비대칭을 해소하기 위해 만든 자기주도형 면접 트레이닝 플랫폼입니다. 4인 팀의 PM 을 맡으면서 백엔드 · 인프라 · AI 까지 여러 영역을 책임졌습니다.</p>' +
    '<p>주요 페르소나는 취업 · 이직을 준비하는 사용자로, ' +
    '<strong>꼬리질문 · 전체 프로세스</strong> 두 가지 면접 방식, <strong>친근 · 일반 · 압박</strong> 3단계 면접관 톤, ' +
    '<strong>연습 · 실전</strong> 모드를 함께 제공합니다.</p>' +
    '<p>이력서는 pypdf 추출 → pgvector 임베딩(1536d, 500자 청크) → 병렬 LLM 파싱을 거쳐 ' +
    '한 건당 30 ~ 60초, 최대 $0.006 수준으로 구조화됩니다. 이 결과와 채용공고가 RAG 컨텍스트로 면접 질문 생성에 주입됩니다.</p>' +
    '<p>면접 영상은 표정(MediaPipe blendshape 5종), 시선(OpenCV solvePnP), ' +
    '발화(pydub 무음 구간 · WPM · 필러워드)까지 분석해 구체성 · 직무 적합성 · 논리성 · 신뢰도 · 면접태도 5개 카테고리 리포트로 만듭니다.</p>' +
    '<p>스트릭 캘린더와 4개 카테고리 업적으로 재방문 루프를 만들고, Free / Pro 요금제에 따라 매일 티켓을 지급합니다. ' +
    'K3s 자체 호스팅과 faster-whisper · edge-tts 셀프호스팅으로 월 인프라 비용을 합리적인 수준에 두었습니다.</p>',
  features: [],
  challenges: mefitChallenges,
  contributions: [
    {
      title: 'PM',
      summary: '서브 프로젝트로 모노레포를 나누고 기술 의사결정을 문서화. 결과보고서 원안도 작성.',
      items: [
        '모노레포를 백엔드 · 음성/영상/이력서 분석 · 인프라 · 프론트엔드 12개 서브 프로젝트로 나눠 각자 독립적으로 배포하게 했습니다.',
        'Django · K3s · LiteLLM · pgvector · FSD 등 되돌리기 어려운 기술 선택은 대안 비교와 함께 문서로 남겼습니다.',
      ],
    },
    {
      title: 'Backend',
      summary: 'Django 6 + DRF + Channels 위에 도메인 앱과 공통 인프라를 구축.',
      items: [
        '이력서 · 채용공고 · 면접 세션 · 구독 · 알림을 14개 도메인 앱으로 나누고, 도메인 레이어와 API 레이어를 물리적으로 분리했습니다.',
        '쓰기 로직은 BaseService 로 트랜잭션 경계를 고정하고, Factory Boy 와 @patch 로 외부 호출을 격리해 테스트했습니다.',
        '예외를 종류별로 정의해 HTTP 응답 규약을 통일하고, 오류 · 이벤트 · N+1 경고를 각각 다른 Slack 채널로 보내 알림 소음을 줄였습니다.',
      ],
    },
    {
      title: 'Infra',
      summary: 'K3s 클러스터를 EC2 위에 직접 운영.',
      items: [
        'server 와 agent 노드를 나누고 PodDisruptionBudget 과 priorityClass 로 무거운 워크로드가 밀려나지 않게 했습니다.',
        "cert-manager 로 Let's Encrypt 인증서를 자동 갱신해 만료 대응을 운영 업무에서 없앴습니다.",
      ],
    },
    {
      title: 'AI / RAG',
      summary: 'pgvector 와 LangChain 기반 면접 질문 생성, 그리고 별도 코드 RAG 챗봇.',
      items: [
        'TokenUsageCallback 으로 호출별 토큰과 비용을 추적해 프롬프트 변경이 비용에 미치는 영향을 확인했습니다.',
        'Pydantic structured output 에 Hypothesis 속성 기반 테스트를 붙여 LLM 응답 포맷이 깨지는 경우를 미리 잡았습니다.',
      ],
    },
  ],
  links: [
    { label: '서비스 (mefit.kr)', url: 'https://mefit.kr', type: 'demo' },
    {
      label: 'Capstone 랜딩',
      url: 'https://kookmin-sw.github.io/2026-capstone-54/',
      type: 'article',
    },
    { label: 'Frontend repo', url: 'https://github.com/kmu-aws-capstone-team-4/frontend', type: 'github' },
    {
      label: '면접 분석 리포트 repo',
      url: 'https://github.com/kmu-aws-capstone-team-4/interview-analysis-report',
      type: 'github',
    },
    { label: 'Backend repo', url: 'https://github.com/kmu-aws-capstone-team-4/backend', type: 'github' },
    { label: 'Mefit Diagrams', url: 'https://github.com/kmu-aws-capstone-team-4/mefit-diagrams', type: 'github' },
    { label: '영상 분석 repo', url: 'https://github.com/kmu-aws-capstone-team-4/analysis-video', type: 'github' },
    { label: 'Voice API', url: 'https://github.com/kmu-aws-capstone-team-4/voice-api', type: 'github' },
    { label: '이력서 분석 repo', url: 'https://github.com/kmu-aws-capstone-team-4/analysis-resume', type: 'github' },
    { label: 'Face Analyzer', url: 'https://github.com/kmu-aws-capstone-team-4/face-analyzer', type: 'github' },
    { label: 'Infra repo', url: 'https://github.com/kmu-aws-capstone-team-4/infra', type: 'github' },
    { label: 'Scraping repo', url: 'https://github.com/kmu-aws-capstone-team-4/scraping', type: 'github' },
    { label: 'STT 분석 repo', url: 'https://github.com/kmu-aws-capstone-team-4/analysis-stt', type: 'github' },
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
    { type: 'image', url: `${IMG}/full-infrastructure.png`, caption: '통합 인프라: CloudFlare → k3s → AWS' },
    { type: 'image', url: `${IMG}/aws-infrastructure.png`, caption: 'AWS 영상 처리 파이프라인 (S3 → SNS → SQS → Lambda 5종)' },
    { type: 'image', url: `${IMG}/k3s-infrastructure.png`, caption: 'k3s 클러스터 배포 구조' },
    { type: 'image', url: `${IMG}/activity-01-auth.png`, caption: '인증 / 회원가입 / 온보딩 흐름' },
    { type: 'image', url: `${IMG}/activity-02-resume.png`, caption: '이력서 등록 → 분석' },
    { type: 'image', url: `${IMG}/activity-03-job.png`, caption: '채용공고 수집 (Playwright + GPT)' },
    { type: 'image', url: `${IMG}/activity-04-interview.png`, caption: '가상 면접 진행 (WebSocket + MediaRecorder)' },
    { type: 'image', url: `${IMG}/activity-05-report.png`, caption: '분석 리포트 생성 (LLM + 5개 카테고리)' },
  ],
  presentation: {
    title: 'MeFit 발표 자료',
    caption: '26페이지 · 2026 국민대 캡스톤 디자인 발표',
    totalPages: 26,
    pdfUrl: '/docs/mefit-presentation.pdf',
    pageImages: presentationPages('mefit', 26),
  },
}
