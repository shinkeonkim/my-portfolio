import type { Project } from '@/types'
import { presentationPages } from './_helpers'

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
    'Channels',
    'Celery',
    'Python 3.12',
    'LangChain',
    'LiteLLM Gateway',
    'GPT-4o-mini',
    'AWS Bedrock',
    'pgvector',
    'faster-whisper',
    'edge-tts',
    'MediaPipe',
    'React 19',
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
    '"아직 핏이 맞지 않아도 괜찮아." — 이력서·채용공고 기반 AI 면접관 + Audio/Video/Transcript 분석 + 5개 영역 리포트를 한 플랫폼에서.',
  description:
    '면접 연습의 기회 비대칭(서류 수십 회 vs 모의면접 0~2회)을 해소하기 위해 만든 자기주도형 면접 트레이닝 플랫폼입니다. 4인 팀의 PM 겸 BE/Infra/AI 멀티 역할로 12개 서브 프로젝트 · 14개 Django 도메인 앱 · 206개 테스트 · 241페이지 결과보고서까지 책임졌습니다. 페르소나 3종(취준생·이직자·부트캠프 강사)에 맞춰 FOLLOWUP/FULL_PROCESS 두 모드 + 친근·일반·압박 3단계 면접관을 제공하며, K3s 자체 호스팅 + faster-whisper · edge-tts 셀프호스팅으로 월 인프라 비용을 $80~100 수준에 유지합니다.',
  features: [
    '이력서 PDF·DOCX 업로드 → pypdf 텍스트 추출 + pgvector 임베딩(1536d, 500자 청크) + ThreadPoolExecutor 4-way 병렬 LLM 파싱 (30~60초, ~$0.006/이력서)',
    '채용공고 URL 입력 → httpx → Playwright 2단계 fallback + 텍스트 → Vision LLM 2단계 추출 (사람인·잡코리아·잡플래닛)',
    'AI 면접 (FOLLOWUP 꼬리질문 / FULL_PROCESS 전체 프로세스) · 친근/일반/압박 3단계 면접관 · RAG 기반 이력서 컨텍스트 주입',
    'MediaRecorder webm → S3 멀티파트 (5MB 청크, Presigned URL 직접 업로드) → SNS → SQS Fan-out → Lambda 4+1종 (video-converter/frame-extractor/audio-extractor/voice-analyzer + face-analyzer)',
    '표정 분석 (MediaPipe blendshape 5종 규칙 기반 + OpenCV solvePnP 시선) · 발화 분석 (pydub silence detection · WPM · 필러워드)',
    'STT 셀프호스팅 (faster-whisper small int8 CPU, OpenAI Whisper API 대비 4~5배 빠르고 운영비 $0) · TTS 셀프호스팅 (edge-tts 322 voice · 142 언어, 운영비 $0)',
    '5단계 리포트 파이프라인 + 5개 카테고리 평가(구체성·직무 적합성·논리성·신뢰도·면접태도) · Pydantic structured output + Hypothesis 속성 기반 테스트',
    '스트릭 캘린더 (GitHub 기여도 형태) · 4개 카테고리 업적 · Free(10)/Pro(30) 티켓 + daily/purchased 차감 순서 강제 + Celery Beat 매일 KST 00:00 리셋',
    'WebSocket(양방향, Connection Fencing code 4409) + SSE(서버→클라이언트, 분석 진행) 이원화 + JWT(Access 5분/Refresh 7일, HttpOnly Cookie + 메모리)',
    'Three.js + @react-three/fiber 3D 메타볼 랜딩 + GSAP ScrollTrigger + Lottie · Vite manualChunks 코드 스플리팅으로 면접 세션 페이지 미로드',
    '하이브리드 코드 RAG 챗봇 (ChromaDB 벡터 + BM25Okapi + NetworkX Personalised PageRank, ~2400 청크) · 5중 검색 강화(Query Rewrite/Multi-Query/HyDE/MMR/BM25) · 비밀값 11종 자동 마스킹 + 93 테스트',
  ],
  challenges: [
    {
      problem: '4인 팀 · 60일 제약 · 14개 도메인 + 12개 서브 프로젝트를 어떤 백엔드 프레임워크로 풀 것인가.',
      approach:
        'Django 6 · FastAPI · Spring Boot 3개 후보를 "팀 역량 × 시간 제약" 함수로 평가. Django 6 선택 (내장 인증·admin·마이그레이션). 도메인 앱(`webapp/도메인`)과 API 앱(`webapp/api/v1/도메인`) 물리 분리, BaseService + validate/execute 패턴으로 트랜잭션 경계 명시화, LLM 호출은 트랜잭션 외부.',
      result:
        '14개 도메인 앱(users·profiles·interviews·resumes·jds·achievements·streaks·dashboard·subscriptions·tickets·notifications·terms·llm_trackers) + 206개 테스트(Factory Boy + @patch)를 60일 안에 완성. 4인 병렬 작업 시 merge conflict 최소화.',
    },
    {
      problem: 'EKS 컨트롤 플레인 월 ~$73 + 6개 Pod의 OpenAI 직접 호출 + Secret 4개 분산 — 캡스톤 예산($100/월)으로 감당 불가.',
      approach:
        'K3s on EC2 2노드(m5.large heavy + t3.small light, nodepool 라벨 핀) + iptables NAT로 Pod→EC2 메타데이터 라우팅(AWS Secret 코드에서 완전 제거). LLM Gateway는 5개 후보(LiteLLM/OneAPI/Portkey/Helicone/Kong) 비교 후 LiteLLM 선정 — OpenAI 호환 API로 서비스당 ≤25줄 변경으로 마이그레이션 + Bedrock/Gemini 멀티 프로바이더 폴백 + 가상키 Spend 추적.',
      result:
        '컨트롤 플레인 $73/월 절감 + Secret 4→1 중앙화 + 야간 정지(7시간)로 EC2 추가 30% 절감 → 총 인프라 비용 $80~100/월. cert-manager + Let\'s Encrypt로 3개 도메인(api.mefit.kr · llm.mefit.kr · voice.mefit.kr) 자동 인증서.',
    },
    {
      problem: '면접 영상은 큰 파일, 분석은 오래 걸리고 실패 재시도 필요. K3s 리소스로 ffmpeg 병렬 처리는 부담.',
      approach:
        'S3 ObjectCreated → SNS `video-uploaded` 토픽 → 3 SQS fan-out → Lambda 4+1종(video-converter · frame-extractor · audio-extractor · voice-analyzer + face-analyzer) 병렬. Lambda Layer `mefit-video-common`로 config/s3/ffmpeg/event 공통화. K3s sqs-celery-worker가 Celery v2 step-complete 메시지 소비 (Redis + SQS dual broker).',
      result:
        '면접 1건 처리 비용 ~$0.001 + 호출당 과금으로 K3s 리소스 무영향 + 5개 SQS · 6개 S3 버킷(presigned URL private) 설계. Lambda 250MB 제한에 맞춰 face-analyzer는 MediaPipe blendshape 5종 규칙 기반, voice-analyzer는 librosa 회피하고 pydub만 사용.',
    },
    {
      problem: '임베딩 모델도 폴백하면 가용성이 올라가지 않을까? → silent corruption 위험.',
      approach:
        'OpenAI 1536d vs Bedrock Titan 1024d 차원 불일치 + 같은 차원이라도 벡터 공간 비호환이라는 분석. "한 번이라도 다른 모델로 저장되면 검색 인덱스가 영구 오염된다"는 결론. 의도적으로 폴백을 금지하고 fail-fast + Slack 알림으로 통보하는 아키텍처 결정을 문서화.',
      result:
        'pgvector 단일 모델(text-embedding-3-small) 운영으로 인덱스 무결성 보장. 이중 임베딩 전략(원문 청크 + parsed_data 구조화)으로 자연어 질문/역량 매칭 양쪽 커버. 사용자 편집 시 구조화 임베딩만 재생성하여 비용 절감.',
    },
    {
      problem: '프로덕션 인시던트 2건 — RDS 커넥션 풀 고갈 + STT_DISPATCH_SILENT_FAILURE (예외 없음, 로그 정상, DB 정상).',
      approach:
        '1) RDS 풀 고갈: Celery 시그널 누수 + SQLAlchemy 풀 설정 부재 → 코드 + RDS 파라미터(idle_session_timeout 900s) 동시 수정. CloudWatch Alarm 2단계(Warning 50 · Critical 65) + Performance Insights. 2) STT Silent: K8s env precedence로 `CELERY_BROKER_URL=""` → Celery memory:// silent fallback. infra manifest 1줄 제거 + Slack 에러 알림 .apply() 동기 실행.',
      result:
        '근본 원인 분석 + 포스트모템 문서화 + 운영 프로세스(Slack 2채널 · EC2 lifecycle 알림 · false positive Pause 정책) 수립. Grafana Cloud Free Tier 65% 내 + alloy-metrics/alloy-singleton/kube-state-metrics + alarm grouping(5분 wait)으로 알람 폭풍 방지.',
    },
    {
      problem: '4인 팀에서 25+ 페이지 · 14개 features의 프런트엔드를 어떻게 병렬 개발할 것인가.',
      approach:
        'React 19 + Vite 7 + Feature-Sliced Design 6 레이어(app→pages→features→entities→widgets→shared) 단방향 의존. Zustand 5로 12개 store 분리. React Compiler로 수동 useMemo/useCallback 제거. Three.js+GSAP+Lottie 랜딩은 Vite manualChunks 코드 스플리팅으로 면접 세션 페이지에서 미로드.',
      result:
        '14 features 모듈 · 25+ 페이지 · 12 Zustand store를 단방향 의존으로 정리해 "파일 배치 논쟁" 제거. MediaPipe Face Landmarker는 WebGL GPU 가속으로 60fps 실시간 자가 점검 + 별도 Lambda face-analyzer가 정밀 분석 — 같은 기능을 용도에 따라 분리.',
    },
  ],
  contributions: [
    'PM: 12개 서브 프로젝트 모노레포 설계 + 9개 기술 의사결정(Django/K3s/edge-tts/LiteLLM/FSD/pgvector/Zustand/faster-whisper/Docker) 문서화 + 241페이지 결과보고서 원안 작성 (본문 139p + 부록 100p)',
    'Backend: Django 6 + DRF + Channels 기반 14개 도메인 앱 + BaseService 패턴 + JWT(Access 5분/Refresh 7일 + Connection Fencing 4409) + 5종 커스텀 예외 + 206개 테스트 + Slack Bot 3채널 알림',
    'Infra: K3s on EC2 2노드(nodepool·PDB·priorityClass) + LiteLLM Gateway(5개 후보 비교 → 마이그레이션 + Bedrock 폴백 + 가상키 Spend) + Grafana Cloud(alloy + kube-state-metrics) + cert-manager + iptables NAT IAM Role',
    'AI/RAG: pgvector 이중 임베딩 + RAG 면접 질문 생성 + LangChain TokenUsage 추적 + Pydantic structured output + Hypothesis 속성 기반 테스트 + 5중 검색 강화(Rewrite/Multi-Query/HyDE/MMR/BM25) 코드 RAG 챗봇',
    '비용 최적화: K3s 컨트롤 플레인 $73/월 + 야간 정지 30% + faster-whisper · edge-tts 셀프호스팅 → 총 $80~100/월 + Lambda 호출당 과금 + Grafana Cloud Free Tier 65%',
    '운영: 인시던트 2건(RDS 풀 고갈 + STT Silent Failure) 근본 원인 분석 + 포스트모템 + 재발 방지 프로세스 수립',
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
  presentation: {
    title: 'MeFit 발표 자료',
    caption: '26페이지 · 2026 국민대 캡스톤 디자인 발표',
    totalPages: 26,
    pdfUrl: '/my-portfolio/docs/mefit-presentation.pdf',
    pageImages: presentationPages('mefit', 26),
  },
}
