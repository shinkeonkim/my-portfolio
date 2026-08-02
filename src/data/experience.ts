import type { Experience } from '@/types'

const EXP_IMG = '/my-portfolio/images/experience'

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
            bullets: [
              'Ruby on Rails + ActiveAdmin 기반 백엔드 단독 개발 (PM · 기획 · 디자인 · QA 협업, 약 6개월)',
              '시험 결과 기반 분야별 역량 도출·통계 서비스로, 채점 워커 →  관련 concern 모듈이 호출되어 코스/레슨의 활성화 여부 · KDT 코스 여부· 환경 설정(Settings.features.site) 을 순차 확인 → 정규화 점수 산출·평가 기준(CompetencyStandard) 매칭 → 리포트 생성 → · 메일러 · 사내 알림 · 열람 추적까지 흐름 담당',
              '도메인 모델 1차 출시 후 운영 요구 재정의로 폐기 · 재설계 결정. 2차 모델을 신규 도입 → 코스별 활성화 컬럼으로 점진 확대 (활성화된 코스만 신규 리포트 생성) → 1차 참조 코드 사용처 정리 → 1차 테이블 drop 의 순차 이관으로 데이터 마이그레이션 리스크 흡수. 코스 단위 통합 리포트를 위해 Course ↔ CompetencyTagGroup ↔ CompetencyTag ↔ CompetencyStandard ↔ LessonCompetencyReport ↔ CourseCompetencyReport 관계로 재모델링. 총 5차 시리즈 릴리즈로 운영팀 QA 합의 기반 점진 출시, 결함은 hotfix 로 즉시 대응',
              '백분위 순위 계산은 Ruby 배열 정렬 대신 PostgreSQL 윈도우 함수로 DB 위임. 대안(Ruby 에서 학생 전체 로드 후 정렬·랭킹)은 인원 수에 비례해 앱 서버 메모리·전송 레코드 수가 증가하는 반면, DB 위임 시 실행 계획 최적화가 자동 적용되고 필요한 결과 행만 반환됨',
              'N+1 은 무조건 eager loading 을 붙이지 않고 관계 사용 형태별로 도구 선택 - where/order 조건에 쓰이는 관계는 조인 preload, 결과 순회 중 참조만 필요한 관계는 지연 preload, 동등성만 확인하면 되는 곳은 레코드 로드 없이 ID 비교로 대체. 코드 리뷰 사이클 안에서 반복적으로 규율화',
              '모델 콜백에서 컬렉션을 순회하며 조건 평가하다 발생한 암묵적 N+1 은 컨트롤러 레벨 명시적 트리거로 이관. "이 화면에서 수정했을 때만 리포트 갱신" 처럼 실행 범위를 좁혀 흐름 추적성과 부수효과 발생 시점 명확화',
              '매일 실행되는 배치 잡의 조건 컬럼은 실측 데이터를 채워 EXPLAIN 으로 seq scan → bitmap index scan 전환까지 확인한 뒤 인덱스 반영. 확신 없는 리스크는 코드 작성 시점부터 PR 체크리스트로 남겨 리뷰어가 놓치지 않도록 유도함',
              '이미 응시생이 있거나 배포된 역량 리포트 설정은 모델 콜백(before_destroy + abort) 에서 삭제 원천 차단. 어드민 컨트롤러 필터로 막는 대안은 콘솔·배치 등 우회 경로가 있어 → 모델에 방어선을 그어 경로 무관 데이터 무결성 보장. "수정 가능" · "삭제 가능" 판단을 단일 메서드로 통합해 두 기준이 어긋나는 버그 원천 차단',
              '플래키 테스트는 재실행 회피 대신 별도 브랜치까지 파서 근본 원인 추적 - 정렬 비결정성(id 순 first → 도메인 키 명시), 부동소수점 비교 정밀도, Capybara render 타이밍, Faker 문자열 충돌로 인한 uniqueness 깨짐 등',
            ],
            images: [`${EXP_IMG}/notion-01.png`, `${EXP_IMG}/notion-02.png`],
          },
          {
            title: '원티드 KDT 서비스 (wantedlms) 멀티 테넌트 분기 작업',
            period: '2024.07 ~ 2024.11',
            bullets: [
              '원티드 측 KDT(K-Digital Training) LMS 서비스를 동일 코드베이스 안에서 멀티 테넌트로 운영하기 위한 분기 작업',
              '환경별 YAML 설정 파일으로 프로그래머스 / wantedlms 기능 활성·비활성 분기',
              '별도 저장소 fork 대안은 초기 분기 비용은 낮지만 이후 공통 기능 업데이트마다 양쪽 병렬 유지 부담 → 단일 코드베이스 + 환경 분리로 공통 유지보수 원자성 확보',
            ],
          },
          {
            title: '프로그래머스 프로젝트 LMS V1 API 신규 도입 + service object 분리',
            period: '2024.08 ~ 2025.02',
            bullets: [
              '레거시 /api/school/* → /api/v1/lms/* 로 도메인별 신규 V1 API (게시판, 알림, 학습활동, 학습이력 등) 도입. 레거시 school 도메인을 lms / learn 으로 분리해 후임자 인계 용이성 확보',
              '에러 응답 스키마를 단일 error string 에서 code + message 객체로 통일. 대안(HTTP status code 만으로 분기)은 세부 에러 컨텍스트 표현이 어려워 클라이언트에 추가 파싱 로직이 필요 → 응답 스키마 자체에서 이중 표현으로 프론트 인터페이스 일관화',
              '수료증 발급 / 학생 재초대 로직을 service object 로 분리 + 어드민 bulk 재초대 기능 추가',
              'apipie 기반 API 문서화(응답 스키마 · required · 에러 코드 포함)를 항상 기능 구현 PR 안에서 함께 진행. 공통 응답 조각은 재사용 가능한 Definitions 모듈로 추출해 문서 부채가 쌓이지 않도록 유지',
            ],
          },
          {
            title: '사내 PR 리뷰 알림 봇 전사 확장 (단일팀 → 4팀)',
            period: '2024.07 ~ 2024.08',
            bullets: [
              'Python · slack_sdk · PyGithub · GitHub Actions cron 기반 사내 도구',
              '레거시를 인계받아 단일팀에서 4개 팀으로 범용화. 팀원 정보 하드코딩을 Slack 사용자그룹 API + 프로필의 GitHub Username 필드 활용으로 대체',
              'Util 클래스(TeamMember / Message) 분리 + lint 적용. PR 본문의 "희망 리뷰 완료일" 텍스트에서 D-Day 자동 계산 → 매일 갱신 cron + 평일 오전 10시 팀별 Slack 채널로 오늘 리뷰 대상 PR 자동 알림',
            ],
          },
          {
            title: '프로그래머스 스쿨 / 캠퍼스 LMS 유지보수 및 신규 기능 개발',
            period: '2024.07 ~ 2025.03',
            bullets: [
              'Ruby on Rails + Django 기반 LMS 서비스 유지보수',
              '운영 중 발견된 이슈(Sentry, 사내 Slack 보고)를 근본 원인까지 추적해 회귀 스펙과 함께 수정하는 사이클 유지',
              '컬럼명 불일치로 발생하던 어드민 검색 이슈는 실제 컬럼 rename 대신 애플리케이션 레이어의 속성 별칭(alias_attribute) 으로 해결해 마이그레이션 다운타임 리스크 회피',
              '자유 텍스트 입력으로 인한 에러는 자동완성 검색으로 잘못된 입력값 경로 자체 제거',
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
            bullets: [
              '개선 전: 경력 / 프로젝트 / 교육 / 수상 / 활동 / 논문 6개 도메인이 jsonb 컬럼에 저장. 필터링·집계는 앱 레벨 파싱 대신 jsonb_array_elements + EXISTS 서브쿼리로 이미 DB 위임하는 하이브리드 구조였으나, 필터/정렬/집계 요구가 늘면서 JSONB 인덱싱 한계·쿼리 복잡도가 병목화',
              '대안 검토: (1) GIN 인덱스(jsonb_path_ops) 로 JSONB 유지 + 부분 튜닝, (2) 정규화 테이블로 전환. 필터 조건 다양성이 계속 증가하는 이력서 도메인 특성상 GIN 만으로는 정렬/조인/통계 요구를 감당하기 어렵다고 판단함. 그리고 jsonb 내에 중복되는 데이터 저장으로 저장 공간 낭비가 발생한다고 판단함. → 도메인 별 모델 (ResumeExperience / ResumeProject / ResumeEducation / ResumeAward / ResumeActivity / ResumePublication) 로 정규화 결정',
              '무중단 4단계 (ignored_columns 선반영 → 사용처 코드 이관 → 컬럼 삭제 → 테이블 drop) 로 신·구 앱 서버 병행 배포 구간의 스키마 캐시 miss 500 에러를 원천 차단. 이 절차는 이후 회사 · 채용공고 · 대회 · 프로필 등 여러 도메인의 표준 방식으로 확장',
              '정규화 후 검색 인덱스 · 필터 · 조인 · 정렬 · 집계가 모두 표준 관계형 쿼리로 처리 가능해지고 데이터 분석·활용도 · API 응답 속도 동반 개선',
            ],
          },
          {
            title: '전사 본인인증 프로젝트 신규 구축 + 프로그래머스 프로젝트 통합',
            period: '2022.07 ~ 2022.09',
            bullets: [
              'Python · Flask · Docker · AWS Lambda(Container Image) · API Gateway · DynamoDB · ECR · Terraform · Terragrunt 기반.',
              '사내 여러 서비스가 NICE 본인인증을 각각 직접 통합하지 않도록 공용 인증 서비스로 분리해 신규 구축',
              '3개 환경 (alpha / beta / production) 을 환경별 ECR 계정 · Lambda 함수 · SSO 프로필 · terragrunt 디렉토리로 분리',
              'DynamoDB 단일 테이블 모델링: token_version_id HASH + TTL attribute 로 만료 키 자동 제거. 대안(RDBMS + cron 만료 삭제) 은 만료 배치와 만료 시각 조건 인덱스를 별도 관리해야 함 → TTL 로 DB 위임하여 운영 요소 최소화',
              'Lambda Container Image 채택으로 ZIP 250MB 제한 우회 + 개발/배포 환경 일관성. 대안(ZIP + Layer) 은 의존성 추가마다 Layer 관리 복잡도 증가 → 컨테이너 표준화로 로컬/배포 환경 일치',
              '예제 Django app 을 함께 제공해 소비자 서비스의 빠른 통합 지원. 프로그래머스 프로젝트 통합은 ActionCable WebSocket 기반 인증 흐름과 계정 관리 페이지 본인인증 화면 개발',
            ],
          },
          {
            title: '채용 도메인 SSR → SPA 전환 (개발자 검색 + 채용공고) + 서브도메인 분리',
            period: '2021.01 ~ 2022.07',
            bullets: [
              '개발자 검색 리팩토링 (807 files 규모): Ruby on Rails SSR + CoffeeScript 강결합 컨트롤러를 백엔드 API 분리 + Vue.js Composition API + TypeScript 도메인 모델 SPA 로 전환. CoffeeScript(.coffee.erb) 잔재 → Vue app 대체 + jbuilder API 마이그레이션 병행',
              '채용공고 페이지 Vue SPA 전환: 채용공고 #index 부터 vue-router + Composition API + TypeScript 도메인 모델 SPA 로 전환. 필터 시스템 컴포넌트화 (Tag / Company / Location / MinEmployees / MinSalary / MinCareer 분리 + chip 렌더링 + URL 동기화 + AutoComplete + sticky)',
              '검색 백엔드는 텍스트/랭킹은 ElasticSearch (한국어 analyzer, bool 쿼리로 기술스택 매칭 점수·경력 일치·차단 회사 제외 등 조합), 정확 매칭/집합/접근 제어는 PostgreSQL (배열 연산자, JSONB 서브쿼리, ransack scope 조합) 로 나눈 하이브리드 설계. 대안(RDB 로 유사도·스코어링까지 처리) 은 쿼리가 훨씬 무거워지고 형태소 분석 인프라를 자체 구축해야 함',
              '회사 관점 접근 제어 (열람 / 차단 / 북마크 / 제안 / 인재풀 / 이미 본 프로필 제외 등) 를 조합 가능한 scope 체인으로 설계 → 새 화면 추가 시 기존 scope 조합만으로 표현 가능한 재사용 구조 확보',
              '백엔드 필터 쿼리는 컨트롤러 액션의 절차형 if 체인을 도메인 모델의 명명된 scope + ransack 화이트리스트로 이관. 여러 컨트롤러(일반 채용공고, 대회 채용공고 등) 에서 중복 구현되던 필터 로직을 concern 으로 통합 → 인덱스 튜닝/쿼리 최적화 변경 지점을 한 곳으로 수렴',
              '회사 필터 배열 순서를 결과 정렬에 반영하는 요구를 Ruby sort_by 대신 SQL CASE 정렬로 DB 위임. 대안(Ruby 정렬) 은 페이지네이션과 결합 시 매 페이지마다 필터 결과 전체를 로드해야 함 → DB 위임으로 LIMIT/OFFSET 과 자연스러운 결합 + 새 파라미터 없이 기존 company_ids 순서 재사용해 API 계약 단순 유지',
              'ransack scope 화이트리스트 + Arel 바인드 파라미터로 SQL Injection 원천 차단. 컨트롤러에 흩어져 있던 필터 if 체인을 도메인 모델의 명명된 scope 로 이관해 다른 컨트롤러(대회 채용공고 등) 와 공통 재사용',
              'SPA 전환에 수반된 vue-router / 스켈레톤 UI / 북마크 그룹 / 제안 관리 / 페이지네이션 일괄 정리 + 컴포넌트 단위 RSpec / Jest 테스트 보강 (모달 / Util / 라우터 / 인터셉터 mock)',
              '2022 후속: career.programmers.co.kr 서브도메인 + 별도 Sidekiq job 서버 (job_career) 분리 + hera-client SPA 저장소 통합으로 자원 격리 및 배포 독립성 확보',
            ],
            images: [`${EXP_IMG}/notion-06.png`, `${EXP_IMG}/notion-05.png`],
          },
          {
            title: '이력서 GitHub 분석기 정밀도·운영 안정성 개선',
            period: '2021.07 ~ 2021.09 · 2022.03 후속 대응',
            bullets: [
              'Ruby · Rugged · github-linguist · ActionCable WebSocket · Docker · AWS ECS · Sentry 기반. Rugged::Walker 정렬 옵션 명시화 + 단일 커밋 레포 엣지 케이스 (parents.empty?) 대응으로 커밋 미분석 건수 0건 달성',
              '분석 로직 별도 클래스 분리 + 로컬 단독 실행 스크립트로 디버깅 환경 마련, Gemfile / Gemfile.lock + bundle exec 로 컨테이너 빌드 재현성 확보',
              'Timeout / Rugged::HTTPError 를 별도 상태(banned / error) 로 분리해 운영 알람 노이즈 제거. clone URL 에 노출되던 PAT 토큰 제거 + 분석 직전 캐시 디렉토리 정리',
              'GitHub git:// 프로토콜 deprecation 즉시 https:// 마이그레이션 대응',
              '프로그래머스 프로젝트 통합: octokit 페이지네이션 안정화 (큰 레포 대응) + git_stat 통계 화면 (토글 / 새로고침 / 차트 안정화 / 공개 프로필 노출 이슈) + banned 상태 UI 반영',
            ],
          },
          {
            title: '추천 채용공고 ES → AWS Personalize 개인화 추천 전환',
            period: '2021.04 PoC · 2021.07 ~ 2021.12 안정화',
            bullets: [
              'ElasticSearch 기반 고정 추천을 AWS Personalize Campaign 기반 개인화 추천으로 전환. 대안(랭킹 로직 Rails 자체 구현) 은 스코어링 인프라 · A/B 실험 설정 · 재훈련 파이프라인을 모두 자체 운영해야 함 → 관리형 서비스에 위임해 도메인 데이터와 피드백 루프에 집중',
              'API client / runtime_client 싱글톤화 + rails console PoC 명령어로 초기 검증',
              'Action tracking 도입 (클릭 이벤트 / put_item key 정책 / URL tracking) + 랜덤 노출 비율과 함께 모니터링 → 채용공고 클릭률 · 지원율 향상 확인',
              '추천 적용 영역 확장: 채용공고 추천 → 과제테스트 연습 페이지 내의 추천 채용공고 노출 추가',
            ],
            images: [`${EXP_IMG}/notion-04.png`],
          },
          {
            title: '대회 도메인 확장 + 서비스 품질 개선 (커버리지·에러 알림)',
            period: '2020.12 ~ 2022.10',
            bullets: [
              '대회 시스템 확장: 회사 어드민 / 상세 검색 / 등록 엑셀 다운로드 / 통계 지원 / 반응형 레이아웃 점진 출시 + V1 API (대회 상세 / 지원 / 리더보드 / 지원 취소 등) 기능 확장',
              '대회 참가 기업 대량 등록은 반복 create 루프 대신 activerecord-import 배치 삽입 + on_duplicate_key_ignore 로 중복 무시를 DB 제약에 위임. 대안(find_or_create_by 루프) 은 등록 건수만큼 SELECT/INSERT 반복 발생 → 왕복 횟수를 상수 수준으로 축소',
              '"대회 → 참여 회사" 집합 계산은 Ruby map/flatten/uniq 대신 has_many :through + distinct association 으로 DB 위임. 이름 있는 관계로 승격해 여러 호출부에서 재사용 + distinct 와 기본 order 충돌 가능성은 unscope(:order) 로 명시적 해소',
              '방치된 지원서 만료 처리는 매 조회 시 계산(applied_at + 기간) 대신 revoke_at 컬럼을 미리 계산·저장해 배치 스캔 조건 단순화. 대안(표현식 인덱스) 은 정책 변경 시마다 인덱스 재생성 부담 → 컬럼화로 인덱스 활용도와 정책 유연성 동시 확보 (쓰기 시 계산 비용을 지불하는 트레이드오프)',
              '종료된 대회 목록에 페이지네이션 선제 적용. "쌓이기만 하는" 데이터 특성상 시간이 지날수록 응답 크기가 단조 증가할 것을 인지 → 문제가 심각해지기 전에 페이지 단위로 잘라 응답 크기 상수 유지',
              '검증 로직에서는 counter_cache 사용 배제. 캐시된 카운터와 실제 카운트가 어긋난 케이스를 계기로 "목록 표시처럼 근사값이 허용되는 곳에는 유지, 검증 로직처럼 정확성이 중요한 곳에는 실시간 count" 기준 정착',
              '테스트 커버리지 70% → 80% 개선 기여 (컨트롤러 / 모델 / 정책 / 팩토리 spec 보강). 백오피스 모니터링 · APM 에서 발견된 N+1 · 인덱스 누락 · 비효율 쿼리를 관계 사용 형태별 도구 선택 원칙(JOIN 필요 여부 vs 지연 preload vs ID 비교) 에 따라 정리',
              'Test Suite 자체를 최적화 대상으로 삼아 let_it_be 로 전면 전환 (파일 단위 리뷰 가능한 크기로 40+회 나눠 진행). 매 example 마다 재생성되던 팩토리가 describe 그룹당 1회로 감소. 단순 치환이 아니라 build(DB 미저장) 객체에는 refind: false 를 정확히 붙여 프레임워크 오작동 방지',
              'Flaky 테스트는 재실행 회피 대신 별도 브랜치까지 파서 근본 원인 추적 - 정렬 비결정성(id 순 first → 도메인 키 명시), 부동소수점 비교 정밀도 등. 외부 연동 스텁은 팀 컨벤션(WebMock + Sinatra Fake API) 을 따라 라우팅 구조를 가진 Fake 앱으로 확장에 대비',
              '여러 어드민 리소스에 흩어져 있던 무거운 select box(전체 collection 로딩) 와 커스텀 ransacker(중간 pluck + IN 절 2단계 쿼리) 복붙 패턴을 각각 AJAX 원격 검색과 네이티브 ransack 연관 필터로 일괄 정리. 처음엔 부분 개선하다 반복 패턴 인지 후 한 커밋에 통일 ("점진적 탐색 → 일괄 수렴")',
              '무중단 schema 정리 방법론 확립: ignored_columns 선반영 → 사용처 삭제 → 실제 컬럼/테이블 drop. 다수 도메인(이력서 / 채용공고 / 회사 / 대회 / 인재 프로필 등) 에 일관 적용해 신·구 앱 서버 병행 구간의 스키마 캐시 miss 500 에러 원천 차단',
              '데이터 정합성 안전장치 습관화: 유니크 인덱스 추가 전 기존 중복 데이터 정리 잡 선행, 사용 중 리소스 삭제를 모델 콜백에서 원천 차단, 마이그레이션 배치는 콘솔 스크립트 대신 ApplicationJob 으로 만들어 스테이징 · 프로덕션 반복 재현 가능',
              '채용사업부 에러 알림 채널 분리: 채용 도메인 전반의 컨트롤러 / 채널 / 잡에 dept.career 분류 태그를 일괄 부착 → 에러 핸들러에서 태그 기반으로 채용사업부 / 다른 부서 Slack 채널 라우팅 → 응답 책임자 명확화 + 다른 부서 알람 노이즈 감소',
              '프로덕션 에러(Sentry) 를 근본 원인 제거 + 회귀 스펙과 함께 수정하는 사이클 정착',
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
            bullets: [
              '다양한 난이도·유형의 알고리즘 문제 출제 및 정확성·품질 검수',
              '타 서비스 유사 문제와의 중복 여부까지 검수',
              '검수 워크플로 정착: 출제 → 검수 → 피드백 → 수정 → 최종 검수 → 출제 완료',
              '반복되는 작업 자동화 도구 제작 (랜덤 단어 조합 기반 아이디어 발굴 / 문제 템플릿 / 테스트 케이스 랜덤 생성)',
              '인턴 3차례에 걸쳐 책임 범위 확장: 초기 출제 → 검수 → 자동화 도구 개발 → 출제·검수·도구 개발 병행',
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
            bullets: [
              '인트라넷(NAC · 방화벽 등) 및 전산 장비 관리 · 서버 · 부대 웹 페이지 운영 · 내부망 유지보수',
            ],
          },
        ],
      },
    ],
  },
] as const
