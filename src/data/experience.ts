import type { Experience } from '@/types'

const EXP_IMG = '/images/experience'

export const experiences: readonly Experience[] = [
  {
    company: '(주) 그렙: 프로그래머스',
    totalPeriod: '2019.06 ~ 2025.03 (총 경력 3년 2개월)',
    developerPeriod: '개발 경력 2년 8개월',
    roles: [
      {
        team: '교육솔루션팀',
        position: 'Backend Engineer',
        period: { start: '2024-07', end: '2025-03' },
        stack: [
          'Ruby on Rails',
          'ActiveAdmin',
          'Sidekiq',
          'PostgreSQL',
          'RSpec',
          'Python',
          'GitHub Actions',
          'Django',
        ],
        details: [
          {
            title: 'KDT 수강생 역량진단리포트 백엔드 단독 개발',
            period: '2024.07 ~ 2025.02',
            impact: '백엔드 단독 개발 6개월 · PM, 기획, 디자인, QA와 협업해 점진 출시',
            bullets: [
              '채점부터 점수 정규화, 평가 기준 매칭, 리포트 생성, 알림과 열람 추적까지 전체 파이프라인을 설계했습니다.',
              '운영 요구가 달라진 1차 모델을 폐기하고 2차 모델로 재설계했습니다. 코스별 활성화와 5차 점진 릴리즈로 이관 위험을 낮췄습니다.',
              '백분위 계산을 PostgreSQL 윈도우 함수로 위임하고, 배치 잡은 EXPLAIN으로 seq scan에서 bitmap index scan으로 전환했습니다.',
              '삭제 방어선은 모델에 두고, N+1과 플래키 테스트는 발생 경로와 근본 원인까지 추적해 회귀를 막았습니다.',
            ],
            images: [`${EXP_IMG}/notion-01.png`, `${EXP_IMG}/notion-02.png`],
          },
          {
            title: '원티드 KDT 서비스 (wantedlms) 멀티 테넌트 분기 작업',
            period: '2024.07 ~ 2024.11',
            impact: '동일 코드베이스로 두 LMS를 운영해 공통 변경의 원자성과 유지보수성을 확보',
            bullets: [
              '환경별 YAML 설정으로 프로그래머스와 wantedlms의 기능을 활성화하거나 비활성화했습니다.',
              '저장소 fork 대신 단일 코드베이스를 유지해 공통 기능을 한 번에 배포하고 이중 유지보수 비용을 피했습니다.',
            ],
          },
          {
            title: '프로그래머스 프로젝트 LMS V1 API 신규 도입 + service object 분리',
            period: '2024.08 ~ 2025.02',
            impact: '레거시 API를 도메인별 V1으로 전환하고 핵심 로직을 분리해 인계 비용을 절감',
            bullets: [
              '레거시 /api/school/*를 /api/v1/lms/*로 전환하고 school 도메인을 lms와 learn으로 분리했습니다.',
              '에러 응답을 code + message 객체로 통일해 프론트엔드의 분기와 파싱 로직을 단순화했습니다.',
              '수료증 발급과 학생 재초대 로직을 service object로 분리하고, 어드민 일괄 재초대 기능을 추가했습니다.',
              '기능 PR마다 apipie 문서를 함께 갱신하고 공통 응답은 Definitions 모듈로 추출했습니다.',
            ],
          },
          {
            title: '사내 PR 리뷰 알림 봇 전사 확장 (단일팀 → 4팀)',
            period: '2024.07 ~ 2024.08',
            impact: '단일 팀 도구를 4개 팀에서 재사용할 수 있는 자동화로 확장',
            bullets: [
              '팀원 하드코딩을 Slack 사용자그룹 API와 프로필의 GitHub Username 조회로 대체했습니다.',
              'PR 본문의 희망 리뷰 완료일에서 D-Day를 계산하고, 평일 오전 10시에 팀별 Slack 채널로 자동 알림을 보냈습니다.',
            ],
          },
          {
            title: '프로그래머스 스쿨 / 캠퍼스 LMS 유지보수 및 신규 기능 개발',
            period: '2024.07 ~ 2025.03',
            impact: '운영 이슈를 근본 원인과 회귀 스펙까지 연결해 반복 장애를 예방',
            bullets: [
              'Sentry와 사내 Slack으로 접수된 이슈를 근본 원인까지 추적하고 회귀 스펙과 함께 수정했습니다.',
              '어드민 검색의 컬럼명 불일치는 alias_attribute로 해결해 컬럼 rename과 다운타임 위험을 피했습니다.',
              '자유 텍스트 입력은 자동완성 검색으로 교체해 잘못된 값이 유입되는 경로를 제거했습니다.',
            ],
          },
        ],
      },
      {
        team: '채용서비스팀',
        position: 'SW Engineer',
        period: { start: '2020-12', end: '2022-10' },
        stack: [
          'Ruby on Rails',
          'Vue.js',
          'TypeScript',
          'Composition API',
          'Python',
          'Flask',
          'AWS Lambda',
          'DynamoDB',
          'Terraform',
          'AWS Personalize',
          'ActionCable',
          'PostgreSQL',
          'ElasticSearch',
          'Sidekiq',
          'ActiveAdmin',
          'RSpec',
          'Rugged',
          'Docker',
        ],
        details: [
          {
            title: '이력서 모델 jsonb → 정규화 무중단 마이그레이션 + schema 방법론 확립',
            period: '2022.05 ~ 2022.10 (집중) · 무중단 정리 방법론 일관 적용',
            impact: 'JSONB 병목을 해소하고 무중단 4단계 마이그레이션을 여러 도메인의 표준으로 확산',
            bullets: [
              '경력, 프로젝트, 교육, 수상, 활동, 논문을 담던 6개 JSONB 컬럼은 필터와 집계 요구가 늘며 인덱싱과 쿼리 복잡도의 병목이 됐습니다.',
              'GIN 인덱스 보강과 정규화 테이블 전환을 비교한 뒤, 정렬·조인·통계 확장성을 위해 도메인별 모델로 정규화했습니다.',
              'ignored_columns 반영, 사용처 이관, 컬럼 삭제, 테이블 삭제의 4단계로 신·구 서버가 공존하는 배포 구간의 500 오류를 차단했습니다.',
              '이 절차를 회사, 채용공고, 대회, 프로필 등 다른 도메인의 무중단 스키마 변경 표준으로 확산했습니다.',
            ],
          },
          {
            title: '전사 본인인증 프로젝트 신규 구축 + 프로그래머스 프로젝트 통합',
            period: '2022.07 ~ 2022.09',
            impact: '사내 공용 인증 서비스를 구축해 서비스별 NICE 연동 부담과 운영 요소를 제거',
            bullets: [
              'Flask, Lambda Container Image, API Gateway, DynamoDB, Terraform으로 공용 인증 서비스를 신규 구축했습니다.',
              'alpha, beta, production의 ECR 계정과 Lambda 함수, SSO 프로필, Terragrunt 디렉터리를 분리했습니다.',
              'DynamoDB의 HASH 키와 TTL로 만료 데이터를 자동 제거해 RDBMS와 cron 조합보다 운영 요소를 줄였습니다.',
              '예제 Django 앱과 ActionCable 인증 흐름을 제공해 프로그래머스 프로젝트의 통합 시간을 단축했습니다.',
            ],
          },
          {
            title: '채용 도메인 SSR → SPA 전환 (개발자 검색 + 채용공고) + 서브도메인 분리',
            period: '2021.01 ~ 2022.07',
            impact: 'Rails SSR과 CoffeeScript 강결합 구조를 API + Vue TypeScript SPA로 전환',
            bullets: [
              '개발자 검색 리팩토링은 807개 파일 규모로 진행했습니다. Ruby on Rails SSR과 CoffeeScript에 강결합된 컨트롤러를 백엔드 API와 Vue Composition API·TypeScript 도메인 모델 기반 SPA로 분리하고, CoffeeScript 템플릿을 Vue 앱과 jbuilder API로 이관했습니다.',
              '채용공고 화면도 vue-router 기반 SPA로 전환했습니다. Tag, Company, Location, MinEmployees, MinSalary, MinCareer 필터를 독립 컴포넌트로 나누고 필터 chip, URL 동기화, AutoComplete, sticky UI를 함께 정리했습니다.',
              '검색 백엔드는 텍스트 분석과 랭킹을 ElasticSearch가, 정확 매칭·집합 연산·접근 제어를 PostgreSQL이 담당하도록 분리했습니다. RDB만으로 유사도와 형태소 분석까지 처리하는 대안보다 쿼리 부담과 자체 운영 범위를 줄였습니다.',
              '회사 관점의 열람, 차단, 북마크, 제안, 인재풀, 이미 본 프로필 제외 조건을 조합 가능한 scope 체인으로 설계했습니다. 새로운 화면은 기존 scope를 조합해 같은 정책을 재사용할 수 있게 했습니다.',
              '컨트롤러마다 반복되던 절차형 필터 로직을 명명된 scope와 concern으로 통합했습니다. ransack 화이트리스트와 Arel 바인드 파라미터를 적용해 재사용 지점을 한곳으로 모으고 SQL Injection 경로를 차단했습니다.',
              '요청으로 전달된 company_ids 순서를 결과에 반영할 때 Ruby sort_by 대신 SQL CASE 정렬을 사용했습니다. 전체 결과를 애플리케이션에 올리지 않고 LIMIT/OFFSET과 결합하면서 기존 API 파라미터도 그대로 유지했습니다.',
              'vue-router, 스켈레톤 UI, 북마크 그룹, 제안 관리, 페이지네이션을 함께 정리하고 모달·유틸리티·라우터·인터셉터 단위의 RSpec과 Jest 테스트를 보강했습니다.',
              '후속 작업으로 career.programmers.co.kr 서브도메인과 채용 전용 Sidekiq 서버(job_career)를 분리하고 hera-client SPA 저장소를 통합해 자원 격리와 독립 배포가 가능한 구조를 만들었습니다.',
            ],
            images: [`${EXP_IMG}/notion-06.png`, `${EXP_IMG}/notion-05.png`],
          },
          {
            title: '이력서 GitHub 분석기 정밀도·운영 안정성 개선',
            period: '2021.07 ~ 2021.09 · 2022.03 후속 대응',
            impact: '미분석 커밋 0건 달성 · 알림 노이즈 감소 · PAT 노출 제거',
            bullets: [
              'Rugged::Walker 정렬 옵션과 단일 커밋 저장소의 엣지 케이스를 보완해 미분석 커밋을 0건으로 줄였습니다.',
              'Timeout과 HTTP 오류를 banned와 error 상태로 구분해 정상적인 제한 상황이 운영 알림을 오염시키지 않게 했습니다.',
              'clone URL의 PAT를 제거하고 GitHub의 git:// 중단에 맞춰 https://로 즉시 전환했습니다.',
              '대형 저장소의 Octokit 페이지네이션과 통계 화면을 안정화하고 banned 상태를 UI에 반영했습니다.',
            ],
          },
          {
            title: '추천 채용공고 ES → AWS Personalize 개인화 추천 전환',
            period: '2021.04 PoC · 2021.07 ~ 2021.12 안정화',
            impact: '자체 고정 추천을 관리형 개인화로 전환해 클릭률과 지원율을 개선',
            bullets: [
              '자체 랭킹 구현 대신 AWS Personalize Campaign을 선택해 스코어링과 재훈련 운영을 관리형 서비스에 위임했습니다.',
              'Rails console PoC와 API 클라이언트 싱글톤화로 초기 연동을 검증했습니다.',
              '클릭 이벤트와 랜덤 노출 비율을 함께 추적해 채용공고 클릭률과 지원율 개선을 확인했습니다.',
              '추천 영역을 채용공고에서 과제테스트 연습 페이지까지 확장했습니다.',
            ],
            images: [`${EXP_IMG}/notion-04.png`],
          },
          {
            title: '대회 도메인 확장 + 서비스 품질 개선 (커버리지·에러 알림)',
            period: '2020.12 ~ 2022.10',
            impact: '대회 시스템을 확장하고 테스트 커버리지를 70%에서 80%로 개선',
            bullets: [
              '대회 시스템에 회사 어드민, 상세 검색, 등록 데이터 엑셀 다운로드, 통계, 반응형 레이아웃을 점진 출시했습니다. 대회 상세·지원·리더보드·지원 취소를 위한 V1 API도 함께 확장했습니다.',
              '대회 참가 기업 대량 등록은 find_or_create_by 반복 호출 대신 activerecord-import 배치 삽입과 on_duplicate_key_ignore를 사용했습니다. 등록 건수에 비례하던 SELECT·INSERT 왕복을 줄이고 중복 처리를 DB 제약에 맡겼습니다.',
              '대회 참여 회사 집합은 Ruby의 map·flatten·uniq 대신 has_many :through와 distinct association으로 계산했습니다. 이름 있는 관계로 여러 호출부에서 재사용하고 기본 정렬 충돌은 unscope(:order)로 명시적으로 해소했습니다.',
              '방치된 지원서의 만료 시각은 조회할 때마다 계산하지 않고 revoke_at 컬럼에 저장했습니다. 쓰기 비용을 감수하는 대신 배치 스캔 조건과 인덱스를 단순화하고 정책 변경의 유연성을 확보했습니다.',
              '시간이 지날수록 누적되는 종료 대회 목록에는 페이지네이션을 선제 적용했습니다. 검증 로직에서는 오차가 생길 수 있는 counter_cache 대신 실시간 count를 사용해 정확성이 필요한 경로와 근사값이 허용되는 경로를 구분했습니다.',
              '컨트롤러·모델·정책·팩토리 스펙을 보강해 테스트 커버리지를 70%에서 80%로 높였습니다. 팩토리는 40회 이상으로 나눠 let_it_be로 전환하고, DB에 저장하지 않는 build 객체에는 refind: false를 적용했습니다.',
              '플래키 테스트는 재실행으로 넘기지 않고 정렬 비결정성, 부동소수점 정밀도, 외부 연동 스텁을 근본 원인까지 추적했습니다. 외부 API 스텁은 WebMock과 Sinatra 기반 Fake 앱으로 구성해 실제 라우팅 구조를 재현했습니다.',
              '여러 어드민에 복제된 전체 collection select box와 중간 pluck 기반 ransacker를 AJAX 원격 검색과 네이티브 ransack 연관 필터로 통합해 메모리 사용과 유지보수 지점을 줄였습니다.',
              'ignored_columns 선반영, 사용처 제거, 실제 컬럼·테이블 삭제 순서의 무중단 schema 정리 방식을 여러 도메인에 적용했습니다. 유니크 인덱스 전 중복 데이터 정리, 사용 중 리소스의 모델 레벨 삭제 차단, ApplicationJob 기반 마이그레이션으로 데이터 정합성을 보강했습니다.',
              '채용 도메인의 컨트롤러·채널·잡에 dept.career 분류 태그를 적용해 에러를 담당 Slack 채널로 라우팅했습니다. Sentry 이슈는 근본 원인 제거와 회귀 스펙을 함께 반영해 응답 책임과 알림 신호를 명확히 했습니다.',
            ],
            images: [`${EXP_IMG}/notion-03.png`],
          },
        ],
      },
      {
        team: '알고리즘 컨텐츠팀',
        position: '알고리즘 컨텐츠 제작자',
        period: { start: '2019-06', end: '2020-08' },
        stack: ['C/C++', 'Python', 'Java'],
        details: [
          {
            title: '프로그래머스 알고리즘 문제 출제 / 검수 / 워크플로 자동화',
            period: '2019.06 ~ 2019.08 · 2019.12 ~ 2020.02 · 2020.06 ~ 2020.08 (인턴 3차)',
            impact: '세 차례의 인턴십 동안 출제에서 검수와 자동화 도구 개발까지 책임 범위를 확대',
            bullets: [
              '여러 난이도와 유형의 알고리즘 문제를 출제하고 정확성, 품질, 타 서비스와의 중복 여부를 검수했습니다.',
              '출제, 검수, 피드백, 수정, 최종 검수로 이어지는 협업 워크플로를 정착시켰습니다.',
              '랜덤 단어 기반 아이디어 발굴, 문제 템플릿, 테스트 케이스 생성 도구로 반복 작업을 자동화했습니다.',
            ],
          },
        ],
      },
    ],
  },
  {
    company: '대한민국 육군 특전사령부: 제11공수특전여단',
    totalPeriod: '2022.11 ~ 2024.05',
    roles: [
      {
        team: '정보체계운용정비병',
        position: '175.103',
        period: { start: '2022-11', end: '2024-05' },
        stack: [],
        details: [
          {
            title: '정보체계 운영 · 유지보수',
            period: '2022.11 ~ 2024.05',
            impact: '부대 인트라넷과 서버, 전산 장비, 웹 페이지의 안정적인 운영 지원',
            bullets: [
              'NAC와 방화벽을 포함한 인트라넷, 서버, 전산 장비를 운영하고 유지보수했습니다.',
              '부대 웹 페이지와 내부망을 관리해 일상적인 정보체계 운영을 지원했습니다.',
            ],
          },
        ],
      },
    ],
  },
] as const
