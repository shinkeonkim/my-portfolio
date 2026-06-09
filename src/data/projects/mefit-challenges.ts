import type { ProjectChallenge } from '@/types'

export const mefitChallenges: readonly ProjectChallenge[] = [
  {
    title: 'Django 6 도메인 모듈 분리 설계',
    tags: ['Django 6', 'DRF', 'BaseService', 'Python 3.12'],
    problem:
      '면접 도메인이 넓고 4인이 함께 개발해야 했습니다. 어떤 프레임워크로 풀고, 어떻게 충돌 없이 병렬 작업할지가 문제였습니다.',
    approach:
      '<p>Django 6 / FastAPI / Spring Boot 를 비교하고 Django 6 을 선택했습니다.</p>' +
      '<ul>' +
      '<li>도메인 레이어 <code>webapp/&lt;도메인&gt;/</code> 와 API 레이어 <code>webapp/api/v1/&lt;도메인&gt;/</code> 을 물리 분리</li>' +
      '<li>BaseService + <code>validate</code> / <code>execute</code> 패턴으로 트랜잭션 경계 명시</li>' +
      '<li>LLM 호출은 트랜잭션 외부에서 수행하도록 규약화</li>' +
      '</ul>',
    result:
      '<p>다음 도메인 앱을 도메인 / API 레이어로 분리해 운영합니다.</p>' +
      '<ul>' +
      '<li>users / profiles / interviews / resumes / job_descriptions</li>' +
      '<li>achievements / streaks / dashboard</li>' +
      '<li>subscriptions / tickets / notifications</li>' +
      '<li>terms_documents / llm_trackers / realtime_docs</li>' +
      '</ul>' +
      '<p>Factory Boy + <code>@patch</code> 기반 테스트 스위트를 갖춘 상태에서, 4인 병렬 작업 중 merge conflict 가 거의 발생하지 않았습니다.</p>',
    detail: {
      background:
        '<p>면접 도메인은 영역이 넓었습니다. 인증 · 이력서 · 면접 세션 · 실시간 알림 · 구독 · 티켓 · 분석 리포트 · 업적 · 연속 학습 보상 체계까지 포함했습니다.</p>' +
        '<p>4인이 독립적으로 개발 · 배포할 수 있는 모듈 구조가 필요했고, 한 번에 결정하면 되돌리기 어려운 프레임워크 선택이 첫 번째 의사결정이었습니다.</p>',
      options: [
        {
          label: 'Option A: Django 6 + DRF',
          pros: [
            '인증/권한/admin/마이그레이션 내장',
            'ORM 성숙도, Celery·Channels 통합 용이',
            'pgvector·django-storages·drf-spectacular 등 생태계 활용',
          ],
          cons: ['초기 boilerplate', 'startup 시간이 FastAPI 대비 무거움'],
          chosen: true,
        },
        {
          label: 'Option B: FastAPI',
          pros: ['비동기 네이티브', '자동 OpenAPI 문서', '경량 런타임'],
          cons: [
            '인증/admin/마이그레이션을 직접 구축해야 함',
            '도메인 수가 늘어날수록 boilerplate 폭증',
          ],
        },
        {
          label: 'Option C: Spring Boot',
          pros: ['엔터프라이즈 생태계', '정적 타입 안전성'],
          cons: [
            '팀 전원 Python 숙련도 대비 Java 학습 비용',
            '잔여 기간 내 무리한 선택',
          ],
        },
      ],
      decision:
        '주어진 기간 안에서 "만들지 않아도 되는 것(인증 · admin · 마이그레이션)"이 가장 큰 자산이라고 판단. Django 의 batteries included 와 ORM 성숙도가 넓은 도메인을 다루는 데 그대로 도움이 되었습니다.',
      implementation: [
        '`webapp/<도메인>/` 에는 models, services, enums, factories, tasks, signals 를 둡니다',
        '`webapp/api/v1/<도메인>/` 에는 views, serializers, urls, consumers, routing 을 둡니다',
        '파일당 1 클래스 원칙 + `__init__.py` 에 `__all__` 명시',
        'BaseModel / BaseModelWithUUID / BaseModelWithSoftDelete / BaseModelWithUUIDAndSoftDelete 중 적절한 베이스 상속',
        'BaseService(쓰기, 트랜잭션 안) + BaseQueryService(읽기, 트랜잭션 없음) 으로 분리',
        'LLM 호출은 트랜잭션 외부에서. DB 커넥션 풀 고갈 방지가 목적',
        '코드 스타일은 yapf(indent=2) + isort(profile=black) + flake8. pre-commit 으로 강제',
      ],
      learnings: [
        '프레임워크 선택은 성능보다 "팀 역량 × 잔여 기간" 함수로 결정',
        '도메인/API 레이어 물리 분리는 병렬 개발에서 merge conflict 를 거의 제거',
        'LLM 호출을 트랜잭션 밖으로 빼는 규약은 실제 인시던트(PM-05) 가 발생한 뒤에 가치가 다시 확인되었습니다',
      ],
    },
  },
  {
    title: 'K3s on EC2 + LiteLLM Gateway',
    tags: ['K3s', 'LiteLLM', 'EC2', 'AWS Bedrock', 'iptables NAT'],
    problem:
      '<p>예산 안에서 다음을 모두 해결해야 했습니다.</p>' +
      '<ul>' +
      '<li>EKS 컨트롤 플레인 비용</li>' +
      '<li>여러 Pod 에서 OpenAI 를 직접 호출하면서 분산된 API 키</li>' +
      '<li>키 분산으로 인한 멀티 프로바이더 폴백 · 비용 추적 어려움</li>' +
      '</ul>',
    approach:
      '<ul>' +
      '<li>K3s on EC2 에 server / agent 노드를 나누고 무거운 워크로드는 server 에 핀</li>' +
      '<li>iptables NAT 로 Pod 가 EC2 인스턴스 메타데이터에 접근해 IAM Role 자격 증명 사용. AWS Secret 을 코드 밖으로 제거</li>' +
      '<li>LLM Gateway 후보 5종(LiteLLM · OneAPI · Portkey · Helicone · Kong) 비교 후 LiteLLM Proxy 선정</li>' +
      '<li>OpenAI 호환 API 라 각 서비스의 base_url 만 바꾸는 작은 변경으로 마이그레이션</li>' +
      '</ul>',
    result:
      '<ul>' +
      '<li>EKS 대비 컨트롤 플레인 비용 제거 + 야간 정지로 EC2 비용 추가 절감</li>' +
      '<li>AWS Secret 을 한 곳으로 중앙화</li>' +
      '<li>backend / voice-api / analysis-resume / analysis-stt / interview-analysis-report / scraping 의 LLM 호출이 LiteLLM 한 곳을 통해 흐르고, Bedrock / Gemini 폴백과 Spend 추적이 한 대시보드에서 보입니다</li>' +
      "<li>cert-manager + Let's Encrypt 로 api.mefit.kr · llm.mefit.kr · voice.mefit.kr 자동 인증서</li>" +
      '</ul>',
    detail: {
      background:
        '여러 Pod 가 OpenAI 를 직접 호출하면서 API 키가 여러 Secret 에 흩어졌고, 멀티 프로바이더 폴백·비용 추적·키 회수가 모두 어려웠습니다. 동시에 EKS 컨트롤 플레인 비용이 캡스톤 예산을 그대로 압박하던 상황.',
      options: [
        {
          label: 'Option A: AWS EKS',
          pros: ['관리형 Kubernetes', 'IRSA 등 AWS 네이티브 통합'],
          cons: ['컨트롤 플레인 고정 비용', '노드 그룹 관리 복잡'],
        },
        {
          label: 'Option B: K3s on EC2',
          pros: ['경량 단일 바이너리', '컨트롤 플레인 비용 없음', 'Kubernetes API 호환'],
          cons: ['IRSA 가 없어 IAM 자격 증명 우회 설계가 필요'],
          chosen: true,
        },
        {
          label: 'Option C: Docker Compose',
          pros: ['가장 단순'],
          cons: ['rolling update, health check, 자동 복구가 부재'],
        },
      ],
      decision:
        'Kubernetes API 호환을 유지하면서 컨트롤 플레인 비용을 제거. LLM Gateway 는 OpenAI 호환 API 라 마이그레이션 비용이 가장 낮은 LiteLLM Proxy 선정.',
      implementation: [
        'K3s on EC2: server (heavy 워크로드, m5.large) + agent (경량, t3.small)',
        'nodepool=heavy 라벨 핀 + PodDisruptionBudget(minAvailable=1) + priorityClass=critical',
        'iptables NAT 로 Pod → 169.254.169.254 라우팅 → boto3 가 IAM Role 자격 증명 자동 사용',
        'LiteLLM Proxy 를 K3s Pod 으로 배포 (Helm chart)',
        '각 서비스: `OPENAI_BASE_URL=http://mefit-llm-gateway:4000/v1` 만 변경',
        '가상키 Spend 추적 + Bedrock / Gemini 폴백 + content_policy / context_window 폴백 체인',
        'cert-manager + Let\'s Encrypt 로 api.mefit.kr · llm.mefit.kr · voice.mefit.kr 인증서 자동 갱신',
      ],
      learnings: [
        '인프라 결정은 "규모에 맞는 도구" 선택이 핵심',
        'LLM Gateway 가치는 "개별 서비스가 LLM 인프라를 몰라도 되게 만드는 것"',
        'iptables NAT 는 EKS 의 IRSA 를 K3s 에서 우회하는 우아한 방법: AWS Secret 을 코드에서 완전히 제거',
      ],
    },
  },
  {
    title: 'AWS Lambda Fan-out 기반 영상 처리 파이프라인',
    tags: ['AWS Lambda', 'SNS', 'SQS', 'ffmpeg', 'MediaPipe'],
    problem:
      '<p>면접 영상은 용량이 크고 분석이 오래 걸리며 실패 재시도가 필요했습니다.</p>' +
      '<p>같은 K3s 클러스터에서 ffmpeg 를 돌리면 다른 Pod 가 영향을 받았습니다.</p>',
    approach:
      '<p>S3 ObjectCreated 이벤트를 SNS 의 <code>video-uploaded</code> 토픽으로 받아 SQS 로 fan-out 합니다. 각 SQS 에 연결된 Lambda 가 병렬로 처리합니다.</p>' +
      '<ol>' +
      '<li>video-converter / frame-extractor / audio-extractor 가 동시에 시작</li>' +
      '<li>frame 결과는 face-trigger SQS 를 거쳐 face-analyzer 로 이어짐</li>' +
      '<li>audio 결과는 voice-analyzer 로 이어짐</li>' +
      '</ol>' +
      '<p>공통 코드는 <code>mefit-video-common</code> Layer 로 분리하고, K3s 쪽 sqs-celery-worker 가 Celery v2 step-complete 메시지를 소비해 백엔드 상태를 갱신합니다.</p>',
    result:
      '<ul>' +
      '<li>K3s 리소스에 영향을 주지 않으면서 영상 업로드 즉시 변환 · 프레임 · 오디오 · 음성 · 표정 작업이 동시에 시작</li>' +
      '<li>모든 S3 버킷은 private + presigned URL 로만 접근</li>' +
      '<li>face-analyzer 는 MediaPipe blendshape (smile / frown / brow_down / jaw_open / eye_squint) 규칙 기반</li>' +
      '<li>voice-analyzer 는 librosa 를 제거하고 pydub silence detection 만 사용해 Lambda 패키지 크기 제한 통과</li>' +
      '</ul>',
    detail: {
      background:
        '면접 종료 후 녹화 영상에서 mp4 변환, 프레임 추출(표정 분석용), 오디오 추출(음성 분석용)을 동시에 수행해야 했습니다. 각 처리는 독립적이라 병렬 실행이 가능했지만 K3s 클러스터의 한정된 리소스에서 ffmpeg 를 직접 돌리는 것은 다른 워크로드에 부담이 됐습니다.',
      options: [
        {
          label: 'Option A: K3s 내부 Celery worker 로 처리',
          pros: ['인프라 통합'],
          cons: ['ffmpeg 가 CPU / 메모리를 대량 소비해 다른 Pod 영향', '동시 면접 종료 시 리소스 경합'],
        },
        {
          label: 'Option B: AWS Lambda 서버리스로 분리',
          pros: ['호출당 과금', '자동 스케일링', 'K3s 리소스 영향 없음'],
          cons: ['250MB 패키지 제한', '콜드 스타트', 'K3s ↔ Lambda 간 통신 설계 필요'],
          chosen: true,
        },
      ],
      decision:
        '간헐적인 면접 종료 시점에는 상시 워커보다 호출당 과금이 유리. SNS fan-out 으로 병렬 트리거, 큐별 DLQ 로 실패를 격리.',
      implementation: [
        'S3 ObjectCreated → SNS `video-uploaded` 토픽 → SQS fan-out (video / frame / audio)',
        'video-converter Lambda: webm → mp4 컨테이너 변환 + 720p 다운스케일',
        'frame-extractor Lambda: 1FPS 프레임 추출 → ZIP → face-trigger SQS → face-analyzer Lambda',
        'audio-extractor Lambda: 16kHz mono PCM 으로 리샘플링',
        'voice-analyzer Lambda: pydub silence detection (-40dBFS, 500ms)',
        'face-analyzer Lambda: MediaPipe FaceLandmarker + OpenCV solvePnP 시선 추정',
        'Lambda Layer `mefit-video-common`: config / s3_client / ffmpeg_runner / event_parser / celery_publisher',
        'K3s sqs-celery-worker 가 Celery v2 step-complete 메시지를 소비해 InterviewTurn 상태 갱신',
      ],
      learnings: [
        '서버리스 핵심은 "이벤트 흐름 설계"',
        'SNS fan-out + Celery v2 step-complete 는 서버리스 ↔ 컨테이너 경계를 잇는 통신 프로토콜',
        'Lambda Layer 로 공통 코드를 공유하면서 각 Lambda 는 독립 배포 가능',
        '"충분히 좋은 정확도" 와 "완벽한 정확도" 사이의 실용적 선택 (rule-based vs ML 학습)',
      ],
    },
  },
  {
    title: '임베딩 모델 폴백 금지, silent corruption 방지',
    tags: ['pgvector', 'OpenAI Embeddings', 'fail-fast'],
    problem:
      '<p>LLM Gateway 에서 프로바이더 폴백을 쓰니, "임베딩도 폴백하면 가용성이 올라가지 않을까?" 라는 질문이 자연스럽게 나왔습니다.</p>' +
      '<p>분석해보니 silent corruption 위험이 있었습니다.</p>',
    approach:
      '<p>OpenAI text-embedding-3-small(1536d) 과 Bedrock Titan(1024d) 을 비교 분석.</p>' +
      '<ul>' +
      '<li>차원 자체가 다름</li>' +
      '<li>차원이 같아도 학습 분포가 다르면 cosine similarity 비교가 무의미</li>' +
      '<li>"한 번이라도 다른 모델로 저장되면 검색 인덱스가 영구히 오염" 이라는 결론</li>' +
      '</ul>' +
      '<p>임베딩 폴백을 의도적으로 금지. 장애 시 즉시 raise + Slack 알림 구조를 문서화.</p>',
    result:
      '<ul>' +
      '<li>pgvector 는 단일 임베딩 모델로만 운영해 인덱스 무결성 보장</li>' +
      '<li>이력서는 원문 청크(자연어 질문에 강함) + parsed_data 구조화(역량 매칭에 강함) 의 이중 임베딩</li>' +
      '<li>사용자가 이력서를 편집할 때는 구조화 임베딩만 재생성해 비용 절약</li>' +
      '</ul>',
    detail: {
      background:
        'LLM Gateway 에서 멀티 프로바이더 폴백을 도입하면서 자연스럽게 "임베딩도 폴백할 수 있지 않을까?" 라는 질문이 나왔습니다. OpenAI 임베딩 장애 시 Bedrock Titan 으로 폴백하면 가용성은 분명히 올라가는 옵션이었습니다.',
      options: [
        {
          label: 'Option A: 임베딩 폴백 허용 (OpenAI → Bedrock Titan)',
          pros: ['가용성 향상'],
          cons: [
            '차원 불일치 (1536d vs 1024d) 로 INSERT 실패',
            '같은 차원이라도 벡터 공간이 호환되지 않아 검색이 무의미',
            '오류 없이 잘못된 결과가 돌아오는 silent corruption: 디버깅이 극히 어려움',
          ],
        },
        {
          label: 'Option B: 단일 모델, 장애 시 명확히 실패',
          pros: ['검색 인덱스 무결성 보장', 'silent corruption 방지'],
          cons: ['장애 시 면접 질문 생성 일시 중단'],
          chosen: true,
        },
      ],
      decision:
        '"서비스 일시 중단" 이 "영구적인 데이터 오염" 보다 낫다. 한 번이라도 다른 모델로 저장되면 기존 검색 인덱스가 회복 불가능하게 오염되기 때문.',
      implementation: [
        '임베딩 폴백을 의도적으로 금지하는 결정을 ADR 형태로 기록',
        '장애 시 즉시 raise + Slack 알림으로 운영팀 통보',
        '이력서: 원문 청크(약 500자) + parsed_data 구조화 JSON 이중 임베딩',
        '사용자 편집 시 구조화 임베딩만 재생성: OpenAI 호출 비용 절약',
      ],
      learnings: [
        '"폴백이 항상 좋은 것은 아니다": 직관에 반하는 교훈',
        '데이터 무결성이 가용성보다 중요한 영역에서는 fail-fast 가 옳다',
        '결정 자체보다 "왜 이 결정을 했는가" 를 문서로 남기는 것이 더 중요',
      ],
    },
  },
  {
    title: '프로덕션 인시던트 두 건과 운영 프로세스 수립',
    tags: ['RDS', 'Celery', 'K8s env precedence', 'CloudWatch', 'Postmortem'],
    problem:
      '<p>운영 중 두 가지 인시던트가 발생했습니다. 모두 발견 자체가 어려웠습니다.</p>' +
      '<ol>' +
      '<li>RDS 커넥션 풀 고갈</li>' +
      '<li>예외도 로그도 없이 STT 자동 처리가 멈추는 silent failure</li>' +
      '</ol>',
    approach:
      '<p>두 건을 각각 다음과 같이 처리했습니다.</p>' +
      '<ul>' +
      '<li><strong>RDS 풀 고갈</strong>: Celery 시그널 누수 + SQLAlchemy 풀 설정 부재가 원인. 코드와 RDS 파라미터(<code>idle_session_timeout</code>) 를 함께 수정</li>' +
      '<li><strong>STT silent failure</strong>: K8s 의 <code>envFrom</code> 보다 <code>env</code> 가 우선이라 <code>CELERY_BROKER_URL=""</code> 이 주입 → Celery 가 <code>memory://</code> 로 silent fallback. infra manifest 한 줄 제거 + Slack 에러 알림을 <code>.apply()</code> 로 동기 실행하도록 변경</li>' +
      '</ul>',
    result:
      '<p>두 건 모두 포스트모템으로 남기고 운영 프로세스를 정비했습니다.</p>' +
      '<ul>' +
      '<li>Grafana Cloud + alloy 기반 메트릭 / 로그</li>' +
      '<li>Slack 채널 분리 (애플리케이션 / 인프라)</li>' +
      '<li>EC2 lifecycle 알림</li>' +
      '<li>알람 폭풍 방지 (grouping · wait · false positive Pause 정책)</li>' +
      '</ul>',
    detail: {
      background:
        '운영 프로세스가 잡히지 않은 상태에서 두 건의 인시던트가 발생했고, 그 자체보다 "비슷한 일이 다시 일어났을 때 어떻게 잡을 것인가" 가 더 중요했습니다.',
      implementation: [
        '[인시던트 1] RDS 커넥션 풀 고갈',
        '  증상: API 응답 지연 → 타임아웃',
        '  원인: Celery 시그널 누수 + SQLAlchemy 풀 설정 부재',
        '  Fix: 코드(시그널 정리) + RDS 파라미터(idle_session_timeout 900,000ms)',
        '  보강: CloudWatch Alarm 두 단계(Warning / Critical) + Performance Insights',
        '[인시던트 2] STT_DISPATCH_SILENT_FAILURE',
        '  증상: 면접 종료 후 STT 자동 처리가 멈춤 (transcript_status=PENDING)',
        '  원인: K8s 에서 envFrom 보다 env 가 우선하는 규칙 때문에 `CELERY_BROKER_URL=""` 가 주입',
        '             → Celery 가 broker 없음으로 인식하고 memory:// 로 silent fallback',
        '  특이점: 예외 없음, 로그 정상, DB 정상: 발견이 어려움',
        '  Fix: infra manifest 한 줄 제거 + Slack 에러 알림을 .apply() 로 동기 실행',
      ],
      learnings: [
        '"에러 로그가 없다" 가 "문제가 없다" 를 의미하지 않는다',
        'Celery 의 memory:// silent fallback 처럼, 라이브러리의 "의도적인 graceful degradation" 이 운영에서는 가장 발견하기 어려운 버그가 된다',
        'envFrom 보다 env 가 우선한다는 K8s 규칙은 매우 사소해 보이지만, 무심코 주입된 빈 값이 서비스 전체를 멈출 수 있다',
        '포스트모템은 재발 방지를 위한 가장 값싼 투자',
      ],
    },
  },
  {
    title: 'React 19 + Feature-Sliced Design 으로 병렬 개발',
    tags: ['React 19', 'FSD', 'Zustand 5', 'Vite 7', 'React Compiler'],
    problem:
      '<p>4인 팀에서 다양한 면접 화면을 병렬로 만들어야 했고, 코드 배치 논쟁을 최소화하는 구조가 필요했습니다.</p>' +
      '<p>대상 화면이 다음과 같이 다양했습니다.</p>' +
      '<ul>' +
      '<li>랜딩 / 인증 / 이력서 / 채용공고</li>' +
      '<li>면접 세션 / 분석 리포트</li>' +
      '<li>업적 / 구독</li>' +
      '</ul>',
    approach:
      '<ul>' +
      '<li>React 19 + Vite 7 위에 Feature-Sliced Design 적용 (app → pages → features → entities → widgets → shared 단방향 의존)</li>' +
      '<li>상태는 Zustand 5 로 도메인별 store 분리</li>' +
      '<li>React Compiler 로 수동 useMemo / useCallback 제거</li>' +
      '<li>Three.js · GSAP · Lottie 같은 무거운 라이브러리는 Vite manualChunks 로 분리. 랜딩 외 페이지에서는 로드되지 않도록 함</li>' +
      '</ul>',
    result:
      '<p>다음 feature 모듈들이 단방향 의존을 유지하면서 독립 개발되었습니다.</p>' +
      '<ul>' +
      '<li>auth / resume / jd / user-job-description</li>' +
      '<li>interview-setup / interview-precheck / interview-session / interview-analysis-report</li>' +
      '<li>achievements / streak / milestones / notifications</li>' +
      '<li>home / onboarding / settings / subscription</li>' +
      '</ul>' +
      '<p>MediaPipe FaceLandmarker 는 클라이언트에서 실시간 자가 점검을, 별도 Lambda face-analyzer 는 정밀 분석을 담당합니다. 같은 도구를 용도에 맞춰 다른 위치에 두었습니다.</p>',
    detail: {
      background:
        '랜딩 · 인증 · 이력서 · 채용공고 · 면접 세션 · 분석 리포트 등 영역이 넓었습니다. 4인 팀(프런트 전담 + 멀티 역할 본인) 이 병렬로 작업하면서 "이 파일을 어디에 둘까?" 라는 질문에 매번 시간을 쓰지 않을 구조가 필요했습니다.',
      options: [
        {
          label: 'Option A: Atomic Design',
          pros: ['컴포넌트 재사용 극대화'],
          cons: ['atoms / molecules 경계가 모호', '비즈니스 로직 배치 기준 불명확'],
        },
        {
          label: 'Option B: Feature-Sliced Design',
          pros: [
            '단방향 의존 규칙으로 배치가 자동 결정',
            'feature 단위 독립성 확보',
          ],
          cons: ['학습 곡선', '한국어 레퍼런스 부족'],
          chosen: true,
        },
        {
          label: 'Option C: Next.js App Router',
          pros: ['SSR / SSG 최적화', '파일 기반 라우팅'],
          cons: ['실시간 면접 SPA 에 SSR 이 불필요', '추가 서버 인프라'],
        },
      ],
      decision:
        'FSD 의 단방향 의존이 "어디에 둘까?" 질문을 자동으로 해결. feature 단위 독립성 덕에 병렬 작업이 자연스러움.',
      implementation: [
        '6 레이어: app → pages → features → entities → widgets → shared',
        'feature 모듈: auth · resume · jd · interview-setup / precheck / session · interview-analysis-report · achievements · streak · home · milestones · notifications · onboarding · settings · subscription · user-job-description',
        'Zustand store 도메인 분리: 인증 / 이력서 / 면접 세션 / 알림 / 구독 등',
        'React Compiler 활성화: useMemo / useCallback 수동 작성 제거',
        'MediaPipe FaceLandmarker: WebGL GPU 가속, 클라이언트 실시간 자가 점검',
        '랜딩: Three.js + @react-three/fiber 3D 메타볼 + GSAP ScrollTrigger + Lottie',
        'Vite manualChunks: three / gsap / lottie 분리, 면접 세션에서 미로드',
        'MediaRecorder + S3 5MB 멀티파트 청크 업로드: 긴 면접에서도 끊김 최소화',
      ],
      learnings: [
        '아키텍처 선택에서 "팀 크기" 가 핵심 변수',
        'FSD 는 "파일 배치 논쟁 제거" 라는 단 한 가지 가치만으로도 도입 가치가 있다',
        '"같은 기능이어도 용도에 따라 구현 위치가 달라진다": 실시간 자가 점검은 클라이언트, 정밀 분석은 서버',
        'React Compiler 가 만들어준 "최적화 코드를 안 써도 되는" 환경의 생산성 이득',
      ],
    },
  },
] as const
