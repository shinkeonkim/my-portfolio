import type { ProjectChallenge } from '@/types'

export const mefitChallenges: readonly ProjectChallenge[] = [
  {
    title: 'Django 도메인 모듈 분리 설계',
    tags: ['Django', 'DRF', 'Python'],
    problem:
      '<p>면접 도메인이 넓고 세 명이 백엔드를 함께 개발해야 했습니다. 프레임워크 선택과 병렬 작업 구조를 동시에 결정해야 했습니다.</p>',
    approach:
      '<p>Django, FastAPI, Spring Boot를 팀 역량과 남은 기간 기준으로 비교해 Django를 선택했습니다.</p>' +
      '<ul>' +
      '<li>도메인 레이어 <code>webapp/&lt;도메인&gt;/</code> 와 API 레이어 <code>webapp/api/v1/&lt;도메인&gt;/</code> 을 물리 분리</li>' +
      '<li>BaseService + <code>validate</code> / <code>execute</code> 패턴으로 트랜잭션 경계 명시</li>' +
      '<li>LLM 호출은 트랜잭션 외부에서 수행하도록 규약화</li>' +
      '</ul>',
    result:
      '<p>각 앱을 도메인 레이어와 API 레이어로 분리했습니다.</p>' +
      '<ul>' +
      '<li>users / profiles / interviews / resumes / job_descriptions</li>' +
      '<li>achievements / streaks / dashboard</li>' +
      '<li>subscriptions / tickets / notifications</li>' +
      '<li>terms_documents / llm_trackers / realtime_docs</li>' +
      '</ul>' +
      '<p>Factory Boy와 <code>@patch</code> 기반 테스트를 유지하면서 네 명이 병렬로 작업했고, merge conflict를 거의 없앴습니다.</p>',
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
      '<p>제한된 예산 안에서 Kubernetes 운영, LLM 키 관리, 프로바이더 폴백과 비용 추적을 함께 해결해야 했습니다.</p>' +
      '<ul>' +
      '<li>EKS 컨트롤 플레인 비용</li>' +
      '<li>여러 Pod 에서 OpenAI 를 직접 호출하면서 분산된 API 키</li>' +
      '<li>키 분산으로 인한 멀티 프로바이더 폴백 · 비용 추적 어려움</li>' +
      '</ul>',
    approach:
      '<ul>' +
      '<li>K3s의 server와 agent 노드를 분리하고 무거운 워크로드를 server에 고정했습니다.</li>' +
      '<li>iptables NAT로 Pod가 EC2 인스턴스 메타데이터의 IAM Role 자격 증명을 사용하게 했습니다.</li>' +
      '<li>OpenAI 호환 LiteLLM API를 도입해 각 서비스는 base URL만 변경했습니다.</li>' +
      '</ul>',
    result:
      '<ul>' +
      '<li>EKS 컨트롤 플레인 비용을 없애고 야간 정지로 EC2 비용도 줄였습니다.</li>' +
      '<li>여섯 서비스의 LLM 호출을 LiteLLM으로 모아 Bedrock·Gemini 폴백과 비용을 한곳에서 추적했습니다.</li>' +
      "<li>cert-manager와 Let's Encrypt로 서비스 인증서를 자동 갱신했습니다.</li>" +
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
      '<p>면접 영상은 크고 분석 시간이 길었습니다. K3s에서 ffmpeg를 실행하면 다른 Pod의 자원까지 잠식했습니다.</p>',
    approach:
      '<p>S3 ObjectCreated 이벤트를 SNS와 SQS로 fan-out하고, 각 Lambda가 독립적으로 병렬 처리하게 했습니다.</p>' +
      '<ol>' +
      '<li>video-converter / frame-extractor / audio-extractor 가 동시에 시작</li>' +
      '<li>frame 결과는 face-trigger SQS 를 거쳐 face-analyzer 로 이어짐</li>' +
      '<li>audio 결과는 voice-analyzer 로 이어짐</li>' +
      '</ol>' +
      '<p>공통 코드는 <code>mefit-video-common</code> Layer로 분리했습니다. K3s의 worker는 step-complete 메시지를 소비해 백엔드 상태를 갱신합니다.</p>',
    result:
      '<ul>' +
      '<li>K3s 자원을 사용하지 않고 변환, 프레임, 오디오, 음성, 표정 분석을 동시에 시작했습니다.</li>' +
      '<li>S3 버킷은 private으로 두고 presigned URL로만 접근하게 했습니다.</li>' +
      '<li>표정 분석은 MediaPipe blendshape 규칙으로 구현했습니다.</li>' +
      '<li>음성 분석은 pydub 기반으로 단순화해 Lambda 패키지 크기 제한을 통과했습니다.</li>' +
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
    tags: ['pgvector', 'OpenAI Embeddings'],
    problem:
      '<p>LLM처럼 임베딩 모델도 폴백하면 가용성은 높아지지만, 서로 다른 벡터 공간이 섞여 검색 인덱스를 조용히 오염시킬 수 있었습니다.</p>',
    approach:
      '<p>OpenAI text-embedding-3-small(1536d)과 Bedrock Titan(1024d)의 호환성을 비교했습니다.</p>' +
      '<ul>' +
      '<li>두 모델은 벡터 차원부터 다릅니다.</li>' +
      '<li>차원이 같아도 학습 분포가 다르면 cosine similarity를 비교할 수 없습니다.</li>' +
      '<li>다른 모델의 벡터가 한 번만 저장돼도 기존 인덱스의 의미가 훼손됩니다.</li>' +
      '</ul>' +
      '<p>임베딩 폴백을 금지하고, 장애 시 즉시 실패한 뒤 Slack으로 알리도록 문서화했습니다.</p>',
    result:
      '<ul>' +
      '<li>pgvector 인덱스를 단일 모델로만 운영해 무결성을 지켰습니다.</li>' +
      '<li>이력서는 원문 청크와 구조화 데이터로 나눠 각각의 검색 목적에 맞게 임베딩했습니다.</li>' +
      '<li>이력서 편집 시 구조화 임베딩만 다시 생성해 호출 비용을 줄였습니다.</li>' +
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
      '<p>운영 중 RDS 커넥션 고갈과 STT 자동 처리 중단이 발생했습니다. 두 문제 모두 명확한 오류 로그가 없어 발견이 어려웠습니다.</p>' +
      '<ol>' +
      '<li>RDS 커넥션 풀 고갈</li>' +
      '<li>예외도 로그도 없이 STT 자동 처리가 멈추는 silent failure</li>' +
      '</ol>',
    approach:
      '<p>증상, 원인, 복구, 재발 방지를 분리해 두 인시던트를 분석했습니다.</p>' +
      '<ul>' +
      '<li><strong>RDS 풀 고갈</strong>: Celery 시그널 누수와 SQLAlchemy 풀 설정을 수정하고 <code>idle_session_timeout</code>을 적용했습니다.</li>' +
      '<li><strong>STT 중단</strong>: 빈 broker URL 주입을 제거하고 Slack 오류 알림을 동기 실행으로 바꿨습니다.</li>' +
      '</ul>',
    result:
      '<p>두 건을 포스트모템으로 남기고 같은 유형의 장애를 더 빨리 찾도록 운영 체계를 정비했습니다.</p>' +
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
      '<p>네 명이 다양한 면접 화면을 병렬로 개발하려면, 기능마다 파일 위치와 의존 방향을 다시 논의하지 않는 구조가 필요했습니다.</p>' +
      '<ul>' +
      '<li>랜딩 / 인증 / 이력서 / 채용공고</li>' +
      '<li>면접 세션 / 분석 리포트</li>' +
      '<li>업적 / 구독</li>' +
      '</ul>',
    approach:
      '<ul>' +
      '<li>Feature-Sliced Design의 단방향 의존 규칙을 적용했습니다.</li>' +
      '<li>Zustand store를 도메인별로 분리했습니다.</li>' +
      '<li>React Compiler로 수동 메모이제이션을 줄였습니다.</li>' +
      '<li>Three.js, GSAP, Lottie는 manualChunks로 분리해 필요한 페이지에서만 불러왔습니다.</li>' +
      '</ul>',
    result:
      '<p>각 feature 모듈은 단방향 의존을 유지하며 독립적으로 개발됐습니다.</p>' +
      '<ul>' +
      '<li>인증·이력서·채용공고·사용자 작성 채용공고 기능</li>' +
      '<li>면접 설정·사전 점검부터 면접 진행·분석 리포트까지의 ' +
      '전체 흐름</li>' +
      '<li>업적·연속 학습·마일스톤·알림으로 이어지는 학습 보상 ' +
      '흐름</li>' +
      '<li>홈·온보딩·설정·구독을 아우르는 서비스 공통 화면</li>' +
      '</ul>' +
      '<p>실시간 자가 점검은 클라이언트가, 정밀 분석은 Lambda가 맡도록 같은 도구의 실행 위치도 목적에 맞게 분리했습니다.</p>',
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
        'feature 모듈: 인증·이력서·채용공고·사용자 작성 채용공고',
        'feature 모듈: 면접 설정·사전 점검·면접 진행·분석 리포트',
        'feature 모듈: 업적·연속 학습·마일스톤·알림',
        'feature 모듈: 홈·온보딩·설정·구독',
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
