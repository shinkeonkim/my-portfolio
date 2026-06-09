import type { Project } from '@/types'
import { presentationPages } from './_helpers'
import { mefitChallenges } from './mefit-challenges'

const IMG = '/my-portfolio/images/projects/mefit'

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
    'DRF',
    'Channels',
    'Celery',
    'Python',
    'LangChain',
    'LiteLLM Gateway',
    'GPT-4o-mini',
    'AWS Bedrock',
    'pgvector',
    'faster-whisper',
    'edge-tts',
    'MediaPipe',
    'React',
    'TypeScript',
    'Vite',
    'Zustand',
    'FSD',
    'Three.js',
    'k3s',
    'AWS Lambda',
    'S3',
    'SNS/SQS',
    'PostgreSQL',
    'Redis',
    'Grafana Cloud',
  ],
  oneLiner:
    '"아직 핏이 맞지 않아도 괜찮아." 이력서·채용공고 기반 AI 면접관 / Audio·Video·Transcript 분석 리포트.',
  description:
    '<p>면접 연습의 기회 비대칭을 해소하기 위해 만든 자기주도형 면접 트레이닝 플랫폼입니다. 4인 팀의 PM 을 맡으면서 백엔드 · 인프라 · AI 까지 여러 영역을 책임졌습니다.</p>' +
    '<p>주요 페르소나는 취업 · 이직을 준비하는 사용자입니다. 다음 기능을 함께 제공합니다.</p>' +
    '<ul>' +
    '<li><strong>꼬리질문 모드 / 전체 프로세스 모드</strong> 면접</li>' +
    '<li><strong>친근 / 일반 / 압박</strong> 3단계 면접관 톤</li>' +
    '<li><strong>연습 / 실전</strong> 두 가지 모드</li>' +
    '</ul>' +
    '<p>K3s 자체 호스팅과 faster-whisper · edge-tts 셀프호스팅으로 월 인프라 비용을 합리적인 수준에 두었습니다.</p>',
  features: [
    {
      title: '이력서 분석 파이프라인',
      content: [
        'pypdf 텍스트 추출 → pgvector 임베딩(1536d, 500자 청크) → 병렬 LLM 파싱',
        '30 ~ 60초 안에 완료',
        '이력서당 비용은 최대 $0.006 수준',
      ],
    },
    {
      title: 'AI 면접',
      content: [
        '이력서를 RAG 컨텍스트로 주입',
        '모드: 꼬리질문 / 전체 프로세스',
        '면접관 톤: 친근 / 일반 / 압박',
      ],
    },
    {
      title: '면접 영상 처리',
      content: [
        '업로드 흐름: MediaRecorder webm → S3 멀티파트(5MB 청크, Presigned URL) → SNS → SQS Fan-out → Lambda',
        '<strong>video-converter</strong>: mp4 변환',
        '<strong>frame-extractor</strong>: 표정 분석용 프레임 추출',
        '<strong>audio-extractor</strong>: 오디오 분리',
        '<strong>voice-analyzer</strong>: 음성 지표',
        '<strong>face-analyzer</strong>: 표정 분류 / 시선 추정',
      ],
    },
    {
      title: '비언어 분석',
      content: [
        'MediaPipe blendshape 5종: smile / frown / brow_down / jaw_open / eye_squint',
        'OpenCV solvePnP 기반 시선 추정',
        'pydub silence detection / WPM / 필러워드',
      ],
    },
    {
      title: 'STT / TTS 셀프호스팅',
      content: [
        '<strong>STT</strong>: faster-whisper small int8 (OpenAI Whisper API 대비 빠른 CPU 추론)',
        '<strong>TTS</strong>: edge-tts (322 voice / 142 언어)',
      ],
    },
    {
      title: '리포트 파이프라인',
      content: [
        '단계 흐름: Loader → VoiceAnalysisInvoker → AnalysisContext.build → LLMAnalyzer → Repository.save',
        '평가 카테고리: 구체성 / 직무 적합성 / 논리성 / 신뢰도 / 면접태도',
        'Pydantic structured output + Hypothesis 속성 기반 테스트로 포맷 강제',
      ],
    },
    {
      title: '학습 루프',
      content: [
        '스트릭 캘린더 (GitHub 기여도 형태)',
        '업적 4개 카테고리: Interview / Streak / Profile / Custom',
        '티켓: Free / Pro. daily 가 먼저 차감되고 purchased 가 뒤따름',
        'Celery Beat 가 매일 KST 00:00 에 daily 리셋',
      ],
    },
    {
      title: '실시간 통신 · 인증',
      content: [
        '<strong>WebSocket</strong>: 양방향 통신. Connection Fencing code 4409',
        '<strong>SSE</strong>: 서버 → 클라이언트 분석 진행 알림',
        '<strong>JWT</strong>: Access 5분 / Refresh 7일',
        '<strong>저장</strong>: HttpOnly Cookie + 메모리에 분리 저장',
      ],
    },
    {
      title: '랜딩 페이지 최적화',
      content: [
        '3D 메타볼: Three.js + @react-three/fiber',
        '스크롤 인터랙션: GSAP ScrollTrigger',
        '모션: Lottie',
        'Vite manualChunks 코드 스플리팅: 면접 세션 페이지에서는 로드되지 않음',
      ],
    },
    {
      title: '코드 RAG 챗봇',
      content: [
        '하이브리드 검색: ChromaDB 벡터 + BM25Okapi + NetworkX Personalised PageRank (약 2400 청크)',
        '5중 검색 강화: Query Rewrite / Multi-Query / HyDE / MMR / BM25',
        '비밀값 11종 자동 마스킹 + 회귀 테스트로 안전성 확보',
      ],
    },
  ],
  challenges: mefitChallenges,
  contributions: [
    '<strong>PM</strong>. 서브 프로젝트로 모노레포를 나누고 기술 의사결정을 문서화. 결과보고서 원안도 작성.' +
      '<ul>' +
      '<li>서브 프로젝트: backend / voice-api / analysis-resume / analysis-stt / analysis-video / face-analyzer / interview-analysis-report / scraping / infra / mefit-tools / mefit-diagrams / frontend</li>' +
      '<li>의사결정: Django · K3s · edge-tts · LiteLLM · FSD · pgvector · Zustand · faster-whisper · Docker</li>' +
      '</ul>',
    '<strong>Backend</strong>. Django 6 + DRF + Channels 위에 도메인 앱과 공통 인프라를 구축.' +
      '<ul>' +
      '<li>도메인 앱: users / profiles / interviews / resumes / job_descriptions / achievements / streaks / dashboard / subscriptions / tickets / notifications / terms_documents / llm_trackers / realtime_docs</li>' +
      '<li>BaseService 패턴 + Factory Boy + @patch 기반 테스트</li>' +
      '<li>JWT 인증 (Access 5분 / Refresh 7일 + Connection Fencing code 4409)</li>' +
      '<li>커스텀 예외 (Validation · Unauthorized · PermissionDenied · NotFound · Conflict)</li>' +
      '<li>Slack Bot 알림 채널 분리 (ERROR · EVENT · NPLUSONE)</li>' +
      '</ul>',
    '<strong>Infra</strong>. K3s 클러스터를 EC2 위에 직접 운영.' +
      '<ul>' +
      '<li>server / agent 노드 분리 (nodepool · PodDisruptionBudget · priorityClass)</li>' +
      '<li>LiteLLM Gateway 도입 (LiteLLM · OneAPI · Portkey · Helicone · Kong 비교 후 선정)</li>' +
      '<li>멀티 프로바이더 폴백 + 가상키 Spend 추적</li>' +
      '<li>Grafana Cloud (alloy-metrics · alloy-singleton · kube-state-metrics)</li>' +
      "<li>cert-manager + Let's Encrypt 자동 인증서</li>" +
      '<li>iptables NAT 로 Pod 가 EC2 IAM Role 자격 증명을 그대로 사용</li>' +
      '</ul>',
    '<strong>AI / RAG</strong>. pgvector 와 LangChain 기반 면접 질문 생성, 그리고 별도 코드 RAG 챗봇.' +
      '<ul>' +
      '<li>이중 임베딩 (원문 청크 + 구조화 JSON)</li>' +
      '<li>TokenUsageCallback 으로 토큰 / 비용 추적</li>' +
      '<li>Pydantic structured output + Hypothesis 속성 기반 테스트</li>' +
      '<li>코드 RAG: ChromaDB 벡터 + BM25Okapi + NetworkX Personalised PageRank 하이브리드 검색</li>' +
      '<li>5중 검색 강화 (Query Rewrite / Multi-Query / HyDE / MMR / BM25)</li>' +
      '</ul>',
    '<strong>비용 최적화</strong>.' +
      '<ul>' +
      '<li>EKS 대신 K3s 로 컨트롤 플레인 비용 제거</li>' +
      '<li>야간 EC2 정지로 상시 비용 절감</li>' +
      '<li>faster-whisper · edge-tts 셀프호스팅</li>' +
      '<li>Lambda 호출당 과금 + Grafana Cloud Free Tier 안에서 운영</li>' +
      '</ul>',
    '<strong>운영</strong>. 두 건의 프로덕션 인시던트를 포스트모템으로 정리하고 재발 방지 체계 수립.' +
      '<ul>' +
      '<li>RDS 커넥션 풀 고갈 / STT silent failure 근본 원인 분석</li>' +
      '<li>알림 채널 분리 (애플리케이션 / 인프라)</li>' +
      '<li>알람 grouping + false positive Pause 정책</li>' +
      '</ul>',
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
    pdfUrl: '/my-portfolio/docs/mefit-presentation.pdf',
    pageImages: presentationPages('mefit', 26),
  },
}
